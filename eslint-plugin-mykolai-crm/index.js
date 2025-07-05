// Декоратори Swagger які закінчуються на Response
const API_RESPONSE_DECORATORS = [
  'ApiBadRequestResponse',
  'ApiUnauthorizedResponse',
  'ApiForbiddenResponse',
  'ApiNotFoundResponse',
  'ApiConflictResponse',
  'ApiInternalServerErrorResponse',
  'ApiOkResponse',
  'ApiCreatedResponse',
  'ApiAcceptedResponse',
  'ApiNoContentResponse',
  'ApiResponse',
];

// HTTP методи які дозволені для методів контролера (у алфавітному порядку)
const HTTP_METHOD_DECORATORS = ['All', 'Delete', 'Get', 'Head', 'Options', 'Patch', 'Post', 'Put'];

const STATUS_CODES = {
  ApiCreatedResponse: 201,
  ApiBadRequestResponse: 400,
  ApiUnauthorizedResponse: 401,
  ApiForbiddenResponse: 403,
  ApiNotFoundResponse: 404,
  ApiConflictResponse: 409,
  ApiInternalServerErrorResponse: 500,
};

const DECORATOR_TYPES = {
  PUBLIC: 'public',
  API_RESPONSE: 'api_response',
  HTTP_METHOD: 'http_method',
  FORBIDDEN: 'forbidden',
};

const MESSAGES = {
  WRONG_ORDER_PUBLIC: '@Public() декоратор повинен йти одразу після @Api...Response декораторів',
  WRONG_ORDER_API_RESPONSE: 'API Response декоратори повинні бути посортовані за HTTP кодом',
  WRONG_ORDER_HTTP_METHOD: 'HTTP метод повинен йти після @Public або @Api...Response декораторів',
  FORBIDDEN_DECORATOR:
    'Цей декоратор заборонено використовувати в методах контролера. Дозволені тільки @Public, Api*Response та HTTP методи',
  MISSING_HTTP_METHOD: 'Кожен метод контролера повинен мати декоратор HTTP методу (@Get, @Post, тощо)',
  WRONG_METHOD_ORDER:
    'Методи контролера повинні бути посортовані за HTTP методом, потім за назвою. Методи з параметрами повинні бути в кінці групи.',
  MISSING_PARSE_INT_PIPE: "@Param('id') повинен містити ParseIntPipe як другий аргумент",
};

function getDecoratorName(decorator) {
  if (!decorator?.expression) return null;

  return decorator.expression.type === 'CallExpression' ? decorator.expression.callee?.name : decorator.expression.name;
}

function getDecoratorInfo(decorator) {
  const name = getDecoratorName(decorator);
  if (!name) return null;

  if (name === 'Public') {
    return {
      name,
      type: DECORATOR_TYPES.PUBLIC,
      statusCode: 0, // Найменший код, щоб бути першим
    };
  }

  if (API_RESPONSE_DECORATORS.includes(name)) {
    return {
      name,
      type: DECORATOR_TYPES.API_RESPONSE,
      statusCode: STATUS_CODES[name] || 999,
    };
  }

  if (HTTP_METHOD_DECORATORS.includes(name)) {
    return {
      name,
      type: DECORATOR_TYPES.HTTP_METHOD,
      statusCode: 9999,
    };
  }

  // Інші декоратори заборонені
  return {
    name,
    type: DECORATOR_TYPES.FORBIDDEN,
    statusCode: 99999,
  };
}

function isControllerClass(classNode) {
  return classNode?.decorators?.some((decorator) => {
    const name = getDecoratorName(decorator);
    return name?.endsWith('Controller');
  });
}

