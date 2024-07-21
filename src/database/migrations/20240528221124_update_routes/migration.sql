/*
  Warnings:

  - Added the required column `number` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sequenceNumber` to the `RouteAdress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RouteAdress" ADD COLUMN     "sequenceNumber" INTEGER NOT NULL;
