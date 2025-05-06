-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2025 at 12:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `liabilityregistersystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `budgethead`
--

CREATE TABLE `budgethead` (
  `ID` int(11) NOT NULL,
  `HeadID` int(100) NOT NULL,
  `HeadName` varchar(100) NOT NULL,
  `HeadType` varchar(100) NOT NULL,
  `HeadDetails` varchar(100) NOT NULL,
  `HeadSanctionAmount` varchar(100) NOT NULL,
  `CRC` varchar(100) NOT NULL,
  `ProjectName` varchar(100) NOT NULL,
  `ProjectCost` varchar(100) NOT NULL,
  `PIU` varchar(100) NOT NULL,
  `GRDate` datetime NOT NULL,
  `GRCopy` varchar(100) DEFAULT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `budgethead`
--
ALTER TABLE `budgethead`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `budgethead`
--
ALTER TABLE `budgethead`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
