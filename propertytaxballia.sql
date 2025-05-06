-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 15, 2025 at 05:18 PM
-- Server version: 8.0.41-0ubuntu0.22.04.1
-- PHP Version: 8.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `propertytaxballia`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int NOT NULL,
  `FullName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `RoleID` int NOT NULL,
  `Role` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `logattempt` int NOT NULL DEFAULT '3',
  `lockedUntil` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `FullName`, `Email`, `Password`, `RoleID`, `Role`, `logattempt`, `lockedUntil`) VALUES
(14, 'Admin Panel', 'adminballia@gmail.com', 'Ballia12345', 84, 'Administrator', 3, NULL),
(25, 'san', 'san@gmail.com', '1234', 85, 'Clerk', 3, NULL),
(58, 'Ajinkya Dhavile ', 'ajinkya123@gmail.com', 'Ajinkya', 85, 'Clerk', 3, NULL),
(59, 'Sanal', 'Sanal@gmail.com', 'Ballia12345', 88, 'Tax Collector Management', 3, NULL),
(60, 'Employee E', 'employee@gmail.com', '123', 87, 'Tester', 3, NULL),
(61, 'test Singh', 'adminballia@gmail.com', 'Ballia12345', 89, 'Officer', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `agentlogin`
--

CREATE TABLE `agentlogin` (
  `ID` int NOT NULL,
  `AgentID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `FullName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ContactNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `RoleID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `Role` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Agent',
  `Moneylimit` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Address` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `AadharNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PanNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agentlogin`
--

INSERT INTO `agentlogin` (`ID`, `AgentID`, `FullName`, `ContactNumber`, `Email`, `Password`, `RoleID`, `Role`, `Moneylimit`, `Address`, `AadharNumber`, `PanNumber`) VALUES
(1, 'Ajinkya12', 'Ajinkya Dhavile ', '9307040177', 'ajinkya123@gmail.com', 'Ajinkya', '1', 'Agent', '1', 'No', '431234567890', 'ABCDE3434F'),
(2, '1001', 'AgentK', '90000000000', 'agentK@gmail.com', '123', '1', 'Agent', '1000000000000', 'add', '0000000000', '0000000000');

-- --------------------------------------------------------

--
-- Table structure for table `agentmenu`
--

CREATE TABLE `agentmenu` (
  `Menu_ID` int NOT NULL,
  `Menu_Name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Access_Role` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `Summenuid` int NOT NULL,
  `Link` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `icons` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agentmenu`
--

INSERT INTO `agentmenu` (`Menu_ID`, `Menu_Name`, `Access_Role`, `Summenuid`, `Link`, `icons`) VALUES
(1, 'Dashboard', '[1]', 0, '/Agent', 'fa fa-tachometer'),
(2, 'Chalan Management', '[1]', 0, '#', 'fa fa-tachometer'),
(3, 'Create Permit Bill', '[1]', 2, '/Agent/ChalanManagement/CreatePermitBill', 'fa fa-tachometer'),
(4, 'Profile', '[1]', 0, '/Agent/Profile', 'fa fa-tachometer'),
(5, 'Update Permit Bill', '[1]', 2, '/Agent/ChalanManagement/UpdatePermitBill', 'fa fa-tachometer'),
(6, 'Pay Permit Bill', '[1]', 2, '/Agent/ChalanManagement/PayPermitBill', 'fa fa-tachometer'),
(7, 'Customer Management', '[1]', 0, '#', 'fa fa-tachometer'),
(8, 'Create Customer', '[1]', 7, '/Agent/CustomerManagement/CreateCustomer', 'fa fa-tachometer'),
(9, 'Get Customer', '[1]', 7, '/Agent/CustomerManagement/GetCustomer', 'fa fa-tachometer'),
(10, 'History', '[1]', 0, '#', 'fa fa-tachometer'),
(11, 'License Management', '[1]', 0, '#', 'fa fa-tachometer'),
(12, 'Create License', '[1]', 11, '/Agent/LicenseManagement/CreateLicense', 'fa fa-tachometer'),
(13, 'Get License Details', '[1]', 11, '/Agent/LicenseManagement/GetLicenseDetails', 'fa fa-tachometer'),
(14, 'Create Bill', '[1]', 11, '/Agent/LicenseManagement/CreateBill', ''),
(135, 'Pay License Bill', '[1]', 11, '/Agent/LicenseManagement/PayLicenseBill', ''),
(136, 'Chalan History', '[1]', 10, '/Agent/AgentHistory/ChalanHistory', ''),
(137, 'License History', '[1]', 10, '/Agent/AgentHistory/LicenseHistory', ''),
(138, 'Gala Details', '[1]', 11, '/Agent/LicenseManagement/GetGalaDetails', '');

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int NOT NULL,
  `PropertyID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `BillNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `FromDate` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ToDate` date NOT NULL,
  `Area` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `TaxRate` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Amount` float NOT NULL,
  `DueAmount` float NOT NULL,
  `Discount` float NOT NULL DEFAULT '0',
  `TotalAmount` float NOT NULL,
  `PaidAmount` float NOT NULL,
  `Remaining` float NOT NULL,
  `Creation_Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Status` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NotDump',
  `cryptoid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `PropertyID`, `BillNumber`, `FromDate`, `ToDate`, `Area`, `TaxRate`, `Amount`, `DueAmount`, `Discount`, `TotalAmount`, `PaidAmount`, `Remaining`, `Creation_Date`, `Status`, `cryptoid`) VALUES
(16, '0958101005000001R', '0958101005000001R_1_2025', '2025-01-01', '2025-01-31', '111', NULL, 18, 0, 0, 18, 0, 18, '2025-04-11 07:03:52', 'NotDump', '008905f9-9627-482b-8adf-f16305f36d4b'),
(17, '0958101005000010R', '0958101005000010R_4_2025', '2025-04-01', '2026-03-31', '1000', NULL, 160, 0, 0, 160, 65, 95, '2025-04-11 07:47:15', 'NotDump', 'd85c8157-05c3-4b90-b43a-42353e635b64'),
(18, '0958101005000011R', '0958101005000011R_1_2024', '2024-01-02', '2025-01-02', '2100', NULL, 387, 0, 0, 387, 0, 387, '2025-04-14 12:10:42', 'NotDump', '599215a1-a57a-42db-ab8c-f29229d8c282'),
(19, '0958101005000025R', '0958101005000025R_4_2025', '2025-04-02', '2025-04-15', '1200', NULL, 189, 0, 0, 189, 189, 0, '2025-04-15 05:28:40', 'NotDump', '60094a43-ea49-42bb-a0dd-a9a184afb0ac');

-- --------------------------------------------------------

--
-- Table structure for table `bulkbilldownload`
--

CREATE TABLE `bulkbilldownload` (
  `id` int NOT NULL,
  `locality` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `foldername` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `numberfiles` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bulkbilldownload`
--

