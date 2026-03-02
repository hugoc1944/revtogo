-- CreateEnum
CREATE TYPE "OutreachStatus" AS ENUM ('not_sent', 'email_sent', 'follow_up_1', 'follow_up_2', 'replied', 'removed');

-- DropIndex
DROP INDEX "Prospect_createdAt_idx";

-- DropIndex
DROP INDEX "Prospect_googlePlaceId_key";

-- AlterTable
ALTER TABLE "Prospect" ADD COLUMN     "firstEmailSentAt" TIMESTAMP(3),
ADD COLUMN     "followUp1SentAt" TIMESTAMP(3),
ADD COLUMN     "followUp2SentAt" TIMESTAMP(3),
ADD COLUMN     "location" TEXT,
ADD COLUMN     "nextFollowUpAt" TIMESTAMP(3),
ADD COLUMN     "outreachStatus" "OutreachStatus" NOT NULL DEFAULT 'not_sent',
ADD COLUMN     "removedReason" TEXT,
ALTER COLUMN "googlePlaceId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Prospect_outreachStatus_idx" ON "Prospect"("outreachStatus");
