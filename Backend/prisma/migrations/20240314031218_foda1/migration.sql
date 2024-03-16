/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Menace` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Oportunity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Strength` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Weakness` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Menace_title_key" ON "Menace"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Oportunity_title_key" ON "Oportunity"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Strength_title_key" ON "Strength"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Weakness_title_key" ON "Weakness"("title");
