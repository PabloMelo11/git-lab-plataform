/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");
