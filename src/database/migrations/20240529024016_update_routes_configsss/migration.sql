/*
  Warnings:

  - A unique constraint covering the columns `[year,number]` on the table `Route` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "routeConfigId" INTEGER,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Route_year_number_key" ON "Route"("year", "number");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_year_fkey" FOREIGN KEY ("year") REFERENCES "RouteConfig"("year") ON DELETE RESTRICT ON UPDATE CASCADE;
