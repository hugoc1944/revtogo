-- CreateEnum
CREATE TYPE "DesignStyle" AS ENUM ('solid', 'art');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('email', 'whatsapp');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'sent', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "DesignRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',
    "businessName" TEXT NOT NULL,
    "googlePlaceId" TEXT,
    "businessCity" TEXT,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "designStyle" "DesignStyle" NOT NULL,
    "deliveryMethod" "DeliveryMethod" NOT NULL,
    "notes" TEXT,
    "source" TEXT NOT NULL DEFAULT 'landing',

    CONSTRAINT "DesignRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DesignRequest_createdAt_idx" ON "DesignRequest"("createdAt");

-- CreateIndex
CREATE INDEX "DesignRequest_status_idx" ON "DesignRequest"("status");

-- CreateIndex
CREATE INDEX "DesignRequest_contactEmail_idx" ON "DesignRequest"("contactEmail");
