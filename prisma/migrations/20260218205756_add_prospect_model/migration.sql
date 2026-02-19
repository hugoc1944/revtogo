-- CreateEnum
CREATE TYPE "ProspectCategory" AS ENUM ('beauty', 'health', 'fitness', 'restaurant');

-- CreateTable
CREATE TABLE "Prospect" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "googlePlaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "website" TEXT,
    "category" "ProspectCategory" NOT NULL,
    "handled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prospect_googlePlaceId_key" ON "Prospect"("googlePlaceId");

-- CreateIndex
CREATE INDEX "Prospect_city_idx" ON "Prospect"("city");

-- CreateIndex
CREATE INDEX "Prospect_category_idx" ON "Prospect"("category");

-- CreateIndex
CREATE INDEX "Prospect_handled_idx" ON "Prospect"("handled");

-- CreateIndex
CREATE INDEX "Prospect_createdAt_idx" ON "Prospect"("createdAt");
