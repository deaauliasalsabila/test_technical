-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 01, 2024 at 06:03 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `balance`
--

CREATE TABLE `balance` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `balance` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `balance`
--

INSERT INTO `balance` (`id`, `user_id`, `balance`) VALUES
(5, 13, 550000),
(6, 16, 100000);

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `banner_name` varchar(255) NOT NULL,
  `banner_image` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `banner_name`, `banner_image`, `description`) VALUES
(1, 'Banner 1', 'http://localhost:5000/assets/1717081102211-Buat_Brand__1_.png', 'Lerem Ipsum Dolor sit amet'),
(2, 'Banner 2', 'http://localhost:5000/assets/1717081102211-Buat_Brand__1_.png', 'Lerem Ipsum Dolor sit amet'),
(3, 'Banner 3', 'http://localhost:5000/assets/1717081102211-Buat_Brand__1_.png', 'Lerem Ipsum Dolor sit amet'),
(4, 'Banner 4', 'http://localhost:5000/assets/1717081102211-Buat_Brand__1_.png', 'Lerem Ipsum Dolor sit amet');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_code` varchar(50) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_icon` varchar(255) NOT NULL,
  `service_tarif` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_code`, `service_name`, `service_icon`, `service_tarif`) VALUES
('MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('PAJAK', 'PAJAK PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PAKET_DATA', 'Paket Data', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000),
('Pulsa', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 10000),
('QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000),
('TV ', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000);

-- --------------------------------------------------------

--
-- Table structure for table `topup_transactions`
--

CREATE TABLE `topup_transactions` (
  `id` int(11) NOT NULL,
  `users_id` int(11) DEFAULT NULL,
  `top_up_amount` int(11) DEFAULT NULL,
  `transaction_type` enum('TOPUP','PAYMENT') DEFAULT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topup_transactions`
--

INSERT INTO `topup_transactions` (`id`, `users_id`, `top_up_amount`, `transaction_type`, `invoice_number`, `transaction_date`) VALUES
(18, 13, 200000, 'TOPUP', 'INVTOPUP20240601022109502-001', '2024-06-01 02:21:09'),
(24, 16, 100000, 'TOPUP', 'INVTOPUP20240601031922341-001', '2024-06-01 03:19:22');

--
-- Triggers `topup_transactions`
--
DELIMITER $$
CREATE TRIGGER `after_topup_insert` AFTER INSERT ON `topup_transactions` FOR EACH ROW BEGIN
  UPDATE balance
  SET balance = balance + NEW.top_up_amount
  WHERE user_id = NEW.user_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `service_code` varchar(50) NOT NULL,
  `invoice_number` varchar(2555) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `transaction_type` enum('PAYMENT') NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `users_id`, `service_code`, `invoice_number`, `total_amount`, `transaction_type`, `created_on`) VALUES
(5, 13, 'MUSIK', 'INV20240601005007364-001', 50000, 'PAYMENT', '2024-06-01 00:50:07'),
(6, 13, 'PDAM', 'INV20240601005117876-001', 40000, 'PAYMENT', '2024-06-01 00:51:17'),
(7, 13, 'PAJAK', 'INV20240601005215284-001', 40000, 'PAYMENT', '2024-06-01 00:52:15'),
(8, 13, 'TV', 'INV20240601012345174-001', 50000, 'PAYMENT', '2024-06-01 01:23:45'),
(9, 13, 'TV', 'INV20240601022346544-001', 50000, 'PAYMENT', '2024-06-01 02:23:46');

--
-- Triggers `transaction`
--
DELIMITER $$
CREATE TRIGGER `balance_before_transaction` BEFORE INSERT ON `transaction` FOR EACH ROW BEGIN
    DECLARE user_balance INT;

    -- Ambil saldo pengguna dari tabel balance
    SELECT balance INTO user_balance
    FROM balance
    WHERE user_id = NEW.users_id;

    -- Jika saldo tidak mencukupi, hentikan transaksi dan kirimkan pesan kesalahan
    IF user_balance < NEW.total_amount THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Saldo tidak mencukupi untuk melakukan transaksi';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `transaction_history`
-- (See below for the actual view)
--
CREATE TABLE `transaction_history` (
`users_id` int(11)
,`invoice_number` varchar(2555)
,`transaction_type` varchar(7)
,`description` varchar(255)
,`total_amount` int(11)
,`created_on` timestamp
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `password`, `profile_image`) VALUES
(13, 'deaauliasalsabilaa@gmail.com', 'dea aulia', 'salsabila', '$2a$10$bLURL.DlN.EIxN9/NWTiEeSHrC0hcD9OfyHS/gHVpPAvsJEApAsSK', 'http://localhost:5000/assets/1717081102211-Buat_Brand__1_.png'),
(16, 'deaauliasalsabila31@gmail.com', 'dea aulia', 's 1 Mei 2024', '$2a$10$YLFAlRBPZnOVgBqKwT/D.OcqhkRNMkLD2I13iHPYRv8bFG.krnYmi', 'http://localhost:5000/assets/1717211406181-Buat_Brand__1_.png');

-- --------------------------------------------------------

--
-- Structure for view `transaction_history`
--
DROP TABLE IF EXISTS `transaction_history`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `transaction_history`  AS  select `t`.`users_id` AS `users_id`,`t`.`invoice_number` AS `invoice_number`,'PAYMENT' AS `transaction_type`,`s`.`service_name` AS `description`,`t`.`total_amount` AS `total_amount`,`t`.`created_on` AS `created_on` from (`transaction` `t` join `services` `s` on(`t`.`service_code` = `s`.`service_code`)) union select `tt`.`users_id` AS `users_id`,`tt`.`invoice_number` AS `invoice_number`,'TOPUP' AS `transaction_type`,'Top Up Balance' AS `description`,`tt`.`top_up_amount` AS `total_amount`,`tt`.`transaction_date` AS `created_on` from (`topup_transactions` `tt` left join `transaction` `t` on(`t`.`id` = `tt`.`id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `balance`
--
ALTER TABLE `balance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_code`);

--
-- Indexes for table `topup_transactions`
--
ALTER TABLE `topup_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`users_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `service_code` (`service_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `balance`
--
ALTER TABLE `balance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `topup_transactions`
--
ALTER TABLE `topup_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `balance`
--
ALTER TABLE `balance`
  ADD CONSTRAINT `balance_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `topup_transactions`
--
ALTER TABLE `topup_transactions`
  ADD CONSTRAINT `topup_transactions_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `balance` (`user_id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`service_code`) REFERENCES `services` (`service_code`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
