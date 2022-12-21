-- CreateTable
CREATE TABLE `Locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `nit` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `long` DOUBLE NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `municipality` VARCHAR(191) NOT NULL,
    `web_page` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Locations_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organizations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locationId` INTEGER NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `municipality` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `webPage` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `productiveSector` VARCHAR(191) NOT NULL,
    `rd_units` VARCHAR(191) NOT NULL,
    `inv_group` VARCHAR(191) NOT NULL,
    `minicienciasCategory` VARCHAR(191) NOT NULL,
    `center` VARCHAR(191) NOT NULL,
    `laboratory` VARCHAR(191) NOT NULL,
    `ri4` VARCHAR(191) NOT NULL,
    `ri4Type` VARCHAR(191) NOT NULL,
    `bussinesModel1` VARCHAR(191) NOT NULL,
    `bussinesModel2` VARCHAR(191) NOT NULL,
    `bussinesModel3` VARCHAR(191) NOT NULL,
    `bussinesModel4` VARCHAR(191) NOT NULL,
    `bussinesModel5` VARCHAR(191) NOT NULL,
    `client1` VARCHAR(191) NOT NULL,
    `client2` VARCHAR(191) NOT NULL,
    `client3` VARCHAR(191) NOT NULL,
    `client4` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Organizations` ADD CONSTRAINT `Organizations_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
