-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: Biblioteca
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `LECTORES`
--

DROP TABLE IF EXISTS `LECTORES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LECTORES` (
  `ID_Lector` int(11) NOT NULL AUTO_INCREMENT,
  `Activo` char(1) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Domicilio` varchar(255) NOT NULL,
  `Cod_Postal` char(5) DEFAULT NULL,
  `Telefono` char(10) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Generado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID_Lector`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LECTORES`
--

LOCK TABLES `LECTORES` WRITE;
/*!40000 ALTER TABLE `LECTORES` DISABLE KEYS */;
INSERT INTO `LECTORES` VALUES (1,'S','America','Miguel Parra',21,'Fracc.El Trigal','68954','2871272431','americaP@gmail.om','america7894','2022-12-13 14:45:54','2022-12-14 06:36:11'),(2,'N','Jaime','Miguel Parra',22,'Fracc.El Trigal','68963','2871048896','jaimemiguel@gmail.com','jaimeparra','2022-12-14 07:47:25','2022-12-14 08:05:51');
/*!40000 ALTER TABLE `LECTORES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LIBROS`
--

DROP TABLE IF EXISTS `LIBROS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LIBROS` (
  `ID_Libro` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(255) NOT NULL,
  `Autor` varchar(255) NOT NULL,
  `Fecha_Publicacion` date DEFAULT NULL,
  `Editorial` varchar(255) NOT NULL,
  `Clasificacion` varchar(255) NOT NULL,
  `Num_Paginas` char(4) DEFAULT NULL,
  `Existente` char(1) DEFAULT NULL,
  `Adquisicion` timestamp NOT NULL DEFAULT current_timestamp(),
  `Actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID_Libro`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LIBROS`
--

LOCK TABLES `LIBROS` WRITE;
/*!40000 ALTER TABLE `LIBROS` DISABLE KEYS */;
INSERT INTO `LIBROS` VALUES (1,'Cien años de soledad','Gabriel Garcia Marquez','1966-08-01','La Casa','Novela','200','N','2022-12-14 16:18:49','2022-12-14 16:58:07'),(2,'Sueños','Matia Lopez','2000-05-06','Rosas','Novela','150','S','2022-12-14 16:51:51','2022-12-14 16:51:51');
/*!40000 ALTER TABLE `LIBROS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRESTAMOS`
--

DROP TABLE IF EXISTS `PRESTAMOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PRESTAMOS` (
  `Num_Prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Libro` int(11) NOT NULL,
  `ID_Lector` int(11) NOT NULL,
  `Fecha_Salida` date DEFAULT NULL,
  `Fecha_Entrega` date DEFAULT NULL,
  `Generado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Num_Prestamo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRESTAMOS`
--

LOCK TABLES `PRESTAMOS` WRITE;
/*!40000 ALTER TABLE `PRESTAMOS` DISABLE KEYS */;
INSERT INTO `PRESTAMOS` VALUES (1,1,1,'2022-12-14','2022-12-20','2022-12-14 16:32:37','2022-12-14 16:32:37');
/*!40000 ALTER TABLE `PRESTAMOS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-14 22:46:55
