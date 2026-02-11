/*
  Warnings:

  - The values [delivered] on the enum `PlateStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlateStatus_new" AS ENUM ('producing', 'active', 'inactive');
ALTER TABLE "public"."Plate" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Plate" ALTER COLUMN "status" TYPE "PlateStatus_new" USING ("status"::text::"PlateStatus_new");
ALTER TYPE "PlateStatus" RENAME TO "PlateStatus_old";
ALTER TYPE "PlateStatus_new" RENAME TO "PlateStatus";
DROP TYPE "public"."PlateStatus_old";
ALTER TABLE "Plate" ALTER COLUMN "status" SET DEFAULT 'producing';
COMMIT;
