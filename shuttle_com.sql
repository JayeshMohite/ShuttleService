-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2023 at 02:40 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shuttle.com`
--

-- --------------------------------------------------------

--
-- Table structure for table `busdetails`
--

CREATE TABLE `busdetails` (
  `id` int(100) NOT NULL,
  `busName` varchar(255) NOT NULL,
  `busNumber` varchar(255) NOT NULL,
  `conductorName` varchar(255) NOT NULL,
  `conductorNumber` varchar(255) NOT NULL,
  `busRoute` varchar(255) NOT NULL,
  `totalseat` int(100) DEFAULT NULL,
  `busType` varchar(255) DEFAULT NULL,
  `available` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `busdetails`
--

INSERT INTO `busdetails` (`id`, `busName`, `busNumber`, `conductorName`, `conductorNumber`, `busRoute`, `totalseat`, `busType`, `available`) VALUES
(8, 'DadarFast', 'MH 21 GD 3213', 'James', '755486', 'Mulund-To-Dadar', 30, 'NON-AC', NULL),
(9, 'FastExpress', 'MH 02 AD 2237', 'Omkar', '788461', 'Mulund-To-Thane', 30, 'AC', NULL),
(10, 'Bus1', 'MH 01 AA 0001', 'Test1', '923216', 'Thane-To-Panvel', 45, 'AC', NULL),
(44, 'DadarFast', 'MH 21 GD 3213', 'busnew', '923218', 'Mulund-To-Thane', 42, NULL, NULL),
(48, 'testingnew', 'MH 02 AD 2231', 'Omkar', '755486', 'Mulund-To-Thane', 35, NULL, NULL),
(50, 'FastExpress', 'MH 21 GD 3213', 'James', '755486', 'Mulund-To-Thane', 42, NULL, NULL),
(55, 'BEST', '226', 'jayesh', '9768543456', 'vikroli to jogeshwari(west)', 60, 'NON-AC', NULL),
(60, 'A001', 'A001', 'James', '923218', 'Mulund-To-Dadar', 45, 'AC', 'false'),
(61, 'A002', 'A002', 'busnew', '455123', 'Mulund-To-Dadar', 40, 'NON-AC', NULL),
(66, 'A001', 'A001', 'James', '923218', 'Dadar-To-Mulund', 45, 'AC', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `busroute`
--

CREATE TABLE `busroute` (
  `routeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `busroute`
--

INSERT INTO `busroute` (`routeName`) VALUES
('Mulund-To-Dadar'),
('Mulund-To-Thane'),
('Thane-To-Panvel'),
('Dadar-To-Mulund');

-- --------------------------------------------------------

--
-- Table structure for table `bus_locations`
--

CREATE TABLE `bus_locations` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_locations`
--

INSERT INTO `bus_locations` (`id`, `username`, `latitude`, `longitude`, `timestamp`) VALUES
(3, 'A101', 19.12509940, 73.01354200, '2023-08-30 09:11:35'),
(5, 'A102', 19.12509820, 73.01354990, '2023-08-30 06:34:17'),
(7, 'superadmin', 19.13167830, 73.00527850, '2023-09-06 09:52:51'),
(8, 'superadmin', 19.13167830, 73.00527850, '2023-09-06 09:52:51'),
(9, 'superadmin', 19.13167830, 73.00527850, '2023-09-06 09:52:51'),
(10, 'superadmin', 19.13167830, 73.00527850, '2023-09-06 09:52:51'),
(11, 'superadmin', 19.13167830, 73.00527850, '2023-09-06 09:52:51'),
(12, 'superadmin', 19.13167830, 73.00527850, '2023-09-06 09:52:51'),
(13, 'A001', 19.02109400, 72.83779200, '2023-09-09 07:22:35'),
(14, 'A002', 19.10499300, 72.93092100, '2023-09-08 17:29:21');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(100) NOT NULL,
  `ticket_id` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `ticket_id`, `comment`, `timestamp`) VALUES
(1, '24d2ca2b-7c76-40d6-9f2f-c7ff752e9830', 'awdwqdq', '2023-08-17 11:45:15'),
(2, '24d2ca2b-7c76-40d6-9f2f-c7ff752e9830', 'adawdwqd', '2023-08-17 11:51:59'),
(3, '122c2a0d-0f2d-4e76-a0f5-495863897d61', 'Hiii', '2023-08-18 06:38:03'),
(4, '122c2a0d-0f2d-4e76-a0f5-495863897d61', 'New comment', '2023-08-21 05:59:07'),
(5, '66707df9-55b7-46b8-ac2c-23fd01b8bcc7', 'Hiiiii\n', '2023-08-21 06:22:01'),
(6, '66707df9-55b7-46b8-ac2c-23fd01b8bcc7', 'JHello', '2023-08-21 06:22:07'),
(7, '36cf8d07-5645-4b59-8977-60696066dfaa', 'when it will be fixed', '2023-08-21 07:20:34'),
(8, '36cf8d07-5645-4b59-8977-60696066dfaa', 'adawd\n', '2023-08-21 10:13:51'),
(9, '36cf8d07-5645-4b59-8977-60696066dfaa', 'its fixed', '2023-08-21 10:19:30'),
(10, '24d2ca2b-7c76-40d6-9f2f-c7ff752e9830', 'hii', '2023-08-22 05:50:46'),
(11, '66707df9-55b7-46b8-ac2c-23fd01b8bcc7', 'asdad', '2023-08-22 06:04:24'),
(12, '66707df9-55b7-46b8-ac2c-23fd01b8bcc7', 'adwadq', '2023-08-22 06:04:30'),
(13, '66707df9-55b7-46b8-ac2c-23fd01b8bcc7', 'fixed', '2023-08-22 06:05:38'),
(14, 'e92f69bf-f5f2-4bcd-958a-2b1e1731dd7d', 'Snejhaslsls', '2023-08-22 06:20:38'),
(15, 'e92f69bf-f5f2-4bcd-958a-2b1e1731dd7d', 'Snehaaaaaa', '2023-08-22 06:20:53'),
(16, 'e92f69bf-f5f2-4bcd-958a-2b1e1731dd7d', 'Snhejaa\njhkjk', '2023-08-22 06:21:31'),
(17, 'e92f69bf-f5f2-4bcd-958a-2b1e1731dd7d', 'sdfgvbjhghfdsrwaesdfghjvbn', '2023-08-23 09:46:33'),
(18, '413545a7-cadb-4ee5-9cf4-971089b78d53', 'Hiiii', '2023-09-06 10:31:33'),
(19, 'e92f69bf-f5f2-4bcd-958a-2b1e1731dd7d', 'Hhiiiada', '2023-09-06 10:33:34');

-- --------------------------------------------------------

--
-- Table structure for table `helpchat`
--

CREATE TABLE `helpchat` (
  `ticket_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `issue_description` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `issue_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `helpchat`
--

INSERT INTO `helpchat` (`ticket_id`, `name`, `email`, `issue_description`, `status`, `issue_type`) VALUES
('42b9780b-8583-41b1-8636-0f17f7ea3358', 'jayesh', 'jmtest.jio@gmail.com', 'Hi, First issue 1', NULL, NULL),
('c5b3cf22-1b98-493d-87af-2704c4645476', 'jayesh', 'jayesh1.mohite@ril.com', 'adadwq', NULL, NULL),
('28603c41-8f61-4011-8aa5-da083bac3f4b', 'awdaw', 'awdqwd', 'adwqdq', NULL, NULL),
('e9dd1a75-2276-4d2e-b63c-4cad6bb9a0df', 'dwdq', 'awdwa', 'adqwdq', NULL, NULL),
('2cccb3f5-9ab2-411d-b8d7-cafb27955a87', 'qwdq', 'qwdwqdq', 'wqdqwdqd', NULL, NULL),
('ed3a83be-7ec8-4787-9167-9f45891d130d', 'Done ', 'adadwa', 'adwadwa', NULL, NULL),
('24d2ca2b-7c76-40d6-9f2f-c7ff752e9830', 'jayesh Mohite', 'jayeshmohite11@gmail.com', 'jayesh new issue first 1\n', NULL, NULL),
('d1b485c3-47f1-417b-a6f5-22dfeda0c305', 'sakshi', 'ad@adwa.com', 'adwawdwad', NULL, NULL),
('046a5c17-bcae-4830-a609-5cff9533b6f5', 'sakshi', 'ad@adwa.com', 'adwawdwad', NULL, NULL),
('6fd4524e-122f-4789-9ba1-2db1a8194b3a', 'test', 'jayesh1.mohite@ril.com', 'mhgjgoi', NULL, NULL),
('122c2a0d-0f2d-4e76-a0f5-495863897d61', 'jayesh', 'jmtest.jio@gmail.com', 'qwertyt', 'Open', NULL),
('66707df9-55b7-46b8-ac2c-23fd01b8bcc7', 'JayeshTEst', 'jmtest.jio@gmail.com', 'New Test issue 1', 'Open', 'technical'),
('36cf8d07-5645-4b59-8977-60696066dfaa', 'chinmay', 'test.11W@ada.ac', 'adawodqdjqojdd', 'Open', 'Billing'),
('b97b3ae0-120b-44fd-84bb-c1b0146a17e7', 'Snhea', '', '', 'Open', ''),
('e92f69bf-f5f2-4bcd-958a-2b1e1731dd7d', 'Sneha', 'sbharambe23@gmail.com', 'kkjsjkajsk', 'Open', 'Billing'),
('413545a7-cadb-4ee5-9cf4-971089b78d53', 'sakshi', 'abc@gmail.com', 'dsgf jvdyihl srewasr lkjlkhiuy srdsxfggf', 'Closed', 'Technical');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2023-05-15 14:47:57', '2023-05-15 14:47:57'),
(2, 'moderator', '2023-05-15 14:47:57', '2023-05-15 14:47:57'),
(3, 'admin', '2023-05-15 14:47:57', '2023-05-15 14:47:57'),
(4, 'locator', '2023-08-25 11:41:02', '2023-08-25 11:41:13'),
(5, 'superadmin', '2023-08-25 11:42:30', '2023-08-25 11:42:36');

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `route` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `station` varchar(255) NOT NULL,
  `Km` int(100) NOT NULL,
  `routeName` varchar(255) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `stationNo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`station`, `Km`, `routeName`, `latitude`, `longitude`, `stationNo`) VALUES