INSERT INTO `bulkbilldownload` (`id`, `locality`, `foldername`, `numberfiles`, `status`) VALUES
(8, 'CHANDPUR SALORI/WARD-46/ZONE-3/0-12', 'abc', '10', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `bulkbillgeneration`
--

CREATE TABLE `bulkbillgeneration` (
  `id` int NOT NULL,
  `FromDate` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ToDate` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `locality` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `captcha`
--

CREATE TABLE `captcha` (
  `id` int NOT NULL,
  `IPADRESS` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `CAPTCHA` text COLLATE utf8mb4_general_ci,
  `CheckingStatus` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'false',
  `unqid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `captcha`
--

INSERT INTO `captcha` (`id`, `IPADRESS`, `CAPTCHA`, `CheckingStatus`, `unqid`) VALUES
(230, '::ffff:152.58.16.137', 'DP9z', 'false', 'af70a7ed-9549-40d9-a9e0-88708e9cb1a7'),
(231, '::ffff:152.58.16.137', 'hRXV', 'false', '96cb3c25-3950-413f-ab30-f33d37e60aa5'),
(240, '::ffff:47.9.103.249', 'fPcE', 'false', 'c9b65097-b86c-47a5-8091-5367e99ae709'),
(241, '::ffff:202.62.92.69', '4vcj', 'false', '00adf567-118e-484f-8f4d-e94037e4f5f0'),
(256, '::ffff:152.58.16.40', 'tlNo', 'false', '2f91b99b-33e3-4d8d-97ff-98b62f776219'),
(262, '::ffff:42.108.231.66', 'hhIu', 'false', 'df409dae-1b35-476a-93e3-5ed920969da2'),
(272, '::ffff:171.76.228.10', 'VbAk', 'false', 'e2a731a7-d59f-462b-9cbb-0fac8266ee3a'),
(275, '::ffff:106.222.149.234', 'PI3w', 'false', '4861a5be-4d19-4a16-a36d-0ac8bf9e111d'),
(276, '::ffff:171.76.228.10', 'dZ23', 'false', 'fd0983f2-9883-4021-b77d-cdb8ace9af89'),
(300, '::ffff:42.105.212.213', 'lkKX', 'false', '66c8e26b-8ff8-45e9-a6a2-0e91c5f0f64d'),
(302, '::ffff:103.167.184.4', 'Yz0d', 'false', 'b2f681ef-308a-4e69-a52e-7f4db3ba4094'),
(308, '::ffff:103.167.184.6', '60ph', 'false', '3606c1f9-6c09-483e-a019-5a36d8a132d7'),
(309, '::ffff:103.167.184.6', 'pIBt', 'false', '8ea093c3-7428-4feb-b83e-4b31fb3bc3f7'),
(312, '::ffff:103.167.184.6', 'sXmq', 'false', '3305b6ce-76fa-485e-8f50-8c6ef1bcee61'),
(325, '::ffff:49.44.86.7', 'qxIr', 'false', 'd3e39d6b-e024-4de5-be64-a2d03ea46299'),
(349, '::ffff:182.64.166.136', 'PfDz', 'false', '0e982dc3-c946-4ce2-948e-de96bd84c65f'),
(376, '::ffff:203.192.221.134', 'gw0w', 'false', 'f74e3f62-c60b-4515-8e58-4ab4415c2161'),
(389, '::ffff:49.44.78.9', 'hqM5', 'false', '5c95e280-8928-45dc-b4f0-06f36dccb202'),
(409, '::ffff:103.167.184.5', 'Da86', 'false', 'd587f633-f790-4194-ae53-da3b5370a21d'),
(413, '::ffff:223.233.86.25', 'fBDF', 'false', '67d5ec8b-7a28-4878-abd7-7b43c84c881b'),
(418, '::ffff:223.233.87.137', 'cdb0', 'false', '830db946-555b-4249-8394-222fd730507b'),
(423, '::ffff:223.233.82.218', 'RgGY', 'false', '344c36b5-4300-40fe-86d2-67bec4680b86'),
(424, '::ffff:203.192.221.132', 'kl4L', 'false', '58ef4fbc-e868-47c4-aafa-1a1c69e414eb'),
(426, '::ffff:223.233.87.154', 'nrCX', 'false', 'fdb67963-f876-44d9-b234-4807175f63b1'),
(428, '::ffff:223.233.83.9', 'oZlX', 'false', '36822c9c-a56c-489c-9820-e0307c39019c'),
(432, '::ffff:223.233.87.46', 'ISTq', 'false', 'd2da88db-c195-4d09-b873-4ddba4b9f1de'),
(433, '::ffff:223.233.83.189', 'UfuZ', 'false', 'fcd22184-f017-4e38-bb56-ee6d4ec3b63e'),
(437, '::ffff:203.92.54.69', '4lgb', 'false', 'dc7031ca-daf1-4a9e-a27a-9ecaf14a132d'),
(440, '::ffff:49.44.67.136', 'vRiu', 'false', '54eea06e-f0fa-4644-8f3e-9f4ac32a8e68'),
(448, '::ffff:223.233.87.7', 'EV3v', 'false', '8d7c545a-150f-4be2-a01f-1879e86c00ac'),
(457, '::ffff:49.44.87.133', 'q4iW', 'false', '8214cb7c-38af-4947-a824-b2643ee1d79f'),
(461, '::ffff:223.233.83.70', '7GmL', 'false', '165c0fc4-287a-4b8f-a905-b8e428d0101c'),
(468, '::ffff:180.151.224.27', 'pv55', 'false', '977ef647-d40b-4c6c-9a33-5bb3f649eb0a'),
(469, '::ffff:223.233.81.198', 'RUQe', 'false', '67f2808f-8314-40ec-b914-d4c91f19d499'),
(473, '::ffff:42.106.161.74', 'zyrF', 'false', '687667d1-ec57-4d6c-b2ca-b8bb3af5472e'),
(476, '::ffff:106.213.85.165', '8eIk', 'false', 'f31c8c1d-56b0-43d6-a03d-1047eb7ac6cf'),
(477, '::ffff:106.213.85.165', 'F3xC', 'false', '02dd7e31-44d1-4cfe-9cb1-cfa3c3cd3576'),
(483, '::ffff:182.79.253.139', 'aiB8', 'false', 'a6b2c534-60b5-47cb-b3b8-81d02debdbea'),
(487, '::ffff:223.233.86.153', '5BQD', 'false', '43baaed1-4559-4db5-9a6c-09923cf5b145'),
(495, '::ffff:223.233.86.126', 'MkI8', 'false', 'cedee9e1-2f4b-49b5-ab0f-28e6800c54b4'),
(504, '::ffff:223.233.82.80', 'qrMx', 'false', 'bc299a68-6fd0-4204-8204-ea225cbabd65'),
(515, '::ffff:223.233.86.32', 'lGNm', 'false', 'd35041dc-16ce-489c-b11d-24e004b6f874'),
(518, '::ffff:223.233.84.144', 'B262', 'false', 'c1324e00-c8a9-4b13-b626-49f32fbb6aa3'),
(519, '::ffff:223.233.84.144', 'IEN1', 'false', 'acaf3da8-bfd9-4f0f-90f3-779facd9601f'),
(530, '::ffff:223.233.84.144', 'cWjU', 'false', '38da77e0-90d0-4859-9349-6ef6e88071c8'),
(544, '::ffff:223.233.84.82', 'o4Sb', 'false', 'bfcbccd4-701e-4600-a5b5-8c0cef946678'),
(550, '::ffff:49.44.82.165', '1ZWX', 'false', '04b1bbf2-e020-47a3-9792-4cc66090df0a'),
(552, '::ffff:223.233.83.124', 'wLua', 'false', '1ed64df0-4360-427b-824a-c0ce8337ec95'),
(553, '::ffff:223.233.83.124', '5H8U', 'false', 'f5bf662e-3f95-4fc9-9e13-8c5b55f0f894'),
(556, '::ffff:223.233.83.124', 'Uq13', 'false', '580e85e1-0e1a-40cd-8cf8-520d0a836845'),
(559, '::ffff:49.44.83.105', 'qOJ0', 'false', '0bfeef67-8d6a-4665-8bf4-569af5aa7ee8'),
(568, '::ffff:223.233.83.124', 'hjaZ', 'false', '7ea0f5c7-bbe6-4462-8df3-9db42453fd65'),
(581, '::ffff:223.233.83.211', 'KxI1', 'false', '3f061c84-fa04-41c0-9de7-7cc588a89406'),
(588, '::ffff:103.251.18.5', 'oonq', 'false', '751e8bad-a57c-4a39-b4ff-d8b867436691'),
(596, '::ffff:223.233.82.221', 'Ouzl', 'false', 'cc904e4c-d264-4608-a5d3-c44d01139e34'),
(613, '::ffff:49.44.78.4', 'bPFL', 'false', 'b0eab635-df60-4bba-9b65-b07ff9bd985c'),
(616, '::ffff:223.233.86.103', '27kE6E', 'false', 'e87d9dad-0bf6-4b20-87ab-76551f1cef10'),
(626, '::ffff:223.233.85.153', 'Zs4f8Q', 'false', 'ec0a2266-d45d-4856-92a0-0ed4a958e8b6'),
(633, '::ffff:223.233.85.153', 'fyRUVa', 'false', '3af2dc4e-502a-4847-a639-c637686cbbae'),
(635, '::ffff:103.78.14.144', 'OK95TR', 'false', '7cf5edb5-fb7c-4e78-9602-51d080bca410'),
(637, '::ffff:103.78.14.144', 'HJkf43', 'false', '68727baa-4846-4129-9ae8-43109ab8d0a2'),
(643, '::ffff:103.78.14.233', 'h3abDz', 'false', 'a5450e2e-d2f5-45a1-94d8-3784a2e7087b'),
(649, '::ffff:223.233.87.143', 'Lhugxk', 'false', '146c9ebd-8553-4a19-84f6-9eefa76b4e76'),
(654, '::ffff:223.233.85.28', 'vsnfKy', 'false', '3b946214-572b-4adf-95e7-50055186343f'),
(655, '::ffff:111.7.96.171', 'On2rKW', 'false', '23ce9126-aeaf-4a8f-98fa-b9acb58b6726'),
(661, '::ffff:203.192.223.69', 'cIT3R7', 'false', '89244ce5-1961-4e6e-aac3-e42d8e10cfd6'),
(662, '::ffff:203.192.223.69', 'JGsOYh', 'false', 'b9229fbf-5967-4632-a707-956a738e132e'),
(664, '::ffff:89.248.171.23', 'Vw4l6n', 'false', '47a6a6c8-ce78-4750-a404-d3287eb28145'),
(666, '::ffff:223.189.223.22', 'I3g3CI', 'false', '6059f0db-e9ff-4e78-b925-3185df6518b3'),
(667, '::ffff:223.189.223.22', '2vEMRW', 'false', '1783c06d-7eb5-4c3e-bb21-5f22178c73c6'),
(685, '::ffff:49.36.214.172', 'QTwBzT', 'false', 'a659e636-fce0-42ae-9a2e-9e9d16b2058a'),
(686, '::ffff:49.44.83.169', '4t6jGu', 'false', 'a72a39a1-867b-41eb-a837-7c61492962d3'),
(715, '::ffff:223.233.85.77', 'FctWtu', 'false', '2fdd4fac-77a2-4aca-9f69-ccf9e4cb38cb'),
(716, '::ffff:1.23.116.239', 'lMNTUR', 'false', 'c6d08cad-3b0d-4c0c-8334-b6b66d7c3942'),
(720, '::ffff:223.233.85.77', 'xCYf7K', 'false', '8096e0d6-a03b-48d2-8311-91af948c0964'),
(728, '::ffff:49.44.81.198', 'qPltz9', 'false', 'd55f68d2-a27a-40fb-b234-480ce05526f3'),
(768, '::ffff:110.226.228.66', 'xhluUH', 'false', '0204cb37-04ef-4376-94a1-9e4aca928b59'),
(769, '::ffff:110.226.228.66', 'wBnKun', 'false', 'a5a09e6a-afb5-411e-ba92-0d9a162ab77a'),
(778, '::ffff:49.44.80.42', 'TkPj7j', 'false', '5924de0d-a1b3-4ba8-a689-09ff31b67b74'),
(785, '::ffff:223.233.82.219', 'JAJ4q8', 'false', 'e9021c71-4156-4512-9b08-6905369dcc67'),
(787, '::ffff:152.58.16.111', 'KpFIV2', 'false', '6f1eb1ab-74f4-43fe-a76f-19838a477a87'),
(790, '::ffff:152.58.16.111', 'Fe6hJM', 'false', '33d6b5a7-d8be-45c0-acb3-a419c57340c1'),
(791, '::ffff:152.58.16.111', 'KWaxSm', 'false', 'd186a862-7f18-41d8-9cdc-97d8636fcbfb'),
(792, '::ffff:152.58.16.111', 'P87lVV', 'false', '6079a601-dac3-4fa9-8678-1280e9618ae0'),
(806, '::ffff:110.226.224.74', '4xgpI2', 'false', '675b6acd-3533-4257-b0f2-7c6bf99a5afd'),
(817, '::ffff:223.233.81.203', 'f4UGK4', 'false', 'f8bf560e-61f0-43b5-a979-6fb622d69836'),
(818, '::ffff:49.44.78.8', 'dmUOQ4', 'false', '440c90f1-7a98-4351-87bb-4155726193b7'),
(822, '::ffff:223.233.87.126', 'V6vwEz', 'false', '4657cc95-5550-492c-a23f-7c2f41350f8d'),
(831, '::ffff:125.122.32.51', 'jw7HFm', 'false', '326df57f-fd77-495f-b427-a3adb61500e3'),
(833, '::ffff:152.58.16.23', 'G3Omwp', 'false', '0299ed2b-87c6-4493-baa7-b942626409b1'),
(844, '::ffff:223.233.87.1', 'LJlear', 'false', '43231cba-63fb-4abb-b0a3-ace3d4a399c6'),
(847, '::ffff:223.233.85.59', 'HE8gP2', 'false', '40c08ae6-11e1-4e5a-bab3-4011a9f3c66c'),
(868, '::ffff:103.78.14.133', 'zIBNNe', 'false', '0485117e-5403-4a64-aa32-72cc76f7e52b'),
(895, '::ffff:42.105.214.224', 'pSeWGF', 'false', '1e787cc0-223d-4616-87d5-95940f3d00a3'),
(896, '::ffff:152.59.188.165', '7tqOkM', 'false', '4d5fd0d2-0625-4fd3-87ff-cc0889cc26fa'),
(899, '::ffff:49.44.67.136', 'weeHhP', 'false', 'd7b60ecd-8c99-421a-9d72-f0b4f17f8138'),
(901, '::ffff:103.78.14.143', 'tCrUDH', 'false', '2a589259-2f6e-4d05-9813-319f1d70a1c4'),
(908, '::ffff:223.233.80.182', 'yV3Cn5', 'false', '03ff996b-4e9f-471f-a030-200db0f77127'),
(909, '::ffff:152.59.188.216', 'ZXrjOL', 'false', '9dc2c7fd-5aff-4894-9627-5024b682b3e3'),
(911, '::ffff:106.219.216.52', 'JwRkvJ', 'false', 'c0a2898e-02f4-433a-8d5c-012498d1ef3c'),
(912, '::ffff:106.219.216.52', 'QwrtdW', 'false', '934f313d-7011-4e87-8142-611d259646c1'),
(915, '::ffff:49.44.78.134', 'TDPasm', 'false', 'ba3de993-437d-4436-b9b5-c5c19ca9ed90'),
(938, '::ffff:119.227.191.4', 'C8Ercp', 'false', '49b573c3-f5ec-4e98-a7cc-23cf37e3dbed'),
(943, '::ffff:223.233.83.80', 'YVjNca', 'false', 'a74e484e-1a0e-4e62-a723-975fb89b098a'),
(944, '::ffff:223.233.83.80', 'S8PSmt', 'false', '4e89a8ee-b773-46ba-b1c4-215f8ce63c89'),
(945, '::ffff:223.233.83.80', 'gNukxM', 'false', '7c1f0376-4c43-4d8a-9cd3-98a6fc49f96f'),
(954, '::ffff:124.155.245.68', 'CsgHVF', 'false', '04089123-3bbe-491d-96f6-834657a1454c'),
(958, '::ffff:103.78.14.169', '2Xf7Q8', 'false', '86dfa017-cf2f-4a95-92f3-0ccc4c5af227'),
(959, '::ffff:103.78.14.185', 'uIlGXA', 'false', 'bb7a2f77-8902-4df8-a00c-3319a40de655'),
(960, '::ffff:103.78.14.128', '76uuL3', 'false', 'cc556cf0-4cc4-4d15-b4c4-9a4730d4bd44'),
(966, '::ffff:103.78.14.213', 'NDQBku', 'false', 'c38aa9dc-301c-4ec7-96f3-e960f36729dd'),
(973, '::ffff:223.233.81.212', 'r5mp5q', 'false', 'cf12d32f-47e2-4f98-9642-e9a98bfcaba7'),
(975, '::ffff:103.78.14.190', 'jUQN8R', 'false', 'd282a8e8-8a59-4044-9eaa-60362930fcd6'),
(976, '::ffff:103.78.14.202', 'ecVBBG', 'false', '5bae9b79-f1c1-466d-82c1-389e739b6209'),
(981, '::ffff:223.233.82.190', 'ONhpyn', 'false', 'bee7459c-82cc-4e14-9878-5ea19dd520d5'),
(986, '::ffff:103.78.14.152', 'fRVnmE', 'false', 'bf045381-d922-49b3-b30c-63d55e2fae97'),
(994, '::ffff:103.78.14.206', 'dJKfVz', 'false', '62391259-52a8-4168-bba0-2328bee487f6'),
(995, '::ffff:103.78.14.128', 'fn9jRr', 'false', 'f2d5120b-2307-4095-bf2e-2c0e28d61696'),
(1000, '::ffff:223.233.81.77', 'mMnlKJ', 'false', 'eb87abd6-97a1-4c78-810a-803346321a6e'),
(1011, '::ffff:103.78.14.190', 'ttVVcu', 'false', '9cf0dd7b-1486-443f-a4ec-8e98abafde2f'),
(1012, '::ffff:103.78.14.195', 'BNwNcW', 'false', '24715caa-39ea-4ecb-8bef-6fcdb30bca30'),
(1014, '::ffff:49.44.85.136', 'dBWHZq', 'false', '227efeca-8619-4849-bf53-ed77d6ecf0e8'),
(1018, '::ffff:103.78.14.142', 'nJqpJj', 'false', '8ddfa981-73a6-468b-af22-a354eb063015'),
(1021, '::ffff:223.233.85.19', 'gpXPay', 'false', 'ee2649e1-6695-4492-8c75-2c7c5c4c6f52'),
(1029, '::ffff:49.44.81.203', 'Uv5UIO', 'false', 'a09d10bf-acd2-460e-9655-9411ff76dbdd'),
(1031, '::ffff:103.78.14.141', 'wy9kZF', 'false', 'c83e28b3-e9e5-48fd-b24f-1240e65693af'),
(1039, '::ffff:223.233.87.118', 'x5sksY', 'false', '7de7baac-f96f-47e4-ab44-b27ae3d66a41'),
(1041, '::ffff:89.248.171.23', 'uZwy7h', 'false', '26c676ae-e584-4931-9b91-4674e578829d'),
(1052, '::ffff:223.233.81.253', '6FaLU5', 'false', 'c7713073-0171-4c96-8c18-2a37d920cecd'),
(1054, '::ffff:223.233.81.253', 'WQr5mD', 'false', '76874f90-26ea-4622-927e-e0001e6edd0c'),
(1055, '::ffff:223.233.81.253', 'mdKpYv', 'false', '398d1bd1-13a2-4ba2-ae5f-c071820405da'),
(1056, '::ffff:223.233.83.245', 'xZHnwx', 'false', '686a190d-f5f9-4a4d-a34c-1c4d844b58d9'),
(1058, '::ffff:223.233.86.7', 'DfcGkT', 'false', '2e674755-c0a5-4731-b3ea-4d2175bc55a6'),
(1060, '::ffff:103.78.14.128', '2kNTHC', 'false', '6925c453-eeb1-4e64-b3d4-9024ff8f344d'),
(1066, '::ffff:103.78.14.142', 'NT2kV7', 'false', '7a6c215b-3fb4-4900-ba6d-c703fc4dd515'),
(1067, '::ffff:103.78.14.154', 'gbmBEL', 'false', '136b4768-c037-4353-8989-de3701df1206'),
(1102, '::ffff:182.79.251.80', 'OcZcUz', 'false', 'db376f3a-23b4-4951-9b20-6a60f54ed427'),
(1117, '::ffff:223.233.85.20', 'TRD68d', 'false', 'e835f71b-5d9a-44b0-8b2c-d4496584a9b8'),
(1129, '::ffff:103.78.14.254', 'v6Mbej', 'false', '9a2896a7-5fc8-4ebf-94a1-27a41cd31c68'),
(1138, '::ffff:111.7.106.106', 'HmXNLM', 'false', '544894d7-7b9e-4772-a10e-9d6eed13ab81'),
(1140, '::ffff:103.58.96.228', 'HmLzsd', 'false', '400d5fe7-fb7b-4538-965e-5bc392b352fb'),
(1146, '::ffff:136.232.137.242', 'CLja33', 'false', '168df584-0234-49d7-9619-5ce133f7d452'),
(1148, '::ffff:111.7.96.179', 'Es5Orc', 'false', 'c7ef0dee-c483-4d0e-ad89-81989849229d'),
(1149, '::ffff:223.233.86.159', 'WQ4qPz', 'false', 'de6cb8e6-35d6-41b1-93c7-cad8356dc7ed'),
(1150, '::ffff:111.7.106.107', '3lYZcx', 'false', 'bebff538-b5fe-4488-9e97-fc5181bdbeac'),
(1160, '::ffff:103.78.14.140', 'BhITB4', 'false', '29cd81d1-8e3c-42e9-9a1e-251d0f2affd8'),
(1161, '::ffff:103.78.14.139', '8BjqgN', 'false', '0b773aa6-0982-41e8-b299-39bf81e5fd3d'),
(1164, '::ffff:103.78.14.175', 'tgHMGD', 'false', '17a6d41a-aa7c-4a94-953a-23110ce53b4a'),
(1169, '::ffff:123.160.223.74', 'rBlASG', 'false', 'eca2d49a-46a9-4195-9eec-80b14d97acae'),
(1178, '::ffff:123.160.223.75', 'LCURYx', 'false', 'c4928336-65d6-4b0e-9276-97e88dd22b01'),
(1180, '::ffff:123.160.223.75', 'Mspsfa', 'false', 'e5e29702-060e-4611-8054-e667b053905f'),
(1181, '::ffff:89.248.171.23', 'yujNO2', 'false', '8365a4c4-9214-427b-8966-e7aadca900cf'),
(1184, '::ffff:223.233.81.199', 'EcJRyu', 'false', '67e0460a-801a-472c-afe5-615aede6e04e'),
(1185, '::ffff:223.233.80.138', 'PXbbZG', 'false', 'fed89c65-0bfb-4b96-838c-331b3e3f3fe5'),
(1186, '::ffff:171.50.182.232', 'aSxIcu', 'false', '4f1a8730-5243-4aa8-b43d-fdd566f93884'),
(1192, '::ffff:103.78.14.148', 'gKvuNA', 'false', '6906313b-59e7-4fda-bfe5-6ef3f37c7dda'),
(1193, '::ffff:103.78.14.174', 'vYLaUV', 'false', 'a97e9d4b-9cb5-4056-a279-e55e254299e1'),
(1194, '::ffff:103.78.14.253', 'WYQ5Tz', 'false', '8565fd66-12c4-4c46-b19d-9b032781c300'),
(1195, '::ffff:103.78.14.197', 'VtBYgq', 'false', '81e59e4c-b404-4bd7-85c1-6171fb0cce40'),
(1196, '::ffff:103.78.14.148', 'hFUCfH', 'false', 'ad053c3a-9774-44c4-9f87-7bb82534c074'),
(1202, '::ffff:111.7.106.107', '5ClAUr', 'false', 'facd3148-3f5a-435f-95bb-8059943cca60'),
(1203, '::ffff:223.233.87.85', '7REYR7', 'false', '1aef8ebe-1d63-493f-8bd7-bc43293e9e72'),
(1204, '::ffff:223.233.87.85', 'B2BIxd', 'false', '0da8adbb-2599-4921-b985-238d6470a2e4'),
(1215, '::ffff:223.233.87.85', 'rq2xDU', 'false', '5fd52d45-79fc-4e2f-aff4-66355cf7e2e7'),
(1226, '::ffff:223.233.82.49', 'Te7Xgq', 'false', '387320fe-3794-4bcf-8960-c84d7f5f98e8'),
(1227, '::ffff:223.233.82.49', 'G9DhQL', 'false', '49c2bb7b-e74e-4081-affe-b109f3f27f57'),
(1236, '::ffff:223.233.81.8', 'xN4SpS', 'false', '0713b2a1-1763-4976-8417-1a72486af858'),
(1237, '::ffff:223.233.81.8', 'cxfEwD', 'false', '0b0261e1-70f7-4fa5-9a05-677ddbfa4dc2'),
(1245, '::ffff:223.233.85.90', 'RnqNyt', 'false', '3b81e4a4-6427-48c5-af25-c5d4e1f6902e'),
(1246, '::ffff:223.233.85.90', 'h9MyVk', 'false', 'bbc2963d-3e1d-4ba0-9729-bbb32c5280df'),
(1252, '::ffff:223.233.85.142', 'yQmspy', 'false', '93992cdf-aa5b-4da2-b32f-3303b521d113'),
(1253, '::ffff:223.233.85.142', '3wf5OM', 'false', '5f7f4d46-0d4d-42c3-bf47-021dc76822b8'),
(1256, '::ffff:49.44.84.106', '8clFCW', 'false', '0f7f1850-b562-4cd0-8296-f848b42df163'),
(1265, '::ffff:152.59.173.211', 'JPQYe2', 'false', 'b40e46a3-087f-47c0-9fe3-a55a25e53a87'),
(1266, '::ffff:152.59.173.211', 'H7DFyP', 'false', 'aaa1e19d-2627-4c74-bfaa-d9185cd8a1b7'),
(1269, '::ffff:152.59.173.115', 'c5juTh', 'false', '60633d4f-148c-4882-9366-e4a47c262323'),
(1270, '::ffff:103.224.186.228', 'bOjDuT', 'false', '20239338-7aaf-4d08-b393-eae24fec872e'),
(1310, '::ffff:74.125.214.35', 'TntDfW', 'false', '44a36da2-cc2f-4900-9db7-9472aebfa271'),
(1317, '::ffff:103.124.140.27', 'eeZhgJ', 'false', '7e3aa381-c4b1-457c-84db-0953f285cc5a'),
(1320, '::ffff:223.233.85.237', 'nWJnOw', 'false', '34c07459-b457-43d5-9677-e485d860e727'),
(1321, '::ffff:74.125.214.34', 'rnGGBL', 'false', 'e64946e2-8a34-44d7-9bba-100fa807ba8a'),
(1322, '::ffff:123.160.223.74', 'jvYPYl', 'false', '5000f79f-315b-484d-b010-0fbcca6a8f6a'),
(1333, '::ffff:49.44.78.5', 'Z8SCPK', 'false', 'f8ed6313-2f2b-4003-81ef-e9ae77906c21'),
(1334, '::ffff:111.7.96.157', 'W7qyGX', 'false', 'b037f236-b119-40d9-bc6d-1ff5dfff3d7d'),
(1337, '::ffff:223.233.87.52', '4zgQJK', 'false', '7efe26d5-d0fb-493a-98ad-a676e09142b2'),
(1339, '::ffff:223.233.87.52', 'vKy4aI', 'false', 'dfc3fac7-f498-485a-8c2d-b26bf2f21033'),
(1343, '::ffff:3.111.17.14', 'pKAPZ8', 'false', 'efb93fb4-0016-41e8-a6a6-1ac2c47104c6'),
(1344, '::ffff:223.233.87.52', 'exryCa', 'false', 'cbe04902-0f83-48a8-b0dd-a375188187e4'),
(1345, '::ffff:3.111.17.14', 'kgYX8J', 'false', 'f816fdae-2b9a-4858-adb0-88cf0f1013c2'),
(1346, '::ffff:223.233.87.52', 'a5exkn', 'false', '9d09496a-90e7-4f96-a386-1167d02128ce'),
(1352, '::ffff:223.233.85.26', 'I25KrE', 'false', '139bfd01-ed58-4948-8d08-6ce5d7196c69'),
(1353, '::ffff:223.233.87.149', 'rBx3RD', 'false', '51d9e06a-9c49-45bf-8eae-13ebb7780a3d'),
(1356, '::ffff:103.78.14.198', 'QrgyzV', 'false', '06217e7b-f470-4c33-8f91-035d9d973bba'),
(1367, '::ffff:223.233.85.51', 'qFwZbV', 'false', '65b0237f-3ee4-4098-9c28-ee51159a55ab'),
(1368, '::ffff:223.233.86.179', 'SdTYD2', 'false', 'c17f1ea1-2021-433d-a3d1-534c126c9188'),
(1369, '::ffff:223.233.86.179', 'Ysj2xE', 'false', 'a2ced8f5-2719-45c9-b306-6a498d00554e'),
(1372, '::ffff:172.253.216.60', 'zKwfSe', 'false', '70b48a39-0a92-4e95-86d8-c66b71283ae8'),
(1373, '::ffff:173.194.92.184', 'NH3wv2', 'false', 'd182c107-ae1e-46c9-8ab6-c9244f64b423'),
(1374, '::ffff:223.233.84.31', '9HfLSp', 'false', '728b36f3-404d-4724-b756-c45386af2955'),
(1376, '::ffff:223.233.83.159', 'l47Elf', 'false', 'a8cb91d9-300e-494c-ad99-9f219e479f4e'),
(1377, '::ffff:40.77.202.174', 'sf6eXq', 'false', '32175b4e-cdf6-4521-9027-4a87a4425bb8'),
(1378, '::ffff:223.233.83.159', '4qZ9ng', 'false', '93fe135f-eefb-489b-9dcc-d1186f3d6ed8'),
(1379, '::ffff:223.233.83.159', '2nSksp', 'false', '5f444431-faad-49a1-b187-22f2699a6251'),
(1389, '::ffff:223.233.87.12', 'qRTvqF', 'false', '285b17eb-d696-43fa-a79f-7f2e9847109c'),
(1391, '::ffff:49.43.118.134', '66yM52', 'false', '158c61bb-d22b-45a4-b152-9b96af275037'),
(1392, '::ffff:223.233.86.173', 'DNZL4X', 'false', '9cd3254f-4653-49e2-b215-d4212b2cd0c9'),
(1393, '::ffff:223.233.86.173', 'bpwvze', 'false', 'ce88cf4f-b036-4bcb-987a-4b42ee62d42b'),
(1394, '::ffff:223.233.86.173', 'Xact5F', 'false', '72f72167-167b-4693-a4ae-2ba0ebfb4e53'),
(1397, '::ffff:223.233.85.58', 'fEkqaX', 'false', '5eb2c784-4060-4124-9081-8013d58e06ec'),
(1403, '::ffff:223.233.87.43', 'Px8IxA', 'false', '7ae6bfe8-1499-41e0-8477-56a1e50c8367'),
(1404, '::ffff:223.233.87.43', 'cEsgXl', 'false', '0e0731a9-c8e6-40ea-9a8a-4e59393ee1dc'),
(1409, '::ffff:223.233.84.223', 'X8TcxY', 'false', '0840b1b9-6bd0-44f2-8b37-72b3b152d966'),
(1410, '::ffff:223.233.84.223', 'qKn2HH', 'false', 'ecfb49f6-26e0-48a5-a01e-9461db66f727'),
(1420, '::ffff:223.233.87.75', 'zMm8CJ', 'false', '5d53ba76-a0e0-4c1a-b69a-47f09647c288'),
(1421, '::ffff:223.233.87.75', 'mHvRgV', 'false', '73c80dc6-bb74-4fa9-8d23-68180fd04a50'),
(1422, '::ffff:223.233.87.75', 'lE6KMj', 'false', '67232a15-b6f2-4cb0-b726-fed8ec75241e'),
(1423, '::ffff:223.233.87.75', 'yeKxV5', 'false', '37c7868f-67b4-4ed9-9347-6b722cf63d55'),
(1424, '::ffff:223.233.87.75', 'V5pDa8', 'false', '9682bef4-5467-4514-a928-eb72545e4bff'),
(1425, '::ffff:223.233.87.75', '2C7ICx', 'false', 'c2c86f61-8c73-4e2e-8b71-fb81c782aac1'),
(1426, '::ffff:223.233.87.75', '7sF6tK', 'false', '215e719e-9339-4539-8d8d-e86cb64d30c4'),
(1427, '::ffff:223.233.87.75', 'Ih7RnA', 'false', '3ef22392-de9a-408f-b321-cb7d49226e90'),
(1434, '::ffff:223.233.85.135', 'vfvfLQ', 'false', '7f608f41-686e-42ae-90a7-70a51c51d94a'),
(1435, '::ffff:223.233.85.135', 'L8pBB5', 'false', '348efe11-35d9-4c5c-9cd8-4f0321b609cf'),
(1436, '::ffff:223.233.85.135', 'DlbvvE', 'false', '6ea7ac29-b768-46f7-92fc-40e5ada27640'),
(1437, '::ffff:123.160.223.74', 'Pc6ank', 'false', '31505d32-c3e1-4f14-ac00-d36ad317d728'),
(1475, '::ffff:223.233.83.96', 'xxLbbI', 'false', 'c9628f5f-0c3b-416c-b176-88f086495709'),
(1476, '::ffff:223.233.83.96', 'xrpIvK', 'false', '7e0f5cf3-96bd-4af7-b810-f75b909bb4f3'),
(1477, '::ffff:223.233.83.96', 'xFQT76', 'false', '24fcbf4d-357e-4fb2-a1b0-85e9529eda0c'),
(1478, '::ffff:223.233.83.96', 'I3Xqj5', 'false', 'cdab503e-c6f9-4a54-b1d6-7e605f361fa0'),
(1479, '::ffff:223.233.83.96', 'R7AHB5', 'false', '1a13c624-b514-48c7-abac-2a424055f369'),
(1480, '::ffff:223.233.83.96', 'xcxRJl', 'false', '03f42d6e-d39a-4f69-8d65-13518c7c413b'),
(1481, '::ffff:223.233.83.96', 'zFPhNf', 'false', '33d2413f-713d-4f4a-815d-f6e0cb59fd2d'),
(1482, '::ffff:223.233.83.96', 'q5eYhh', 'false', 'd8dda247-bc14-4f2e-b4b1-644365e9fc46'),
(1491, '::ffff:223.233.84.247', 'zxL5sO', 'false', '6ff500b6-df37-48ac-be37-3c647b292294'),
(1492, '::ffff:223.233.84.247', 'lnpYft', 'false', '2607f163-179a-4f64-bf38-922010977a8c'),
(1514, '::ffff:223.233.84.247', 'TfIDWW', 'false', '707cc7c0-c2f0-4b42-a9bb-0d029eaf31b0'),
(1515, '::ffff:223.233.84.247', 'k2bXTp', 'false', 'dd85692a-184a-4a2e-9809-f6ee9aac70b6'),
(1522, '::ffff:223.233.81.147', '2gkFnL', 'false', '3b6697be-b4df-485b-bf8e-46a0e791ebd2'),
(1523, '::ffff:223.233.81.147', 'SEuH7Z', 'false', 'abc23ef4-cfb7-4278-b0e8-6a0b47aff781'),
(1524, '::ffff:223.233.85.91', 'Q6eXG6', 'false', '7a525d66-2ea7-4e4b-9c3e-c8c5faef3a4f'),
(1525, '::ffff:223.233.85.91', '5gYp5F', 'false', '6c1671b7-f3ff-4612-8011-ee709e507852'),
(1544, '::ffff:223.233.85.91', 'FFNRae', 'false', 'c7f74891-5f5f-4f4c-9684-416b84e9712e'),
(1545, '::ffff:223.233.85.91', 'XbNwb2', 'false', 'd66ef7b8-edb6-49d4-843d-333b7865e6a8'),
(1560, '::ffff:223.233.82.210', 'OlE6DP', 'false', '748f9640-48d9-4910-90b8-90042f5db079'),
(1561, '::ffff:223.233.82.210', 'pWdRDC', 'false', 'a516c57b-51b2-49bd-8b4f-e85bc34ce29e'),
(1564, '::ffff:223.233.84.52', 'kMOVRw', 'false', 'e0a376b8-d6dd-480c-b044-f8138c712c92'),
(1565, '::ffff:223.233.84.52', 'ATMyMI', 'false', 'cdaba55b-83b7-49e5-bdd1-8050b8ebad77'),
(1576, '::ffff:223.233.85.234', '2asv3t', 'false', '1aff4f74-1e31-406b-8f66-b007196b528c'),
(1577, '::ffff:223.233.85.234', '2BjSJY', 'false', 'bf7ff44a-8138-404c-8885-e4676a63e924'),
(1578, '::ffff:223.233.85.234', 'HWfTMC', 'false', '2f463751-1370-4515-95b7-9b359fb4e8e9'),
(1579, '::ffff:223.233.85.234', 'JAgGDa', 'false', 'c234930c-13e1-4f9d-8e25-fb35b7b78147');

-- --------------------------------------------------------

--
-- Table structure for table `citizensignup`
--

CREATE TABLE `citizensignup` (
  `id` int NOT NULL,
  `fullname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `mobile` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `citizensignup`
--

INSERT INTO `citizensignup` (`id`, `fullname`, `email`, `mobile`, `password`) VALUES
(1, 'Sankalp', 'sankalp@gmail.com', '9878987872', '123456'),
(2, 'Sankalp1', 'sankalp1@gmail.com', '8684832858', '23456'),
(3, 'Ajinkya Dhavile ', 'ajinkya123@gmail.com', '9307040177', 'Ajinkya@123'),
(4, 'PRACHI', 'prachisharma0485@gmail.co', '9764994321', 'SUPRPRACHI@4321'),
(5, 'PRACHI', 'prachisharma0485@gmail.co', '9764994321', 'SUPRPRACHI@4321'),
(6, 'PRACHI', 'prachi0485@gmail.com', '9764994321', 'SUPRPRACHI@4321'),
(7, 'Abhishek', 'taxdepartment10@gmail.com', '9555498773', '06247320Sham'),
(8, 'Apex', 'apex@gmail.com', '9096330523', '123456'),
(9, 'Sanal gupta', 'Sanal@gmail.com', '9918299079', 'Sanal123'),
(10, 'BHARAT', 'bbmishra@gmail.com', '9532202316', 'Ballia12345'),
(11, 'Sanal gupta', 'Sanal@gmail.com', '9918299079', 'Sanal123'),
(12, 'Sanal gupta', 'Sanal@gmail.com', '9918299079', 'Sanal123'),
(13, 'PRACHI', 'prachisharma048@gmail.com', '9764994321', 'SUPRPRACHI@1234'),
(14, 'Divyansh', 'try.divyanshverma@gmail.com', '9555495916', 'npp12345'),
(15, 'apeksha', 'apeksha19may@gmail.com', '9096330523', '123456'),
(16, 'Apeksha ', 'apeksha19may@gmail.com', '9096330523', '123456'),
(17, 'Apeksha ', 'apeksha19may@gmail.com', '9096330523', '123456'),
(18, 'Apeksha ', 'apeksha19may@gmail.com', '9096330523', '123456'),
(19, 'test ', 'mekabo8990@insfou.com', '9918299079', 'Ballia1234'),
(20, 'test ', 'mekabo8990@insfou.com', '9918299079', 'Ballia1234');

-- --------------------------------------------------------

--
-- Table structure for table `customerarea`
--

CREATE TABLE `customerarea` (
  `Srno` int NOT NULL,
  `CustomerID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Floor` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `sqft` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PropertyforUse` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ConstructionType` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Arv` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customerbillbreakdown`
--

CREATE TABLE `customerbillbreakdown` (
  `id` int NOT NULL,
  `PropertyID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `BillNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Particulars` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Amount` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customerbillbreakdown`
--

INSERT INTO `customerbillbreakdown` (`id`, `PropertyID`, `BillNumber`, `Particulars`, `Amount`) VALUES
(1, '1724485776', '1724485776_11_2024', 'House Tax', '7929'),
(2, '1724485776', '1724485776_11_2024', 'Water Tax', '0'),
(3, '1724485776', '1724485776_11_2024', 'Total', '7929'),
(4, '1730955409', '1730955409_9_2024', 'House Tax', '900'),
(5, '1730955409', '1730955409_9_2024', 'Water Tax', '500'),
(6, '1730955409', '1730955409_9_2024', 'Total', '1400'),
(7, '1731384936', '1731384936_10_2024', 'House Tax', '1200'),
(8, '1731384936', '1731384936_10_2024', 'Water Tax', '1234'),
(9, '1731384936', '1731384936_10_2024', 'Total', '2434'),
(10, '1731384936', '1731384936_8_2024', 'House Tax', '1200'),
(11, '1731384936', '1731384936_8_2024', 'Water Tax', '200'),
(12, '1731384936', '1731384936_8_2024', 'Total', '1400'),
(13, '1731389730', '1731389730_4_2024', 'House Tax', '120'),
(14, '1731389730', '1731389730_4_2024', 'Water Tax', '30'),
(15, '1731389730', '1731389730_4_2024', 'Total', '150'),
(16, '1730955409', '1730955409_3_2024', 'House Tax', '1200'),
(17, '1730955409', '1730955409_3_2024', 'Water Tax', '100'),
(18, '1730955409', '1730955409_3_2024', 'Total', '1300'),
(19, '1732505301', '1732505301_8_2024', 'House Tax', '1200'),
(20, '1732505301', '1732505301_8_2024', 'Water Tax', '120'),
(21, '1732505301', '1732505301_8_2024', 'Total', '1320'),
(22, '1732505302', '1732505302_11_2024', 'House Tax', '100'),
(23, '1732505302', '1732505302_11_2024', 'Water Tax', '12'),
(24, '1732505302', '1732505302_11_2024', 'Total', '112'),
(25, '1732511542', '1732511542_9_2023', 'House Tax', '100'),
(26, '1732511542', '1732511542_9_2023', 'Water Tax', '100'),
(27, '1732511542', '1732511542_9_2023', 'Total', '200'),
(28, '1732689149', '1732689149_3_2023', 'House Tax', '120'),
(29, '1732689149', '1732689149_3_2023', 'Water Tax', '100'),
(30, '1732689149', '1732689149_3_2023', 'Total', '220'),
(31, '1732689150', '1732689150_9_2024', 'House Tax', '100'),
(32, '1732689150', '1732689150_9_2024', 'Water Tax', '100'),
(33, '1732689150', '1732689150_9_2024', 'Total', '200'),
(34, '1732794816', '1732794816_9_2024', 'House Tax', '120'),
(35, '1732794816', '1732794816_9_2024', 'Water Tax', '100'),
(36, '1732794816', '1732794816_9_2024', 'Total', '220'),
(37, '1732794816', '1732794816_10_2024', 'House Tax', '100'),
(38, '1732794816', '1732794816_10_2024', 'Water Tax', '100'),
(39, '1732794816', '1732794816_10_2024', 'Total', '200'),
(40, '1742453676', '1742453676_1_2025', 'House Tax', '5589'),
(41, '1742453676', '1742453676_1_2025', 'Water Tax', '5589'),
(42, '1742453676', '1742453676_1_2025', 'Total', '11178'),
(43, '1742453676', '1742453676_4_2024', 'House Tax', '5567'),
(44, '1742453676', '1742453676_4_2024', 'Water Tax', '5587'),
(45, '1742453676', '1742453676_4_2024', 'Total', '11154'),
(46, '0958101005000001R', '0958101005000001R_1_2025', 'House Tax', '9'),
(47, '0958101005000001R', '0958101005000001R_1_2025', 'Water Tax', '9'),
(48, '0958101005000001R', '0958101005000001R_1_2025', 'Total', '18'),
(49, '0958101005000010R', '0958101005000010R_4_2025', 'House Tax', '80'),
(50, '0958101005000010R', '0958101005000010R_4_2025', 'Water Tax', '80'),
(51, '0958101005000010R', '0958101005000010R_4_2025', 'Total', '160'),
(52, '0958101005000011R', '0958101005000011R_1_2024', 'House Tax', '188'),
(53, '0958101005000011R', '0958101005000011R_1_2024', 'Water Tax', '199'),
(54, '0958101005000011R', '0958101005000011R_1_2024', 'Total', '387'),
(55, '0958101005000025R', '0958101005000025R_4_2025', 'House Tax', '98'),
(56, '0958101005000025R', '0958101005000025R_4_2025', 'Water Tax', '91'),
(57, '0958101005000025R', '0958101005000025R_4_2025', 'Total', '189');

-- --------------------------------------------------------

--
-- Table structure for table `customerdocs`
--

CREATE TABLE `customerdocs` (
  `id` int NOT NULL,
  `CustomerID` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Document_Name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Doc_id` int NOT NULL,
  `ApprovalStatus` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `UniqueStatus` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customerdocs`
--

INSERT INTO `customerdocs` (`id`, `CustomerID`, `Document_Name`, `Doc_id`, `ApprovalStatus`, `UniqueStatus`) VALUES
(13, '0958101001000008R', '1744285100999Capture11.PNG', 9658, '0', '0958101001000008R1744285100999Capture11.PNG'),
(14, '0958101001000008R', '1744285101128Capture9.PNG', 9876, '0', '0958101001000008R1744285101128Capture9.PNG'),
(15, '0958101008000009R', '1744289945303Capture11.PNG', 9658, '0', '0958101008000009R1744289945303Capture11.PNG'),
(16, '0958101008000009R', '1744289945424Capture9.PNG', 9876, '0', '0958101008000009R1744289945424Capture9.PNG'),
(17, '0958101005000010R', '1744356281995Capture11 (1).png', 9658, '0', '0958101005000010R1744356281995Capture11 (1).png'),
(18, '0958101005000010R', '1744356281996Capture11 (1).png', 9658, '0', '0958101005000010R1744356281996Capture11 (1).png'),
(21, '0958101005000012R', '1744456419921Capture9.PNG', 9658, '0', '0958101005000012R1744456419921Capture9.PNG'),
(22, '0958101005000012R', '1744456419922Capture11.PNG', 9876, '0', '0958101005000012R1744456419922Capture11.PNG'),
(23, '0958101005000013C', '1744456755742Capture9.PNG', 9658, '0', '0958101005000013C1744456755742Capture9.PNG'),
(24, '0958101005000013C', '1744456755744Capture9.PNG', 9658, '0', '0958101005000013C1744456755744Capture9.PNG'),
(27, '0958101007000014R', '1744470165125peacock.jfif', 9658, '0', '0958101007000014R1744470165125peacock.jfif'),
(28, '0958101007000014R', '1744470165126peacock.jfif', 9658, '0', '0958101007000014R1744470165126peacock.jfif'),
(31, '0958101005000015R', '1744607921071Capture9.PNG', 9658, '0', '0958101005000015R1744607921071Capture9.PNG'),
(32, '0958101005000015R', '1744607921073Capture.PNG', 9876, '0', '0958101005000015R1744607921073Capture.PNG'),
(33, '0958101005000016R', '1744608226958gigw-Logo.png', 9658, '0', '0958101005000016R1744608226958gigw-Logo.png'),
(37, '0958101005000017C', '1744608382892W3C-CSS-Logo.png', 9658, '0', '0958101005000017C1744608382892W3C-CSS-Logo.png'),
(38, '0958101005000017C', '1744608382893Maharashtra-Engineering-Training-Academy-Final-Logo.png', 9876, '0', '0958101005000017C1744608382893Maharashtra-Engineering-Training-Academy-Final-Logo.png'),
(39, '0958101005000018C', '1744608670183Capture9.PNG', 9658, '0', '0958101005000018C1744608670183Capture9.PNG'),
(40, '0958101005000018C', '1744608670188Capture.PNG', 9876, '0', '0958101005000018C1744608670188Capture.PNG'),
(41, '0958101005000019C', '1744611307722gigw-Logo.png', 9658, '0', '0958101005000019C1744611307722gigw-Logo.png'),
(42, '0958101005000019C', '1744611307723gigw-Logo.png', 9658, '0', '0958101005000019C1744611307723gigw-Logo.png'),
(45, '0958101005000020R', '1744612498616W3C-CSS-Logo.png', 9658, '0', '0958101005000020R1744612498616W3C-CSS-Logo.png'),
(49, '0958101005000021C', '1744612612064W3C-XHTML-Logo.png', 9658, '0', '0958101005000021C1744612612064W3C-XHTML-Logo.png'),
(50, '0958101005000021C', '1744612612065W3C-XHTML-Logo.png', 9658, '0', '0958101005000021C1744612612065W3C-XHTML-Logo.png'),
(53, '0958101005000022R', '1744612633495image (8).png', 9658, '0', '0958101005000022R1744612633495image (8).png'),
(54, '0958101005000022R', '1744612633533image (8).png', 9658, '0', '0958101005000022R1744612633533image (8).png'),
(57, '0958101007000023C', '1744623230003gigw-Logo.png', 9658, '0', '0958101007000023C1744623230003gigw-Logo.png'),
(58, '0958101007000023C', '1744623230004gigw-Logo.png', 9658, '0', '0958101007000023C1744623230004gigw-Logo.png'),
(61, '0958101005000024R', '1744629766069W3C-CSS-Logo.png', 9658, '0', '0958101005000024R1744629766069W3C-CSS-Logo.png'),
(65, '0958101005000027R', '1744710155407W3C-CSS-Logo.png', 9658, '0', '0958101005000027R1744710155407W3C-CSS-Logo.png'),
(69, '0958101008000028R', '1744710223596W3C-CSS-Logo.png', 9658, '0', '0958101008000028R1744710223596W3C-CSS-Logo.png'),
(73, '0958101005000029R', '1744710758902gigw-Logo.png', 9658, '0', '0958101005000029R1744710758902gigw-Logo.png'),
(77, '0958101005000030R', '1744710812693gigw-Logo.png', 9658, '0', '0958101005000030R1744710812693gigw-Logo.png'),
(81, '0958101001000031R', '1744710840998gigw-Logo.png', 9658, '0', '0958101001000031R1744710840998gigw-Logo.png'),
(82, '0958101001000031R', '1744710840999gigw-Logo.png', 9658, '0', '0958101001000031R1744710840999gigw-Logo.png'),
(85, '0958101002000032R', '1744710912244gigw-Logo.png', 9658, '0', '0958101002000032R1744710912244gigw-Logo.png'),
(89, '0958101004000033R', '1744710948524gigw-Logo.png', 9658, '0', '0958101004000033R1744710948524gigw-Logo.png'),
(93, '0958101007000034R', '1744711065879gigw-Logo.png', 9658, '0', '0958101007000034R1744711065879gigw-Logo.png'),
(97, '0958101005000035C', '1744712362484DG-Meri-Logo (1).png', 9658, '0', '0958101005000035C1744712362484DG-Meri-Logo (1).png'),
(101, '0958101008000036C', '1744712424441DG-Meri-Logo (1).png', 9658, '0', '0958101008000036C1744712424441DG-Meri-Logo (1).png'),
(105, '0958101005000037C', '1744715514387Maharashtra-Engineering-Training-Academy-Final-Logo.png', 9658, '0', '0958101005000037C1744715514387Maharashtra-Engineering-Training-Academy-Final-Logo.png'),
(106, '0958101005000037C', '1744715514387peacock.jfif', 9876, '0', '0958101005000037C1744715514387peacock.jfif'),
(107, '0958101005000038R', '1744716115138peacock.jfif', 9658, '0', '0958101005000038R1744716115138peacock.jfif'),
(108, '0958101005000038R', '1744716115141peacock.jfif', 9658, '0', '0958101005000038R1744716115141peacock.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `Srno` int NOT NULL,
  `PropertyID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `FullName` text COLLATE utf8mb4_general_ci NOT NULL,
  `FatherorGaurdianName` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `TotalArea` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Area_Use` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Plot_No` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `TotalARV` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Talo_ki_Sankhya` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PropertyType` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PropertyAge` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Address` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Meter` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `locality` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `uniqueness` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ContactNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `AadharNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PanNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Approvance` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pending',
  `ConstructionType` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Remark` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `WaterTaxConnection` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ElectricityConnection` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `SewerConnection` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Ward` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `createdOn` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`Srno`, `PropertyID`, `FullName`, `FatherorGaurdianName`, `TotalArea`, `Area_Use`, `Plot_No`, `TotalARV`, `Talo_ki_Sankhya`, `PropertyType`, `PropertyAge`, `location`, `Address`, `Meter`, `locality`, `uniqueness`, `ContactNumber`, `AadharNumber`, `PanNumber`, `Approvance`, `ConstructionType`, `Remark`, `WaterTaxConnection`, `ElectricityConnection`, `SewerConnection`, `Ward`, `createdOn`) VALUES
(1, '0958101005000001R', 'ewe', 'dsaf', '111', '88.80000000000001', '575', '4656.6720000000005', '5', '1', '55', '18.5719894/73.7595417', 'ttg', '12-24', 'amrtapaalee', 'amrtapaalee /12-24', 'dga', '5657', '57', 'Approved', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-01'),
(2, '0958101005000002R', 'qwwwwwww', 'errrrrrrr', '1111111', '888888.8', '422', '31039996.896000005', '7', '1', '4', '18.5719894/73.7595417', 'f', '9-12', 'amrtapaalee', 'amrtapaalee /9-12', '33333', '44444', '333332222', 'Approved', 'RccRate', NULL, 'No', 'No', 'No', 'amrtapaalee', '2025-04-01'),
(3, '0958101005000003R', 'rer', 'sdf', '111', '88.80000000000001', '222', '4656.6720000000005', '4', '1', '5', '18.5719894/73.7595417', 'gdfg', '12-24', 'amrtapaalee', 'amrtapaalee /12-24', '353', '6643', '536', 'Approved', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-01'),
(4, '0958101008000004R', 'qwerty', 'asdfgh', '122', '97.60000000000001', '2434', '8725.440000000002', '5', '1', '4', '18.5719866/73.7602771', 'asdfvcxz', '12-24', 'oktenaganj', 'oktenaganj /12-24', '2322222', '1222233333', '3322', 'Pending', 'OtherPakkaRate', NULL, 'Yes', 'No', 'No', 'oktenaganj', '2025-04-02'),
(5, '0958101005000005R', 'TestToday', 'Test', '1222', '977.6', '1', '78012.48000000001', '3', '1', '21', '25.4473509/81.8285735', 'sdfdgsd', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '99183998099', '343344940458', '884894', 'Approved', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-07'),
(6, '0958101005000006R', 'test1147', 'father ', '1000', '800', '001', '20928.000000000004', '1', '1', '1', '25.142633/82.560356', 'address', '0-9', 'amrtapaalee', 'amrtapaalee /0-9', '0000000000', '000000000000', '0000000000', 'Approved', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-07'),
(7, '0958101005000007C', 'test1218', 'father', '1000', '800', '002', '62784.000000000015', '1', '2', '1', '25.142605/82.560478', 'address', '0-9', 'amrtapaalee', 'amrtapaalee /0-9', '0000000000', '000000000000', '0000000000', 'Pending', 'RccRate', NULL, '', '', '', 'amrtapaalee', '2025-04-07'),
(8, '0958101001000008R', 'qwrer', 'erwer', '2222', '1777.6000000000001', '23535', '92577.40800000001', '3', '1', '3', '18.5520632/73.7712416', '3', '0-9', 'jagdishpur', 'jagdishpur /0-9', '4543255324', '32353', '5436', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'jagdishpur', '2025-04-10'),
(9, '0958101008000009R', 'wqrr', 'dsfdsf', '1233', '986.4000000000001', '22', '73506.528', '4', '1', '5', '18.59584/73.7902592', 'strxdf', '9-12', 'oktenaganj', 'oktenaganj /9-12', '6243626', '465656', '537373', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'oktenaganj', '2025-04-10'),
(10, '0958101005000010R', 'Apeksha', 'a', '1000', '800', '123', '63840', '2', '1', '10', '18.5722213/73.7808686', 'pune', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '8989898989', '121212121212', 'WASED0000M', 'Approved', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-11'),
(11, '0958101005000011R', 'Ajinkya ', 'B Dhavile ', '2100', '1680', '12', '134064', '1', '1', '10', '18.5520634/73.7712366', 'Pune', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '9307040177', '899867764554', 'ABCDE4545F', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-12'),
(12, '0958101005000012R', 'wrewr', 'fgsf', '222', '177.60000000000002', '44444', '6201.792000000001', '4', '1', '2', '18.612224/73.383936', 'gdf', '9-12', 'amrtapaalee', 'amrtapaalee /9-12', '3535', '5465', '444444', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-12'),
(13, '0958101005000013C', 'mnmm', 'gjghhkj', '123', '98.4', '4567', '12362.976', '3', '2', '3', '18.612224/73.383936', 'dgfh', '12-24', 'amrtapaalee', 'amrtapaalee /12-24', '787768', '345678', '345678o9', 'Approved', 'OtherPakkaRate', NULL, '', '', '', 'amrtapaalee', '2025-04-12'),
(14, '0958101007000014R', 'rohit choudhari', 'mulchandani ', '500', '400', '10', '6432', '3', '1', '10', '18.5401344/73.8885632', 'lala chowk harpur', '9-12', 'harpur', 'harpur /9-12', '1234567890', '1234567890', '1234567890', 'Pending', 'KacchaRate', NULL, 'Yes', 'Yes', 'Yes', 'harpur', '2025-04-12'),
(15, '0958101005000015R', 'fullname', 'fathername', '1222', '977.6', '233', '78012.48000000001', '2', '1', '2', '18.59584/73.7902592', 'efsadf', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '9876543210', '23456778192333', 'DFGTP1344F', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-14'),
(16, '0958101005000016R', 'dsgfdgr', 'rettw', '1222', '977.6', '658436', '34137.792', '3', '1', '4', '18.5548471/73.7595417', 'fgsg', '9-12', 'amrtapaalee', 'amrtapaalee /9-12', '6884864467', '6686586', '5745757', 'Pending', 'RccRate', NULL, 'No', 'No', 'No', 'amrtapaalee', '2025-04-14'),
(17, '0958101005000017C', 'esres', 'fdssfds', '400', '320', '3453', '20160', '3', '2', '5', '18.5548471/73.7595417', 'zfdsresfdxs', '12-24', 'amrtapaalee', 'amrtapaalee /12-24', '213214321', '3243252', '243243254', 'Approved', 'KacchaRate', NULL, '', '', '', 'amrtapaalee', '2025-04-14'),
(18, '0958101005000018C', 'dfdg', 'dfgdg', '122', '97.60000000000001', '5673657', '18411.264000000003', '5', '2', '6', '18.59584/73.7902592', 'kfkg', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '4586658', '6586355753', '573557', 'Pending', 'OtherPakkaRate', NULL, '', '', '', 'amrtapaalee', '2025-04-14'),
(19, '0958101005000019C', 'dsfdsgf', 'fgfdgfd', '2222', '1777.6000000000001', '5474774', '335326.46400000004', '2', '2', '3', '18.552068/73.7712347', 'fdzfgd', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '436366356', '54772547472', '574747547', 'Pending', 'OtherPakkaRate', NULL, '', '', '', 'amrtapaalee', '2025-04-14'),
(20, '0958101005000020R', 'APEKSHA JOSHI ', 'Anup', '100', '80', '66', '6384', '6', '1', '10', '18.5520757/73.7712737', 'Pune', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '7878787878', '989898989898', 'ASDEW0000P', 'Approved', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-14'),
(21, '0958101005000021C', 'Apexa', 'a', '500', '400', '67', '95760', '2', '2', '9', '18.5548471/73.7595417', 'Pune', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '9898989898', '989898989898', 'ALSOK0000M', 'Pending', 'RccRate', NULL, '', '', '', 'amrtapaalee', '2025-04-14'),
(22, '0958101005000022R', 'sfddf', 'wrrsfs', '1122', '897.6', '346264', '71628.48000000001', '22', '1', '333', '18.5520634/73.7712353', 'xzzzss', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '2153543646', '5474572', '4632656256', 'Pending', 'RccRate', NULL, 'No', 'No', 'No', 'amrtapaalee', '2025-04-14'),
(23, '0958101007000023C', 'Rajat ', 'rajsingh', '300', '240', '4', '29030.399999999998', '2', '2', '3', '18.5548471/73.7595417', 'Mumbai', '9-12', 'harpur', 'harpur /9-12', '7890654326', '433352226111', 'MAHRA3333U', 'Pending', 'RccRate', NULL, '', '', '', 'harpur', '2025-04-14'),
(24, '0958101005000024R', 'kaveri madom', 'anup', '1500', '1200', '5', '33552', '5', '1', '5', '18.5548471/73.7595417', 'Mumbai', '9-12', 'amrtapaalee', 'amrtapaalee /9-12', '9877676767', '322234445666', 'ABCDE3434W', 'Pending', 'OtherPakkaRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-14'),
(25, '0958101005000025R', 'test', 'test', '1200', '960', '12', '76608', '1', '1', '12', '25.449435/81.8275031', 'fhgfhf', '24-above', 'amrtapaalee', 'amrtapaalee /24-above', '99875456567788', '87654456654456667', 'yyytt556666', 'Approved', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-15'),
(26, '0958101008000026R', 'testqw', 'testqw', '100', '80', '23', '13411.2', '1', '1', '12', '25.449434/81.8274953', 'dfghjk', '24-above', 'oktenaganj', 'oktenaganj /24-above', '9987654321', '987654321234', '123456778', 'Approved', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'oktenaganj', '2025-04-15'),
(27, '0958101005000027R', 'Tanay Zankar', 'pankaj', '1900', '1520', '9', '53078.399999999994', '8', '1', '12', '18.5722566/73.7602772', 'Pune', '9-12', 'amrtapaalee', 'amrtapaalee /9-12', '9800000099', '1111222233334444', 'ASDFG6666R', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-15'),
(28, '0958101008000028R', 'Tanay Zankar', 'pankaj', '1900', '1520', '9', '113270.40000000001', '8', '1', '12', '18.5722566/73.7602772', 'Pune', '9-12', 'oktenaganj', 'oktenaganj /9-12', '9800000099', '1111222233334444', 'ASDFG6666R', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'oktenaganj', '2025-04-15'),
(29, '0958101005000029R', 'Tanay zankar ', 'Pankaj ', '1900', '1520', '9', '53078.399999999994', '8', '1', '15', '18.5722566/73.7602772', 'Pune', '9-12', 'amrtapaalee', 'amrtapaalee /9-12', '98000099', '1111222233334444', 'ASDFG6666R', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-15'),
(30, '0958101005000030R', 'Tanay zankar ', 'Pankaj ', '1900', '1520', '9', '53078.399999999994', '8', '1', '15', '18.5722566/73.7602772', 'Pune', '9-12', 'amrtapaalee', 'amrtapaalee /9-12', '98000099', '1111222233334444', 'ASDFG6666R', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'amrtapaalee', '2025-04-15'),
(31, '0958101001000031R', 'Tanay zankar ', 'Pankaj ', '1900', '1520', '9', '105609.59999999999', '8', '1', '15', '18.5722566/73.7602772', 'Pune', '9-12', 'jagdishpur', 'jagdishpur /9-12', '98000099', '1111222233334444', 'ASDFG6666R', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'jagdishpur', '2025-04-15'),
(32, '0958101002000032R', 'Tanay zankar ', 'Pankaj ', '1900', '1520', '9', '74419.20000000001', '8', '1', '15', '18.5722566/73.7602772', 'Pune', '9-12', 'bankata', 'bankata /9-12', '98000099', '1111222233334444', 'ASDFG6666R', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'bankata', '2025-04-15'),
(33, '0958101004000033R', 'Tanay zankar ', 'Pankaj ', '1900', '1520', '9', '33379.2', '8', '1', '15', '18.5722566/73.7602772', 'Pune', '9-12', 'vijayipur', 'vijayipur /9-12', '98000099', '1111222233334444', 'ASDFG6666R', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'vijayipur', '2025-04-15'),
(34, '0958101007000034R', 'Tanay zankar ', 'Pankaj ', '1900', '1520', '9', '61286.399999999994', '8', '1', '15', '18.5722566/73.7602772', 'Pune', '9-12', 'harpur', 'harpur /9-12', '98000099', '1111222233334444', 'ASDFG6666R', 'Pending', 'RccRate', NULL, 'Yes', 'Yes', 'Yes', 'harpur', '2025-04-15'),
(35, '0958101005000035C', 'shruti Zankar Test', 'rajaram ', '2000', '1600', '300', '201024', '15', '2', '22', '18.552038/73.7712132', 'Pune', '12-24', 'amrtapaalee', 'amrtapaalee /12-24', '9700000055', '988878886777', 'QWERT3434Q', 'Pending', 'OtherPakkaRate', NULL, '', '', '', 'amrtapaalee', '2025-04-15'),
(36, '0958101008000036C', 'shruti Zankar Test', 'rajaram ', '2000', '1600', '300', '429120', '15', '2', '22', '18.552038/73.7712132', 'Pune', '12-24', 'oktenaganj', 'oktenaganj /12-24', '9700000055', '988878886777', 'QWERT3434Q', 'Pending', 'OtherPakkaRate', NULL, '', '', '', 'oktenaganj', '2025-04-15'),
(37, '0958101005000037C', 'Arnav Walia', 'burari', '300', '240', '20', '25142.4', '5', '2', '5', '18.5722566/73.7602772', 'Delhi', '9-12', 'amrtapaalee', 'amrtapaalee /9-12', '789999999966', '3434565678789090', 'ZXCVV6666Y', 'Pending', 'RccRate', NULL, '', '', '', 'amrtapaalee', '2025-04-15'),
(38, '0958101005000038R', 'Testing Testing ', 'Testing ', '80', '64', '67', '1344', '400', '1', '3', '18.5722566/73.7602772', 'Mumbai', '12-24', 'amrtapaalee', 'amrtapaalee /12-24', '9898989984', '11111111111', 'ABCD5555Y', 'Pending', 'KacchaRate', NULL, 'No', 'No', 'No', 'amrtapaalee', '2025-04-15');

-- --------------------------------------------------------

--
-- Table structure for table `discountcodes`
--

CREATE TABLE `discountcodes` (
  `id` int NOT NULL,
  `DiscountFor` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Percent` int NOT NULL,
  `Status` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discountcodes`
--

INSERT INTO `discountcodes` (`id`, `DiscountFor`, `Percent`, `Status`) VALUES
(1, 'Bills', 10, 'Active'),
(2, 'Late pay', 1, 'Deactive'),
(3, 'qwerty', 12, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `licensebill`
--

CREATE TABLE `licensebill` (
  `ID` int NOT NULL,
  `Gala` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `BillNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Rate` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Area` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `DueAmount` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `TotalAmount` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PaidAmount` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Remaining` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `FromDate` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ToDate` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Date` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Status` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NotDump',
  `cryptoid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `licensebill`
--

INSERT INTO `licensebill` (`ID`, `Gala`, `BillNumber`, `Rate`, `Area`, `DueAmount`, `TotalAmount`, `PaidAmount`, `Remaining`, `FromDate`, `ToDate`, `Date`, `Status`, `cryptoid`) VALUES
(1, '1739355848685', '1739355848685_1_2025', '555', '100', '0', '55500', '0', '55500', '2024-12-12', '2025-01-12', NULL, 'NotDump', 'de38e07f-d0aa-4fcb-bbb3-d992b45baef6'),
(2, '1739271066411', '1739271066411_3_2025', '555', '20', '', '11100', '0', '11100', '2025-03-01', '2025-03-31', NULL, 'NotDump', '076962fb-0a05-4115-aa20-3a01bc1b5010'),
(3, '1739355848685', '1739355848685_3_2025', '555', '100', '', '111000', '0', '111000', '2025-03-01', '2025-03-31', NULL, 'NotDump', '55c9cc05-312b-4da2-b072-26fedb5211e0'),
(20, '1739442462194', '1739442462194_12_2024', '555', '9.2903', '', '5156.1165', '0', '5156.1165', '2024-12-13', '2025-02-13', NULL, 'Dump', '5d9df902-8f0a-4207-9fc0-89aab198c931'),
(23, '1739442462194', '1739442462194_3_2025', '555', '9.2903', '', '10312.233', '0', '10312.233', '2025-03-01', '2025-03-31', NULL, 'NotDump', 'f9fe8928-1144-49f2-b64c-3ade00958eca'),
(24, '1742451488096', '1742451488096_12_2024', '555', '1000', '0', '555000', '0', '555000', '2024-12-01', '2025-03-20', NULL, 'Dump', 'a1a18dca-2763-495c-a4f8-e98442c9365f'),
(26, '1742451488096', '1742451488096_3_2025', '555', '1000', '0', '555000', '0', '555000', '2025-03-01', '2025-03-31', NULL, 'Dump', '1034582a-4a61-4679-8c08-458bfd79c68d'),
(28, '1742451488096', '1742451488096_4_2024', '555', '1000', '0', '555000', '0', '555000', '2024-04-01', '2024-04-30', NULL, 'NotDump', 'a788c90a-8841-4ded-bb02-dc9d1c8c55ea'),
(29, '1742468506082', '1742468506082_3_2025', '555', '22', '0', '12210', '0', '12210', '2025-03-01', '2025-03-20', NULL, 'NotDump', '9bdcee41-a8b6-44dd-b2f1-af7e65cd4565'),
(30, '1742967819772', '1742967819772_2_2025', '555', '1000', '0', '555000', '0', '555000', '2025-02-01', '2025-03-26', NULL, 'NotDump', 'f2ea8323-fae0-4fef-b0e7-e63b07f434ee'),
(31, 'NRP01', '1', 'NA', 'NA', '6912', '10368', '0', '10368', 'NA', 'NA', '13-02-2025', 'NotDump', 'NA'),
(32, 'NRP02', '2', 'NA', 'NA', '0', '3456', '0', '3456', 'NA', 'NA', '14-02-2025', 'NotDump', 'NA'),
(33, 'NRP03', '3', 'NA', 'NA', '24268', '27724', '0', '27724', 'NA', 'NA', '15-02-2025', 'NotDump', 'NA'),
(34, 'NRP04', '4', 'NA', 'NA', '39888', '43344', '0', '43344', 'NA', 'NA', '16-02-2025', 'NotDump', 'NA'),
(35, 'NRP05', '5', 'NA', 'NA', '12672', '16128', '0', '16128', 'NA', 'NA', '17-02-2025', 'NotDump', 'NA'),
(36, 'NRP06', '6', 'NA', 'NA', '12672', '16128', '0', '16128', 'NA', 'NA', '18-02-2025', 'NotDump', 'NA'),
(37, 'NRP07', '7', 'NA', 'NA', '12672', '16128', '0', '16128', 'NA', 'NA', '19-02-2025', 'NotDump', 'NA'),
(38, 'NRP08', '8', 'NA', 'NA', '12672', '16128', '0', '16128', 'NA', 'NA', '20-02-2025', 'NotDump', 'NA'),
(39, 'NRP09', '9', 'NA', 'NA', '15228', '18684', '0', '18684', 'NA', 'NA', '21-02-2025', 'NotDump', 'NA'),
(40, 'NRP10', '10', 'NA', 'NA', '9808', '13264', '0', '13264', 'NA', 'NA', '22-02-2025', 'NotDump', 'NA'),
(41, 'NRP11', '11', 'NA', 'NA', '15618', '19074', '0', '19074', 'NA', 'NA', '23-02-2025', 'NotDump', 'NA'),
(42, 'NRP12', '12', 'NA', 'NA', '5982', '9438', '0', '9438', 'NA', 'NA', '24-02-2025', 'NotDump', 'NA'),
(43, 'NRP13', '13', 'NA', 'NA', '70968', '74424', '0', '74424', 'NA', 'NA', '25-02-2025', 'NotDump', 'NA'),
(44, 'NRP14', '14', 'NA', 'NA', '70968', '74424', '0', '74424', 'NA', 'NA', '26-02-2025', 'NotDump', 'NA'),
(45, 'NRP15', '15', 'NA', 'NA', '70968', '74424', '0', '74424', 'NA', 'NA', '27-02-2025', 'NotDump', 'NA'),
(46, 'NRP16', '16', 'NA', '5.1', '1086', '5430', '0', '0', 'NA', 'NA', '28-02-2025', 'NotDump', 'NA'),
(47, 'NRP17', '17', 'NA', '5.1', '1086', '5430', '0', '0', 'NA', 'NA', '01-03-2025', 'NotDump', 'NA'),
(48, 'NRP18', '18', 'NA', '5.1', '1086', '5430', '0', '0', 'NA', 'NA', '02-03-2025', 'NotDump', 'NA'),
(49, 'NRP19', '19', 'NA', '5.1', '1086', '5430', '0', '0', 'NA', 'NA', '03-03-2025', 'NotDump', 'NA'),
(50, 'Gala', 'Bill lNumber', 'Rate ', 'Area', 'Due Amount', 'Total Amount ', 'Paid Amount ', 'Remaning ', 'From Date ', 'To Date ', 'Date', 'Status', 'Cryptoid '),
(51, 'NRP21', '21', 'NA', '5.1', '3258', '7602', '0', '0', 'NA', 'NA', '05-03-2025', 'NotDump', 'NA'),
(52, 'NRP22', '22', 'NA', '5.1', '3258', '7602', '0', '0', 'NA', 'NA', '06-03-2025', 'NotDump', 'NA'),
(53, 'NRP23', '23', 'NA', '5.1', '11188', '15532', '0', '0', 'NA', 'NA', '07-03-2025', 'NotDump', 'NA'),
(54, 'NRP24', '24', 'NA', '5.1', '0', '4344', '0', '0', 'NA', 'NA', '08-03-2025', 'NotDump', 'NA'),
(55, 'NRP25', '25', 'NA', '5.1', '2862', '7206', '0', '0', 'NA', 'NA', '09-03-2025', 'NotDump', 'NA'),
(56, 'NRP26', '26', 'NA', '5.1', '2534', '6878', '0', '0', 'NA', 'NA', '10-03-2025', 'NotDump', 'NA'),
(57, 'NRP27', '27', 'NA', '5.1', '4364', '8708', '0', '0', 'NA', 'NA', '11-03-2025', 'NotDump', 'NA'),
(58, 'NRP28', '28', 'NA', '5.1', '2862', '7206', '0', '0', 'NA', 'NA', '12-03-2025', 'NotDump', 'NA'),
(59, 'NRP29', '29', 'NA', '5.1', '10973', '15317', '0', '0', 'NA', 'NA', '13-03-2025', 'NotDump', 'NA'),
(60, 'NRP30', '30', 'NA', '5.1', '724', '5068', '0', '0', 'NA', 'NA', '14-03-2025', 'NotDump', 'NA'),
(61, 'NRP31', '31', 'NA', '5.1', '3628', '7972', '0', '0', 'NA', 'NA', '15-03-2025', 'NotDump', 'NA'),
(62, 'NRP32', '32', 'NA', '5.1', '12518', '16862', '0', '0', 'NA', 'NA', '16-03-2025', 'NotDump', 'NA'),
(63, 'NRP33', '33', 'NA', '5.1', '19160', '23504', '0', '0', 'NA', 'NA', '17-03-2025', 'NotDump', 'NA'),
(64, 'NRP34', '34', 'NA', '5.1', '8793', '13137', '0', '0', 'NA', 'NA', '18-03-2025', 'NotDump', 'NA'),
(65, 'NRP35', '35', 'NA', '5.1', '3328', '9832', '0', '0', 'NA', 'NA', '19-03-2025', 'NotDump', 'NA'),
(66, 'NRP36', '36', 'NA', '5.1', '0', '4344', '0', '0', 'NA', 'NA', '20-03-2025', 'NotDump', 'NA'),
(67, 'NRP37', '37', 'NA', '5.1', '2172', '6516', '0', '0', 'NA', 'NA', '21-03-2025', 'NotDump', 'NA'),
(68, 'NRP38', '38', 'NA', '5.1', '2172', '6516', '0', '0', 'NA', 'NA', '22-03-2025', 'NotDump', 'NA'),
(69, 'NRP39', '39', 'NA', '5.1', '8688', '13032', '0', '0', 'NA', 'NA', '23-03-2025', 'NotDump', 'NA'),
(70, 'NRP40', '40', 'NA', '5.1', '4344', '8688', '0', '0', 'NA', 'NA', '24-03-2025', 'NotDump', 'NA'),
(71, 'NRP41', '41', 'NA', '5.1', '0', '4344', '0', '0', 'NA', 'NA', '25-03-2025', 'NotDump', 'NA'),
(72, 'NRP42', '42', 'NA', '5.1', '1810', '6154', '0', '0', 'NA', 'NA', '26-03-2025', 'NotDump', 'NA'),
(73, 'NRP43', '43', 'NA', '5.1', '1086', '5430', '0', '0', 'NA', 'NA', '27-03-2025', 'NotDump', 'NA'),
(74, 'NRP44', '44', 'NA', '5.1', '6688', '11032', '0', '0', 'NA', 'NA', '28-03-2025', 'NotDump', 'NA'),
(75, 'NRP45', '45', 'NA', '5.1', '1448', '5792', '0', '0', 'NA', 'NA', '29-03-2025', 'NotDump', 'NA'),
(76, 'NRP46', '46', 'NA', '5.1', '0', '4344', '0', '0', 'NA', 'NA', '30-03-2025', 'NotDump', 'NA'),
(77, 'NRP47', '47', 'NA', '5.1', '0', '4344', '0', '0', 'NA', 'NA', '31-03-2025', 'NotDump', 'NA'),
(78, 'NRP48', '48', 'NA', '5.1', '5291', '9635', '0', '0', 'NA', 'NA', '01-04-2025', 'NotDump', 'NA'),
(79, 'NRP49', '49', 'NA', '5.1', '4344', '8688', '0', '0', 'NA', 'NA', '02-04-2025', 'NotDump', 'NA'),
(80, 'NRP50', '50', 'NA', '5.1', '4344', '8688', '0', '0', 'NA', 'NA', '03-04-2025', 'NotDump', 'NA'),
(81, 'NRP51', '51', 'NA', '5.1', '8688', '13032', '0', '0', 'NA', 'NA', '04-04-2025', 'NotDump', 'NA'),
(82, 'NRP52', '52', 'NA', '5.1', '4344', '8688', '0', '0', 'NA', 'NA', '05-04-2025', 'NotDump', 'NA'),
(83, 'NRP53', '53', 'NA', '5.1', '0', '4344', '0', '0', 'NA', 'NA', '06-04-2025', 'NotDump', 'NA'),
(84, 'NRP54', '54', 'NA', '5.1', '0', '4344', '0', '0', 'NA', 'NA', '07-04-2025', 'NotDump', 'NA'),
(85, 'NRP55', '55', 'NA', '5.1', '82215', '86559', '0', '0', 'NA', 'NA', '08-04-2025', 'NotDump', 'NA'),
(86, 'NRP56', '56', 'NA', '5.1', '77466', '81810', '0', '0', 'NA', 'NA', '09-04-2025', 'NotDump', 'NA'),
(87, 'NRP57', '57', 'NA', '5.1', '4000', '8344', '0', '0', 'NA', 'NA', '10-04-2025', 'NotDump', 'NA'),
(88, 'NRP58', '58', 'NA', '5.1', '6504', '13008', '0', '0', 'NA', 'NA', '11-04-2025', 'NotDump', 'NA'),
(89, 'NRP59', '59', 'NA', '5.1', '9750', '16254', '0', '0', 'NA', 'NA', '12-04-2025', 'NotDump', 'NA'),
(90, 'NRP60', '60', 'NA', '5.1', '1086', '5430', '0', '0', 'NA', 'NA', '13-04-2025', 'NotDump', 'NA'),
(91, 'NRP61', '61', 'NA', '5.1', '4344', '8688', '0', '0', 'NA', 'NA', '14-04-2025', 'NotDump', 'NA'),
(92, 'NRP62', '62', 'NA', '65', '0', '0', '0', '0', 'NA', 'NA', '15-04-2025', 'NotDump', 'NA'),
(93, 'NRP63', '63', 'NA', '21.34', '1670', '6734', '0', '0', 'NA', 'NA', '16-04-2025', 'NotDump', 'NA'),
(94, 'NRP64', '64', 'NA', '12.17', '20845', '25909', '0', '0', 'NA', 'NA', '17-04-2025', 'NotDump', 'NA'),
(95, 'NRP65', '65', 'NA', '12.17', '0', '5064', '0', '0', 'NA', 'NA', '18-04-2025', 'NotDump', 'NA'),
(96, 'NRP66', '66', 'NA', '12.17', '17145', '22209', '0', '0', 'NA', 'NA', '19-04-2025', 'NotDump', 'NA'),
(97, 'NRP67', '67', 'NA', '9.49', '48395', '53459', '0', '0', 'NA', 'NA', '20-04-2025', 'NotDump', 'NA'),
(98, 'NRP68', '68', 'NA', '9.49', '16014', '21078', '0', '0', 'NA', 'NA', '21-04-2025', 'NotDump', 'NA'),
(99, 'NRP69', '69', 'NA', '9.49', '8046', '13110', '0', '0', 'NA', 'NA', '22-04-2025', 'NotDump', 'NA'),
(100, 'NRP70', '70', 'NA', '9.49', '0', '5064', '0', '0', 'NA', 'NA', '23-04-2025', 'NotDump', 'NA'),
(101, 'NRP71', '71', 'NA', '9.49', '25128', '30192', '0', '0', 'NA', 'NA', '24-04-2025', 'NotDump', 'NA'),
(102, 'NRP72', '72', 'NA', '9.49', '37808', '42872', '0', '0', 'NA', 'NA', '25-04-2025', 'NotDump', 'NA'),
(103, 'NRP73', '73', 'NA', '9.49', '10128', '15192', '0', '0', 'NA', 'NA', '26-04-2025', 'NotDump', 'NA'),
(104, 'NRP74', '74', 'NA', '9.49', '1266', '6330', '0', '0', 'NA', 'NA', '27-04-2025', 'NotDump', 'NA'),
(105, 'NRP75', '75', 'NA', '9.49', '0', '5064', '0', '0', 'NA', 'NA', '28-04-2025', 'NotDump', 'NA'),
(106, 'NRP76', '76', 'NA', '9.49', '11750', '16814', '0', '0', 'NA', 'NA', '29-04-2025', 'NotDump', 'NA'),
(107, 'NRP77', '77', 'NA', '9.49', '25107', '30171', '0', '0', 'NA', 'NA', '30-04-2025', 'NotDump', 'NA'),
(108, 'NRP78', '78', 'NA', '9.49', '20128', '25192', '0', '0', 'NA', 'NA', '01-05-2025', 'NotDump', 'NA'),
(109, 'NRP79', '79', 'NA', '9.49', '93410', '98474', '0', '0', 'NA', 'NA', '02-05-2025', 'NotDump', 'NA'),
(110, 'NRP80', '80', 'NA', '9.49', '42598', '47662', '0', '0', 'NA', 'NA', '03-05-2025', 'NotDump', 'NA'),
(111, 'NRP81', '81', 'NA', '9.49', '0', '83870', '0', '0', 'NA', 'NA', '04-05-2025', 'NotDump', 'NA'),
(112, 'NRP82', '82', 'NA', '9.49', '10128', '15192', '0', '0', 'NA', 'NA', '05-05-2025', 'NotDump', 'NA'),
(113, 'NRP83', '83', 'NA', '9.49', '58577', '63641', '0', '0', 'NA', 'NA', '06-05-2025', 'NotDump', 'NA'),
(114, 'NRP84', '84', 'NA', '9.49', '68581', '73645', '0', '0', 'NA', 'NA', '07-05-2025', 'NotDump', 'NA'),
(115, 'NRP85', '85', 'NA', '29*13', '0', '8664', '0', '0', 'NA', 'NA', '08-05-2025', 'NotDump', 'NA'),
(116, 'NRP86', '86', 'NA', '29*13', '0', '8664', '0', '0', 'NA', 'NA', '09-05-2025', 'NotDump', 'NA'),
(117, 'NRP87', '87', 'NA', '29*13', '0', '8664', '0', '0', 'NA', 'NA', '10-05-2025', 'NotDump', 'NA'),
(118, 'NRP88', '88', 'NA', '29*13', '7616', '16280', '0', '0', 'NA', 'NA', '11-05-2025', 'NotDump', 'NA'),
(119, 'NRP89', '89', 'NA', '29*13', '29', '8693', '0', '0', 'NA', 'NA', '12-05-2025', 'NotDump', 'NA'),
(120, 'NRP90', '90', 'NA', '29*13', '0', '0', '0', '0', 'NA', 'NA', '13-05-2025', 'NotDump', 'NA'),
(121, 'NRP91', '91', 'NA', '29*13', '137959', '146623', '0', '0', 'NA', 'NA', '14-05-2025', 'NotDump', 'NA'),
(122, 'NRP92', '92', 'NA', '29*13', '51937', '60601', '0', '0', 'NA', 'NA', '15-05-2025', 'NotDump', 'NA'),
(123, 'NRP93', '93', 'NA', '29*13', '31752', '40416', '0', '0', 'NA', 'NA', '16-05-2025', 'NotDump', 'NA'),
(124, 'NRP94', '94', 'NA', '36', '43725', '52389', '0', '0', 'NA', 'NA', '17-05-2025', 'NotDump', 'NA'),
(125, 'NRP95', '95', 'NA', '0', '17374', '26061', '0', '0', 'NA', 'NA', '18-05-2025', 'NotDump', 'NA'),
(126, 'NRP96', '96', 'NA', '0', '37748', '46700', '0', '0', 'NA', 'NA', '19-05-2025', 'NotDump', 'NA'),
(127, 'NRP97', '97', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '20-05-2025', 'NotDump', 'NA'),
(128, 'NRP98', '98', 'NA', '0', '172456', '0', '0', '0', 'NA', 'NA', '21-05-2025', 'NotDump', 'NA'),
(130, 'NRP99', '99', 'NA', '35.68', '0', '0', '0', '0', 'NA', 'NA', '22-05-2025', 'NotDump', 'NA'),
(131, 'NRP100', '100', 'NA', '5.57', '0', '0', '0', '0', 'NA', 'NA', '23-05-2025', 'NotDump', 'NA'),
(132, 'NRP101', '101', 'NA', '23.22', '0', '0', '0', '0', 'NA', 'NA', '24-05-2025', 'NotDump', 'NA'),
(133, 'NRP102', '102', 'NA', '23.22', '0', '0', '0', '0', 'NA', 'NA', '25-05-2025', 'NotDump', 'NA'),
(134, 'NRP103', '103', 'NA', '23.22', '0', '0', '0', '0', 'NA', 'NA', '26-05-2025', 'NotDump', 'NA'),
(135, 'NRP104', '104', 'NA', '23.22', '0', '0', '0', '0', 'NA', 'NA', '27-05-2025', 'NotDump', 'NA'),
(136, 'NRP105', '105', 'NA', '23.22', '0', '0', '0', '0', 'NA', 'NA', '28-05-2025', 'NotDump', 'NA'),
(137, 'NRP106', '106', 'NA', '5.57', '0', '0', '0', '0', 'NA', 'NA', '29-05-2025', 'NotDump', 'NA'),
(138, 'NRP107', '107', 'NA', '5.57', '0', '0', '0', '0', 'NA', 'NA', '30-05-2025', 'NotDump', 'NA'),
(139, 'NRP108', '108', 'NA', '35.68', '0', '0', '0', '0', 'NA', 'NA', '31-05-2025', 'NotDump', 'NA'),
(140, 'NRP109', '109', 'NA', '2.5', '0', '0', '0', '0', 'NA', 'NA', '01-06-2025', 'NotDump', 'NA'),
(141, 'NRP110', '110', 'NA', '30.65', '0', '0', '0', '0', 'NA', 'NA', '02-06-2025', 'NotDump', 'NA'),
(142, 'NRP111', '111', 'NA', '30.65', '0', '0', '0', '0', 'NA', 'NA', '03-06-2025', 'NotDump', 'NA'),
(143, 'NRP112', '112', 'NA', '30.65', '0', '0', '0', '0', 'NA', 'NA', '04-06-2025', 'NotDump', 'NA'),
(144, 'NRP113', '113', 'NA', '30.65', '0', '0', '0', '0', 'NA', 'NA', '05-06-2025', 'NotDump', 'NA'),
(145, 'NRP114', '114', 'NA', '13.53', '3852', '11556', '0', '0', 'NA', 'NA', '06-06-2025', 'NotDump', 'NA'),
(146, 'NRP115', '115', 'NA', '13.53', '1284', '8988', '0', '0', 'NA', 'NA', '07-06-2025', 'NotDump', 'NA'),
(147, 'NRP116', '116', 'NA', '13.53', '43662', '51366', '0', '0', 'NA', 'NA', '08-06-2025', 'NotDump', 'NA'),
(148, 'NRP117', '117', 'NA', '13.53', '43662', '51366', '0', '0', 'NA', 'NA', '09-06-2025', 'NotDump', 'NA'),
(149, 'NRP118', '118', 'NA', '13.53', '7704', '15408', '0', '0', 'NA', 'NA', '10-06-2025', 'NotDump', 'NA'),
(150, 'NRP119', '119', 'NA', '13.53', '0', '7704', '0', '0', 'NA', 'NA', '11-06-2025', 'NotDump', 'NA'),
(151, 'NRP120', '120', 'NA', '13.53', '0', '7704', '0', '0', 'NA', 'NA', '12-06-2025', 'NotDump', 'NA'),
(152, 'NRP121', '121', 'NA', '13.53', '41550', '49254', '0', '0', 'NA', 'NA', '13-06-2025', 'NotDump', 'NA'),
(153, 'NRP122', '122', 'NA', '13.53', '32064', '39768', '0', '0', 'NA', 'NA', '14-06-2025', 'NotDump', 'NA'),
(154, 'NRP123', '123', 'NA', '13.53', '0', '7704', '0', '0', 'NA', 'NA', '15-06-2025', 'NotDump', 'NA'),
(155, 'NRP124', '124', 'NA', '13.53', '0', '7704', '0', '0', 'NA', 'NA', '16-06-2025', 'NotDump', 'NA'),
(156, 'NRP125', '125', 'NA', '13.53', '7704', '15408', '0', '0', 'NA', 'NA', '17-06-2025', 'NotDump', 'NA'),
(157, 'NRP126', '126', 'NA', '13.53', '87699', '95403', '0', '0', 'NA', 'NA', '18-06-2025', 'NotDump', 'NA'),
(158, 'NRP127', '127', 'NA', '13.53', '7704', '15408', '0', '0', 'NA', 'NA', '19-06-2025', 'NotDump', 'NA'),
(159, 'NRP128', '128', 'NA', '13.53', '7704', '15408', '0', '0', 'NA', 'NA', '20-06-2025', 'NotDump', 'NA'),
(160, 'NRP129', '129', 'NA', '13.53', '23112', '30816', '0', '0', 'NA', 'NA', '21-06-2025', 'NotDump', 'NA'),
(161, 'NRP130', '130', 'NA', '13.53', '18816', '26520', '0', '0', 'NA', 'NA', '22-06-2025', 'NotDump', 'NA'),
(162, 'NRP131', '131', 'NA', '13.53', '1926', '9630', '0', '0', 'NA', 'NA', '23-06-2025', 'NotDump', 'NA'),
(163, 'NRP132', '132', 'NA', '13.53', '5904', '13608', '0', '0', 'NA', 'NA', '24-06-2025', 'NotDump', 'NA'),
(164, 'NRP133', '133', 'NA', '13.53', '39400', '47104', '0', '0', 'NA', 'NA', '25-06-2025', 'NotDump', 'NA'),
(165, 'NRP134', '134', 'NA', '13.53', '0', '7704', '0', '0', 'NA', 'NA', '26-06-2025', 'NotDump', 'NA'),
(166, 'NRP135', '135', 'NA', '39.76', '2000', '13760', '0', '0', 'NA', 'NA', '27-06-2025', 'NotDump', 'NA'),
(167, 'NRP136', '136', 'NA', '18', '0', '11760', '0', '0', 'NA', 'NA', '28-06-2025', 'NotDump', 'NA'),
(168, 'NRP137', '137', 'NA', '18', '0', '5112', '0', '0', 'NA', 'NA', '29-06-2025', 'NotDump', 'NA'),
(169, 'NRP138', '138', 'NA', '18', '0', '5028', '0', '0', 'NA', 'NA', '30-06-2025', 'NotDump', 'NA'),
(170, 'NRP139', '139', 'NA', '18', '42882', '48198', '0', '0', 'NA', 'NA', '01-07-2025', 'NotDump', 'NA'),
(171, 'NRP140', '140', 'NA', '18', '872', '6308', '0', '0', 'NA', 'NA', '02-07-2025', 'NotDump', 'NA'),
(172, 'NRP141', '141', 'NA', '18', '0', '5496', '0', '0', 'NA', 'NA', '03-07-2025', 'NotDump', 'NA'),
(173, 'NRP142', '142', 'NA', '18', '7012', '12724', '0', '0', 'NA', 'NA', '04-07-2025', 'NotDump', 'NA'),
(174, 'NRP143', '143', 'NA', '18', '0', '5616', '0', '0', 'NA', 'NA', '05-07-2025', 'NotDump', 'NA'),
(175, 'NRP144', '144', 'NA', '18', '5800', '11200', '0', '0', 'NA', 'NA', '06-07-2025', 'NotDump', 'NA'),
(176, 'NRP145', '145', 'NA', '18', '1330', '6550', '0', '0', 'NA', 'NA', '07-07-2025', 'NotDump', 'NA'),
(177, 'NRP146', '146', 'NA', '18', '43252', '48316', '0', '0', 'NA', 'NA', '08-07-2025', 'NotDump', 'NA'),
(178, 'NRP147', '147', 'NA', '18', '71758', '76654', '0', '0', 'NA', 'NA', '09-07-2025', 'NotDump', 'NA'),
(179, 'NRP148', '148', 'NA', '18', '6804', '11448', '0', '0', 'NA', 'NA', '10-07-2025', 'NotDump', 'NA'),
(180, 'NRP149', '149', 'NA', '10.49', '0', '4044', '0', '0', 'NA', 'NA', '11-07-2025', 'NotDump', 'NA'),
(181, 'NRP150', '150', 'NA', '10.49', '15621', '20013', '0', '0', 'NA', 'NA', '12-07-2025', 'NotDump', 'NA'),
(182, 'NRP151', '151', 'NA', '10.49', '8472', '12708', '0', '0', 'NA', 'NA', '13-07-2025', 'NotDump', 'NA'),
(183, 'NRP152', '152', 'NA', '10.49', '0', '4632', '0', '0', 'NA', 'NA', '14-07-2025', 'NotDump', 'NA'),
(184, 'NRP153', '153', 'NA', '10.62', '18984', '28476', '0', '0', 'NA', 'NA', '15-07-2025', 'NotDump', 'NA'),
(185, 'NRP154', '154', 'NA', '10.62', '0', '4776', '0', '0', 'NA', 'NA', '16-07-2025', 'NotDump', 'NA'),
(186, 'NRP155', '155', 'NA', '10.62', '21823', '26503', '0', '0', 'NA', 'NA', '17-07-2025', 'NotDump', 'NA'),
(187, 'NRP156', '156', 'NA', '13.68', '4288', '8932', '0', '0', 'NA', 'NA', '18-07-2025', 'NotDump', 'NA'),
(188, 'NRP157', '157', 'NA', '13.68', '16860', '21420', '0', '0', 'NA', 'NA', '19-07-2025', 'NotDump', 'NA'),
(189, 'NRP158', '158', 'NA', '13.68', '15172', '18916', '0', '0', 'NA', 'NA', '20-07-2025', 'NotDump', 'NA'),
(190, 'NRP159', '159', 'NA', '13.68', '33113', '37577', '0', '0', 'NA', 'NA', '21-07-2025', 'NotDump', 'NA'),
(191, 'NRP160', '160', 'NA', '13.68', '0', '4464', '0', '0', 'NA', 'NA', '22-07-2025', 'NotDump', 'NA'),
(192, 'NRP161', '161', 'NA', '13.68', '24886', '29278', '0', '0', 'NA', 'NA', '23-07-2025', 'NotDump', 'NA'),
(193, 'NRP162', '162', 'NA', '13.68', '4000', '8380', '0', '0', 'NA', 'NA', '24-07-2025', 'NotDump', 'NA'),
(194, 'NRP163', '163', 'NA', '13.68', '32534', '35006', '0', '0', 'NA', 'NA', '25-07-2025', 'NotDump', 'NA'),
(195, 'NRP164', '164', 'NA', '13.68', '31284', '33696', '0', '0', 'NA', 'NA', '26-07-2025', 'NotDump', 'NA'),
(196, 'NRP165', '165', 'NA', '10.68', '4800', '7200', '0', '0', 'NA', 'NA', '27-07-2025', 'NotDump', 'NA'),
(197, 'NRP166', '166', 'NA', '10.68', '0', '2520', '0', '0', 'NA', 'NA', '28-07-2025', 'NotDump', 'NA'),
(198, 'NRP167', '167', 'NA', '10.68', '0', '2628', '0', '0', 'NA', 'NA', '29-07-2025', 'NotDump', 'NA'),
(199, 'NRP168', '168', 'NA', '10.68', '49500', '52128', '0', '0', 'NA', 'NA', '30-07-2025', 'NotDump', 'NA'),
(200, 'NRP169', '169', 'NA', '10.68', '4240', '7360', '0', '0', 'NA', 'NA', '31-07-2025', 'NotDump', 'NA'),
(201, 'NRP170', '170', 'NA', '10.68', '29982', '33258', '0', '0', 'NA', 'NA', '01-08-2025', 'NotDump', 'NA'),
(202, 'NRP171', '171', 'NA', '10.68', '0', '3384', '0', '0', 'NA', 'NA', '02-08-2025', 'NotDump', 'NA'),
(203, 'NRP172', '172', 'NA', '12.74', '0', '3924', '0', '0', 'NA', 'NA', '03-08-2025', 'NotDump', 'NA'),
(204, 'NRP173', '173', 'NA', '12.74', '0', '456', '0', '0', 'NA', 'NA', '04-08-2025', 'NotDump', 'NA'),
(205, 'NRP174', '174', 'NA', '12.74', '0', '4176', '0', '0', 'NA', 'NA', '05-08-2025', 'NotDump', 'NA'),
(206, 'NRP175', '175', 'NA', '12.74', '0', '4356', '0', '0', 'NA', 'NA', '06-08-2025', 'NotDump', 'NA'),
(207, 'NRP176', '176', 'NA', '14.28', '2832', '7248', '0', '0', 'NA', 'NA', '07-08-2025', 'NotDump', 'NA'),
(208, 'NRP177', '177', 'NA', '14.28', '0', '4524', '0', '0', 'NA', 'NA', '08-08-2025', 'NotDump', 'NA'),
(209, 'NRP178', '178', 'NA', '14.28', '0', '1980', '0', '0', 'NA', 'NA', '09-08-2025', 'NotDump', 'NA'),
(210, 'NRP179', '179', 'NA', '14.76', '1896', '6744', '0', '0', 'NA', 'NA', '10-08-2025', 'NotDump', 'NA'),
(211, 'NRP180', '180', 'NA', '15.28', '0', '4440', '0', '0', 'NA', 'NA', '11-08-2025', 'NotDump', 'NA'),
(212, 'NRP181', '181', 'NA', '15.28', '2076', '7152', '0', '0', 'NA', 'NA', '12-08-2025', 'NotDump', 'NA'),
(213, 'NRP182', '182', 'NA', '40.1', '3600', '8460', '0', '0', 'NA', 'NA', '13-08-2025', 'NotDump', 'NA'),
(214, 'NRP183', '183', 'NA', '15.55', '0', '0', '0', '0', 'NA', 'NA', '14-08-2025', 'NotDump', 'NA'),
(215, 'NRP184', '184', 'NA', '15.55', '13017', '14001', '0', '0', 'NA', 'NA', '15-08-2025', 'NotDump', 'NA'),
(216, 'NRP185', '185', 'NA', '15.55', '0', '984', '0', '0', 'NA', 'NA', '16-08-2025', 'NotDump', 'NA'),
(217, 'NRP186', '186', 'NA', '15.55', '0', '984', '0', '0', 'NA', 'NA', '17-08-2025', 'NotDump', 'NA'),
(218, 'NRP187', '187', 'NA', '15.55', '0', '984', '0', '0', 'NA', 'NA', '18-08-2025', 'NotDump', 'NA'),
(219, 'NRP188', '188', 'NA', '15.55', '738', '1722', '0', '0', 'NA', 'NA', '19-08-2025', 'NotDump', 'NA'),
(220, 'NRP189', '189', 'NA', '15.55', '0', '13500', '0', '0', 'NA', 'NA', '20-08-2025', 'NotDump', 'NA'),
(221, 'NRP190', '190', 'NA', '15.55', '22145', '23129', '0', '0', 'NA', 'NA', '21-08-2025', 'NotDump', 'NA'),
(222, 'NRP191', '191', 'NA', '15.55', '1968', '2952', '0', '0', 'NA', 'NA', '22-08-2025', 'NotDump', 'NA'),
(223, 'NRP192', '192', 'NA', '15.55', '1968', '2952', '0', '0', 'NA', 'NA', '23-08-2025', 'NotDump', 'NA'),
(224, 'NRP193', '193', 'NA', '15.55', '1968', '2952', '0', '0', 'NA', 'NA', '24-08-2025', 'NotDump', 'NA'),
(225, 'NRP194', '194', 'NA', '15.55', '3227', '4211', '0', '0', 'NA', 'NA', '25-08-2025', 'NotDump', 'NA'),
(226, 'NRP195', '195', 'NA', '15.55', '3127', '4111', '0', '0', 'NA', 'NA', '26-08-2025', 'NotDump', 'NA'),
(227, 'NRP196', '196', 'NA', '15.55', '0', '984', '0', '0', 'NA', 'NA', '27-08-2025', 'NotDump', 'NA'),
(228, 'NRP197', '197', 'NA', '15.55', '1968', '2952', '0', '0', 'NA', 'NA', '28-08-2025', 'NotDump', 'NA'),
(229, 'NRP198', '198', 'NA', '15.55', '0', '984', '0', '0', 'NA', 'NA', '29-08-2025', 'NotDump', 'NA'),
(230, 'NRP199', '199', 'NA', '15.55', '0', '984', '0', '0', 'NA', 'NA', '30-08-2025', 'NotDump', 'NA'),
(231, 'NRP200', '200', 'NA', '15.55', '2600', '3584', '0', '0', 'NA', 'NA', '31-08-2025', 'NotDump', 'NA'),
(232, 'NRP201', '201', 'NA', '15.55', '682', '1666', '0', '0', 'NA', 'NA', '01-09-2025', 'NotDump', 'NA'),
(233, 'NRP202', '202', 'NA', '15.55', '1468', '2452', '0', '0', 'NA', 'NA', '02-09-2025', 'NotDump', 'NA'),
(234, 'NRP203', '203', 'NA', '15.55', '1468', '2452', '0', '0', 'NA', 'NA', '03-09-2025', 'NotDump', 'NA'),
(235, 'NRP204', '204', 'NA', '15.55', '1968', '2952', '0', '0', 'NA', 'NA', '04-09-2025', 'NotDump', 'NA'),
(236, 'NRP205', '205', 'NA', '15.55', '2936', '3920', '0', '0', 'NA', 'NA', '05-09-2025', 'NotDump', 'NA'),
(237, 'NRP206', '206', 'NA', '15.55', '1968', '2952', '0', '0', 'NA', 'NA', '06-09-2025', 'NotDump', 'NA'),
(238, 'NRP207', '207', 'NA', '15.55', '2112', '2640', '0', '0', 'NA', 'NA', '07-09-2025', 'NotDump', 'NA'),
(239, 'NRP208', '208', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '08-09-2025', 'NotDump', 'NA'),
(240, 'NRP209', '209', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '09-09-2025', 'NotDump', 'NA'),
(241, 'NRP210', '210', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '10-09-2025', 'NotDump', 'NA'),
(242, 'NRP211', '211', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '11-09-2025', 'NotDump', 'NA'),
(243, 'NRP212', '212', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '12-09-2025', 'NotDump', 'NA'),
(244, 'NRP213', '213', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '13-09-2025', 'NotDump', 'NA'),
(245, 'NRP214', '214', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '14-09-2025', 'NotDump', 'NA'),
(246, 'NRP215', '215', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '15-09-2025', 'NotDump', 'NA'),
(247, 'NRP216', '216', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '16-09-2025', 'NotDump', 'NA'),
(248, 'NRP217', '217', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '17-09-2025', 'NotDump', 'NA'),
(249, 'NRP218', '218', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '18-09-2025', 'NotDump', 'NA'),
(250, 'NRP219', '219', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '19-09-2025', 'NotDump', 'NA'),
(251, 'NRP220', '220', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '20-09-2025', 'NotDump', 'NA'),
(252, 'NRP221', '221', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '21-09-2025', 'NotDump', 'NA'),
(253, 'NRP222', '222', 'NA', '6.06', '6704', '10556', '0', '0', 'NA', 'NA', '22-09-2025', 'NotDump', 'NA'),
(254, 'NRP223', '223', 'NA', '6.06', '4136', '6704', '0', '0', 'NA', 'NA', '23-09-2025', 'NotDump', 'NA'),
(255, 'NRP224', '224', 'NA', '6.06', '4717', '7285', '0', '0', 'NA', 'NA', '24-09-2025', 'NotDump', 'NA'),
(256, 'NRP225', '225', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '25-09-2025', 'NotDump', 'NA'),
(257, 'NRP226', '226', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '26-09-2025', 'NotDump', 'NA'),
(258, 'NRP227', '227', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '27-09-2025', 'NotDump', 'NA'),
(259, 'NRP228', '228', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '28-09-2025', 'NotDump', 'NA'),
(260, 'NRP229', '229', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '29-09-2025', 'NotDump', 'NA'),
(261, 'NRP230', '230', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '30-09-2025', 'NotDump', 'NA'),
(262, 'NRP231', '', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '01-10-2025', 'NotDump', 'NA'),
(263, 'NRP232', '232', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '02-10-2025', 'NotDump', 'NA'),
(264, 'NRP233', '233', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '03-10-2025', 'NotDump', 'NA'),
(265, 'NRP234', '234', 'NA', '6.06', '9040', '11608', '0', '0', 'NA', 'NA', '04-10-2025', 'NotDump', 'NA'),
(266, 'NRP235', '235', 'NA', '6.06', '7704', '11556', '0', '0', 'NA', 'NA', '05-10-2025', 'NotDump', 'NA'),
(267, 'NRP236', '236', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '06-10-2025', 'NotDump', 'NA'),
(268, 'NRP237', '237', 'NA', '6.06', '1636', '4204', '0', '0', 'NA', 'NA', '07-10-2025', 'NotDump', 'NA'),
(269, 'NRP238', '238', 'NA', '6.06', '10781', '13349', '0', '0', 'NA', 'NA', '08-10-2025', 'NotDump', 'NA'),
(270, 'NRP239', '239', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '09-10-2025', 'NotDump', 'NA'),
(271, 'NRP240', '240', 'NA', '6.06', '0', '0', '0', '0', 'NA', 'NA', '10-10-2025', 'NotDump', 'NA'),
(272, 'NRP241', '241', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '11-10-2025', 'NotDump', 'NA'),
(273, 'NRP242', '242', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '12-10-2025', 'NotDump', 'NA'),
(274, 'NRP243', '243', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '13-10-2025', 'NotDump', 'NA'),
(275, 'NRP244', '244', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '14-10-2025', 'NotDump', 'NA'),
(276, 'NRP245', '245', 'NA', '6.06', '4136', '6704', '0', '0', 'NA', 'NA', '15-10-2025', 'NotDump', 'NA'),
(277, 'NRP246', '246', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '16-10-2025', 'NotDump', 'NA'),
(278, 'NRP247', '247', 'NA', '6.06', '0', '2568', '0', '0', 'NA', 'NA', '17-10-2025', 'NotDump', 'NA'),
(279, 'NRP248', '248', 'NA', '6.06', '0', '2568', '0', '0', 'NA', 'NA', '18-10-2025', 'NotDump', 'NA'),
(280, 'NRP249', '249', 'NA', '6.06', '35648', '38216', '0', '0', 'NA', 'NA', '19-10-2025', 'NotDump', 'NA'),
(281, 'NRP250', '250', 'NA', '6.06', '40895', '43463', '0', '0', 'NA', 'NA', '20-10-2025', 'NotDump', 'NA'),
(282, 'NRP251', '251', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '21-10-2025', 'NotDump', 'NA'),
(283, 'NRP252', '252', 'NA', '6.06', '1568', '4136', '0', '0', 'NA', 'NA', '22-10-2025', 'NotDump', 'NA'),
(284, 'NRP253', '253', 'NA', '6.06', '4636', '7204', '0', '0', 'NA', 'NA', '23-10-2025', 'NotDump', 'NA'),
(285, 'NRP254', '254', 'NA', '6.06', '0', '0', '0', '0', 'NA', 'NA', '24-10-2025', 'NotDump', 'NA'),
(286, 'NRP255', '255', 'NA', '6.06', '2568', '6420', '0', '0', 'NA', 'NA', '25-10-2025', 'NotDump', 'NA'),
(287, 'NRP256', '256', 'NA', '6.06', '912', '3480', '0', '0', 'NA', 'NA', '26-10-2025', 'NotDump', 'NA'),
(288, 'NRP257', '257', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '27-10-2025', 'NotDump', 'NA'),
(289, 'NRP258', '258', 'NA', '6.06', '0', '2568', '0', '0', 'NA', 'NA', '28-10-2025', 'NotDump', 'NA'),
(290, 'NRP259', '259', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '29-10-2025', 'NotDump', 'NA'),
(291, 'NRP260', '260', 'NA', '6.06', '2568', '5136', '0', '0', 'NA', 'NA', '30-10-2025', 'NotDump', 'NA'),
(292, 'NRP261', '261', 'NA', '6.06', '8880', '11448', '0', '0', 'NA', 'NA', '31-10-2025', 'NotDump', 'NA'),
(293, 'NRP262', '262', 'NA', '6.06', '0', '2568', '0', '0', 'NA', 'NA', '01-11-2025', 'NotDump', 'NA'),
(294, 'NRP263', '263', 'NA', '6.06', '1926', '4494', '0', '0', 'NA', 'NA', '02-11-2025', 'NotDump', 'NA'),
(295, 'NRP264', '264', 'NA', '6.06', '5136', '7704', '0', '0', 'NA', 'NA', '03-11-2025', 'NotDump', 'NA'),
(296, 'NRP265', '265', 'NA', '6.06', '0', '0', '0', '0', 'NA', 'NA', '04-11-2025', 'NotDump', 'NA'),
(297, 'NRP266', '266', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '05-11-2025', 'NotDump', 'NA'),
(298, 'NRP267', '267', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '06-11-2025', 'NotDump', 'NA'),
(299, 'NRP268', '268', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '07-11-2025', 'NotDump', 'NA'),
(300, 'NRP269', '269', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '08-11-2025', 'NotDump', 'NA'),
(301, 'NRP270', '270', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '09-11-2025', 'NotDump', 'NA'),
(302, 'NRP271', '271', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '10-11-2025', 'NotDump', 'NA'),
(303, 'NRP272', '272', 'NA', '0', '6704', '10556', '0', '0', 'NA', 'NA', '11-11-2025', 'NotDump', 'NA'),
(304, 'NRP273', '273', 'NA', '0', '4136', '6704', '0', '0', 'NA', 'NA', '12-11-2025', 'NotDump', 'NA'),
(305, 'NRP274', '274', 'NA', '0', '4717', '7285', '0', '0', 'NA', 'NA', '13-11-2025', 'NotDump', 'NA'),
(306, 'NRP275', '275', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '14-11-2025', 'NotDump', 'NA'),
(307, 'NRP276', '276', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '15-11-2025', 'NotDump', 'NA'),
(308, 'NRP277', '277', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '16-11-2025', 'NotDump', 'NA'),
(309, 'NRP278', '278', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '17-11-2025', 'NotDump', 'NA'),
(310, 'NRP279', '279', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '18-11-2025', 'NotDump', 'NA'),
(311, 'NRP280', '280', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '19-11-2025', 'NotDump', 'NA'),
(312, 'NRP281', '281', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '20-11-2025', 'NotDump', 'NA'),
(313, 'NRP282', '282', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '21-11-2025', 'NotDump', 'NA'),
(314, 'NRP283', '283', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '22-11-2025', 'NotDump', 'NA'),
(315, 'NRP284', '284', 'NA', '0', '9040', '11608', '0', '0', 'NA', 'NA', '23-11-2025', 'NotDump', 'NA'),
(316, 'NRP285', '285', 'NA', '0', '7704', '11556', '0', '0', 'NA', 'NA', '24-11-2025', 'NotDump', 'NA'),
(317, 'NRP286', '286', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '25-11-2025', 'NotDump', 'NA'),
(318, 'NRP287', '287', 'NA', '0', '1636', '4204', '0', '0', 'NA', 'NA', '26-11-2025', 'NotDump', 'NA'),
(319, 'NRP288', '288', 'NA', '0', '10781', '13349', '0', '0', 'NA', 'NA', '27-11-2025', 'NotDump', 'NA'),
(320, 'NRP289', '289', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '28-11-2025', 'NotDump', 'NA'),
(321, 'NRP290', '290', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '29-11-2025', 'NotDump', 'NA'),
(322, 'NRP291', '291', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '30-11-2025', 'NotDump', 'NA'),
(323, 'NRP292', '292', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '01-12-2025', 'NotDump', 'NA'),
(324, 'NRP293', '293', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '02-12-2025', 'NotDump', 'NA'),
(325, 'NRP294', '294', 'NA', '0', '4136', '6704', '0', '0', 'NA', 'NA', '03-12-2025', 'NotDump', 'NA'),
(326, 'NRP295', '295', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '04-12-2025', 'NotDump', 'NA'),
(327, 'NRP296', '296', 'NA', '0', '0', '2568', '0', '0', 'NA', 'NA', '05-12-2025', 'NotDump', 'NA'),
(328, 'NRP297', '297', 'NA', '0', '0', '2568', '0', '0', 'NA', 'NA', '06-12-2025', 'NotDump', 'NA'),
(329, 'NRP298', '298', 'NA', '0', '35648', '38216', '0', '0', 'NA', 'NA', '07-12-2025', 'NotDump', 'NA'),
(330, 'NRP299', '299', 'NA', '0', '40895', '43463', '0', '0', 'NA', 'NA', '08-12-2025', 'NotDump', 'NA'),
(331, 'NRP300', '300', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '09-12-2025', 'NotDump', 'NA'),
(332, 'NRP301', '301', 'NA', '0', '1568', '4136', '0', '0', 'NA', 'NA', '10-12-2025', 'NotDump', 'NA'),
(333, 'NRP302', '302', 'NA', '0', '4636', '7204', '0', '0', 'NA', 'NA', '11-12-2025', 'NotDump', 'NA'),
(334, 'NRP303', '303', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '12-12-2025', 'NotDump', 'NA'),
(335, 'NRP304', '304', 'NA', '0', '2568', '6420', '0', '0', 'NA', 'NA', '13-12-2025', 'NotDump', 'NA'),
(336, 'NRP305', '305', 'NA', '0', '912', '3480', '0', '0', 'NA', 'NA', '14-12-2025', 'NotDump', 'NA'),
(337, 'NRP306', '306', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '15-12-2025', 'NotDump', 'NA'),
(338, 'NRP307', '307', 'NA', '0', '0', '2568', '0', '0', 'NA', 'NA', '16-12-2025', 'NotDump', 'NA'),
(339, 'NRP308', '308', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '17-12-2025', 'NotDump', 'NA'),
(340, 'NRP309', '309', 'NA', '0', '2568', '5136', '0', '0', 'NA', 'NA', '18-12-2025', 'NotDump', 'NA'),
(341, 'NRP310', '310', 'NA', '0', '8880', '11448', '0', '0', 'NA', 'NA', '19-12-2025', 'NotDump', 'NA'),
(342, 'NRP311', '311', 'NA', '0', '0', '2568', '0', '0', 'NA', 'NA', '20-12-2025', 'NotDump', 'NA'),
(343, 'NRP312', '312', 'NA', '0', '1926', '4494', '0', '0', 'NA', 'NA', '21-12-2025', 'NotDump', 'NA'),
(344, 'NRP313', '313', 'NA', '0', '5136', '7704', '0', '0', 'NA', 'NA', '22-12-2025', 'NotDump', 'NA'),
(345, 'NRP314', '314', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '23-12-2025', 'NotDump', 'NA'),
(346, 'NRP315', '315', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '24-12-2025', 'NotDump', 'NA'),
(347, 'NRP316', '316', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '25-12-2025', 'NotDump', 'NA'),
(348, 'NRP317', '317', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '26-12-2025', 'NotDump', 'NA'),
(349, 'NRP318', '318', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '27-12-2025', 'NotDump', 'NA'),
(350, 'NRP319', '319', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '28-12-2025', 'NotDump', 'NA'),
(351, 'NRP320', '320', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '29-12-2025', 'NotDump', 'NA'),
(352, 'NRP321', '321', 'NA', '10.24', '4282', '9418', '0', '0', 'NA', 'NA', '30-12-2025', 'NotDump', 'NA'),
(353, 'NRP322', '322', 'NA', '10.24', '4282', '9418', '0', '0', 'NA', 'NA', '31-12-2025', 'NotDump', 'NA'),
(354, 'NRP323', '323', 'NA', '10.24', '92460', '97596', '0', '0', 'NA', 'NA', '01-01-2026', 'NotDump', 'NA'),
(355, 'NRP324', '324', 'NA', '10.24', '22839', '27975', '0', '0', 'NA', 'NA', '02-01-2026', 'NotDump', 'NA'),
(356, 'NRP325', '325', 'NA', '10.24', '52735', '57871', '0', '0', 'NA', 'NA', '03-01-2026', 'NotDump', 'NA'),
(357, 'NRP326', '326', 'NA', '10.24', '76860', '81996', '0', '0', 'NA', 'NA', '04-01-2026', 'NotDump', 'NA'),
(358, 'NRP327', '327', 'NA', '10.24', '0', '5136', '0', '0', 'NA', 'NA', '05-01-2026', 'NotDump', 'NA'),
(359, 'NRP328', '328', 'NA', '10.24', '7704', '12840', '0', '0', 'NA', 'NA', '06-01-2026', 'NotDump', 'NA'),
(360, 'NRP329', '329', 'NA', '10.24', '52735', '57871', '0', '0', 'NA', 'NA', '07-01-2026', 'NotDump', 'NA'),
(361, 'NRP330', '330', 'NA', '10.24', '1284', '6420', '0', '0', 'NA', 'NA', '08-01-2026', 'NotDump', 'NA'),
(362, 'NRP331', '331', 'NA', '10.24', '0', '5136', '0', '0', 'NA', 'NA', '09-01-2026', 'NotDump', 'NA'),
(363, 'NRP332', '332', 'NA', '10.24', '7704', '12840', '0', '0', 'NA', 'NA', '10-01-2026', 'NotDump', 'NA'),
(364, 'NRP333', '333', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '11-01-2026', 'NotDump', 'NA'),
(365, 'NRP334', '334', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '12-01-2026', 'NotDump', 'NA'),
(366, 'NRP335', '335', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '13-01-2026', 'NotDump', 'NA'),
(367, 'NRP336', '336', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '14-01-2026', 'NotDump', 'NA'),
(368, 'NRP337', '337', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '15-01-2026', 'NotDump', 'NA'),
(369, 'NRP338', '338', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '16-01-2026', 'NotDump', 'NA'),
(370, 'NRP339', '339', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '17-01-2026', 'NotDump', 'NA'),
(371, 'NRP340', '340', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '18-01-2026', 'NotDump', 'NA'),
(372, 'NRP341', '341', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '19-01-2026', 'NotDump', 'NA'),
(373, 'NRP342', '342', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '20-01-2026', 'NotDump', 'NA'),
(374, 'NRP343', '343', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '21-01-2026', 'NotDump', 'NA'),
(375, 'NRP344', '344', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '22-01-2026', 'NotDump', 'NA'),
(376, 'NRP345', '345', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '23-01-2026', 'NotDump', 'NA'),
(377, 'NRP346', '346', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '24-01-2026', 'NotDump', 'NA'),
(378, 'NRP347', '347', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '25-01-2026', 'NotDump', 'NA'),
(379, 'NRP348', '348', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '26-01-2026', 'NotDump', 'NA'),
(380, 'NRP349', '349', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '27-01-2026', 'NotDump', 'NA'),
(381, 'NRP350', '350', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '28-01-2026', 'NotDump', 'NA'),
(382, 'NRP351', '351', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '29-01-2026', 'NotDump', 'NA'),
(383, 'NRP352', '352', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '30-01-2026', 'NotDump', 'NA'),
(384, 'NRP353', '353', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '31-01-2026', 'NotDump', 'NA'),
(385, 'NRP354', '354', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '01-02-2026', 'NotDump', 'NA'),
(386, 'NRP355', '355', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '02-02-2026', 'NotDump', 'NA'),
(387, 'NRP356', '356', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '03-02-2026', 'NotDump', 'NA'),
(388, 'NRP357', '357', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '04-02-2026', 'NotDump', 'NA'),
(389, 'NRP358', '358', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '05-02-2026', 'NotDump', 'NA'),
(390, 'NRP359', '359', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '06-02-2026', 'NotDump', 'NA'),
(391, 'NRP360', '360', 'NA', '20.49', '17692', '32884', '0', '0', 'NA', 'NA', '07-02-2026', 'NotDump', 'NA'),
(392, 'NRP361', '361', 'NA', '20.49', '17692', '32884', '0', '0', 'NA', 'NA', '08-02-2026', 'NotDump', 'NA'),
(393, 'NRP362', '362', 'NA', '20.49', '49692', '64884', '0', '0', 'NA', 'NA', '09-02-2026', 'NotDump', 'NA'),
(394, 'NRP363', '363', 'NA', '20.49', '90692', '105884', '0', '0', 'NA', 'NA', '10-02-2026', 'NotDump', 'NA'),
(395, 'NRP364', '364', 'NA', '20.49', '1692', '16884', '0', '0', 'NA', 'NA', '11-02-2026', 'NotDump', 'NA'),
(396, 'NRP365', '365', 'NA', '20.49', '188692', '203884', '0', '0', 'NA', 'NA', '12-02-2026', 'NotDump', 'NA'),
(397, 'NRP366', '366', 'NA', '20.49', '74692', '89884', '0', '0', 'NA', 'NA', '13-02-2026', 'NotDump', 'NA'),
(398, 'NRP367', '367', 'NA', '20.49', '47692', '62884', '0', '0', 'NA', 'NA', '14-02-2026', 'NotDump', 'NA'),
(399, 'NRP368', '368', 'NA', '20.49', '78992', '94184', '0', '0', 'NA', 'NA', '15-02-2026', 'NotDump', 'NA'),
(400, 'NRP369', '369', 'NA', '20.49', '132692', '147884', '0', '0', 'NA', 'NA', '16-02-2026', 'NotDump', 'NA'),
(401, 'NRP370', '370', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '17-02-2026', 'NotDump', 'NA'),
(402, 'NRP371', '371', 'NA', '0', '23158', '27598', '0', '0', 'NA', 'NA', '18-02-2026', 'NotDump', 'NA'),
(403, 'NRP372', '372', 'NA', '0', '21032', '24046', '0', '0', 'NA', 'NA', '19-02-2026', 'NotDump', 'NA'),
(404, 'NRP373', '373', 'NA', '0', '7308', '10322', '0', '0', 'NA', 'NA', '20-02-2026', 'NotDump', 'NA'),
(405, 'NRP374', '374', 'NA', '0', '588', '3540', '0', '0', 'NA', 'NA', '21-02-2026', 'NotDump', 'NA'),
(406, 'NRP375', '375', 'NA', '0', '588', '3540', '0', '0', 'NA', 'NA', '22-02-2026', 'NotDump', 'NA'),
(407, 'NRP376', '376', 'NA', '0', '0', '2916', '0', '0', 'NA', 'NA', '23-02-2026', 'NotDump', 'NA'),
(408, 'NRP377', '377', 'NA', '0', '0', '4536', '0', '0', 'NA', 'NA', '24-02-2026', 'NotDump', 'NA'),
(409, 'NRP378', '378', 'NA', '0', '0', '4560', '0', '0', 'NA', 'NA', '25-02-2026', 'NotDump', 'NA'),
(410, 'NRP379', '379', 'NA', '0', '0', '4860', '0', '0', 'NA', 'NA', '26-02-2026', 'NotDump', 'NA'),
(411, 'NRP380', '380', 'NA', '0', '0', '4860', '0', '0', 'NA', 'NA', '27-02-2026', 'NotDump', 'NA'),
(412, 'NRP381', '381', 'NA', '0', '0', '4860', '0', '0', 'NA', 'NA', '28-02-2026', 'NotDump', 'NA'),
(413, 'NRP382', '382', 'NA', '0', '0', '4860', '0', '0', 'NA', 'NA', '01-03-2026', 'NotDump', 'NA'),
(414, 'NRP383', '383', 'NA', '0', '19764', '22680', '0', '0', 'NA', 'NA', '02-03-2026', 'NotDump', 'NA'),
(415, 'NRP384', '384', 'NA', '0', '0', '4860', '0', '0', 'NA', 'NA', '03-03-2026', 'NotDump', 'NA'),
(416, 'NRP385', '385', 'NA', '0', '37030', '41890', '0', '0', 'NA', 'NA', '04-03-2026', 'NotDump', 'NA'),
(417, 'NRP386', '386', 'NA', '0', '40514', '45374', '0', '0', 'NA', 'NA', '05-03-2026', 'NotDump', 'NA'),
(418, 'NRP387', '387', 'NA', '0', '0', '4860', '0', '0', 'NA', 'NA', '06-03-2026', 'NotDump', 'NA'),
(419, 'NRP388', '388', 'NA', '0', '0', '5472', '0', '0', 'NA', 'NA', '07-03-2026', 'NotDump', 'NA'),
(420, 'NRP389', '389', 'NA', '0', '25360', '30832', '0', '0', 'NA', 'NA', '08-03-2026', 'NotDump', 'NA'),
(421, 'NRP390', '390', 'NA', '0', '10416', '15888', '0', '0', 'NA', 'NA', '09-03-2026', 'NotDump', 'NA'),
(422, 'NRP391', '391', 'NA', '0', '9416', '14888', '0', '0', 'NA', 'NA', '10-03-2026', 'NotDump', 'NA'),
(423, 'NRP392', '392', 'NA', '0', '0', '5472', '0', '0', 'NA', 'NA', '11-03-2026', 'NotDump', 'NA'),
(424, 'NRP393', '393', 'NA', '0', '0', '5472', '0', '0', 'NA', 'NA', '12-03-2026', 'NotDump', 'NA'),
(425, 'NRP394', '394', 'NA', '0', '95278', '100750', '0', '0', 'NA', 'NA', '13-03-2026', 'NotDump', 'NA'),
(426, 'NRP395', '395', 'NA', '0', '49196', '54668', '0', '0', 'NA', 'NA', '14-03-2026', 'NotDump', 'NA'),
(427, 'NRP396', '396', 'NA', '15', '56796', '0', '0', '0', 'NA', 'NA', '15-03-2026', 'NotDump', 'NA'),
(428, 'NRP397', '397', 'NA', '15', '52054', '0', '0', '0', 'NA', 'NA', '16-03-2026', 'NotDump', 'NA'),
(429, 'NRP398', '398', 'NA', '15', '43442', '0', '0', '0', 'NA', 'NA', '17-03-2026', 'NotDump', 'NA'),
(430, 'NRP399', '399', 'NA', '15', '41790', '0', '0', '0', 'NA', 'NA', '18-03-2026', 'NotDump', 'NA'),
(431, 'NRP400', '400', 'NA', '15', '50118', '0', '0', '0', 'NA', 'NA', '19-03-2026', 'NotDump', 'NA'),
(432, 'NRP401', '401', 'NA', '15', '19172', '0', '0', '0', 'NA', 'NA', '20-03-2026', 'NotDump', 'NA'),
(433, 'NRP402', '402', 'NA', '15', '65118', '0', '0', '0', 'NA', 'NA', '21-03-2026', 'NotDump', 'NA'),
(434, 'NRP403', '403', 'NA', '15', '56495', '0', '0', '0', 'NA', 'NA', '22-03-2026', 'NotDump', 'NA'),
(435, 'NRP404', '404', 'NA', '15', '0', '0', '0', '0', 'NA', 'NA', '23-03-2026', 'NotDump', 'NA'),
(436, 'NRP405', '405', 'NA', '15', '88535', '0', '0', '0', 'NA', 'NA', '24-03-2026', 'NotDump', 'NA'),
(437, 'NRP406', '406', 'NA', '15', '88445', '0', '0', '0', 'NA', 'NA', '25-03-2026', 'NotDump', 'NA'),
(438, 'NRP407', '407', 'NA', '15', '88445', '0', '0', '0', 'NA', 'NA', '26-03-2026', 'NotDump', 'NA'),
(439, 'NRP408', '408', 'NA', '15', '65856', '0', '0', '0', 'NA', 'NA', '27-03-2026', 'NotDump', 'NA'),
(440, 'NRP409', '409', 'NA', '15', '67646', '0', '0', '0', 'NA', 'NA', '28-03-2026', 'NotDump', 'NA'),
(441, 'NRP410', '410', 'NA', '15', '51751', '0', '0', '0', 'NA', 'NA', '29-03-2026', 'NotDump', 'NA'),
(442, 'NRP411', '411', 'NA', '15', '51751', '0', '0', '0', 'NA', 'NA', '30-03-2026', 'NotDump', 'NA'),
(443, 'NRP412', '412', 'NA', '15', '52168', '0', '0', '0', 'NA', 'NA', '31-03-2026', 'NotDump', 'NA'),
(444, 'NRP413', '413', 'NA', '15', '0', '0', '0', '0', 'NA', 'NA', '01-04-2026', 'NotDump', 'NA'),
(445, 'NRP414', '414', 'NA', '15', '50660', '0', '0', '0', 'NA', 'NA', '02-04-2026', 'NotDump', 'NA'),
(446, 'NRP415', '415', 'NA', '15', '20845', '0', '0', '0', 'NA', 'NA', '03-04-2026', 'NotDump', 'NA'),
(447, 'NRP416', '416', 'NA', '15', '20845', '0', '0', '0', 'NA', 'NA', '04-04-2026', 'NotDump', 'NA'),
(448, 'NRP417', '417', 'NA', '15', '32133', '0', '0', '0', 'NA', 'NA', '05-04-2026', 'NotDump', 'NA'),
(449, 'NRP418', '418', 'NA', '15', '32133', '0', '0', '0', 'NA', 'NA', '06-04-2026', 'NotDump', 'NA'),
(450, 'NRP419', '419', 'NA', '15', '88345', '0', '0', '0', 'NA', 'NA', '07-04-2026', 'NotDump', 'NA'),
(451, 'NRP420', '420', 'NA', '15', '88345', '0', '0', '0', 'NA', 'NA', '08-04-2026', 'NotDump', 'NA'),
(452, 'NRP421', '421', 'NA', '15', '88345', '0', '0', '0', 'NA', 'NA', '09-04-2026', 'NotDump', 'NA'),
(453, 'NRP422', '422', 'NA', '18.58', '42980', '47036', '0', '34924', 'NA', 'NA', '10-04-2026', 'NotDump', 'NA'),
(454, 'NRP423', '423', 'NA', '15', '21780', '25836', '0', '17724', 'NA', 'NA', '11-04-2026', 'NotDump', 'NA'),
(455, 'NRP424', '424', 'NA', '15', '68380', '72436', '0', '69324', 'NA', 'NA', '12-04-2026', 'NotDump', 'NA'),
(456, 'NRP425', '425', 'NA', '21', '33584', '37640', '0', '39528', 'NA', 'NA', '13-04-2026', 'NotDump', 'NA'),
(457, 'NRP426', '426', 'NA', '15', '19860', '23916', '0', '5304', 'NA', 'NA', '14-04-2026', 'NotDump', 'NA'),
(458, 'NRP427', '427', 'NA', '21', '10230', '14286', '0', '21174', 'NA', 'NA', '15-04-2026', 'NotDump', 'NA'),
(459, 'NRP428', '428', 'NA', '21', '4056', '8112', '0', '2028', 'NA', 'NA', '16-04-2026', 'NotDump', 'NA'),
(460, 'NRP429', '429', 'NA', '19', '10340', '14396', '0', '21284', 'NA', 'NA', '17-04-2026', 'NotDump', 'NA'),
(461, 'NRP430', '430', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '18-04-2026', 'NotDump', 'NA'),
(462, 'NRP431', '431', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '19-04-2026', 'NotDump', 'NA'),
(463, 'NRP432', '432', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '20-04-2026', 'NotDump', 'NA'),
(464, 'NRP433', '433', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '21-04-2026', 'NotDump', 'NA'),
(465, 'NRP434', '434', 'NA', '0', '0', '0', '0', '0', 'NA', 'NA', '22-04-2026', 'NotDump', 'NA'),
(466, 'NPR0017', 'NPR0017_4_2025', '555', '56', '0', '31080', '0', '31080', '2025-04-02', '2025-04-15', NULL, 'NotDump', '7576506e-0500-43be-bbbc-690744febc83');

-- --------------------------------------------------------

--
-- Table structure for table `licensepaymenttable`
--

CREATE TABLE `licensepaymenttable` (
  `ID` int NOT NULL,
  `txnid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Gala` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `BillNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `productinfo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `payment_source` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `net_amount_debit` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `name_on_card` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `mode` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `hash` text COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `easepayid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `addedon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `AgentID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PaymentMode` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `cryptoid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `licenseregistration`
--

CREATE TABLE `licenseregistration` (
  `ID` int NOT NULL,
  `FullName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ContactNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `AadharNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PanNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Plot_No` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Location` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Address` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Locality` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Meter` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Gala` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `GalaType` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PermitID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PermitType` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Area` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Approvance` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `licenseregistration`
--

INSERT INTO `licenseregistration` (`ID`, `FullName`, `ContactNumber`, `AadharNumber`, `PanNumber`, `Plot_No`, `Location`, `Address`, `Locality`, `Meter`, `Gala`, `GalaType`, `PermitID`, `PermitType`, `Area`, `Approvance`) VALUES
(1, 'Shri Gauri Shankar Prasad, son of Jiut Ram, Aspatal Road, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Aspatal Road, Ballia', 'Balia', 'N/A', 'NPR0001', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(2, 'Md. Zafar Qasim, son of Moinuddin, Bishunipur, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Bishunipur, Ballia', 'Balia', 'N/A', 'NPR0002', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(3, 'Shri Shambhunath Yadav, son of Harihar Prasad Yadav, Village - Panchkhora, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Village - Panchkhora, Ballia', 'Balia', 'N/A', 'NPR0003', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(4, 'Shri Ainul Haq, son of Abdul Rahman, Village - Garhwar, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Village - Garhwar, Ballia', 'Balia', 'N/A', 'NPR0004', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(5, 'Shri Ajay Kumar Agrawal, son of Narayan Das Agrawal, Chowk, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Chowk, Ballia', 'Balia', 'N/A', 'NPR0005', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(6, 'Shri Vijay Kumar Agrawal, son of Narayan Das Agrawa', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Balia', 'N/A', 'NPR0006', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(7, 'Smt. Manju Rani Agrawal, wife of Jagdish Narayan Agrawal, Neelkamal Building, Gandhi Nagar, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Building, Gandhi Nagar, Ballia', 'Balia', 'N/A', 'NPR0007', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(8, 'Shri Vinod Agrawal, son of Madan Mohan Agrawal, Bansdih Road, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Bansdih Road, Ballia', 'Balia', 'N/A', 'NPR0008', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(9, 'Shri Vijendra Singh, son of Ram Ji Singh, Bishunipur, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Bishunipur, Ballia', 'Balia', 'N/A', 'NPR0009', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(10, 'Shri Abhay Shankar Singh, son of Sita Ram Singh, Basantpur, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Basantpur, Ballia', 'Balia', 'N/A', 'NPR0010', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(11, 'Shri Abhay Kumar Singh, son of Sita Ram Singh', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Balia', 'N/A', 'NPR0011', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(12, 'Shri Dharmraj Ram, son of Chhabila Ram, Village - Khodi Pakad, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Village - Khodi Pakad, Ballia', 'Balia', 'N/A', 'NPR0012', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Pending'),
(13, 'Shri Ram Ji Tiwari, Sampadak, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Sampadak, Ballia', 'Balia', 'N/A', 'NPR0013', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Approved'),
(14, 'Shri Ram Ji Tiwari, Sampadak, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Sampadak, Ballia', 'Balia', 'N/A', 'NPR0014', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Approved'),
(15, 'Shri Ram Ji Tiwari, Sampadak, Ballia', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'Sampadak, Ballia', 'Balia', 'N/A', 'NPR0015', 'Case/High Court', 'N/A', 'N/A', 'N/A', 'Approved'),
(16, 'Balliaqwerty', '9876543210', '2244555178', '3333333222', '121', ' ', 'dcsdc', '', '', 'NPR0016', '', '1', 'Restaurant', '56', 'Pending'),
(17, 'dfsgjjj', '9876532175', '22445556666', '53449', '3333', '18.5719866/73.7602771', 'dsfad', 'Ballia', '12-24', 'NPR0017', '', '1', 'Restaurant', '56', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `localityrates`
--

CREATE TABLE `localityrates` (
  `id` int NOT NULL,
  `locality` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `Ward` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Zone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `uniqueness` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `Meter` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `toproperty` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `RccRate` float NOT NULL,
  `OtherPakkaRate` float NOT NULL,
  `KacchaRate` float NOT NULL,
  `unq` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `localityrates`
--

INSERT INTO `localityrates` (`id`, `locality`, `Ward`, `Zone`, `uniqueness`, `Meter`, `toproperty`, `RccRate`, `OtherPakkaRate`, `KacchaRate`, `unq`) VALUES
(1, 'Ballia', 'amrtapaalee', 'Na', 'amrtapaalee /24-above', '24-above', '1', 6.65, 5.24, 2.62, 'amrtapaalee /24-above'),
(2, 'Ballia', 'amrtapaalee', 'Na', 'amrtapaalee /12-24', '12-24', '1', 4.37, 3.49, 1.75, 'amrtapaalee /12-24'),
(3, 'Ballia', 'amrtapaalee', 'Na', 'amrtapaalee /9-12', '9-12', '1', 2.91, 2.33, 1.16, 'amrtapaalee /9-12'),
(4, 'Ballia', 'amrtapaalee', 'Na', 'amrtapaalee /0-9', '0-9', '1', 2.18, 1.75, 0.87, 'amrtapaalee /0-9'),
(5, 'Ballia', 'oktenaganj', 'Na', 'oktenaganj /24-above', '24-above', '1', 13.97, 11.18, 5.59, 'oktenaganj /24-above'),
(6, 'Ballia', 'oktenaganj', 'Na', 'oktenaganj /12-24', '12-24', '1', 9.32, 7.45, 3.73, 'oktenaganj /12-24'),
(7, 'Ballia', 'oktenaganj', 'Na', 'oktenaganj /9-12', '9-12', '1', 6.21, 4.97, 2.48, 'oktenaganj /9-12'),
(8, 'Ballia', 'oktenaganj', 'Na', 'oktenaganj /0-9', '0-9', '1', 4.66, 3.73, 1.86, 'oktenaganj /0-9'),
(9, 'Ballia', 'aaryasamaaj road', 'Na', 'aaryasamaaj road /24-above', '24-above', '1', 14.31, 11.45, 5.72, 'aaryasamaaj road /24-above'),
(10, 'Ballia', 'aaryasamaaj road', 'Na', 'aaryasamaaj road /12-24', '12-24', '1', 9.45, 7.63, 3.82, 'aaryasamaaj road /12-24'),
(11, 'Ballia', 'aaryasamaaj road', 'Na', 'aaryasamaaj road /9-12', '9-12', '1', 6.36, 5.09, 2.54, 'aaryasamaaj road /9-12'),
(12, 'Ballia', 'aaryasamaaj road', 'Na', 'aaryasamaaj road /0-9', '0-9', '1', 4.77, 3.82, 1.91, 'aaryasamaaj road /0-9'),
(13, 'Ballia', 'kaajeepoora kasaav tola', 'Na', 'kaajeepoora kasaav tola /24-above', '24-above', '1', 12.29, 9.83, 4.91, 'kaajeepoora kasaav tola /24-above'),
(14, 'Ballia', 'kaajeepoora kasaav tola', 'Na', 'kaajeepoora kasaav tola /12-24', '12-24', '1', 8.19, 6.55, 3.28, 'kaajeepoora kasaav tola /12-24'),
(15, 'Ballia', 'kaajeepoora kasaav tola', 'Na', 'kaajeepoora kasaav tola /9-12', '9-12', '1', 5.46, 4.37, 2.18, 'kaajeepoora kasaav tola /9-12'),
(16, 'Ballia', 'kaajeepoora kasaav tola', 'Na', 'kaajeepoora kasaav tola /0-9', '0-9', '1', 4.1, 3.28, 1.64, 'kaajeepoora kasaav tola /0-9'),
(17, 'Ballia', 'kaasheepur', 'Na', 'kaasheepur /24-above', '24-above', '1', 4.12, 3.29, 1.65, 'kaasheepur /24-above'),
(18, 'Ballia', 'kaasheepur', 'Na', 'kaasheepur /12-24', '12-24', '1', 2.75, 2.2, 1.1, 'kaasheepur /12-24'),
(19, 'Ballia', 'kaasheepur', 'Na', 'kaasheepur /9-12', '9-12', '1', 1.83, 1.46, 0.73, 'kaasheepur /9-12'),
(20, 'Ballia', 'kaasheepur', 'Na', 'kaasheepur /0-9', '0-9', '1', 1.37, 1.1, 0.55, 'kaasheepur /0-9'),
(21, 'Ballia', 'kaasim baajaar', 'Na', 'kaasim baajaar /24-above', '24-above', '1', 14.04, 11.23, 5.62, 'kaasim baajaar /24-above'),
(22, 'Ballia', 'kaasim baajaar', 'Na', 'kaasim baajaar /12-24', '12-24', '1', 9.36, 7.49, 3.74, 'kaasim baajaar /12-24'),
(23, 'Ballia', 'kaasim baajaar', 'Na', 'kaasim baajaar /9-12', '9-12', '1', 6.24, 4.99, 2.5, 'kaasim baajaar /9-12'),
(24, 'Ballia', 'kaasim baajaar', 'Na', 'kaasim baajaar /0-9', '0-9', '1', 4.68, 3.74, 1.87, 'kaasim baajaar /0-9'),
(25, 'Ballia', 'gaandhee nagar', 'Na', 'gaandhee nagar /24-above', '24-above', '1', 10.26, 8.21, 4.1, 'gaandhee nagar /24-above'),
(26, 'Ballia', 'gaandhee nagar', 'Na', 'gaandhee nagar /12-24', '12-24', '1', 6.84, 5.47, 2.74, 'gaandhee nagar /12-24'),
(27, 'Ballia', 'gaandhee nagar', 'Na', 'gaandhee nagar /9-12', '9-12', '1', 4.56, 3.65, 1.82, 'gaandhee nagar /9-12'),
(28, 'Ballia', 'gaandhee nagar', 'Na', 'gaandhee nagar /0-9', '0-9', '1', 3.42, 2.74, 1.37, 'gaandhee nagar /0-9'),
(29, 'Ballia', 'gudaree baajaar', 'Na', 'gudaree baajaar /24-above', '24-above', '1', 14.31, 11.45, 5.72, 'gudaree baajaar /24-above'),
(30, 'Ballia', 'gudaree baajaar', 'Na', 'gudaree baajaar /12-24', '12-24', '1', 9.54, 7.63, 3.82, 'gudaree baajaar /12-24'),
(31, 'Ballia', 'gudaree baajaar', 'Na', 'gudaree baajaar /9-12', '9-12', '1', 6.36, 5.09, 2.54, 'gudaree baajaar /9-12'),
(32, 'Ballia', 'gudaree baajaar', 'Na', 'gudaree baajaar /0-9', '0-9', '1', 4.77, 3.82, 1.91, 'gudaree baajaar /0-9'),
(33, 'Ballia', 'chauk', 'Na', 'chauk /24-above', '24-above', '1', 15.42, 12.34, 6.17, 'chauk /24-above'),
(34, 'Ballia', 'chauk', 'Na', 'chauk /12-24', '12-24', '1', 10.28, 8.23, 4.11, 'chauk /12-24'),
(35, 'Ballia', 'chauk', 'Na', 'chauk /9-12', '9-12', '1', 6.86, 5.48, 2.74, 'chauk /9-12'),
(36, 'Ballia', 'chauk', 'Na', 'chauk /0-9', '0-9', '1', 5.14, 4.11, 2.06, 'chauk /0-9'),
(37, 'Ballia', 'chaman singh bag road', 'Na', 'chaman singh baag road /24-above', '24-above', '1', 14.38, 11.5, 5.75, 'chaman singh baag road /24-above'),
(38, 'Ballia', 'chaman singh bag road', 'Na', 'chaman singh baag road /12-24', '12-24', '1', 9.59, 7.67, 3.83, 'chaman singh baag road /12-24'),
(39, 'Ballia', 'chaman singh bag road', 'Na', 'chaman singh baag road /9-12', '9-12', '1', 6.39, 5.11, 2.56, 'chaman singh baag road /9-12'),
(40, 'Ballia', 'chaman singh bag road', 'Na', 'chaman singh baag road /0-9', '0-9', '1', 4.79, 3.83, 1.92, 'chaman singh baag road /0-9'),
(41, 'Ballia', 'jagdishpur', 'Na', 'jagdishpur /24-above', '24-above', '1', 13.03, 10.42, 5.21, 'jagadeeshapur /24-above'),
(42, 'Ballia', 'jagdishpur', 'Na', 'jagdishpur /12-24', '12-24', '1', 8.69, 6.95, 3.47, 'jagadeeshapur /12-24'),
(43, 'Ballia', 'jagdishpur', 'Na', 'jagdishpur /9-12', '9-12', '1', 5.79, 4.63, 2.32, 'jagadeeshapur /9-12'),
(44, 'Ballia', 'jagdishpur', 'Na', 'jagdishpur /0-9', '0-9', '1', 4.34, 3.47, 1.74, 'jagadeeshapur /0-9'),
(45, 'Ballia', 'japling Ganj', 'Na', 'japling Ganj /24-above', '24-above', '1', 12.96, 10.37, 5.18, 'jaapaleenaganj /24-above'),
(46, 'Ballia', 'japling Ganj', 'Na', 'japling Ganj /12-24', '12-24', '1', 8.64, 6.91, 3.46, 'jaapaleenaganj /12-24'),
(47, 'Ballia', 'japling Ganj', 'Na', 'japling Ganj /9-12', '9-12', '1', 5.76, 4.61, 2.3, 'jaapaleenaganj /9-12'),
(48, 'Ballia', 'japling Ganj', 'Na', 'japling Ganj /0-9', '0-9', '1', 4.32, 3.46, 1.73, 'jaapaleenaganj /0-9'),
(49, 'Ballia', 'jange Ali', 'Na', 'jange Ali /24-above', '24-above', '1', 13.03, 10.42, 5.21, 'jage Ali /24-above'),
(50, 'Ballia', 'jange Ali', 'Na', 'jange Ali /12-24', '12-24', '1', 8.69, 6.95, 3.47, 'jage Ali /12-24'),
(51, 'Ballia', 'jange Ali', 'Na', 'jange Ali /9-12', '9-12', '1', 5.79, 4.63, 2.32, 'jage Ali /9-12'),
(52, 'Ballia', 'jange Ali', 'Na', 'jange Ali /0-9', '0-9', '1', 4.34, 3.47, 1.74, 'jage Ali /0-9'),
(53, 'Ballia', 'nyooree taal ke bigahee', 'Na', 'nyooree taal ke bigahee /24-above', '24-above', '1', 7.83, 6.26, 3.13, 'nyooree taal ke bigahee /24-above'),
(54, 'Ballia', 'nyooree taal ke bigahee', 'Na', 'nyooree taal ke bigahee /12-24', '12-24', '1', 5.22, 4.18, 2.09, 'nyooree taal ke bigahee /12-24'),
(55, 'Ballia', 'nyooree taal ke bigahee', 'Na', 'nyooree taal ke bigahee /9-12', '9-12', '1', 3.48, 2.78, 1.39, 'nyooree taal ke bigahee /9-12'),
(56, 'Ballia', 'nyooree taal ke bigahee', 'Na', 'nyooree taal ke bigahee /0-9', '0-9', '1', 2.62, 2.09, 1.04, 'nyooree taal ke bigahee /0-9'),
(57, 'Ballia', 'bankata', 'Na', 'bankata /24-above', '24-above', '1', 9.18, 7.34, 3.67, 'banakata /24-above'),
(58, 'Ballia', 'bankata', 'Na', 'bankata/12-24', '12-24', '1', 6.12, 4.9, 2.45, 'banakata /12-24'),
(59, 'Ballia', 'bankata', 'Na', 'bankata /9-12', '9-12', '1', 4.08, 3.26, 1.63, 'banakata /9-12'),
(60, 'Ballia', 'bankata', 'Na', 'bankata /0-9', '0-9', '1', 3.06, 2.45, 1.22, 'banakata /0-9'),
(61, 'Ballia', 'vijayipur', 'Na', 'vijayipur /24-above', '24-above', '1', 4.12, 3.29, 1.65, 'vijayeepoor /24-above'),
(62, 'Ballia', 'vijayipur', 'Na', 'vijayipur /12-24', '12-24', '1', 2.75, 2.2, 1.1, 'vijayeepoor /12-24'),
(63, 'Ballia', 'vijayipur', 'Na', 'vijayipur /9-12', '9-12', '1', 1.83, 1.46, 0.73, 'vijayeepoor /9-12'),
(64, 'Ballia', 'vijayipur', 'Na', 'vijayipur /0-9', '0-9', '1', 1.37, 1.1, 0.55, 'vijayeepoor /0-9'),
(65, 'Ballia', 'vishwin pur', 'Na', 'vishwin pur /24-above', '24-above', '1', 15.39, 12.31, 6.16, 'vishshreenee pur /24-above'),
(66, 'Ballia', 'vishwin pur', 'Na', 'vishwin pur /12-24', '12-24', '1', 10.26, 8.21, 4.1, 'vishshreenee pur /12-24'),
(67, 'Ballia', 'vishwin pur', 'Na', 'vishwin pur /9-12', '9-12', '1', 6.84, 5.47, 2.74, 'vishshreenee pur /9-12'),
(68, 'Ballia', 'vishwin pur', 'Na', 'vishwin pur /0-9', '0-9', '1', 5.13, 4.1, 2.05, 'vishshreenee pur /0-9'),
(69, 'Ballia', 'bedua', 'Na', 'bedua /24-above', '24-above', '1', 9.11, 7.29, 3.65, 'bedua /24-above'),
(70, 'Ballia', 'bedua', 'Na', 'bedua /12-24', '12-24', '1', 6.08, 4.86, 2.43, 'bedua /12-24'),
(71, 'Ballia', 'bedua', 'Na', 'bedua /9-12', '9-12', '1', 4.05, 3.24, 1.62, 'bedua /9-12'),
(72, 'Ballia', 'bedua', 'Na', 'bedua /0-9', '0-9', '1', 3.04, 2.43, 1.22, 'bedua /0-9'),
(73, 'Ballia', 'yaarapur', 'Na', 'yaarapur /24-above', '24-above', '1', 5.74, 4.59, 2.3, 'yaarapur /24-above'),
(74, 'Ballia', 'yaarapur', 'Na', 'yaarapur /12-24', '12-24', '1', 3.83, 3.06, 1.53, 'yaarapur /12-24'),
(75, 'Ballia', 'yaarapur', 'Na', 'yaarapur /9-12', '9-12', '1', 2.55, 2.04, 1.02, 'yaarapur /9-12'),
(76, 'Ballia', 'yaarapur', 'Na', 'yaarapur /0-9', '0-9', '1', 1.91, 1.53, 0.77, 'yaarapur /0-9'),
(77, 'Ballia', 'rajendra nagar', 'Na', 'rajendra nagar/24-above', '24-above', '1', 14.04, 11.23, 5.62, 'raajendr nagar /24-above'),
(78, 'Ballia', 'rajendra nagar', 'Na', 'rajendra nagar/12-24', '12-24', '1', 9.36, 7.49, 3.74, 'raajendr nagar /12-24'),
(79, 'Ballia', 'rajendra nagar', 'Na', 'rajendra nagar /9-12', '9-12', '1', 6.24, 4.99, 2.5, 'raajendr nagar /9-12'),
(80, 'Ballia', 'rajendra nagar', 'Na', 'rajendra nagar/0-9', '0-9', '1', 4.68, 3.74, 1.87, 'raajendr nagar /0-9'),
(81, 'Ballia', 'rampur udaybhan', 'Na', 'rampur udaybhan/24-above', '24-above', '1', 10.26, 8.21, 4.1, 'raamapur udayabhaan /24-above'),
(82, 'Ballia', 'rampur udaybhan', 'Na', 'rampur udaybhan/12-24', '12-24', '1', 6.84, 5.47, 2.74, 'raamapur udayabhaan /12-24'),
(83, 'Ballia', 'rampur udaybhan', 'Na', 'rampur udaybhan /9-12', '9-12', '1', 4.56, 3.65, 1.82, 'raamapur udayabhaan /9-12'),
(84, 'Ballia', 'rampur udaybhan', 'Na', 'rampur udaybhan /0-9', '0-9', '1', 3.42, 2.74, 1.37, 'raamapur udayabhaan /0-9'),
(85, 'Ballia', 'lohaapattee', 'Na', 'lohaapattee /24-above', '24-above', '1', 13.3, 10.64, 5.32, 'lohaapattee /24-above'),
(86, 'Ballia', 'lohaapattee', 'Na', 'lohaapattee /12-24', '12-24', '1', 8.87, 7.09, 3.55, 'lohaapattee /12-24'),
(87, 'Ballia', 'lohaapattee', 'Na', 'lohaapattee /9-12', '9-12', '1', 5.91, 4.73, 2.36, 'lohaapattee /9-12'),
(88, 'Ballia', 'lohaapattee', 'Na', 'lohaapattee /0-9', '0-9', '1', 4.43, 3.55, 1.77, 'lohaapattee /0-9'),
(89, 'Ballia', 'shastri nagar', 'Na', 'shastri nagar /24-above', '24-above', '1', 9.59, 7.67, 3.83, 'shaastree nagar /24-above'),
(90, 'Ballia', 'shastri nagar', 'Na', 'shastri nagar  /12-24', '12-24', '1', 6.39, 5.11, 2.56, 'shaastree nagar  /12-24'),
(91, 'Ballia', 'shastri nagar', 'Na', 'shastri nagar /9-12', '9-12', '1', 4.26, 3.41, 1.7, 'shaastree nagar /9-12'),
(92, 'Ballia', 'shastri nagar', 'Na', 'shastri nagar /0-9', '0-9', '1', 3.2, 2.56, 1.28, 'shaastree nagar /0-9'),
(93, 'Ballia', 'gudaree baajaa', 'Na', 'gudaree baajaar /24-above', '24-above', '1', 9.59, 7.67, 3.83, 'gudaree baajaar /24-above'),
(94, 'Ballia', 'gudaree baajaa', 'Na', 'gudaree baajaar /12-24', '12-24', '1', 6.39, 5.11, 2.56, 'gudaree baajaar /12-24'),
(95, 'Ballia', 'gudaree baajaa', 'Na', 'gudaree baajaar /9-12', '9-12', '1', 4.26, 3.41, 1.7, 'gudaree baajaar /9-12'),
(96, 'Ballia', 'gudaree baajaa', 'Na', 'gudaree baajaar /0-9', '0-9', '1', 3.2, 2.56, 1.28, 'gudaree baajaar /0-9'),
(97, 'Ballia', 'satni sarai', 'Na', 'satni sarai /24-above', '24-above', '1', 9.59, 7.67, 3.83, 'chauk /24-above'),
(98, 'Ballia', 'satni sarai', 'Na', 'satni sarai /12-24', '12-24', '1', 6.39, 5.11, 2.56, 'chauk /12-24'),
(99, 'Ballia', 'satni sarai', 'Na', 'satni sarai /9-12', '9-12', '1', 4.26, 3.41, 1.7, 'chauk /9-12'),
(100, 'Ballia', 'satni sarai', 'Na', 'satni sarai /0-9', '0-9', '1', 3.2, 2.56, 1.28, 'chauk /0-9'),
(101, 'Ballia', 'harpur', 'Na', 'harpur /24-above', '24-above', '1', 7.56, 6.05, 3.02, 'kaasim baajaar /24-above'),
(102, 'Ballia', 'harpur', 'Na', 'harpur /12-24', '12-24', '1', 5.04, 4.03, 2.02, 'kaasim baajaar /12-24'),
(103, 'Ballia', 'harpur', 'Na', 'harpur /9-12', '9-12', '1', 3.36, 2.69, 1.34, 'kaasim baajaar /9-12'),
(104, 'Ballia', 'harpur', 'Na', 'harpur /0-9', '0-9', '1', 2.52, 2.02, 1.01, 'kaasim baajaar /0-9'),
(105, 'Ballia', 'gaandhee nagar', 'Na', 'gaandhee nagar /24-above', '24-above', '1', 9.59, 7.67, 3.83, 'gaandhee nagar /24-above'),
(106, 'Ballia', 'gaandhee nagar', 'Na', 'gaandhee nagar /12-24', '12-24', '1', 6.39, 5.11, 2.56, 'gaandhee nagar /12-24'),
(107, 'Ballia', 'gaandhee nagar', 'Na', 'gaandhee nagar /9-12', '9-12', '1', 4.26, 3.41, 1.7, 'gaandhee nagar /9-12'),
(108, 'Ballia', 'gaandhee nagar', 'Na', 'gaandhee nagar /0-9', '0-9', '1', 3.2, 2.56, 1.28, 'gaandhee nagar /0-9'),
(109, 'Ballia', 'subhaash nagar', 'Na', 'subhaash nagar /24-above', '24-above', '1', 9.59, 7.67, 3.83, 'subhaash nagar /24-above'),
(110, 'Ballia', 'subhaash nagar', 'Na', 'subhaash nagar /12-24', '12-24', '1', 6.39, 5.11, 2.56, 'subhaash nagar /12-24'),
(111, 'Ballia', 'subhaash nagar', 'Na', 'subhaash nagar /9-12', '9-12', '1', 4.26, 3.41, 1.7, 'subhaash nagar /9-12'),
(112, 'Ballia', 'subhaash nagar', 'Na', 'subhaash nagar /0-9', '0-9', '1', 3.2, 2.56, 1.28, 'subhaash nagar /0-9');

-- --------------------------------------------------------

--
-- Table structure for table `login_user`
--

CREATE TABLE `login_user` (
  `id` int NOT NULL,
  `phone` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `otp` varchar(11) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_user`
--

INSERT INTO `login_user` (`id`, `phone`, `otp`) VALUES
(138, '8975708608', '487516'),
(139, '9876543210', '301946'),
(140, '301946', '172214'),
(141, '9307040177', '500742'),
(142, '9876543343', '211298'),
(143, '9876543210', '143240'),
(144, '9876543343', '696947'),
(145, '696947', '995706'),
(146, '9307040177', '924492'),
(147, '9876543343', '468985'),
(148, '9876543210', '697181'),
(149, '7744332219', '624713'),
(150, '7744332219', '528132'),
(151, '9876543210', '809689'),
(152, '9307040177', '839470'),
(153, '9307040177', '264962'),
(154, '9307040177', '718976'),
(155, '9307040177', '683411'),
(156, '7744332219', '223038'),
(157, '9307040177', '710416'),
(158, '9307040177', '543038'),
(159, '7744332219', '946102'),
(160, '9876543343', '834459'),
(161, '9555495916', '747383'),
(162, '9555495916', '702694'),
(163, '9555495916', '467441'),
(164, '9096330523', '397762'),
(165, '7744332219', '119628'),
(166, '9876543210', '338910'),
(167, '9579305356', '768627'),
(168, '9918299079', '514548'),
(169, '9876543210', '314185'),
(170, '9918299079', '884289');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `Menu_ID` int NOT NULL,
  `Menu_Name` varchar(110) COLLATE utf8mb4_general_ci NOT NULL,
  `Access_Role` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Summenuid` int DEFAULT '0',
  `Link` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '/AdminDashboard',
  `icons` varchar(100) COLLATE utf8mb4_general_ci DEFAULT 'fa fa-tachometer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`Menu_ID`, `Menu_Name`, `Access_Role`, `Summenuid`, `Link`, `icons`) VALUES
(1, 'Dashboard', '[84, 85, 86, 87, 88, 89]', 0, '/Admin', 'fa-solid fa-display'),
(2, 'Create Bill', '[84, 86, 88, 89]', 3, '/Admin/BillManagement/CreateCustomerBill', 'fa fa-tachometer'),
(3, 'Bill Management', '[84, 87, 88, 89]', 0, '#', 'fa-solid fa-landmark'),
(4, 'Create Customer', '[84, 89]', 19, '/Admin/Customer/CreateCustomer', 'fa fa-tachometer'),
(5, 'Get Customer', '[84]', 19, '/Admin/Customer/GetCustomer', 'fa fa-tachometer'),
(6, 'Update Bill', '[84, 86, 88, 89]', 3, '/Admin/BillManagement/UpdateBill', 'fa fa-tachometer'),
(7, 'Master', '[84, 87]', 0, '#', 'fa fa-tachometer'),
(8, 'Locality Rates', '[84]', 7, '/Admin/Master/LocalityRates', 'fa fa-tachometer'),
(9, 'Customer Documents', '[84]', 7, '/Admin/Master/CustomerDocumentsType', 'fa fa-tachometer'),
(10, 'Locality Types', '[]', 7, '/Admin/Master/LocalityTypes', 'fa fa-tachometer'),
(11, 'Tax Type', '[84]', 7, '/Admin/Master/TaxType', 'fa fa-tachometer'),
(12, 'Property Types', '[84]', 7, '/Admin/Master/PropertyTypes', 'fa fa-tachometer'),
(13, 'Employee Management', '[84, 87]', 0, '#', 'fa-solid fa-users-gear'),
(14, 'Send Payment Link', '[84, 86, 88, 89]', 3, '/Admin/BillManagement/PaymentBill', 'fa fa-google-wallet'),
(15, 'Create Employee', '[84]', 13, '/Admin/EmployeeManagement/CreateEmployee', 'fa fa-tachometer'),
(16, 'create role', '[84]', 13, '/Admin/EmployeeManagement/CreateRole', 'fa fa-tachometer'),
(17, 'Edit Role', '[84]', 13, '/Admin/EmployeeManagement/EditRole', 'fa fa-tachometer'),
(18, 'View Employee', '[84]', 13, '/Admin/EmployeeManagement/ViewEmployee', 'fa fa-tachometer'),
(19, 'Customer Management', '[84, 86, 87, 89]', 0, '#', 'fa-solid fa-user'),
(20, 'GIS Mapping', '[84, 87, 89]', 0, '/Admin/GisMapping', 'fa-solid fa-map-location-dot'),
(21, 'Customer List', '[84, 86]', 19, '/Admin/Customer/CustomerList', 'fa fa-tachometer'),
(22, 'Types Of Permit', '[84]', 7, '/Admin/Master/TypesOfPermit', 'fa fa-tachometer'),
(202, 'Update Customer', '[84]', 19, '/Admin/Customer/CustomerUpdate', 'fa fa-tachometer'),
(203, 'Bulk Bill Generation', '[84, 88]', 3, '/Admin/BillManagement/BulkBillCreation', 'fa fa-tachometer'),
(204, 'Get Bulk Bill', '[84, 88, 89]', 3, '/Admin/BillManagement/GetBulkBill', 'fa fa-tachometer'),
(205, 'Create Permit Bill', '[84, 86]', 207, '/Admin/ChalanManagement/CreatePermitBill', 'fa fa-tachometer'),
(207, 'Chalan Management', '[]', 0, '#', 'fa-solid fa-receipt'),
(208, 'Agent Management', '[84, 87]', 0, '#', 'fa-solid fa-user-tie'),
(209, 'Create Agent', '[84]', 208, '/Admin/AgentManagement/CreateAgent', 'fa fa-tachometer'),
(210, 'Update Agent', '[84]', 208, '/Admin/AgentManagement/UpdateAgent', 'fa fa-tachometer'),
(211, 'Payment Collection', '[84, 87]', 0, '/Admin/PaymentCollection', 'fa-solid fa-money-bill'),
(212, 'License Management', '[84, 87]', 0, '#', 'fa-regular fa-file'),
(213, 'License Registration', '[84]', 212, '/Admin/LicenseManagement/LicenseRegistration', 'fa fa-tachometer'),
(214, 'Discount', '[84]', 7, '/Admin/Master/Discount', 'fa fa-tachometer'),
(215, 'Reports', '[84, 87]', 0, '#', 'fa-solid fa-file-lines'),
(216, 'Customer Report', '[84]', 215, '/Admin/Report/CustomerReport', 'fa fa-tachometer'),
(217, 'Transaction Report', '[84]', 215, '/Admin/Report/TransactionReports', 'fa fa-tachometer'),
(218, 'Agent List', '[84]', 208, '/Admin/AgentManagement/AgentList', 'fa fa-tachometer'),
(219, 'Notice of Demand', '[84]', 215, '/Admin/Report/NoticeofdemandReports', 'fa fa-tachometer'),
(220, 'Create License Bill', '[84]', 212, '/Admin/LicenseManagement/CreateBill', 'fa fa-tachometer'),
(227, 'License Details', '[84]', 212, '/Admin/LicenseManagement/GetLicenseDetails', 'fa fa-tachometer'),
(228, 'License Bills', '[84]', 212, '/Admin/LicenseManagement/GetLicenseBills', 'fa fa-tachometer');

-- --------------------------------------------------------

--
-- Table structure for table `meter`
--

CREATE TABLE `meter` (
  `id` int NOT NULL,
  `Meter` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meter`
--

INSERT INTO `meter` (`id`, `Meter`) VALUES
(1, '0-9'),
(2, '09-12'),
(3, '12-24'),
(4, '24-above');

-- --------------------------------------------------------

--
-- Table structure for table `paymenttable`
--

CREATE TABLE `paymenttable` (
  `ID` int NOT NULL,
  `txnid` varchar(100) DEFAULT NULL,
  `CustomerID` varchar(100) NOT NULL,
  `BillNumber` varchar(100) NOT NULL,
  `status` varchar(100) DEFAULT NULL,
  `productinfo` varchar(100) DEFAULT NULL,
  `payment_source` varchar(100) DEFAULT NULL,
  `net_amount_debit` varchar(100) DEFAULT NULL,
  `DiscountedAmount` float NOT NULL DEFAULT '0',
  `name_on_card` varchar(100) DEFAULT NULL,
  `mode` varchar(100) DEFAULT NULL,
  `hash` text,
  `firstname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `easepayid` varchar(100) DEFAULT NULL,
  `addedon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cryptoid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paymenttable`
--

INSERT INTO `paymenttable` (`ID`, `txnid`, `CustomerID`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`, `DiscountedAmount`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`, `addedon`, `cryptoid`) VALUES
(1, NULL, '1732511542', '1732511542_9_2023', NULL, NULL, NULL, NULL, 100, NULL, NULL, NULL, NULL, NULL, NULL, '2024-11-27 07:15:21', '9979c0e6-1323-4481-856b-b39e821e9900'),
(2, '1732691974830', '1732511542', '1732511542_9_2023', 'userCancelled', '1732511542', 'Easebuzz', '100.0', 100, 'NA', 'NA', '88b212ca45c1b787b685e71b1ff9f06db8cba9fdc66c680a5f3d87efd8a836d504d2cf74df8571c6c17fa1adadd39ca8661121864765926cb4640d3baf4df883', '1732511542_9_2023', 'abc@gmail.com', 'S241127073WDFM', '2024-11-27 07:20:02', '06405b56-5696-47fc-a129-e801c2344769'),
(3, '1732692053527', '1732511542', '1732511542_9_2023', 'success', '1732511542', 'Easebuzz', '198.0', 198, 'NA', 'NB', 'a5df72895e5aa041f514d961d460bd6d5874e46bf1d337bd53cd7d8cacf7a583c95e2557fd6845db241dc1d0b4965c298cd3239aaeda0d094752285b397af7a5', '1732511542_9_2023', 'prachisharma0485@gmail.com', 'S241127073WDFQ', '2024-11-27 07:21:18', '1aa4e1d2-98cc-4ca3-b73b-e6b2f8412e90'),
(4, '1732694852299', '1732689150', '1732689150_9_2024', 'success', '1732689150', 'Easebuzz', '198.0', 198, 'NA', 'NB', '855631aaf2384d96997905f5883e0f7ec9a1e2b41511e5708b27012b1f3c7154495435282da6d8f97dd2833d7af359e7a4bd58fb12dd289fe985e16e1b9f79f9', '1732689150_9_2024', 'prachisharma0485@gmail.com', 'S241127073WDIB', '2024-11-27 08:07:46', '7d3919e2-358e-4273-999d-26bc8bb19f73'),
(5, '1732795224571', '1732794816', '1732794816_9_2024', 'success', '1732794816', 'Easebuzz', '217.0', 217, 'NA', 'NB', 'e005d8ff16f515eb6b32bce9f2a0ce0e689553ebfbccc4c8510951f8b1e1a298ff17f91cacfc5a908c0a4084421524e00b59b4dd14fdf414236bda5dacb1e96e', '1732794816_9_2024', 'prachisharma0485@gmail.com', 'S241128073WF6P', '2024-11-28 12:00:51', '59285300-078f-45f7-83c7-356eebb88890'),
(6, '1732797548325', '1732794816', '1732794816_10_2024', 'success', '1732794816', 'Easebuzz', '198.0', 198, 'NA', 'NB', '7aa4ca3f9ac2d8fc503a2cb6950d36f8d951b3b113df3d5a5b09d03007221d8a1bb5b29c97f65d87ff81f96dfaf5097e9bf7ae6b3d9438cfce72fc9f4cc118b7', '1732794816_10_2024', 'prachisharma0485@gmail.com', 'S241128073WF9E', '2024-11-28 12:42:08', 'd78e733f-da1f-4e09-a98d-74de9cb9d61c'),
(7, '1742456498297', '1742453676', '1742453676_1_2025', 'success', '1742453676', 'Easebuzz', '11066.0', 11066, 'NA', 'NB', '7d0533292626b8550e042d768972050fa743baf23ed4edd61e29d32eeb9bcce8af4d869bb78b45fe0c51bb2266341cad6f9a1f4040485f37eaaf0d87ca9c5fac', '1742453676_1_2025', 'ajinkya123@gmail.com', 'S2503200742F89', '2025-03-20 07:41:54', '9ddcab1c-2783-423e-bd9e-15798bc86bf8'),
(8, NULL, '1742453676', '1742453676_4_2024', NULL, NULL, NULL, NULL, 455, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-27 11:57:53', 'cf660635-aafc-4272-8f60-988309d01cd7'),
(9, NULL, '1742453676', '1742453676_4_2024', NULL, NULL, NULL, NULL, 455, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-27 11:58:06', '33de0983-cb23-4288-b2e6-e4eb8695e22f'),
(10, '1743076874847', '1742453676', '1742453676_4_2024', 'userCancelled', '1742453676', 'Easebuzz', '455.0', 455, 'NA', 'NA', 'eb74201cf0bbef1cafadfaa99e81cfd2d5fb46118b0ad910d02ebd0cb81d7776f5fbccd68e7cbd07761bad5fa69298d8174be0fdd44f265ba2f6c8973bdde160', '1742453676_4_2024', 'test@gmail.com', 'E2503270EC14ME', '2025-03-27 12:02:48', '86b6fddf-1439-4427-90af-3520e7bbaa9e'),
(11, NULL, '1742453676', '1742453676_4_2024', 'userCancelled', NULL, NULL, NULL, 455, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-27 12:03:19', 'dbc16ca8-f378-4aa9-bc1d-fec1b72cbd49'),
(12, NULL, '1742453676', '1742453676_4_2024', 'userCancelled', NULL, NULL, NULL, 455, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-27 12:03:45', '6940d2ed-b1d9-4b70-9553-e4a221f44444'),
(13, '1744445903423', '0958101005000001R', '0958101005000001R_1_2025', 'userCancelled', '0958101005000001R', 'Easebuzz', '10.0', 10, 'NA', 'NA', '2b254d45136425519d2e6c6b8f3918f5072b52f6a4b8b0cdf61090604e1451d3ab7fb80cc4c66201ae6ec88b4ff3f12843451677d2683351a24bcbe172fd72d7', '0958101005000001R_1_2025', 's@gmail.com', 'E2504120EUC5WD', '2025-04-12 08:18:33', 'befec7f1-5fbc-4a09-846a-6098322eb2fe'),
(14, '1744635750551', '0958101005000011R', '0958101005000011R_1_2024', 'dropped', '0958101005000011R', 'Easebuzz', '383.0', 383, 'NA', 'UPI', 'ade50e83db07324fa1391b3218cd5b2ba4486b422a3d81cdebe2b6b70e4490dfc5cf299ecaffc5ce4730926a0debaa6e257b1b97ff35e040628693fb66f12f50', '0958101005000011R_1_2024', 'Ajinkya@gmail.com', 'E2504140EWRPGH', '2025-04-14 13:03:00', '00225d87-0f03-4557-8ff0-3dabf32868fd'),
(16, NULL, '0958101005000011R', '0958101005000011R_1_2024', 'userCancelled', NULL, NULL, NULL, 383, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-14 13:04:15', '4533dd6f-aabd-426f-857e-95c964576501'),
(17, NULL, '0958101005000011R', '0958101005000011R_1_2024', 'userCancelled', NULL, NULL, NULL, 383, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-14 13:08:01', '5cfd72b7-dc39-4acb-982a-f984b0809dd2'),
(18, NULL, '0958101005000011R', '0958101005000011R_1_2024', NULL, NULL, NULL, NULL, 383, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-14 13:24:13', 'e7daf022-7197-48a3-b000-be0e75a850c4'),
(19, '1744695468501Cash', '0958101005000025R', '0958101005000025R_4_2025', 'success', '0958101005000025R', 'Cash', '189', 0, '189', 'test', 'Cash', 'Cash', 'Admin', 'Nitesh@gmail.com', '2025-04-15 05:37:48', 'Cash'),
(20, NULL, '0958101005000010R', '0958101005000010R_4_2025', NULL, NULL, NULL, NULL, 20, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-15 06:40:37', '3350187c-ca35-4a47-b795-b10bc9344d82'),
(21, NULL, '0958101005000010R', '0958101005000010R_4_2025', NULL, NULL, NULL, NULL, 20, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-15 06:41:34', 'b05557b1-c9f4-46e0-842e-d375a1ca0cba'),
(22, NULL, '0958101005000010R', '0958101005000010R_4_2025', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-15 06:42:21', 'ef8a8712-06a1-4d6e-8ede-f3b984bec1e8'),
(23, '1744699519184', '0958101005000010R', '0958101005000010R_4_2025', 'success', '0958101005000010R', 'Easebuzz', '65.0', 65, 'NA', 'NB', 'be5317cc2b70d938cbdf66f363359f51b4fd925ab45fed146b935551e4176fd5df9ba1b6726d2ca4629262cccd5653530ffce3eb83c74c93e0438017614e9a59', '0958101005000010R_4_2025', 'test@gmail.com', 'S2504150743P4R', '2025-04-15 06:45:36', 'd85c8157-05c3-4b90-b43a-42353e635b64');

-- --------------------------------------------------------

--
-- Table structure for table `permitbills`
--

CREATE TABLE `permitbills` (
  `ID` int NOT NULL,
  `BillNumber` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `FullName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ContactNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `AadharNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PanNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Location` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Address` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Locality` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Meter` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Gala` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PermitID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PermitType` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Rate` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `TotalAmount` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PaidAmount` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Remaining` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `FromDate` date NOT NULL,
  `ToDate` date NOT NULL,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cryptoid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permitbills`
--

INSERT INTO `permitbills` (`ID`, `BillNumber`, `FullName`, `ContactNumber`, `AadharNumber`, `PanNumber`, `Location`, `Address`, `Locality`, `Meter`, `Gala`, `PermitID`, `PermitType`, `Rate`, `TotalAmount`, `PaidAmount`, `Remaining`, `FromDate`, `ToDate`, `Date`, `cryptoid`) VALUES
(1, '1730893484680', 'test', '9893919929', '921828182818', 'HBRU5781A', '18.6161/73.7286', 'Mirzapur', 'BHAWAPUR/WARD-26/ZONE-1/0-12', '0-12', '1718694497911', '1', 'Restaurant', '4000', '4000', '0', '4000', '2024-11-01', '2024-11-30', '2024-11-06 11:44:44', '65b1ae23-b593-4804-8766-760716ebc18a'),
(2, '1739272318053', 'test person1', '9764994321', '123412342343', '56789FR3', '18.6161/73.7286', 'oiuyt', 'KHUSRU BAGH/WARD-36/ZONE-1/0-12', '0-12', '1737357081967', '1', 'Restaurant', '555', '555', '0', '555', '2025-01-11', '2025-02-11', '2025-02-11 16:41:58', 'ddc60ac2-6d18-4883-851d-4305857278c5'),
(3, '1739272969520', 'test person1', '9764994321', '123412342343', '56789FR3', '18.6161/73.7286', 'oiuyt', 'KHUSRU BAGH/WARD-36/ZONE-1/0-12', '0-12', '1737357081967', '1', 'Restaurant', '555', '555', '0', '555', '2025-01-11', '2025-02-11', '2025-02-11 16:52:49', '523b84e4-4865-4520-a27f-829e373d970f'),
(4, '1739274613534', 'test person1', '9764994321', '123412342343', '56789FR3', '18.6161/73.7286', 'oiuyt', 'KHUSRU BAGH/WARD-36/ZONE-1/0-12', '0-12', '1737357081967', '1', 'Restaurant', '555', '555', '0', '555', '2025-01-11', '2025-02-11', '2025-02-11 17:20:13', '6bb1c31f-58a2-44f8-b8a8-405ff8f874e7'),
(5, '1739274963141', 'Balia 1', '9764994321', '123412342343', '56239FR3', '18.6161/73.7286', 'sdyu', ' Marudih/Ward No. 39 Malak Harhar/ZONE-7/0-12', '0-12', '1737357081967', '1', 'Restaurant', '55', '55', '0', '55', '2025-01-11', '2025-02-11', '2025-02-11 17:26:03', 'd74a567a-072a-4a65-8074-043985e70fbd');

-- --------------------------------------------------------

--
-- Table structure for table `permitdocs`
--

CREATE TABLE `permitdocs` (
  `ID` int NOT NULL,
  `Permitid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PermitTypes` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `BillNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `FullName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `DocumentName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permitdocs`
--

INSERT INTO `permitdocs` (`ID`, `Permitid`, `PermitTypes`, `BillNumber`, `FullName`, `DocumentName`) VALUES
(1, '1', 'Restaurant', '1730893484680', 'test', '17308934810411711540809332aadhar.jpeg'),
(2, '1', 'Restaurant', '1730893484680', 'test', '173089348147217186203008911-1214-aadhar.jpeg-1711014900455aadhar.jpeg'),
(3, '1', 'Restaurant', '1730893484680', 'test', '173089348185217186203008911-1658-pancard.jpg-1713001135803pancard.jpg'),
(4, '1', 'Restaurant', '1730893484680', 'test', '173089348265917130024807561Ganesh-14.jpg'),
(5, '1', 'Restaurant', '1739274963141', 'Balia 1', '1739274963130Capture.PNG'),
(6, '1', 'Restaurant', '1739274963141', 'Balia 1', '1739274963133Capture9.PNG'),
(7, '1', 'Restaurant', '1739274963141', 'Balia 1', '1739274963135Capture.PNG'),
(8, '1', 'Restaurant', '1739274963141', 'Balia 1', '1739274963139Capture9.PNG');

-- --------------------------------------------------------

--
-- Table structure for table `permitpaymenttable`
--

CREATE TABLE `permitpaymenttable` (
  `ID` int NOT NULL,
  `txnid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `CustomerID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `BillNumber` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `productinfo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `payment_source` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `net_amount_debit` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `name_on_card` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `mode` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `hash` text COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `easepayid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `addedon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `AgentID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `PaymentMode` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `cryptoid` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `RoleID` int NOT NULL,
  `Designation` varchar(400) COLLATE utf8mb4_general_ci NOT NULL,
  `Department_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleID`, `Designation`, `Department_ID`) VALUES
(84, 'Administrator', 0),
(85, 'Clerk', 0),
(86, 'Agent', 0),
(87, 'Tester', 0),
(88, 'Tax Collector Management', 0),
(89, 'Officer', 0);

-- --------------------------------------------------------

--
-- Table structure for table `systemcontrol`
--

CREATE TABLE `systemcontrol` (
  `id` int NOT NULL,
  `SystemID` int NOT NULL,
  `SystemEncryption` varchar(110) COLLATE utf8mb4_general_ci NOT NULL,
  `Passkey` varchar(110) COLLATE utf8mb4_general_ci NOT NULL,
  `PublicKey` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `systemcontrol`
--

INSERT INTO `systemcontrol` (`id`, `SystemID`, `SystemEncryption`, `Passkey`, `PublicKey`) VALUES
(1, 3000, 'SystemAppliactionOKay', '#$@!#$%Vinay%$#@Tandale)(*#$(', 'sklaj$jak389&^%$#@');

-- --------------------------------------------------------

--
-- Table structure for table `taxtype`
--

CREATE TABLE `taxtype` (
  `id` int NOT NULL,
  `TaxName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taxtype`
--

INSERT INTO `taxtype` (`id`, `TaxName`) VALUES
(1, 'House Tax'),
(2, 'Water Tax');

-- --------------------------------------------------------

--
-- Table structure for table `todocs`
--

CREATE TABLE `todocs` (
  `id` int NOT NULL,
  `Doc_id` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `DocumentName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Document_Requirment` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todocs`
--

INSERT INTO `todocs` (`id`, `Doc_id`, `DocumentName`, `Document_Requirment`) VALUES
(1, '9658', 'Property Proof Image 1', 'True'),
(2, '9876', 'Property Proof Image 2', 'True');

-- --------------------------------------------------------

--
-- Table structure for table `tolocality`
--

CREATE TABLE `tolocality` (
  `id` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `locality` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ward` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `zone` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `uniqueness` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tolocality`
--

INSERT INTO `tolocality` (`id`, `locality`, `ward`, `zone`, `uniqueness`) VALUES
('1', 'Balia ', 'jagdishpur 0001', 'jagdishpur 0001', 'Balia/jagdishpur 0001/jagdishpur 0001'),
('10', 'Balia ', 'bhrigu ashram 0010', 'bhrigu ashram 0010', 'Balia/bhrigu ashram 0010/bhrigu ashram 0010'),
('11', 'Balia ', 'krishna nagar 00011', 'krishna nagar 00011', 'Balia/krishna nagar 00011/krishna nagar 00011'),
('12', 'Balia ', 'civil line 0012', 'civil line 0012', 'Balia/civil line 0012/civil line 0012'),
('13', 'Balia ', 'rampur udaybhan 0013', 'rampur udaybhan 0013', 'Balia/rampur udaybhan 0013/rampur udaybhan 0013'),
('14', 'Balia ', 'rajput newari 0014', 'rajput newari 0014', 'Balia/rajput newari 0014/rajput newari 0014'),
('15', 'Balia ', 'tagore nagar 0015', 'tagore nagar 0015', 'Balia/tagore nagar 0015/tagore nagar 0015'),
('16', 'Balia ', 'bhrigu ashram 0016', 'bhrigu ashram 0016', 'Balia/bhrigu ashram 0016/bhrigu ashram 0016'),
('17', 'Balia ', 'shastri nagar 0017', 'shastri nagar 0017', 'Balia/shastri nagar 0017/shastri nagar 0017'),
('18', 'Balia ', 'japling ganj 0018', 'japling ganj 0018', 'Balia/japling ganj 0018/japling ganj 0018'),
('19', 'Balia ', 'jagdishpur 0019', 'jagdishpur 0019', 'Balia/jagdishpur 0019/jagdishpur 0019'),
('2', 'Balia ', 'bankata 0002', 'bankata 0002', 'Balia/bankata 0002/bankata 0002'),
('20', 'Balia ', 'vijaypur 0020', 'vijaypur 0020', 'Balia/vijaypur 0020/vijaypur 0020'),
('21', 'Balia ', 'rajendra nagar 0021', 'rajendra nagar 0021', 'Balia/rajendra nagar 0021/rajendra nagar 0021'),
('22', 'Balia ', 'satni sarai 0022', 'satni sarai 0022', 'Balia/Satni Sarai 0022/satni sarai 0022'),
('23', 'Balia ', 'vishwin pur 0023', 'vishwin pur 0023', 'Balia/vishwin pur 0023/vishwin pur 0023'),
('24', 'Balia ', 'chaman singh bagroad 0024', 'chaman singh bagroad 0024', 'Balia/chaman singh bagroad 0024/chaman singh bagroad 0024'),
('25', 'Balia ', 'jange Ali 0025', 'jange Ali 0025', 'Balia/jange Ali 0025/jange Ali 0025'),
('3', 'Balia ', 'kazipura harijan Basti 0003', 'kazipura harijan Basti 0003', 'Balia/kazipura harijan Basti 0003/kazipura harijan Basti 0003'),
('4', 'Balia ', 'vijayipur 0004', 'vijayipur 0004', 'Balia/vijayipur 0004/vijayipur 0004'),
('5', 'Balia ', 'amrtapaalee 0005', 'amrtapaalee 0005', 'Balia/amrtapaalee 0005/amrtapaalee 0005'),
('6', 'Balia ', 'midda 0006', 'midda 0006', 'Balia/midda 0006/midda 0006'),
('7', 'Balia ', 'harpur 0007', 'harpur 0007', 'Balia/harpur 0007/harpur 0007'),
('8', 'Balia ', 'oktenaganj 0008', 'oktenaganj 0008', 'Balia/oktenaganj 0008/oktenaganj 0008'),
('9', 'Balia ', 'japlin ganj 0009', 'japlin ganj 0009', 'Balia/japlin ganj 0009/japlin ganj 0009');

-- --------------------------------------------------------

--
-- Table structure for table `toproperty`
--

CREATE TABLE `toproperty` (
  `id` int NOT NULL,
  `PropertyType` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `Rate` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `toproperty`
--

INSERT INTO `toproperty` (`id`, `PropertyType`, `Rate`) VALUES
(1, 'Residential', 1),
(10, 'Mobile shop', 5),
(11, 'Land', 3),
(12, 'commercial complexes', 5),
(13, 'Complex', 5),
(14, 'Banks', 5),
(15, 'Offices', 5),
(16, 'Hotels', 5),
(17, 'three stars hotel', 5),
(18, 'coaching and training institutes ', 5),
(19, 'private hotels', 5),
(20, 'clinics', 3),
(21, 'polyclinics', 3),
(22, 'diagnostic centers', 3),
(23, 'laboratories', 3),
(24, 'nursing homes', 3),
(25, 'hospitals', 3),
(26, 'medical stores', 3),
(27, 'healthcare centers ', 3),
(28, 'Sports  gym', 2),
(29, 'physical health centers', 2),
(30, 'theatres and cinema houses', 2),
(31, 'Hostels', 1),
(32, 'educational institutes', 1),
(33, 'Petrol pumps', 3),
(34, 'depots and Godown', 3),
(35, 'Malls', 6),
(36, 'Hotels of four stars and above ', 6),
(37, 'pubs', 6),
(38, 'bars', 6),
(39, 'lodging house where wine is served with food', 6),
(40, 'Community halls kalyan mandaps', 3),
(41, 'Marriage houses', 3),
(42, 'Clubs and same types of buildings.', 6),
(43, 'Semi Government and public undertakings', 3),
(44, 'Building having towers and hoarding', 4),
(45, 'Industrial units offices of Govt', 3),
(46, 'T.V. towers', 4),
(47, 'telecom towers or any other tower surface or on the top of the buildings or on the open space. ', 4),
(48, 'Other types of non residential houses which are not mentioned above', 3),
(49, 'gas agencies', 3),
(50, 'Restaurant', 3),
(51, 'Poultry Farm', 3),
(53, 'Testing Tax', 5000),
(54, 'property', 1);

-- --------------------------------------------------------

--
-- Table structure for table `typesofpermit`
--

CREATE TABLE `typesofpermit` (
  `id` int NOT NULL,
  `PermitTypes` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `Rate` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DueAmount` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Status` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `DocumentRequired` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `typesofpermit`
--

INSERT INTO `typesofpermit` (`id`, `PermitTypes`, `Rate`, `location`, `DueAmount`, `Status`, `DocumentRequired`) VALUES
(1, 'Restaurant', '3000', NULL, '100', 'Enable', 4),
(2, 'Ice Factory', '4000', NULL, '100', 'Enable', 2),
(3, 'Shop', '2000', '18.6161/73.7286', '0', 'Enable', 1);

-- --------------------------------------------------------

--
-- Table structure for table `useraccess`
--

CREATE TABLE `useraccess` (
  `ID` int NOT NULL,
  `uniqueness` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `RoleID` int NOT NULL,
  `MenuId` int NOT NULL,
  `create` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'false',
  `view` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'false',
  `edit` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'false',
  `delete` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `useraccess`
--

INSERT INTO `useraccess` (`ID`, `uniqueness`, `RoleID`, `MenuId`, `create`, `view`, `edit`, `delete`) VALUES
(284, '85/1', 85, 1, '1', '1', '1', '1'),
(285, '85/20', 85, 20, '1', '1', '1', '1'),
(323, '84/1', 84, 1, '1', '1', '1', '1'),
(324, '84/2', 84, 2, '1', '1', '1', '1'),
(325, '84/3', 84, 3, '1', '1', '1', '1'),
(326, '84/4', 84, 4, '1', '1', '1', '1'),
(327, '84/5', 84, 5, '1', '1', '1', '1'),
(328, '84/6', 84, 6, '1', '1', '1', '1'),
(329, '84/7', 84, 7, '1', '1', '1', '1'),
(330, '84/8', 84, 8, '1', '1', '1', '1'),
(331, '84/9', 84, 9, '1', '1', '1', '1'),
(332, '84/10', 84, 10, '1', '1', '1', '1'),
(333, '84/11', 84, 11, '1', '1', '1', '1'),
(334, '84/12', 84, 12, '1', '1', '1', '1'),
(335, '84/13', 84, 13, '1', '1', '1', '1'),
(336, '84/14', 84, 14, '1', '1', '1', '1'),
(337, '84/15', 84, 15, '1', '1', '1', '1'),
(338, '84/16', 84, 16, '1', '1', '1', '1'),
(339, '84/17', 84, 17, '1', '1', '1', '1'),
(340, '84/18', 84, 18, '1', '1', '1', '1'),
(341, '84/19', 84, 19, '1', '1', '1', '1'),
(342, '86/1', 86, 1, '1', '1', '1', '1'),
(343, '86/2', 86, 2, '1', '1', '1', '1'),
(344, '86/3', 86, 3, '1', '1', '1', '1'),
(345, '86/6', 86, 6, '1', '1', '1', '1'),
(346, '86/14', 86, 14, '1', '1', '1', '1'),
(347, '86/19', 86, 19, '1', '1', '1', '1'),
(348, '86/21', 86, 21, '1', '1', '1', '1'),
(349, '86/205', 86, 205, '1', '1', '1', '1'),
(350, '86/207', 86, 207, '1', '1', '1', '1'),
(351, '87/1', 87, 1, '1', '1', '1', '1'),
(352, '87/3', 87, 3, '1', '1', '1', '1'),
(353, '87/7', 87, 7, '1', '1', '1', '1'),
(354, '87/13', 87, 13, '1', '1', '1', '1'),
(355, '87/19', 87, 19, '1', '1', '1', '1'),
(356, '87/20', 87, 20, '1', '1', '1', '1'),
(357, '87/208', 87, 208, '1', '1', '1', '1'),
(358, '87/211', 87, 211, '1', '1', '1', '1'),
(359, '87/212', 87, 212, '1', '1', '1', '1'),
(360, '87/215', 87, 215, '1', '1', '1', '1'),
(361, '88/1', 88, 1, '1', '1', '1', '1'),
(362, '88/2', 88, 2, '1', '1', '1', '1'),
(363, '88/3', 88, 3, '1', '1', '1', '1'),
(364, '88/6', 88, 6, '1', '1', '1', '1'),
(365, '88/14', 88, 14, '1', '1', '1', '1'),
(366, '88/203', 88, 203, '1', '1', '1', '1'),
(367, '88/204', 88, 204, '1', '1', '1', '1'),
(376, '89/1', 89, 1, '1', '1', '1', '1'),
(377, '89/2', 89, 2, '1', '1', '1', '1'),
(378, '89/3', 89, 3, '1', '1', '1', '1'),
(379, '89/4', 89, 4, '1', '1', '1', '1'),
(380, '89/6', 89, 6, '1', '1', '1', '1'),
(381, '89/14', 89, 14, '1', '1', '1', '1'),
(382, '89/19', 89, 19, '1', '1', '1', '1'),
(383, '89/20', 89, 20, '1', '1', '1', '1'),
(384, '89/204', 89, 204, '0', '0', '1', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `agentlogin`
--
ALTER TABLE `agentlogin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `agentmenu`
--
ALTER TABLE `agentmenu`
  ADD PRIMARY KEY (`Menu_ID`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `BillNumber` (`BillNumber`);

--
-- Indexes for table `bulkbilldownload`
--
ALTER TABLE `bulkbilldownload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bulkbillgeneration`
--
ALTER TABLE `bulkbillgeneration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `captcha`
--
ALTER TABLE `captcha`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `citizensignup`
--
ALTER TABLE `citizensignup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customerarea`
--
ALTER TABLE `customerarea`
  ADD PRIMARY KEY (`Srno`);

--
-- Indexes for table `customerbillbreakdown`
--
ALTER TABLE `customerbillbreakdown`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customerdocs`
--
ALTER TABLE `customerdocs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UniqueStatus` (`UniqueStatus`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`Srno`);

--
-- Indexes for table `discountcodes`
--
ALTER TABLE `discountcodes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `licensebill`
--
ALTER TABLE `licensebill`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `BillNumber` (`BillNumber`);

--
-- Indexes for table `licensepaymenttable`
--
ALTER TABLE `licensepaymenttable`
  ADD PRIMARY KEY (`ID`,`txnid`);

--
-- Indexes for table `licenseregistration`
--
ALTER TABLE `licenseregistration`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `localityrates`
--
ALTER TABLE `localityrates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_user`
--
ALTER TABLE `login_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`Menu_ID`);

--
-- Indexes for table `meter`
--
ALTER TABLE `meter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Meter` (`Meter`);

--
-- Indexes for table `paymenttable`
--
ALTER TABLE `paymenttable`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `txnid` (`txnid`);

--
-- Indexes for table `permitbills`
--
ALTER TABLE `permitbills`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `BillNumber` (`BillNumber`);

--
-- Indexes for table `permitdocs`
--
ALTER TABLE `permitdocs`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `permitpaymenttable`
--
ALTER TABLE `permitpaymenttable`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleID`),
  ADD UNIQUE KEY `Designation` (`Designation`);

--
-- Indexes for table `systemcontrol`
--
ALTER TABLE `systemcontrol`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taxtype`
--
ALTER TABLE `taxtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `todocs`
--
ALTER TABLE `todocs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tolocality`
--
ALTER TABLE `tolocality`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniqueness` (`uniqueness`);

--
-- Indexes for table `toproperty`
--
ALTER TABLE `toproperty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `typesofpermit`
--
ALTER TABLE `typesofpermit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Document Required` (`DocumentRequired`);

--
-- Indexes for table `useraccess`
--
ALTER TABLE `useraccess`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `uniqueness` (`uniqueness`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `agentlogin`
--
ALTER TABLE `agentlogin`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `agentmenu`
--
ALTER TABLE `agentmenu`
  MODIFY `Menu_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `bulkbilldownload`
--
ALTER TABLE `bulkbilldownload`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `bulkbillgeneration`
--
ALTER TABLE `bulkbillgeneration`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `captcha`
--
ALTER TABLE `captcha`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1969;

--
-- AUTO_INCREMENT for table `citizensignup`
--
ALTER TABLE `citizensignup`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `customerarea`
--
ALTER TABLE `customerarea`
  MODIFY `Srno` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customerbillbreakdown`
--
ALTER TABLE `customerbillbreakdown`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `customerdocs`
--
ALTER TABLE `customerdocs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `Srno` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `discountcodes`
--
ALTER TABLE `discountcodes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `licensebill`
--
ALTER TABLE `licensebill`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=467;

--
-- AUTO_INCREMENT for table `licensepaymenttable`
--
ALTER TABLE `licensepaymenttable`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `licenseregistration`
--
ALTER TABLE `licenseregistration`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `localityrates`
--
ALTER TABLE `localityrates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `login_user`
--
ALTER TABLE `login_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `Menu_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT for table `meter`
--
ALTER TABLE `meter`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `paymenttable`
--
ALTER TABLE `paymenttable`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `permitbills`
--
ALTER TABLE `permitbills`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `permitdocs`
--
ALTER TABLE `permitdocs`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `permitpaymenttable`
--
ALTER TABLE `permitpaymenttable`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `systemcontrol`
--
ALTER TABLE `systemcontrol`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `taxtype`
--
ALTER TABLE `taxtype`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `todocs`
--
ALTER TABLE `todocs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `toproperty`
--
ALTER TABLE `toproperty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `typesofpermit`
--
ALTER TABLE `typesofpermit`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `useraccess`
--
ALTER TABLE `useraccess`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=385;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
