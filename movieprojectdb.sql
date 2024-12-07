-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2024 at 11:31 AM
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
-- Database: `movieprojectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `casts`
--

CREATE TABLE `casts` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `url` varchar(255) NOT NULL,
  `characterName` varchar(120) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casts`
--

INSERT INTO `casts` (`id`, `movieId`, `userId`, `name`, `url`, `characterName`, `dateCreated`, `dateUpdated`) VALUES
(1, 38, 1, 'Robert Downey Jr.', 'https://image.tmdb.org/t/p/original/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg', 'Tony Stark / Iron Man', '2024-10-22 03:25:43', '0000-00-00 00:00:00'),
(2, 38, 1, 'Chris Evans', 'https://image.tmdb.org/t/p/original/3bOGNsHlrswhyW79uvIHH1V43JI.jp', 'Steve Rogers / Captain America', '2024-10-22 03:31:13', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tmdbId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `overview` text NOT NULL,
  `popularity` float NOT NULL,
  `releaseDate` date NOT NULL,
  `voteAverage` float NOT NULL,
  `backdropPath` varchar(255) NOT NULL,
  `posterPath` varchar(255) NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `userId`, `tmdbId`, `title`, `overview`, `popularity`, `releaseDate`, `voteAverage`, `backdropPath`, `posterPath`, `isFeatured`, `dateCreated`, `dateUpdated`) VALUES
