/*
  Warnings:

  - Added the required column `GRUPLAC` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organizations` ADD COLUMN `GRUPLAC` VARCHAR(191) NOT NULL;
