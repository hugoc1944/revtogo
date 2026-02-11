-- CreateTable
CREATE TABLE "PlateScan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plateId" TEXT NOT NULL,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "country" TEXT,

    CONSTRAINT "PlateScan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlateScan_plateId_idx" ON "PlateScan"("plateId");

-- CreateIndex
CREATE INDEX "PlateScan_createdAt_idx" ON "PlateScan"("createdAt");

-- AddForeignKey
ALTER TABLE "PlateScan" ADD CONSTRAINT "PlateScan_plateId_fkey" FOREIGN KEY ("plateId") REFERENCES "Plate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
