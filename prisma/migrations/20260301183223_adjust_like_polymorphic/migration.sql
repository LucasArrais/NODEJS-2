/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId,postId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId,commentId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_id` was added to the `Like` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_public_id_key" ON "Like"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_usuarioId_postId_key" ON "Like"("usuarioId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_usuarioId_commentId_key" ON "Like"("usuarioId", "commentId");
