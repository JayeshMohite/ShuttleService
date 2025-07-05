-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 08, 2023 at 06:59 PM
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
  `paymentId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`TicketID`, `Timestamp`, `SelectedRoute`, `SelectedBusID`, `SelectedPickUpPoint`, `SelectedDropPoint`, `TotalSeats`, `TotalDistance`, `Fare`, `userId`, `busType`, `verificationStatus`, `PaymentStatus`, `refundStatus`, `paymentId`) VALUES
('9d10f9ac-742a-4d52-95e5-89a88c78fe74', '7/23/2023, 5:58:29 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 2, 40, 800, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('a14673b0-fd63-4998-bc9f-63931e60df4a', '7/23/2023, 6:31:58 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Verified', NULL, NULL, NULL),
('8dffbbfe-521b-47e9-8b22-2ca93f772be5', '8/4/2023, 3:36:26 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Parel', 1, 15, 75, '60', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('0cbb61be-b946-4e6a-af1d-b677730400eb', '8/4/2023, 3:36:58 PM', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 100, '60', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('1aceb400-3a17-4bc4-93f2-bf91f5aa7a4f', '8/4/2023, 4:31:09 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('7fe9c745-202f-4a90-8952-6be952f1659b', '8/4/2023, 4:33:18 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('9f31ce11-92bc-4fd2-ba24-b9e9cb6e8157', '8/4/2023, 4:37:13 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('ead06bac-e00b-42c1-b36c-eef9ffe83d48', '8/4/2023, 4:38:38 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('179e7e0d-94fd-4e26-aa01-b415e465906a', '8/4/2023, 4:44:33 PM', 'Mulund-To-Dadar', 46, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('26fbd21e-2dac-46ba-be61-827791e3402b', '8/4/2023, 5:00:50 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('e2e2ea30-4173-4578-b962-268feeb60d5e', '8/4/2023, 5:02:10 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('8ae57ca5-6ea2-498f-9606-ff1910d200ce', '8/4/2023, 5:06:15 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Verified', 'successful', NULL, NULL),
('36f6875b-589c-46aa-88c6-2d198a68649a', '8/4/2023, 5:25:00 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('96f76de6-3f2e-494f-9ff5-2bc35fb48983', '8/4/2023, 5:28:20 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('03ebcdcd-0db4-4ad8-9d4f-81bcd8a85a87', '8/4/2023, 5:30:52 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', 'successful', NULL, NULL),
('3abaa740-ab58-4321-b6af-2d2c9e6a03d0', '8/4/2023, 5:32:29 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 150, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('9d530fa0-757f-48b6-bb52-c3abbd403c1f', '8/4/2023, 5:50:11 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('8a4160f8-52eb-4803-93cf-b324f763cdb6', '8/4/2023, 5:50:32 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('202e7e0b-06a8-4bed-ad49-9ca10469bfba', '8/4/2023, 5:50:39 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('3420585b-5903-4f6b-b0ea-218e5133228e', '8/4/2023, 6:16:15 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('27936121-b79d-4a15-9457-8a66d47b26ff', '8/4/2023, 6:33:16 PM', 'Mulund-To-Dadar', 46, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('b3a81a1f-6459-41d5-9909-d008942df3bb', '8/4/2023, 6:34:49 PM', 'Mulund-To-Dadar', 46, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('66dd2294-eeeb-41f3-9667-e04778574eea', '8/4/2023, 6:36:23 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('26f65eda-a551-4ce6-91df-401e9f49489e', '8/4/2023, 6:37:42 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('e8844318-06d4-4d2f-83d0-d22650d0e36d', '8/4/2023, 6:46:18 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('cfd0c1f0-0997-41a6-ba82-f01eb84aca29', '8/4/2023, 6:47:04 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('f951f58a-b8a1-401a-a853-e41822e7b6a1', '8/4/2023, 6:48:28 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('3efdca3b-842c-4cbc-8e30-a968f4df6763', '8/4/2023, 6:49:36 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('fde44a74-2880-464f-bb8d-4b9e85d2e574', '8/4/2023, 6:50:05 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('4f3cc608-f8e4-4d24-ae78-0d380dc12aa1', '8/4/2023, 6:52:54 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 150, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('1310533b-7a21-4c23-8b6e-05281796941d', '8/4/2023, 6:55:54 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('69d2f384-788b-4c5e-b0b6-2420d2bdc3a1', '8/4/2023, 6:58:25 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('3f0ed82e-768a-4c7b-8d14-cd41c3191f5c', '8/4/2023, 6:58:55 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('4d831a3a-7486-491e-9dba-38a237ec91d5', '8/4/2023, 7:00:23 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('d2cd5543-c607-4af3-a823-50f8e2a0c878', '8/4/2023, 7:04:05 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('1f530f1d-1039-4651-95a7-b670c933595b', '8/4/2023, 7:04:52 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('b0d05c1d-5eda-4088-b836-0e1a51627e2d', '8/4/2023, 7:05:40 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('2a28105d-ff6c-4901-b16c-9adb3b02a753', '8/4/2023, 7:07:05 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('03c79532-8983-4436-b9bc-a1d281207db4', '8/4/2023, 7:08:20 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('1f5b137a-899c-4054-8780-f7803ada915a', '8/4/2023, 7:08:57 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('e13a1294-5694-4dcd-b8ca-d36f3ed9a982', '8/4/2023, 7:10:45 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('a4a02fde-1be7-43ad-9ce4-30adca52863f', '8/4/2023, 7:12:29 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('0edc68f0-c1bf-4437-8423-f3f57083629a', '8/4/2023, 7:13:48 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('af9a92ad-9823-4cc5-b187-572f135f9dc2', '8/4/2023, 7:14:32 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 200, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('abc17339-bf3b-4d18-ba25-bbf8b277e034', '8/4/2023, 7:17:57 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('763935a5-fa04-4493-9f06-5bcc3df9349f', '8/4/2023, 7:21:09 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('8b41d165-44fe-4d15-9a65-4acec91f9333', '8/4/2023, 7:21:57 PM', 'Mulund-To-Thane', 44, 'cst', 'Malad', 1, 45, 225, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('f464c4da-bfe6-4fd0-ac71-8469880e062f', '8/4/2023, 7:23:08 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('527a44ef-d85e-4d5e-827c-392c418a7431', '8/4/2023, 7:24:13 PM', 'Mulund-To-Thane', 9, 'cst', 'Malad', 1, 45, 225, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('fc2cb8ef-f155-426b-9fe8-46316e5e7108', '8/4/2023, 7:24:45 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('d508ae70-2b31-4207-8902-fb5a0b509dc9', '8/4/2023, 7:27:34 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('649d8c4d-e672-4f79-8826-5e9c3452822b', '8/4/2023, 7:28:53 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('a8623e47-3a6f-44c5-97f6-109f8e6f281e', '8/4/2023, 7:29:17 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('067f9257-9396-4638-a26b-09f43686397e', '8/4/2023, 7:32:28 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('79c93481-3c49-42d0-9f4d-33d346c73d59', '8/4/2023, 7:34:21 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('e698ce75-8b9e-42f5-aaad-34e97cab79c6', '8/4/2023, 7:36:36 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('c0d80253-f69c-486a-93ca-bebeddb92c3b', '8/4/2023, 7:39:30 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('950bbd32-d09a-4c0d-b951-602caca00d33', '8/4/2023, 7:39:50 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('dbfcc132-9a8c-4968-a10e-f9d1dd04b272', '8/4/2023, 7:40:32 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('50ec9f46-0c0a-4e24-918a-848ea9445340', '8/4/2023, 7:46:41 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('c17b4e1f-8aa2-4096-a9ae-ec0acffe3223', '8/4/2023, 7:48:12 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('41c9b0fb-3600-4067-b1f1-f1f6419fbdb6', '8/4/2023, 7:50:11 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 250, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('3b269e04-f537-41c5-a0f7-171c2490d106', '8/4/2023, 7:50:46 PM', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 200, '8', 'AC', 'Not-verified', 'successful', NULL, NULL),
('ac353574-6be9-43b0-a67f-b6f9a160b6cf', '8/4/2023, 7:53:37 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('8e695c0a-c573-476d-b18b-289f8b2303a9', '8/4/2023, 8:02:14 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('29b55162-f010-4d10-9d19-42fd68efaf97', '8/4/2023, 8:20:15 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('651ea759-8e05-4844-a570-296ea23e4566', '8/4/2023, 8:20:56 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('7293dfc1-c28c-4917-ae1d-598cf446f7d5', '8/4/2023, 8:29:13 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('d51388c5-be22-4276-b965-411edd44ed59', '8/4/2023, 8:31:00 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 25, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('32deb617-3253-42c0-a0c9-f663c07b8a6d', '8/4/2023, 8:44:36 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('8866c556-4d48-4a8c-b23d-91aa8fa4f448', '8/4/2023, 8:52:26 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Airoli', 1, 10, 50, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('00eb9542-2087-4edc-a717-8e483b4fbf53', '8/4/2023, 8:55:01 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', 'successful', NULL, NULL),
('d2525525-4f29-4362-a0be-c86c8c668a61', '8/4/2023, 9:02:50 PM', 'Mulund-To-Dadar', 8, 'Rabale', 'Parel', 1, -15, -150, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('642a46df-9948-4b88-bdf6-349b0e72eec1', '8/4/2023, 9:02:56 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', 'successful', NULL, NULL),
('a8c825ee-2675-4d95-b0c0-8b2074a377e6', '8/4/2023, 9:07:06 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('99f1c77a-a2e9-4054-9bfe-6c7e2fa215d5', '8/4/2023, 9:11:31 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('cea04642-baca-469d-a12a-acd5654ddaaa', '8/4/2023, 9:12:51 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('08d4895f-e4be-40a7-a43c-d1a8dfbc3fe8', '8/4/2023, 9:13:58 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('dc4c4936-ef4e-4035-8370-5714186b0375', '8/4/2023, 9:14:59 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('3d3d0322-c54c-4c91-8412-0ceda02ab8cd', '8/4/2023, 9:18:26 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('e006df12-3ffc-4bfe-8e9d-47a8983b1e6c', '8/4/2023, 9:18:53 PM', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('d2da439f-82c5-4a31-97ab-9d3f8ad15e36', '8/4/2023, 9:23:58 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '60', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('c3916af1-1553-4014-bf97-7a79972d6c07', '8/4/2023, 9:25:33 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '60', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('3bf248f4-8378-439f-9fcc-8a5bafa3221b', '8/4/2023, 9:26:27 PM', 'Thane-To-Panvel', 10, 'vashi', 'panvel', 1, 20, 100, '5', 'NON-AC', 'Verified', 'successful', NULL, NULL),
('7af80099-d8e4-4fcd-80da-adc50fc85916', '8/5/2023, 1:04:24 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Parel', 1, 15, 75, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('d2236c7c-c140-43e9-91bb-1de40cd05450', '8/5/2023, 1:05:58 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('85718f2b-9108-45cc-826f-1bdf7e01672b', '8/5/2023, 1:06:29 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('9488f23f-d0e7-481b-98ab-8349088ef649', '8/5/2023, 1:06:39 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('eb855f42-8d83-4445-882b-85228f466e32', '8/5/2023, 1:06:48 PM', 'Mulund-To-Dadar', 8, 'Airoli', 'Parel', 1, 5, 50, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('0d3ca82f-5eac-48eb-832c-3e2f564a48a4', '8/5/2023, 1:37:13 PM', 'Mulund-To-Thane', 9, 'cst', 'Malad', 1, 45, 450, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('c1a6ff0f-1e99-4377-934b-6edff0e0f7a9', '8/9/2023, 10:15:30 AM', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 3, 50, 1500, '8', 'AC', 'verified', 'successful', NULL, NULL),
('6b2d5d52-01f3-4dfb-9920-6c6c4eac5a0d', '8/15/2023, 3:45:22 PM', 'Dadar-To-Thane', 8, 'Dadar', 'Thane', 4, 60, 1800, '8', 'AC', 'verified', 'successful', NULL, NULL),
('b29b697e-0419-45d2-bc6c-35c5b45ce0a1', '8/22/2023, 1:20:10 PM', 'Mulund-To-Rabale', 8, 'Mulund', 'Rabale', 2, 30, 900, '8', 'NON-AC', 'verified', 'successful', NULL, NULL),
('d8ee786d-0aa1-42b2-9aaf-7a68684d5d4a', '8/28/2023, 9:30:05 AM', 'Dadar-To-Thane', 8, 'Dadar', 'Thane', 5, 100, 3000, '8', 'AC', 'verified', 'failed', NULL, NULL),
('21f06e10-e58c-4e6e-bb6f-74a7d05b23f8', '9/5/2023, 2:40:55 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Thane', 2, 20, 400, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('8a3e1c91-49b2-47f7-a78e-7870ad8d2892', '9/10/2023, 8:10:30 AM', 'Thane-To-Dadar', 8, 'Thane', 'Dadar', 1, 25, 250, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('23f18a60-cc13-48a1-a9ca-2e1e763c758e', '9/18/2023, 11:55:00 AM', 'Mulund-To-Rabale', 8, 'Mulund', 'Rabale', 3, 60, 1800, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('def2bb99-2159-47b3-8ef5-17e7021d7026', '9/22/2023, 6:30:20 PM', 'Rabale-To-Mulund', 8, 'Rabale', 'Mulund', 4, 80, 2400, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('f43cec6e-4f13-49e9-b467-be4961541e3b', '8/5/2023, 5:42:44 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '5', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('c0a800c9-eadc-4d35-aa8e-1c88b404461a', '8/5/2023, 5:43:23 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '5', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('1e61d976-19ac-4c35-94c5-cb57343b55e9', '8/5/2023, 5:43:29 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '5', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('34ba612d-f178-434c-95d1-62a82dde3690', '8/6/2023, 1:36:58 PM', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('ad0577c6-ad39-467a-a1a1-c25082dfd70e', '8/6/2023, 1:50:56 PM', 'Yash-To-Jayesh', 54, 'Yash', 'Jayesh', 1, 100, 1000, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('c58a1053-b50a-41d1-b729-f87948cdeee8', '8/6/2023, 1:51:14 PM', 'Yash-To-Jayesh', 54, 'Yash', 'Jayesh', 1, 100, 500, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('03e5d623-65b8-4bac-a921-9b01474ce476', '8/6/2023, 3:43:32 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('446ea2cc-3fec-4601-bec8-da2ace39d9b0', '8/6/2023, 3:44:46 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('f81af486-fb43-4ce1-a7e7-9e8b96e1bd79', '8/6/2023, 3:45:01 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('8652e83d-0fa1-421b-b297-6c48e36d5fd1', '8/6/2023, 3:45:27 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('41705a3f-c247-43a5-afe9-b7e9dbc6543a', '8/6/2023, 3:45:40 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', NULL, NULL, NULL),
('0e1cee7a-270a-47b9-876a-2084f90f33e6', '8/6/2023, 3:46:36 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('9fc642bf-0914-4259-a940-80c76cc52157', '8/6/2023, 3:47:29 PM', 'Mulund-To-Thane', 9, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('4a3eb74c-f678-4511-9626-b5f1ca0f90bb', '8/6/2023, 3:48:12 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('0ae81376-abac-479f-af72-8ec061c7aeb2', '8/6/2023, 3:49:51 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 200, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('8b844b61-a995-4b4a-a760-4f81ffb68ac8', '8/6/2023, 3:50:51 PM', 'Mulund-To-Dadar', 46, 'Thane', 'Rabale', 1, 30, 300, '8', 'AC', 'Not-verified', 'failed', NULL, NULL),
('5334a6ec-b77a-4232-b825-f0ef4d85fc8c', '8/6/2023, 3:52:01 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'failed', NULL, NULL),
('bb0463e2-4c3a-486e-83ec-84289e69f8be', '8/6/2023, 3:56:52 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 250, '8', 'AC', 'Not-verified', 'successful', NULL, NULL),
('b4a3360f-c0e9-45d4-8297-14c70365271e', '8/6/2023, 3:58:10 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Parel', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', NULL, NULL),
('69801163-28f5-45fb-b217-0f13f5e426b4', '8/6/2023, 6:10:04 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '5', 'NON-AC', 'Verified', 'successful', NULL, NULL),
('935e4549-7520-4b39-a650-5370b320ee7e', '8/6/2023, 6:12:22 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '5', 'NON-AC', 'Verified', 'successful', NULL, NULL),
('63dc4ae7-d62a-4ae4-bf84-ede951f6fc15', '8/8/2023, 8:17:48 PM', 'Mulund-To-Dadar', 8, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', NULL, NULL, NULL),
('ce63c9ff-1e6f-4565-82a2-77b419346918', '8/8/2023, 8:20:53 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'pay_MNc5SfLpFMJOuA'),
('58bc988b-0fac-4d63-a528-b2b46b9c2af4', '8/8/2023, 8:21:39 PM', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', 'failed', 'not-applicable', 'NA'),
('15115840-cf13-4cbb-b463-08790f047570', '8/8/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Rabale', 1, 40, 400, '8', 'AC', 'Not-verified', 'successful', 'applicable', 'pay_MNdkJCn23zqSzA'),
('03c81868-88bd-442b-bade-a02c041c6010', '8/8/2023', 'Mulund-To-Dadar', 46, 'Thane', 'Rabale', 1, 30, 150, '8', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'pay_MNdlF7B1psUfCt'),
('e515584f-12e1-4a42-8487-b26ea3bfd926', '8/10/2023', 'Mulund-To-Thane', 44, 'Nahur', 'Malad', 1, 25, 125, '8', 'NON-AC', 'Not-verified', 'successful', 'applicable', 'pay_MNdnDuHkCd4mnb'),
('2c3293d4-4e90-4061-83d3-05c21d610c8e', '8/8/2023', 'Mulund-To-Dadar', 8, 'Mulund', 'Airoli', 1, 20, 100, '8', 'NON-AC', 'Not-verified', 'failed', 'not-applicable', 'NA');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
