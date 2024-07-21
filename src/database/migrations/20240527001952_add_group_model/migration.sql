/*
  Warnings:

  - You are about to drop the `RouteVolunteer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RouteVolunteer" DROP CONSTRAINT "RouteVolunteer_routeId_fkey";

-- DropForeignKey
ALTER TABLE "RouteVolunteer" DROP CONSTRAINT "RouteVolunteer_volunteerId_fkey";

-- DropTable
DROP TABLE "RouteVolunteer";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerGroup" (
    "volunteerId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VolunteerGroup_pkey" PRIMARY KEY ("volunteerId","groupId")
);

-- CreateTable
CREATE TABLE "RouteGroup" (
    "routeId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RouteGroup_pkey" PRIMARY KEY ("routeId","groupId")
);

-- AddForeignKey
ALTER TABLE "VolunteerGroup" ADD CONSTRAINT "VolunteerGroup_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerGroup" ADD CONSTRAINT "VolunteerGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteGroup" ADD CONSTRAINT "RouteGroup_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteGroup" ADD CONSTRAINT "RouteGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
