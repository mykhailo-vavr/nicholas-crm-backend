/*
  Warnings:

  - You are about to alter the column `streetNumber` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "streetNumber" DROP NOT NULL,
ALTER COLUMN "streetNumber" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "flatNumber" DROP NOT NULL;
