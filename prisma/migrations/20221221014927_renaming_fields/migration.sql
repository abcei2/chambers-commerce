/*
  Warnings:

  - You are about to drop the column `web_page` on the `Locations` table. All the data in the column will be lost.
  - Added the required column `webPage` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Locations` DROP COLUMN `web_page`,
    ADD COLUMN `webPage` VARCHAR(191) NOT NULL;
