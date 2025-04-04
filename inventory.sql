-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inventory_model`
--

DROP TABLE IF EXISTS `inventory_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_model` (
  `id` bigint NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `item_category` varchar(255) DEFAULT NULL,
  `item_details` varchar(255) DEFAULT NULL,
  `item_image` varchar(255) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `item_price` varchar(255) DEFAULT NULL,
  `item_qty` varchar(255) DEFAULT NULL,
  `model_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_model`
--

LOCK TABLES `inventory_model` WRITE;
/*!40000 ALTER TABLE `inventory_model` DISABLE KEYS */;
INSERT INTO `inventory_model` VALUES (1,'Dell','Laptops','new item good','L5400.png','Dell Latitude','10000','10','L5400'),(3,'Dell','Laptops','A Grade','4zu3_Dell_Latitude_3400.jpg','Dell Latitude','10000','10','L3400'),(52,'Asus','Laptops','A Grade','x513images.jpeg','VivoBook','20000','10','X513'),(102,'Samsung','Smartphones','Good','s24images.jpeg','Galaxy S24','20000','10','S001LBA'),(104,'Sony','Gaming Consoles','Good','ps5.png','PS5','2000','10','PS001'),(152,'Canon','Cameras','Good Quality','eos6d.jpg','DSLR Camera','20000','10','EOS6D');
/*!40000 ALTER TABLE `inventory_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_model_seq`
--

DROP TABLE IF EXISTS `inventory_model_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_model_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_model_seq`
--

LOCK TABLES `inventory_model_seq` WRITE;
/*!40000 ALTER TABLE `inventory_model_seq` DISABLE KEYS */;
INSERT INTO `inventory_model_seq` VALUES (251);
/*!40000 ALTER TABLE `inventory_model_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security_code`
--

DROP TABLE IF EXISTS `security_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `security_code` (
  `id` bigint NOT NULL,
  `security_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security_code`
--

LOCK TABLES `security_code` WRITE;
/*!40000 ALTER TABLE `security_code` DISABLE KEYS */;
INSERT INTO `security_code` VALUES (1,'949394');
/*!40000 ALTER TABLE `security_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security_code_seq`
--

DROP TABLE IF EXISTS `security_code_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `security_code_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security_code_seq`
--

LOCK TABLES `security_code_seq` WRITE;
/*!40000 ALTER TABLE `security_code_seq` DISABLE KEYS */;
INSERT INTO `security_code_seq` VALUES (51);
/*!40000 ALTER TABLE `security_code_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_model`
--

DROP TABLE IF EXISTS `user_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_model` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_model`
--

LOCK TABLES `user_model` WRITE;
/*!40000 ALTER TABLE `user_model` DISABLE KEYS */;
INSERT INTO `user_model` VALUES (1,'newmadhushan01@gmail.com','Janaka Madhushan','$2a$10$EvRcNVDbVp6BktNzhpK8ge/6aNEJbtm2moErkqoAN.Ui3moMcBppe','0712002002'),(2,'janaka@gmail.com','Janaka','$2a$10$OVVtnkUhv1XzLZ2S9tn33.39kJp/bxJVa817VkbzqtC7qCwevE5/.','0712002002'),(52,'jana@gmail.com','Janaka M','$2a$10$uic0xBlTd99EKjgOj8ka8ur3BQtob9zVoP5Xzkm9xlmsKwz1BDDxm','0712002002'),(102,'hello@gmail.com','Madhushan','$2a$10$8m8yoIFKVagGLtbXguQ5PeY5A713fRGMFzs1Ls5BLL730Wlbo4ES6','0712002002'),(103,'dilshan@gmail.com','Dila','$2a$10$ZVu0p/.Gon9TMgoLa/Yvp.wn360v48bFOP5ElOJhPz9zeaaK1EAfC','0712002002'),(104,'dilsha@gmail.com','Dila','$2a$10$9B5.LuOVCPLcAfLyMg11cuHB9GgXiQYcT5/8NRhI1QYtWbVbmu8Hy','0712002002'),(105,'abc@gmail.com','abe','$2a$10$z1KdQXsvwVE2DAlVguOXr.0D2j/CLXxg0SO1a55pIwz7Rulkndql6','0712002002'),(106,'vish@gmail.com','wishva','$2a$10$lgU05hz040JiAfgegZbYh.CvQnujR1xw5WzjMmE0oYsYBvhu/MrVe','0712002002'),(107,'san@gmail.com','sandun','$2a$10$oxvFo1MKNHKDzlxymiEhE.Q8pPaRxvH/rlhElW3Vx41pTtaPFwKyq','0712002002'),(152,'kamindu@gmail.com','Kamindu Dilshan','$2a$10$GHNc0zagpOICF9/EjHsY/OyKGEAgxcsaDn7PHXVLGRPs0CCSknW9e','0712002002');
/*!40000 ALTER TABLE `user_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_model_seq`
--

DROP TABLE IF EXISTS `user_model_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_model_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_model_seq`
--

LOCK TABLES `user_model_seq` WRITE;
/*!40000 ALTER TABLE `user_model_seq` DISABLE KEYS */;
INSERT INTO `user_model_seq` VALUES (251);
/*!40000 ALTER TABLE `user_model_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-04 11:21:06
