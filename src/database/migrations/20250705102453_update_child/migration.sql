/*
  Warnings:

  - You are about to drop the column `isActive` on the `Child` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ChildStatus" AS ENUM ('ACTIVE', 'DEACTIVATED');

-- AlterTable
ALTER TABLE "Child" DROP COLUMN "isActive",
ADD COLUMN     "status" "ChildStatus" NOT NULL DEFAULT 'ACTIVE';
