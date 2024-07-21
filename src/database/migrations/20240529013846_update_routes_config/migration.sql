/*
  Warnings:

  - You are about to drop the column `isComoleted` on the `RouteConfig` table. All the data in the column will be lost.
  - Added the required column `isCompleted` to the `RouteConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RouteConfig" DROP COLUMN "isComoleted",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL;
