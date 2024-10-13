-- CreateTable
CREATE TABLE "Users" (
    "documentId" INTEGER NOT NULL,
    "names" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "Clients" (
    "documentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "Base" (
    "id" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,
    "account" INTEGER NOT NULL,
    "expiration" TEXT NOT NULL,
    "disburse" DOUBLE PRECISION NOT NULL,
    "office" TEXT NOT NULL,
    "dependence" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,
    "assignment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,
    "campaign" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "General" (
    "id" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "substate" TEXT NOT NULL,
    "assignment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "General_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,
    "wallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Decil" (
    "id" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,
    "decil" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Decil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,
    "capital" DOUBLE PRECISION NOT NULL,
    "TOTAL" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emails" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phones" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "operation" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "assignment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Management" (
    "id" SERIAL NOT NULL,
    "operation" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,
    "assignment" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "destiny" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "management" TEXT NOT NULL,
    "createStart" TIMESTAMP(3) NOT NULL,
    "createEnd" TIMESTAMP(3) NOT NULL,
    "contrast" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Management_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eps" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "assignment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Eps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "property" TEXT NOT NULL,
    "enrollment" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "assignment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employment" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "assignment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReporManagement" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "assignment" TEXT NOT NULL,
    "ges01" INTEGER NOT NULL,
    "ope01" INTEGER NOT NULL,
    "ges02" INTEGER NOT NULL,
    "ope02" INTEGER NOT NULL,
    "ges03" INTEGER NOT NULL,
    "ope03" INTEGER NOT NULL,
    "ges04" INTEGER NOT NULL,
    "ope04" INTEGER NOT NULL,
    "ges05" INTEGER NOT NULL,
    "ope05" INTEGER NOT NULL,
    "ges06" INTEGER NOT NULL,
    "ope06" INTEGER NOT NULL,
    "ges07" INTEGER NOT NULL,
    "ope07" INTEGER NOT NULL,
    "ges08" INTEGER NOT NULL,
    "ope08" INTEGER NOT NULL,
    "ges09" INTEGER NOT NULL,
    "ope09" INTEGER NOT NULL,
    "ges10" INTEGER NOT NULL,
    "ope10" INTEGER NOT NULL,
    "ges11" INTEGER NOT NULL,
    "ope11" INTEGER NOT NULL,
    "ges12" INTEGER NOT NULL,
    "ope12" INTEGER NOT NULL,
    "ges13" INTEGER NOT NULL,
    "ope13" INTEGER NOT NULL,
    "ges14" INTEGER NOT NULL,
    "ope14" INTEGER NOT NULL,
    "ges15" INTEGER NOT NULL,
    "ope15" INTEGER NOT NULL,
    "ges16" INTEGER NOT NULL,
    "ope16" INTEGER NOT NULL,
    "ges17" INTEGER NOT NULL,
    "ope17" INTEGER NOT NULL,
    "ges18" INTEGER NOT NULL,
    "ope18" INTEGER NOT NULL,
    "ges19" INTEGER NOT NULL,
    "ope19" INTEGER NOT NULL,
    "ges20" INTEGER NOT NULL,
    "ope20" INTEGER NOT NULL,
    "ges21" INTEGER NOT NULL,
    "ope21" INTEGER NOT NULL,
    "ges22" INTEGER NOT NULL,
    "ope22" INTEGER NOT NULL,
    "ges23" INTEGER NOT NULL,
    "ope23" INTEGER NOT NULL,
    "ges24" INTEGER NOT NULL,
    "ope24" INTEGER NOT NULL,
    "ges25" INTEGER NOT NULL,
    "ope25" INTEGER NOT NULL,
    "ges26" INTEGER NOT NULL,
    "ope26" INTEGER NOT NULL,
    "ges27" INTEGER NOT NULL,
    "ope27" INTEGER NOT NULL,
    "ges28" INTEGER NOT NULL,
    "ope28" INTEGER NOT NULL,
    "ges29" INTEGER NOT NULL,
    "ope29" INTEGER NOT NULL,
    "ges30" INTEGER NOT NULL,
    "ope30" INTEGER NOT NULL,
    "ges31" INTEGER NOT NULL,
    "ope31" INTEGER NOT NULL,
    "gesT" INTEGER NOT NULL,
    "opeT" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "ReporManagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReporManagementConsolidated" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "assignment" TEXT NOT NULL,
    "ges01" INTEGER NOT NULL,
    "ope01" INTEGER NOT NULL,
    "ges02" INTEGER NOT NULL,
    "ope02" INTEGER NOT NULL,
    "ges03" INTEGER NOT NULL,
    "ope03" INTEGER NOT NULL,
    "ges04" INTEGER NOT NULL,
    "ope04" INTEGER NOT NULL,
    "ges05" INTEGER NOT NULL,
    "ope05" INTEGER NOT NULL,
    "ges06" INTEGER NOT NULL,
    "ope06" INTEGER NOT NULL,
    "ges07" INTEGER NOT NULL,
    "ope07" INTEGER NOT NULL,
    "ges08" INTEGER NOT NULL,
    "ope08" INTEGER NOT NULL,
    "ges09" INTEGER NOT NULL,
    "ope09" INTEGER NOT NULL,
    "ges10" INTEGER NOT NULL,
    "ope10" INTEGER NOT NULL,
    "ges11" INTEGER NOT NULL,
    "ope11" INTEGER NOT NULL,
    "ges12" INTEGER NOT NULL,
    "ope12" INTEGER NOT NULL,
    "ges13" INTEGER NOT NULL,
    "ope13" INTEGER NOT NULL,
    "ges14" INTEGER NOT NULL,
    "ope14" INTEGER NOT NULL,
    "ges15" INTEGER NOT NULL,
    "ope15" INTEGER NOT NULL,
    "ges16" INTEGER NOT NULL,
    "ope16" INTEGER NOT NULL,
    "ges17" INTEGER NOT NULL,
    "ope17" INTEGER NOT NULL,
    "ges18" INTEGER NOT NULL,
    "ope18" INTEGER NOT NULL,
    "ges19" INTEGER NOT NULL,
    "ope19" INTEGER NOT NULL,
    "ges20" INTEGER NOT NULL,
    "ope20" INTEGER NOT NULL,
    "ges21" INTEGER NOT NULL,
    "ope21" INTEGER NOT NULL,
    "ges22" INTEGER NOT NULL,
    "ope22" INTEGER NOT NULL,
    "ges23" INTEGER NOT NULL,
    "ope23" INTEGER NOT NULL,
    "ges24" INTEGER NOT NULL,
    "ope24" INTEGER NOT NULL,
    "ges25" INTEGER NOT NULL,
    "ope25" INTEGER NOT NULL,
    "ges26" INTEGER NOT NULL,
    "ope26" INTEGER NOT NULL,
    "ges27" INTEGER NOT NULL,
    "ope27" INTEGER NOT NULL,
    "ges28" INTEGER NOT NULL,
    "ope28" INTEGER NOT NULL,
    "ges29" INTEGER NOT NULL,
    "ope29" INTEGER NOT NULL,
    "ges30" INTEGER NOT NULL,
    "ope30" INTEGER NOT NULL,
    "ges31" INTEGER NOT NULL,
    "ope31" INTEGER NOT NULL,
    "gesT" INTEGER NOT NULL,
    "opeT" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "ReporManagementConsolidated_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_documentId_key" ON "Users"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_documentId_key" ON "Clients"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Base_id_key" ON "Base"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_id_key" ON "Assignment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_id_key" ON "Campaign"("id");

-- CreateIndex
CREATE UNIQUE INDEX "General_id_key" ON "General"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_id_key" ON "Wallet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Decil_id_key" ON "Decil"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_id_key" ON "Balance"("id");
