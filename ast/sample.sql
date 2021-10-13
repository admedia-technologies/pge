-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2021 at 10:31 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `googlemapapps`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `location_types`
--

CREATE TABLE `location_types` (
  `id` int(11) NOT NULL,
  `location_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location_types`
--

INSERT INTO `location_types` (`id`, `location_type`) VALUES
(1, 'mosque'),
(2, 'church'),
(3, 'synagogue'),
(4, 'primary_school'),
(5, 'school'),
(6, 'secondary_school'),
(7, 'university'),
(8, 'hospital'),
(9, 'pharmacy'),
(10, 'supermarket'),
(11, 'clothing_store'),
(12, 'convenience_store'),
(13, 'department_store'),
(14, 'drugstore'),
(15, 'shoe_store'),
(16, 'electronics_store'),
(17, 'store'),
(18, 'furniture_store'),
(19, 'hardware_store'),
(20, 'home_goods_store'),
(21, 'jewelry_store'),
(22, 'food'),
(23, 'restaurant'),
(24, 'bakery'),
(25, 'Bank');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(10, '2014_10_12_000000_create_users_table', 1),
(11, '2014_10_12_100000_create_password_resets_table', 1),
(12, '2019_08_19_000000_create_failed_jobs_table', 1),
(13, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 0,
  `user_status` int(11) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role_id`, `user_status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@admin.com', NULL, '$2y$10$HZRRProXXgXApXesSTNw3egKaH9jvqTreHXTffFWMYdbavIGKLpBW', 1, 1, NULL, '2021-09-14 11:52:29', '2021-09-14 11:52:29'),
(2, 'testuser', 'testuser@testuser.com', NULL, '$2y$10$0uuxV41IRxXSrB3Anh/2PuaqLaFoS/uHwWqNCj242hNfE321R0qs.', 2, 1, NULL, '2021-09-14 11:53:12', '2021-09-14 11:53:12'),
(3, 'guestuser', 'guestuser@guestuser.com', NULL, '$2y$10$ReZ1Cs9T10ZR1Si16/yApOwORMmobGdsxMFUB5.nDyTN/vcPpfXnG', 3, 1, NULL, '2021-09-14 11:53:54', '2021-09-14 11:53:54'),
(15, 'admin', 'ar.siddiqui63@gmail.com', NULL, '$2y$10$ek372zsVv.DM68ljO9Xk/.OHFo6a2bYjzPtOc7CesN5gqAsZLD69G', 2, 1, NULL, '2021-09-27 13:25:26', '2021-09-27 13:30:51');

-- --------------------------------------------------------

--
-- Table structure for table `user_locations`
--

CREATE TABLE `user_locations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `click_event_lat` text NOT NULL,
  `click_event_lng` text NOT NULL,
  `click_event_place` text NOT NULL,
  `click_event_latlng_both` text NOT NULL,
  `business_status` text NOT NULL,
  `formatted_address` text NOT NULL,
  `name` text NOT NULL,
  `vicinity` text NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_locations`
--

INSERT INTO `user_locations` (`id`, `user_id`, `click_event_lat`, `click_event_lng`, `click_event_place`, `click_event_latlng_both`, `business_status`, `formatted_address`, `name`, `vicinity`, `created_at`) VALUES
(1, 2, '12.367816833121', '-1.5318846702576', 'ChIJo3Nt9ZKVLg4RhIZ34UanaVY', '12.367816833121042,-1.5318846702575684', 'OPERATIONAL', '9F99 476, Ouagadougou, Burkina Faso', 'School Marien N\' Gouabi', '9F99 476, Ouagadougou', '2021-10-10 11:29:45'),
(2, 2, '12.363834460086', '-1.5265202522278', 'ChIJZ7BhWPOVLg4Rum-S37mTQno', '12.36383446008557,-1.5265202522277832', 'OPERATIONAL', 'Ave Houari Boumedienne, Koulouba, Ouagadougou, Burkina Faso', 'St. John the Baptist of La Salle School', 'Avenue Houari Boumedienne, Ouagadougou', '2021-10-10 11:34:57'),
(3, 2, '12.362723576783', '-1.5182590484619', 'ChIJD_R7Ax--Lg4RYZSAP9C2joA', '12.362723576783194,-1.518259048461914', 'OPERATIONAL', '992 Avenue Kwame Nkrumah, Koulouba, Ouagadougou, Burkina Faso', 'Ministère de la Fonction Publique , du Travail et de la Protection Sociale', '992 Avenue Kwame Nkrumah, Ouagadougou', '2021-10-10 11:35:36'),
(4, 2, '12.364484219829', '-1.5244817733765', 'ChIJ-wSJtPSVLg4RTLLy5zDGniA', '12.36448421982881,-1.5244817733764648', 'OPERATIONAL', '9F7G Q6J, Koulouba, Ouagadougou, Burkina Faso', 'Lycée Saint-Exupéry de Ouagadougou', '9F7G Q6J, Ouagadougou', '2021-10-10 11:37:35'),
(5, 2, '12.364987258521', '-1.5337300300598', 'ChIJ968ozeyVLg4R6bdFMZsrTRY', '12.364987258520681,-1.5337300300598145', 'OPERATIONAL', 'Avenue Kadiogo, Bilbalogho, Ouagadougou, Burkina Faso', 'Siège PAEJF Burkina', 'Avenue Kadiogo, Ouagadougou', '2021-10-10 11:44:45'),
(6, 2, '12.368298905739', '-1.5236020088196', 'ChIJG9v1q4uVLg4RN3wI1NzBRDA', '12.368298905739005,-1.52360200881958', 'OPERATIONAL', 'Avenue Kadiogo, Bilbalogho, Ouagadougou, Burkina Faso', 'Bank Of Africa', 'Avenue Kadiogo, Ouagadougou', '2021-10-11 17:40:25'),
(7, 2, '12.371463795185', '-1.5259730815887', 'ChIJF0PqsmWVLg4RPvxNsuTrBeA', '12.3714637951852,-1.5259730815887451', 'OPERATIONAL', '06 BP 47019 ouagadougou 06, Ouagadougou, Burkina Faso', 'Rahma-business', '06 BP 47019 ouagadougou 06, Ouagadougou', '2021-10-13 19:17:41'),
(8, 2, '12.366810765662', '-1.5338802337646', 'ChIJbz26F5OVLg4Rs1bfXRAwmc4', '12.36681076566218,-1.5338802337646484', '', 'Ouagadougou, Burkina Faso', 'Lycée Marien N´Gouabi', 'Ouagadougou', '2021-10-13 19:22:59'),
(9, 2, '12.358699205295', '-1.5281081199646', 'ChIJE4RzePGVLg4RvqqEe9S_X_o', '12.358699205294577,-1.5281081199645996', '', '', '', '', '2021-10-13 19:23:16'),
(10, 2, '12.368969613989', '-1.5296530723572', 'ChIJ3yDX642VLg4R-GU8qYTsqrQ', '12.368969613988767,-1.5296530723571777', 'NF', 'NF', 'NF', 'NF', '2021-10-13 19:23:42'),
(11, 2, '12.37012238977', '-1.5284085273743', 'ChIJq0b60Y2VLg4RLq-SiJHHf00', '12.370122389770213,-1.5284085273742676', 'OPERATIONAL', 'Ouagadougou, Burkina Faso', 'National Social Security Fund', 'Ouagadougou', '2021-10-13 19:25:19'),
(12, 2, '12.367575796479', '-1.5288001298904', 'ChIJH7gHDY2VLg4ROisYqQ5-QqY', '12.367575796478533,-1.528800129890442', 'NF', 'NF', 'NF', 'NF', '2021-10-13 19:25:25'),
(13, 2, '12.364966298595', '-1.5267777442932', 'ChIJKcbCSvOVLg4RQ2NzQKpLA40', '12.364966298594519,-1.526777744293213', 'NF', 'NF', 'NF', 'NF', '2021-10-13 19:25:29'),
(14, 2, '12.371987779805', '-1.5235805511475', 'ChIJ6wzCc4mVLg4Rrl3HGruTHFs', '12.37198777980453,-1.523580551147461', 'OPERATIONAL', 'Av de la Nation, Ouagadougou, Burkina Faso', 'Maison du Peuole', 'Avenue de la Nation, Ouagadougou', '2021-10-13 19:51:17'),
(15, 2, '12.365574135771', '-1.5242671966553', 'ChIJL5nsH9eVLg4RuWroIR4q78I', '12.365574135770832,-1.5242671966552734', 'OPERATIONAL', '436, Rue de la Chance, 01 BP 68 Ouagadougou 01 O uagadougou, Koulouba, Ouagadougou, Burkina Faso', 'Loterie Nationale Burkinabè', '436, Rue de la Chance, 01 BP 68 Ouagadougou 01 O uagadougou', '2021-10-13 20:03:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `location_types`
--
ALTER TABLE `location_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_locations`
--
ALTER TABLE `user_locations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location_types`
--
ALTER TABLE `location_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_locations`
--
ALTER TABLE `user_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