('Nahur', 25, 'Mulund-To-Thane', NULL, NULL, NULL),
('cst', 5, 'Mulund-To-Thane', NULL, NULL, NULL),
('vashi', 60, 'Thane-To-Panvel', NULL, NULL, NULL),
('panvel', 80, 'Thane-To-Panvel', NULL, NULL, NULL),
('Malad', 50, 'Mulund-To-Thane', NULL, NULL, NULL),
('Mulund', 0, 'Mulund-To-Dadar', 19.168371, 72.965473, '1'),
('Ghatkopar', 25, 'Mulund-To-Dadar', 19.085649, 72.908218, '2'),
('Dadar', 75, 'Mulund-To-Dadar', 19.021094, 72.837792, '3'),
('Dadar', 0, 'Dadar-To-Mulund', 19.021094, 72.837792, '1'),
('Ghatkopar', 50, 'Dadar-To-Mulund', 19.085649, 72.908218, '2'),
('Mulund', 75, 'Dadar-To-Mulund', 19.168371, 72.965473, '3');

-- --------------------------------------------------------

--
-- Table structure for table `stationstatus`
--

CREATE TABLE `stationstatus` (
  `id` int(11) NOT NULL,
  `routeName` varchar(255) NOT NULL,
  `busName` varchar(255) NOT NULL,
  `stationPassed` varchar(255) NOT NULL,
  `stations` varchar(255) NOT NULL,
  `stationNo` int(11) NOT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stationstatus`
--

INSERT INTO `stationstatus` (`id`, `routeName`, `busName`, `stationPassed`, `stations`, `stationNo`, `latitude`, `longitude`) VALUES
(7, 'Mulund-To-Dadar', 'A001', 'notPassed', 'Mulund', 1, '19.168371', '72.965473'),
(8, 'Mulund-To-Dadar', 'A001', 'notPassed', 'Ghatkopar', 2, '19.085649', '72.908218'),
(9, 'Mulund-To-Dadar', 'A001', 'notPassed', 'Dadar', 3, '19.021094', '72.837792'),
(10, 'Mulund-To-Dadar', 'A002', 'notPassed', 'Mulund', 1, '19.168371', '72.965473'),
(11, 'Mulund-To-Dadar', 'A002', 'notPassed', 'Ghatkopar', 2, '19.085649', '72.908218'),
(12, 'Mulund-To-Dadar', 'A002', 'notPassed', 'Dadar', 3, '19.021094', '72.837792'),
(13, 'Dadar-To-Mulund', 'A001', 'passed', 'Dadar', 1, '19.021094', '72.837792'),
(14, 'Dadar-To-Mulund', 'A001', 'notPassed', 'Ghatkopar', 2, '19.085649', '72.908218'),
(15, 'Dadar-To-Mulund', 'A001', 'notPassed', 'Mulund', 3, '19.168371', '72.965473');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `TicketID` varchar(255) NOT NULL,
  `Timestamp` varchar(255) NOT NULL,
  `SelectedRoute` varchar(255) NOT NULL,
  `SelectedBusID` int(100) NOT NULL,
  `SelectedPickUpPoint` varchar(255) NOT NULL,
  `SelectedDropPoint` varchar(255) NOT NULL,
  `TotalSeats` int(100) NOT NULL,
  `TotalDistance` int(100) NOT NULL,
  `Fare` int(100) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `busType` varchar(255) DEFAULT NULL,
  `verificationStatus` varchar(255) DEFAULT NULL,
  `PaymentStatus` varchar(255) DEFAULT NULL,
  `refundStatus` varchar(255) DEFAULT NULL,
  `paymentId` varchar(255) DEFAULT NULL,
  `refund_id` varchar(255) DEFAULT NULL,
  `PaymentType` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`TicketID`, `Timestamp`, `SelectedRoute`, `SelectedBusID`, `SelectedPickUpPoint`, `SelectedDropPoint`, `TotalSeats`, `TotalDistance`, `Fare`, `userId`, `busType`, `verificationStatus`, `PaymentStatus`, `refundStatus`, `paymentId`, `refund_id`, `PaymentType`, `created_at`) VALUES
('9d10f9ac-742a-4d52-95e5-89a88c78fe74', '7/23/2023, 5:58:29 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 2, 40, 800, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('a14673b0-fd63-4998-bc9f-63931e60df4a', '7/23/2023, 6:31:58 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8dffbbfe-521b-47e9-8b22-2ca93f772be5', '8/4/2023, 3:36:26 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Parel', 1, 15, 75, '60', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('0cbb61be-b946-4e6a-af1d-b677730400eb', '8/4/2023, 3:36:58 PM', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 100, '60', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('1aceb400-3a17-4bc4-93f2-bf91f5aa7a4f', '8/4/2023, 4:31:09 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('7fe9c745-202f-4a90-8952-6be952f1659b', '8/4/2023, 4:33:18 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('9f31ce11-92bc-4fd2-ba24-b9e9cb6e8157', '8/4/2023, 4:37:13 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('ead06bac-e00b-42c1-b36c-eef9ffe83d48', '8/4/2023, 4:38:38 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('179e7e0d-94fd-4e26-aa01-b415e465906a', '8/4/2023, 4:44:33 PM', 'Mulund-To-Dadar', 46, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('26fbd21e-2dac-46ba-be61-827791e3402b', '8/4/2023, 5:00:50 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('e2e2ea30-4173-4578-b962-268feeb60d5e', '8/4/2023, 5:02:10 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8ae57ca5-6ea2-498f-9606-ff1910d200ce', '8/4/2023, 5:06:15 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('36f6875b-589c-46aa-88c6-2d198a68649a', '8/4/2023, 5:25:00 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('96f76de6-3f2e-494f-9ff5-2bc35fb48983', '8/4/2023, 5:28:20 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('03ebcdcd-0db4-4ad8-9d4f-81bcd8a85a87', '8/4/2023, 5:30:52 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('3abaa740-ab58-4321-b6af-2d2c9e6a03d0', '8/4/2023, 5:32:29 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 150, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('9d530fa0-757f-48b6-bb52-c3abbd403c1f', '8/4/2023, 5:50:11 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8a4160f8-52eb-4803-93cf-b324f763cdb6', '8/4/2023, 5:50:32 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('202e7e0b-06a8-4bed-ad49-9ca10469bfba', '8/4/2023, 5:50:39 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('3420585b-5903-4f6b-b0ea-218e5133228e', '8/4/2023, 6:16:15 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('27936121-b79d-4a15-9457-8a66d47b26ff', '8/4/2023, 6:33:16 PM', 'Mulund-To-Dadar', 46, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('b3a81a1f-6459-41d5-9909-d008942df3bb', '8/4/2023, 6:34:49 PM', 'Mulund-To-Dadar', 46, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('66dd2294-eeeb-41f3-9667-e04778574eea', '8/4/2023, 6:36:23 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('26f65eda-a551-4ce6-91df-401e9f49489e', '8/4/2023, 6:37:42 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('e8844318-06d4-4d2f-83d0-d22650d0e36d', '8/4/2023, 6:46:18 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('cfd0c1f0-0997-41a6-ba82-f01eb84aca29', '8/4/2023, 6:47:04 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('f951f58a-b8a1-401a-a853-e41822e7b6a1', '8/4/2023, 6:48:28 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('3efdca3b-842c-4cbc-8e30-a968f4df6763', '8/4/2023, 6:49:36 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('fde44a74-2880-464f-bb8d-4b9e85d2e574', '8/4/2023, 6:50:05 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('4f3cc608-f8e4-4d24-ae78-0d380dc12aa1', '8/4/2023, 6:52:54 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 150, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('1310533b-7a21-4c23-8b6e-05281796941d', '8/4/2023, 6:55:54 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('69d2f384-788b-4c5e-b0b6-2420d2bdc3a1', '8/4/2023, 6:58:25 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('3f0ed82e-768a-4c7b-8d14-cd41c3191f5c', '8/4/2023, 6:58:55 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('4d831a3a-7486-491e-9dba-38a237ec91d5', '8/4/2023, 7:00:23 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('d2cd5543-c607-4af3-a823-50f8e2a0c878', '8/4/2023, 7:04:05 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('1f530f1d-1039-4651-95a7-b670c933595b', '8/4/2023, 7:04:52 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('b0d05c1d-5eda-4088-b836-0e1a51627e2d', '8/4/2023, 7:05:40 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('2a28105d-ff6c-4901-b16c-9adb3b02a753', '8/4/2023, 7:07:05 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('03c79532-8983-4436-b9bc-a1d281207db4', '8/4/2023, 7:08:20 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('1f5b137a-899c-4054-8780-f7803ada915a', '8/4/2023, 7:08:57 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('e13a1294-5694-4dcd-b8ca-d36f3ed9a982', '8/4/2023, 7:10:45 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('a4a02fde-1be7-43ad-9ce4-30adca52863f', '8/4/2023, 7:12:29 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('0edc68f0-c1bf-4437-8423-f3f57083629a', '8/4/2023, 7:13:48 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('af9a92ad-9823-4cc5-b187-572f135f9dc2', '8/4/2023, 7:14:32 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('abc17339-bf3b-4d18-ba25-bbf8b277e034', '8/4/2023, 7:17:57 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('763935a5-fa04-4493-9f06-5bcc3df9349f', '8/4/2023, 7:21:09 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8b41d165-44fe-4d15-9a65-4acec91f9333', '8/4/2023, 7:21:57 PM', 'Mulund-To-Thane', 44, 'cst', 'Malad', 1, 45, 225, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('f464c4da-bfe6-4fd0-ac71-8469880e062f', '8/4/2023, 7:23:08 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('527a44ef-d85e-4d5e-827c-392c418a7431', '8/4/2023, 7:24:13 PM', 'Mulund-To-Thane', 9, 'cst', 'Malad', 1, 45, 225, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('fc2cb8ef-f155-426b-9fe8-46316e5e7108', '8/4/2023, 7:24:45 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('d508ae70-2b31-4207-8902-fb5a0b509dc9', '8/4/2023, 7:27:34 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('649d8c4d-e672-4f79-8826-5e9c3452822b', '8/4/2023, 7:28:53 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('a8623e47-3a6f-44c5-97f6-109f8e6f281e', '8/4/2023, 7:29:17 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('067f9257-9396-4638-a26b-09f43686397e', '8/4/2023, 7:32:28 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('79c93481-3c49-42d0-9f4d-33d346c73d59', '8/4/2023, 7:34:21 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('e698ce75-8b9e-42f5-aaad-34e97cab79c6', '8/4/2023, 7:36:36 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('c0d80253-f69c-486a-93ca-bebeddb92c3b', '8/4/2023, 7:39:30 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('950bbd32-d09a-4c0d-b951-602caca00d33', '8/4/2023, 7:39:50 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('dbfcc132-9a8c-4968-a10e-f9d1dd04b272', '8/4/2023, 7:40:32 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('50ec9f46-0c0a-4e24-918a-848ea9445340', '8/4/2023, 7:46:41 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('c17b4e1f-8aa2-4096-a9ae-ec0acffe3223', '8/4/2023, 7:48:12 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('41c9b0fb-3600-4067-b1f1-f1f6419fbdb6', '8/4/2023, 7:50:11 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('3b269e04-f537-41c5-a0f7-171c2490d106', '8/4/2023, 7:50:46 PM', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 200, '8', 'AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('ac353574-6be9-43b0-a67f-b6f9a160b6cf', '8/4/2023, 7:53:37 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8e695c0a-c573-476d-b18b-289f8b2303a9', '8/4/2023, 8:02:14 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('29b55162-f010-4d10-9d19-42fd68efaf97', '8/4/2023, 8:20:15 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('651ea759-8e05-4844-a570-296ea23e4566', '8/4/2023, 8:20:56 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('7293dfc1-c28c-4917-ae1d-598cf446f7d5', '8/4/2023, 8:29:13 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('d51388c5-be22-4276-b965-411edd44ed59', '8/4/2023, 8:31:00 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 25, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('32deb617-3253-42c0-a0c9-f663c07b8a6d', '8/4/2023, 8:44:36 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8866c556-4d48-4a8c-b23d-91aa8fa4f448', '8/4/2023, 8:52:26 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Airoli', 1, 10, 50, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('00eb9542-2087-4edc-a717-8e483b4fbf53', '8/4/2023, 8:55:01 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('d2525525-4f29-4362-a0be-c86c8c668a61', '8/4/2023, 9:02:50 PM', 'Mulund-To-Dadar', 8, 'Rabale', 'Parel', 1, -15, -150, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('642a46df-9948-4b88-bdf6-349b0e72eec1', '8/4/2023, 9:02:56 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('a8c825ee-2675-4d95-b0c0-8b2074a377e6', '8/4/2023, 9:07:06 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('99f1c77a-a2e9-4054-9bfe-6c7e2fa215d5', '8/4/2023, 9:11:31 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('cea04642-baca-469d-a12a-acd5654ddaaa', '8/4/2023, 9:12:51 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('08d4895f-e4be-40a7-a43c-d1a8dfbc3fe8', '8/4/2023, 9:13:58 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('dc4c4936-ef4e-4035-8370-5714186b0375', '8/4/2023, 9:14:59 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('3d3d0322-c54c-4c91-8412-0ceda02ab8cd', '8/4/2023, 9:18:26 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('e006df12-3ffc-4bfe-8e9d-47a8983b1e6c', '8/4/2023, 9:18:53 PM', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('d2da439f-82c5-4a31-97ab-9d3f8ad15e36', '8/4/2023, 9:23:58 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '60', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('c3916af1-1553-4014-bf97-7a79972d6c07', '8/4/2023, 9:25:33 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '60', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('3bf248f4-8378-439f-9fcc-8a5bafa3221b', '8/4/2023, 9:26:27 PM', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 100, '5', 'NON-AC', 'Verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('7af80099-d8e4-4fcd-80da-adc50fc85916', '8/5/2023, 1:04:24 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('d2236c7c-c140-43e9-91bb-1de40cd05450', '8/5/2023, 1:05:58 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('85718f2b-9108-45cc-826f-1bdf7e01672b', '8/5/2023, 1:06:29 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('9488f23f-d0e7-481b-98ab-8349088ef649', '8/5/2023, 1:06:39 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('eb855f42-8d83-4445-882b-85228f466e32', '8/5/2023, 1:06:48 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('0d3ca82f-5eac-48eb-832c-3e2f564a48a4', '8/5/2023, 1:37:13 PM', 'Mulund-To-Thane', 9, 'cst', 'Malad', 1, 45, 450, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('c1a6ff0f-1e99-4377-934b-6edff0e0f7a9', '8/9/2023, 10:15:30 AM', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 3, 50, 1500, '8', 'AC', 'verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('6b2d5d52-01f3-4dfb-9920-6c6c4eac5a0d', '8/15/2023, 3:45:22 PM', 'Dadar-To-Thane', 8, 'Dadar', 'Thane', 4, 60, 1800, '8', 'AC', 'Verified', 'successful', 'not-applicable', NULL, NULL, NULL, '2023-09-11 08:43:13'),
('b29b697e-0419-45d2-bc6c-35c5b45ce0a1', '8/22/2023, 1:20:10 PM', 'Mulund-To-Rabale', 8, 'Mulund', 'Rabale', 2, 30, 900, '8', 'NON-AC', 'Verified', 'successful', 'not-applicable', NULL, NULL, NULL, '2023-09-11 08:43:13'),
('d8ee786d-0aa1-42b2-9aaf-7a68684d5d4a', '8/28/2023, 9:30:05 AM', 'Dadar-To-Thane', 8, 'Dadar', 'Thane', 5, 100, 3000, '8', 'AC', 'verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('21f06e10-e58c-4e6e-bb6f-74a7d05b23f8', '9/5/2023, 2:40:55 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 2, 20, 400, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8a3e1c91-49b2-47f7-a78e-7870ad8d2892', '9/10/2023, 8:10:30 AM', 'Thane-To-Dadar', 8, 'Thane', 'Dadar', 1, 25, 250, '8', 'NON-AC', 'Verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('23f18a60-cc13-48a1-a9ca-2e1e763c758e', '9/18/2023, 11:55:00 AM', 'Mulund-To-Rabale', 8, 'Mulund', 'Rabale', 3, 60, 1800, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('def2bb99-2159-47b3-8ef5-17e7021d7026', '9/22/2023, 6:30:20 PM', 'Rabale-To-Mulund', 8, 'Rabale', 'Mulund', 4, 80, 2400, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('f43cec6e-4f13-49e9-b467-be4961541e3b', '8/5/2023, 5:42:44 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '5', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('c0a800c9-eadc-4d35-aa8e-1c88b404461a', '8/5/2023, 5:43:23 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '5', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('1e61d976-19ac-4c35-94c5-cb57343b55e9', '8/5/2023, 5:43:29 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '5', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('34ba612d-f178-434c-95d1-62a82dde3690', '8/6/2023, 1:36:58 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('ad0577c6-ad39-467a-a1a1-c25082dfd70e', '8/6/2023, 1:50:56 PM', 'Yash-To-Jayesh', 54, 'Yash', 'Jayesh', 1, 100, 1000, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('c58a1053-b50a-41d1-b729-f87948cdeee8', '8/6/2023, 1:51:14 PM', 'Yash-To-Jayesh', 54, 'Yash', 'Jayesh', 1, 100, 500, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('03e5d623-65b8-4bac-a921-9b01474ce476', '8/6/2023, 3:43:32 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('446ea2cc-3fec-4601-bec8-da2ace39d9b0', '8/6/2023, 3:44:46 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('f81af486-fb43-4ce1-a7e7-9e8b96e1bd79', '8/6/2023, 3:45:01 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8652e83d-0fa1-421b-b297-6c48e36d5fd1', '8/6/2023, 3:45:27 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('41705a3f-c247-43a5-afe9-b7e9dbc6543a', '8/6/2023, 3:45:40 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('0e1cee7a-270a-47b9-876a-2084f90f33e6', '8/6/2023, 3:46:36 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('9fc642bf-0914-4259-a940-80c76cc52157', '8/6/2023, 3:47:29 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('4a3eb74c-f678-4511-9626-b5f1ca0f90bb', '8/6/2023, 3:48:12 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('0ae81376-abac-479f-af72-8ec061c7aeb2', '8/6/2023, 3:49:51 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8b844b61-a995-4b4a-a760-4f81ffb68ac8', '8/6/2023, 3:50:51 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Rabale', 1, 30, 300, '8', 'AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('5334a6ec-b77a-4232-b825-f0ef4d85fc8c', '8/6/2023, 3:52:01 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('bb0463e2-4c3a-486e-83ec-84289e69f8be', '8/6/2023, 3:56:52 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('b4a3360f-c0e9-45d4-8297-14c70365271e', '8/6/2023, 3:58:10 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('69801163-28f5-45fb-b217-0f13f5e426b4', '8/6/2023, 6:10:04 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '5', 'NON-AC', 'Verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('935e4549-7520-4b39-a650-5370b320ee7e', '8/6/2023, 6:12:22 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '5', 'NON-AC', 'Verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('87cf10e6-6615-4cde-8d01-a6a0e6dd0462', '8/8/2023, 10:51:49 AM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('beb34ceb-1c29-4301-a781-dfb82deb383a', '8/8/2023, 12:06:53 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('7df83c3a-9bcf-4dff-90d3-cf58a1aa2582', '8/8/2023, 12:07:45 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 300, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('b695168e-de8f-4c98-800c-df718fe8c32e', '8/8/2023, 12:10:29 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('333685b2-4c12-4366-a991-79fe3b17f896', '8/8/2023, 12:11:49 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('a7c99b73-8bc8-406a-9c12-888e402e9b7a', '8/8/2023, 12:14:32 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('5ca57a90-5818-4bba-96e2-95e30ed475d5', '8/8/2023, 12:16:29 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'successful', 'applicable', NULL, NULL, NULL, '2023-09-11 08:43:13'),
('da80cbc2-365f-4bef-bdd7-b581c66258d2', '8/8/2023, 12:17:52 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', NULL, NULL, NULL, '2023-09-11 08:43:13'),
('8a529107-1993-422e-b0a4-5da4fc218c03', '8/8/2023, 12:30:21 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MNU4f4ZuGE8qjY', NULL, NULL, '2023-09-11 08:43:13'),
('4d199f9a-cd42-4065-a693-76b1b7080200', '8/8/2023, 12:31:32 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', NULL, NULL, NULL, '2023-09-11 08:43:13'),
('d3aa5906-1db3-4954-bba5-cc3b5c6ab029', '8/8/2023, 12:33:34 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', NULL, NULL, NULL, '2023-09-11 08:43:13'),
('022673ac-fdb3-48a4-b095-a0ae071a66a5', '8/8/2023, 12:37:30 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('9c2e666d-78e7-46e1-a296-7322d2e22950', '8/8/2023, 12:37:43 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('49767ca5-e64c-4291-be7a-bf93eccd1b45', '8/9/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'pay_MNqZrthiPLKppW', NULL, NULL, '2023-09-11 08:43:13'),
('4ffd3847-546e-4dc2-b24b-b3c3c9e10534', '8/9/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('634239ad-0dc6-409b-8b4f-a1157c674e41', '8/9/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'pay_MNvN2kuWfmpddx', NULL, NULL, '2023-09-11 08:43:13'),
('af931b69-2d39-46b6-9b4d-775228de5765', '8/9/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MNvZPoHYKwQhGh', NULL, NULL, '2023-09-11 08:43:13'),
('c51209bd-a47a-40ec-bafb-0727597f4852', '8/9/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'pay_MNvaImkZZeMqG7', NULL, NULL, '2023-09-11 08:43:13'),
('6be05b74-8978-4374-b940-ca52e025ade2', '8/9/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 1, 10, 100, '8', 'AC', 'Not-verified', 'successful', 'Refunded', 'pay_MNvocU7D1EpopV', 'rfnd_MNvqoT0mFADHo8', NULL, '2023-09-11 08:43:13'),
('7da986d1-c305-4adf-bba8-b3355b613310', '8/9/2023', 'Mulund-To-Dadar', 46, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', 'Refunded', 'pay_MNvpKZtUnpA4Vr', 'rfnd_MNvqqBl1B3eNTS', NULL, '2023-09-11 08:43:13'),
('47b22c0c-9a9b-4a74-92da-cd070027faab', '8/10/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Verified', 'successful', 'not-applicable', 'pay_MOFaFHAYxirgPI', 'rfnd_MOFbHp4rZMjSwI', NULL, '2023-09-11 08:43:13'),
('d88da048-a0ec-4f41-b0a7-6b01d624d03d', '8/10/2023', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', 'Refunded', 'pay_MOFfV7HyjL7WDp', 'rfnd_MOFgQuu7NljRML', NULL, '2023-09-11 08:43:13'),
('73e67792-0fbd-4a9f-996d-2fd79f240cd6', '8/10/2023', 'Mulund-To-Dadar', 46, 'Mulund', 'Rabale', 1, 40, 400, '5', 'AC', 'Verified', 'successful', 'applicable', 'pay_MOFjnlRi3rlCRr', NULL, NULL, '2023-09-11 08:43:13'),
('14919f03-f998-4694-8e97-2e5a8f7501d3', '8/10/2023', 'Mulund-To-Dadar', 8, 'Rabale', 'Parel', 1, -15, -150, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('2b4c7170-2542-4f89-ba4e-06b7ccce42f2', '8/10/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('367556e0-c64e-41f7-8378-8f2628416f48', '8/10/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Not-verified', 'successful', 'Refunded', 'pay_MOG0pDF87StdkY', 'rfnd_MOGMguunQlwd1l', NULL, '2023-09-11 08:43:13'),
('98633b79-7d9c-43b6-959e-a885e7efd4fd', '8/10/2023', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Verified', 'successful', 'not-applicable', 'pay_MOG9E9j0j77vxa', NULL, NULL, '2023-09-11 08:43:13'),
('f1f55ec8-31e6-445f-b269-58b702a19344', '8/10/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', 'Refunded', 'pay_MOGLafGVpqy0D9', 'rfnd_MOGMiX8GFIErUX', NULL, '2023-09-11 08:43:13'),
('ad19e3ef-5a81-4778-860f-608f09f417d8', '8/10/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', 'Refunded', 'pay_MOGZoJ034ljAjs', 'rfnd_MOGaOfzKoDyAzr', NULL, '2023-09-11 08:43:13'),
('80b2083e-60ab-4b57-976a-5147a99f6397', '8/10/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', 'Refunded', 'pay_MOGmLrb9EgORSK', 'rfnd_MOGn1v7sjC7Hwu', NULL, '2023-09-11 08:43:13'),
('da88af50-ca5b-4efa-82b4-ac4e73433f7f', '8/17/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Verified', 'successful', 'not-applicable', 'pay_MR7tHrdFtpSnEO', NULL, NULL, '2023-09-11 08:43:13'),
('d7ba9b39-9905-479f-9e6d-3da67872e8d4', '8/17/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('ca5feb0d-d6e4-4cdc-b953-51633b74916c', '8/18/2023', 'Mulund-To-Dadar', 8, 'Rabale', 'Parel', 1, -15, -75, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('ef9fead4-a804-4d74-975b-dcf3bc2dc51a', '8/18/2023', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Verified', 'successful', 'not-applicable', 'pay_MRRTA2128pWalT', NULL, NULL, '2023-09-11 08:43:13'),
('bdba1fb7-d88e-4ad7-9601-f657dfb3c6e8', '8/22/2023', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 4, 30, 1200, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('392224ad-5b2b-4a9a-a87a-a37e3f394283', '8/22/2023', 'Mulund-To-Thane', 44, 'cst', 'Malad', 3, 45, 1350, '8', 'AC', 'Verified', 'successful', 'not-applicable', 'pay_MT18QS1Sms3NtE', NULL, NULL, '2023-09-11 08:43:13'),
('0e18142f-c3d1-4268-8b18-bb5708a19506', '8/22/2023', 'Mulund-To-Thane', 48, 'cst', 'Nahur', 1, 20, 100, '61', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'pay_MT1E07aGRdFIsd', NULL, NULL, '2023-09-11 08:43:13'),
('915c873a-20ec-4afa-8191-c00b0f1cbcb5', '8/23/2023', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 300, '8', 'AC', 'Verified', 'successful', 'not-applicable', 'pay_MTP8K1w4LAZ95Z', 'rfnd_MTPElfqXAJE7Fr', NULL, '2023-09-11 08:43:13'),
('fa4efa85-6c7b-486b-9b6a-41bb09a87499', '8/23/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 1, 10, 100, '8', 'AC', 'Verified', 'successful', 'not-applicable', 'pay_MTPUohuNztPARl', NULL, NULL, '2023-09-11 08:43:13'),
('5a427423-3f5b-4bce-a273-52e26aa50795', '8/23/2023', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 25, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, NULL, '2023-09-11 08:43:13'),
('ad06b6e2-a698-43ed-a8a0-581afe9cdf9c', '8/23/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('865a9fb1-7b22-4d53-9a49-52ab818e6f78', '8/23/2023', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 150, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('2454a4b0-4821-490b-8d5a-ea3539896882', '8/23/2023', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('766c2217-d228-4dd9-96e6-32ccb7a82e47', '8/23/2023', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('410289e2-6bd5-4e9d-8fa7-51071b7b7359', '8/23/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('17e208af-4011-4fa6-9843-f0dc9069d2de', '8/23/2023', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('bf882300-f726-4316-a4c9-e1f937fa0eef', '8/23/2023', 'Mulund-To-Thane', 44, 'cst', 'Malad', 1, 45, 225, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('29a9a1bd-2f88-425d-bb4c-9b7d32bdbc56', '8/23/2023', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('82528b2e-3c6e-41d0-aa63-1367b2e3f895', '8/23/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 1, 10, 100, '8', 'AC', 'Verified', 'successful', 'not-applicable', 'pay_MTPqqy1kQN7Usu', NULL, NULL, '2023-09-11 08:43:13'),
('9992ff8b-b811-4b68-b835-42a8129eec8b', '8/23/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 1, 10, 100, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('4b024f5b-a283-49f2-aa5e-f5f2ecc44fdf', '8/23/2023', 'vikroli to jogeshwari(west)', 55, 'vikroli', 'tolani', 3, 5, 75, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('7edbfd16-6c03-48d2-8068-0682ee7cabac', '8/23/2023', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 100, '8', 'NON-AC', 'Verified', 'successful', 'not-applicable', 'pay_MTSsTIibYQwEZX', NULL, NULL, '2023-09-11 08:43:13'),
('4bdb5d41-34bd-4c68-a53d-e682f15f44ca', '8/30/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Verified', 'successful', 'not-applicable', 'pay_MWDxYUeaTSaLB6', NULL, NULL, '2023-09-11 08:43:13'),
('41260fa4-5d12-4e7f-8c29-a10a4235772d', '8/30/2023', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('55fb72ad-65fa-45d3-898f-fa3650585e56', '8/30/2023', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 300, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('103a40b7-8333-4874-aa33-feda3de246f4', '8/31/2023', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', 'successful', 'Refunded', 'pay_MWZAt35y3ABcXF', 'rfnd_MWZGPrs1J4JB5a', NULL, '2023-09-11 08:43:13'),
('f33dd29b-9333-4761-bef7-fcd8c1c4b7ef', '8/31/2023', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, NULL, '2023-09-11 08:43:13'),
('3d1f53a9-3352-4e42-bec8-fcb2af00d48b', '8/31/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Refunded', 'successful', 'Refunded', 'pay_MWZTrptfy8O7zm', 'rfnd_MWZUUhZ3SakN8u', NULL, '2023-09-11 08:43:13'),
('3a329090-34d6-4149-a149-44748f30e018', '9/5/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 1, 10, 100, '8', 'AC', 'Refunded', 'successful', 'Refunded', 'pay_MYYPEWJCUHYB68', 'rfnd_MYYWidjdQmg4nl', NULL, '2023-09-11 08:43:13'),
('a9fafd9e-a356-43a5-9316-46e6ee9fa6bc', '9/5/2023', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 3, 15, 450, '8', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MYYWAf0jyXhGMU', NULL, NULL, '2023-09-11 08:43:13'),
('b1d56588-fea1-4475-bcb1-5ea67bfbf8fa', '9/5/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MYYkhI05RBTRiZ', NULL, NULL, '2023-09-11 08:43:13'),
('d317aa3e-0b7d-46bd-82fa-f449e22768de', '9/5/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 1, 10, 100, '8', 'AC', 'Refunded', 'Refunded', 'Refunded', 'pay_MYYnZyb0hz6XCq', 'rfnd_MYYoaGr6QMJgBX', NULL, '2023-09-11 08:43:13'),
('87daafb2-becc-405a-a526-34427970e548', '9/5/2023', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Refunded', 'Refunded', 'Refunded', 'pay_MYYvYzBJmSTSk7', 'rfnd_MYYxKI2KfqGW6H', NULL, '2023-09-11 08:43:13'),
('af2318e8-8a0b-42cf-950c-326eb905ced2', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '71', 'AC', 'Refunded', 'Refunded', 'Refunded', 'pay_MYwCmlzs7xz0FM', 'rfnd_MYwzskFpT1Rr4v', 'Online', '2023-09-11 08:43:13'),
('c1326fc0-ef36-4150-9fd9-626a0c76ff39', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 1, 10, 50, '71', 'NON-AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 08:43:13'),
('d669ea7b-1109-4a09-9015-f73f8db98c81', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 1, 10, 50, '71', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('92fdb39e-2656-42bf-a9ca-22ee9110248c', '9/6/2023', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 200, '71', 'AC', 'Verified', 'successful', 'not-applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('53f9c82b-36e1-4887-a88d-0c25e84ab9e6', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 1, 10, 100, '71', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('f03ef56d-4bee-413e-8e1c-cfbcf22725dd', '9/6/2023', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 250, '71', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('3acf7459-1cf8-459d-aa59-1ae83b48edda', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '71', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('b88d573f-e59e-407c-88e7-9356fb54936b', '9/6/2023', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 300, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('abb014ea-7d08-4b75-8554-b13b931dc2b8', '9/6/2023', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 250, '5', 'AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('02d50d25-34cc-46ee-8479-8dd33cc6d9b4', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '5', 'AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('730cf50d-0fcc-4dea-a937-8f6c6810f7a7', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '5', 'NON-AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('1d3f2643-2336-4074-81be-ccaef8ecb56e', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '5', 'AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('d302b503-9bf3-4c32-8a48-b49330be127f', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '5', 'AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('4bcfa85a-2cee-4fd5-b4ba-3a15dee0c373', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '5', 'AC', 'Refunded', 'Refunded', 'Refunded', 'pay_MYxjU7ccHoXcin', 'rfnd_MYxkqQoM9Ld3AW', 'Online', '2023-09-11 08:43:13'),
('43fb36b6-6dd8-473c-8ab0-225159f76f75', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '5', 'NON-AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('c4664e41-c3fe-467c-af8f-c26ce20bbb10', '9/6/2023', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 250, '5', 'AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('032347dc-344c-422c-8f05-ae8e4fa86d80', '9/6/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '5', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'pay_MYxq155ypJqZQK', NULL, 'Online', '2023-09-11 08:43:13'),
('33f72185-8920-4926-8dc8-2b9c1ac0ed70', '9/6/2023', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 100, '5', 'NON-AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('1c4daaa1-a064-476c-a951-48ea42d3a193', '9/6/2023', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 250, '71', 'AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('8e9bfdbf-65e4-4ec7-8f05-94dbb75e774c', '9/6/2023', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 250, '71', 'AC', 'Refunded', 'Refunded', 'Refunded', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('8dea915b-baf9-4e47-9f2c-9800e24fb04e', '9/9/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 1, 50, 500, '71', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('35d6be06-3e91-4290-b7f5-32d4efcfe049', '9/9/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 1, 50, 500, '71', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MaA1JFzi9riR9Q', NULL, 'Online', '2023-09-11 08:43:13'),
('cf70fd24-98dc-41ae-ba0a-be62f1d047cd', '9/9/2023', 'Dadar-To-Mulund', 66, 'Ghatkopar', 'Mulund', 1, 25, 250, '71', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('1b12efcc-2b2c-4a63-914c-3dfb81aa452a', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 3, 50, 1500, '71', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MavLTbkdw2NqlV', NULL, 'Online', '2023-09-11 08:43:13'),
('d0322844-e3e4-45b4-ad01-6b73275f9421', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 4, 75, 3000, '8', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MavW79NYehpkpS', NULL, 'Online', '2023-09-11 08:43:13'),
('f2e32491-7657-4d5f-9b31-ca21f883e0f4', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 2, 75, 1500, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, 'Online', '2023-09-11 08:43:13'),
('fd22ef1b-fc74-46ab-90c1-ad8a088c6418', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 4, 50, 2000, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MavbuBPjvPbzF7', NULL, 'Online', '2023-09-11 08:43:13'),
('8805392f-d2ec-4be7-844a-5d70bc228633', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 2, 50, 1000, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 08:43:13'),
('b7546f07-745f-4392-84e2-d261368abe17', '9/11/2023', 'Dadar-To-Mulund', 66, 'Ghatkopar', 'Mulund', 1, 25, 250, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('b0550799-f25f-4b7d-892e-9497948ff7ff', '9/11/2023', 'Dadar-To-Mulund', 66, 'Ghatkopar', 'Mulund', 1, 25, 250, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('1abc866f-4485-423b-afd9-bb41f1cfce6a', '9/11/2023', 'Dadar-To-Mulund', 66, 'Ghatkopar', 'Mulund', 5, 25, 1250, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 08:43:13'),
('d6c817a6-f173-4563-b5f3-1db97439ca0a', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 1, 50, 500, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:43:13'),
('53b80e96-7537-4c58-8f8e-e8f3ffa59bab', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 1, 50, 500, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:47:25'),
('83ff9527-8c61-474d-be40-a539de9a8a6c', '9/11/2023', 'Dadar-To-Mulund', 66, 'Ghatkopar', 'Mulund', 1, 25, 250, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 08:47:55'),
('439ec976-9225-4608-a62b-90b7fb8d023f', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 1, 75, 750, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 08:53:54'),
('13b00ea3-7dc3-4edf-8420-29f2c5a4557b', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 1, 50, 500, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 08:54:39'),
('49e76e80-0b33-46ef-a799-c40595ff4284', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 1, 75, 750, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MayC2H6GFKX9rh', NULL, 'Online', '2023-09-11 08:55:16'),
('b1e975dd-21f5-4f23-a0b1-58b34a381b9a', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 1, 75, 750, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 09:00:51'),
('a2b72a5a-c275-4008-9315-78b65e11bfd8', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 2, 75, 1500, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 09:06:32'),
('bc66d7b3-ec45-42f4-8c2a-93523128a3cc', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 1, 50, 500, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 09:09:40'),
('6cab0bf9-520d-40f2-b4de-8dee203b41fc', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 1, 50, 500, '5', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, 'Online', '2023-09-11 09:10:40'),
('ef123455-6c25-40b1-b835-4f8b63a15fc3', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 1, 75, 750, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 09:17:54'),
('4bced9d8-f773-4414-98ce-aef481a7ee5b', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 1, 75, 750, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 09:21:57'),
('76e96695-f497-4a06-b58b-63440d584d51', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 1, 75, 750, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 09:24:24'),
('5bc8888e-bbc1-4cb2-b5cf-54e4814b173f', '9/11/2023', 'Dadar-To-Mulund', 66, 'Ghatkopar', 'Mulund', 1, 25, 250, '5', 'AC', 'Not-verified', NULL, NULL, NULL, NULL, 'Wallet', '2023-09-11 09:28:15'),
('789966ba-a6b0-4fd2-b126-c2fe52a7cb12', '9/11/2023', 'Dadar-To-Mulund', 66, 'Ghatkopar', 'Mulund', 1, 25, 250, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 09:29:33'),
('360c9cf9-49e9-4440-9758-11c5e48ae19d', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Ghatkopar', 1, 50, 500, '5', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA', NULL, 'Online', '2023-09-11 09:29:58'),
('de77c1d4-a6a2-4ecb-a377-662d0f3240bc', '9/11/2023', 'Dadar-To-Mulund', 66, 'Ghatkopar', 'Mulund', 1, 25, 250, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'Wallet', NULL, 'Wallet', '2023-09-11 09:30:56'),
('7f2a9636-ee34-4baa-97f6-2e88d308ad31', '9/11/2023', 'Dadar-To-Mulund', 66, 'Dadar', 'Mulund', 1, 75, 750, '5', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_Mayo2ofFvjf8ZG', NULL, 'Online', '2023-09-11 09:31:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `phone`) VALUES
(1, 'test123', 'test123@hasd.com', '$2a$08$hEx9zyyPjVw0eN2Qt0YJXu6Hv4HCkb2r5KAXD91tZVjBfHsJCYccK', '2023-05-15 14:49:08', '2023-05-15 14:49:08', NULL),
(2, 'test12', 'test123@hasad.com', '$2a$08$nIsrbMEESi1TPzIZTEZf7eJm97eNbNlQLak6EuFFuYvc8YCfDndBK', '2023-05-15 14:49:27', '2023-05-15 14:49:27', NULL),
(4, 'test11', 'test1@hasad.com', '$2a$08$9aEzaGrpY6N2V52seg1UGeCgZag51EzkrTNnDp.UN1VAsSsx6jEoS', '2023-05-15 14:53:32', '2023-05-15 14:53:32', NULL),
(5, 'user@gmail.com', 'user@gmail.com', '$2a$08$qd7I7L6KgcCzwVN6U34e2uabhrMGmhmHv7X0p54hSkTc0vlWqOvTG', '2023-05-15 16:15:08', '2023-05-15 16:15:08', NULL),
(6, 'moderator@gmail.com', 'moderator@gmail.com', '$2a$08$zpX2YeWcWcQdwirG8M/tPejgnRyS.sLywRCVhkmzAMY1WOtmL91x2', '2023-05-15 16:15:35', '2023-05-15 16:15:35', NULL),
(7, 'admin@gmail.com', 'admin@gmail.com', '$2a$08$kv/kQ8uMJ5eRCoW1LFU7GOt8h4kaGDi1HK1RV39pvGzV7gdIjTXNG', '2023-05-15 16:15:54', '2023-05-15 16:15:54', NULL),
(8, 'superuser@gmail.com', 'superuser@gmail.com', '$2a$10$EEwdRUhKthWxrFKGJAme8.tZbNDspnFdH5sXZURKVL7V1v/uZZNX.', '2023-05-15 16:16:24', '2023-05-15 16:16:24', '9876543210'),
(9, 'test', 'test11@gmail.com', '$2a$08$QUrdxjG4jyv8XiCJM.lhBuaGInn6.4W/CbuTZG.7n0I9HIYbw1t8i', '2023-06-02 15:29:30', '2023-06-02 15:29:30', NULL),
(12, 'try21', 'trywqe@gmail.com', '$2a$08$AtXAQTBwBOC5/Tn3Ryz82.tVnZjbWUkDS2JD04nhgl23M.cpNxXgi', '2023-06-07 15:13:38', '2023-06-07 15:13:38', NULL),
(13, '23414', '241@gs.ci', '$2a$08$Xn7NQ/2N1tZ5rjc7AG3xMenqHG0FfFrsY2kzZWwSXF9WzTMRvmI4m', '2023-06-07 15:19:30', '2023-06-07 15:19:30', NULL),
(14, '234143', '24121@gs.ci', '$2a$08$rQiuRPsOrNgkbzRhnEkbGuVKivg.B0chTWDD33lv/eaWxgEWKD7i6', '2023-06-07 15:21:25', '2023-06-07 15:21:25', NULL),
(15, 'mnbv', 'mnbv@adga.cao', '$2a$08$..8xFxcUHwx/rp4zMGEgveXmPSqUWnXjQpmCvwVDSFeFL8ac.9fii', '2023-06-07 16:36:16', '2023-06-07 16:36:16', NULL),
(16, 'testing', 'testing@gmail.com', '$2a$08$E6.Un/D4spZrggB7LVVt7.LMIEOesRPpLyBPY69rCJmGPxdhwS20a', '2023-06-12 10:02:03', '2023-06-12 10:02:03', NULL),
(17, 'test341', 'wqdd@ad', '$2a$08$/pTan8mEf08WWHZ3D3pSv.0nlTcDBzi08uMAnpULMpo120XSoEsvW', '2023-06-17 13:51:15', '2023-06-17 13:51:15', NULL),
(18, 'admin', '234143a@af.co', '$2a$08$y8aOCVN9IHYUxo7phP67o.RoM/n3G4r7/w3zWuwGi0X/j6bHCXGn2', '2023-06-17 15:06:40', '2023-06-17 15:06:40', NULL),
(19, 'adaswdawaw', 'awdwad@WAEf.dsg', '$2a$08$aPS7XHUmNnqbA14Fdkwk..BuiSRvmkOhUqCtzkM2JaAETzVwnHSOu', '2023-06-17 15:07:23', '2023-06-17 15:07:23', NULL),
(20, 'superuser@gmail.com123', 'jmahesh991@gmail.com', '$2a$08$wI5cGCXZaWkonnlF0oYPaOLnL6zh.MN2rq/rH6/aPb2TF.aVMv7f.', '2023-06-17 15:26:18', '2023-06-17 15:26:18', NULL),
(21, '2341432', '234143@dawf.esf', '$2a$08$ZrirDbeEaBfXdz1CwMuFPeV/VqVM68DJD0gY3QJ0LuV2seedFw3GO', '2023-06-17 15:32:08', '2023-06-17 15:32:08', NULL),
(22, 'user@gmail.comawd', 'justsayfree4@gmail.com2', '$2a$08$1s5FEv068HYKnbDbEnzJbu0W5TzuceweGIrlt.i03nfkolXNgx6Be', '2023-06-17 15:39:03', '2023-06-17 15:39:03', NULL),
(37, 'wqe@ad', 'awdwwqe@ad.ca', '$2a$08$VeMq8nmRUVUvxQZzRxuZtuCrnE9K3fWM00ZD4naHHb8CxfTb12LCa', '2023-06-24 16:04:04', '2023-06-24 16:04:04', NULL),
(38, 'wqe@awqd', 'awdwwqeqe@ad.ca', '$2a$08$Vq31/OUfBXihopxBuXk7JOKlkTi8ogVV5tvYyPzyLoVijvPIxFwjO', '2023-06-24 16:05:53', '2023-06-24 16:05:53', NULL),
(39, 'awdawdwq@awd', 'aweaw@fsef', '$2a$08$tInVLpgP9xp6V20NWaZL1.6HSAw17Lp0TaNN35qw0aYthwe9DqQ6K', '2023-06-24 16:21:27', '2023-06-24 16:21:27', NULL),
(40, 'awdwad@awd', 'awdawdWFa@awf', '$2a$08$ovJKGOqdBoD8W61evG9/ie6ZTcBj0L3HR09ogpkcCO1Y./M69OaWG', '2023-06-25 15:25:44', '2023-06-25 15:25:44', NULL),
(44, 'wqeawd@awqd', 'awdwwqwaeqe@ad.ca', '$2a$08$yNIGfwcUazIrW59WfymCSe58UaEe3HYlBWykOSKGlFT89uWJrQd5q', '2023-06-25 16:47:53', '2023-06-25 16:47:53', NULL),
(45, 'adawdaw', 'awda@Weq', '$2a$08$KTt8z8da/VJpgXXTcmacR.ydZtRg1DvwzE8FC3TxhM2shTEeE7FPW', '2023-06-25 16:57:56', '2023-06-25 16:57:56', NULL),
(46, 'egewfw', 'adaw@qaw', '$2a$08$RdXbOw/tJ.RNQpPgmRUYw.Hmh5OutKvu4RzOB575IoMnka3Nf6bw.', '2023-06-25 16:58:34', '2023-06-25 16:58:34', NULL),
(47, 'superuser@gmail.com213', 'superuser@gmail.comwq', '$2a$08$Qk4hI72xJ8Mree72HqhL9eHconMwQxgcs4fpvJMQI6dCsfLGBcFKm', '2023-06-25 16:59:57', '2023-06-25 16:59:57', NULL),
(59, 'testzz', 'ada@Wawe', '$2a$08$ZhBK9KZ2zGSfwy6jtaQS8OrcNsgBnL0tXQOq7py49AU.c9wj3FYB.', '2023-07-01 11:01:00', '2023-07-01 11:01:00', NULL),
(60, 'pgea', 'adwa@wr.com', '$2a$08$p6mD0tgJ4l6jhwV3wj9lmuu9P8qYeygX4Y/qeuY9qL7oe2D5QX2.C', '2023-08-04 10:05:04', '2023-08-04 10:05:04', '1234567890'),
(61, 'Sneha', 'sbharambe@gmail.com', '$2a$08$SFAE0E62/SIQn63IBOChtuTNYdmT1PXf3Fetkh7/4V0cltopCHI4a', '2023-08-22 06:39:56', '2023-08-22 06:39:56', '9969157592'),
(62, 'testingconatct', 'conatct@gmail.com', '$2a$08$4Cuig/HUmt8XVYP3gEL9yue4NRdkqPSF4n/EgcqtzlW/iZP6QtvYa', '2023-08-24 10:00:51', '2023-08-24 10:00:51', '1234567890'),
(64, 'A101', 'A101@shuttle.com', '$2a$08$OXKj1NFFjV86/bGJtpc6Z.Br8PHIhYPF2bIqC6vjRGIksEir2ZPRu', '2023-08-25 06:27:28', '2023-08-25 06:27:28', '1234567890'),
(65, 'A102', 'A102@shuttle.com', '$2a$08$9WdzX0UdRbbL5TcOFK5.uuLqsVr6.Cj9h3IOuBjCvafMUw5CD7qC6', '2023-08-25 11:30:36', '2023-08-25 11:30:36', '0987654321'),
(66, 'testsignup', '123@ada.com', '$2a$08$r7vrbjngAxxX5ILkgrCos.6Sk0wLr6grW502lblsK1Eb.KaluVOb.', '2023-09-04 04:57:45', '2023-09-04 04:57:45', '1234567890'),
(67, 'tiken', 'adqwd@dqwd.co', '$2a$08$Jw8KX7N4QF53SDSs3P7uculr/GWXB4vOVM6y7geYsopd.UfC3prJ.', '2023-09-04 05:02:44', '2023-09-04 05:02:44', '1234567890'),
(68, 'wdad', 'EWFWE@sf', '$2a$08$Iy91litv6xA65O1NuMmkneDNUS0.4WBOLHUrTAeP0r9yBdDETtdiO', '2023-09-04 05:04:26', '2023-09-04 05:04:26', '1234567890'),
(69, 'sadad', 'AFaf@ad', '$2a$08$nsJUIslk3E.52yTxWN9MyerwqQUXUNL5TDxOkKUc/yWzsoBjLQSwe', '2023-09-04 05:09:57', '2023-09-04 05:09:57', '1234567890'),
(70, 'wadd', 'wawqdwqd@qdwq', '$2a$08$7ToB9r06a4gj0iTiB.MSceFoviQQ1jpKbB3E/.VRlyus/7OGW.Nye', '2023-09-04 05:29:16', '2023-09-04 05:29:16', '1234567890'),
(71, 'superadmin', 'superadmin@shuttle.com', '$2a$08$2vEM.YNRM0Aqt0ANwqcoAuYNO0NF33klVbcTqDYsOTnK2J0YpxiV.', '2023-09-04 05:30:21', '2023-09-04 05:30:21', '9769023847'),
(74, 'A001', 'A001@shuttle.com', '$2a$08$SSRt3FanCh64SEe5as4wROLGhN4Kgnz.mZ9.VSrnEtxRIgIVOtfRq', '2023-09-07 16:12:30', '2023-09-07 16:12:30', '1234567890'),
(75, 'A002', 'A002@shuttle.com', '$2a$08$k0wPS2x1iDAknozFUqpiTelMQ9pnZXdvmm1JVQzJl59jYmv8kEk2m', '2023-09-08 10:20:08', '2023-09-08 10:20:08', '9969157592');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('2023-05-15 14:49:09', '2023-05-15 14:49:09', 1, 1),
('2023-05-15 14:49:27', '2023-05-15 14:49:27', 1, 2),
('2023-05-15 14:53:32', '2023-05-15 14:53:32', 1, 4),
('2023-05-15 16:15:08', '2023-05-15 16:15:08', 1, 5),
('2023-05-15 16:16:24', '2023-05-15 16:16:24', 1, 8),
('2023-06-02 15:29:30', '2023-06-02 15:29:30', 1, 9),
('2023-06-07 15:13:38', '2023-06-07 15:13:38', 1, 12),
('2023-06-07 15:19:31', '2023-06-07 15:19:31', 1, 13),
('2023-06-07 15:21:25', '2023-06-07 15:21:25', 1, 14),
('2023-06-07 16:36:16', '2023-06-07 16:36:16', 1, 15),
('2023-06-12 10:02:04', '2023-06-12 10:02:04', 1, 16),
('2023-06-17 15:06:41', '2023-06-17 15:06:41', 1, 18),
('2023-06-17 15:07:24', '2023-06-17 15:07:24', 1, 19),
('2023-06-17 15:26:19', '2023-06-17 15:26:19', 1, 20),
('2023-06-17 15:32:08', '2023-06-17 15:32:08', 1, 21),
('2023-06-17 15:39:03', '2023-06-17 15:39:03', 1, 22),
('2023-06-24 16:04:04', '2023-06-24 16:04:04', 1, 37),
('2023-06-24 16:05:54', '2023-06-24 16:05:54', 1, 38),
('2023-06-24 16:21:27', '2023-06-24 16:21:27', 1, 39),
('2023-06-25 15:25:44', '2023-06-25 15:25:44', 1, 40),
('2023-06-25 16:47:53', '2023-06-25 16:47:53', 1, 44),
('2023-06-25 16:57:57', '2023-06-25 16:57:57', 1, 45),
('2023-06-25 16:58:34', '2023-06-25 16:58:34', 1, 46),
('2023-06-25 16:59:58', '2023-06-25 16:59:58', 1, 47),
('2023-07-01 11:01:00', '2023-07-01 11:01:00', 1, 59),
('2023-08-04 10:05:05', '2023-08-04 10:05:05', 1, 60),
('2023-08-22 06:39:56', '2023-08-22 06:39:56', 1, 61),
('2023-08-24 10:00:51', '2023-08-24 10:00:51', 1, 62),
('2023-09-04 04:57:45', '2023-09-04 04:57:45', 1, 66),
('2023-09-04 05:02:44', '2023-09-04 05:02:44', 1, 67),
('2023-09-04 05:04:26', '2023-09-04 05:04:26', 1, 68),
('2023-09-04 05:09:57', '2023-09-04 05:09:57', 1, 69),
('2023-09-04 05:30:21', '2023-09-04 05:30:21', 1, 71),
('2023-05-15 14:49:09', '2023-05-15 14:49:09', 2, 1),
('2023-05-15 16:15:35', '2023-05-15 16:15:35', 2, 6),
('2023-05-15 16:16:24', '2023-05-15 16:16:24', 2, 8),
('2023-06-07 15:21:25', '2023-06-07 15:21:25', 2, 14),
('2023-06-17 15:26:19', '2023-06-17 15:26:19', 2, 20),
('2023-06-17 15:39:03', '2023-06-17 15:39:03', 2, 22),
('2023-09-04 05:30:21', '2023-09-04 05:30:21', 2, 71),
('2023-05-15 14:49:09', '2023-05-15 14:49:09', 3, 1),
('2023-05-15 14:49:27', '2023-05-15 14:49:27', 3, 2),
('2023-05-15 16:15:54', '2023-05-15 16:15:54', 3, 7),
('2023-05-15 16:16:24', '2023-05-15 16:16:24', 3, 8),
('2023-06-07 15:21:25', '2023-06-07 15:21:25', 3, 14),
('2023-06-17 13:51:16', '2023-06-17 13:51:16', 3, 17),
('2023-06-17 15:26:19', '2023-06-17 15:26:19', 3, 20),
('2023-06-17 15:32:08', '2023-06-17 15:32:08', 3, 21),
('2023-06-24 16:04:04', '2023-06-24 16:04:04', 3, 37),
('2023-06-24 16:05:54', '2023-06-24 16:05:54', 3, 38),
('2023-06-25 16:47:53', '2023-06-25 16:47:53', 3, 44),
('2023-09-04 05:30:21', '2023-09-04 05:30:21', 3, 71),
('2023-08-25 06:27:28', '2023-08-25 06:27:28', 4, 64),
('2023-08-25 11:30:36', '2023-08-25 11:30:36', 4, 65),
('2023-09-04 05:30:21', '2023-09-04 05:30:21', 4, 71),
('2023-09-07 16:12:30', '2023-09-07 16:12:30', 4, 74),
('2023-09-08 10:20:08', '2023-09-08 10:20:08', 4, 75),
('2023-09-04 05:29:16', '2023-09-04 05:29:16', 5, 70),
('2023-09-04 05:30:21', '2023-09-04 05:30:21', 5, 71);

-- --------------------------------------------------------

--
-- Table structure for table `user_wallet`
--

CREATE TABLE `user_wallet` (
  `transactionId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `paymentStatus` varchar(255) DEFAULT NULL,
  `paymentId` varchar(255) DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_wallet`
--

INSERT INTO `user_wallet` (`transactionId`, `userId`, `amount`, `timestamp`, `paymentStatus`, `paymentId`, `orderId`) VALUES
('1b217e85-4e78-46f8-9d58-d3b7af1e99ff', '5', 41.00, '2023-09-06 05:27:46', 'failed', 'NA', 'order_MYvyrmYhKTChEo'),
('1b31cdbf-c0b7-40ed-8e50-faced5233cf9', '71', 101.00, '2023-09-05 13:04:18', 'successful', 'pay_MYfDytpyXpvIQf', 'order_MYfDpJwvKNV4D3'),
('361f986f-7d47-40a2-bf30-124a8a9cdb90', '71', 1001.00, '2023-09-06 09:13:28', 'successful', 'pay_MYzoOZYpXCoLDM', 'order_MYzoD4wxsanudw'),
('5b528c18-2f5e-41ed-a015-a121d94f34fb', '8', 201.00, '2023-09-05 15:14:14', 'successful', 'pay_MYhREHz4F4qaSF', 'order_MYhR6Z1cxpvOMu'),
('5c109bda-c6af-4565-aab9-ef30a3b89922', '5', 101.00, '2023-09-06 05:27:16', 'successful', 'pay_MYvyJPovlqPcPv', 'order_MYvyAdAysqTAIJ'),
('5f331dbc-ad49-4074-b228-65012f54f97f', '71', 151.00, '2023-09-05 15:09:53', 'successful', 'pay_MYhMdEN28tzCOD', 'order_MYhMXEs1LVPX5d'),
('7d6bd978-c78b-4b89-bae0-f97eb69daf18', '71', 501.00, '2023-09-05 15:49:42', 'successful', 'pay_MYi2hdeI55nbpX', 'order_MYi2aMbP56Q0Np'),
('82c82aa4-24c7-4b80-b2d7-b769e1c5fe4f', '71', 101.00, '2023-09-05 15:08:58', 'successful', 'pay_MYhLfujWIWbS6x', 'order_MYhLbC7xIsoLfF'),
('82da22ac-71dc-4336-b996-9d7c58408786', '71', 100.00, '2023-09-05 15:07:31', 'successful', 'pay_MYhK8c5uwwoGfT', 'order_MYhK1XdQHumvrf'),
('86e2e82e-1438-45e2-877e-3e8fd19f3659', '71', 100.00, '2023-09-05 15:13:09', 'failed', 'NA', 'order_MYhQA4cFRMIsXT'),
('98e7e5fd-cb29-46ca-ba31-f25d43075dea', '71', 101.00, '2023-09-05 15:03:51', 'successful', 'pay_MYhGGrzCY86xMv', 'order_MYhGBXo8zXLH0x'),
('9cfd2c20-85cd-4ef8-9378-4fc221ca2e50', '71', 100.00, '2023-09-05 15:13:31', 'failed', 'NA', 'order_MYhQVapVtE8eaf'),
('a5a04e05-ca01-4f2d-af86-f1c4cb1242e0', '71', 100.00, '2023-09-05 16:04:45', 'successful', 'pay_MYiIabhkVCkUMG', 'order_MYiITzS2sVWdcM'),
('bf3cd264-204e-4aa1-9945-975cc809738f', '5', 1000.00, '2023-09-06 06:49:05', 'successful', 'pay_MYxMlB2BOJlnhL', 'order_MYxMdxcPHXNJlu'),
('c02bd1ac-0e70-48b0-ad1d-5560e808e6a7', '71', 151.00, '2023-09-05 15:12:51', 'successful', 'pay_MYhPmcfaTgoQz6', 'order_MYhPhdPjREeskW'),
('c48e1af3-630b-4e66-8b1b-5f7a4435c073', '5', 10000.00, '2023-09-11 06:28:20', 'successful', 'pay_MavgRF16B2KCra', 'order_MavgLbG0HrkeU2'),
('c61be959-73f3-443b-92fa-234e99c29594', '71', 1.00, '2023-09-05 15:52:57', 'failed', 'NA', 'order_MYi6CTX0l3eiKd'),
('ca83be7d-13bf-4282-9fd2-3fe3d9ac71ff', '71', 201.00, '2023-09-06 05:18:17', 'successful', 'pay_MYvoql63Wd8kEi', 'order_MYvoeywmk6NPkv');

-- --------------------------------------------------------

--
-- Table structure for table `verifiedticket`
--

CREATE TABLE `verifiedticket` (
  `id` int(100) NOT NULL,
  `TicketID` varchar(255) NOT NULL,
  `Timestamp` varchar(255) NOT NULL,
  `TotalSeats` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `verifiedticket`
--

INSERT INTO `verifiedticket` (`id`, `TicketID`, `Timestamp`, `TotalSeats`) VALUES
(24, '4ff3ee50-12c1-49f2-a3a5-842ec96a01aa', '6/19/2023', NULL),
(25, '6d76132f-d1c2-4308-87bf-f87abe1f9970', '6/10/2023', NULL),
(26, 'd393c88d-5388-481f-b572-f0f70128e736', '6/3/2023', NULL),
(27, '664869a5-39e3-4747-8cdc-659ede587b74', '6/19/2023', NULL),
(28, '88f5606c-aca2-4622-a705-3fe6d1c269dd', '6/21/2023', NULL),
(29, '6075d67a-7511-4bb3-95b7-41d851015df1', '6/24/2023', NULL),
(30, '44db82e9-71de-46ab-8a42-5ab9b896a999', '6/24/2023', NULL),
(31, '7db2d449-c3e9-49bf-8ac0-6b626a2e0a9a', '6/24/2023', NULL),
(32, '91e50e79-195c-4736-9946-2763b63cebee', '6/24/2023', NULL),
(33, 'a49b580b-d5ad-44b0-92b4-e1f7ecdd43ba', '6/24/2023', 3),
(34, 'b658c3c2-cf93-4f2f-948d-89785127a948', '6/24/2023', 8),
(35, 'a14673b0-fd63-4998-bc9f-63931e60df4a', '7/23/2023', 6),
(36, '8ae57ca5-6ea2-498f-9606-ff1910d200ce', '8/4/2023', 5),
(37, '8ae57ca5-6ea2-498f-9606-ff1910d200ce', '8/4/2023', 5),
(38, '3bf248f4-8378-439f-9fcc-8a5bafa3221b', '8/4/2023', 9),
(39, '69801163-28f5-45fb-b217-0f13f5e426b4', '8/6/2023', 6),
(40, '935e4549-7520-4b39-a650-5370b320ee7e', '8/6/2023', 6),
(41, '73e67792-0fbd-4a9f-996d-2fd79f240cd6', '8/10/2023', 1),
(42, '8a3e1c91-49b2-47f7-a78e-7870ad8d2892', '9/10/2023', 8),
(43, '9f31ce11-92bc-4fd2-ba24-b9e9cb6e8157', '8/4/2023', 4),
(44, '367556e0-c64e-41f7-8378-8f2628416f48', '8/10/2023', 1),
(45, '98633b79-7d9c-43b6-959e-a885e7efd4fd', '8/10/2023', 1),
(46, 'b29b697e-0419-45d2-bc6c-35c5b45ce0a1', '8/22/2023', 1),
(47, 'da88af50-ca5b-4efa-82b4-ac4e73433f7f', '8/17/2023', 1),
(48, '392224ad-5b2b-4a9a-a87a-a37e3f394283', '8/22/2023', 3),
(49, '915c873a-20ec-4afa-8191-c00b0f1cbcb5', '8/23/2023', 1),
(50, 'ef9fead4-a804-4d74-975b-dcf3bc2dc51a', '8/18/2023', 1),
(51, '6b2d5d52-01f3-4dfb-9920-6c6c4eac5a0d', '8/15/2023', 3),
(52, '47b22c0c-9a9b-4a74-92da-cd070027faab', '8/10/2023', 1),
(53, '4bdb5d41-34bd-4c68-a53d-e682f15f44ca', '8/30/2023', 1),
(54, 'fa4efa85-6c7b-486b-9b6a-41bb09a87499', '8/23/2023', 1),
(55, '82528b2e-3c6e-41d0-aa63-1367b2e3f895', '8/23/2023', 1),
(56, '7edbfd16-6c03-48d2-8068-0682ee7cabac', '8/23/2023', 1),
(57, '92fdb39e-2656-42bf-a9ca-22ee9110248c', '9/6/2023', 1);

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `userID` int(11) NOT NULL,
  `Balance` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`userID`, `Balance`, `created_at`, `updated_at`) VALUES
(5, 101.00, '2023-09-06 05:27:16', '2023-09-11 09:30:58'),
(8, 201.00, '2023-09-05 15:14:14', '2023-09-05 15:14:14'),
(71, 505.00, '2023-09-05 15:08:58', '2023-09-09 07:53:56');

-- --------------------------------------------------------

--
-- Table structure for table `wallet_transactions`
--

CREATE TABLE `wallet_transactions` (
  `transactionId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wallet_transactions`
--

INSERT INTO `wallet_transactions` (`transactionId`, `userId`, `amount`, `timestamp`) VALUES
('02d67bf8-fff0-46b9-beb3-b60e3d151506', '71', 2000.00, '2023-09-06 09:11:34'),
('1b217e85-4e78-46f8-9d58-d3b7af1e99ff', '5', 41.00, '2023-09-06 05:27:36'),
('1b31cdbf-c0b7-40ed-8e50-faced5233cf9', '71', 101.00, '2023-09-05 13:03:58'),
('361f986f-7d47-40a2-bf30-124a8a9cdb90', '71', 1001.00, '2023-09-06 09:12:17'),
('5b528c18-2f5e-41ed-a015-a121d94f34fb', '8', 201.00, '2023-09-05 15:13:57'),
('5c109bda-c6af-4565-aab9-ef30a3b89922', '5', 101.00, '2023-09-06 05:26:56'),
('5d27d33a-b32b-4b45-b656-05323cbcdd1d', '71', 151.00, '2023-09-05 10:31:48'),
('5f331dbc-ad49-4074-b228-65012f54f97f', '71', 151.00, '2023-09-05 15:09:38'),
('63207d1d-4ef9-4c41-bebe-8ff016cb99d0', '71', 151.00, '2023-09-05 10:30:23'),
('63b5e437-d30c-4333-9902-894627a20f06', '71', 101.00, '2023-09-05 10:27:57'),
('7783c490-c92b-42ab-9886-b8310d080d88', '71', 101.00, '2023-09-05 10:28:24'),
('7d6bd978-c78b-4b89-bae0-f97eb69daf18', '71', 501.00, '2023-09-05 15:49:26'),
('82c82aa4-24c7-4b80-b2d7-b769e1c5fe4f', '71', 101.00, '2023-09-05 15:08:45'),
('82da22ac-71dc-4336-b996-9d7c58408786', '71', 100.00, '2023-09-05 15:07:15'),
('86e2e82e-1438-45e2-877e-3e8fd19f3659', '71', 100.00, '2023-09-05 15:13:03'),
('98e7e5fd-cb29-46ca-ba31-f25d43075dea', '71', 101.00, '2023-09-05 15:03:37'),
('9cfd2c20-85cd-4ef8-9378-4fc221ca2e50', '71', 100.00, '2023-09-05 15:13:23'),
('a5a04e05-ca01-4f2d-af86-f1c4cb1242e0', '71', 100.00, '2023-09-05 16:04:29'),
('bb5d318b-5f9e-44fd-96d8-58997244b3a6', '71', 1000.00, '2023-09-05 10:16:42'),
('bf3cd264-204e-4aa1-9945-975cc809738f', '5', 1000.00, '2023-09-06 06:48:48'),
('c02bd1ac-0e70-48b0-ad1d-5560e808e6a7', '71', 151.00, '2023-09-05 15:12:38'),
('c48e1af3-630b-4e66-8b1b-5f7a4435c073', '5', 10000.00, '2023-09-11 06:28:05'),
('c61be959-73f3-443b-92fa-234e99c29594', '71', 1.00, '2023-09-05 15:52:52'),
('ca83be7d-13bf-4282-9fd2-3fe3d9ac71ff', '71', 201.00, '2023-09-06 05:17:56'),
('d73661b3-03c1-40f2-83eb-ea53723fc974', '71', 151.00, '2023-09-05 10:32:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `busdetails`
--
ALTER TABLE `busdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bus_locations`
--
ALTER TABLE `bus_locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stationstatus`
--
ALTER TABLE `stationstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `user_wallet`
--
ALTER TABLE `user_wallet`
  ADD PRIMARY KEY (`transactionId`);

--
-- Indexes for table `verifiedticket`
--
ALTER TABLE `verifiedticket`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD PRIMARY KEY (`transactionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `busdetails`
--
ALTER TABLE `busdetails`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `bus_locations`
--
ALTER TABLE `bus_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `stationstatus`
--
ALTER TABLE `stationstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `verifiedticket`
--
ALTER TABLE `verifiedticket`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
