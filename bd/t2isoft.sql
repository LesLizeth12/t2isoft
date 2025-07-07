-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: t2isoft
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `estacion`
--

DROP TABLE IF EXISTS `estacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estacion` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EstNombre` varchar(40) DEFAULT NULL,
  `EstDescripcion` varchar(45) DEFAULT NULL,
  `Estado` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estacion`
--

LOCK TABLES `estacion` WRITE;
/*!40000 ALTER TABLE `estacion` DISABLE KEYS */;
INSERT INTO `estacion` VALUES (1,'Cementerio','Cementerio','1'),(2,'Aeropuerto ','Aeropuerto','1'),(3,'Parque Mariscal Santa Cruz ','Parque Mariscal Santa Cruz','1'),(4,'Av. Beijing ','Av. Beijing ','1'),(5,'Villa Busch ','Villa Busch','1'),(6,'Hospital Elizabeth Setón - CNS ','Hospital Elizabeth Setón - CNS ','1'),(7,'Señora de La Merced ','Señora de La Merced ','1'),(8,'Santa Rosa ','Santa Rosa ','1'),(9,'Barrio Ferroviario ','Barrio Ferroviario ','1'),(10,'Subestación Municipal de Colcapirhua ','Subestación Municipal de Colcapirhua ','1'),(11,'Piñami ','Piñami ','1'),(12,'Cotapachi ','Cotapachi ','1'),(13,'Av. Ferroviaria ','Av. Ferroviaria ','1'),(14,'Subestación de Quillacollo ','Subestación de Quillacollo ','1'),(17,'as','as','0');
/*!40000 ALTER TABLE `estacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `HorEstId` int DEFAULT NULL,
  `HorLlegada` varchar(5) DEFAULT NULL,
  `HorSalida` varchar(5) DEFAULT NULL,
  `HorPrecio` double DEFAULT NULL,
  `Estado` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_horario_estacion_idx` (`HorEstId`),
  CONSTRAINT `fk_horario_estacion` FOREIGN KEY (`HorEstId`) REFERENCES `estacion` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
INSERT INTO `horario` VALUES (1,1,' ','06:00',25,'1'),(2,2,'06:55','06:30',25,'ida'),(3,3,'07:25','07:00',30,'ida'),(4,4,'07:55','07:30',35.5,'ida'),(5,5,'08:25','08:00',35.5,'ida'),(6,6,'08:55','08:30',12,'ida'),(7,7,'09:25','09:00',10,'ida'),(8,9,'09:55','09:30',10,'ida'),(9,10,'10:25','10:00',10,'ida'),(10,11,'10:55','10:30',10,'ida'),(11,12,'11:25','11:00',10,'ida'),(12,13,'11:55','11:30',10,'ida'),(13,14,'12:25','12:00',10,'ida'),(14,13,'12:55','12:30',10,'vuelta'),(15,12,'13:25','13:00',10,'vuelta'),(16,11,'13:55','13:30',10,'vuelta'),(17,10,'14:25','14:00',10,'vuelta'),(18,9,'14:55','14:30',10,'vuelta'),(19,8,'15:25','15:00',10,'vuelta'),(20,7,'15:55','15:30',10,'vuelta'),(21,6,'16:25','16:00',10,'vuelta'),(22,5,'16:55','16:30',10,'vuelta'),(23,4,'17:25','17:00',10,'vuelta'),(24,3,'17:55','17:30',10,'vuelta'),(25,2,'18:25','18:00',10,'vuelta'),(26,1,'18:55','18:30',10,'vuelta'),(28,2,'s','s',2,'0');
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informe`
--

DROP TABLE IF EXISTS `informe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informe` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `InfUsuId` int DEFAULT NULL,
  `InfEstId` int DEFAULT NULL,
  `InfZonaId` int DEFAULT NULL,
  `InfHorId` int DEFAULT NULL,
  `InfClimaNombre` varchar(10) DEFAULT NULL,
  `InfFecActual` varchar(10) DEFAULT NULL,
  `Estado` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_informe_zona_idx` (`InfZonaId`),
  KEY `fk_informe_cli_idx` (`InfUsuId`),
  KEY `fk_informe_estacion_idx` (`InfEstId`),
  KEY `fk_informe_horario_idx` (`InfHorId`),
  CONSTRAINT `fk_informe_estacion` FOREIGN KEY (`InfEstId`) REFERENCES `estacion` (`Id`),
  CONSTRAINT `fk_informe_horario` FOREIGN KEY (`InfHorId`) REFERENCES `horario` (`Id`),
  CONSTRAINT `fk_informe_usuario` FOREIGN KEY (`InfUsuId`) REFERENCES `usuario` (`Id`),
  CONSTRAINT `fk_informe_zona` FOREIGN KEY (`InfZonaId`) REFERENCES `zonaturistica` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informe`
--

LOCK TABLES `informe` WRITE;
/*!40000 ALTER TABLE `informe` DISABLE KEYS */;
INSERT INTO `informe` VALUES (6,1,2,2,2,'Soleado','2025-07-02','activo'),(7,1,1,1,1,'Soleado','2025-07-02','activo'),(8,2,1,1,1,'Nublado','2025-07-02','activo'),(9,2,1,1,1,'Soleado','2025-07-02','activo'),(10,2,9,12,8,'Nublado','2025-07-02','activo'),(11,2,5,5,5,'Soleado','2025-07-02','activo'),(12,2,1,1,1,'Soleado','2025-07-02','activo'),(13,2,1,1,1,'Nublado','2025-07-02','activo'),(14,2,1,1,1,'Lluvia','2025-07-02','activo'),(15,2,9,12,8,'Soleado','2025-07-02','activo'),(21,2,1,1,1,'Soleado','2025-07-07','activo');
/*!40000 ALTER TABLE `informe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipousuario` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TipoNombre` varchar(20) DEFAULT NULL,
  `Estado` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'Cliente','1'),(2,'Admin','1'),(3,'PeruRail','1'),(4,'Travel Group Perú','1'),(5,'ff','0');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UsuTipoId` int DEFAULT NULL,
  `UsuDni` varchar(8) DEFAULT NULL,
  `UsuApePaterno` varchar(15) DEFAULT NULL,
  `UsuApeMaterno` varchar(15) DEFAULT NULL,
  `UsuNombres` varchar(20) DEFAULT NULL,
  `UsuGenero` varchar(9) DEFAULT NULL,
  `UsuCorreo` varchar(45) DEFAULT NULL,
  `UsuFecRegistro` varchar(10) DEFAULT NULL,
  `UsuFecNacimiento` varchar(10) DEFAULT NULL,
  `UsuNombre` varchar(10) DEFAULT NULL,
  `UsuPassword` varchar(10) DEFAULT NULL,
  `Estado` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_cliente_tipousuario_idx` (`UsuTipoId`),
  CONSTRAINT `fk_cliente_tipousuario` FOREIGN KEY (`UsuTipoId`) REFERENCES `tipousuario` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,2,'74839215','Pinedo','Zumaeta','Leslie Lizeth','Masculino','leslie@gmail.com','2025-06-30','1986-03-30','222','222','1'),(2,1,'73658942','Quispe','Huamán','Carlos Alberto','Masculino','carlosq@gmail.com','2025-06-30','1986-03-30','111','111','1'),(3,1,'74589613','Rojas','Salas','Diana Paola','Femenino','dianars@gmail.com','2025-06-30','1986-03-30','dianapaola','1234abcd','1'),(4,1,'71234567','Sánchez','Mendoza','Luis Enrique','Masculino','luism@gmail.com','2025-06-30','1986-03-30','luisem','claveLuis','1'),(5,4,'70001234','Fernández','López','María Teresa','Femenino','maria.admin@gmail.com','2025-06-30','1986-03-30','444','444','1'),(12,3,'11111111','Pinedo','Rios','Javier','Masculino','javier@gmail.com','2025-06-30','1986-03-30','333','333','1'),(13,2,'74839215','Pinedo','Zumaeta','Leslie Lizeth','Masculino','leslie@gmail.com','2025-06-30','1986-03-30','222','22211','1'),(14,4,'75258338','Torres','Sanchez','Sofia','Femenino','sofia@gmail.com','2025-07-07','2025-06-22','sofia','sofia','1');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zonaturistica`
--

DROP TABLE IF EXISTS `zonaturistica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zonaturistica` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ZonaEstId` int DEFAULT NULL,
  `ZonaNombre` varchar(55) DEFAULT NULL,
  `ZonaDescripcion` varchar(55) DEFAULT NULL,
  `Estado` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_zona_estacion_idx` (`ZonaEstId`),
  CONSTRAINT `fk_zona_estacion` FOREIGN KEY (`ZonaEstId`) REFERENCES `estacion` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonaturistica`
--

LOCK TABLES `zonaturistica` WRITE;
/*!40000 ALTER TABLE `zonaturistica` DISABLE KEYS */;
INSERT INTO `zonaturistica` VALUES (1,1,'Cementerio General de Cochabamba','Cementerio General de Cochabamba','1'),(2,2,'Aeropuerto Internacional Jorge Wilstermann','Aeropuerto Internacional Jorge Wilstermann','1'),(3,2,'Parque de la Familia','Parque de la Familia','1'),(4,3,'Parque Mariscal Santa Cruz (acuático y velódromo)','Parque Mariscal Santa Cruz (acuático y velódromo)','1'),(5,5,'Parque Familia','Parque Familia','1'),(6,5,'Palacio Portales','Palacio Portales','1'),(7,5,'Museo de Historia Natural / Casa Patiño','Museo de Historia Natural / Casa Patiño','1'),(8,7,'Convento/Santuario de la Merced','Convento/Santuario de la Merced','1'),(9,7,'Pileta de aguas danzantes del Parque de la Familia','Pileta de aguas danzantes del Parque de la Familia','1'),(10,8,'Laguna Santa Rosa / Sumumpaya','Laguna Santa Rosa / Sumumpaya','1'),(11,8,'Plaza Santa Rosa Central','Plaza Santa Rosa Central','1'),(12,9,'Cementerio de trenes (galpón ferroviario clásico)','Cementerio de trenes (galpón ferroviario clásico)','1'),(13,10,'Museo Hernán Cámara','Museo Hernán Cámara','1'),(14,11,'Iglesia de Capacachi','Iglesia de Capacachi','1'),(15,11,'Laguna La Angostura','Laguna La Angostura','1'),(22,12,'Qollqas de Cotapachi','Qollqas de Cotapachi','1'),(23,12,'Villa Militar','Villa Militar','1'),(24,12,'Laguna La Angostura','Laguna La Angostura','1'),(25,13,'Santuario de la Virgen de Urkupiña','Santuario de la Virgen de Urkupiña','1'),(26,14,'Laguna de Cotapachi','Laguna de Cotapachi','1'),(27,1,'sdfss','sdf','0'),(28,1,'dd','dd','0');
/*!40000 ALTER TABLE `zonaturistica` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-07  9:28:30
