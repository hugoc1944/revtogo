/*
  Warnings:

  - The values [sent,approved,rejected] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "PlateStatus" AS ENUM ('producing', 'delivered', 'active');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('pending', 'in_progress', 'solved');

-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('pending', 'design_sent', 'refused', 'producing', 'delivered');
ALTER TABLE "public"."DesignRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "DesignRequest" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "public"."RequestStatus_old";
ALTER TABLE "DesignRequest" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "status" "ContactStatus" NOT NULL DEFAULT 'pending';

-- CreateTable
CREATE TABLE "Plate" (
    "id" TEXT NOT NULL,
    "shortId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "PlateStatus" NOT NULL DEFAULT 'producing',
    "designRequestId" TEXT NOT NULL,

    CONSTRAINT "Plate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plate_shortId_key" ON "Plate"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Plate_designRequestId_key" ON "Plate"("designRequestId");

-- CreateIndex
CREATE INDEX "Plate_shortId_idx" ON "Plate"("shortId");

-- CreateIndex
CREATE INDEX "Plate_status_idx" ON "Plate"("status");

-- CreateIndex
CREATE INDEX "Contact_status_idx" ON "Contact"("status");

-- AddForeignKey
ALTER TABLE "Plate" ADD CONSTRAINT "Plate_designRequestId_fkey" FOREIGN KEY ("designRequestId") REFERENCES "DesignRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
