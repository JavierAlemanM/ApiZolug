-- CreateTable
CREATE TABLE "Clients" (
    "identificationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("identificationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_identificationId_key" ON "Clients"("identificationId");
