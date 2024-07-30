/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `super_admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "super_admin_username_key" ON "super_admin"("username");
