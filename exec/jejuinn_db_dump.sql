-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: jejuinn-deploy.cryffwvzpqtt.ap-northeast-2.rds.amazonaws.com    Database: jejuinndb
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `area_name` varchar(10) NOT NULL,
  PRIMARY KEY (`area_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES ('구좌읍'),('남원읍'),('대정읍'),('서귀포시'),('성산읍'),('안덕면'),('애월읍'),('우도면'),('제주시'),('조천읍'),('표선면'),('한경면'),('한림읍');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authority` (
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`authority_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
INSERT INTO `authority` VALUES ('ROLE_ADMIN'),('ROLE_AUTH'),('ROLE_USER');
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `post_type` varchar(25) DEFAULT NULL,
  `post_uid` bigint DEFAULT NULL,
  `user_uid` bigint DEFAULT NULL,
  `content` text,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'REVIEW',22,20,'와 제주도에 이런곳이 있었군요\n다음엔 여기 가야겠어요','2023-02-17 00:05:52');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `type_name` varchar(25) DEFAULT NULL,
  `type_uid` bigint DEFAULT NULL,
  `user_uid` bigint DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (2,'GUEST_HOUSE',5,43),(3,'GUEST_HOUSE',7,11);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_houses`
--

DROP TABLE IF EXISTS `guest_houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_houses` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `guest_house_name` varchar(50) DEFAULT NULL,
  `representative_uid` bigint DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `introduction` text,
  `tags` varchar(100) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `address_detail` varchar(50) DEFAULT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `area_name` varchar(10) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `FK_GUEST_HOUSES_ON_AREA_NAME` (`area_name`),
  CONSTRAINT `FK_GUEST_HOUSES_ON_AREA_NAME` FOREIGN KEY (`area_name`) REFERENCES `areas` (`area_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_houses`
--

LOCK TABLES `guest_houses` WRITE;
/*!40000 ALTER TABLE `guest_houses` DISABLE KEYS */;
INSERT INTO `guest_houses` VALUES (1,'탐라 게스트하우스',10,'xvsgxv@gmail.com','010-6638-7338','<h2>탐라 게스트하우스</h2><p><br></p><p>소개 :</p><p><strong>** 필수안내사항 **</strong></p><p><br></p><p>1. 아침 셔틀 시간 : 오전 6시 프런트 집결. 6시10분 출발.</p><p>관음사 코스 입구 ( 6시35분 도착 ) .</p><p>성판악입구 도착. (6시50분도착)</p><p><br></p><p><strong>** 돌아오는 리턴 픽업은 운행하지않습니다.</strong></p><p><br></p><p>2. 아침 식사 무료 제공 :</p><p>김밥1줄. 오메기떡1개 . 생수500ml 1개.</p><p>( 컵라면으로 대체 가능)</p><p><br></p><p>3. 산행하는 동안 개인물품 보관 가능 :</p><p>1층복도끝 물품보관함</p><p><br></p><p>4.각종 등산용품 렌탈 가능</p><p><br></p><p><strong>** 취소 &amp; 환불규정 **</strong></p><p><br></p><p>한라산 등산을 하시는 분들 꼭 봐주세요.</p><p>한라산 등산은 한라산 산행을 하시고자 하셨는데,</p><p>날씨가 좋지않아 중간통제나 입장이 안되는 경우가</p><p>너무나 많습니다.</p><p>한라산은 수시로 강풍주의보,호우주의보,대설주의보,태풍주의보가 발효되는 곳으로</p><p>산행을 못하거나, 중간까지만 가는 날이 정말 많아요.</p><p><br></p><p>한라산 산행을 못한다고 숙박 안할테니 환불 해달라고</p><p>하시마시고, 기상상황을 잘 체크하셔서</p><p>미리미리 취소처리 및 환불받으시기 바랍니다.</p><p><br></p><p>예약한 날 날씨가 갑자기 안좋아지면</p><p>어쩔수없이 다른 일정 잡으셔야합니다.</p><p><br></p><p>당일 예약 취소 및 변경 불가합니다.</p><p><br></p><p>예약일 변경은 예약일로부터 8일전까지 가능합니다.</p><p><br></p><p>7일이내 변경시 환불규정 적용되어 수수료 발생됩니다.</p><p><br></p><p>100프로 환불 되는 경우 : 비행기 결항, 여객선 결항시 . .</p><p>70프로 환불되는 경우 : 예약일로부터 6-7일전까지 취소시</p><p><br></p><p>50프로 환불되는 경우 : 예약일로부터 3-5일전까지 취소시.</p><p>20프로 환불되는 경우 : 예약일롤부터 1-2일전까지 취소시.</p><p><br></p><p>위 취소 환불 규정 잘 인지하시고 , 환불관련하여 문제가 생기지않도록</p><p>미리미리 기상을 확인하시기 바랍니다.</p><p><br></p>','대처 능력,빠른 습득,빠른 일처리','제주특별자치도 제주시 연오로 140','연동, 탐라게스트하우스',33.4805911262,126.499739636183,'제주시',NULL),(2,'공천포올레게스트하우스',11,'22udy629@gmail.com','010-6808-3391','<h2>소개 :&nbsp;</h2><h2>1. 이불 커버, 매트리스 커버, 베개 커버 매일 세탁.</h2><h2>2. 남성 층과 여성 층 완전 분리로 안전한 게스트하우스</h2><h2>3, 2018년 5월 준공된 신축 건물, 세스코 멤버스 가입으로 철저한 위생 관리</h2><h2>4, 20:00 ~ 23:30 와이너리 파티 진행*피자, 샐러드, 감바스 등 와인과 어울리는 음식 제공 (일반</h2><h2>음식점 허가로 합법적인 파티가 진행되는 곳임을 알려드립니다.)</h2><h2>5. 영화 및 스포츠 이벤트 상영. *설치된 대형 스크린 통해 아름다운 영상 및 스포츠 이벤트 상영,</h2><h2>6. 게스트에 한하여, 루프탑정원 카페 아메리카노 무료 제공,</h2><h2>7. 1인실, 2인실, 4인실 단층 침대로 객실 구성(슈퍼 싱글, 더블 침대로 구성)</h2><h2>8. 무도동 버스 정류장 도보 5분 / 태흥 초등학교 버스 정류장 도보 7분태흥낚시편의점(CU편의점) 도보 7분</h2>','조용한 게하,픽업 가능,냥냥이 보유,힐링','제주특별자치도 서귀포시 남원읍 공천포로 63','신례리, 공천포올레게스트하우스',33.2646258193542,126.640907286979,'남원읍',NULL),(3,'1MM 게스트하우스',12,'kares64@gmail.com','010-2214-1583','<p>소개 :&nbsp;</p><p>※ 1미리는 2022년 7월 1일 부터 나이제한 합니다.</p><p>1미리 방문자 99%가 20~30대로 부득이하게 39세 까지만 예약 받습니다.</p><p><br></p><p>제주도 서쪽 협재해변 근처 돌담 골목 안에 위치한 정원 13명의 작고 소박한 제주 감성을 간직한 게스트하우스 입니다.</p><p>매일밤 모닥불 앞에서 소소한 소통을 즐기고 라운지에서 포틀럭 파티로 친목을 다질 수 있으며 사람 좋아하는 귀여운 마당냥이와의 만남이 즐거운 숙소 입니다 :)</p><p><br></p><p>※ 1미리는 작고 아담한 제주 구옥을 리모델링하여 제주의 감성을 충족시켜 주며 모닥불, 포틀럭파티, 사람 친화적인 고양이들이 있는 즐거운 숙소 입니다 :)</p><p><br></p><p>※ 불편사항</p><p>- 객실이 좁다고 느끼실 수 있습니다.</p><p>- 방음이 취약할 수 있습니다.</p><p>- 숙소에 공용 화장실겸 샤워실 남,녀 각 1개 입니다.</p><p>- 외부에 화장실겸 샤워실 남,녀 각 1개 있습니다.</p><p><br></p><p>조금의 불편함을 감수하시고 제주도 감성을 즐기시려는 분들은 환영합니다 :)</p><p>그렇지 않으신 분들은 보다 나은 숙소를 추천드립니다.ㅠ.ㅠ</p><p><br></p><p>※ 1미터게스트하우스의 최신 정보는 인스타그램 및 블로그를 통해서 확인하실 수 있습니다!</p><p>ID : 1mm_guesthouse</p><p>1mm_cat</p><p><br></p><p>※추억될 수 있는 숙소가 되겠습니다※</p><p><br></p><p>- 협재해수욕장과 걸어서 3분거리에 위치해 있습니다!</p><p><br></p><p>- 버스정류장 가까워요! 뚜벅이 여행자분들도 추천!</p><p><br></p><p>- 조식 제공! 토스트, 라면 셀프로 드실 수 있습니다!</p><p><br></p><p>- 전객실 슈퍼싱글베드</p><p><br></p><p>- 피그먼트 침구류</p><p>1. 천연 색소로 염색해 은은한 색감이 나고 부드러움</p><p>2. 알레르기, 아토피 등 민감한 피부에 자극이 없음</p><p><br></p><p>- 170g 호텔 수건 2장 제공</p><p><br></p><p>- 전 베드 개인 콘센트</p><p><br></p><p>- 샴푸, 린스, 바디워시, 치약 제공</p><p><br></p><p>- 분위기 최고 편안한 라운지</p><p>(식사, 음료, 음악, 책, 플스, 보드게임, 영화 편하게 이용하세요)</p><p><br></p><p>- 내부 남, 여 개별 화장실겸 샤워실 / 외부 남, 여 공용 화장실겸 샤워실</p><p><br></p><p>- 주인이 직접 운영하고 있으며</p><p>안전한 게스트하우스 만들기위해</p><p>노력하고있습니다</p><p>(CCTV설치, 세스코 관리, 여자방과 여자화장실 비상벨 설치)</p><p><br></p><p>Area : 한림읍</p>','빠른 일처리,열정,아침형 인간,꼼꼼','제주특별자치도 서귀포시 남원읍 태위로115번길 3','위미리, 수심1미터게스트하우스앤카페',33.2751915330172,126.659739401253,'남원읍','2023-02-16'),(4,'핸섬게스트하우스',13,'jalee4930@gmail.com','010-5587-4930','<p>주소 : 제주 서귀포시 대정읍 비자낭로 23</p><p><br></p><p>소개 :&nbsp;</p><p>※필독사항※</p><p>핸섬게하는 조용한 쉼이 있는 클래식한 게스트하우스 입니다. 밤 11시 소등시간 이후 외출 불가능하고 다른 분들을 위해 정숙 부탁드립니다. 밤새 놀고 싶으신 분들은 예약을 피해주세요. 감사합니다.</p><p>* 전화문의는 응답이 어렵습니다. 문자 남겨주시면 빠르게 확인하고 답장 드리겠습니다.</p><p>* 현재 코로나로 인해 파티 및 저녁 모음은 절대 금지됩니다. 마스크를 벗고 식음도 불가능하오니 저녁은 외식을 추천드립니다. 게하 앞에 우수수라는 펍이 있어 간단한 저녁식사나 음주 가능한 점 알려드립니다.</p><p><br></p><p>※예약방법※</p><p>1) 예약신청 (인원과 날짜 체크 꼭 확인, 따로 문자 안나감)</p><p>2) 바로 입금 (신청 후 12시간 내 &lt;신한 110-454-820864 고기석&gt;으로 입금)</p><p>3) 오소소에서 확인 후 입금 순 확정 (문자와 네이버알림에서 확인 가능)</p><p>*확정 문자는 입금 후 6시간 이내에 드립니다. (신청만으로 확인문자 드리지 않습니다.) 밤 22시 이후 입금은 다음날 확정됩니다.</p><p>*당일 예약의 경우 1시간 내로 입금하셔야 예약 확정됩니다.</p><p>*예약 신청하신 후 입금을 하셔야 확정이 되며 무조건 신청 순이 아닌 입금 순으로 확정됩니다.</p><p><br></p><p>※이용안내※</p><p>*입실시간은 오후 3시 이후이며 퇴실시간은 다음날 오전 11시입니다. 연박하시는 분들도 청소시간에는 머무실 수 없습니다.</p><p>*11시 소등을 원칙으로 운영하고 있습니다. 12시 이후 출입이 통제됩니다. 11시 이후에는 보안상의 이유로 객실 문을 잠그기 때문에 들어오실 수 없으니 유의해주세요.</p><p>*숙소 안에서는 음식물 및 주류 반입이 금지되고 냉장고와 정수기만 정수기만 있습니다. (숙소 내에서 섭취 흔적이 발견되면 퇴실 조치 및 클리닝 비용 청구할 수 있습니다).</p><p>*무분별한 음주로 다른 분들의 휴식과 여행을 방해하시는 분들은 정중히 숙박을 사양합니다. 게스트하우스 내 소주 및 독주 절대 반입 금지입니다. 이를 어길시에 입실 거부 및 퇴실 될 수 있습니다.</p><p><br></p><p>*제주도에 늦게 도착하시는 분들에 한해 고산환승정류장에서 픽업 가능합니다. 꼭 하루 전에까지 미리 신청하셔야 합니다.</p><p>*저희는 1-2명의 여행객을 위한 소규모 숙소입니다. 이를 어기고 따로 예약을 하신 2명 이상의 일행분들이 계신다면 입실일에 퇴실 조치하겠습니다.(초과 인원 1명 50%환불만 가능, 방을 따로 쓰는 것도 안됩니다.) 소외감을 느끼는 분위기를 만들고 싶지 않은 마음이니 이해 부탁드립니다.</p><p>* 환불규정: 방문당일,1일전 0%환불 / 2-3일전 10% 환불 / 4-7일전 50% 환불 / 8-9일전 70%환불 / 그 전 환불 요청은 100% 전액 환불입니다. (네이버예약 취소만으로는 환불이 안됩니다. 꼭 계좌번호를 문자로 주셔야 합니다.) 천재지변으로 인한 취소는 증빙서류 보내주시면 전액 환불됩니다.</p><p>* 안전상의 문제로 공용공간에는 CCTV를 설치하였고 녹화가 되고 있습니다. 방은 보이지 않으니 걱정 마세요.</p><p><br></p><p><br></p>','마운틴뷰,교통 편리,재밌는 게하','제주특별자치도 서귀포시 대정읍 비자낭로 23','신도리 핸섬게스트하우스',33.2854186295296,126.183793948489,'대정읍','2023-02-16'),(5,'몬스터게스트하우스',14,'yejinlee0707@gmail.com','010-6430-9492','<p>소개 :&nbsp;</p><p>* 40세 이상(2023년 기준 1984년생 부터)일 경우 예약이 불가합니다. 짧지 않은 운영 기간동안 많은 고충이 있어 심사숙고 끝에 내리게 된 결정으로 많은 양해 부탁드립니다.</p><p>-&gt; 체크인 시 모든 분들의 신분증을 확인하고 있습니다. 입실 시 40세 이상 일 경우 환불 없이 입실 불가함을 사전 고지 드립니다.</p><p><br></p><p>[예약 전 고려사항]</p><p><br></p><p>1. 게스트 하우스는 공용 공간으로 숙박객이 많은 경우 화장실 사용에 불편함 혹은 코를 고는 분들이 계실 수도 있습니다. 이러한 부분까지는 저희가 해결해 드릴 수 없어 예약 전 참고 해주세요.</p><p><br></p><p>2. 소등 시간 이후 외부 출입은 자유이나 타인을 위해 배려 하는 마음을 가저주세요. 문은 살짝, 발걸음은 가볍게 ,샤워 시 음악 틀지 않기 !</p><p><br></p><p>3. 공항 근처에 있어 오전 6시 이후 비행기 소음이 클 수 있습니다.</p><p><br></p><p>4. 호텔만큼의 편안함, 조용함을 원하신다면 예약을 삼가해주세요. 게스트 하우스는 공용 공간임을 인지해주세요.</p><p><br></p><p>5. 3인 이상 예약 시 파티 참석 필수로 예약 시 참고 부탁드립니다.</p><p><br></p><p>6. 미성년자는 예약이 불가합니다.</p><p><br></p><p>[여성 전용 무료 셔틀 버스 안내]</p><p><br></p><p>점보네 게스트 하우스 &gt; 제주공항</p><p>제주공항 &gt; 점보네 게스트 하우스</p><p><br></p><p>: 해당 서비스는 외부 업체로 카카오톡 \'라봉제주\' or \'라봉 in JEJU\' 채널로 문의 부탁드립니다.</p><p><br></p><p>[디너 와이너리 파티 안내]</p><p><br></p><p>- 매일 저녁 19시부터 22시까지 와인 파티가 진행됩니다.</p><p>(에그인헬,감바스, 피자, 필라프, 샹그리아와인 1병, 보드카 1바틀 등 양식 위주의 식사 제공, 음식은 상황에 따라 변동 될 수 있어요.) .</p><p><br></p><p>- 파티 참석을 하지 않아도 바는 이용 가능합니다. 언제든 편안하게 이용 해주세요.</p><p><br></p><p>- 성비 문의, 참여 인원 문의에 답변 드리지 않습니다,</p><p><br></p><p>[입실 관련 안내]</p><p><br></p><p>* 체크인 : 17:00 , * 체크아웃 : 12:00</p><p><br></p><p>- 체크인은 23시까지 가능합니다. 더 늦으시는 경우 미리 말씀해주세요.</p><p><br></p><p>* 보안 : 도어락 및 출입문 바로 앞 CCTV가 설치되어 있습니다.</p><p><br></p><p>* 구비물품 : 수건, 드라이기 , 고데기(여성층), 샴푸, 린스, 바디워시 등등</p><p><br></p><p>- 문의 및 예약 : 010 7217.0716</p><p>( 너무 이른 아침 , 늦은 새벽 전화는 피해주세요.)</p><p><br></p><p>[이용 안내]</p><p><br></p><p>1 겍실 내 음주, 취식, 흡연, 음식물 반입은 일체 금지됩니다. 적발 시 벌금 10만원 및 즉시 퇴실 조치 되오니 주의 해주세요.</p><p><br></p><p>2. 침구류 오염 및 기물 파손 시 별도의 벌금이 부과 됩니다.</p><p><br></p><p>* [환불 규정 안내]</p><p><br></p><p>* 이용 10일 이전 : 전액 환불</p><p>* 이용 9일 전 ~ 6일 전 : 70% 환불 가능</p><p>* 아용 5일 전 ~ 4일 전 : 40% 환불 가능</p><p>* 이용 3일 전 ~ 이용 당일 : 환불 불가</p><p><br></p><p>- 숙박비 및 저녁 식사 비용 환불규정이 동일합니다.</p><p>- 저녁 식사 비용의 경우 예약금 개념으로 적용되고 있습니다.</p><p>- 예약 변경 시 기존 예약 날짜 기준으로 환불 규정이 적용 됩니다.</p><p>- 천재 지변으로 인한 항공기 결항 시 환불은 어려우며 결항 확인서 확인 후 2주 이내로 예약 날짜 변경으로 가능합니다.</p><p>(입도일 기준이 아닌 입실일 기준)</p><p><br></p><p>areaName : 제주시</p>','서핑 가능,재밌는 게하','제주특별자치도 제주시 용마서1길 36','용담삼동 몬스터게스트하우스',33.5162014148734,126.505908265043,'제주시','2023-02-16'),(6,'뿌셔게스트하우스',15,'sbsggg03@naver.com','010-5587-8645','<p>DJ 파티를 해요</p><p>시끄러운 게 싫으신 분들은 예약을 피해주세요!</p><p><br></p><p>1. 도미토리제외전객실2인실</p><p>2. 중문 클럽파티</p><p>3. 수영장 버블 풀파티</p><p>4. 아침오름투어스냅촬영</p><p>5. 서핑패키지</p><p>6. 5M스킨스쿠버다이빙</p><p>간장남들</p><p>010-9375-9219</p><p><br></p><p>놀 준비 없이 오시면 안돼요!</p><p>나중에 불만 싫어요!</p><p><br></p><p>ep.1 간장남들 게스트하우스</p><p>ep.2 간장남들 여인숙(Pub)</p><p>ep.3 간장남들 펜션</p><p>ep.4 에간장 vip bar</p><p>ep.5 에간장 라운지 pub</p><p>ep.6 스테이상상 복합 문화 라운지</p><p>ep.7 유니온 cafe</p><p>ep.8 한모 루프탑 펜션</p><p>ep.9 중문사계 제주도간장남들</p><p><br></p><p>&lt; PARTY NOTICE &gt;</p><p><br></p><p>365일 평일과 주말 구분 없이 매일매일 진행 되는 만실 파티!</p><p>간장남들은 다른 게스트하우스와 차원이 다른 파티를 진행 하고 있습니다.</p><p><br></p><p>TIME : PM 20:00 - PM 11:00</p><p>※ 파티 시간을 꼭!! 지켜주세요 행사 음식이 줄어들 수 있습니다.</p><p><br></p><p>PLACE : 주형 라운지 (인스타그램 참고)</p><p><br></p><p>PRICE : 25,000원 (1인 기준)</p><p><br></p><p>* 이용일 전 날 안내 문자 발송해드려요, 미리 입금을 해주셔야 참석이 가능합니다.</p><p><br></p><p>* 2차 접종자 분들만 라운지 펍 이용 가능합니다 (최대 4명)</p><p><br></p><p>* 입금 후 입금자명과 방문날짜를 반드시 답장 해주세요 :) (음식을 미리 준비 하기 때문이니 양해 부탁 드립니다)</p><p><br></p><p>* 안전운영 상 펜션 등 다른 숙박업소와 중복으로 예약 하시고 이를 악용하여 파티만 참석 하시려는 분 들은 발각 시 바로 환불없이 퇴실조치 하오니 양해바랍니다.</p><p><br></p><p>* 석식 미신청 게스트의 경우 라운지펍 이용이 제한됩니다. 외부 음식을 사오셔서 야외 마당 이용해주시면 감사하겠습니다.</p><p><br></p><p>* 라운지 펍 입장 시, 자리는 랜덤 지정되며 신분증을 꼭 지참해주시기 바랍니다. 미지참 게스트는 입장이 불가능 합니다.</p><p><br></p><p>* 일반음식점허가 게하로 주류는 판매하고 있습니다. 외부 주류의 반입을 금하고 있으니 참고 부탁드립니다.</p><p><br></p><p>환불규정</p><p>- 열흘 후 취소는 100%</p><p>- 열흘 전 취소는 50%</p><p>- 3일 ~ 당일 취소는 0% 입니다.</p><p><br></p><p>&lt;이용 안내&gt;</p><p><br></p><p>1. 럭셔리한 인테리어 감성</p><p><br></p><p>2. 파티! 파티! 파티!</p><p><br></p><p>3. 테이크아웃 서비스</p><p><br></p><p>4. 수영장 파티</p><p><br></p><p>5. 건물 내, 외부 CCTV 30대 안전 운영중</p><p><br></p><p>1. 주소 : 제주특별자치도 서귀포시 안덕면 사계북로41번길 30</p><p><br></p><p>* 대중교통 이용 시, 제주공항에서 152번 버스 탑승 후 \'사계리사무소\' 버스정류장 하차하셔서 전화 주시면 친절하게 픽업 갑니다!</p><p><br></p><p>2. 입, 퇴실 시간</p><p><br></p><p>Login in - 6</p><p>Log out - 12</p><p><br></p><p>3. 주의사항</p><p><br></p><p>* 전 객실, 객실 내 음주 및 음식물 섭취 불가</p><p><br></p><p>* 건물 내 금연 (위반시 즉시 미환불 및 퇴실 조치)</p><p><br></p><p>* 침구류 오염 시, 룸 클리닝 비용 최소 10만원 입니다.</p><p><br></p><p>* 개인 귀중품은 체크인 시 직원에게 보관해주세요. 단지 내 분실 시, 책임지지 않아요!</p>','서핑 가능,재밌는 게하,픽업 가능','제주특별자치도 서귀포시 안덕면 사계북로41번길 30','몬스터 게스트하우스',33.2361126635716,126.295200390638,'안덕면','2023-02-16'),(7,'울트라 게스트',18,'ssafy.jaewook@gmail.com','01066387338','<p>?제주1위?파티1위?예약1위?</p><p>?애월 365일매일 생맥주 무제한 육해공파티?</p><p>❌14년동안 파티1위 유지❌최대 대규모파티</p><p>❌매일만실❌미리예약❌파티만참석가능</p><p>❌90명수용호텔객실</p><p>✅ 파티비 2만5천원, 여성할인 2만원 ✅</p><p><br></p><p>20~30대 짝꿍없는 미혼의 청춘들~</p><p>생맥주 1시간 무제한과 호텔쉐프가 직접만든 맛있는 안주로 정보공유와 즐겁고 핫한 시간을~❤️</p>','오션뷰,교통 편리,서핑 가능,파티','제주특별자치도 제주시 애월읍 일주서로 6158','애월리  2443-2',33.4592739520701,126.31238355628,'애월읍','2023-02-16');
/*!40000 ALTER TABLE `guest_houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `post_type` varchar(25) NOT NULL,
  `post_uid` bigint NOT NULL,
  `img_path` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'TRAVEL_PLACE',3,'image/TRAVEL_PLACE/60e3d05d-fa1a-4105-a474-84b541df79fa_981파크제주.jpg'),(2,'REVIEW',2,'image/REVIEW/b2bd4d7f-09aa-4ebb-a10f-60258f44baac_리뷰1-1.jpg'),(3,'REVIEW',2,'image/REVIEW/70dfd73b-005b-4ac6-99f9-73277e2c0d9d_리뷰1-2.jpg'),(4,'REVIEW',2,'image/REVIEW/6ae95e7b-224d-47a3-ab6d-a4c561f115d8_리뷰1-3.jpg'),(5,'TRAVEL_PLACE',4,'image/TRAVEL_PLACE/fef7dcff-d180-43aa-a43d-328bfc5fdbc8_1100고지 명소사진.jpg'),(6,'REVIEW',3,'image/REVIEW/8aaf4a59-bcdb-463a-950e-b8482e967296_리뷰1-1.jpg'),(7,'REVIEW',3,'image/REVIEW/63778a1f-6794-4a5c-adcf-c95ae1f8490a_리뷰1-2.jpg'),(8,'REVIEW',3,'image/REVIEW/701c6fa4-e6e0-49c1-bf4b-10025c67bc46_리뷰1-3.jpg'),(9,'REVIEW',3,'image/REVIEW/759fb25e-2217-4857-8584-3a80a7eb4938_리뷰1-4.jpg'),(10,'TRAVEL_PLACE',5,'image/TRAVEL_PLACE/c4ed7e27-d900-4f6c-a228-8a3d525c9aec_고집돌우럭 명소 사진.jpg'),(11,'REVIEW',4,'image/REVIEW/6c0db9f7-66b5-46b6-be3d-98ee6b403269_리뷰1-1.jpg'),(12,'REVIEW',4,'image/REVIEW/d1998d8f-1bf2-4353-9fac-086d98d8b4d4_리뷰1-2.jpg'),(13,'REVIEW',4,'image/REVIEW/f317d238-c14d-4f55-bd03-aaa9073593b3_리뷰1-3.jpg'),(14,'TRAVEL_PLACE',6,'image/TRAVEL_PLACE/94b7da7e-7af5-4f81-909d-a8ae2036c250_남양수산 명소사진.jpg'),(15,'REVIEW',5,'image/REVIEW/e46a2e5a-6a4d-49bb-8337-1c43e37b435f_리뷰1.jpg'),(16,'REVIEW',5,'image/REVIEW/493d4453-8c3e-417f-b979-48ca5b5d80ea_리뷰2.jpg'),(17,'TRAVEL_PLACE',7,'image/TRAVEL_PLACE/d01cf52c-6aba-4b7f-99c2-3078c3b0398b_다랑쉬오름 명소 사진.jpg'),(18,'REVIEW',6,'image/REVIEW/5e102814-f152-4802-a2b2-2d0a50cda8a4_리뷰1-1.jpg'),(19,'REVIEW',6,'image/REVIEW/2823a5d6-0041-41c6-a43d-b510906b0e8b_리뷰1-2.jpg'),(20,'REVIEW',6,'image/REVIEW/60574fba-09e7-4cbe-a681-c54515eae9f1_리뷰1-3.jpg'),(21,'TRAVEL_PLACE',8,'image/TRAVEL_PLACE/85a4e766-12cc-4941-aa3b-584f5e93e547_메이즈랜드 명소사진.jpg'),(22,'TRAVEL_PLACE',9,'image/TRAVEL_PLACE/6cd5b297-4b01-4447-8c85-711dcf96b414_바그다드 명소사진.jpg'),(23,'TRAVEL_PLACE',10,'image/TRAVEL_PLACE/c84ce0fe-809d-4ec2-8c78-6316a8eaf310_백록담 명소 사진.jpg'),(24,'TRAVEL_PLACE',11,'image/TRAVEL_PLACE/2492eacc-de5d-44c2-a501-592e338e479b_비자림 명소사진.jpg'),(25,'TRAVEL_PLACE',12,'image/TRAVEL_PLACE/ec76e548-fa8f-493e-b1aa-a97982498b9f_빛의벙커 명소 사진.jpg'),(26,'TRAVEL_PLACE',13,'image/TRAVEL_PLACE/b933ed16-105f-423a-a195-058db93fa715_산방산온천 명소 사진.jpg'),(27,'TRAVEL_PLACE',14,'image/TRAVEL_PLACE/487105e3-677b-46d6-9feb-594daf0f8b69_새별오름 명소 사진.jpg'),(28,'TRAVEL_PLACE',15,'image/TRAVEL_PLACE/7bbec881-bc83-4bfd-b4b3-20ed60b95d55_성산일출봉 명소사진.jpg'),(29,'TRAVEL_PLACE',16,'image/TRAVEL_PLACE/752d769d-f8d5-4b3a-b72c-bbdba8dcade5_쇠소깍 명소 사진.jpg'),(30,'TRAVEL_PLACE',17,'image/TRAVEL_PLACE/68ed4c25-4cb8-4ad9-87c1-719f97ef0476_숙성도 명소 사진.jpg'),(31,'TRAVEL_PLACE',18,'image/TRAVEL_PLACE/d96f9799-44d3-4d18-86d2-e26aeaa6816a_스누피가든 명소 사진.png'),(32,'TRAVEL_PLACE',19,'image/TRAVEL_PLACE/97836770-4d4c-433a-8062-1fea7ddfb9f0_아프리카 박물관 명소사진.jpg'),(33,'TRAVEL_PLACE',20,'image/TRAVEL_PLACE/bc30cfff-e0b6-4ef1-a336-99ed3093a3ab_엉또폭포 명소사진.jpg'),(34,'TRAVEL_PLACE',21,'image/TRAVEL_PLACE/b6855a8a-3d01-48b3-a392-f07067249eca_오설록 명소 사진.jpg'),(35,'TRAVEL_PLACE',22,'image/TRAVEL_PLACE/6ca567e8-ab80-4be2-b2e5-3e26a608def1_용머리해안 명소사진.jpg'),(36,'TRAVEL_PLACE',23,'image/TRAVEL_PLACE/497e7d77-e86d-4b6e-bdf0-f8ba2990bbb6_우도 명소사진.jpg'),(37,'TRAVEL_PLACE',24,'image/TRAVEL_PLACE/ef3cbf3d-4b52-4006-81cd-e96e9ae16908_월정리 명소사진.jpg'),(38,'TRAVEL_PLACE',25,'image/TRAVEL_PLACE/ad49675c-746c-474b-bbda-d73f1124c91e_정방폭포 명소사진.jpg'),(39,'TRAVEL_PLACE',26,'image/TRAVEL_PLACE/0619b314-8250-4abb-86cf-72a0e88bd721_제주김녕미로공원 명소사진.jpg'),(40,'TRAVEL_PLACE',27,'image/TRAVEL_PLACE/a23c4ff3-d6a3-425b-954c-887ed4695533_제주신라호텔 명소사진.jpg'),(41,'TRAVEL_PLACE',28,'image/TRAVEL_PLACE/744c458a-2213-4717-bf59-299361584628_주상절리 명소 사진.jpg'),(42,'TRAVEL_PLACE',29,'image/TRAVEL_PLACE/c39d153d-ca69-44c1-968c-e239d02a9703_중문수두리보말칼국수.jpg'),(43,'TRAVEL_PLACE',30,'image/TRAVEL_PLACE/4d2c9ba8-c2ca-413a-b3f3-e420dbbca505_천제연폭포 명소사진.jpg'),(44,'TRAVEL_PLACE',31,'image/TRAVEL_PLACE/91211850-32f6-4e7a-845a-835508a82925_천지연 폭포 명소사진.jpg'),(45,'TRAVEL_PLACE',32,'image/TRAVEL_PLACE/679cb8fa-3876-4098-903e-31fc3758c55d_카페바나나 명소 자진.jpg'),(46,'TRAVEL_PLACE',33,'image/TRAVEL_PLACE/ac2955d0-4f6e-4a13-a978-281c71f01821_테디베어 뮤지엄 명소사진.jpg'),(47,'TRAVEL_PLACE',34,'image/TRAVEL_PLACE/02326f18-773e-4bc8-bb6e-e2b5636b806a_토끼섬 명소 사진.jpg'),(48,'TRAVEL_PLACE',35,'image/TRAVEL_PLACE/2104a8d9-c5d9-4a86-bc32-61e55478b91b_표선 해녀의 집 식당 명소 사진.jpg'),(49,'TRAVEL_PLACE',36,'image/TRAVEL_PLACE/2ed93cdb-b01a-40eb-9f6b-6c0a263fe2b8_몽상드애월 명소사진.jpg'),(50,'TRAVEL_PLACE',37,'image/TRAVEL_PLACE/7ca0ab9a-b245-4d2d-97a6-9a7514d5b668_제주민속촌 명소 사진.jpg'),(51,'REVIEW',7,'image/REVIEW/0fc2529a-f401-4a84-8741-2f92e00d72b5_리뷰1-2.jpg'),(52,'REVIEW',7,'image/REVIEW/8172c38b-ce10-4d05-8582-1da414ac6b4d_리뷰1-3.jpg'),(53,'REVIEW',7,'image/REVIEW/3875dd52-4d99-453a-b3f8-95966f96d471_리뷰1-1.jpg'),(54,'REVIEW',8,'image/REVIEW/17b2921a-b6d6-446f-88cf-bb1f26fd9e61_리뷰2-3.jpg'),(55,'REVIEW',8,'image/REVIEW/469db19c-c29e-4d6e-a93b-d954d5763126_리뷰2-1.jpg'),(56,'REVIEW',8,'image/REVIEW/8a59393c-ef76-4da5-ae4f-87b9a9558683_리뷰2-2.jpg'),(57,'REVIEW',9,'image/REVIEW/75327710-d3ba-4af3-8ddd-14110dd568cc_리뷰1-1.jpg'),(58,'REVIEW',9,'image/REVIEW/5e8082da-0704-4b00-aa5a-4106f022dc9c_리뷰1-2.jpg'),(59,'REVIEW',9,'image/REVIEW/1dca7137-3026-4dbd-9cfe-f0c0d0aed32a_리뷰1-3.jpg'),(60,'REVIEW',9,'image/REVIEW/faa152e6-2bd8-45dc-b220-326f30d146ec_리뷰1-4.jpg'),(61,'REVIEW',10,'image/REVIEW/354cd8ea-8c45-4e49-b9cf-a6871d4f9a2c_리뷰1-1.jpg'),(62,'REVIEW',10,'image/REVIEW/2a526aed-86fa-4758-8f35-ef11f81ca497_리뷰1-2.jpg'),(63,'REVIEW',10,'image/REVIEW/ddb15056-588f-496f-b711-64147369e3e4_리뷰1-3.jpg'),(64,'REVIEW',11,'image/REVIEW/609ae7c8-57d0-4fa8-82c4-6fa62c86385a_리뷰1-3.jpg'),(65,'REVIEW',11,'image/REVIEW/b6a2ee44-4a58-4114-891a-da73cd97fd7e_리뷰1-1.jpg'),(66,'REVIEW',11,'image/REVIEW/4a128e6a-4e52-4aa5-ab05-46f29e5ba186_리뷰1-2.jpg'),(67,'REVIEW',12,'image/REVIEW/4a0cb10e-93c6-4bda-9b31-152d2bfab026_리뷰1-1.jpg'),(68,'REVIEW',12,'image/REVIEW/3f3c5edd-1fd0-49cb-8d45-53cf1dfe567c_리뷰1-2.jpg'),(69,'REVIEW',12,'image/REVIEW/a8210e68-cee7-4e52-85da-2f0a65911682_리뷰1-3.jpg'),(70,'REVIEW',13,'image/REVIEW/dee71be4-328b-4a21-ae41-12d733267156_리뷰1-3.jpg'),(71,'REVIEW',13,'image/REVIEW/1d1b3405-57f7-4c55-b06f-c52c4b1ef6e8_리뷰1-4.jpg'),(72,'REVIEW',13,'image/REVIEW/5c8732f4-ff00-4571-9ca8-467c3bc673cc_리뷰1-1.jpg'),(73,'REVIEW',13,'image/REVIEW/6a8a78a3-cec5-45ec-b4d4-8aaa22c980e4_리뷰1-2.jpg'),(74,'REVIEW',14,'image/REVIEW/020fc7d1-6d3f-49a5-98ef-ed101472722b_리뷰2-3.jpg'),(75,'REVIEW',14,'image/REVIEW/42f65f06-313a-4575-8e6b-d0bd8856b54c_리뷰2-1.jpg'),(76,'REVIEW',14,'image/REVIEW/f179f6bf-f16c-4144-9041-447c4d6635cd_리뷰2-2.jpg'),(77,'REVIEW',15,'image/REVIEW/37916432-cb1b-4d2a-9d24-907f0422a2e2_리뷰2-3.jpg'),(78,'REVIEW',15,'image/REVIEW/84ac8eab-8bdd-4b3c-8c10-f6ecd35b8e2d_리뷰2-1.jpg'),(79,'REVIEW',15,'image/REVIEW/ffcc35d6-3cec-4af1-8dde-8663eb638559_리뷰2-2.jpg'),(80,'REVIEW',16,'image/REVIEW/a25ca43b-f6d7-47ac-bb68-bc9e9e9f9652_리뷰1-3.jpg'),(81,'REVIEW',16,'image/REVIEW/4a6218b3-9ba0-4636-84de-18d4ef1772c9_리뷰1-1.jpg'),(82,'REVIEW',16,'image/REVIEW/46b36e5e-8868-4ed1-ae97-07dadd9993eb_리뷰1-2.jpg'),(83,'REVIEW',17,'image/REVIEW/9fca0718-b0a8-48f0-8990-94dde9e0ebee_리뷰1-1.jpg'),(84,'REVIEW',17,'image/REVIEW/548a1ea2-0c8d-4110-99a1-685c72cfc7dc_리뷰1-2.jpg'),(85,'REVIEW',17,'image/REVIEW/a25d5004-cdbe-4680-8af0-c83335f5569e_리뷰1-3.jpg'),(86,'REVIEW',17,'image/REVIEW/7c7d2d5f-2fd5-4fce-bea4-5c734090eb18_리뷰1-4.jpg'),(87,'REVIEW',18,'image/REVIEW/20274cfa-e16e-4395-8b9d-ad9642a59abd_리뷰1-1.jpg'),(88,'REVIEW',18,'image/REVIEW/470a213f-fb25-4ab3-9b9b-76e70e53fab3_리뷰1-2.jpg'),(89,'REVIEW',18,'image/REVIEW/48f1b466-19ac-4d63-8ab8-b4e5c86612dd_리뷰1-3.jpg'),(90,'REVIEW',19,'image/REVIEW/83caac8a-c54a-4530-aa24-ae6888e2fbaa_리뷰1-1.jpg'),(91,'REVIEW',19,'image/REVIEW/00c46e8e-6a2a-4beb-8298-66ff1ed78f71_리뷰1-2.jpg'),(92,'REVIEW',19,'image/REVIEW/6b8f55a0-5528-4e22-9829-d0fb25933e6b_리뷰1-3.jpg'),(93,'REVIEW',20,'image/REVIEW/47e22499-9317-4061-8994-f441b615cdfe_리뷰2-4.jpg'),(94,'REVIEW',20,'image/REVIEW/76cf2f09-c7de-4a54-a3e9-904cd423fa5e_리뷰1-1.jpg'),(95,'REVIEW',20,'image/REVIEW/22b20687-6ea7-4f4d-b68d-db2edf657e63_리뷰2-2.jpg'),(96,'REVIEW',20,'image/REVIEW/0103c25c-a737-4527-9b31-4e2e83011d57_리뷰2-3.jpg'),(97,'REVIEW',21,'image/REVIEW/72eaa028-92a3-4e03-a43d-0d9453d4e2f4_images (1).jpg'),(98,'REVIEW',21,'image/REVIEW/76eeed04-cc6d-4e0f-836c-1458c526ff01_images.jpg'),(99,'REVIEW',21,'image/REVIEW/ca0a8b6f-8498-4c13-9bfd-4635c5c9bf77_FILE686aae8556a44ef1.jpg'),(100,'REVIEW',22,'image/REVIEW/b6e96d73-9a2e-4c38-8476-07f624fa9c8c_aaaa.jpg'),(101,'REVIEW',22,'image/REVIEW/b4c9b96f-79a4-400e-ba15-3c7ef216b561_aaaa2.jpg'),(102,'REVIEW',22,'image/REVIEW/8760a951-1a51-4870-b983-e50f311b3e24_aaaa3.jpg'),(103,'REVIEW',22,'image/REVIEW/842abe80-4af4-47b9-b717-f93fe94c47dd_aaaaaaa.jpg'),(106,'GUEST_HOUSE',2,'image/GUEST_HOUSE/b4860c3c-d088-41e0-808b-080b5a40f581_37DD11A9-1362-4515-93CD-F460DFDA5905.jpeg'),(107,'GUEST_HOUSE',2,'image/GUEST_HOUSE/27b2f3fe-e2f5-4a7a-bec9-09b933940efc_d3duI6dEUZfQSmL3gJg52aqz.jpg'),(108,'GUEST_HOUSE',2,'image/GUEST_HOUSE/1f76e81f-f1ef-46f8-bda8-7f0fefb11c9e_yFjxymGuGndQJjgS91nHX_rB.jpeg.jpg'),(109,'GUEST_HOUSE',3,'image/GUEST_HOUSE/1a38f5a8-7fe2-4319-8172-27472e21e448_KakaoTalk_20211213_175655854_09.jpg'),(110,'GUEST_HOUSE',3,'image/GUEST_HOUSE/5ef0dee6-8a15-410f-9d03-dd1a092d35c8_KakaoTalk_20211213_175723487_05.jpg'),(111,'GUEST_HOUSE',3,'image/GUEST_HOUSE/b1284d63-c1a8-4ea3-a61c-fd727880398b_KakaoTalk_20230215_020743015.jpg'),(112,'GUEST_HOUSE',1,'image/GUEST_HOUSE/f08030d7-a601-4131-882b-7ae1f5264f35_다운로드.jpg'),(113,'GUEST_HOUSE',1,'image/GUEST_HOUSE/c2f5b8bb-c20e-47a3-80b3-bc8321d64197_PXL_20230125_090448476.jpg'),(114,'GUEST_HOUSE',1,'image/GUEST_HOUSE/b332ee63-398f-4ad5-a297-395a613a206d_webmate_9945.jpg'),(115,'GUEST_HOUSE',4,'image/GUEST_HOUSE/31b14013-c6b0-4b19-b838-d19cb1486fb1_safsdafsadf.jpg'),(116,'GUEST_HOUSE',4,'image/GUEST_HOUSE/c09f9e21-4491-4338-9783-aa5aa94b5f28_lLmvSF1np221Li6qR-c_Bbz2.JPG.jpg'),(117,'GUEST_HOUSE',5,'image/GUEST_HOUSE/c8c7c2af-0b0a-40d7-be71-dd4b387f77ff_다운로드.jpg'),(118,'GUEST_HOUSE',6,'image/GUEST_HOUSE/17fa997b-c9cd-48f2-97d2-924649a214ef_8ABEE38C-2DA9-4CBB-B077-F69BA64FC645.jpeg'),(119,'GUEST_HOUSE',6,'image/GUEST_HOUSE/ad7fbd45-8de7-446a-8deb-4046a3ea1401_CR3cmPkmx-7IoXYA13rzS4Ir.jpg'),(120,'REVIEW',23,'image/REVIEW/833a46fa-3e23-45c8-b63a-7fe4360ed95a_img.jpg'),(121,'RECRUITMENT',1,'image/RECRUITMENT/8d1cecbb-7e90-4eda-81a6-89b5a91bee6e_800px-thumbnail.jpg'),(122,'GUEST_HOUSE',7,'image/GUEST_HOUSE/edf37ae0-d3c4-4f90-ad5c-a7e149d28e96_1661429301749.jpg'),(123,'GUEST_HOUSE',7,'image/GUEST_HOUSE/23f44909-ad5f-4d9e-84a6-5c9b7836654a_20220330_212452.jpg'),(124,'GUEST_HOUSE',7,'image/GUEST_HOUSE/a22b358c-ddb6-4575-ac65-22e01174a7dc_20220320_185558.jpg'),(125,'RECRUITMENT',3,'image/RECRUITMENT/8e2aa801-2d15-4e1a-8ba8-eb8dbce0e921_image.jpg'),(126,'RECRUITMENT',3,'image/RECRUITMENT/2a9f1cb0-03a8-48b4-a18d-89553c379904_D198EEB2-DF38-42FA-A5E3-F9DD50B44D32.jpeg'),(127,'RECRUITMENT',4,'image/RECRUITMENT/8b399aca-709e-4eed-9df7-bff4d63bc6d9_캡처.PNG'),(128,'RECRUITMENT',4,'image/RECRUITMENT/fbef26a9-ed94-4bfe-88f3-18aea02654ae_캡처1.PNG'),(129,'REVIEW',24,'image/REVIEW/16d960ae-a57d-4e04-a161-f61b3c3ade49_zzzz1.jpg'),(130,'REVIEW',24,'image/REVIEW/c9e15cbc-49b7-4610-9f98-499f8f290826_zzzz2.jpg'),(131,'REVIEW',24,'image/REVIEW/ffe136e7-2100-4e4c-ad57-8b4ac056bcb4_zzzzz.jpg'),(132,'REVIEW',25,'image/REVIEW/e22fe01f-5127-4882-8ddf-33168ecd37b8_김녕.png');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `performance_reviews`
--

DROP TABLE IF EXISTS `performance_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `performance_reviews` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance_reviews`
--

LOCK TABLES `performance_reviews` WRITE;
/*!40000 ALTER TABLE `performance_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `performance_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_types`
--

DROP TABLE IF EXISTS `person_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_types` (
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_types`
--

LOCK TABLES `person_types` WRITE;
/*!40000 ALTER TABLE `person_types` DISABLE KEYS */;
INSERT INTO `person_types` VALUES ('꼼꼼'),('대처 능력'),('빠른 습득'),('빠른 일처리'),('스탭 경험자'),('아침형 인간'),('열정'),('의사소통 기술'),('저녁형 인간'),('책임감'),('친절함'),('활발한 성격');
/*!40000 ALTER TABLE `person_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recruitment_person_type_join`
--

DROP TABLE IF EXISTS `recruitment_person_type_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recruitment_person_type_join` (
  `recruitment_uid` bigint NOT NULL,
  `type` varchar(50) NOT NULL,
  KEY `fk_recpertypjoi_on_person_type` (`type`),
  KEY `fk_recpertypjoi_on_recruitment` (`recruitment_uid`),
  CONSTRAINT `fk_recpertypjoi_on_person_type` FOREIGN KEY (`type`) REFERENCES `person_types` (`type`),
  CONSTRAINT `fk_recpertypjoi_on_recruitment` FOREIGN KEY (`recruitment_uid`) REFERENCES `recruitments` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recruitment_person_type_join`
--

LOCK TABLES `recruitment_person_type_join` WRITE;
/*!40000 ALTER TABLE `recruitment_person_type_join` DISABLE KEYS */;
INSERT INTO `recruitment_person_type_join` VALUES (1,'스탭 경험자'),(1,'활발한 성격'),(2,'스탭 경험자'),(3,'스탭 경험자'),(3,'의사소통 기술'),(3,'열정'),(4,'스탭 경험자'),(4,'꼼꼼'),(4,'열정'),(4,'책임감');
/*!40000 ALTER TABLE `recruitment_person_type_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recruitments`
--

DROP TABLE IF EXISTS `recruitments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recruitments` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `guest_house_uid` bigint DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `welfare` text,
  `add_info` text,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recruitments`
--

LOCK TABLES `recruitments` WRITE;
/*!40000 ALTER TABLE `recruitments` DISABLE KEYS */;
INSERT INTO `recruitments` VALUES (1,1,'게하 스탭 모집!','숙식 제공','파티 게하입니다. 활발하신분들 오시면 좋아요~','2023-02-16 08:43:49','2023-02-16 08:43:49'),(2,5,'남성스태프 2명 구합니다','하루3끼 제공, 일주일에 한번 스태프 고기파티','몬스터 게스트하우스와 함께 일하실분 구합니다.\n하루3끼 제공하고 스태프들만 즐길 수 있는 고기파티 일주일에 한번 합니다.','2023-02-16 08:45:38','2023-02-16 08:45:38'),(3,7,'울트라 게스트 하우스에서 스텝을 모집합니다.','식사제공, 주거제공, 서핑 강습 무료','?제주1위?파티1위?예약1위?\n?애월 365일매일 생맥주 무제한 육해공파티?\n❌14년동안 파티1위 유지❌최대 대규모파티\n❌매일만실❌미리예약❌파티만참석가능\n❌90명수용호텔객실\n✅ 파티비 2만5천원, 여성할인 2만원 ✅\n\n20~30대 짝꿍없는 미혼의 청춘들~\n생맥주 1시간 무제한과 호텔쉐프가 직접만든 맛있는 안주로 정보공유와 즐겁고 핫한 시간을~❤️','2023-02-16 08:51:49','2023-02-16 08:51:49'),(4,2,'공천포올레게스트하우스에서 스탭을 모집합니다!!!','삼시세끼 제공','저희는 귀여운 고양이들과 함께하는 게스트하우스입니다!!!\n다들 착하고 재밌어요!!','2023-02-17 00:07:29','2023-02-17 00:07:29');
/*!40000 ALTER TABLE `recruitments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume_info_area_join`
--

DROP TABLE IF EXISTS `resume_info_area_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume_info_area_join` (
  `area_name` varchar(10) NOT NULL,
  `resume_info_uid` bigint NOT NULL,
  KEY `fk_resinfarejoi_on_area` (`area_name`),
  KEY `fk_resinfarejoi_on_resume_info` (`resume_info_uid`),
  CONSTRAINT `fk_resinfarejoi_on_area` FOREIGN KEY (`area_name`) REFERENCES `areas` (`area_name`),
  CONSTRAINT `fk_resinfarejoi_on_resume_info` FOREIGN KEY (`resume_info_uid`) REFERENCES `resume_infos` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume_info_area_join`
--

LOCK TABLES `resume_info_area_join` WRITE;
/*!40000 ALTER TABLE `resume_info_area_join` DISABLE KEYS */;
INSERT INTO `resume_info_area_join` VALUES ('표선면',1),('구좌읍',2),('남원읍',2),('대정읍',2),('서귀포시',2),('성산읍',2),('안덕면',2),('애월읍',2),('우도면',2),('제주시',2),('조천읍',2),('표선면',2),('한경면',2),('한림읍',2),('남원읍',3),('남원읍',4),('남원읍',5),('구좌읍',6),('남원읍',6),('대정읍',6),('서귀포시',6),('성산읍',6),('안덕면',6),('애월읍',6),('우도면',6),('제주시',6),('조천읍',6),('표선면',6),('한경면',6),('한림읍',6),('남원읍',7),('남원읍',8);
/*!40000 ALTER TABLE `resume_info_area_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume_info_person_type_join`
--

DROP TABLE IF EXISTS `resume_info_person_type_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume_info_person_type_join` (
  `resume_info_uid` bigint NOT NULL,
  `type` varchar(50) NOT NULL,
  KEY `fk_resinfpertypjoi_on_person_type` (`type`),
  KEY `fk_resinfpertypjoi_on_resume_info` (`resume_info_uid`),
  CONSTRAINT `fk_resinfpertypjoi_on_person_type` FOREIGN KEY (`type`) REFERENCES `person_types` (`type`),
  CONSTRAINT `fk_resinfpertypjoi_on_resume_info` FOREIGN KEY (`resume_info_uid`) REFERENCES `resume_infos` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume_info_person_type_join`
--

LOCK TABLES `resume_info_person_type_join` WRITE;
/*!40000 ALTER TABLE `resume_info_person_type_join` DISABLE KEYS */;
INSERT INTO `resume_info_person_type_join` VALUES (1,'꼼꼼'),(1,'대처 능력'),(1,'빠른 습득'),(1,'빠른 일처리'),(1,'스탭 경험자'),(2,'꼼꼼'),(2,'의사소통 기술'),(2,'대처 능력'),(3,'꼼꼼'),(3,'대처 능력'),(3,'빠른 습득'),(3,'활발한 성격'),(4,'의사소통 기술'),(4,'아침형 인간'),(4,'빠른 일처리'),(5,'빠른 습득'),(5,'저녁형 인간'),(5,'열정'),(6,'친절함'),(6,'의사소통 기술'),(6,'빠른 일처리'),(7,'스탭 경험자'),(7,'책임감'),(7,'친절함'),(8,'저녁형 인간'),(8,'의사소통 기술'),(8,'빠른 습득');
/*!40000 ALTER TABLE `resume_info_person_type_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume_infos`
--

DROP TABLE IF EXISTS `resume_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume_infos` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `user_uid` bigint DEFAULT NULL,
  `content` text,
  `possible_start_date` date DEFAULT NULL,
  `min_work_period` int NOT NULL,
  `auto_apply` bit(1) NOT NULL,
  `guest_house_type` varchar(255) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL,
  `instagram_link` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `FK_RESUME_INFOS_ON_USER_UID` (`user_uid`),
  CONSTRAINT `FK_RESUME_INFOS_ON_USER_UID` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume_infos`
--

LOCK TABLES `resume_infos` WRITE;
/*!40000 ALTER TABLE `resume_infos` DISABLE KEYS */;
INSERT INTO `resume_infos` VALUES (1,17,'어디서든 열심히 할 수 있습니다','2023-02-28',1,_binary '','서핑 가능,깨끗한 게하','2023-02-17',_binary '\0',''),(2,18,'노는거 좋아하고 열심히 하겠습니다!!!!','2023-02-17',1,_binary '\0','파티,오션뷰,재밌는 게하','2023-02-17',_binary '\0','https://www.instagram.com/_chaechae_1/?hl=ko'),(3,10,'설거지 잘합니다\n처음보는 사람들과 잘 어울릴 수 있습니다!\n빌런 아닙니다','2023-02-23',2,_binary '','조용한 게하,픽업 가능,깨끗한 게하','2023-02-17',_binary '\0','https://jejuin.com'),(4,13,'그냥 워킹머씐입니다.\n일 너무 잘해요 후후후','2023-02-23',2,_binary '','댕댕이 보유,교통 편리,조용한 게하,오션뷰','2023-02-17',_binary '\0','https://jejuin.com'),(5,14,'요리대회 대상 출신 ','2023-02-23',2,_binary '','서핑 가능,교통 편리,힐링','2023-02-17',_binary '\0','https://jejuin.com'),(6,15,'정리정돈 잘합니다!!!!!\n좋은사람들과 좋은곳에서 즐겁게 지내고싶어요','2023-02-23',2,_binary '','교통 편리,픽업 가능,재밌는 게하','2023-02-17',_binary '\0','naver.com'),(7,12,'동물좋아해요!\n동물 잘 씻길수 있어용!','2023-02-23',2,_binary '','조용한 게하,꿀잼,냥냥이 보유','2023-02-17',_binary '\0','https://jejuin.com'),(8,21,'열심히 할 자신 있습니다.\n게하스탭 경험 2번 있습니다.','2023-02-23',2,_binary '','조용한 게하,픽업 가능,냥냥이 보유,힐링','2023-02-17',_binary '\0','없음');
/*!40000 ALTER TABLE `resume_infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_logins`
--

DROP TABLE IF EXISTS `social_logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_logins` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `user_uid` bigint DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `FK_SOCIAL_LOGINS_ON_USER_UID` (`user_uid`),
  CONSTRAINT `FK_SOCIAL_LOGINS_ON_USER_UID` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_logins`
--

LOCK TABLES `social_logins` WRITE;
/*!40000 ALTER TABLE `social_logins` DISABLE KEYS */;
INSERT INTO `social_logins` VALUES (1,16,'AAAANnFN-983fKujHP4TPLkGjbXEm-Qxx3fZv8TH31Lcv3uq8JsgP3V8Th3FlA1OHs8-H1EzZBxdKoQiKbllyOOMFp0',1),(2,17,'waEdzkCtiPOQSjcnBj5n4u_qNO1miF9IrkQDN3OPCiolDgAAAYZZXrsI',0),(3,19,'Bearer ya29.a0AVvZVsqVXsfG3jKgVfdWWrANC1EsJy_qBJmxX-_xkar0egJcSCPdTVfe2D5uddT77YmK-SbVDGtNbawh11MP3809uxcDxXiZ9TFzvBtA0z_J3DoVNNhADoT3uRDDI5VGnpnxz8AQUQ1FrnD9hqlgTqIZfwkyaCgYKARwSARISFQGbdwaIsGJPQ29mPZ_aGzrWu974pQ0163',2);
/*!40000 ALTER TABLE `social_logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_perform_eval`
--

DROP TABLE IF EXISTS `staff_perform_eval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_perform_eval` (
  `uid` bigint NOT NULL,
  `user_uid` bigint DEFAULT NULL,
  `guest_house_uid` bigint DEFAULT NULL,
  `staff_record_uid` bigint DEFAULT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_perform_eval`
--

LOCK TABLES `staff_perform_eval` WRITE;
/*!40000 ALTER TABLE `staff_perform_eval` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_perform_eval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_records`
--

DROP TABLE IF EXISTS `staff_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_records` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `guest_house_uid` bigint DEFAULT NULL,
  `user_uid` bigint DEFAULT NULL,
  `guest_house_name` varchar(50) DEFAULT NULL,
  `guest_house_address` varchar(50) DEFAULT NULL,
  `guest_house_address_detail` varchar(50) DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `work_name` varchar(25) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_records`
--

LOCK TABLES `staff_records` WRITE;
/*!40000 ALTER TABLE `staff_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel_place_reviews`
--

DROP TABLE IF EXISTS `travel_place_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_place_reviews` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `star_rating` int NOT NULL,
  `content` text NOT NULL,
  `like_count` int NOT NULL,
  `date_created` datetime DEFAULT NULL,
  `travel_place_uid` bigint NOT NULL,
  `user_uid` bigint NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_place_reviews`
--

LOCK TABLES `travel_place_reviews` WRITE;
/*!40000 ALTER TABLE `travel_place_reviews` DISABLE KEYS */;
INSERT INTO `travel_place_reviews` VALUES (2,5,'<h2>9.81 파크 제주</h2><p><br></p><h2>여기서 바이크타는거 너무 재밌었어요</h2><h2>가족끼리 다녀왔는데 너무 좋은 경험이었습니다.</h2><h2>애기들도 좋아하고, 사진 보시면 경치도 좋아요.</h2><p><br></p><h1>강추 강추 합니다!!!!</h1>',0,'2023-02-16 03:18:01',3,6),(3,5,'<h2>1100고지 겨울에 다녀왔습니다.</h2><h2><br></h2><h2>제주도 갔는데 눈 내리면 꼭 가보세요</h2><h2>진짜 미쳤습니다.</h2>',0,'2023-02-16 03:30:28',4,6),(4,4,'<h2>미쳤다 여기 너무 맛있어</h2><h2>이거 세트 시켜서 국물에 밥 비벼드세요 엌</h2><h2>새우 두개나오는건 좀 아쉽</h2><h2>새우 상관 없으면 꼭 가보세요</h2>',0,'2023-02-16 03:34:22',5,6),(5,5,'<h1>**** 남양수산 ****</h1><p><br></p><h2>바다 바로앞이라 그런지 회가 너무 싱싱해요 ㄷㄷ</h2><h2>진짜 인생횟집입니다.</h2><h2>가격도 저렴하고 주변에 놀곳도 많고 좋습니다.</h2>',0,'2023-02-16 03:36:32',6,6),(6,4,'<h2>지나가다가 봤는데 너무 이쁩니다</h2><h2>갈 수 있는지는 모르겠네요.</h2><h2>차타고 가면서 보니까 운전도 즐거웠습니다 ㅋㅋㅋㅋ</h2><p><br></p>',0,'2023-02-16 03:38:36',7,6),(7,5,'<h2>근처에서 카페갔다가 주변에 비자림이란 곳이 있다는 것을 알게됐어요</h2><h2>원래 계획엔 없었지만 다같이 가자고 해서 가봤는데 너무 좋았어요</h2><h2>생각지도 못한 즐거움? ㅋㅋㅋㅋ</h2><h2><br></h2><h2>진짜 잡생각 사라지고 몸이 환기되는 느낌이었어요</h2>',0,'2023-02-16 04:06:41',11,6),(8,4,'<h2>여기 쩝니다 너무 좋습니다</h2><h2>산책하기 딱 좋아요</h2><h2><br></h2><h2>산림욕 하고싶은 분들 가세요</h2><h2>여친이랑 다녀왔는데 너무 좋아열</h2>',0,'2023-02-16 04:09:46',11,5),(9,5,'<p>갑자기 인도음식이 먹고싶어서 검색했는데 유명한 곳이더라구요?</p><p><br></p><p>이름도 바그다드여서 맛있을거같아서 들어갔습니다 ㅋㅋㅋㅋㅋ</p><p>사진 보시면 아시겠지만 비쥬얼부터 압도적이구요 맛도 환상적이었어요</p>',0,'2023-02-16 04:13:38',9,5),(10,4,'<h2>진짜 힘들게 백록담 다녀왔습니다.</h2><h2>진자 간 보람이 있어요</h2><h2>해빛이 백록담에 고인 물이 빛나는게 너무 멋졌습니다.</h2>',0,'2023-02-16 04:24:04',10,5),(11,3,'<h2>여기 언덕 너무심해요 ㅠㅠ</h2><h2>이쁘긴 한데 힘들어서 풍경이 눈에 안들어오는....</h2>',0,'2023-02-16 04:27:33',14,5),(12,4,'<h2>쇠소깍 진짜 탑건 마지막 장면같더라구요</h2><h2>그 전투기가 지나가던 좁은 목</h2><h2>여기를 배타고 지나가니까 너무 즐거웠어요</h2>',0,'2023-02-16 04:31:02',27,5),(13,4,'<h2>수누피 좋아하는 사람 강추!</h2><h2><br></h2><h2>너무 귀여워요! 사진찍을곳도 많고</h2><h2>이쁜사진 찍을 수 있는 곳이 너무 많아용!</h2><h2><br></h2><h2>연인기리도 많이보이고 애기들 데려온 가족도 많았어요!</h2>',1,'2023-02-16 04:33:06',18,5),(14,5,'<h2>아이들이랑 스누피 구경하고왔습니다.</h2><h2>딸아이가 너무 좋아하네요</h2><h2>어른인 제가 봐도 귀엽구 ㅎㅎ</h2><h2><br></h2><h2>아이 있는분들 강추입니다.</h2><h2>스누피 아는 어른들도 물론 강추입니다  bb</h2>',0,'2023-02-16 04:36:06',18,7),(15,5,'<h2>카트타면서 자연 구경하려고 갔는데 클럽 분위기에서 카트를 탈 수 있었어요</h2><h2>너무 재밌더라고요</h2><h2>락볼링장같은 느낌?</h2><h1><br></h1><h1>자연 보면서 타는 카트도 너무 좋았습니다.</h1>',0,'2023-02-16 04:38:34',3,7),(16,4,'<h2>전복죽 먹으러 표선해녀의집 다녀왔습니다.</h2><h2>진짜 맛있더라구요</h2><h2>사진보시면 아시겠지만 전복도 큰 덩어리로 꽉꽉 담아주더라구요</h2>',1,'2023-02-16 04:42:18',35,7),(17,5,'<p>보말칼국수 맛집 미쳤다 여긴!</p>',0,'2023-02-16 04:44:52',29,7),(18,4,'<p>제주도와서 본것중 가장 웅장했습니다.</p><p><br></p><p>이건 사진으로 부족해요 꼭 직접가서 보세요</p>',0,'2023-02-16 04:46:31',28,7),(19,4,'<h2>여긴 두번쨰 오지만 너무 재밌네요 ㅋㅋㅋㅋㅋ</h2><h2>분명 날씨 좋았는데 어느순간 흐려져서 쫄았어요</h2><h2>다행히 탈출후에 비가 왔다능</h2>',0,'2023-02-16 04:52:59',26,7),(20,4,'<p>미친 제가 가본곳중 가장 이쁘네요</p><p>여긴 전설입니다</p><p>근데 너무 비싸요</p><p>다들 할인받아서 오세요!</p>',0,'2023-02-16 04:55:18',27,7),(21,5,'<h2>진짜 수영장에 비치는 건물 모습들 너무 멋지지 않나요</h2><h2><br></h2><h2>저는 여기서 42일을 살았답니다</h2><h2><br></h2><h2>우리 남편이 돈이 너무 많아서</h2>',1,'2023-02-16 05:08:49',27,8),(22,5,'<h2>신라호텔 폼 미쳤다!</h2><h2><br></h2><h2>부럽지 난 이런데 일년에 5번씩은 간다 후후</h2>',0,'2023-02-16 05:10:10',27,8),(23,4,'<p>채원이와 백록담 등반하고 싶다....</p>',0,'2023-02-16 08:41:40',10,18),(24,4,'<p>게하사람들끼리 내기했는데 졌습니다... </p><p>시작할떄 왼쪽으로가세요 </p><p>그래도 재미는 있었습니다 ㅋㅋㅋㅋㅋ</p><p>게하사람들이랑 가는거 추천!</p>',0,'2023-02-17 00:12:30',26,20),(25,4,'<p>더스틴 교수님의 정성이 느껴지는 공원이에요</p><p>스탬프 찍기도 너무 재밌어요!</p><p> </p>',0,'2023-02-17 00:22:52',26,11);
/*!40000 ALTER TABLE `travel_place_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel_places`
--

DROP TABLE IF EXISTS `travel_places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_places` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `category` varchar(10) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `area_name` varchar(10) DEFAULT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `review_count` int NOT NULL,
  `star_rating_avg` double NOT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_places`
--

LOCK TABLES `travel_places` WRITE;
/*!40000 ALTER TABLE `travel_places` DISABLE KEYS */;
INSERT INTO `travel_places` VALUES (3,'9.81 파크 제주','놀거리','제주특별자치도 제주시 애월읍 어음리','애월읍',33.38996482624218,126.36637231557641,2,5,'2023-02-16 04:38:34'),(4,'1100고지','자연','제주특별자치도 서귀포시 색달동','서귀포시',33.3577921299092,126.46286106448049,1,5,'2023-02-16 03:30:28'),(5,'고집돌우럭 제주공항점','먹거리','제주특별자치도 제주시 건입동','제주시',33.51618673200536,126.52793272213475,1,4,'2023-02-16 03:34:22'),(6,'남양수산','먹거리','제주특별자치도 서귀포시 성산읍 고성리','성산읍',33.450073968851434,126.91406017247873,1,5,'2023-02-16 03:36:32'),(7,'다랑쉬오름','자연','제주특별자치도 제주시 구좌읍 세화리','구좌읍',33.47761292549119,126.82142378781235,1,4,'2023-02-16 03:38:36'),(8,'메이즈랜드','놀거리','제주특별자치도 제주시 구좌읍 평대리','구좌읍',33.48792026634636,126.80089322971196,0,0,'2023-02-16 03:39:18'),(9,'바그다드','먹거리','제주특별자치도 제주시 삼도이동','제주시',33.51020570215845,126.52308299073073,1,5,'2023-02-16 04:13:38'),(10,'백록담','자연','제주특별자치도 서귀포시 토평동','서귀포시',33.362500614374476,126.5331871384541,2,4,'2023-02-16 08:41:40'),(11,'비자림','자연','제주특별자치도 제주시 구좌읍 평대리','구좌읍',33.48426909652251,126.8065494523103,2,4.5,'2023-02-16 04:09:46'),(12,'빛의벙커','볼거리','제주특별자치도 서귀포시 성산읍 고성리','성산읍',33.439789238720614,126.89903467199456,0,0,'2023-02-16 03:42:53'),(13,'산방산 탄산온천','놀거리','제주특별자치도 서귀포시 안덕면 사계리','안덕면',33.248952694385174,126.29867203141245,0,0,'2023-02-16 03:43:30'),(14,'새별오름','자연','제주특별자치도 제주시 애월읍 봉성리','애월읍',33.366182931054006,126.35759749086166,1,3,'2023-02-16 04:27:33'),(15,'성산일출봉','자연','제주특별자치도 서귀포시 성산읍 성산리','성산읍',33.458806604401374,126.9407151818998,0,0,'2023-02-16 03:44:33'),(16,'쇠소깍','자연','제주특별자치도 서귀포시 남원읍 하례리','남원읍',33.25239882933978,126.62427804948335,0,0,'2023-02-16 03:45:28'),(17,'숙성도 중문점','먹거리','제주특별자치도 서귀포시 색달동','서귀포시',33.25825267887139,126.40738365135661,0,0,'2023-02-16 03:45:54'),(18,'스누피가든','볼거리','제주특별자치도 제주시 구좌읍 송당리','구좌읍',33.44405894059073,126.77804996670794,2,4.5,'2023-02-16 04:36:06'),(19,'아프리카박물관','볼거리','제주특별자치도 서귀포시 대포동','서귀포시',33.23966866166462,126.42922179834365,0,0,'2023-02-16 03:48:48'),(20,'엉또폭포','자연','제주특별자치도 서귀포시 강정동','서귀포시',33.267577769974054,126.49827139707615,0,0,'2023-02-16 03:49:13'),(21,'오설록 티 뮤지엄','볼거리','제주특별자치도 서귀포시 안덕면 서광리','안덕면',33.30601929347045,126.28925528672491,0,0,'2023-02-16 03:49:44'),(22,'용머리해안','자연','제주특별자치도 서귀포시 안덕면 사계리','안덕면',33.23142854788927,126.31477058077645,0,0,'2023-02-16 03:50:08'),(23,'우도','자연','제주특별자치도 제주시 우도면 연평리','우도면',33.50069480047048,126.96074074079797,0,0,'2023-02-16 03:50:30'),(24,'월정리해수욕장','자연','제주특별자치도 제주시 구좌읍 월정리','구좌읍',33.555634691792335,126.79653552897811,0,0,'2023-02-16 03:51:05'),(25,'정방폭포','자연','제주특별자치도 서귀포시 동홍동','서귀포시',33.24467109880232,126.5729259584689,0,0,'2023-02-16 03:51:39'),(26,'제주김녕미로공원','놀거리','제주특별자치도 제주시 구좌읍 김녕리','구좌읍',33.53622503396543,126.77191202298962,3,4,'2023-02-17 00:22:52'),(27,'제주신라호텔','놀거리','제주특별자치도 서귀포시 색달동','서귀포시',33.24732187873705,126.40781777431367,4,4.5,'2023-02-16 05:10:10'),(28,'대포주상절리','자연','제주특별자치도 서귀포시 중문동','서귀포시',33.23882971794055,126.42632917086632,1,4,'2023-02-16 04:46:31'),(29,'중문수두리보말칼국수','먹거리','제주특별자치도 서귀포시 중문동','서귀포시',33.251505768593056,126.42486822675389,1,5,'2023-02-16 04:44:52'),(30,'천제연폭포','자연','제주특별자치도 서귀포시 중문동','서귀포시',33.25138991931518,126.4171549143963,0,0,'2023-02-16 03:54:16'),(31,'천지연폭포','자연','제주특별자치도 서귀포시 서홍동','서귀포시',33.246890592890146,126.55429406321635,0,0,'2023-02-16 03:54:51'),(32,'카페바나나 함덕점','먹거리','제주특별자치도 제주시 조천읍 함덕리','조천읍',33.54372765036393,126.66304564970827,0,0,'2023-02-16 03:55:30'),(33,'테디베어뮤지엄','볼거리','제주특별자치도 서귀포시 색달동','서귀포시',33.250296764993486,126.41202392400109,0,0,'2023-02-16 03:56:19'),(34,'토끼섬','자연','제주특별자치도 제주시 구좌읍 하도리','구좌읍',33.523872703152634,126.90275216058946,0,0,'2023-02-16 03:56:53'),(35,'표선해녀의집','먹거리','제주특별자치도 서귀포시 표선면 표선리','표선면',33.32527087202048,126.84338813002365,1,4,'2023-02-16 04:42:18'),(36,'몽상드애월','먹거리','제주특별자치도 제주시 애월읍 애월리','애월읍',33.46280084610978,126.3090533227418,0,0,'2023-02-16 04:00:30'),(37,'제주민속촌','볼거리','제주특별자치도 서귀포시 표선면 표선리','표선면',33.32126303854162,126.84290397662622,0,0,'2023-02-16 04:02:06');
/*!40000 ALTER TABLE `travel_places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authority_join`
--

DROP TABLE IF EXISTS `user_authority_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authority_join` (
  `authority_name` varchar(50) NOT NULL,
  `user_uid` bigint NOT NULL,
  PRIMARY KEY (`authority_name`,`user_uid`),
  KEY `fk_useautjoi_on_user` (`user_uid`),
  CONSTRAINT `fk_useautjoi_on_authority` FOREIGN KEY (`authority_name`) REFERENCES `authority` (`authority_name`),
  CONSTRAINT `fk_useautjoi_on_user` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authority_join`
--

LOCK TABLES `user_authority_join` WRITE;
/*!40000 ALTER TABLE `user_authority_join` DISABLE KEYS */;
INSERT INTO `user_authority_join` VALUES ('ROLE_USER',5),('ROLE_USER',6),('ROLE_USER',7),('ROLE_USER',8),('ROLE_USER',9),('ROLE_AUTH',10),('ROLE_USER',10),('ROLE_AUTH',11),('ROLE_USER',11),('ROLE_AUTH',12),('ROLE_USER',12),('ROLE_AUTH',13),('ROLE_USER',13),('ROLE_AUTH',14),('ROLE_USER',14),('ROLE_AUTH',15),('ROLE_USER',15),('ROLE_AUTH',16),('ROLE_USER',16),('ROLE_AUTH',17),('ROLE_USER',17),('ROLE_AUTH',18),('ROLE_USER',18),('ROLE_USER',19),('ROLE_USER',20),('ROLE_AUTH',21),('ROLE_USER',21);
/*!40000 ALTER TABLE `user_authority_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_review_join`
--

DROP TABLE IF EXISTS `user_review_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_review_join` (
  `review_uid` bigint NOT NULL,
  `user_uid` bigint NOT NULL,
  KEY `fk_userevjoi_on_travel_place_review` (`review_uid`),
  KEY `fk_userevjoi_on_user` (`user_uid`),
  CONSTRAINT `fk_userevjoi_on_travel_place_review` FOREIGN KEY (`review_uid`) REFERENCES `travel_place_reviews` (`uid`),
  CONSTRAINT `fk_userevjoi_on_user` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_review_join`
--

LOCK TABLES `user_review_join` WRITE;
/*!40000 ALTER TABLE `user_review_join` DISABLE KEYS */;
INSERT INTO `user_review_join` VALUES (21,11),(13,11),(16,11);
/*!40000 ALTER TABLE `user_review_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  `nickname` varchar(10) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `is_staff` bit(1) NOT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `sugar_content` decimal(5,3) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'asdf@naver.com','$2a$10$sLS8q7GCH/j8/9oHUXW1kOJor6TuhOaOADE517nli4dSBZfbQZE8a',NULL,'제주히어로',NULL,NULL,NULL,_binary '\0',NULL,NULL,8.800),(6,'abcd@naver.com','$2a$10$/sDgHtIuV9LFDrDHGoeeTOolhvGey5WNlpXgijgODH0x4VPcjCErO',NULL,'레어닉네임',NULL,NULL,NULL,_binary '\0',NULL,NULL,8.600),(7,'aaaa@naver.com','$2a$10$vQ8BCnKrTFNlaXYABn7GFeA5nc9yAd382AtHAA9uuFIq9o9DgWJSC',NULL,'윾윾',NULL,NULL,NULL,_binary '\0',NULL,NULL,8.900),(8,'bbbb@naver.com','$2a$10$IcaFTJNisEnK1bKSAG3Pa.pPmESwpOY2FlL05jQT.xUFFwhgvaYKK',NULL,'괜찮맨',NULL,NULL,NULL,_binary '\0',NULL,NULL,8.400),(9,'guest1@naver.com','$2a$10$9LHInDvmg.hvjmFMCnmlfOMsrs7yXmQk6evbNykSrLHC9Hofd3vqW',NULL,'그린게스트하우스',NULL,NULL,NULL,_binary '\0',NULL,NULL,8.000),(10,'tamla@naver.com','$2a$10$k5gNPRVAmvghy9ZcIUfBLOQHfMBBav2Uad/SYxDnaWChfbGTygfgG','노누리','노누리','010-6638-7338','20-29','여자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png',NULL,8.000),(11,'gongcheon@naver.com','$2a$10$cmra47/C0GZwWzIo2SgwwOE7cRXDb0kv3Y6omMcrHzfKoZswcdWcK','안태현','안태현','010-6638-7338','20-29','남자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png',NULL,8.100),(12,'1mm@naver.com','$2a$10$mSWt5Oy97sV5CIp5/zMNsOdGmJKcwELtW1QEYgA6Ep78SpAlzvqXO','송현주','송현주','010-6638-7338','20-29','여자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMiIsImF1dGgiOiJST0xFX1VTRVIsUk9MRV9BVVRIIiwiZXhwIjoxNjc3ODAzMTQ3fQ.MwPJdk_TpfU3MCgCvWoQOZ-dZNIjscEY4w2xE5FahauUDWC72_kopWeSl_xvKIURG-18xpFvFn7eA4s1meuvug',8.000),(13,'handsome@naver.com','$2a$10$Pur4/RPVwNMpSQuKH10Mxe5xqzKXxx6VS/dtHZ0Ak6nMHgPGMqSW6','김채원','김채원','010-6638-7338','20-29','여자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png',NULL,8.000),(14,'monster@naver.com','$2a$10$YsFq7OyCVop5ouHgetEyIOTDzPgIOmPANjiZzh08E1feZAwQqgalC','두소원','두소원','010-6638-7338','20-29','여자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png',NULL,8.000),(15,'break@naver.com','$2a$10$liBlOi.IhgX4D5rc3KkebO0xQFneB1vbd953w3Z3wdb809x2BpBf6','이현진','이현진','010-6638-7338','20-29','여자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png',NULL,8.000),(16,'sa1583@naver.com',NULL,'이영차','charType','010-2214-1583','30-39','남자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNiIsImF1dGgiOiJST0xFX1VTRVIsUk9MRV9BVVRIIiwiZXhwIjoxNjc3NzQ1NzUzfQ.zo5q2HnWg7TmRzxuriQuSwsiGJW-7Ds4U4SMyqTgC-iI1NQ-n6fYHgJnzx5eGx8wgGKNNHl9EUlgXAgeTklwTA',8.000),(17,'sa1583@naver.com',NULL,'이영차','charType','010-2214-1583','30-39','남자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png',NULL,8.000),(18,'ssafy.jaewook@gmail.com','$2a$10$pgPYWB9yD5XQ6AS0TEQxJ.HmuMahdKFXbPGWU20Adeo1oQjJpnIgW','이재욱','이재욱','010-5587-4930','20-29','남자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOCIsImF1dGgiOiJST0xFX0FVVEgsUk9MRV9VU0VSIiwiZXhwIjoxNjc3ODAzNzM3fQ.jJG4kJlaV6T4chI8CO9WFHq_pC75BqKXqpLEhclv5D2zCWRVs-UGslcOjPcd_1dN4WQbOXKbHlrUdnnNs7xj5A',8.100),(19,'xvsgxv@gmail.com',NULL,NULL,'장정민',NULL,NULL,NULL,_binary '\0',NULL,NULL,8.000),(20,'ytt@naver.com','$2a$10$XYnbx47/ux126NHNR35oWOA8YyVOqPLWWQb880gZ1WB603rWDj4YS',NULL,'은우보다정민',NULL,NULL,NULL,_binary '\0',NULL,NULL,8.100),(21,'sbsggg03@naver.com','$2a$10$J5/dvc/kRycw7Oc0LKUkTe5fIDIQVLfRZqrFKOLwvDJbLMIt3b6IG','최유태','최유태','010-5587-8645','20-29','남자',_binary '\0','https://ssl.pstatic.net/static/pwe/address/img_profile.png',NULL,8.000);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_resume_info_join`
--

DROP TABLE IF EXISTS `work_resume_info_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_resume_info_join` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `work_uid` bigint DEFAULT NULL,
  `resume_info_uid` bigint DEFAULT NULL,
  `is_read` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `FK_WORK_RESUME_INFO_JOIN_ON_RESUME_INFO_UID` (`resume_info_uid`),
  KEY `FK_WORK_RESUME_INFO_JOIN_ON_WORK_UID` (`work_uid`),
  CONSTRAINT `FK_WORK_RESUME_INFO_JOIN_ON_RESUME_INFO_UID` FOREIGN KEY (`resume_info_uid`) REFERENCES `resume_infos` (`uid`),
  CONSTRAINT `FK_WORK_RESUME_INFO_JOIN_ON_WORK_UID` FOREIGN KEY (`work_uid`) REFERENCES `works` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_resume_info_join`
--

LOCK TABLES `work_resume_info_join` WRITE;
/*!40000 ALTER TABLE `work_resume_info_join` DISABLE KEYS */;
INSERT INTO `work_resume_info_join` VALUES (1,3,1,'2023-02-17 00:41:48'),(2,1,8,NULL);
/*!40000 ALTER TABLE `work_resume_info_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works`
--

DROP TABLE IF EXISTS `works`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works` (
  `uid` bigint NOT NULL AUTO_INCREMENT,
  `recruitment_uid` bigint DEFAULT NULL,
  `work_name` varchar(25) DEFAULT NULL,
  `intake` int NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `min_work_period` int NOT NULL,
  `work_time` varchar(50) DEFAULT NULL,
  `work_days` int NOT NULL,
  `days_off` int NOT NULL,
  `work_description` varchar(255) DEFAULT NULL,
  `salary` varchar(25) DEFAULT NULL,
  `entry_date` date DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `FK_WORKS_ON_RECRUITMENT_UID` (`recruitment_uid`),
  CONSTRAINT `FK_WORKS_ON_RECRUITMENT_UID` FOREIGN KEY (`recruitment_uid`) REFERENCES `recruitments` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works`
--

LOCK TABLES `works` WRITE;
/*!40000 ALTER TABLE `works` DISABLE KEYS */;
INSERT INTO `works` VALUES (1,1,'그탭',2,'무관',1,'Mon, 01 Jan 2018 00:00:00 GMT~08:10',2,2,'아침에만 청소 잠깐 하면 됩니다','무급','2023-02-28'),(2,3,'청소',1,'여자',1,'03:00~Mon, 01 Jan 2018 06:00:00 GMT',2,2,'15일 근무 15일 휴무입니다. 주 업무는 청소와 빨래입니다.','없읍','2023-02-16'),(3,4,'스탭',2,'무관',2,'00:10~Mon, 01 Jan 2018 06:00:00 GMT',2,4,'간단한 청소 및 손님 응대만 해주시면 됩니다!!!','무급','2023-02-24');
/*!40000 ALTER TABLE `works` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:45:30
