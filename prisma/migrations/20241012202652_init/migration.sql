/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[documentId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "documentId" INTEGER NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_documentId_key" ON "Users"("documentId");
