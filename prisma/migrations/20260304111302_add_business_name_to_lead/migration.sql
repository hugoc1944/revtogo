-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "businessName" TEXT;

-- CreateIndex
CREATE INDEX "Lead_businessName_idx" ON "Lead"("businessName");
