import { RouteConfig } from '@prisma/client';

export class GetRouteConfigByYearResponse implements RouteConfig {
  id: number;

  year: number;

  isEditable: boolean;

  isCreated: boolean;

  isCompleted: boolean;

  createdAt: Date;

  updatedAt: Date;
}
