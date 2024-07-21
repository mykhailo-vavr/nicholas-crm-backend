-- CreateTable
CREATE TABLE "RouteConfig" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "isEditable" BOOLEAN NOT NULL,
    "isCreated" BOOLEAN NOT NULL,
    "isComoleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RouteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RouteConfig_year_key" ON "RouteConfig"("year");