function validateDecoratorOrder(decorators, context, node) {
  if (decorators.length === 0) {
    // Якщо немає декораторів взагалі, то немає HTTP методу
    context.report({
      node: node,
      messageId: 'missingHttpMethod',
    });
    return;
  }

  let hasPublic = false;
  let hasHttpMethod = false;
  let lastApiResponseStatusCode = 0;
  let apiResponseSectionEnded = false;

  for (let i = 0; i < decorators.length; i++) {
    const decorator = decorators[i];
    const decoratorNode = node.decorators[i];

    // Перевіряємо заборонені декоратори
    if (decorator.type === DECORATOR_TYPES.FORBIDDEN) {
      context.report({
        node: decoratorNode,
        messageId: 'forbiddenDecorator',
      });
      continue;
    }

    if (decorator.type === DECORATOR_TYPES.API_RESPONSE) {
      // API Response не може йти після @Public або HTTP методу
      if (hasPublic || hasHttpMethod) {
        context.report({
          node: decoratorNode,
          messageId: 'wrongOrderPublic',
        });
      }

      // Перевіряємо сортування API Response декораторів за кодом помилки
      if (decorator.statusCode < lastApiResponseStatusCode) {
        context.report({
          node: decoratorNode,
          messageId: 'wrongOrderApiResponse',
        });
      }

      lastApiResponseStatusCode = decorator.statusCode;
    } else if (decorator.type === DECORATOR_TYPES.PUBLIC) {
      // @Public повинен йти після всіх API Response, але перед HTTP методом
      if (hasHttpMethod) {
        context.report({
          node: decoratorNode,
          messageId: 'wrongOrderPublic',
        });
      }

      // Якщо є API Response декоратори, @Public повинен йти після них
      apiResponseSectionEnded = true;
      hasPublic = true;
    } else if (decorator.type === DECORATOR_TYPES.HTTP_METHOD) {
      // HTTP метод йде останнім
      apiResponseSectionEnded = true;
      hasHttpMethod = true;
    }

    // Перевіряємо, чи не йде API Response після завершення секції
    if (apiResponseSectionEnded && decorator.type === DECORATOR_TYPES.API_RESPONSE) {
      context.report({
        node: decoratorNode,
        messageId: 'wrongOrderPublic',
      });
    }
  }

  // Перевіряємо, чи є HTTP метод
  if (!hasHttpMethod) {
    context.report({
      node: node,
      messageId: 'missingHttpMethod',
    });
  }
}

function checkParamPipeValidation(node, context) {
  if (!node.value || !node.value.params) return;

  for (const param of node.value.params) {
    if (!param.decorators) continue;

    for (const decorator of param.decorators) {
      const decoratorName = getDecoratorName(decorator);

      if (decoratorName === 'Param') {
        // Перевіряємо, чи це @Param('id')
        if (
          decorator.expression &&
          decorator.expression.type === 'CallExpression' &&
          decorator.expression.arguments &&
          decorator.expression.arguments.length >= 1
        ) {
          const firstArg = decorator.expression.arguments[0];
          if (firstArg.type === 'Literal' && firstArg.value === 'id') {
            // Це @Param('id'), перевіряємо чи є ParseIntPipe
            const hasParseIntPipe =
              decorator.expression.arguments.length >= 2 &&
              decorator.expression.arguments[1].type === 'Identifier' &&
              decorator.expression.arguments[1].name === 'ParseIntPipe';

            if (!hasParseIntPipe) {
              context.report({
                node: decorator,
                messageId: 'missingParseIntPipe',
              });
            }
          }
        }
      }
    }
  }
}

function checkMethodDecoratorOrder(node, context) {
  const decorators = node.decorators ? node.decorators.map(getDecoratorInfo) : [];

  validateDecoratorOrder(decorators, context, node);
}

function getHttpMethodFromDecorator(decorator) {
  const name = getDecoratorName(decorator);
  return HTTP_METHOD_DECORATORS.includes(name) ? name : null;
}

function getRouteFromDecorator(decorator) {
  if (!decorator?.expression) return '';

  if (decorator.expression.type === 'CallExpression' && decorator.expression.arguments?.length > 0) {
    const firstArg = decorator.expression.arguments[0];
    if (firstArg.type === 'Literal' && typeof firstArg.value === 'string') {
      return firstArg.value;
    }
  }

  return '';
}

