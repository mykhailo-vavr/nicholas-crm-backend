-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_addressId_fkey";

-- AlterTable
ALTER TABLE "Child" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
