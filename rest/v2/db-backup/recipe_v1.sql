-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2024 at 12:04 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_aid` int(11) NOT NULL,
  `category_is_active` tinyint(1) NOT NULL,
  `category_title` varchar(30) NOT NULL,
  `category_datetime` int(11) NOT NULL,
  `category_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_aid`, `category_is_active`, `category_title`, `category_datetime`, `category_created`) VALUES
(2, 1, 'Beef', 2024, 0),
(3, 1, 'Pasta', 2024, 2024),
(4, 1, 'Soup', 2024, 2024),
(5, 1, 'Rice', 2024, 2024);

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `level_aid` int(11) NOT NULL,
  `level_is_active` int(1) NOT NULL,
  `level_title` varchar(30) NOT NULL,
  `level_datetime` int(11) NOT NULL,
  `level_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`level_aid`, `level_is_active`, `level_title`, `level_datetime`, `level_created`) VALUES
(6, 1, 'Easy', 2024, 2024),
(7, 1, 'Moderate', 2024, 2024),
(8, 1, 'Difficult', 2024, 2024);

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `recipe_aid` int(11) NOT NULL,
  `recipe_title` varchar(50) NOT NULL,
  `recipe_category_id` int(11) NOT NULL,
  `recipe_level_id` int(11) NOT NULL,
  `recipe_serving` int(10) NOT NULL,
  `recipe_prep_time` varchar(20) NOT NULL,
  `recipe_image` varchar(20) NOT NULL,
  `recipe_ingredients` text NOT NULL,
  `recipe_description` text NOT NULL,
  `recipe_instruction` text NOT NULL,
  `recipe_is_active` tinyint(1) NOT NULL,
  `recipe_datetime` varchar(20) NOT NULL,
  `recipe_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`recipe_aid`, `recipe_title`, `recipe_category_id`, `recipe_level_id`, `recipe_serving`, `recipe_prep_time`, `recipe_image`, `recipe_ingredients`, `recipe_description`, `recipe_instruction`, `recipe_is_active`, `recipe_datetime`, `recipe_created`) VALUES
(4, 'Truffle Mushroom Pasta', 3, 6, 2, '30 min', 'Truffle-Pasta.webp', '[{\"ingredients\":\"fettuccine\",\"amount\":\"5\",\"unit\":\"oz\"},{\"ingredients\":\"unsalted butter\",\"amount\":\"3\",\"unit\":\"tbs\"},{\"ingredients\":\"sliced baby bella mushrooms\",\"amount\":\"8\",\"unit\":\"oz\"},{\"ingredients\":\"garlic clove, finely chopped\",\"amount\":\"1\",\"unit\":\"large\"},{\"ingredients\":\"kosher salt\",\"amount\":\"1\\/4\",\"unit\":\"tsp\"},{\"ingredients\":\"heavy cream\",\"amount\":\"1\\/4\",\"unit\":\"cup\"},{\"ingredients\":\"Parrano truffle cheese\",\"amount\":\"2\",\"unit\":\"oz\"}]', 'Truffle mushroom pasta is an easy pasta dish that you can make with a few simple ingredients. The sauce is made with truffle cheese which is an affordable way to enjoy the flavor of truffle without breaking the bank. The pasta is creamy, rich and earthy and very easy to make in about 30 minutes, but you’d never guess. It tastes like a restaurant dish and is a cozy dinner for two.', '##### Step 1:\nBoil the pasta according to package instructions. Reserve a few tablespoons of the starchy water before you drain the pasta once it’s cooked.\n\n##### Step 2:\nIn a 10-inch skillet, melt 1 tablespoon of butter over medium heat. Add the mushrooms and garlic and stir to coat them in the butter. Add the salt and cook the mushrooms for 10 minutes or until they’ve released their moisture and they are deep brown in color.\n\n##### Step 3:\nTransfer the cooked mushrooms and garlic to a bowl or plate. In the same pan, melt the 2 tablespoons of butter. Add the cream and stir to combine it with the butter. Once the cream is heated through add the shredded cheese. Stir until the cheese is melted. Add one or two tablespoons of the pasta water to thin the sauce.\n\n##### Step 4:\nAdd the mushrooms and pasta to the pan and stir to coat them evenly in the sauce. Garnish with the chopped parsley and grated cheese and serve.', 1, '2024-12-12 14:35:32', '2024-12-04 12:53:08'),
(5, 'Mac & Cheese', 3, 6, 5, '2 hrs', 'mac.jpg', '[{\"ingredients\":\"Elbow macaroni\",\"amount\":\"500\",\"unit\":\"grm\"},{\"ingredients\":\"Butter\",\"amount\":\"1\",\"unit\":\"stick\"},{\"ingredients\":\"Flour\",\"amount\":\"1\",\"unit\":\"cup\"},{\"ingredients\":\"Salt\",\"amount\":\"1\",\"unit\":\"tbs\"},{\"ingredients\":\"Ground black pepper\",\"amount\":\"1\",\"unit\":\"tsp\"},{\"ingredients\":\"Milk\",\"amount\":\"1\",\"unit\":\"cup\"},{\"ingredients\":\"Shredded Cheddar cheese\",\"amount\":\"5\",\"unit\":\"cups\"}]', 'Mac & cheese is an undisputed comfort food classic that can mean something different to everyone: For some, it’s the decadent holiday side their plate just isn’t complete without. For others, it’s the reliable box they grab when the 1 a.m. cravings start to hit. For me, the best mac & cheese is perfect for any occasion, from weeknight dinners to potlucks to special occasions.', '##### Step 1:\nPreheat the oven. Preheat to **325 degrees** and lightly grease a square baking dish.\n\n##### Step 2:\nCook the macaroni. Slightly undercook your noodles (about 1 minute under al-dente). Drain and set aside.\n\n##### Step 3:\nMake the roux.  Melt the butter in a medium saucepan over medium heat. Blend in the flour, salt, and pepper. Cook for 2 minutes.\n\n##### Step 4:\nAdd milk and cheese.  Stir in milk and half and half, slowly, stirring constantly. Remove from heat. Add 1 cup shredded cheese to the sauce and stir just until melted. Add the cooked macaroni noodles and toss to coat them in the sauce.\n\n##### Step 5:\nPour into baking dish.  Pour half or the pasta mixture into the prepared baking dish. Sprinkle ½ cup cheese over the top. Pour remaining pasta over it and sprinkle with remaining cheese.\n\n![Bacon Mac & Cheese](https://www.dinneratthezoo.com/wp-content/uploads/2019/07/bacon-mac-and-cheese-4.jpg)', 1, '2024-12-12 13:58:05', '2024-12-04 13:02:47'),
(6, 'burger', 2, 6, 3, '20 min', 'burger-1.webp', '[{\"ingredients\":\"patty\",\"amount\":\"1\",\"unit\":\"pd\"}]', 'afadfadfsdfsdf', 'asdsdasfaf', 1, '2024-12-12 15:11:00', '2024-12-12 13:17:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`level_aid`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`recipe_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `level_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `recipe_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
