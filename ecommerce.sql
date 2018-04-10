-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 10, 2018 at 02:05 AM
-- Server version: 5.6.13
-- PHP Version: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ecommerce`
--
CREATE DATABASE IF NOT EXISTS `ecommerce` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ecommerce`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(999) NOT NULL,
  `password` varchar(999) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(2, 'admin', 'ebd5359e500475700c6cc3dd4af89cfd0569aa31724a1bf10ed1e3019dcfdb11'),
(3, 'user2', 'a0f4b56a545d3c40a24656d5327901138c0a39bb5eed7e8abb20ccc3b70fdf60'),
(4, 'user2', 'a0f4b56a545d3c40a24656d5327901138c0a39bb5eed7e8abb20ccc3b70fdf60'),
(5, 'user2', 'a0f4b56a545d3c40a24656d5327901138c0a39bb5eed7e8abb20ccc3b70fdf60'),
(6, 'asd', '7f60856b45eb15564fcf230aae41642d6fb0141659c455f96478dc38658b09d3');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `nama_product` varchar(100) NOT NULL,
  `nama_warna` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `harga` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `size_id`, `nama_product`, `nama_warna`, `size`, `harga`, `qty`) VALUES
(1, 1, 1, 'Batik', 'Putih', 'XL', 250000, 1),
(2, 1, 8, 'Batik', 'Pink', 'S', 250000, 1),
(3, 2, 2, 'Celana Pendek', 'Merah', 'tes', 100000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE IF NOT EXISTS `invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(999) NOT NULL,
  `invoice_code` varchar(999) NOT NULL,
  `total_price` int(11) NOT NULL,
  `waktu_beli` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `nama` varchar(999) NOT NULL,
  `alamat` varchar(999) NOT NULL,
  `no_telp` varchar(999) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `user_id`, `invoice_code`, `total_price`, `waktu_beli`, `nama`, `alamat`, `no_telp`) VALUES
(1, '1', 'inv10001', 500000, '2018-04-09 03:26:40', 'user', 'jalan user', '123');

-- --------------------------------------------------------

--
-- Table structure for table `invoicedetail`
--

CREATE TABLE IF NOT EXISTS `invoicedetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_id` varchar(999) NOT NULL,
  `size_id` varchar(999) NOT NULL,
  `nama_product` varchar(999) NOT NULL,
  `nama_warna` varchar(999) NOT NULL,
  `size` varchar(999) NOT NULL,
  `jumlah` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `invoicedetail`
--

INSERT INTO `invoicedetail` (`id`, `invoice_id`, `size_id`, `nama_product`, `nama_warna`, `size`, `jumlah`) VALUES
(1, '1', '1', 'Batik', 'Putih', 'XL', 1),
(2, '1', '8', 'Batik', 'Pink', 'S', 1);

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE IF NOT EXISTS `kategori` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `season_id` longtext NOT NULL,
  `nama_kategori` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `season_id`, `nama_kategori`) VALUES
(1, '1', 'Top'),
(2, '1', 'Bottom'),
(3, '1', 'Sepatu'),
(4, '2', 'Top'),
(5, '2', 'Bottom'),
(7, '2', 'haha'),
(16, '3', 'Baru'),
(18, '4', 'Baju'),
(21, '4', 'Celana');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kategori_id` longtext NOT NULL,
  `nama_product` longtext NOT NULL,
  `harga` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `images` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `description` (`description`),
  KEY `id` (`id`),
  KEY `description_2` (`description`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `kategori_id`, `nama_product`, `harga`, `description`, `images`) VALUES
(1, '1', 'Batik', 250000, 'Batik Trendy', ''),
(2, '2', 'Celana Pendek', 100000, 'celana pendek stylish cocok untuk kemana saja', ''),
(3, '3', 'Sendal Jepit', 75000, 'sendal paling enak yang pernah diciptakan', ''),
(4, '4', 'Jaket Hangat', 250000, 'keep you away from the cold', ''),
(5, '5', 'Celana Hangat', 200000, 'celana tebal untuk menghangatkan daerah bawah', ''),
(7, '7', 'tes product', 0, 'hanya tes', ''),
(8, '1', 'Singlet', 50000, 'baju paling adem', ''),
(11, '1', 'Kutang', 140000, 'Kutang Batman', ''),
(12, '16', 'Lama', 200000, 'Product Lama', ''),
(13, '18', 'Atasan', 20000, 'Baju aja', ''),
(15, '21', 'Jeans', 300000, 'Celana Jeans', '');

-- --------------------------------------------------------

--
-- Table structure for table `season`
--

CREATE TABLE IF NOT EXISTS `season` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_season` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `season`
--

INSERT INTO `season` (`id`, `nama_season`) VALUES
(1, 'Summer'),
(2, 'Winter'),
(3, 'haha'),
(4, 'Anton'),
(8, 'seaosn');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE IF NOT EXISTS `size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `warna_id` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `warna_id`, `size`, `stock`) VALUES
(1, '1', 'XL', 3),
(2, '2', 'L', 3),
(3, '3', 'M', 2),
(4, '2', 'XXL', 5),
(5, '8', 'S', 2),
(6, '6', 'M', 1),
(7, '9', 'L', 5),
(9, '11', '40', 3),
(10, '12', 'tes', 3),
(11, '13', '10', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'user', 'ffa5be48f1a6ad15a5f9c6a288b45f4d173ea595186bcaae6c22d65da076d21d'),
(2, 'user3', 'dd5ae9a7c70c0a7b5e039ec9434044aabec50d775784ffe16306c727356695ca');

-- --------------------------------------------------------

--
-- Table structure for table `warna`
--

CREATE TABLE IF NOT EXISTS `warna` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` longtext NOT NULL,
  `nama_warna` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `warna`
--

INSERT INTO `warna` (`id`, `product_id`, `nama_warna`) VALUES
(1, '1', 'Putih'),
(2, '8', 'Putih'),
(3, '8', 'Hitam'),
(6, '11', 'Biru'),
(8, '1', 'Pink'),
(9, '13', 'Hijau'),
(11, '15', 'Biru'),
(12, '2', 'Merah'),
(13, '3', 'Hijau');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
