CREATE SCHEMA `hw79` DEFAULT CHARACTER SET utf8;
USE `hw79`;

CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `locations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NULL,
  `location_id` INT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `image` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  INDEX `category_id_fk_idx` (`category_id` ASC),
  INDEX `location_id_fk_idx` (`location_id` ASC),
  CONSTRAINT `category_id_fk`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `location_id_fk`
    FOREIGN KEY (`location_id`)
    REFERENCES `locations` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);


INSERT INTO `locations` (`id`, `name`, `description`)
VALUES
    (1, 'Conference Room', 'This is first place'),
    (2, 'Kitchen', 'This is second place'),
    (3, 'Bishkek Office', 'This is third place'),
    (4, 'Living Room', 'This is fourth place');

INSERT INTO `categories` (`id`, `name`, `description`)
VALUES
    (1, 'Computers', 'All related computer'),
    (2, 'Home Supplies', 'Home instruments and other staff'),
    (3, 'Phones', 'Stationary phones and mobile phones'),
    (4, 'Other', 'All other');

INSERT INTO `items` (`id`, `category_id`, `location_id`, `name`, `description`, `image`)
VALUES
    (1, 2, 1, 'Desk lamp Grey', 'Wood Lamp 25w LED', null),
    (2, 3, 3, 'Samsung Galaxy S5', 'Mobile phone for office use', null),
    (3, 1, 4, 'DELL Laptop XPS13 Core i9', 'Laptop', null),
    (4, 4, 2, 'Tapka', 'Pink tapka', null),
    (5, 3, 1, 'Panasonic KX-255', 'Conference phone', null),
    (6, 2, 3, 'Desk', 'Metal desk with glass', null);