(240, 6, 374205, 'ワンピース　フィルム GOLD', 'The glittering Gran Tesoro, a city of entertainment beyond the laws of the government, is a sanctuary for the world’s most infamous pirates, Marines, and filthy rich millionaires. Drawn by dreams of hitting the jackpot, Captain Luffy and his crew sail straight for the gold. But behind the gilded curtains lies a powerful king whose deep pockets and deeper ambitions spell disaster for the Straw Hats and the New World alike.', 34.075, '2016-07-23', 7.2, 'https://image.tmdb.org/t/p/original//kpE6PYU4EMIojh9onZmV0sSTQbX.jpg', 'https://image.tmdb.org/t/p/original//9PgiOFTLZXP7emlwcIt0yRasJ9h.jpg', 0, '2024-12-06 10:38:45', '0000-00-00 00:00:00'),
(246, 6, 1012201, '劇場版ハイキュー!! ゴミ捨て場の決戦', 'Shoyo Hinata joins Karasuno High\'s volleyball club to be like his idol, a former Karasuno player known as the \'Little Giant\'. But Hinata soon learns that he must team up with his middle school nemesis, Tobio Kageyama. Their clashing styles form a surprising weapon, but can their newfound teamwork defeat their rival Nekoma High in the highly anticipated \'Dumpster Battle\', the long awaited ultimate showdown between two opposing underdog teams?', 67.317, '2024-02-16', 7.5, 'https://image.tmdb.org/t/p/original//xMM0RE6WjfmZKtffj2JReMjNhDC.jpg', 'https://image.tmdb.org/t/p/original//ntRU0OA4etGGiMMmH1Yw0bnaMdW.jpg', 0, '2024-12-06 10:40:41', '0000-00-00 00:00:00'),
(249, 6, 1292359, 'Hello, Love, Again', 'Five years on from when Joy said goodbye to Ethan and Hong Kong to pursue her dreams in Canada. After fighting for their love to conquer the time, distance and a global shutdown that kept them apart, Joy and Ethan meet again in Canada but realize that they have also changed a lot, individually.', 101.507, '2024-11-13', 5.7, 'https://image.tmdb.org/t/p/original//rz2AruNH8sdOaAuYrVLDfTMqXCm.jpg', 'https://image.tmdb.org/t/p/original//7R940b9RNNKLDrAI1GmCjOd5ta.jpg', 0, '2024-12-06 10:41:21', '0000-00-00 00:00:00'),
(250, 6, 593961, 'Hello, Love, Goodbye', 'A bartender and a domestic helper of Filipino origin living in Hong Kong find themselves falling in love, but they each have different plans for their future.', 14.408, '2019-07-31', 6.3, 'https://image.tmdb.org/t/p/original//ptijXES6uMuKfKolTbAeV2LvEVN.jpg', 'https://image.tmdb.org/t/p/original//sJFouUfCgHFSUh5OKVSQBSfrfA1.jpg', 0, '2024-12-06 10:41:28', '0000-00-00 00:00:00'),
(251, 6, 277834, 'Moana', 'In Ancient Polynesia, when a terrible curse incurred by Maui reaches an impetuous Chieftain\'s daughter\'s island, she answers the Ocean\'s call to seek out the demigod to set things right.', 166.701, '2016-10-13', 7.6, 'https://image.tmdb.org/t/p/original//iYLKMV7PIBtFmtygRrhSiyzcVsF.jpg', 'https://image.tmdb.org/t/p/original//9tzN8sPbyod2dsa0lwuvrwBDWra.jpg', 0, '2024-12-06 10:41:40', '0000-00-00 00:00:00'),
(252, 6, 1241982, 'Moana 2', 'After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she\'s ever faced.', 5466.54, '2024-11-27', 6.9, 'https://image.tmdb.org/t/p/original//tElnmtQ6yz1PjN1kePNl8yMSb59.jpg', 'https://image.tmdb.org/t/p/original//yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg', 0, '2024-12-06 10:41:44', '0000-00-00 00:00:00'),
(253, 6, 1354627, 'SpongeBob Squarepants: Kreepaway Kamp', 'While at Kamp Koral for a reunion, SpongeBob and the gang are stalked by a mysterious figure lurking in the shadows as campers start disappearing one by one!', 210.658, '2024-10-10', 7.1, 'https://image.tmdb.org/t/p/original//aFDYcmwEWRiEh58Ri1tMpCUWPBp.jpg', 'https://image.tmdb.org/t/p/original//blRsgsexoBqnjcEJkV8beKAVT6J.jpg', 0, '2024-12-06 10:42:39', '0000-00-00 00:00:00'),
(254, 6, 1373810, 'SpongeBob & Sandy’s Country Christmas', 'When one of Sandy’s experiments goes awry, the Cheeks family team up to save Christmas in Bikini Bottom. The special features Craig Robinson as Pa Cheeks, Johnny Knoxville as Randy Cheeks, and Grey Delisle as Ma Cheeks, Granny Cheeks, Rosie and Rowdy reprising their roles as Sandy Cheek’s family from the recently released movie Saving Bikini Bottom: The Sandy Cheeks Movie.', 8.299, '2024-10-15', 8, 'https://image.tmdb.org/t/p/original//hwQ4AmsVa7iugu3J8B4Ikc74N68.jpg', 'https://image.tmdb.org/t/p/original//23K72zykyVx4q0dSweslGgTGJmW.jpg', 0, '2024-12-06 10:42:44', '0000-00-00 00:00:00'),
(258, 6, 144616, 'Sofia the First: Once Upon a Princess', 'Set in the storybook world of Enchancia, the music-filled movie follows Sofia, an average girl whose life suddenly changes when her mother marries the king and she is whisked off to live in a castle with her mom, new step-father, King Roland II, and step-siblings, Amber and James. Along the way this ordinary girl learns to navigate the extraordinary life of royalty, and in the process makes everyone around her feel special.', 20.692, '2012-11-18', 7.4, 'https://image.tmdb.org/t/p/original//8fjorTHU0899ewwiDd6jGmTVgSi.jpg', 'https://image.tmdb.org/t/p/original//5MGUoGtlOK646iHo8sJLyDSrpDC.jpg', 0, '2024-12-06 10:44:16', '0000-00-00 00:00:00'),
(261, 6, 280221, 'Mickey Mouse Clubhouse: Mickey\'s Adventures in Wonderland', 'Get ready to join Mickey and friends on their most amazing adventure ever -- a new movie classic inspired by Disney\'s ALICE IN WONDERLAND. It\'s Daisy Duck\'s birthday, and, in preparation, Mickey Mouse and Donald Duck have arranged a surprise party and bought a cuckoo clock as a present. However, the bird inside the clock escapes, leading Donald and Mickey into a strange fantasy world, modeled after Lewis Carroll\'s Wonderland. Some friends tag along for the journey, and some even appear as characters from the original tale. Goofy becomes the Goofy Hatter and Clarabelle Cow becomes Queen Clarabelle.', 4.861, '2009-09-08', 7, 'https://image.tmdb.org/t/p/original//3n0jLpFcrws9AstGRGGGX4hkNDa.jpg', 'https://image.tmdb.org/t/p/original//gmRb7sEuhSaZHZlfuPR4azETjzw.jpg', 0, '2024-12-06 10:45:55', '0000-00-00 00:00:00'),
(262, 6, 1891, 'The Empire Strikes Back', 'The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.', 49.905, '1980-05-20', 8.392, 'https://image.tmdb.org/t/p/original//aJCtkxLLzkk1pECehVjKHA2lBgw.jpg', 'https://image.tmdb.org/t/p/original//nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg', 0, '2024-12-06 10:52:34', '0000-00-00 00:00:00'),
(263, 6, 271110, 'Captain America: Civil War', 'Following the events of Age of Ultron, the collective governments of the world pass an act designed to regulate all superhuman activity. This polarizes opinion amongst the Avengers, causing two factions to side with Iron Man or Captain America, which causes an epic battle between former allies.', 93.184, '2016-04-27', 7.444, 'https://image.tmdb.org/t/p/original//wdwcOBMkt3zmPQuEMxB3FUtMio2.jpg', 'https://image.tmdb.org/t/p/original//rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg', 0, '2024-12-06 11:17:17', '0000-00-00 00:00:00'),
(265, 6, 10991, '劇場版ポケットモンスター 結晶塔の帝王 ENTEI', 'When Molly Hale\'s sadness of her father\'s disappearance gets to her, she unknowingly uses the Unown to create her own dream world along with Entei, who she believes to be her father. When Entei kidnaps Ash\'s mother, Ash along with Misty & Brock invade the mansion looking for his mom and trying to stop the mysteries of Molly\'s Dream World and Entei!', 26.711, '2000-07-08', 6.5, 'https://image.tmdb.org/t/p/original//dLGQo5Xq6H18vPx00Czot8VHi3K.jpg', 'https://image.tmdb.org/t/p/original//g2C95ubS56O1ITXy1MgC69kAwF0.jpg', 0, '2024-12-06 12:03:51', '0000-00-00 00:00:00'),
(266, 6, 521029, 'Annabelle Comes Home', 'Determined to keep Annabelle from wreaking more havoc, demonologists Ed and Lorraine Warren bring the possessed doll to the locked artifacts room in their home, placing her “safely” behind sacred glass and enlisting a priest’s holy blessing. But an unholy night of horror awaits as Annabelle awakens the evil spirits in the room, who all set their sights on a new target—the Warrens\' ten-year-old daughter, Judy, and her friends.', 52.875, '2019-06-26', 6.4, 'https://image.tmdb.org/t/p/original//dBt0DoFfbhOI4ypUfRj1uTq623M.jpg', 'https://image.tmdb.org/t/p/original//qWsHMrbg9DsBY3bCMk9jyYCRVRs.jpg', 0, '2024-12-06 12:51:49', '0000-00-00 00:00:00'),
(270, 6, 460793, 'Olaf\'s Frozen Adventure', 'Olaf is on a mission to harness the best holiday traditions for Anna, Elsa, and Kristoff.', 26.686, '2017-10-27', 6.5, 'https://image.tmdb.org/t/p/original//6tzHlmxmWs2ZXXdghMtFcBMB4cg.jpg', 'https://image.tmdb.org/t/p/original//As8WTtxXs9e3cBit3ztTf7zoRmm.jpg', 0, '2024-12-06 14:59:58', '0000-00-00 00:00:00'),
(273, 6, 330457, 'Frozen II', 'Elsa, Anna, Kristoff and Olaf head far into the forest to learn the truth about an ancient mystery of their kingdom.', 91.583, '2019-11-20', 7.257, 'https://image.tmdb.org/t/p/original//ou1mmzUkFEgGp6b2ghMpW8FlHG4.jpg', 'https://image.tmdb.org/t/p/original//mINJaa34MtknCYl5AjtNJzWj8cD.jpg', 0, '2024-12-06 15:09:55', '0000-00-00 00:00:00'),
(274, 6, 402431, 'Wicked', 'In the land of Oz, ostracized and misunderstood green-skinned Elphaba is forced to share a room with the popular aristocrat Glinda at Shiz University, and the two\'s unlikely friendship is tested as they begin to fulfill their respective destinies as Glinda the Good and the Wicked Witch of the West.', 995.423, '2024-11-20', 7.6, 'https://image.tmdb.org/t/p/original//uKb22E0nlzr914bA9KyA5CVCOlV.jpg', 'https://image.tmdb.org/t/p/original//xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg', 0, '2024-12-06 15:28:00', '0000-00-00 00:00:00'),
(275, 6, 1100782, 'Smile 2', 'About to embark on a new world tour, global pop sensation Skye Riley begins experiencing increasingly terrifying and inexplicable events. Overwhelmed by the escalating horrors and the pressures of fame, Skye is forced to face her dark past to regain control of her life before it spirals out of control.', 933.02, '2024-10-16', 6.592, 'https://image.tmdb.org/t/p/original//iR79ciqhtaZ9BE7YFA1HpCHQgX4.jpg', 'https://image.tmdb.org/t/p/original//ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg', 0, '2024-12-06 15:28:49', '0000-00-00 00:00:00'),
(276, 6, 1022789, 'Inside Out 2', 'Teenager Riley\'s mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.', 777.574, '2024-06-11', 7.6, 'https://image.tmdb.org/t/p/original//p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg', 'https://image.tmdb.org/t/p/original//vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg', 0, '2024-12-06 15:29:10', '0000-00-00 00:00:00'),
(277, 6, 150540, 'Inside Out', 'When 11-year-old Riley moves to a new city, her Emotions team up to help her through the transition. Joy, Fear, Anger, Disgust and Sadness work together, but when Joy and Sadness get lost, they must journey through unfamiliar places to get back home.', 145.859, '2015-06-17', 7.9, 'https://image.tmdb.org/t/p/original//j29ekbcLpBvxnGk6LjdTc2EI5SA.jpg', 'https://image.tmdb.org/t/p/original//2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg', 0, '2024-12-06 15:29:15', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `userId`, `movieId`, `url`, `description`, `dateCreated`, `dateUpdated`) VALUES
(1, 1, 38, 'uploads/photos/poster1728019066.jpg', 'test', '2024-10-04 05:17:46', '0000-00-00 00:00:00'),
(2, 1, 38, 'https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg', 'Test Description', '2024-10-22 04:56:09', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `middleName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `middleName`, `lastName`, `contactNo`, `role`) VALUES
(1, 'test2@mail.com', 'd8578edf8458ce06fbc5bb76a58c5ca4', 'Lem', '', 'Francisco', '09351107560', 'admin'),
(2, 'trishia@gmail.com', '550da011c50277c59ef37a7c52c68384', 'Trishia', 'Landicho', 'Mañabat', '09097541389', 'admin'),
(3, 'mayi@gmail.com', 'cc3327f0eafa9f654ca0f2a1a98fcc7f', 'miyazaki', 'mayi', 'zaki', '0956985335', 'user'),
(4, 'mayi@mail.com', 'cc3327f0eafa9f654ca0f2a1a98fcc7f', 'myii', 'defdf', 'ddf', '0909889898', 'user'),
(5, 'may26@gmail.com', 'cc3327f0eafa9f654ca0f2a1a98fcc7f', 'trishia', 'lndicho', 'Mañabat', '09097541389', 'admin'),
(6, 'kishi@gmail.com', 'f94511d1379ca15e68f2bfec774f9281', 'cute ako', 'super', 'maganda', '090989898892', 'admin'),
(7, 'ishh@gmail.com', 'b9fbc9a273f22a9134dc90cfc4e2b211', 'isya', 'mae', 'manababa', '0909998999', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `site` varchar(255) NOT NULL,
  `videoKey` varchar(255) NOT NULL,
  `videoType` varchar(255) NOT NULL,
  `official` tinyint(1) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `userId`, `movieId`, `url`, `name`, `site`, `videoKey`, `videoType`, `official`, `dateCreated`, `dateUpdated`) VALUES
(1, 1, 38, 'https://www.youtube.com/embed/PARfU2Vi694', 'Avengers vs Ebony Maw & Cull Obsidian | Avengers Infinity War (2018) IMAX Movie Clip HD 4K', 'Youtube', 'PARfU2Vi694', 'Clip', 0, '2024-10-22 05:13:14', '0000-00-00 00:00:00'),
(2, 1, 38, 'https://www.youtube.com/embed/49xWJJvpjzI', 'Thor Arrives In Wakanda Scene - Avengers Infinity War (2018) Movie CLIP 4K ULTRA HD', 'YouTube', '49xWJJvpjzI', 'Clip', 0, '2024-10-22 05:15:45', '0000-00-00 00:00:00'),
(3, 6, 521720, 'https://www.youtube.com/embed/PARfU2Vi694', 'avengers', 'youtube', 'PARfU2Vi694', 'mp4', 1, '2024-12-05 14:17:57', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casts`
--
ALTER TABLE `casts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casts`
--
ALTER TABLE `casts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
