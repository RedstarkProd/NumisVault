-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PREMIUM', 'PRO', 'BETA');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CoinStatus" AS ENUM ('COLLECTION', 'FOR_SALE', 'FOR_TRADE', 'TO_EXPERTISE', 'SOLD');

-- CreateEnum
CREATE TYPE "EstimationRequestStatus" AS ENUM ('DRAFT', 'SENT', 'ANSWERED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ApiUsageType" AS ENUM ('AI_ANALYSIS', 'DEALER_SEARCH', 'NUMISTA_SEARCH', 'PDF_EXPORT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "image" TEXT,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "language" TEXT NOT NULL DEFAULT 'fr',
    "displayLimit" INTEGER NOT NULL DEFAULT 24,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT false,
    "darkTheme" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "country" TEXT,
    "year" TEXT,
    "denomination" TEXT,
    "period" TEXT,
    "metal" TEXT,
    "weight" DOUBLE PRECISION,
    "diameter" DOUBLE PRECISION,
    "condition" TEXT,
    "mint" TEXT,
    "mintage" TEXT,
    "purchasePrice" DOUBLE PRECISION,
    "estimatedLow" DOUBLE PRECISION,
    "estimatedMid" DOUBLE PRECISION,
    "estimatedHigh" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "status" "CoinStatus" NOT NULL DEFAULT 'COLLECTION',
    "notes" TEXT,
    "obverseImageUrl" TEXT,
    "reverseImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinAnalysis" (
    "id" TEXT NOT NULL,
    "coinId" TEXT,
    "userId" TEXT NOT NULL,
    "probableName" TEXT,
    "probableCountry" TEXT,
    "probableYear" TEXT,
    "probablePeriod" TEXT,
    "probableMetal" TEXT,
    "visibleText" TEXT,
    "estimatedCondition" TEXT,
    "confidenceScore" DOUBLE PRECISION,
    "aiSummary" TEXT,
    "rawResult" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinSource" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "externalId" TEXT,
    "matchedData" JSONB,
    "confidenceScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dealer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "country" TEXT NOT NULL DEFAULT 'France',
    "phone" TEXT,
    "website" TEXT,
    "googleMapsUrl" TEXT,
    "googlePlaceId" TEXT,
    "rating" DOUBLE PRECISION,
    "reviewCount" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealerSearch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coinId" TEXT,
    "city" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "resultsCount" INTEGER NOT NULL DEFAULT 0,
    "rawResults" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DealerSearch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimationRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "dealerId" TEXT,
    "message" TEXT NOT NULL,
    "status" "EstimationRequestStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstimationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "status" TEXT,
    "currentPeriodEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiUsage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ApiUsageType" NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "month" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_plan_idx" ON "User"("plan");
CREATE INDEX "User_role_idx" ON "User"("role");
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");
CREATE INDEX "Coin_userId_idx" ON "Coin"("userId");
CREATE INDEX "Coin_userId_status_idx" ON "Coin"("userId", "status");
CREATE INDEX "Coin_userId_country_idx" ON "Coin"("userId", "country");
CREATE INDEX "Coin_userId_metal_idx" ON "Coin"("userId", "metal");
CREATE INDEX "Coin_createdAt_idx" ON "Coin"("createdAt");
CREATE INDEX "CoinAnalysis_userId_idx" ON "CoinAnalysis"("userId");
CREATE INDEX "CoinAnalysis_coinId_idx" ON "CoinAnalysis"("coinId");
CREATE INDEX "CoinSource_coinId_idx" ON "CoinSource"("coinId");
CREATE INDEX "CoinSource_sourceName_idx" ON "CoinSource"("sourceName");
CREATE UNIQUE INDEX "Dealer_googlePlaceId_key" ON "Dealer"("googlePlaceId");
CREATE INDEX "Dealer_city_idx" ON "Dealer"("city");
CREATE INDEX "Dealer_country_idx" ON "Dealer"("country");
CREATE INDEX "DealerSearch_userId_idx" ON "DealerSearch"("userId");
CREATE INDEX "DealerSearch_coinId_idx" ON "DealerSearch"("coinId");
CREATE INDEX "DealerSearch_city_query_idx" ON "DealerSearch"("city", "query");
CREATE INDEX "EstimationRequest_userId_idx" ON "EstimationRequest"("userId");
CREATE INDEX "EstimationRequest_coinId_idx" ON "EstimationRequest"("coinId");
CREATE INDEX "EstimationRequest_dealerId_idx" ON "EstimationRequest"("dealerId");
CREATE INDEX "EstimationRequest_status_idx" ON "EstimationRequest"("status");
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
CREATE INDEX "ApiUsage_userId_type_month_idx" ON "ApiUsage"("userId", "type", "month");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CoinAnalysis" ADD CONSTRAINT "CoinAnalysis_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CoinAnalysis" ADD CONSTRAINT "CoinAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CoinSource" ADD CONSTRAINT "CoinSource_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DealerSearch" ADD CONSTRAINT "DealerSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DealerSearch" ADD CONSTRAINT "DealerSearch_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EstimationRequest" ADD CONSTRAINT "EstimationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EstimationRequest" ADD CONSTRAINT "EstimationRequest_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EstimationRequest" ADD CONSTRAINT "EstimationRequest_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ApiUsage" ADD CONSTRAINT "ApiUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
