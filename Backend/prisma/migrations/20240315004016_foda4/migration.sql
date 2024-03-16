-- AlterTable
ALTER TABLE "Departments" ADD COLUMN     "fODAstatesId" STRING;

-- AlterTable
ALTER TABLE "FODAservices" ADD COLUMN     "demographyId" STRING;

-- CreateTable
CREATE TABLE "_DepartmentsToFODAstates" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentsToFODAstates_AB_unique" ON "_DepartmentsToFODAstates"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentsToFODAstates_B_index" ON "_DepartmentsToFODAstates"("B");

-- AddForeignKey
ALTER TABLE "FODAservices" ADD CONSTRAINT "FODAservices_demographyId_fkey" FOREIGN KEY ("demographyId") REFERENCES "Demography"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsToFODAstates" ADD CONSTRAINT "_DepartmentsToFODAstates_A_fkey" FOREIGN KEY ("A") REFERENCES "Departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsToFODAstates" ADD CONSTRAINT "_DepartmentsToFODAstates_B_fkey" FOREIGN KEY ("B") REFERENCES "FODAstates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
