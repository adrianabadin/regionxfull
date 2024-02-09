-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('director', 'sies', 'comunitaria', 'epidemiologia', 'deposito', 'rrhh', 'acceso', 'prodiaba', 'proepi', 'equidad', 'inmuno', 'sexual', 'mental');

-- CreateEnum
CREATE TYPE "Flags" AS ENUM ('red', 'yellow', 'green');

-- CreateTable
CREATE TABLE "Demography" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" STRING NOT NULL,
    "population" INT4 NOT NULL,
    "description" STRING NOT NULL,
    "politics" STRING NOT NULL,

    CONSTRAINT "Demography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Golds" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "demographyId" STRING,
    "departmentsId" STRING,

    CONSTRAINT "Golds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "usersId" STRING,
    "demographyId" STRING,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agreements" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "departmentsId" STRING NOT NULL,
    "demographyId" STRING NOT NULL,

    CONSTRAINT "Agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "demographyId" STRING NOT NULL,
    "departmentsId" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "brief" STRING,
    "file" STRING,
    "flag" "Flags" NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Throbleshuting" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "demographyId" STRING NOT NULL,
    "departmentsId" STRING NOT NULL,

    CONSTRAINT "Throbleshuting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "stateId" STRING NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "lastname" STRING NOT NULL,
    "hash" STRING NOT NULL,
    "isAdmin" BOOL NOT NULL DEFAULT false,
    "username" STRING NOT NULL,
    "phone" STRING,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "sid" STRING NOT NULL,
    "data" STRING NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DemographyToDepartments" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Demography_state_key" ON "Demography"("state");

-- CreateIndex
CREATE UNIQUE INDEX "Golds_title_key" ON "Golds"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_name_key" ON "Departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Agreements_name_key" ON "Agreements"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Throbleshuting_name_key" ON "Throbleshuting"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cities_name_key" ON "Cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "_DemographyToDepartments_AB_unique" ON "_DemographyToDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_DemographyToDepartments_B_index" ON "_DemographyToDepartments"("B");

-- AddForeignKey
ALTER TABLE "Golds" ADD CONSTRAINT "Golds_demographyId_fkey" FOREIGN KEY ("demographyId") REFERENCES "Demography"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Golds" ADD CONSTRAINT "Golds_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agreements" ADD CONSTRAINT "Agreements_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agreements" ADD CONSTRAINT "Agreements_demographyId_fkey" FOREIGN KEY ("demographyId") REFERENCES "Demography"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_demographyId_fkey" FOREIGN KEY ("demographyId") REFERENCES "Demography"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Throbleshuting" ADD CONSTRAINT "Throbleshuting_demographyId_fkey" FOREIGN KEY ("demographyId") REFERENCES "Demography"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Throbleshuting" ADD CONSTRAINT "Throbleshuting_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cities" ADD CONSTRAINT "Cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "Demography"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemographyToDepartments" ADD CONSTRAINT "_DemographyToDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Demography"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemographyToDepartments" ADD CONSTRAINT "_DemographyToDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
