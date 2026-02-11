-- CreateEnum
CREATE TYPE "FindCategory" AS ENUM ('beauty', 'food', 'tourism');

-- CreateEnum
CREATE TYPE "MissionStatus" AS ENUM ('todo', 'in_progress', 'done', 'abandoned');

-- CreateEnum
CREATE TYPE "VisitOutcome" AS ENUM ('pending', 'accepted', 'refused', 'skipped');

-- CreateEnum
CREATE TYPE "RefusalReason" AS ENUM ('not_interested', 'already_has_solution', 'owner_not_present', 'franchise', 'language_barrier');

-- CreateTable
CREATE TABLE "FindMission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "category" "FindCategory" NOT NULL,
    "centerLat" DOUBLE PRECISION NOT NULL,
    "centerLng" DOUBLE PRECISION NOT NULL,
    "radiusKm" DOUBLE PRECISION NOT NULL DEFAULT 2,
    "estimatedDurationMinutes" INTEGER NOT NULL,
    "status" "MissionStatus" NOT NULL DEFAULT 'todo',
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "FindMission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FindMissionStop" (
    "id" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "googlePlaceId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "estimatedWalkMinutes" INTEGER,
    "visitOutcome" "VisitOutcome" NOT NULL DEFAULT 'pending',
    "refusalReason" "RefusalReason",
    "visitedAt" TIMESTAMP(3),

    CONSTRAINT "FindMissionStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FindVisit" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "missionStopId" TEXT NOT NULL,
    "arrivedAt" TIMESTAMP(3),
    "actionTakenAt" TIMESTAMP(3),
    "outcome" "VisitOutcome" NOT NULL,
    "refusalReason" "RefusalReason",
    "designRequestId" TEXT,

    CONSTRAINT "FindVisit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FindMission_city_idx" ON "FindMission"("city");

-- CreateIndex
CREATE INDEX "FindMission_category_idx" ON "FindMission"("category");

-- CreateIndex
CREATE INDEX "FindMission_status_idx" ON "FindMission"("status");

-- CreateIndex
CREATE INDEX "FindMissionStop_missionId_idx" ON "FindMissionStop"("missionId");

-- CreateIndex
CREATE INDEX "FindMissionStop_googlePlaceId_idx" ON "FindMissionStop"("googlePlaceId");

-- CreateIndex
CREATE UNIQUE INDEX "FindMissionStop_missionId_orderIndex_key" ON "FindMissionStop"("missionId", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "FindVisit_missionStopId_key" ON "FindVisit"("missionStopId");

-- CreateIndex
CREATE UNIQUE INDEX "FindVisit_designRequestId_key" ON "FindVisit"("designRequestId");

-- CreateIndex
CREATE INDEX "FindVisit_outcome_idx" ON "FindVisit"("outcome");

-- AddForeignKey
ALTER TABLE "FindMissionStop" ADD CONSTRAINT "FindMissionStop_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "FindMission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FindVisit" ADD CONSTRAINT "FindVisit_missionStopId_fkey" FOREIGN KEY ("missionStopId") REFERENCES "FindMissionStop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FindVisit" ADD CONSTRAINT "FindVisit_designRequestId_fkey" FOREIGN KEY ("designRequestId") REFERENCES "DesignRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
