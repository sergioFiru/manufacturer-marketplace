-- ============================================================
-- Manufacturers Marketplace — full database setup
-- Run this entire script in MAMP phpMyAdmin:
-- open http://localhost/phpmyadmin, click the SQL tab, paste, Go
-- ============================================================

CREATE DATABASE IF NOT EXISTS `marketplace` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE marketplace;

-- ------------------------------------------------------------
-- 1. Category
--    Parent table — no foreign keys, must be created first
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Category` (
  `id`        INT           NOT NULL AUTO_INCREMENT,
  `name`      VARCHAR(255)  NOT NULL,
  `createdAt` DATETIME      NOT NULL,
  `updatedAt` DATETIME      NOT NULL,
  `deletedAt` DATETIME      NULL,
  PRIMARY KEY (`id`)
);

-- ------------------------------------------------------------
-- 2. User
--    Standalone — no foreign keys
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `User` (
  `id`        INT           NOT NULL AUTO_INCREMENT,
  `name`      VARCHAR(255)  NOT NULL,
  `email`     VARCHAR(255)  NOT NULL,
  `role`      VARCHAR(255)  NOT NULL DEFAULT 'user',
  `status`    VARCHAR(255)  NOT NULL DEFAULT 'pending',
  `createdAt` DATETIME      NOT NULL,
  `updatedAt` DATETIME      NOT NULL,
  `deletedAt` DATETIME      NULL,
  PRIMARY KEY (`id`)
);

-- ------------------------------------------------------------
-- 3. Manufacturer
--    Many-to-one with Category (many manufacturers → one category)
--    Sequelize names the foreign key "CategoryId"
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Manufacturer` (
  `id`          INT           NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(255)  NOT NULL,
  `description` TEXT          NULL,
  `location`    VARCHAR(255)  NULL,
  `createdAt`   DATETIME      NOT NULL,
  `updatedAt`   DATETIME      NOT NULL,
  `deletedAt`   DATETIME      NULL,
  `CategoryId`  INT           NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`)
);

-- ------------------------------------------------------------
-- 4. ManufacturerDetail
--    One-to-one with Manufacturer
--    Sequelize names the foreign key "ManufacturerId"
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `ManufacturerDetail` (
  `id`              INT           NOT NULL AUTO_INCREMENT,
  `phone`           VARCHAR(255)  NULL,
  `website`         VARCHAR(255)  NULL,
  `foundedYear`     INT           NULL,
  `createdAt`       DATETIME      NOT NULL,
  `updatedAt`       DATETIME      NOT NULL,
  `deletedAt`       DATETIME      NULL,
  `ManufacturerId`  INT           NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`ManufacturerId`) REFERENCES `Manufacturer`(`id`)
);

-- ------------------------------------------------------------
-- 5. Product
--    Many-to-one with Manufacturer (many products → one manufacturer)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Product` (
  `id`              INT           NOT NULL AUTO_INCREMENT,
  `name`            VARCHAR(255)  NOT NULL,
  `status`          VARCHAR(255)  NOT NULL DEFAULT 'pending',
  `price`           FLOAT         NOT NULL,
  `createdAt`       DATETIME      NOT NULL,
  `updatedAt`       DATETIME      NOT NULL,
  `deletedAt`       DATETIME      NULL,
  `ManufacturerId`  INT           NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`ManufacturerId`) REFERENCES `Manufacturer`(`id`)
);

-- ------------------------------------------------------------
-- 6. ContactMessage
--    Many-to-one with Manufacturer (many messages → one manufacturer)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `ContactMessage` (
  `id`              INT           NOT NULL AUTO_INCREMENT,
  `senderName`      VARCHAR(255)  NOT NULL,
  `senderEmail`     VARCHAR(255)  NOT NULL,
  `message`         TEXT          NOT NULL,
  `createdAt`       DATETIME      NOT NULL,
  `updatedAt`       DATETIME      NOT NULL,
  `deletedAt`       DATETIME      NULL,
  `ManufacturerId`  INT           NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`ManufacturerId`) REFERENCES `Manufacturer`(`id`)
);


