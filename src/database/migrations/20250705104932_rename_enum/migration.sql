/*
  Warnings:

  - The values [male,female,universal] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [notebook,colored,book,art,album] on the enum `GiftSubtype` will be removed. If these variants are still used in the database, this will fail.
  - The values [hygieneProduct,stationery,toy,clothes,other] on the enum `GiftType` will be removed. If these variants are still used in the database, this will fail.
  - The values [moderate,very] on the enum `NeedStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE', 'UNIVERSAL');
ALTER TABLE "Child" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TABLE "Gift" ALTER COLUMN "forGender" TYPE "Gender_new" USING ("forGender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GiftSubtype_new" AS ENUM ('NOTEBOOK', 'COLORED', 'BOOK', 'ART', 'ALBUM');
ALTER TABLE "Gift" ALTER COLUMN "subtype" TYPE "GiftSubtype_new" USING ("subtype"::text::"GiftSubtype_new");
ALTER TYPE "GiftSubtype" RENAME TO "GiftSubtype_old";
ALTER TYPE "GiftSubtype_new" RENAME TO "GiftSubtype";
DROP TYPE "GiftSubtype_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GiftType_new" AS ENUM ('HYGIENE_PRODUCT', 'STATIONERY', 'TOY', 'CLOTHES', 'OTHER');
ALTER TABLE "Gift" ALTER COLUMN "type" TYPE "GiftType_new" USING ("type"::text::"GiftType_new");
ALTER TYPE "GiftType" RENAME TO "GiftType_old";
ALTER TYPE "GiftType_new" RENAME TO "GiftType";
DROP TYPE "GiftType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "NeedStatus_new" AS ENUM ('MODERATE', 'VERY');
ALTER TABLE "Child" ALTER COLUMN "needStatus" TYPE "NeedStatus_new" USING ("needStatus"::text::"NeedStatus_new");
ALTER TYPE "NeedStatus" RENAME TO "NeedStatus_old";
ALTER TYPE "NeedStatus_new" RENAME TO "NeedStatus";
DROP TYPE "NeedStatus_old";
COMMIT;
