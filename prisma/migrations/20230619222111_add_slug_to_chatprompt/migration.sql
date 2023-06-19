/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `chatprompts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "chatprompts" ADD COLUMN "slug" TEXT;

-- DropTable
DROP TABLE "Post";

-- CreateIndex
CREATE UNIQUE INDEX "chatprompts_slug_key" ON "chatprompts"("slug");