-- ============================================================
-- SAMPLE DATA
-- ============================================================

-- Categories
INSERT INTO `Category` (`name`, `createdAt`, `updatedAt`) VALUES
  ('Electronics',     NOW(), NOW()),
  ('Automotive',      NOW(), NOW()),
  ('Textiles',        NOW(), NOW()),
  ('Food & Beverage', NOW(), NOW());

-- Users
INSERT INTO `User` (`name`, `email`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
  ('John Smith',    'john@example.com',    'admin',        'active',   NOW(), NOW()),
  ('Jane Doe',      'jane@example.com',    'manufacturer', 'active',   NOW(), NOW()),
  ('Bob Wilson',    'bob@example.com',     'manufacturer', 'pending',  NOW(), NOW()),
  ('Alice Brown',   'alice@example.com',   'user',         'active',   NOW(), NOW()),
  ('Charlie Davis', 'charlie@example.com', 'manufacturer', 'rejected', NOW(), NOW());

-- Manufacturers  (CategoryId: 1=Electronics, 2=Automotive, 3=Textiles, 4=Food & Beverage)
INSERT INTO `Manufacturer` (`name`, `description`, `location`, `CategoryId`, `createdAt`, `updatedAt`) VALUES
  ('TechCorp Industries',    'Leading manufacturer of electronic components',  'North America', 1, NOW(), NOW()),
  ('Global Manufacturing Co','Worldwide supplier of industrial equipment',     'Europe',        2, NOW(), NOW()),
  ('Precision Parts Ltd',    'Specialized in high-precision mechanical parts', 'Asia',          2, NOW(), NOW()),
  ('Textile Masters',        'Premium fabric and textile manufacturer',         'Asia',          3, NOW(), NOW()),
  ('FoodPro Inc',            'Organic food processing and packaging',           'North America', 4, NOW(), NOW());

-- ManufacturerDetail  (one row per manufacturer — ManufacturerId matches above)
INSERT INTO `ManufacturerDetail` (`phone`, `website`, `foundedYear`, `ManufacturerId`, `createdAt`, `updatedAt`) VALUES
  ('+1-555-100-0001', 'www.techcorp.com',    1998, 1, NOW(), NOW()),
  ('+44-20-7946-001', 'www.globalmfg.com',   2003, 2, NOW(), NOW()),
  ('+86-10-5555-001', 'www.precisionpts.com',2010, 3, NOW(), NOW()),
  ('+86-21-5555-002', 'www.textilemasters.com',2005,4, NOW(), NOW()),
  ('+1-555-200-0005', 'www.foodpro.com',     2012, 5, NOW(), NOW());

-- Products
INSERT INTO `Product` (`name`, `status`, `price`, `ManufacturerId`, `createdAt`, `updatedAt`) VALUES
  ('Circuit Board A1',   'active',  25.99,  1, NOW(), NOW()),
  ('LED Display Panel',  'active',  149.99, 1, NOW(), NOW()),
  ('Engine Component X', 'pending', 599.99, 2, NOW(), NOW()),
  ('Brake Assembly Kit', 'active',  299.99, 2, NOW(), NOW()),
  ('Precision Gear Set', 'active',  89.99,  3, NOW(), NOW()),
  ('Cotton Fabric Roll', 'active',  45.00,  4, NOW(), NOW()),
  ('Silk Blend Material','pending', 120.00, 4, NOW(), NOW()),
  ('Organic Juice Pack', 'active',  12.99,  5, NOW(), NOW());

-- ContactMessage (one example message so the table is not empty)
INSERT INTO `ContactMessage` (`senderName`, `senderEmail`, `message`, `ManufacturerId`, `createdAt`, `updatedAt`) VALUES
  ('Alice Brown', 'alice@example.com', 'Hello, I would like to request a product catalog.', 1, NOW(), NOW());