function getMethodInfo(node) {
  if (!node.decorators) return null;

  let httpMethod = null;
  let route = '';

  for (const decorator of node.decorators) {
    const method = getHttpMethodFromDecorator(decorator);
    if (method) {
      httpMethod = method;
      route = getRouteFromDecorator(decorator);
      break;
    }
  }

  if (!httpMethod) return null;

  return {
    httpMethod,
    route,
    methodName: node.key?.name || '',
    hasParams: route.includes(':'),
  };
}

function compareMethodOrder(a, b) {
  // Спочатку порівнюємо за HTTP методом
  const aIndex = HTTP_METHOD_DECORATORS.indexOf(a.httpMethod);
  const bIndex = HTTP_METHOD_DECORATORS.indexOf(b.httpMethod);

  if (aIndex !== bIndex) {
    return aIndex - bIndex;
  }

  // Якщо HTTP методи однакові, то методи без параметрів йдуть першими
  if (a.hasParams !== b.hasParams) {
    return a.hasParams - b.hasParams;
  }

  // Всередині групи сортуємо за назвою роуту
  if (a.route !== b.route) {
    return a.route.localeCompare(b.route);
  }

  // Якщо роути однакові, сортуємо за назвою методу
  return a.methodName.localeCompare(b.methodName);
}

function checkMethodOrder(classNode, context) {
  const methods = classNode.body.body
    .filter((node) => node.type === 'MethodDefinition' && node.key?.name !== 'constructor')
    .map((node) => ({ node, info: getMethodInfo(node) }))
    .filter(({ info }) => info !== null);

  if (methods.length <= 1) return;

  const sortedMethods = [...methods].sort((a, b) => compareMethodOrder(a.info, b.info));

  for (let i = 0; i < methods.length; i++) {
    if (methods[i].node !== sortedMethods[i].node) {
      context.report({
        node: methods[i].node,
        messageId: 'wrongMethodOrder',
      });
      return; // Повідомляємо тільки про першу помилку
    }
  }
}

const decoratorOrderRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce consistent decorator order in NestJS controller methods',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      wrongOrderPublic: MESSAGES.WRONG_ORDER_PUBLIC,
      wrongOrderApiResponse: MESSAGES.WRONG_ORDER_API_RESPONSE,
      wrongOrderHttpMethod: MESSAGES.WRONG_ORDER_HTTP_METHOD,
      forbiddenDecorator: MESSAGES.FORBIDDEN_DECORATOR,
      missingHttpMethod: MESSAGES.MISSING_HTTP_METHOD,
    },
  },
  create(context) {
    return {
      MethodDefinition(node) {
        if (node.parent?.type === 'ClassBody') {
          const classNode = node.parent.parent;
          // Пропускаємо конструктор
          if (isControllerClass(classNode) && node.key?.name !== 'constructor') {
            checkMethodDecoratorOrder(node, context);
          }
        }
      },
    };
  },
};

const methodOrderRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce consistent method order in NestJS controllers',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      wrongMethodOrder: MESSAGES.WRONG_METHOD_ORDER,
    },
  },
  create(context) {
    return {
      ClassDeclaration(node) {
        if (isControllerClass(node)) {
          checkMethodOrder(node, context);
        }
      },
    };
  },
};

const paramPipeValidationRule = {
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce ParseIntPipe for @Param('id') in NestJS controller methods",
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingParseIntPipe: MESSAGES.MISSING_PARSE_INT_PIPE,
    },
  },
  create(context) {
    return {
      MethodDefinition(node) {
        if (node.parent?.type === 'ClassBody') {
          const classNode = node.parent.parent;
          // Пропускаємо конструктор
          if (isControllerClass(classNode) && node.key?.name !== 'constructor') {
            checkParamPipeValidation(node, context);
          }
        }
      },
    };
  },
};

module.exports = {
  configs: {
    recommended: {
      plugins: {
        'mykolai-crm': {
          rules: {
            'decorator-order': decoratorOrderRule,
            'method-order': methodOrderRule,
            'param-pipe-validation': paramPipeValidationRule,
          },
        },
      },
      rules: {
        'mykolai-crm/decorator-order': 'error',
        'mykolai-crm/method-order': 'error',
        'mykolai-crm/param-pipe-validation': 'error',
      },
    },
  },
};
