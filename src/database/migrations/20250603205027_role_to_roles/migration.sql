/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable

-- Спочатку додаємо нову колонку roles
ALTER TABLE "User" ADD COLUMN "roles" "Role"[];

-- Копіюємо дані з role в roles
UPDATE "User" SET "roles" = ARRAY["role"]::"Role"[];

-- Тепер видаляємо стару колонку
ALTER TABLE "User" DROP COLUMN "role";
