-- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
--
-- Host: localhost    Database: local
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `wp_commentmeta`
--

DROP TABLE IF EXISTS `wp_commentmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_commentmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_520_ci,
  PRIMARY KEY (`meta_id`),
  KEY `comment_id` (`comment_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_commentmeta`
--

LOCK TABLES `wp_commentmeta` WRITE;
/*!40000 ALTER TABLE `wp_commentmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_commentmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_comments`
--

DROP TABLE IF EXISTS `wp_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_comments` (
  `comment_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint(20) unsigned NOT NULL DEFAULT '0',
  `comment_author` tinytext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `comment_author_email` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT '0',
  `comment_approved` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_type` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`),
  KEY `comment_author_email` (`comment_author_email`(10))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_comments`
--

LOCK TABLES `wp_comments` WRITE;
/*!40000 ALTER TABLE `wp_comments` DISABLE KEYS */;
INSERT INTO `wp_comments` VALUES (1,1,'A WordPress Commenter','wapuu@wordpress.example','https://wordpress.org/','','2020-03-24 03:29:33','2020-03-24 03:29:33','Hi, this is a comment.\nTo get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.\nCommenter avatars come from <a href=\"https://gravatar.com\">Gravatar</a>.',0,'1','','',0,0);
/*!40000 ALTER TABLE `wp_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_links`
--

DROP TABLE IF EXISTS `wp_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_links` (
  `link_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `link_url` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_name` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_image` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_target` varchar(25) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_description` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_visible` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'Y',
  `link_owner` bigint(20) unsigned NOT NULL DEFAULT '1',
  `link_rating` int(11) NOT NULL DEFAULT '0',
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_notes` mediumtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `link_rss` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`link_id`),
  KEY `link_visible` (`link_visible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_links`
--

LOCK TABLES `wp_links` WRITE;
/*!40000 ALTER TABLE `wp_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_options`
--

DROP TABLE IF EXISTS `wp_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `option_value` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `autoload` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`),
  KEY `autoload` (`autoload`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_options`
--

LOCK TABLES `wp_options` WRITE;
/*!40000 ALTER TABLE `wp_options` DISABLE KEYS */;
INSERT INTO `wp_options` VALUES (1,'siteurl','http://kg.wordpress.local','yes');
INSERT INTO `wp_options` VALUES (2,'home','http://kg.wordpress.local','yes');
INSERT INTO `wp_options` VALUES (3,'blogname','Kevin Garubba','yes');
INSERT INTO `wp_options` VALUES (4,'blogdescription','Design | Dev','yes');
INSERT INTO `wp_options` VALUES (5,'users_can_register','0','yes');
INSERT INTO `wp_options` VALUES (6,'admin_email','kevingarubba@gmail.com','yes');
INSERT INTO `wp_options` VALUES (7,'start_of_week','1','yes');
INSERT INTO `wp_options` VALUES (8,'use_balanceTags','0','yes');
INSERT INTO `wp_options` VALUES (9,'use_smilies','1','yes');
INSERT INTO `wp_options` VALUES (10,'require_name_email','1','yes');
INSERT INTO `wp_options` VALUES (11,'comments_notify','1','yes');
INSERT INTO `wp_options` VALUES (12,'posts_per_rss','10','yes');
INSERT INTO `wp_options` VALUES (13,'rss_use_excerpt','0','yes');
INSERT INTO `wp_options` VALUES (14,'mailserver_url','mail.example.com','yes');
INSERT INTO `wp_options` VALUES (15,'mailserver_login','login@example.com','yes');
INSERT INTO `wp_options` VALUES (16,'mailserver_pass','password','yes');
INSERT INTO `wp_options` VALUES (17,'mailserver_port','110','yes');
INSERT INTO `wp_options` VALUES (18,'default_category','1','yes');
INSERT INTO `wp_options` VALUES (19,'default_comment_status','open','yes');
INSERT INTO `wp_options` VALUES (20,'default_ping_status','open','yes');
INSERT INTO `wp_options` VALUES (21,'default_pingback_flag','1','yes');
INSERT INTO `wp_options` VALUES (22,'posts_per_page','10','yes');
INSERT INTO `wp_options` VALUES (23,'date_format','F j, Y','yes');
INSERT INTO `wp_options` VALUES (24,'time_format','g:i a','yes');
INSERT INTO `wp_options` VALUES (25,'links_updated_date_format','F j, Y g:i a','yes');
INSERT INTO `wp_options` VALUES (26,'comment_moderation','0','yes');
INSERT INTO `wp_options` VALUES (27,'moderation_notify','1','yes');
INSERT INTO `wp_options` VALUES (28,'permalink_structure','/%postname%/','yes');
INSERT INTO `wp_options` VALUES (29,'rewrite_rules','a:87:{s:11:\"^wp-json/?$\";s:22:\"index.php?rest_route=/\";s:14:\"^wp-json/(.*)?\";s:33:\"index.php?rest_route=/$matches[1]\";s:21:\"^index.php/wp-json/?$\";s:22:\"index.php?rest_route=/\";s:24:\"^index.php/wp-json/(.*)?\";s:33:\"index.php?rest_route=/$matches[1]\";s:47:\"category/(.+?)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:52:\"index.php?category_name=$matches[1]&feed=$matches[2]\";s:42:\"category/(.+?)/(feed|rdf|rss|rss2|atom)/?$\";s:52:\"index.php?category_name=$matches[1]&feed=$matches[2]\";s:23:\"category/(.+?)/embed/?$\";s:46:\"index.php?category_name=$matches[1]&embed=true\";s:35:\"category/(.+?)/page/?([0-9]{1,})/?$\";s:53:\"index.php?category_name=$matches[1]&paged=$matches[2]\";s:17:\"category/(.+?)/?$\";s:35:\"index.php?category_name=$matches[1]\";s:44:\"tag/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?tag=$matches[1]&feed=$matches[2]\";s:39:\"tag/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?tag=$matches[1]&feed=$matches[2]\";s:20:\"tag/([^/]+)/embed/?$\";s:36:\"index.php?tag=$matches[1]&embed=true\";s:32:\"tag/([^/]+)/page/?([0-9]{1,})/?$\";s:43:\"index.php?tag=$matches[1]&paged=$matches[2]\";s:14:\"tag/([^/]+)/?$\";s:25:\"index.php?tag=$matches[1]\";s:45:\"type/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?post_format=$matches[1]&feed=$matches[2]\";s:40:\"type/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?post_format=$matches[1]&feed=$matches[2]\";s:21:\"type/([^/]+)/embed/?$\";s:44:\"index.php?post_format=$matches[1]&embed=true\";s:33:\"type/([^/]+)/page/?([0-9]{1,})/?$\";s:51:\"index.php?post_format=$matches[1]&paged=$matches[2]\";s:15:\"type/([^/]+)/?$\";s:33:\"index.php?post_format=$matches[1]\";s:12:\"robots\\.txt$\";s:18:\"index.php?robots=1\";s:48:\".*wp-(atom|rdf|rss|rss2|feed|commentsrss2)\\.php$\";s:18:\"index.php?feed=old\";s:20:\".*wp-app\\.php(/.*)?$\";s:19:\"index.php?error=403\";s:18:\".*wp-register.php$\";s:23:\"index.php?register=true\";s:32:\"feed/(feed|rdf|rss|rss2|atom)/?$\";s:27:\"index.php?&feed=$matches[1]\";s:27:\"(feed|rdf|rss|rss2|atom)/?$\";s:27:\"index.php?&feed=$matches[1]\";s:8:\"embed/?$\";s:21:\"index.php?&embed=true\";s:20:\"page/?([0-9]{1,})/?$\";s:28:\"index.php?&paged=$matches[1]\";s:41:\"comments/feed/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?&feed=$matches[1]&withcomments=1\";s:36:\"comments/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?&feed=$matches[1]&withcomments=1\";s:17:\"comments/embed/?$\";s:21:\"index.php?&embed=true\";s:44:\"search/(.+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:40:\"index.php?s=$matches[1]&feed=$matches[2]\";s:39:\"search/(.+)/(feed|rdf|rss|rss2|atom)/?$\";s:40:\"index.php?s=$matches[1]&feed=$matches[2]\";s:20:\"search/(.+)/embed/?$\";s:34:\"index.php?s=$matches[1]&embed=true\";s:32:\"search/(.+)/page/?([0-9]{1,})/?$\";s:41:\"index.php?s=$matches[1]&paged=$matches[2]\";s:14:\"search/(.+)/?$\";s:23:\"index.php?s=$matches[1]\";s:47:\"author/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?author_name=$matches[1]&feed=$matches[2]\";s:42:\"author/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?author_name=$matches[1]&feed=$matches[2]\";s:23:\"author/([^/]+)/embed/?$\";s:44:\"index.php?author_name=$matches[1]&embed=true\";s:35:\"author/([^/]+)/page/?([0-9]{1,})/?$\";s:51:\"index.php?author_name=$matches[1]&paged=$matches[2]\";s:17:\"author/([^/]+)/?$\";s:33:\"index.php?author_name=$matches[1]\";s:69:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:80:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&feed=$matches[4]\";s:64:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/(feed|rdf|rss|rss2|atom)/?$\";s:80:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&feed=$matches[4]\";s:45:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/embed/?$\";s:74:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&embed=true\";s:57:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/page/?([0-9]{1,})/?$\";s:81:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&paged=$matches[4]\";s:39:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/?$\";s:63:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]\";s:56:\"([0-9]{4})/([0-9]{1,2})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:64:\"index.php?year=$matches[1]&monthnum=$matches[2]&feed=$matches[3]\";s:51:\"([0-9]{4})/([0-9]{1,2})/(feed|rdf|rss|rss2|atom)/?$\";s:64:\"index.php?year=$matches[1]&monthnum=$matches[2]&feed=$matches[3]\";s:32:\"([0-9]{4})/([0-9]{1,2})/embed/?$\";s:58:\"index.php?year=$matches[1]&monthnum=$matches[2]&embed=true\";s:44:\"([0-9]{4})/([0-9]{1,2})/page/?([0-9]{1,})/?$\";s:65:\"index.php?year=$matches[1]&monthnum=$matches[2]&paged=$matches[3]\";s:26:\"([0-9]{4})/([0-9]{1,2})/?$\";s:47:\"index.php?year=$matches[1]&monthnum=$matches[2]\";s:43:\"([0-9]{4})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?year=$matches[1]&feed=$matches[2]\";s:38:\"([0-9]{4})/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?year=$matches[1]&feed=$matches[2]\";s:19:\"([0-9]{4})/embed/?$\";s:37:\"index.php?year=$matches[1]&embed=true\";s:31:\"([0-9]{4})/page/?([0-9]{1,})/?$\";s:44:\"index.php?year=$matches[1]&paged=$matches[2]\";s:13:\"([0-9]{4})/?$\";s:26:\"index.php?year=$matches[1]\";s:27:\".?.+?/attachment/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:37:\".?.+?/attachment/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:57:\".?.+?/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\".?.+?/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\".?.+?/attachment/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:33:\".?.+?/attachment/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:16:\"(.?.+?)/embed/?$\";s:41:\"index.php?pagename=$matches[1]&embed=true\";s:20:\"(.?.+?)/trackback/?$\";s:35:\"index.php?pagename=$matches[1]&tb=1\";s:40:\"(.?.+?)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:47:\"index.php?pagename=$matches[1]&feed=$matches[2]\";s:35:\"(.?.+?)/(feed|rdf|rss|rss2|atom)/?$\";s:47:\"index.php?pagename=$matches[1]&feed=$matches[2]\";s:28:\"(.?.+?)/page/?([0-9]{1,})/?$\";s:48:\"index.php?pagename=$matches[1]&paged=$matches[2]\";s:35:\"(.?.+?)/comment-page-([0-9]{1,})/?$\";s:48:\"index.php?pagename=$matches[1]&cpage=$matches[2]\";s:24:\"(.?.+?)(?:/([0-9]+))?/?$\";s:47:\"index.php?pagename=$matches[1]&page=$matches[2]\";s:27:\"[^/]+/attachment/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:37:\"[^/]+/attachment/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:57:\"[^/]+/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\"[^/]+/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\"[^/]+/attachment/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:33:\"[^/]+/attachment/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:16:\"([^/]+)/embed/?$\";s:37:\"index.php?name=$matches[1]&embed=true\";s:20:\"([^/]+)/trackback/?$\";s:31:\"index.php?name=$matches[1]&tb=1\";s:40:\"([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?name=$matches[1]&feed=$matches[2]\";s:35:\"([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?name=$matches[1]&feed=$matches[2]\";s:28:\"([^/]+)/page/?([0-9]{1,})/?$\";s:44:\"index.php?name=$matches[1]&paged=$matches[2]\";s:35:\"([^/]+)/comment-page-([0-9]{1,})/?$\";s:44:\"index.php?name=$matches[1]&cpage=$matches[2]\";s:24:\"([^/]+)(?:/([0-9]+))?/?$\";s:43:\"index.php?name=$matches[1]&page=$matches[2]\";s:16:\"[^/]+/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:26:\"[^/]+/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:46:\"[^/]+/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:41:\"[^/]+/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:41:\"[^/]+/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:22:\"[^/]+/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";}','yes');
INSERT INTO `wp_options` VALUES (30,'hack_file','0','yes');
INSERT INTO `wp_options` VALUES (31,'blog_charset','UTF-8','yes');
INSERT INTO `wp_options` VALUES (32,'moderation_keys','','no');
INSERT INTO `wp_options` VALUES (33,'active_plugins','a:6:{i:0;s:34:\"advanced-custom-fields-pro/acf.php\";i:1;s:36:\"contact-form-7/wp-contact-form-7.php\";i:2;s:25:\"fakerpress/fakerpress.php\";i:3;s:50:\"wp-rest-api-favicon-master/wp-rest-api-favicon.php\";i:4;s:44:\"wp-rest-api-logo-master/wp-rest-api-logo.php\";i:5;s:45:\"wp-rest-api-v2-menus/wp-rest-api-v2-menus.php\";}','yes');
INSERT INTO `wp_options` VALUES (34,'category_base','','yes');
INSERT INTO `wp_options` VALUES (35,'ping_sites','http://rpc.pingomatic.com/','yes');
INSERT INTO `wp_options` VALUES (36,'comment_max_links','2','yes');
INSERT INTO `wp_options` VALUES (37,'gmt_offset','0','yes');
INSERT INTO `wp_options` VALUES (38,'default_email_category','1','yes');
INSERT INTO `wp_options` VALUES (39,'recently_edited','','no');
INSERT INTO `wp_options` VALUES (40,'template','kevingarubba.com-wp-theme','yes');
INSERT INTO `wp_options` VALUES (41,'stylesheet','kevingarubba.com-wp-theme','yes');
INSERT INTO `wp_options` VALUES (42,'comment_whitelist','1','yes');
INSERT INTO `wp_options` VALUES (43,'blacklist_keys','','no');
INSERT INTO `wp_options` VALUES (44,'comment_registration','0','yes');
INSERT INTO `wp_options` VALUES (45,'html_type','text/html','yes');
INSERT INTO `wp_options` VALUES (46,'use_trackback','0','yes');
INSERT INTO `wp_options` VALUES (47,'default_role','subscriber','yes');
INSERT INTO `wp_options` VALUES (48,'db_version','45805','yes');
INSERT INTO `wp_options` VALUES (49,'uploads_use_yearmonth_folders','1','yes');
INSERT INTO `wp_options` VALUES (50,'upload_path','','yes');
INSERT INTO `wp_options` VALUES (51,'blog_public','1','yes');
INSERT INTO `wp_options` VALUES (52,'default_link_category','2','yes');
INSERT INTO `wp_options` VALUES (53,'show_on_front','posts','yes');
INSERT INTO `wp_options` VALUES (54,'tag_base','','yes');
INSERT INTO `wp_options` VALUES (55,'show_avatars','1','yes');
INSERT INTO `wp_options` VALUES (56,'avatar_rating','G','yes');
INSERT INTO `wp_options` VALUES (57,'upload_url_path','','yes');
INSERT INTO `wp_options` VALUES (58,'thumbnail_size_w','150','yes');
INSERT INTO `wp_options` VALUES (59,'thumbnail_size_h','150','yes');
INSERT INTO `wp_options` VALUES (60,'thumbnail_crop','1','yes');
INSERT INTO `wp_options` VALUES (61,'medium_size_w','300','yes');
INSERT INTO `wp_options` VALUES (62,'medium_size_h','300','yes');
INSERT INTO `wp_options` VALUES (63,'avatar_default','mystery','yes');
INSERT INTO `wp_options` VALUES (64,'large_size_w','1024','yes');
INSERT INTO `wp_options` VALUES (65,'large_size_h','1024','yes');
INSERT INTO `wp_options` VALUES (66,'image_default_link_type','none','yes');
INSERT INTO `wp_options` VALUES (67,'image_default_size','','yes');
INSERT INTO `wp_options` VALUES (68,'image_default_align','','yes');
INSERT INTO `wp_options` VALUES (69,'close_comments_for_old_posts','0','yes');
INSERT INTO `wp_options` VALUES (70,'close_comments_days_old','14','yes');
INSERT INTO `wp_options` VALUES (71,'thread_comments','1','yes');
INSERT INTO `wp_options` VALUES (72,'thread_comments_depth','5','yes');
INSERT INTO `wp_options` VALUES (73,'page_comments','0','yes');
INSERT INTO `wp_options` VALUES (74,'comments_per_page','50','yes');
INSERT INTO `wp_options` VALUES (75,'default_comments_page','newest','yes');
INSERT INTO `wp_options` VALUES (76,'comment_order','asc','yes');
INSERT INTO `wp_options` VALUES (77,'sticky_posts','a:0:{}','yes');
INSERT INTO `wp_options` VALUES (78,'widget_categories','a:2:{i:2;a:4:{s:5:\"title\";s:0:\"\";s:5:\"count\";i:0;s:12:\"hierarchical\";i:0;s:8:\"dropdown\";i:0;}s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (79,'widget_text','a:2:{i:1;a:0:{}s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (80,'widget_rss','a:2:{i:1;a:0:{}s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (81,'uninstall_plugins','a:0:{}','no');
INSERT INTO `wp_options` VALUES (82,'timezone_string','','yes');
INSERT INTO `wp_options` VALUES (83,'page_for_posts','0','yes');
INSERT INTO `wp_options` VALUES (84,'page_on_front','0','yes');
INSERT INTO `wp_options` VALUES (85,'default_post_format','0','yes');
INSERT INTO `wp_options` VALUES (86,'link_manager_enabled','0','yes');
INSERT INTO `wp_options` VALUES (87,'finished_splitting_shared_terms','1','yes');
INSERT INTO `wp_options` VALUES (88,'site_icon','104','yes');
INSERT INTO `wp_options` VALUES (89,'medium_large_size_w','768','yes');
INSERT INTO `wp_options` VALUES (90,'medium_large_size_h','0','yes');
INSERT INTO `wp_options` VALUES (91,'wp_page_for_privacy_policy','3','yes');
INSERT INTO `wp_options` VALUES (92,'show_comments_cookies_opt_in','1','yes');
INSERT INTO `wp_options` VALUES (93,'admin_email_lifespan','1600572573','yes');
INSERT INTO `wp_options` VALUES (94,'initial_db_version','45805','yes');
INSERT INTO `wp_options` VALUES (95,'wp_user_roles','a:5:{s:13:\"administrator\";a:2:{s:4:\"name\";s:13:\"Administrator\";s:12:\"capabilities\";a:61:{s:13:\"switch_themes\";b:1;s:11:\"edit_themes\";b:1;s:16:\"activate_plugins\";b:1;s:12:\"edit_plugins\";b:1;s:10:\"edit_users\";b:1;s:10:\"edit_files\";b:1;s:14:\"manage_options\";b:1;s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:6:\"import\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:8:\"level_10\";b:1;s:7:\"level_9\";b:1;s:7:\"level_8\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;s:12:\"delete_users\";b:1;s:12:\"create_users\";b:1;s:17:\"unfiltered_upload\";b:1;s:14:\"edit_dashboard\";b:1;s:14:\"update_plugins\";b:1;s:14:\"delete_plugins\";b:1;s:15:\"install_plugins\";b:1;s:13:\"update_themes\";b:1;s:14:\"install_themes\";b:1;s:11:\"update_core\";b:1;s:10:\"list_users\";b:1;s:12:\"remove_users\";b:1;s:13:\"promote_users\";b:1;s:18:\"edit_theme_options\";b:1;s:13:\"delete_themes\";b:1;s:6:\"export\";b:1;}}s:6:\"editor\";a:2:{s:4:\"name\";s:6:\"Editor\";s:12:\"capabilities\";a:34:{s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;}}s:6:\"author\";a:2:{s:4:\"name\";s:6:\"Author\";s:12:\"capabilities\";a:10:{s:12:\"upload_files\";b:1;s:10:\"edit_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;s:22:\"delete_published_posts\";b:1;}}s:11:\"contributor\";a:2:{s:4:\"name\";s:11:\"Contributor\";s:12:\"capabilities\";a:5:{s:10:\"edit_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;}}s:10:\"subscriber\";a:2:{s:4:\"name\";s:10:\"Subscriber\";s:12:\"capabilities\";a:2:{s:4:\"read\";b:1;s:7:\"level_0\";b:1;}}}','yes');
INSERT INTO `wp_options` VALUES (96,'fresh_site','0','yes');
INSERT INTO `wp_options` VALUES (97,'widget_search','a:2:{i:2;a:1:{s:5:\"title\";s:0:\"\";}s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (98,'widget_recent-posts','a:2:{i:2;a:2:{s:5:\"title\";s:0:\"\";s:6:\"number\";i:5;}s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (99,'widget_recent-comments','a:2:{i:2;a:2:{s:5:\"title\";s:0:\"\";s:6:\"number\";i:5;}s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (100,'widget_archives','a:2:{i:2;a:3:{s:5:\"title\";s:0:\"\";s:5:\"count\";i:0;s:8:\"dropdown\";i:0;}s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (101,'widget_meta','a:2:{i:2;a:1:{s:5:\"title\";s:0:\"\";}s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (102,'sidebars_widgets','a:2:{s:19:\"wp_inactive_widgets\";a:6:{i:0;s:8:\"search-2\";i:1;s:14:\"recent-posts-2\";i:2;s:17:\"recent-comments-2\";i:3;s:10:\"archives-2\";i:4;s:12:\"categories-2\";i:5;s:6:\"meta-2\";}s:13:\"array_version\";i:3;}','yes');
INSERT INTO `wp_options` VALUES (103,'cron','a:5:{i:1586741374;a:1:{s:34:\"wp_privacy_delete_old_export_files\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:6:\"hourly\";s:4:\"args\";a:0:{}s:8:\"interval\";i:3600;}}}i:1586745090;a:1:{s:30:\"wp_scheduled_auto_draft_delete\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}i:1586748574;a:4:{s:32:\"recovery_mode_clean_expired_keys\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}s:16:\"wp_version_check\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}s:17:\"wp_update_plugins\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}s:16:\"wp_update_themes\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1586749923;a:2:{s:19:\"wp_scheduled_delete\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}s:25:\"delete_expired_transients\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}s:7:\"version\";i:2;}','yes');
INSERT INTO `wp_options` VALUES (104,'widget_pages','a:1:{s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (105,'widget_calendar','a:1:{s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (106,'widget_media_audio','a:1:{s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (107,'widget_media_image','a:1:{s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (108,'widget_media_gallery','a:1:{s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (109,'widget_media_video','a:1:{s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (110,'nonce_key','(1&xVBvlp>vae==@Me|JZwx{U`-EpR$1VL?#)Dz$P_s3Y&*!~ac0bU<Z4rkOihNS','no');
INSERT INTO `wp_options` VALUES (111,'nonce_salt','yU[nG>=cry.[(.;W@rXu>@8/egIRg0zbw+aEX+hl+/G,G(Qd@9=bu0@MhkZ;RgF[','no');
INSERT INTO `wp_options` VALUES (112,'widget_tag_cloud','a:1:{s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (113,'widget_nav_menu','a:1:{s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (114,'widget_custom_html','a:1:{s:12:\"_multiwidget\";i:1;}','yes');
INSERT INTO `wp_options` VALUES (116,'_site_transient_update_core','O:8:\"stdClass\":4:{s:7:\"updates\";a:2:{i:0;O:8:\"stdClass\":10:{s:8:\"response\";s:7:\"upgrade\";s:8:\"download\";s:57:\"https://downloads.wordpress.org/release/wordpress-5.4.zip\";s:6:\"locale\";s:5:\"en_US\";s:8:\"packages\";O:8:\"stdClass\":5:{s:4:\"full\";s:57:\"https://downloads.wordpress.org/release/wordpress-5.4.zip\";s:10:\"no_content\";s:68:\"https://downloads.wordpress.org/release/wordpress-5.4-no-content.zip\";s:11:\"new_bundled\";s:69:\"https://downloads.wordpress.org/release/wordpress-5.4-new-bundled.zip\";s:7:\"partial\";b:0;s:8:\"rollback\";b:0;}s:7:\"current\";s:3:\"5.4\";s:7:\"version\";s:3:\"5.4\";s:11:\"php_version\";s:6:\"5.6.20\";s:13:\"mysql_version\";s:3:\"5.0\";s:11:\"new_bundled\";s:3:\"5.3\";s:15:\"partial_version\";s:0:\"\";}i:1;O:8:\"stdClass\":11:{s:8:\"response\";s:10:\"autoupdate\";s:8:\"download\";s:57:\"https://downloads.wordpress.org/release/wordpress-5.4.zip\";s:6:\"locale\";s:5:\"en_US\";s:8:\"packages\";O:8:\"stdClass\":5:{s:4:\"full\";s:57:\"https://downloads.wordpress.org/release/wordpress-5.4.zip\";s:10:\"no_content\";s:68:\"https://downloads.wordpress.org/release/wordpress-5.4-no-content.zip\";s:11:\"new_bundled\";s:69:\"https://downloads.wordpress.org/release/wordpress-5.4-new-bundled.zip\";s:7:\"partial\";b:0;s:8:\"rollback\";b:0;}s:7:\"current\";s:3:\"5.4\";s:7:\"version\";s:3:\"5.4\";s:11:\"php_version\";s:6:\"5.6.20\";s:13:\"mysql_version\";s:3:\"5.0\";s:11:\"new_bundled\";s:3:\"5.3\";s:15:\"partial_version\";s:0:\"\";s:9:\"new_files\";s:1:\"1\";}}s:12:\"last_checked\";i:1586740511;s:15:\"version_checked\";s:5:\"5.3.2\";s:12:\"translations\";a:0:{}}','no');
INSERT INTO `wp_options` VALUES (117,'recovery_keys','a:0:{}','yes');
INSERT INTO `wp_options` VALUES (122,'_site_transient_update_themes','O:8:\"stdClass\":4:{s:12:\"last_checked\";i:1586740513;s:7:\"checked\";a:1:{s:25:\"kevingarubba.com-wp-theme\";s:0:\"\";}s:8:\"response\";a:0:{}s:12:\"translations\";a:0:{}}','no');
INSERT INTO `wp_options` VALUES (124,'can_compress_scripts','1','no');
INSERT INTO `wp_options` VALUES (125,'theme_mods_twentytwenty','a:1:{s:16:\"sidebars_widgets\";a:2:{s:4:\"time\";i:1585021929;s:4:\"data\";a:3:{s:19:\"wp_inactive_widgets\";a:0:{}s:9:\"sidebar-1\";a:3:{i:0;s:8:\"search-2\";i:1;s:14:\"recent-posts-2\";i:2;s:17:\"recent-comments-2\";}s:9:\"sidebar-2\";a:3:{i:0;s:10:\"archives-2\";i:1;s:12:\"categories-2\";i:2;s:6:\"meta-2\";}}}}','yes');
INSERT INTO `wp_options` VALUES (126,'current_theme','kevingarubba.com WP Theme','yes');
INSERT INTO `wp_options` VALUES (127,'theme_mods_kevingarubba.com-wp-theme/..','a:3:{i:0;b:0;s:18:\"nav_menu_locations\";a:0:{}s:16:\"sidebars_widgets\";a:2:{s:4:\"time\";i:1585023260;s:4:\"data\";a:1:{s:19:\"wp_inactive_widgets\";a:6:{i:0;s:8:\"search-2\";i:1;s:14:\"recent-posts-2\";i:2;s:17:\"recent-comments-2\";i:3;s:10:\"archives-2\";i:4;s:12:\"categories-2\";i:5;s:6:\"meta-2\";}}}}','yes');
INSERT INTO `wp_options` VALUES (128,'theme_switched','','yes');
INSERT INTO `wp_options` VALUES (130,'theme_mods_kevingarubba.com-wp-theme','a:4:{i:0;b:0;s:18:\"nav_menu_locations\";a:0:{}s:18:\"custom_css_post_id\";i:-1;s:11:\"custom_logo\";i:106;}','yes');
INSERT INTO `wp_options` VALUES (157,'recently_activated','a:0:{}','yes');
INSERT INTO `wp_options` VALUES (200,'recovery_mode_email_last_sent','1585424248','yes');
INSERT INTO `wp_options` VALUES (210,'acf_version','5.8.9','yes');
INSERT INTO `wp_options` VALUES (234,'_site_transient_update_plugins','O:8:\"stdClass\":4:{s:12:\"last_checked\";i:1586740511;s:8:\"response\";a:0:{}s:12:\"translations\";a:0:{}s:9:\"no_update\";a:3:{s:36:\"contact-form-7/wp-contact-form-7.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:28:\"w.org/plugins/contact-form-7\";s:4:\"slug\";s:14:\"contact-form-7\";s:6:\"plugin\";s:36:\"contact-form-7/wp-contact-form-7.php\";s:11:\"new_version\";s:5:\"5.1.7\";s:3:\"url\";s:45:\"https://wordpress.org/plugins/contact-form-7/\";s:7:\"package\";s:63:\"https://downloads.wordpress.org/plugin/contact-form-7.5.1.7.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:67:\"https://ps.w.org/contact-form-7/assets/icon-256x256.png?rev=2279696\";s:2:\"1x\";s:67:\"https://ps.w.org/contact-form-7/assets/icon-128x128.png?rev=2279696\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:69:\"https://ps.w.org/contact-form-7/assets/banner-1544x500.png?rev=860901\";s:2:\"1x\";s:68:\"https://ps.w.org/contact-form-7/assets/banner-772x250.png?rev=880427\";}s:11:\"banners_rtl\";a:0:{}}s:25:\"fakerpress/fakerpress.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:24:\"w.org/plugins/fakerpress\";s:4:\"slug\";s:10:\"fakerpress\";s:6:\"plugin\";s:25:\"fakerpress/fakerpress.php\";s:11:\"new_version\";s:5:\"0.5.0\";s:3:\"url\";s:41:\"https://wordpress.org/plugins/fakerpress/\";s:7:\"package\";s:53:\"https://downloads.wordpress.org/plugin/fakerpress.zip\";s:5:\"icons\";a:3:{s:2:\"2x\";s:63:\"https://ps.w.org/fakerpress/assets/icon-256x256.png?rev=1846090\";s:2:\"1x\";s:55:\"https://ps.w.org/fakerpress/assets/icon.svg?rev=1846090\";s:3:\"svg\";s:55:\"https://ps.w.org/fakerpress/assets/icon.svg?rev=1846090\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:66:\"https://ps.w.org/fakerpress/assets/banner-1544x500.png?rev=1152002\";s:2:\"1x\";s:65:\"https://ps.w.org/fakerpress/assets/banner-772x250.png?rev=1152002\";}s:11:\"banners_rtl\";a:0:{}}s:45:\"wp-rest-api-v2-menus/wp-rest-api-v2-menus.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:34:\"w.org/plugins/wp-rest-api-v2-menus\";s:4:\"slug\";s:20:\"wp-rest-api-v2-menus\";s:6:\"plugin\";s:45:\"wp-rest-api-v2-menus/wp-rest-api-v2-menus.php\";s:11:\"new_version\";s:5:\"0.7.7\";s:3:\"url\";s:51:\"https://wordpress.org/plugins/wp-rest-api-v2-menus/\";s:7:\"package\";s:69:\"https://downloads.wordpress.org/plugin/wp-rest-api-v2-menus.0.7.7.zip\";s:5:\"icons\";a:1:{s:7:\"default\";s:64:\"https://s.w.org/plugins/geopattern-icon/wp-rest-api-v2-menus.svg\";}s:7:\"banners\";a:0:{}s:11:\"banners_rtl\";a:0:{}}}}','no');
INSERT INTO `wp_options` VALUES (235,'wpcf7','a:2:{s:7:\"version\";s:5:\"5.1.7\";s:13:\"bulk_validate\";a:4:{s:9:\"timestamp\";i:1585449907;s:7:\"version\";s:5:\"5.1.7\";s:11:\"count_valid\";i:1;s:13:\"count_invalid\";i:0;}}','yes');
INSERT INTO `wp_options` VALUES (237,'_transient_timeout_acf_plugin_updates','1586913312','no');
INSERT INTO `wp_options` VALUES (238,'_transient_acf_plugin_updates','a:4:{s:7:\"plugins\";a:0:{}s:10:\"expiration\";i:172800;s:6:\"status\";i:1;s:7:\"checked\";a:1:{s:34:\"advanced-custom-fields-pro/acf.php\";s:5:\"5.8.9\";}}','no');
INSERT INTO `wp_options` VALUES (239,'_site_transient_timeout_theme_roots','1586742313','no');
INSERT INTO `wp_options` VALUES (240,'_site_transient_theme_roots','a:1:{s:25:\"kevingarubba.com-wp-theme\";s:7:\"/themes\";}','no');
/*!40000 ALTER TABLE `wp_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_postmeta`
--

DROP TABLE IF EXISTS `wp_postmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_postmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_520_ci,
  PRIMARY KEY (`meta_id`),
  KEY `post_id` (`post_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=836 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_postmeta`
--

LOCK TABLES `wp_postmeta` WRITE;
/*!40000 ALTER TABLE `wp_postmeta` DISABLE KEYS */;
INSERT INTO `wp_postmeta` VALUES (1,2,'_wp_page_template','default');
INSERT INTO `wp_postmeta` VALUES (2,3,'_wp_page_template','default');
INSERT INTO `wp_postmeta` VALUES (3,5,'_wp_attached_file','2020/03/c06ed897-708e-32e9-9d44-781a8a95c475.png');
INSERT INTO `wp_postmeta` VALUES (4,5,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:473;s:6:\"height\";i:378;s:4:\"file\";s:48:\"2020/03/c06ed897-708e-32e9-9d44-781a8a95c475.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"c06ed897-708e-32e9-9d44-781a8a95c475-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"c06ed897-708e-32e9-9d44-781a8a95c475-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (5,5,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (6,5,'_fakerpress_orginal_url','http://placehold.it/473x378/');
INSERT INTO `wp_postmeta` VALUES (7,6,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (8,7,'_wp_attached_file','2020/03/fe50fe45-cc3d-3d21-9c97-ca88a6a081fd.jpg');
INSERT INTO `wp_postmeta` VALUES (9,7,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:1052;s:6:\"height\";i:701;s:4:\"file\";s:48:\"2020/03/fe50fe45-cc3d-3d21-9c97-ca88a6a081fd.jpg\";s:5:\"sizes\";a:4:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"fe50fe45-cc3d-3d21-9c97-ca88a6a081fd-300x200.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:200;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:5:\"large\";a:4:{s:4:\"file\";s:49:\"fe50fe45-cc3d-3d21-9c97-ca88a6a081fd-1024x682.jpg\";s:5:\"width\";i:1024;s:6:\"height\";i:682;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"fe50fe45-cc3d-3d21-9c97-ca88a6a081fd-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:12:\"medium_large\";a:4:{s:4:\"file\";s:48:\"fe50fe45-cc3d-3d21-9c97-ca88a6a081fd-768x512.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:512;s:9:\"mime-type\";s:10:\"image/jpeg\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"1\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (10,7,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (11,7,'_fakerpress_orginal_url','https://picsum.photos/1052/701/?random');
INSERT INTO `wp_postmeta` VALUES (12,6,'_thumbnail_id','7');
INSERT INTO `wp_postmeta` VALUES (13,8,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (14,9,'_wp_attached_file','2020/03/04dcca53-3e7c-30d1-b5a5-1fe3663963dd.png');
INSERT INTO `wp_postmeta` VALUES (15,9,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:532;s:6:\"height\";i:425;s:4:\"file\";s:48:\"2020/03/04dcca53-3e7c-30d1-b5a5-1fe3663963dd.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"04dcca53-3e7c-30d1-b5a5-1fe3663963dd-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"04dcca53-3e7c-30d1-b5a5-1fe3663963dd-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (16,9,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (17,9,'_fakerpress_orginal_url','http://placehold.it/532x425/');
INSERT INTO `wp_postmeta` VALUES (18,8,'_thumbnail_id','9');
INSERT INTO `wp_postmeta` VALUES (19,10,'_wp_attached_file','2020/03/a2bcae62-e7c2-370f-9f25-a2da0d4f8ecd.png');
INSERT INTO `wp_postmeta` VALUES (20,10,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:625;s:6:\"height\";i:500;s:4:\"file\";s:48:\"2020/03/a2bcae62-e7c2-370f-9f25-a2da0d4f8ecd.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"a2bcae62-e7c2-370f-9f25-a2da0d4f8ecd-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"a2bcae62-e7c2-370f-9f25-a2da0d4f8ecd-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (21,10,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (22,10,'_fakerpress_orginal_url','http://placehold.it/625x500/');
INSERT INTO `wp_postmeta` VALUES (23,11,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (24,12,'_wp_attached_file','2020/03/a1769178-c8b4-3ba9-8470-4b1a448331d6.png');
INSERT INTO `wp_postmeta` VALUES (25,12,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:524;s:6:\"height\";i:419;s:4:\"file\";s:48:\"2020/03/a1769178-c8b4-3ba9-8470-4b1a448331d6.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"a1769178-c8b4-3ba9-8470-4b1a448331d6-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"a1769178-c8b4-3ba9-8470-4b1a448331d6-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (26,12,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (27,12,'_fakerpress_orginal_url','http://placehold.it/524x419/');
INSERT INTO `wp_postmeta` VALUES (28,11,'_thumbnail_id','12');
INSERT INTO `wp_postmeta` VALUES (29,13,'_wp_attached_file','2020/03/59fd6c4c-9834-3314-980f-e5b626aea78c.jpg');
INSERT INTO `wp_postmeta` VALUES (30,13,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:1100;s:6:\"height\";i:733;s:4:\"file\";s:48:\"2020/03/59fd6c4c-9834-3314-980f-e5b626aea78c.jpg\";s:5:\"sizes\";a:4:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"59fd6c4c-9834-3314-980f-e5b626aea78c-300x200.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:200;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:5:\"large\";a:4:{s:4:\"file\";s:49:\"59fd6c4c-9834-3314-980f-e5b626aea78c-1024x682.jpg\";s:5:\"width\";i:1024;s:6:\"height\";i:682;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"59fd6c4c-9834-3314-980f-e5b626aea78c-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:12:\"medium_large\";a:4:{s:4:\"file\";s:48:\"59fd6c4c-9834-3314-980f-e5b626aea78c-768x512.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:512;s:9:\"mime-type\";s:10:\"image/jpeg\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"1\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (31,13,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (32,13,'_fakerpress_orginal_url','https://picsum.photos/1100/733/?random');
INSERT INTO `wp_postmeta` VALUES (33,14,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (34,15,'_wp_attached_file','2020/03/50d528d8-4c5d-3e9e-8940-e95b7754d9ad.png');
INSERT INTO `wp_postmeta` VALUES (35,15,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:406;s:6:\"height\";i:324;s:4:\"file\";s:48:\"2020/03/50d528d8-4c5d-3e9e-8940-e95b7754d9ad.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"50d528d8-4c5d-3e9e-8940-e95b7754d9ad-300x239.png\";s:5:\"width\";i:300;s:6:\"height\";i:239;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"50d528d8-4c5d-3e9e-8940-e95b7754d9ad-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (36,15,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (37,15,'_fakerpress_orginal_url','http://placehold.it/406x324/');
INSERT INTO `wp_postmeta` VALUES (38,14,'_thumbnail_id','15');
INSERT INTO `wp_postmeta` VALUES (39,16,'_wp_attached_file','2020/03/fe93da88-bb8b-3039-be20-3b10cdd8a595.png');
INSERT INTO `wp_postmeta` VALUES (40,16,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:407;s:6:\"height\";i:325;s:4:\"file\";s:48:\"2020/03/fe93da88-bb8b-3039-be20-3b10cdd8a595.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"fe93da88-bb8b-3039-be20-3b10cdd8a595-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"fe93da88-bb8b-3039-be20-3b10cdd8a595-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (41,16,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (42,16,'_fakerpress_orginal_url','http://placehold.it/407x325/');
INSERT INTO `wp_postmeta` VALUES (43,17,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (44,18,'_wp_attached_file','2020/03/d4958e7e-792e-3121-8600-167e7bba4b60.png');
INSERT INTO `wp_postmeta` VALUES (45,18,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:566;s:6:\"height\";i:452;s:4:\"file\";s:48:\"2020/03/d4958e7e-792e-3121-8600-167e7bba4b60.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"d4958e7e-792e-3121-8600-167e7bba4b60-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"d4958e7e-792e-3121-8600-167e7bba4b60-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (46,18,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (47,18,'_fakerpress_orginal_url','http://placehold.it/566x452/');
INSERT INTO `wp_postmeta` VALUES (48,17,'_thumbnail_id','18');
INSERT INTO `wp_postmeta` VALUES (49,19,'_wp_attached_file','2020/03/d417d930-e9cb-3ca2-a73f-313405bd53eb.png');
INSERT INTO `wp_postmeta` VALUES (50,19,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:384;s:6:\"height\";i:307;s:4:\"file\";s:48:\"2020/03/d417d930-e9cb-3ca2-a73f-313405bd53eb.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"d417d930-e9cb-3ca2-a73f-313405bd53eb-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"d417d930-e9cb-3ca2-a73f-313405bd53eb-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (51,19,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (52,19,'_fakerpress_orginal_url','http://placehold.it/384x307/');
INSERT INTO `wp_postmeta` VALUES (53,20,'_wp_attached_file','2020/03/5203694b-de22-3ad0-821f-1912cc532d32.png');
INSERT INTO `wp_postmeta` VALUES (54,20,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:408;s:6:\"height\";i:326;s:4:\"file\";s:48:\"2020/03/5203694b-de22-3ad0-821f-1912cc532d32.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"5203694b-de22-3ad0-821f-1912cc532d32-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"5203694b-de22-3ad0-821f-1912cc532d32-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (55,20,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (56,20,'_fakerpress_orginal_url','http://placehold.it/408x326/');
INSERT INTO `wp_postmeta` VALUES (57,21,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (58,22,'_wp_attached_file','2020/03/b01da293-4aae-3255-9aa8-8a777ffedf66.png');
INSERT INTO `wp_postmeta` VALUES (59,22,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:439;s:6:\"height\";i:351;s:4:\"file\";s:48:\"2020/03/b01da293-4aae-3255-9aa8-8a777ffedf66.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"b01da293-4aae-3255-9aa8-8a777ffedf66-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"b01da293-4aae-3255-9aa8-8a777ffedf66-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (60,22,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (61,22,'_fakerpress_orginal_url','http://placehold.it/439x351/');
INSERT INTO `wp_postmeta` VALUES (62,21,'_thumbnail_id','22');
INSERT INTO `wp_postmeta` VALUES (63,23,'_wp_attached_file','2020/03/cd181924-af17-3556-aac0-9807605f3c30.png');
INSERT INTO `wp_postmeta` VALUES (64,23,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:420;s:6:\"height\";i:336;s:4:\"file\";s:48:\"2020/03/cd181924-af17-3556-aac0-9807605f3c30.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"cd181924-af17-3556-aac0-9807605f3c30-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"cd181924-af17-3556-aac0-9807605f3c30-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (65,23,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (66,23,'_fakerpress_orginal_url','http://placehold.it/420x336/');
INSERT INTO `wp_postmeta` VALUES (67,24,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (68,25,'_wp_attached_file','2020/03/fab6f089-2335-376d-a820-3394ab0718b1.png');
INSERT INTO `wp_postmeta` VALUES (69,25,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:538;s:6:\"height\";i:430;s:4:\"file\";s:48:\"2020/03/fab6f089-2335-376d-a820-3394ab0718b1.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:48:\"fab6f089-2335-376d-a820-3394ab0718b1-300x240.png\";s:5:\"width\";i:300;s:6:\"height\";i:240;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:48:\"fab6f089-2335-376d-a820-3394ab0718b1-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (70,25,'fakerpress_flag','1');
INSERT INTO `wp_postmeta` VALUES (71,25,'_fakerpress_orginal_url','http://placehold.it/538x430/');
INSERT INTO `wp_postmeta` VALUES (72,24,'_thumbnail_id','25');
INSERT INTO `wp_postmeta` VALUES (73,3,'_edit_last','1');
INSERT INTO `wp_postmeta` VALUES (74,3,'_edit_lock','1585190107:1');
INSERT INTO `wp_postmeta` VALUES (81,33,'_edit_lock','1585428538:1');
INSERT INTO `wp_postmeta` VALUES (99,52,'_wp_attached_file','2020/03/0.jpeg');
INSERT INTO `wp_postmeta` VALUES (100,52,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:200;s:6:\"height\";i:200;s:4:\"file\";s:14:\"2020/03/0.jpeg\";s:5:\"sizes\";a:1:{s:9:\"thumbnail\";a:4:{s:4:\"file\";s:14:\"0-150x150.jpeg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (101,33,'_thumbnail_id','13');
INSERT INTO `wp_postmeta` VALUES (104,55,'_edit_last','1');
INSERT INTO `wp_postmeta` VALUES (105,55,'_edit_lock','1585448473:1');
INSERT INTO `wp_postmeta` VALUES (106,72,'_edit_lock','1585452078:1');
INSERT INTO `wp_postmeta` VALUES (107,72,'_wp_page_template','page-about.php');
INSERT INTO `wp_postmeta` VALUES (108,72,'_edit_last','1');
INSERT INTO `wp_postmeta` VALUES (109,72,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (110,72,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (111,72,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (112,72,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (113,72,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (114,72,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (115,72,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (116,72,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (117,72,'tech_list','5');
INSERT INTO `wp_postmeta` VALUES (118,72,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (119,72,'call_to_action_section_section_title','What’s your project?');
INSERT INTO `wp_postmeta` VALUES (120,72,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (121,72,'call_to_action_section_section_description','So whether you’re building a new website, mobile app or just designing your entire brand from the ground up, let’s talk. We’ll turn your vision into a reality.');
INSERT INTO `wp_postmeta` VALUES (122,72,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (123,72,'call_to_action_section_call_to_action_buttons','2');
INSERT INTO `wp_postmeta` VALUES (124,72,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (125,72,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (126,72,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (127,72,'_','field_5e7fba4ec7c9a');
INSERT INTO `wp_postmeta` VALUES (128,73,'hero_title','');
INSERT INTO `wp_postmeta` VALUES (129,73,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (130,73,'hero_text','');
INSERT INTO `wp_postmeta` VALUES (131,73,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (132,73,'my_specialties','');
INSERT INTO `wp_postmeta` VALUES (133,73,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (134,73,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (135,73,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (136,73,'tech_list','');
INSERT INTO `wp_postmeta` VALUES (137,73,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (138,73,'call_to_action_section_section_title','');
INSERT INTO `wp_postmeta` VALUES (139,73,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (140,73,'call_to_action_section_section_description','');
INSERT INTO `wp_postmeta` VALUES (141,73,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (142,73,'call_to_action_section_call_to_action_buttons','');
INSERT INTO `wp_postmeta` VALUES (143,73,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (144,73,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (145,73,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (146,72,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (147,72,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (148,74,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (149,74,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (150,74,'hero_text','');
INSERT INTO `wp_postmeta` VALUES (151,74,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (152,74,'my_specialties','');
INSERT INTO `wp_postmeta` VALUES (153,74,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (154,74,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (155,74,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (156,74,'tech_list','');
INSERT INTO `wp_postmeta` VALUES (157,74,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (158,74,'call_to_action_section_section_title','');
INSERT INTO `wp_postmeta` VALUES (159,74,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (160,74,'call_to_action_section_section_description','');
INSERT INTO `wp_postmeta` VALUES (161,74,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (162,74,'call_to_action_section_call_to_action_buttons','');
INSERT INTO `wp_postmeta` VALUES (163,74,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (164,74,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (165,74,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (166,74,'specialty_section_title','');
INSERT INTO `wp_postmeta` VALUES (167,74,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (168,75,'_wp_attached_file','2020/03/icon-design.png');
INSERT INTO `wp_postmeta` VALUES (169,75,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:186;s:6:\"height\";i:186;s:4:\"file\";s:23:\"2020/03/icon-design.png\";s:5:\"sizes\";a:1:{s:9:\"thumbnail\";a:4:{s:4:\"file\";s:23:\"icon-design-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (170,76,'_wp_attached_file','2020/03/icon-web.png');
INSERT INTO `wp_postmeta` VALUES (171,76,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:186;s:6:\"height\";i:186;s:4:\"file\";s:20:\"2020/03/icon-web.png\";s:5:\"sizes\";a:1:{s:9:\"thumbnail\";a:4:{s:4:\"file\";s:20:\"icon-web-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (172,77,'_wp_attached_file','2020/03/icon-mobile.png');
INSERT INTO `wp_postmeta` VALUES (173,77,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:186;s:6:\"height\";i:186;s:4:\"file\";s:23:\"2020/03/icon-mobile.png\";s:5:\"sizes\";a:1:{s:9:\"thumbnail\";a:4:{s:4:\"file\";s:23:\"icon-mobile-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (174,78,'_wp_attached_file','2020/03/icon-social.png');
INSERT INTO `wp_postmeta` VALUES (175,78,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:186;s:6:\"height\";i:186;s:4:\"file\";s:23:\"2020/03/icon-social.png\";s:5:\"sizes\";a:1:{s:9:\"thumbnail\";a:4:{s:4:\"file\";s:23:\"icon-social-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (176,72,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (177,72,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (178,72,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (179,72,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (180,72,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (181,72,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (182,72,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (183,72,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (184,72,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (185,72,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (186,72,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (187,72,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (188,72,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (189,72,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (190,72,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (191,72,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (192,79,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (193,79,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (194,79,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (195,79,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (196,79,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (197,79,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (198,79,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (199,79,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (200,79,'tech_list','');
INSERT INTO `wp_postmeta` VALUES (201,79,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (202,79,'call_to_action_section_section_title','');
INSERT INTO `wp_postmeta` VALUES (203,79,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (204,79,'call_to_action_section_section_description','');
INSERT INTO `wp_postmeta` VALUES (205,79,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (206,79,'call_to_action_section_call_to_action_buttons','');
INSERT INTO `wp_postmeta` VALUES (207,79,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (208,79,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (209,79,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (210,79,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (211,79,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (212,79,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (213,79,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (214,79,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (215,79,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (216,79,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (217,79,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (218,79,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (219,79,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (220,79,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (221,79,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (222,79,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (223,79,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (224,79,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (225,79,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (226,79,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (227,79,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (228,80,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (229,80,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (230,80,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (231,80,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (232,80,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (233,80,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (234,80,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (235,80,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (236,80,'tech_list','');
INSERT INTO `wp_postmeta` VALUES (237,80,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (238,80,'call_to_action_section_section_title','');
INSERT INTO `wp_postmeta` VALUES (239,80,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (240,80,'call_to_action_section_section_description','');
INSERT INTO `wp_postmeta` VALUES (241,80,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (242,80,'call_to_action_section_call_to_action_buttons','');
INSERT INTO `wp_postmeta` VALUES (243,80,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (244,80,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (245,80,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (246,80,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (247,80,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (248,80,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (249,80,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (250,80,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (251,80,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (252,80,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (253,80,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (254,80,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (255,80,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (256,80,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (257,80,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (258,80,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (259,80,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (260,80,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (261,80,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (262,80,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (263,80,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (264,81,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (265,81,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (266,81,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (267,81,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (268,81,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (269,81,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (270,81,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (271,81,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (272,81,'tech_list','');
INSERT INTO `wp_postmeta` VALUES (273,81,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (274,81,'call_to_action_section_section_title','');
INSERT INTO `wp_postmeta` VALUES (275,81,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (276,81,'call_to_action_section_section_description','');
INSERT INTO `wp_postmeta` VALUES (277,81,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (278,81,'call_to_action_section_call_to_action_buttons','');
INSERT INTO `wp_postmeta` VALUES (279,81,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (280,81,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (281,81,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (282,81,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (283,81,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (284,81,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (285,81,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (286,81,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (287,81,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (288,81,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (289,81,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (290,81,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (291,81,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (292,81,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (293,81,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (294,81,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (295,81,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (296,81,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (297,81,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (298,81,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (299,81,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (300,72,'tech_list_0_tech_icon','83');
INSERT INTO `wp_postmeta` VALUES (301,72,'_tech_list_0_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (302,72,'tech_list_0_tech_label','Wordpress Development');
INSERT INTO `wp_postmeta` VALUES (303,72,'_tech_list_0_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (304,72,'tech_list_1_tech_icon','87');
INSERT INTO `wp_postmeta` VALUES (305,72,'_tech_list_1_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (306,72,'tech_list_1_tech_label','React & React Native');
INSERT INTO `wp_postmeta` VALUES (307,72,'_tech_list_1_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (308,72,'tech_list_2_tech_icon','84');
INSERT INTO `wp_postmeta` VALUES (309,72,'_tech_list_2_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (310,72,'tech_list_2_tech_label','Electron');
INSERT INTO `wp_postmeta` VALUES (311,72,'_tech_list_2_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (312,72,'tech_list_3_tech_icon','88');
INSERT INTO `wp_postmeta` VALUES (313,72,'_tech_list_3_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (314,72,'tech_list_3_tech_label','Shopify Development');
INSERT INTO `wp_postmeta` VALUES (315,72,'_tech_list_3_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (316,72,'tech_list_4_tech_icon','89');
INSERT INTO `wp_postmeta` VALUES (317,72,'_tech_list_4_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (318,72,'tech_list_4_tech_label','Drupal Development');
INSERT INTO `wp_postmeta` VALUES (319,72,'_tech_list_4_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (320,82,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (321,82,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (322,82,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (323,82,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (324,82,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (325,82,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (326,82,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (327,82,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (328,82,'tech_list','5');
INSERT INTO `wp_postmeta` VALUES (329,82,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (330,82,'call_to_action_section_section_title','');
INSERT INTO `wp_postmeta` VALUES (331,82,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (332,82,'call_to_action_section_section_description','');
INSERT INTO `wp_postmeta` VALUES (333,82,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (334,82,'call_to_action_section_call_to_action_buttons','');
INSERT INTO `wp_postmeta` VALUES (335,82,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (336,82,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (337,82,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (338,82,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (339,82,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (340,82,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (341,82,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (342,82,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (343,82,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (344,82,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (345,82,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (346,82,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (347,82,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (348,82,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (349,82,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (350,82,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (351,82,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (352,82,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (353,82,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (354,82,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (355,82,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (356,82,'tech_list_0_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (357,82,'_tech_list_0_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (358,82,'tech_list_0_tech_label','Wordpress Development');
INSERT INTO `wp_postmeta` VALUES (359,82,'_tech_list_0_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (360,82,'tech_list_1_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (361,82,'_tech_list_1_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (362,82,'tech_list_1_tech_label','React & React Native');
INSERT INTO `wp_postmeta` VALUES (363,82,'_tech_list_1_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (364,82,'tech_list_2_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (365,82,'_tech_list_2_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (366,82,'tech_list_2_tech_label','Electron');
INSERT INTO `wp_postmeta` VALUES (367,82,'_tech_list_2_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (368,82,'tech_list_3_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (369,82,'_tech_list_3_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (370,82,'tech_list_3_tech_label','Shopify Development');
INSERT INTO `wp_postmeta` VALUES (371,82,'_tech_list_3_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (372,82,'tech_list_4_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (373,82,'_tech_list_4_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (374,82,'tech_list_4_tech_label','Drupal Development');
INSERT INTO `wp_postmeta` VALUES (375,82,'_tech_list_4_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (376,83,'_wp_attached_file','2020/03/wordpress.png');
INSERT INTO `wp_postmeta` VALUES (377,83,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:512;s:6:\"height\";i:512;s:4:\"file\";s:21:\"2020/03/wordpress.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:21:\"wordpress-300x300.png\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:21:\"wordpress-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (378,84,'_wp_attached_file','2020/03/electron-1.png');
INSERT INTO `wp_postmeta` VALUES (379,84,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:1200;s:6:\"height\";i:1200;s:4:\"file\";s:22:\"2020/03/electron-1.png\";s:5:\"sizes\";a:4:{s:6:\"medium\";a:4:{s:4:\"file\";s:22:\"electron-1-300x300.png\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:9:\"image/png\";}s:5:\"large\";a:4:{s:4:\"file\";s:24:\"electron-1-1024x1024.png\";s:5:\"width\";i:1024;s:6:\"height\";i:1024;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:22:\"electron-1-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}s:12:\"medium_large\";a:4:{s:4:\"file\";s:22:\"electron-1-768x768.png\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (380,85,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (381,85,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (382,85,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (383,85,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (384,85,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (385,85,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (386,85,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (387,85,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (388,85,'tech_list','5');
INSERT INTO `wp_postmeta` VALUES (389,85,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (390,85,'call_to_action_section_section_title','');
INSERT INTO `wp_postmeta` VALUES (391,85,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (392,85,'call_to_action_section_section_description','');
INSERT INTO `wp_postmeta` VALUES (393,85,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (394,85,'call_to_action_section_call_to_action_buttons','');
INSERT INTO `wp_postmeta` VALUES (395,85,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (396,85,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (397,85,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (398,85,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (399,85,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (400,85,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (401,85,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (402,85,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (403,85,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (404,85,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (405,85,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (406,85,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (407,85,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (408,85,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (409,85,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (410,85,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (411,85,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (412,85,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (413,85,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (414,85,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (415,85,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (416,85,'tech_list_0_tech_icon','83');
INSERT INTO `wp_postmeta` VALUES (417,85,'_tech_list_0_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (418,85,'tech_list_0_tech_label','Wordpress Development');
INSERT INTO `wp_postmeta` VALUES (419,85,'_tech_list_0_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (420,85,'tech_list_1_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (421,85,'_tech_list_1_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (422,85,'tech_list_1_tech_label','React & React Native');
INSERT INTO `wp_postmeta` VALUES (423,85,'_tech_list_1_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (424,85,'tech_list_2_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (425,85,'_tech_list_2_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (426,85,'tech_list_2_tech_label','Electron');
INSERT INTO `wp_postmeta` VALUES (427,85,'_tech_list_2_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (428,85,'tech_list_3_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (429,85,'_tech_list_3_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (430,85,'tech_list_3_tech_label','Shopify Development');
INSERT INTO `wp_postmeta` VALUES (431,85,'_tech_list_3_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (432,85,'tech_list_4_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (433,85,'_tech_list_4_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (434,85,'tech_list_4_tech_label','Drupal Development');
INSERT INTO `wp_postmeta` VALUES (435,85,'_tech_list_4_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (436,86,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (437,86,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (438,86,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (439,86,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (440,86,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (441,86,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (442,86,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (443,86,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (444,86,'tech_list','5');
INSERT INTO `wp_postmeta` VALUES (445,86,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (446,86,'call_to_action_section_section_title','');
INSERT INTO `wp_postmeta` VALUES (447,86,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (448,86,'call_to_action_section_section_description','');
INSERT INTO `wp_postmeta` VALUES (449,86,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (450,86,'call_to_action_section_call_to_action_buttons','');
INSERT INTO `wp_postmeta` VALUES (451,86,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (452,86,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (453,86,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (454,86,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (455,86,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (456,86,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (457,86,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (458,86,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (459,86,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (460,86,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (461,86,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (462,86,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (463,86,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (464,86,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (465,86,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (466,86,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (467,86,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (468,86,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (469,86,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (470,86,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (471,86,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (472,86,'tech_list_0_tech_icon','83');
INSERT INTO `wp_postmeta` VALUES (473,86,'_tech_list_0_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (474,86,'tech_list_0_tech_label','Wordpress Development');
INSERT INTO `wp_postmeta` VALUES (475,86,'_tech_list_0_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (476,86,'tech_list_1_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (477,86,'_tech_list_1_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (478,86,'tech_list_1_tech_label','React & React Native');
INSERT INTO `wp_postmeta` VALUES (479,86,'_tech_list_1_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (480,86,'tech_list_2_tech_icon','84');
INSERT INTO `wp_postmeta` VALUES (481,86,'_tech_list_2_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (482,86,'tech_list_2_tech_label','Electron');
INSERT INTO `wp_postmeta` VALUES (483,86,'_tech_list_2_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (484,86,'tech_list_3_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (485,86,'_tech_list_3_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (486,86,'tech_list_3_tech_label','Shopify Development');
INSERT INTO `wp_postmeta` VALUES (487,86,'_tech_list_3_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (488,86,'tech_list_4_tech_icon','');
INSERT INTO `wp_postmeta` VALUES (489,86,'_tech_list_4_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (490,86,'tech_list_4_tech_label','Drupal Development');
INSERT INTO `wp_postmeta` VALUES (491,86,'_tech_list_4_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (492,87,'_wp_attached_file','2020/03/react.png');
INSERT INTO `wp_postmeta` VALUES (493,87,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:512;s:6:\"height\";i:512;s:4:\"file\";s:17:\"2020/03/react.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:17:\"react-300x300.png\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:17:\"react-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (494,88,'_wp_attached_file','2020/03/shopify.png');
INSERT INTO `wp_postmeta` VALUES (495,88,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:512;s:6:\"height\";i:512;s:4:\"file\";s:19:\"2020/03/shopify.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:19:\"shopify-300x300.png\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:19:\"shopify-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (496,89,'_wp_attached_file','2020/03/drupal.png');
INSERT INTO `wp_postmeta` VALUES (497,89,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:512;s:6:\"height\";i:512;s:4:\"file\";s:18:\"2020/03/drupal.png\";s:5:\"sizes\";a:2:{s:6:\"medium\";a:4:{s:4:\"file\";s:18:\"drupal-300x300.png\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:9:\"image/png\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:18:\"drupal-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (498,72,'call_to_action_section_call_to_action_buttons_0_cta_link','a:3:{s:5:\"title\";s:8:\"See Work\";s:3:\"url\";s:35:\"http://kg.wordpress.local/projects/\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (499,72,'_call_to_action_section_call_to_action_buttons_0_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (500,72,'call_to_action_section_call_to_action_buttons_1_cta_link','a:3:{s:5:\"title\";s:10:\"Contact Me\";s:3:\"url\";s:34:\"http://kg.wordpress.local/contact/\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (501,72,'_call_to_action_section_call_to_action_buttons_1_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (502,90,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (503,90,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (504,90,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (505,90,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (506,90,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (507,90,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (508,90,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (509,90,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (510,90,'tech_list','5');
INSERT INTO `wp_postmeta` VALUES (511,90,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (512,90,'call_to_action_section_section_title','What’s your project?');
INSERT INTO `wp_postmeta` VALUES (513,90,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (514,90,'call_to_action_section_section_description','So whether you’re building a new website, mobile app or just designing your entire brand from the ground up, let’s talk. We’ll turn your vision into a reality.');
INSERT INTO `wp_postmeta` VALUES (515,90,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (516,90,'call_to_action_section_call_to_action_buttons','2');
INSERT INTO `wp_postmeta` VALUES (517,90,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (518,90,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (519,90,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (520,90,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (521,90,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (522,90,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (523,90,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (524,90,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (525,90,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (526,90,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (527,90,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (528,90,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (529,90,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (530,90,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (531,90,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (532,90,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (533,90,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (534,90,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (535,90,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (536,90,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (537,90,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (538,90,'tech_list_0_tech_icon','83');
INSERT INTO `wp_postmeta` VALUES (539,90,'_tech_list_0_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (540,90,'tech_list_0_tech_label','Wordpress Development');
INSERT INTO `wp_postmeta` VALUES (541,90,'_tech_list_0_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (542,90,'tech_list_1_tech_icon','87');
INSERT INTO `wp_postmeta` VALUES (543,90,'_tech_list_1_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (544,90,'tech_list_1_tech_label','React & React Native');
INSERT INTO `wp_postmeta` VALUES (545,90,'_tech_list_1_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (546,90,'tech_list_2_tech_icon','84');
INSERT INTO `wp_postmeta` VALUES (547,90,'_tech_list_2_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (548,90,'tech_list_2_tech_label','Electron');
INSERT INTO `wp_postmeta` VALUES (549,90,'_tech_list_2_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (550,90,'tech_list_3_tech_icon','88');
INSERT INTO `wp_postmeta` VALUES (551,90,'_tech_list_3_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (552,90,'tech_list_3_tech_label','Shopify Development');
INSERT INTO `wp_postmeta` VALUES (553,90,'_tech_list_3_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (554,90,'tech_list_4_tech_icon','89');
INSERT INTO `wp_postmeta` VALUES (555,90,'_tech_list_4_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (556,90,'tech_list_4_tech_label','Drupal Development');
INSERT INTO `wp_postmeta` VALUES (557,90,'_tech_list_4_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (558,90,'call_to_action_section_call_to_action_buttons_0_cta_link','a:3:{s:5:\"title\";s:8:\"See Work\";s:3:\"url\";s:10:\"/projects.\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (559,90,'_call_to_action_section_call_to_action_buttons_0_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (560,90,'call_to_action_section_call_to_action_buttons_1_cta_link','a:3:{s:5:\"title\";s:10:\"Contact Me\";s:3:\"url\";s:8:\"/contact\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (561,90,'_call_to_action_section_call_to_action_buttons_1_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (562,91,'_edit_lock','1585432031:1');
INSERT INTO `wp_postmeta` VALUES (563,93,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (564,93,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (565,93,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (566,93,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (567,93,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (568,93,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (569,93,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (570,93,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (571,93,'tech_list','5');
INSERT INTO `wp_postmeta` VALUES (572,93,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (573,93,'call_to_action_section_section_title','What’s your project?');
INSERT INTO `wp_postmeta` VALUES (574,93,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (575,93,'call_to_action_section_section_description','So whether you’re building a new website, mobile app or just designing your entire brand from the ground up, let’s talk. We’ll turn your vision into a reality.');
INSERT INTO `wp_postmeta` VALUES (576,93,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (577,93,'call_to_action_section_call_to_action_buttons','2');
INSERT INTO `wp_postmeta` VALUES (578,93,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (579,93,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (580,93,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (581,93,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (582,93,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (583,93,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (584,93,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (585,93,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (586,93,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (587,93,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (588,93,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (589,93,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (590,93,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (591,93,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (592,93,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (593,93,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (594,93,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (595,93,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (596,93,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (597,93,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (598,93,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (599,93,'tech_list_0_tech_icon','83');
INSERT INTO `wp_postmeta` VALUES (600,93,'_tech_list_0_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (601,93,'tech_list_0_tech_label','Wordpress Development');
INSERT INTO `wp_postmeta` VALUES (602,93,'_tech_list_0_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (603,93,'tech_list_1_tech_icon','87');
INSERT INTO `wp_postmeta` VALUES (604,93,'_tech_list_1_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (605,93,'tech_list_1_tech_label','React & React Native');
INSERT INTO `wp_postmeta` VALUES (606,93,'_tech_list_1_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (607,93,'tech_list_2_tech_icon','84');
INSERT INTO `wp_postmeta` VALUES (608,93,'_tech_list_2_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (609,93,'tech_list_2_tech_label','Electron');
INSERT INTO `wp_postmeta` VALUES (610,93,'_tech_list_2_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (611,93,'tech_list_3_tech_icon','88');
INSERT INTO `wp_postmeta` VALUES (612,93,'_tech_list_3_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (613,93,'tech_list_3_tech_label','Shopify Development');
INSERT INTO `wp_postmeta` VALUES (614,93,'_tech_list_3_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (615,93,'tech_list_4_tech_icon','89');
INSERT INTO `wp_postmeta` VALUES (616,93,'_tech_list_4_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (617,93,'tech_list_4_tech_label','Drupal Development');
INSERT INTO `wp_postmeta` VALUES (618,93,'_tech_list_4_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (619,93,'call_to_action_section_call_to_action_buttons_0_cta_link','a:3:{s:5:\"title\";s:8:\"See Work\";s:3:\"url\";s:10:\"/projects.\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (620,93,'_call_to_action_section_call_to_action_buttons_0_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (621,93,'call_to_action_section_call_to_action_buttons_1_cta_link','a:3:{s:5:\"title\";s:10:\"Contact Me\";s:3:\"url\";s:34:\"http://kg.wordpress.local/contact/\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (622,93,'_call_to_action_section_call_to_action_buttons_1_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (623,94,'_edit_lock','1585444956:1');
INSERT INTO `wp_postmeta` VALUES (624,96,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (625,96,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (626,96,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (627,96,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (628,96,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (629,96,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (630,96,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (631,96,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (632,96,'tech_list','5');
INSERT INTO `wp_postmeta` VALUES (633,96,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (634,96,'call_to_action_section_section_title','What’s your project?');
INSERT INTO `wp_postmeta` VALUES (635,96,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (636,96,'call_to_action_section_section_description','So whether you’re building a new website, mobile app or just designing your entire brand from the ground up, let’s talk. We’ll turn your vision into a reality.');
INSERT INTO `wp_postmeta` VALUES (637,96,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (638,96,'call_to_action_section_call_to_action_buttons','2');
INSERT INTO `wp_postmeta` VALUES (639,96,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (640,96,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (641,96,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (642,96,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (643,96,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (644,96,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (645,96,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (646,96,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (647,96,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (648,96,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (649,96,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (650,96,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (651,96,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (652,96,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (653,96,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (654,96,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (655,96,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (656,96,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (657,96,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (658,96,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (659,96,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (660,96,'tech_list_0_tech_icon','83');
INSERT INTO `wp_postmeta` VALUES (661,96,'_tech_list_0_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (662,96,'tech_list_0_tech_label','Wordpress Development');
INSERT INTO `wp_postmeta` VALUES (663,96,'_tech_list_0_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (664,96,'tech_list_1_tech_icon','87');
INSERT INTO `wp_postmeta` VALUES (665,96,'_tech_list_1_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (666,96,'tech_list_1_tech_label','React & React Native');
INSERT INTO `wp_postmeta` VALUES (667,96,'_tech_list_1_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (668,96,'tech_list_2_tech_icon','84');
INSERT INTO `wp_postmeta` VALUES (669,96,'_tech_list_2_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (670,96,'tech_list_2_tech_label','Electron');
INSERT INTO `wp_postmeta` VALUES (671,96,'_tech_list_2_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (672,96,'tech_list_3_tech_icon','88');
INSERT INTO `wp_postmeta` VALUES (673,96,'_tech_list_3_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (674,96,'tech_list_3_tech_label','Shopify Development');
INSERT INTO `wp_postmeta` VALUES (675,96,'_tech_list_3_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (676,96,'tech_list_4_tech_icon','89');
INSERT INTO `wp_postmeta` VALUES (677,96,'_tech_list_4_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (678,96,'tech_list_4_tech_label','Drupal Development');
INSERT INTO `wp_postmeta` VALUES (679,96,'_tech_list_4_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (680,96,'call_to_action_section_call_to_action_buttons_0_cta_link','a:3:{s:5:\"title\";s:8:\"See Work\";s:3:\"url\";s:35:\"http://kg.wordpress.local/projects/\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (681,96,'_call_to_action_section_call_to_action_buttons_0_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (682,96,'call_to_action_section_call_to_action_buttons_1_cta_link','a:3:{s:5:\"title\";s:10:\"Contact Me\";s:3:\"url\";s:34:\"http://kg.wordpress.local/contact/\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (683,96,'_call_to_action_section_call_to_action_buttons_1_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (684,97,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (685,97,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (686,97,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (687,97,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (688,97,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (689,97,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (690,97,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (691,97,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (692,97,'tech_list','5');
INSERT INTO `wp_postmeta` VALUES (693,97,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (694,97,'call_to_action_section_section_title','What’s your project?');
INSERT INTO `wp_postmeta` VALUES (695,97,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (696,97,'call_to_action_section_section_description','So whether you’re building a new website, mobile app or just designing your entire brand from the ground up, let’s talk. We’ll turn your vision into a reality.');
INSERT INTO `wp_postmeta` VALUES (697,97,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (698,97,'call_to_action_section_call_to_action_buttons','2');
INSERT INTO `wp_postmeta` VALUES (699,97,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (700,97,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (701,97,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (702,97,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (703,97,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (704,97,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (705,97,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (706,97,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (707,97,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (708,97,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (709,97,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (710,97,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (711,97,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (712,97,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (713,97,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (714,97,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (715,97,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (716,97,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (717,97,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (718,97,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (719,97,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (720,97,'tech_list_0_tech_icon','83');
INSERT INTO `wp_postmeta` VALUES (721,97,'_tech_list_0_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (722,97,'tech_list_0_tech_label','Wordpress Development');
INSERT INTO `wp_postmeta` VALUES (723,97,'_tech_list_0_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (724,97,'tech_list_1_tech_icon','87');
INSERT INTO `wp_postmeta` VALUES (725,97,'_tech_list_1_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (726,97,'tech_list_1_tech_label','React & React Native');
INSERT INTO `wp_postmeta` VALUES (727,97,'_tech_list_1_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (728,97,'tech_list_2_tech_icon','84');
INSERT INTO `wp_postmeta` VALUES (729,97,'_tech_list_2_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (730,97,'tech_list_2_tech_label','Electron');
INSERT INTO `wp_postmeta` VALUES (731,97,'_tech_list_2_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (732,97,'tech_list_3_tech_icon','88');
INSERT INTO `wp_postmeta` VALUES (733,97,'_tech_list_3_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (734,97,'tech_list_3_tech_label','Shopify Development');
INSERT INTO `wp_postmeta` VALUES (735,97,'_tech_list_3_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (736,97,'tech_list_4_tech_icon','89');
INSERT INTO `wp_postmeta` VALUES (737,97,'_tech_list_4_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (738,97,'tech_list_4_tech_label','Drupal Development');
INSERT INTO `wp_postmeta` VALUES (739,97,'_tech_list_4_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (740,97,'call_to_action_section_call_to_action_buttons_0_cta_link','a:3:{s:5:\"title\";s:8:\"See Work\";s:3:\"url\";s:35:\"http://kg.wordpress.local/projects/\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (741,97,'_call_to_action_section_call_to_action_buttons_0_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (742,97,'call_to_action_section_call_to_action_buttons_1_cta_link','a:3:{s:5:\"title\";s:10:\"Contact Me\";s:3:\"url\";s:34:\"http://kg.wordpress.local/contact/\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (743,97,'_call_to_action_section_call_to_action_buttons_1_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (744,72,'call_to_action_section_call_to_action_buttons_0_is_primary','0');
INSERT INTO `wp_postmeta` VALUES (745,72,'_call_to_action_section_call_to_action_buttons_0_is_primary','field_5e7ffbbfe27bc');
INSERT INTO `wp_postmeta` VALUES (746,72,'call_to_action_section_call_to_action_buttons_1_is_primary','1');
INSERT INTO `wp_postmeta` VALUES (747,72,'_call_to_action_section_call_to_action_buttons_1_is_primary','field_5e7ffbbfe27bc');
INSERT INTO `wp_postmeta` VALUES (748,101,'hero_title','Thesis');
INSERT INTO `wp_postmeta` VALUES (749,101,'_hero_title','field_5e7fb94fc7c8e');
INSERT INTO `wp_postmeta` VALUES (750,101,'hero_text','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also');
INSERT INTO `wp_postmeta` VALUES (751,101,'_hero_text','field_5e7fb97cc7c90');
INSERT INTO `wp_postmeta` VALUES (752,101,'my_specialties','4');
INSERT INTO `wp_postmeta` VALUES (753,101,'_my_specialties','field_5e7fb9aac7c91');
INSERT INTO `wp_postmeta` VALUES (754,101,'tech_list_title','');
INSERT INTO `wp_postmeta` VALUES (755,101,'_tech_list_title','field_5e7fb9edc7c95');
INSERT INTO `wp_postmeta` VALUES (756,101,'tech_list','5');
INSERT INTO `wp_postmeta` VALUES (757,101,'_tech_list','field_5e7fba06c7c96');
INSERT INTO `wp_postmeta` VALUES (758,101,'call_to_action_section_section_title','What’s your project?');
INSERT INTO `wp_postmeta` VALUES (759,101,'_call_to_action_section_section_title','field_5e7fba58c7c9b');
INSERT INTO `wp_postmeta` VALUES (760,101,'call_to_action_section_section_description','So whether you’re building a new website, mobile app or just designing your entire brand from the ground up, let’s talk. We’ll turn your vision into a reality.');
INSERT INTO `wp_postmeta` VALUES (761,101,'_call_to_action_section_section_description','field_5e7fba5fc7c9c');
INSERT INTO `wp_postmeta` VALUES (762,101,'call_to_action_section_call_to_action_buttons','2');
INSERT INTO `wp_postmeta` VALUES (763,101,'_call_to_action_section_call_to_action_buttons','field_5e7fba68c7c9d');
INSERT INTO `wp_postmeta` VALUES (764,101,'call_to_action_section','');
INSERT INTO `wp_postmeta` VALUES (765,101,'_call_to_action_section','field_5e7fba3fc7c99');
INSERT INTO `wp_postmeta` VALUES (766,101,'specialty_section_title','My specialties');
INSERT INTO `wp_postmeta` VALUES (767,101,'_specialty_section_title','field_5e7fb9bec7c92');
INSERT INTO `wp_postmeta` VALUES (768,101,'my_specialties_0_icon','75');
INSERT INTO `wp_postmeta` VALUES (769,101,'_my_specialties_0_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (770,101,'my_specialties_0_icon_text','Design');
INSERT INTO `wp_postmeta` VALUES (771,101,'_my_specialties_0_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (772,101,'my_specialties_1_icon','76');
INSERT INTO `wp_postmeta` VALUES (773,101,'_my_specialties_1_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (774,101,'my_specialties_1_icon_text','Web');
INSERT INTO `wp_postmeta` VALUES (775,101,'_my_specialties_1_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (776,101,'my_specialties_2_icon','77');
INSERT INTO `wp_postmeta` VALUES (777,101,'_my_specialties_2_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (778,101,'my_specialties_2_icon_text','Mobile');
INSERT INTO `wp_postmeta` VALUES (779,101,'_my_specialties_2_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (780,101,'my_specialties_3_icon','78');
INSERT INTO `wp_postmeta` VALUES (781,101,'_my_specialties_3_icon','field_5e7fb9cbc7c93');
INSERT INTO `wp_postmeta` VALUES (782,101,'my_specialties_3_icon_text','Social');
INSERT INTO `wp_postmeta` VALUES (783,101,'_my_specialties_3_icon_text','field_5e7fb9d6c7c94');
INSERT INTO `wp_postmeta` VALUES (784,101,'tech_list_0_tech_icon','83');
INSERT INTO `wp_postmeta` VALUES (785,101,'_tech_list_0_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (786,101,'tech_list_0_tech_label','Wordpress Development');
INSERT INTO `wp_postmeta` VALUES (787,101,'_tech_list_0_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (788,101,'tech_list_1_tech_icon','87');
INSERT INTO `wp_postmeta` VALUES (789,101,'_tech_list_1_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (790,101,'tech_list_1_tech_label','React & React Native');
INSERT INTO `wp_postmeta` VALUES (791,101,'_tech_list_1_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (792,101,'tech_list_2_tech_icon','84');
INSERT INTO `wp_postmeta` VALUES (793,101,'_tech_list_2_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (794,101,'tech_list_2_tech_label','Electron');
INSERT INTO `wp_postmeta` VALUES (795,101,'_tech_list_2_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (796,101,'tech_list_3_tech_icon','88');
INSERT INTO `wp_postmeta` VALUES (797,101,'_tech_list_3_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (798,101,'tech_list_3_tech_label','Shopify Development');
INSERT INTO `wp_postmeta` VALUES (799,101,'_tech_list_3_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (800,101,'tech_list_4_tech_icon','89');
INSERT INTO `wp_postmeta` VALUES (801,101,'_tech_list_4_tech_icon','field_5e7fba23c7c97');
INSERT INTO `wp_postmeta` VALUES (802,101,'tech_list_4_tech_label','Drupal Development');
INSERT INTO `wp_postmeta` VALUES (803,101,'_tech_list_4_tech_label','field_5e7fba31c7c98');
INSERT INTO `wp_postmeta` VALUES (804,101,'call_to_action_section_call_to_action_buttons_0_cta_link','a:3:{s:5:\"title\";s:8:\"See Work\";s:3:\"url\";s:35:\"http://kg.wordpress.local/projects/\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (805,101,'_call_to_action_section_call_to_action_buttons_0_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (806,101,'call_to_action_section_call_to_action_buttons_1_cta_link','a:3:{s:5:\"title\";s:10:\"Contact Me\";s:3:\"url\";s:34:\"http://kg.wordpress.local/contact/\";s:6:\"target\";s:0:\"\";}');
INSERT INTO `wp_postmeta` VALUES (807,101,'_call_to_action_section_call_to_action_buttons_1_cta_link','field_5e7fba81c7c9e');
INSERT INTO `wp_postmeta` VALUES (808,101,'call_to_action_section_call_to_action_buttons_0_is_primary','0');
INSERT INTO `wp_postmeta` VALUES (809,101,'_call_to_action_section_call_to_action_buttons_0_is_primary','field_5e7ffbbfe27bc');
INSERT INTO `wp_postmeta` VALUES (810,101,'call_to_action_section_call_to_action_buttons_1_is_primary','1');
INSERT INTO `wp_postmeta` VALUES (811,101,'_call_to_action_section_call_to_action_buttons_1_is_primary','field_5e7ffbbfe27bc');
INSERT INTO `wp_postmeta` VALUES (812,102,'_wp_trash_meta_status','publish');
INSERT INTO `wp_postmeta` VALUES (813,102,'_wp_trash_meta_time','1585448637');
INSERT INTO `wp_postmeta` VALUES (814,103,'_wp_attached_file','2020/03/minimal-steel-light-100.jpg');
INSERT INTO `wp_postmeta` VALUES (815,103,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:1562;s:6:\"height\";i:1562;s:4:\"file\";s:35:\"2020/03/minimal-steel-light-100.jpg\";s:5:\"sizes\";a:5:{s:6:\"medium\";a:4:{s:4:\"file\";s:35:\"minimal-steel-light-100-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:5:\"large\";a:4:{s:4:\"file\";s:37:\"minimal-steel-light-100-1024x1024.jpg\";s:5:\"width\";i:1024;s:6:\"height\";i:1024;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:35:\"minimal-steel-light-100-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:12:\"medium_large\";a:4:{s:4:\"file\";s:35:\"minimal-steel-light-100-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:9:\"1536x1536\";a:4:{s:4:\"file\";s:37:\"minimal-steel-light-100-1536x1536.jpg\";s:5:\"width\";i:1536;s:6:\"height\";i:1536;s:9:\"mime-type\";s:10:\"image/jpeg\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (816,104,'_wp_attached_file','2020/03/cropped-minimal-steel-light-100.jpg');
INSERT INTO `wp_postmeta` VALUES (817,104,'_wp_attachment_context','site-icon');
INSERT INTO `wp_postmeta` VALUES (818,104,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:512;s:6:\"height\";i:512;s:4:\"file\";s:43:\"2020/03/cropped-minimal-steel-light-100.jpg\";s:5:\"sizes\";a:6:{s:6:\"medium\";a:4:{s:4:\"file\";s:43:\"cropped-minimal-steel-light-100-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:43:\"cropped-minimal-steel-light-100-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:13:\"site_icon-270\";a:4:{s:4:\"file\";s:43:\"cropped-minimal-steel-light-100-270x270.jpg\";s:5:\"width\";i:270;s:6:\"height\";i:270;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:13:\"site_icon-192\";a:4:{s:4:\"file\";s:43:\"cropped-minimal-steel-light-100-192x192.jpg\";s:5:\"width\";i:192;s:6:\"height\";i:192;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:13:\"site_icon-180\";a:4:{s:4:\"file\";s:43:\"cropped-minimal-steel-light-100-180x180.jpg\";s:5:\"width\";i:180;s:6:\"height\";i:180;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:12:\"site_icon-32\";a:4:{s:4:\"file\";s:41:\"cropped-minimal-steel-light-100-32x32.jpg\";s:5:\"width\";i:32;s:6:\"height\";i:32;s:9:\"mime-type\";s:10:\"image/jpeg\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (819,105,'_wp_trash_meta_status','publish');
INSERT INTO `wp_postmeta` VALUES (820,105,'_wp_trash_meta_time','1585448761');
INSERT INTO `wp_postmeta` VALUES (821,106,'_wp_attached_file','2020/03/cropped-minimal-steel-light-100-1.jpg');
INSERT INTO `wp_postmeta` VALUES (822,106,'_wp_attachment_context','custom-logo');
INSERT INTO `wp_postmeta` VALUES (823,106,'_wp_attachment_metadata','a:5:{s:5:\"width\";i:1562;s:6:\"height\";i:1562;s:4:\"file\";s:45:\"2020/03/cropped-minimal-steel-light-100-1.jpg\";s:5:\"sizes\";a:5:{s:6:\"medium\";a:4:{s:4:\"file\";s:45:\"cropped-minimal-steel-light-100-1-300x300.jpg\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:5:\"large\";a:4:{s:4:\"file\";s:47:\"cropped-minimal-steel-light-100-1-1024x1024.jpg\";s:5:\"width\";i:1024;s:6:\"height\";i:1024;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:45:\"cropped-minimal-steel-light-100-1-150x150.jpg\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:12:\"medium_large\";a:4:{s:4:\"file\";s:45:\"cropped-minimal-steel-light-100-1-768x768.jpg\";s:5:\"width\";i:768;s:6:\"height\";i:768;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:9:\"1536x1536\";a:4:{s:4:\"file\";s:47:\"cropped-minimal-steel-light-100-1-1536x1536.jpg\";s:5:\"width\";i:1536;s:6:\"height\";i:1536;s:9:\"mime-type\";s:10:\"image/jpeg\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');
INSERT INTO `wp_postmeta` VALUES (824,107,'_wp_trash_meta_status','publish');
INSERT INTO `wp_postmeta` VALUES (825,107,'_wp_trash_meta_time','1585448987');
INSERT INTO `wp_postmeta` VALUES (830,110,'_form','<label> Your Name (required)\n    [text* your-name] </label>\n\n<label> Your Email (required)\n    [email* your-email] </label>\n\n<label> Subject\n    [text your-subject] </label>\n\n<label> Your Message\n    [textarea your-message] </label>\n\n[submit \"Send\"]');
INSERT INTO `wp_postmeta` VALUES (831,110,'_mail','a:8:{s:7:\"subject\";s:30:\"Kevin Garubba \"[your-subject]\"\";s:6:\"sender\";s:44:\"Kevin Garubba <wordpress@kg.wordpress.local>\";s:4:\"body\";s:177:\"From: [your-name] <[your-email]>\nSubject: [your-subject]\n\nMessage Body:\n[your-message]\n\n-- \nThis e-mail was sent from a contact form on Kevin Garubba (http://kg.wordpress.local)\";s:9:\"recipient\";s:22:\"kevingarubba@gmail.com\";s:18:\"additional_headers\";s:22:\"Reply-To: [your-email]\";s:11:\"attachments\";s:0:\"\";s:8:\"use_html\";i:0;s:13:\"exclude_blank\";i:0;}');
INSERT INTO `wp_postmeta` VALUES (832,110,'_mail_2','a:9:{s:6:\"active\";b:0;s:7:\"subject\";s:30:\"Kevin Garubba \"[your-subject]\"\";s:6:\"sender\";s:44:\"Kevin Garubba <wordpress@kg.wordpress.local>\";s:4:\"body\";s:119:\"Message Body:\n[your-message]\n\n-- \nThis e-mail was sent from a contact form on Kevin Garubba (http://kg.wordpress.local)\";s:9:\"recipient\";s:12:\"[your-email]\";s:18:\"additional_headers\";s:32:\"Reply-To: kevingarubba@gmail.com\";s:11:\"attachments\";s:0:\"\";s:8:\"use_html\";i:0;s:13:\"exclude_blank\";i:0;}');
INSERT INTO `wp_postmeta` VALUES (833,110,'_messages','a:8:{s:12:\"mail_sent_ok\";s:45:\"Thank you for your message. It has been sent.\";s:12:\"mail_sent_ng\";s:71:\"There was an error trying to send your message. Please try again later.\";s:16:\"validation_error\";s:61:\"One or more fields have an error. Please check and try again.\";s:4:\"spam\";s:71:\"There was an error trying to send your message. Please try again later.\";s:12:\"accept_terms\";s:69:\"You must accept the terms and conditions before sending your message.\";s:16:\"invalid_required\";s:22:\"The field is required.\";s:16:\"invalid_too_long\";s:22:\"The field is too long.\";s:17:\"invalid_too_short\";s:23:\"The field is too short.\";}');
INSERT INTO `wp_postmeta` VALUES (834,110,'_additional_settings',NULL);
INSERT INTO `wp_postmeta` VALUES (835,110,'_locale','en_US');
/*!40000 ALTER TABLE `wp_postmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_posts`
--

DROP TABLE IF EXISTS `wp_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_posts` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_author` bigint(20) unsigned NOT NULL DEFAULT '0',
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_title` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_excerpt` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'open',
  `post_password` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `post_name` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `to_ping` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `pinged` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `guid` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT '0',
  `post_type` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_posts`
--

LOCK TABLES `wp_posts` WRITE;
/*!40000 ALTER TABLE `wp_posts` DISABLE KEYS */;
INSERT INTO `wp_posts` VALUES (1,1,'2020-03-24 03:29:33','2020-03-24 03:29:33','<!-- wp:paragraph -->\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n<!-- /wp:paragraph -->','Hello world!','','publish','open','open','','hello-world','','','2020-03-24 03:29:33','2020-03-24 03:29:33','',0,'http://kg.wordpress.local/?p=1',0,'post','',1);
INSERT INTO `wp_posts` VALUES (2,1,'2020-03-24 03:29:33','2020-03-24 03:29:33','<!-- wp:paragraph -->\n<p>This is an example page. It\'s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:quote -->\n<blockquote class=\"wp-block-quote\"><p>Hi there! I\'m a bike messenger by day, aspiring actor by night, and this is my website. I live in Los Angeles, have a great dog named Jack, and I like pi&#241;a coladas. (And gettin\' caught in the rain.)</p></blockquote>\n<!-- /wp:quote -->\n\n<!-- wp:paragraph -->\n<p>...or something like this:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:quote -->\n<blockquote class=\"wp-block-quote\"><p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</p></blockquote>\n<!-- /wp:quote -->\n\n<!-- wp:paragraph -->\n<p>As a new WordPress user, you should go to <a href=\"http://kg.wordpress.local/wp-admin/\">your dashboard</a> to delete this page and create new pages for your content. Have fun!</p>\n<!-- /wp:paragraph -->','Sample Page','','publish','closed','open','','sample-page','','','2020-03-24 03:29:33','2020-03-24 03:29:33','',0,'http://kg.wordpress.local/?page_id=2',0,'page','',0);
INSERT INTO `wp_posts` VALUES (3,1,'2020-03-24 03:29:33','2020-03-24 03:29:33','<!-- wp:heading --><h2>Who we are</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Our website address is: http://kg.wordpress.local.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>What personal data we collect and why we collect it</h2><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>Comments</h3><!-- /wp:heading --><!-- wp:paragraph --><p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor&#8217;s IP address and browser user agent string to help spam detection.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Media</h3><!-- /wp:heading --><!-- wp:paragraph --><p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Contact forms</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>Cookies</h3><!-- /wp:heading --><!-- wp:paragraph --><p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select &quot;Remember Me&quot;, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Embedded content from other websites</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Analytics</h3><!-- /wp:heading --><!-- wp:heading --><h2>Who we share your data with</h2><!-- /wp:heading --><!-- wp:heading --><h2>How long we retain your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>What rights you have over your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>Where we send your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Visitor comments may be checked through an automated spam detection service.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>Your contact information</h2><!-- /wp:heading --><!-- wp:heading --><h2>Additional information</h2><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>How we protect your data</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>What data breach procedures we have in place</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>What third parties we receive data from</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>What automated decision making and/or profiling we do with user data</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>Industry regulatory disclosure requirements</h3><!-- /wp:heading -->','Privacy Policy','','publish','closed','closed','','privacy-policy','','','2020-03-26 02:35:07','2020-03-26 02:35:07','',0,'http://kg.wordpress.local/?page_id=3',0,'page','',0);
INSERT INTO `wp_posts` VALUES (5,1,'2020-03-26 02:33:53','2020-03-26 02:33:53','','c06ed897-708e-32e9-9d44-781a8a95c475','','inherit','open','closed','','c06ed897-708e-32e9-9d44-781a8a95c475','','','2020-03-26 02:33:53','2020-03-26 02:33:53','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/c06ed897-708e-32e9-9d44-781a8a95c475.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (6,1,'2020-03-25 11:10:18','2020-03-25 11:10:18','<h1>Quasi iste neque voluptatibus et voluptatibus. Sint in sunt saepe aut et. Iure natus labore officia</h1>\n<blockquote>Eveniet sint quaerat ut voluptatem. expedita sit nihil blanditiis iusto quae ut. sint vitae beatae molestiae. Est accusamus inventore omnis aliquid eos ut Nisi culpa repellendus velit. harum sint velit numquam ipsum. Quis animi reiciendis quaerat quod non est. Laudantium ab numquam neque et <a title=\"Qui iusto ut.\" href=\"https://volkman.com/sequi-culpa-unde-voluptate-sint-aliquid-quae.html\">Sed</a> fugit nostrum alias aspernatur. Ut minima qui blanditiis et. Corporis eum ex et officia nemo Aut est et. Perferendis vero consequatur consequuntur. enim laborum illo saepe.</blockquote>\n<h2>Porro distinctio vero est sed assumenda dolores quaerat et. Quia repellat soluta ea enim. Rerum hic vero sit qui qui tempora</h2>\n<hr>\n<h3>Dolores consequatur consequuntur quia enim commodi qui. Ea est voluptas qui et</h3>\n<hr>\n<!--more-->\n<img src=\"http://kg.wordpress.local/wp-content/uploads/2020/03/c06ed897-708e-32e9-9d44-781a8a95c475.png\">','Inventore et sit adipisci tempora nam','Ex ducimus inventore consequatur est repellendus fugiat voluptate assumenda qui commodi animi ut occaecati esse sed quia atque quaerat dignissimos dolorem rerum et ut et ex culpa ea eligendi odit illum illo aliquam ipsam non voluptatem voluptates sunt repudiandae neque eos quas perferendis officiis consequatur hic sequi quo et tempore sit illo soluta eum itaque dolor molestiae numquam quibusdam eum officia eligendi odit voluptas similique.','publish','open','open','','inventore-et-sit-adipisci-tempora-nam','','','2020-03-25 11:10:18','2020-03-25 11:10:18','',0,'http://kg.wordpress.local/inventore-et-sit-adipisci-tempora-nam/',0,'post','',0);
INSERT INTO `wp_posts` VALUES (7,1,'2020-03-26 02:33:55','2020-03-26 02:33:55','','fe50fe45-cc3d-3d21-9c97-ca88a6a081fd','','inherit','open','closed','','fe50fe45-cc3d-3d21-9c97-ca88a6a081fd','','','2020-03-26 02:33:55','2020-03-26 02:33:55','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/fe50fe45-cc3d-3d21-9c97-ca88a6a081fd.jpg',0,'attachment','image/jpeg',0);
INSERT INTO `wp_posts` VALUES (8,1,'2020-03-25 23:53:21','2020-03-25 23:53:21','<h5>Ea recusandae sapiente eum fuga voluptatem non id. Voluptates officiis commodi facilis fugit eveniet quidem. Et necessitatibus laudantium delectus cum tempora id</h5>\n<hr>\n<h6>Facilis ut aut sit rerum perspiciatis voluptas</h6>\n<p>Quae esse et dignissimos ea doloribus nobis. Id animi omnis non explicabo est dolor. Nobis necessitatibus explicabo error saepe maiores est aliquid. Explicabo suscipit repellendus vero ducimus nisi esse quos aut. Et est beatae accusantium rem et veritatis incidunt. Ad facere adipisci magnam nobis cumque voluptatem occaecati. Perspiciatis maiores accusamus aperiam debitis consequuntur accusantium. Et odio voluptate est eveniet. Hic non enim quos vitae sunt perspiciatis. Quos quia et natus sunt odio. Ut corporis ullam facilis nihil dolor. Qui doloremque perspiciatis ut temporibus omnis. Vel neque cum quia. Aut voluptas nulla eaque repellendus sed voluptas eaque voluptatibus. Tempora non excepturi pariatur non saepe. Asperiores consequatur perspiciatis nam ipsam. Alias quae perspiciatis est quis. Et ut et maxime neque nobis voluptatem.</p>\n<!--more-->\n<h1>Dolores quas et porro ea qui. Quia nulla at consequuntur quibusdam</h1>\n<p>Est assumenda soluta doloremque et sed Nihil et <a title=\"Iure ea.\" href=\"http://schaefer.info/quasi-tempora-repellat-voluptate-aut-voluptatum-laborum-ipsa\">quam quis provident qui. Ipsum</a> enim vel sit magni. voluptas incidunt magnam. <a title=\"Reprehenderit maiores ut qui.\" href=\"https://jacobs.com/aut-tenetur-repudiandae-ut-natus-rerum-sit.html\">omnis similique numquam eligendi architecto est.</a> ipsum laborum nobis non velit. Unde quis voluptatum excepturi Ut enim praesentium tempore mollitia quos sit.</p>\n<h1>Dicta quaerat numquam maxime. Maxime quisquam qui eligendi voluptatibus aspernatur ut. At non nulla nostrum eveniet et</h1>\n<ul><li>Debitis voluptatum</li><li>Accusamus eaque ipsum</li></ul>\n<ul><li>Harum odit deserunt minus ipsa</li><li>Qui velit voluptatem aut aut</li><li>Quod quas unde ea</li><li>Nobis facilis error id in</li><li>Saepe esse dolor iusto ducimus</li><li>Delectus recusandae non qui atque</li><li>Amet ex ut ipsa veritatis</li><li>Possimus itaque nostrum minus quia velit sit ea</li><li>Non iure dolorum eos dolorem aut</li></ul>','Perferendis consequatur voluptatem aliquam voluptas ratione assumenda','Fugiat totam repellat voluptatem consequatur qui ullam facilis id illum mollitia natus sed maxime eaque vel maiores molestiae omnis itaque dignissimos maiores illum molestiae iure nesciunt quo laudantium dolore ab dolor laborum autem consequatur autem rerum numquam delectus unde porro expedita quam quidem officiis neque blanditiis consequatur delectus ea iusto aut nam.','publish','open','open','','perferendis-consequatur-voluptatem-aliquam-voluptas-ratione-assumenda','','','2020-03-25 23:53:21','2020-03-25 23:53:21','',0,'http://kg.wordpress.local/perferendis-consequatur-voluptatem-aliquam-voluptas-ratione-assumenda/',0,'post','',0);
INSERT INTO `wp_posts` VALUES (9,1,'2020-03-26 02:34:35','2020-03-26 02:34:35','','04dcca53-3e7c-30d1-b5a5-1fe3663963dd','','inherit','open','closed','','04dcca53-3e7c-30d1-b5a5-1fe3663963dd','','','2020-03-26 02:34:35','2020-03-26 02:34:35','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/04dcca53-3e7c-30d1-b5a5-1fe3663963dd.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (10,1,'2020-03-26 02:34:35','2020-03-26 02:34:35','','a2bcae62-e7c2-370f-9f25-a2da0d4f8ecd','','inherit','open','closed','','a2bcae62-e7c2-370f-9f25-a2da0d4f8ecd','','','2020-03-26 02:34:35','2020-03-26 02:34:35','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/a2bcae62-e7c2-370f-9f25-a2da0d4f8ecd.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (11,1,'2020-03-25 19:47:43','2020-03-25 19:47:43','<h5>Maxime eum porro fugiat omnis consequatur. Et delectus ipsum distinctio ab sunt</h5>\n<hr>\n<ol><li>Unde quae eligendi omnis et</li><li>Nobis esse quia quos qui exercitationem</li><li>Qui libero sed adipisci</li></ol>\n<h6>Libero et quos molestias quam hic. Minus alias dolorem nostrum necessitatibus. Dolores pariatur eaque sit. Laboriosam rerum et aliquid</h6>\n<ol><li>Dolor autem esse ut numquam</li><li>Cumque qui modi</li></ol>\n<p>Et dignissimos ea fugit eligendi eligendi consequatur vitae. Aut sequi iure tempore quisquam. Laboriosam quisquam et eos quas ut maxime. Eos ut sunt et voluptatem ipsum fugiat eum. Labore ut aut aliquid fugit temporibus. Et reprehenderit rerum neque repellendus. Adipisci velit repellendus dolorem qui accusamus. Officia repellat dolorem quidem. Reiciendis neque atque tenetur. Doloremque perferendis expedita esse quod laudantium dolorem reprehenderit. Voluptas in cupiditate quaerat rem fuga alias. Asperiores blanditiis nihil eius ut. Dolores officiis perferendis quam facere. Ut maxime quia distinctio et. Quidem voluptatem dolor ut iusto velit repudiandae labore. Est consequuntur et autem doloribus qui. Id eum corrupti porro maxime nesciunt consectetur fugiat. Voluptas ducimus sit consequatur et. Odio qui corrupti assumenda dicta sed consequatur. Quis ex illo eum reprehenderit ullam. Sunt illum aliquid autem. Non voluptas odit recusandae incidunt voluptatem recusandae. Itaque similique odit consectetur velit autem quia accusantium. Quos laudantium voluptas corporis asperiores dolores. Facilis aliquid amet atque nihil qui. Aperiam praesentium animi quidem officiis illo similique quia dolorum. Inventore consequatur laboriosam quam et provident vero. Nemo quaerat sed voluptatibus omnis. Consequatur voluptates saepe quod nesciunt. Ut recusandae ea aut dicta animi id. Labore qui eos veniam molestias quas. Tempore aliquid quas voluptas vel consequuntur esse totam. Quibusdam sit tenetur dicta qui vel sed possimus. Nihil voluptatem fugiat ut veritatis. Labore debitis nihil saepe sequi nesciunt et sint voluptatem. Natus ut repellendus alias facilis.</p>\n<!--more-->\n<h4>Aut rem tempore illum aut voluptas. Illo ipsa molestiae aut accusantium quis. Harum sed iste animi quia</h4>\n<ol><li>Et autem ut temporibus est</li><li>Ut ut consequatur vero dolorem voluptatem ut</li><li>Cupiditate illum</li><li>Unde quam quia tempora fugit</li><li>Et quaerat facilis qui</li></ol>\n<h6>Vero quis ad ex animi. Beatae dolores dolor aut illo vel</h6>\n<ol><li>Rerum quasi enim dicta</li><li>Odit architecto cum aut</li><li>Similique aut</li><li>Laboriosam</li></ol>\n<p>Non praesentium assumenda ipsam Molestiae minus ullam architecto rerum et maiores. Ipsa aut ea velit aut et. Quia cumque necessitatibus placeat earum consequatur. vel consequatur quo. Id aspernatur <a title=\"Eum et perspiciatis nihil nulla.\" href=\"http://kerluke.net/\">ipsam sed cupiditate nihil non.</a> blanditiis et est doloribus aperiam Dignissimos modi pariatur voluptas error. Sit modi iste. Ut ut eius dignissimos fugiat. rerum voluptatum veritatis. Est velit qui adipisci aut. Quae autem saepe beatae fugiat optio et. <a title=\"Vitae.\" href=\"http://www.predovic.info/porro-deleniti-autem-possimus-nulla-earum\">voluptatem</a> voluptas iste. Aut eum quis repellat sequi qui Consequatur non ipsum dolorem. Tempora est voluptatum at perferendis fuga Ipsa libero reprehenderit ipsam dolores voluptatum. Sed eum eius at. Vel odit reprehenderit. At voluptatem ipsum ratione fugiat ut Et officiis cum ullam Aut aut minus aperiam dolorem ratione accusantium. Ut blanditiis non harum. Nihil perferendis cumque error commodi non sequi quidem. Omnis error porro pariatur sunt ducimus Dicta et est <a title=\"Fugiat omnis.\" href=\"http://www.bogan.net/quod-et-et-vero-voluptas-eum-eveniet-eaque\">reiciendis et dignissimos molestiae.</a></p>\n<blockquote>Asperiores unde vitae unde deleniti quia commodi Et quia quidem provident voluptatem iste magni. <a title=\"Et eligendi delectus velit distinctio ab.\" href=\"http://schaefer.biz/beatae-doloribus-qui-qui\">aut illo</a> fuga accusantium. in odio omnis alias est. <a title=\"Expedita perspiciatis laborum assumenda.\" href=\"http://www.farrell.net/\">et eum cumque omnis ut sapiente omnis.</a></blockquote>\n<img alt=\"Ea quia incidunt qui quia\" src=\"http://kg.wordpress.local/wp-content/uploads/2020/03/a2bcae62-e7c2-370f-9f25-a2da0d4f8ecd.png\">\n<hr>','Illo ullam quasi assumenda aut et quibusdam','Nam natus accusamus aspernatur similique ipsum autem voluptate nihil enim dolor assumenda odit qui omnis maxime magnam laborum itaque amet debitis sed minima voluptatem.','publish','open','open','','illo-ullam-quasi-assumenda-aut-et-quibusdam','','','2020-03-25 19:47:43','2020-03-25 19:47:43','',0,'http://kg.wordpress.local/illo-ullam-quasi-assumenda-aut-et-quibusdam/',0,'post','',0);
INSERT INTO `wp_posts` VALUES (12,1,'2020-03-26 02:34:35','2020-03-26 02:34:35','','a1769178-c8b4-3ba9-8470-4b1a448331d6','','inherit','open','closed','','a1769178-c8b4-3ba9-8470-4b1a448331d6','','','2020-03-26 02:34:35','2020-03-26 02:34:35','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/a1769178-c8b4-3ba9-8470-4b1a448331d6.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (13,1,'2020-03-26 02:34:38','2020-03-26 02:34:38','','59fd6c4c-9834-3314-980f-e5b626aea78c','','inherit','open','closed','','59fd6c4c-9834-3314-980f-e5b626aea78c','','','2020-03-26 02:34:38','2020-03-26 02:34:38','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/59fd6c4c-9834-3314-980f-e5b626aea78c.jpg',0,'attachment','image/jpeg',0);
INSERT INTO `wp_posts` VALUES (14,1,'2020-03-25 10:18:48','2020-03-25 10:18:48','<h6>Dolores perspiciatis deleniti dignissimos ullam necessitatibus. Laboriosam in voluptates non tempore. Eum voluptates similique quae</h6>\n<ol><li>Iure est veritatis</li><li>Qui eum impedit quia et</li><li>Voluptatem ut nihil</li><li>Vel corrupti in autem fugiat quod nobis</li><li>Veniam odio sunt cum adipisci quas magnam</li><li>Porro voluptas at ex</li><li>Sed voluptas veniam sequi quam accusantium</li></ol>\n<h1>Repellat aut est consequatur ut dolores. Ullam aut explicabo quos quidem architecto optio dolor. Ea odit consequatur sunt ipsa. Corporis sunt recusandae voluptates aut</h1>\n<ol><li>Vel reiciendis quod architecto ut</li><li>Est aut sequi quasi et</li></ol>\n<!--more-->\n<h2>Repudiandae asperiores et non explicabo. Suscipit repellat quia ut</h2>\n<img class=\"aligncenter\" alt=\"Qui beatae ut nesciunt\" src=\"http://kg.wordpress.local/wp-content/uploads/2020/03/59fd6c4c-9834-3314-980f-e5b626aea78c.jpg\">\n<ol><li>Quibusdam</li><li>Placeat et omnis</li><li>Et quia eligendi est</li></ol>\n<p>Maiores nam id cum. Praesentium possimus velit hic voluptate esse officia. Dignissimos et eaque dolorem non unde qui. Placeat eos quia est nulla est. Qui ea modi nulla. Natus placeat voluptates est est suscipit eos. Ab necessitatibus earum molestiae. Sit nemo distinctio dolorem aut qui. Non enim dolor qui. Sint voluptas debitis recusandae molestiae quidem. Facilis suscipit eligendi enim est. Aperiam odio facere cumque nemo quia. Doloribus excepturi excepturi consectetur architecto expedita ut autem eveniet. Rerum qui id qui molestiae. Autem provident at qui quam expedita. Saepe ullam adipisci dolorem id nemo blanditiis nihil. Voluptatem maxime quis eum et. Dolorem aut exercitationem neque nihil enim. Quisquam et beatae eos cupiditate reiciendis. Quia ipsam qui nisi praesentium consequatur. Rerum asperiores deleniti numquam. Magnam ut molestiae consectetur in nesciunt. Tempora quam impedit aut et eos quia. Maxime laudantium ut illo. Error voluptatibus placeat id eius. Sed voluptatem est reiciendis ab animi. Id unde at aliquid odio suscipit soluta.</p>\n<h4>Iure a expedita ex. Voluptatem asperiores sit qui ut vel debitis qui. Nostrum id in minus nam est</h4>\n<blockquote><a title=\"Ipsa quae totam corporis.\" href=\"http://www.kessler.com/\">Dolor error perspiciatis</a> neque expedita fuga rerum. maxime expedita ut. Accusamus praesentium velit iusto accusantium. sunt voluptatem illum sunt est. Praesentium illum tenetur enim. Debitis quis corrupti recusandae Dolorum facilis laudantium nihil earum. temporibus aut sit nam placeat ab. Occaecati est <a title=\"In repudiandae pariatur est quidem reiciendis iusto.\" href=\"http://www.kilback.info/voluptatem-et-ea-deleniti-rem-iste-non-vero\"><a title=\"Consequatur architecto iste officia cum autem.\" href=\"https://jacobs.net/recusandae-reprehenderit-quaerat-ea-minus-aut-atque-doloremque.html\">voluptatum facere dolorem</a></a> Vero ducimus id sed. asperiores velit provident distinctio. Eligendi exercitationem nihil sed expedita nemo. Sequi error qui enim et consectetur vero. Aut qui perferendis <a title=\"Aperiam ut qui modi velit enim fugiat.\" href=\"http://www.wiza.net/deleniti-cupiditate-unde-voluptatem-beatae-ipsum-saepe-corporis\">alias est. Magni impedit repellendus</a> Aspernatur fugit impedit veniam. Iusto voluptas quos asperiores</blockquote>\n<h6>Officia tenetur repellendus quia neque laboriosam rerum. Facere veritatis sed libero reiciendis in id quis. Non ut dolorem et dolorem atque. Mollitia illum qui non et qui dolor adipisci</h6>\n<ul><li>Ut alias quas ab aut</li><li>Enim sit aut modi enim</li><li>Ratione porro</li><li>Voluptatem quo velit debitis quis cum</li><li>Animi dolores</li><li>Tenetur facilis</li><li>Tempore provident odit illo ea</li></ul>','Cum facilis ut occaecati','','publish','open','open','','cum-facilis-ut-occaecati','','','2020-03-25 10:18:48','2020-03-25 10:18:48','',0,'http://kg.wordpress.local/cum-facilis-ut-occaecati/',0,'post','',0);
INSERT INTO `wp_posts` VALUES (15,1,'2020-03-26 02:34:38','2020-03-26 02:34:38','','50d528d8-4c5d-3e9e-8940-e95b7754d9ad','','inherit','open','closed','','50d528d8-4c5d-3e9e-8940-e95b7754d9ad','','','2020-03-26 02:34:38','2020-03-26 02:34:38','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/50d528d8-4c5d-3e9e-8940-e95b7754d9ad.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (16,1,'2020-03-26 02:34:45','2020-03-26 02:34:45','','fe93da88-bb8b-3039-be20-3b10cdd8a595','','inherit','open','closed','','fe93da88-bb8b-3039-be20-3b10cdd8a595','','','2020-03-26 02:34:45','2020-03-26 02:34:45','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/fe93da88-bb8b-3039-be20-3b10cdd8a595.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (17,1,'2020-03-25 12:01:24','2020-03-25 12:01:24','<h5>Eum quia ut totam ut eius pariatur ratione. Earum corrupti qui ut sed modi provident nostrum. Consequatur sit reprehenderit tempore ab autem enim</h5>\n<ol><li>Ut non</li></ol>\n<h4>Qui architecto eius quia voluptatem alias</h4>\n<ul><li>Est et eligendi asperiores</li><li>Quis eligendi non nulla vero</li><li>Dolorem maxime sed et tempora</li></ul>\n<h6>Eius quia aut sequi. Nostrum similique suscipit aliquam et repellat. Omnis ex harum ipsam veniam quis</h6>\n<hr>\n<!--more-->\n<p>Ab molestiae aut et quisquam illum enim Laboriosam <a title=\"Aspernatur deserunt eligendi impedit ducimus earum sint cum repellat.\" href=\"http://champlin.com/distinctio-sed-totam-quae-temporibus\">corrupti et qui fuga eveniet.</a> iusto id officia dolores illo. Vitae maxime error. Aut qui deserunt voluptas. Sunt laborum qui blanditiis quia qui ducimus. et aut alias omnis. Sint natus quos quo dolor Placeat nam iure hic. Non tempore temporibus vel. Ipsum sunt iure ratione. Libero corrupti voluptatem. Voluptate ex accusamus doloremque voluptate sapiente molestiae quia. Quidem nesciunt fugiat voluptas accusantium. Explicabo eum et et delectus placeat nam</p>\n<img alt=\"Laboriosam ipsum vitae et sed quibusdam\" src=\"http://kg.wordpress.local/wp-content/uploads/2020/03/fe93da88-bb8b-3039-be20-3b10cdd8a595.png\">\n<blockquote><a title=\"Rerum praesentium quia reiciendis est veniam.\" href=\"https://walsh.biz/sed-velit-quidem-exercitationem-necessitatibus-et-voluptatem-eaque.html\">Rerum velit nihil mollitia saepe praesentium blanditiis</a> Repellendus quisquam quisquam est qui. Corrupti quas dolorem sit. amet corrupti aut. aliquam sint veritatis dolore autem Voluptatem suscipit ipsam harum atque Esse quo sunt totam molestias suscipit unde corrupti. Ut nihil repellat autem fugit iure et dolore. qui odio modi adipisci. Enim tenetur est doloremque Natus veritatis architecto occaecati <a title=\"Et qui quia.\" href=\"http://www.turcotte.info/tempora-officiis-sit-libero-magni-dignissimos-porro-error\">omnis. Non</a> architecto cumque. Illo repudiandae quas quos debitis. veniam ut sed distinctio ea vel. Et <a title=\"Assumenda sed vero ab dolorem exercitationem.\" href=\"http://marvin.com/ut-recusandae-culpa-et\">sit ducimus necessitatibus necessitatibus</a> Blanditiis nostrum et quia officiis ullam voluptas dicta.</blockquote>','Nostrum provident doloribus reiciendis est tempore est','Veritatis ut illo similique aut maxime et non quo non illum et dolores laboriosam numquam quae molestias autem et cupiditate a earum necessitatibus doloremque voluptatum quae et accusantium quod quia nesciunt nam quod consequatur deleniti nobis ut minima ratione sunt qui repellendus iusto sit voluptate praesentium inventore dolores vel aspernatur est doloremque.\n\nSimilique et sit voluptatibus eum et reprehenderit voluptatem ad fuga maiores eveniet eaque necessitatibus assumenda ad repellendus reprehenderit est dolorem ratione eveniet autem velit facilis exercitationem ipsa et perspiciatis sint id rem corporis libero sit architecto nemo esse dolores explicabo dolorem quia molestiae deserunt dolor non eos recusandae facere esse aut distinctio rerum atque vitae sed amet sit sed laboriosam tempore cumque sit.','publish','open','open','','nostrum-provident-doloribus-reiciendis-est-tempore-est','','','2020-03-25 12:01:24','2020-03-25 12:01:24','',0,'http://kg.wordpress.local/nostrum-provident-doloribus-reiciendis-est-tempore-est/',0,'post','',0);
INSERT INTO `wp_posts` VALUES (18,1,'2020-03-26 02:34:45','2020-03-26 02:34:45','','d4958e7e-792e-3121-8600-167e7bba4b60','','inherit','open','closed','','d4958e7e-792e-3121-8600-167e7bba4b60','','','2020-03-26 02:34:45','2020-03-26 02:34:45','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/d4958e7e-792e-3121-8600-167e7bba4b60.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (19,1,'2020-03-26 02:34:46','2020-03-26 02:34:46','','d417d930-e9cb-3ca2-a73f-313405bd53eb','','inherit','open','closed','','d417d930-e9cb-3ca2-a73f-313405bd53eb','','','2020-03-26 02:34:46','2020-03-26 02:34:46','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/d417d930-e9cb-3ca2-a73f-313405bd53eb.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (20,1,'2020-03-26 02:34:46','2020-03-26 02:34:46','','5203694b-de22-3ad0-821f-1912cc532d32','','inherit','open','closed','','5203694b-de22-3ad0-821f-1912cc532d32','','','2020-03-26 02:34:46','2020-03-26 02:34:46','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/5203694b-de22-3ad0-821f-1912cc532d32.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (21,1,'2020-03-25 16:54:07','2020-03-25 16:54:07','<h5>Voluptatum voluptatibus mollitia aliquam at quis</h5>\n<img class=\"aligncenter\" alt=\"Cum omnis est dignissimos voluptatibus adipisci\" src=\"http://kg.wordpress.local/wp-content/uploads/2020/03/d417d930-e9cb-3ca2-a73f-313405bd53eb.png\">\n<img class=\"alignleft\" alt=\"Nobis deleniti odio impedit dolores ducimus\" src=\"http://kg.wordpress.local/wp-content/uploads/2020/03/5203694b-de22-3ad0-821f-1912cc532d32.png\">\n<!--more-->\n<h5>Quia qui consequatur enim assumenda. Totam minus quis amet. Et minus debitis quisquam et</h5>\n<p>Asperiores aspernatur autem placeat Dolorum rerum nam velit aperiam. in ab asperiores consequuntur doloribus ea. Aut veniam accusantium sint ullam. Ex sit quasi sunt. iusto fugit nihil iusto Earum inventore ut doloribus dolorem Praesentium eaque pariatur tenetur unde. in cupiditate velit deleniti Dolores nesciunt qui est. Vero nihil voluptatem nisi. Natus dolorem eos consectetur. dolore ut sint. Earum quia nobis. Non consequatur consequatur necessitatibus Suscipit doloremque quos incidunt consequuntur. asperiores quo animi consequatur deserunt nostrum et. Ad quas dolorem consequatur officia similique. Earum placeat consequatur velit ut. aliquam est natus impedit earum dolor. Dolores corrupti voluptatem debitis et Possimus molestias quo voluptas magnam <a title=\"Unde explicabo porro.\" href=\"http://www.dach.com/\">Praesentium maiores</a> aliquid neque. Et voluptatem et</p>\n<hr>','Dolores hic commodi qui','','publish','open','open','','dolores-hic-commodi-qui','','','2020-03-25 16:54:07','2020-03-25 16:54:07','',0,'http://kg.wordpress.local/dolores-hic-commodi-qui/',0,'page','',0);
INSERT INTO `wp_posts` VALUES (22,1,'2020-03-26 02:34:46','2020-03-26 02:34:46','','b01da293-4aae-3255-9aa8-8a777ffedf66','','inherit','open','closed','','b01da293-4aae-3255-9aa8-8a777ffedf66','','','2020-03-26 02:34:46','2020-03-26 02:34:46','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/b01da293-4aae-3255-9aa8-8a777ffedf66.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (23,1,'2020-03-26 02:34:46','2020-03-26 02:34:46','','cd181924-af17-3556-aac0-9807605f3c30','','inherit','open','closed','','cd181924-af17-3556-aac0-9807605f3c30','','','2020-03-26 02:34:46','2020-03-26 02:34:46','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/cd181924-af17-3556-aac0-9807605f3c30.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (24,1,'2020-03-25 12:08:59','2020-03-25 12:08:59','<h6>Animi explicabo ipsa non aut tempore beatae. Perferendis id quaerat est voluptates eveniet et. Id sed vel iure ut ipsa</h6>\n<ul><li>Fuga et quo adipisci</li><li>Labore quos ab ut vel sint consequatur</li><li>At neque atque quidem</li><li>Aut natus sunt praesentium</li></ul>\n<img class=\"alignleft\" src=\"http://kg.wordpress.local/wp-content/uploads/2020/03/cd181924-af17-3556-aac0-9807605f3c30.png\">\n<h6>At quia qui placeat. Et optio mollitia consequatur in eaque. Sint nesciunt laudantium qui rerum quasi</h6>\n<ul><li>Qui quas</li><li>Enim quidem corrupti voluptas</li><li>Explicabo unde ut voluptas corrupti eligendi saepe</li><li>Illo optio et delectus perferendis odio minus</li><li>At sunt repellendus est dolorem minima sunt nostrum</li><li>Ipsum fugit ut</li><li>Qui perferendis fugiat dolorem at</li></ul>','Eaque omnis veniam labore sunt dolores eius','Id temporibus sit accusamus quaerat rem voluptas neque quidem repellendus necessitatibus labore tempore praesentium quam ratione rem laudantium consequatur ut aperiam magnam nisi omnis sit veritatis cum fuga mollitia ipsa quibusdam voluptas eligendi id voluptates aut sint rerum quaerat et et nostrum ad minus quia ea quae amet quis libero quas omnis veniam.','publish','open','closed','','eaque-omnis-veniam-labore-sunt-dolores-eius','','','2020-03-25 12:08:59','2020-03-25 12:08:59','',0,'http://kg.wordpress.local/eaque-omnis-veniam-labore-sunt-dolores-eius/',0,'post','',0);
INSERT INTO `wp_posts` VALUES (25,1,'2020-03-26 02:34:47','2020-03-26 02:34:47','','fab6f089-2335-376d-a820-3394ab0718b1','','inherit','open','closed','','fab6f089-2335-376d-a820-3394ab0718b1','','','2020-03-26 02:34:47','2020-03-26 02:34:47','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/fab6f089-2335-376d-a820-3394ab0718b1.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (26,1,'2020-03-26 02:35:07','2020-03-26 02:35:07','<!-- wp:heading --><h2>Who we are</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Our website address is: http://kg.wordpress.local.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>What personal data we collect and why we collect it</h2><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>Comments</h3><!-- /wp:heading --><!-- wp:paragraph --><p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor&#8217;s IP address and browser user agent string to help spam detection.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Media</h3><!-- /wp:heading --><!-- wp:paragraph --><p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Contact forms</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>Cookies</h3><!-- /wp:heading --><!-- wp:paragraph --><p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select &quot;Remember Me&quot;, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Embedded content from other websites</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Analytics</h3><!-- /wp:heading --><!-- wp:heading --><h2>Who we share your data with</h2><!-- /wp:heading --><!-- wp:heading --><h2>How long we retain your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>What rights you have over your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>Where we send your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Visitor comments may be checked through an automated spam detection service.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>Your contact information</h2><!-- /wp:heading --><!-- wp:heading --><h2>Additional information</h2><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>How we protect your data</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>What data breach procedures we have in place</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>What third parties we receive data from</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>What automated decision making and/or profiling we do with user data</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>Industry regulatory disclosure requirements</h3><!-- /wp:heading -->','Privacy Policy','','inherit','closed','closed','','3-revision-v1','','','2020-03-26 02:35:07','2020-03-26 02:35:07','',3,'http://kg.wordpress.local/3-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (33,1,'2020-03-28 20:19:41','2020-03-28 20:19:41','','LimitlessTheory3.com','','publish','open','closed','','limitlesstheory3-com','','','2020-03-28 20:51:13','2020-03-28 20:51:13','',0,'http://kg.wordpress.local/?post_type=project&#038;p=33',0,'project','',0);
INSERT INTO `wp_posts` VALUES (51,1,'2020-03-28 20:46:57','2020-03-28 20:46:57','','LimitlessTheory3.com','','inherit','closed','closed','','33-revision-v1','','','2020-03-28 20:46:57','2020-03-28 20:46:57','',33,'http://kg.wordpress.local/33-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (52,1,'2020-03-28 20:48:06','2020-03-28 20:48:06','','0','','inherit','open','closed','','0','','','2020-03-28 20:48:06','2020-03-28 20:48:06','',33,'http://kg.wordpress.local/wp-content/uploads/2020/03/0.jpeg',0,'attachment','image/jpeg',0);
INSERT INTO `wp_posts` VALUES (55,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:7:{s:8:\"location\";a:1:{i:0;a:1:{i:0;a:3:{s:5:\"param\";s:13:\"page_template\";s:8:\"operator\";s:2:\"==\";s:5:\"value\";s:14:\"page-about.php\";}}}s:8:\"position\";s:6:\"normal\";s:5:\"style\";s:7:\"default\";s:15:\"label_placement\";s:3:\"top\";s:21:\"instruction_placement\";s:5:\"label\";s:14:\"hide_on_screen\";s:0:\"\";s:11:\"description\";s:0:\"\";}','Page :: About','page-about','publish','closed','closed','','group_5e7fb938502eb','','','2020-03-29 01:38:05','2020-03-29 01:38:05','',0,'http://kg.wordpress.local/?post_type=acf-field-group&#038;p=55',0,'acf-field-group','',0);
INSERT INTO `wp_posts` VALUES (56,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:4:\"text\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";}','Hero Title','hero_title','publish','closed','closed','','field_5e7fb94fc7c8e','','','2020-03-28 20:59:04','2020-03-28 20:59:04','',55,'http://kg.wordpress.local/?post_type=acf-field&p=56',0,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (57,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:8:\"textarea\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";s:4:\"rows\";s:0:\"\";s:9:\"new_lines\";s:0:\"\";}','Hero Text','hero_text','publish','closed','closed','','field_5e7fb97cc7c90','','','2020-03-28 20:59:04','2020-03-28 20:59:04','',55,'http://kg.wordpress.local/?post_type=acf-field&p=57',1,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (58,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:8:\"repeater\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:9:\"collapsed\";s:0:\"\";s:3:\"min\";s:0:\"\";s:3:\"max\";s:0:\"\";s:6:\"layout\";s:5:\"table\";s:12:\"button_label\";s:0:\"\";}','My Specialties','my_specialties','publish','closed','closed','','field_5e7fb9aac7c91','','','2020-03-28 21:02:01','2020-03-28 21:02:01','',55,'http://kg.wordpress.local/?post_type=acf-field&#038;p=58',3,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (59,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:4:\"text\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";}','Specialty Section Title','specialty_section_title','publish','closed','closed','','field_5e7fb9bec7c92','','','2020-03-28 21:02:01','2020-03-28 21:02:01','',55,'http://kg.wordpress.local/?post_type=acf-field&#038;p=59',2,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (60,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:15:{s:4:\"type\";s:5:\"image\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"return_format\";s:5:\"array\";s:12:\"preview_size\";s:9:\"thumbnail\";s:7:\"library\";s:3:\"all\";s:9:\"min_width\";s:0:\"\";s:10:\"min_height\";s:0:\"\";s:8:\"min_size\";s:0:\"\";s:9:\"max_width\";s:0:\"\";s:10:\"max_height\";s:0:\"\";s:8:\"max_size\";s:0:\"\";s:10:\"mime_types\";s:0:\"\";}','Icon','icon','publish','closed','closed','','field_5e7fb9cbc7c93','','','2020-03-28 21:08:40','2020-03-28 21:08:40','',58,'http://kg.wordpress.local/?post_type=acf-field&#038;p=60',0,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (61,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:4:\"text\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";}','Icon Text','icon_text','publish','closed','closed','','field_5e7fb9d6c7c94','','','2020-03-28 21:02:01','2020-03-28 21:02:01','',58,'http://kg.wordpress.local/?post_type=acf-field&#038;p=61',1,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (62,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:4:\"text\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";}','Tech List Title','tech_list_title','publish','closed','closed','','field_5e7fb9edc7c95','','','2020-03-28 21:02:01','2020-03-28 21:02:01','',55,'http://kg.wordpress.local/?post_type=acf-field&#038;p=62',4,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (63,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:8:\"repeater\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:9:\"collapsed\";s:0:\"\";s:3:\"min\";s:0:\"\";s:3:\"max\";s:0:\"\";s:6:\"layout\";s:5:\"table\";s:12:\"button_label\";s:0:\"\";}','Tech List','tech_list','publish','closed','closed','','field_5e7fba06c7c96','','','2020-03-28 21:02:01','2020-03-28 21:02:01','',55,'http://kg.wordpress.local/?post_type=acf-field&#038;p=63',5,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (64,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:15:{s:4:\"type\";s:5:\"image\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"return_format\";s:5:\"array\";s:12:\"preview_size\";s:9:\"thumbnail\";s:7:\"library\";s:3:\"all\";s:9:\"min_width\";s:0:\"\";s:10:\"min_height\";s:0:\"\";s:8:\"min_size\";s:0:\"\";s:9:\"max_width\";s:0:\"\";s:10:\"max_height\";s:0:\"\";s:8:\"max_size\";s:0:\"\";s:10:\"mime_types\";s:0:\"\";}','Tech Icon','tech_icon','publish','closed','closed','','field_5e7fba23c7c97','','','2020-03-28 21:09:04','2020-03-28 21:09:04','',63,'http://kg.wordpress.local/?post_type=acf-field&#038;p=64',0,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (65,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:4:\"text\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";}','Tech Label','tech_label','publish','closed','closed','','field_5e7fba31c7c98','','','2020-03-28 20:59:04','2020-03-28 20:59:04','',63,'http://kg.wordpress.local/?post_type=acf-field&p=65',1,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (66,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:7:{s:4:\"type\";s:5:\"group\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:6:\"layout\";s:5:\"block\";s:10:\"sub_fields\";a:0:{}}','Call to Action Section','call_to_action_section','publish','closed','closed','','field_5e7fba3fc7c99','','','2020-03-28 21:02:01','2020-03-28 21:02:01','',55,'http://kg.wordpress.local/?post_type=acf-field&#038;p=66',6,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (67,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:4:\"text\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";}','Section Title','section_title','publish','closed','closed','','field_5e7fba58c7c9b','','','2020-03-28 20:59:04','2020-03-28 20:59:04','',66,'http://kg.wordpress.local/?post_type=acf-field&p=67',0,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (68,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:4:\"text\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"default_value\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";s:7:\"prepend\";s:0:\"\";s:6:\"append\";s:0:\"\";s:9:\"maxlength\";s:0:\"\";}','Section Description','section_description','publish','closed','closed','','field_5e7fba5fc7c9c','','','2020-03-28 20:59:04','2020-03-28 20:59:04','',66,'http://kg.wordpress.local/?post_type=acf-field&p=68',1,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (69,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:10:{s:4:\"type\";s:8:\"repeater\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:9:\"collapsed\";s:0:\"\";s:3:\"min\";s:0:\"\";s:3:\"max\";s:0:\"\";s:6:\"layout\";s:5:\"table\";s:12:\"button_label\";s:0:\"\";}','Call To Action Buttons','call_to_action_buttons','publish','closed','closed','','field_5e7fba68c7c9d','','','2020-03-28 20:59:04','2020-03-28 20:59:04','',66,'http://kg.wordpress.local/?post_type=acf-field&p=69',2,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (70,1,'2020-03-28 20:59:04','2020-03-28 20:59:04','a:6:{s:4:\"type\";s:4:\"link\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:13:\"return_format\";s:5:\"array\";}','CTA Link','cta_link','publish','closed','closed','','field_5e7fba81c7c9e','','','2020-03-28 20:59:04','2020-03-28 20:59:04','',69,'http://kg.wordpress.local/?post_type=acf-field&p=70',0,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (72,1,'2020-03-28 21:00:41','2020-03-28 21:00:41','','About','','publish','closed','closed','','about','','','2020-03-29 01:38:19','2020-03-29 01:38:19','',0,'http://kg.wordpress.local/?page_id=72',0,'page','',0);
INSERT INTO `wp_posts` VALUES (73,1,'2020-03-28 21:00:41','2020-03-28 21:00:41','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:00:41','2020-03-28 21:00:41','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (74,1,'2020-03-28 21:02:47','2020-03-28 21:02:47','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:02:47','2020-03-28 21:02:47','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (75,1,'2020-03-28 21:04:08','2020-03-28 21:04:08','','icon-design','','inherit','open','closed','','icon-design','','','2020-03-28 21:04:08','2020-03-28 21:04:08','',72,'http://kg.wordpress.local/wp-content/uploads/2020/03/icon-design.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (76,1,'2020-03-28 21:04:22','2020-03-28 21:04:22','','icon-web','','inherit','open','closed','','icon-web','','','2020-03-28 21:04:22','2020-03-28 21:04:22','',72,'http://kg.wordpress.local/wp-content/uploads/2020/03/icon-web.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (77,1,'2020-03-28 21:04:33','2020-03-28 21:04:33','','icon-mobile','','inherit','open','closed','','icon-mobile','','','2020-03-28 21:04:33','2020-03-28 21:04:33','',72,'http://kg.wordpress.local/wp-content/uploads/2020/03/icon-mobile.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (78,1,'2020-03-28 21:04:45','2020-03-28 21:04:45','','icon-social','','inherit','open','closed','','icon-social','','','2020-03-28 21:04:45','2020-03-28 21:04:45','',72,'http://kg.wordpress.local/wp-content/uploads/2020/03/icon-social.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (79,1,'2020-03-28 21:04:51','2020-03-28 21:04:51','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:04:51','2020-03-28 21:04:51','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (80,1,'2020-03-28 21:04:57','2020-03-28 21:04:57','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:04:57','2020-03-28 21:04:57','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (81,1,'2020-03-28 21:06:25','2020-03-28 21:06:25','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:06:25','2020-03-28 21:06:25','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (82,1,'2020-03-28 21:08:06','2020-03-28 21:08:06','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:08:06','2020-03-28 21:08:06','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (83,1,'2020-03-28 21:14:45','2020-03-28 21:14:45','','wordpress','','inherit','open','closed','','wordpress','','','2020-03-28 21:14:45','2020-03-28 21:14:45','',72,'http://kg.wordpress.local/wp-content/uploads/2020/03/wordpress.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (84,1,'2020-03-28 21:15:53','2020-03-28 21:15:53','','electron-1','','inherit','open','closed','','electron-1','','','2020-03-28 21:15:53','2020-03-28 21:15:53','',72,'http://kg.wordpress.local/wp-content/uploads/2020/03/electron-1.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (85,1,'2020-03-28 21:42:47','2020-03-28 21:42:47','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:42:47','2020-03-28 21:42:47','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (86,1,'2020-03-28 21:43:14','2020-03-28 21:43:14','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:43:14','2020-03-28 21:43:14','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (87,1,'2020-03-28 21:44:56','2020-03-28 21:44:56','','react','','inherit','open','closed','','react','','','2020-03-28 21:44:56','2020-03-28 21:44:56','',72,'http://kg.wordpress.local/wp-content/uploads/2020/03/react.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (88,1,'2020-03-28 21:45:12','2020-03-28 21:45:12','','shopify','','inherit','open','closed','','shopify','','','2020-03-28 21:45:12','2020-03-28 21:45:12','',72,'http://kg.wordpress.local/wp-content/uploads/2020/03/shopify.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (89,1,'2020-03-28 21:45:25','2020-03-28 21:45:25','','drupal','','inherit','open','closed','','drupal','','','2020-03-28 21:45:25','2020-03-28 21:45:25','',72,'http://kg.wordpress.local/wp-content/uploads/2020/03/drupal.png',0,'attachment','image/png',0);
INSERT INTO `wp_posts` VALUES (90,1,'2020-03-28 21:48:44','2020-03-28 21:48:44','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:48:44','2020-03-28 21:48:44','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (91,1,'2020-03-28 21:48:53','2020-03-28 21:48:53','','Contact','','publish','closed','closed','','contact','','','2020-03-28 21:48:53','2020-03-28 21:48:53','',0,'http://kg.wordpress.local/?page_id=91',0,'page','',0);
INSERT INTO `wp_posts` VALUES (92,1,'2020-03-28 21:48:53','2020-03-28 21:48:53','','Contact','','inherit','closed','closed','','91-revision-v1','','','2020-03-28 21:48:53','2020-03-28 21:48:53','',91,'http://kg.wordpress.local/91-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (93,1,'2020-03-28 21:49:32','2020-03-28 21:49:32','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:49:32','2020-03-28 21:49:32','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (94,1,'2020-03-28 21:49:56','2020-03-28 21:49:56','<!-- wp:paragraph -->\n<p> </p>\n<!-- /wp:paragraph -->','Projects','','publish','closed','closed','','projects','','','2020-03-29 01:25:04','2020-03-29 01:25:04','',0,'http://kg.wordpress.local/?page_id=94',0,'page','',0);
INSERT INTO `wp_posts` VALUES (95,1,'2020-03-28 21:49:56','2020-03-28 21:49:56','','Projects','','inherit','closed','closed','','94-revision-v1','','','2020-03-28 21:49:56','2020-03-28 21:49:56','',94,'http://kg.wordpress.local/94-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (96,1,'2020-03-28 21:50:24','2020-03-28 21:50:24','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:50:24','2020-03-28 21:50:24','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (97,1,'2020-03-28 21:50:26','2020-03-28 21:50:26','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-28 21:50:26','2020-03-28 21:50:26','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (98,1,'2020-03-28 23:22:20','2020-03-28 23:22:20','<!-- wp:paragraph -->\n<p> </p>\n<!-- /wp:paragraph -->','Projects','','inherit','closed','closed','','94-autosave-v1','','','2020-03-28 23:22:20','2020-03-28 23:22:20','',94,'http://kg.wordpress.local/94-autosave-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (99,1,'2020-03-29 01:25:04','2020-03-29 01:25:04','<!-- wp:paragraph -->\n<p> </p>\n<!-- /wp:paragraph -->','Projects','','inherit','closed','closed','','94-revision-v1','','','2020-03-29 01:25:04','2020-03-29 01:25:04','',94,'http://kg.wordpress.local/94-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (100,1,'2020-03-29 01:37:28','2020-03-29 01:37:28','a:10:{s:4:\"type\";s:10:\"true_false\";s:12:\"instructions\";s:0:\"\";s:8:\"required\";i:0;s:17:\"conditional_logic\";i:0;s:7:\"wrapper\";a:3:{s:5:\"width\";s:0:\"\";s:5:\"class\";s:0:\"\";s:2:\"id\";s:0:\"\";}s:7:\"message\";s:0:\"\";s:13:\"default_value\";i:0;s:2:\"ui\";i:0;s:10:\"ui_on_text\";s:0:\"\";s:11:\"ui_off_text\";s:0:\"\";}','is Primary','is_primary','publish','closed','closed','','field_5e7ffbbfe27bc','','','2020-03-29 01:38:05','2020-03-29 01:38:05','',69,'http://kg.wordpress.local/?post_type=acf-field&#038;p=100',1,'acf-field','',0);
INSERT INTO `wp_posts` VALUES (101,1,'2020-03-29 01:38:19','2020-03-29 01:38:19','','About','','inherit','closed','closed','','72-revision-v1','','','2020-03-29 01:38:19','2020-03-29 01:38:19','',72,'http://kg.wordpress.local/72-revision-v1/',0,'revision','',0);
INSERT INTO `wp_posts` VALUES (102,1,'2020-03-29 02:23:57','2020-03-29 02:23:57','{\n    \"blogname\": {\n        \"value\": \"Kevin Garubba\",\n        \"type\": \"option\",\n        \"user_id\": 1,\n        \"date_modified_gmt\": \"2020-03-29 02:23:57\"\n    },\n    \"blogdescription\": {\n        \"value\": \"Design | Dev\",\n        \"type\": \"option\",\n        \"user_id\": 1,\n        \"date_modified_gmt\": \"2020-03-29 02:23:57\"\n    }\n}','','','trash','closed','closed','','58f6d2b2-1575-4696-8fe5-9460ac0f57f4','','','2020-03-29 02:23:57','2020-03-29 02:23:57','',0,'http://kg.wordpress.local/58f6d2b2-1575-4696-8fe5-9460ac0f57f4/',0,'customize_changeset','',0);
INSERT INTO `wp_posts` VALUES (103,1,'2020-03-29 02:25:48','2020-03-29 02:25:48','','minimal-steel-light-100','','inherit','open','closed','','minimal-steel-light-100','','','2020-03-29 02:25:48','2020-03-29 02:25:48','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/minimal-steel-light-100.jpg',0,'attachment','image/jpeg',0);
INSERT INTO `wp_posts` VALUES (104,1,'2020-03-29 02:25:54','2020-03-29 02:25:54','http://kg.wordpress.local/wp-content/uploads/2020/03/cropped-minimal-steel-light-100.jpg','cropped-minimal-steel-light-100.jpg','','inherit','open','closed','','cropped-minimal-steel-light-100-jpg','','','2020-03-29 02:25:54','2020-03-29 02:25:54','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/cropped-minimal-steel-light-100.jpg',0,'attachment','image/jpeg',0);
INSERT INTO `wp_posts` VALUES (105,1,'2020-03-29 02:26:01','2020-03-29 02:26:01','{\n    \"site_icon\": {\n        \"value\": 104,\n        \"type\": \"option\",\n        \"user_id\": 1,\n        \"date_modified_gmt\": \"2020-03-29 02:26:01\"\n    }\n}','','','trash','closed','closed','','712a85aa-94c4-4882-b23c-3bb7e988a4fe','','','2020-03-29 02:26:01','2020-03-29 02:26:01','',0,'http://kg.wordpress.local/712a85aa-94c4-4882-b23c-3bb7e988a4fe/',0,'customize_changeset','',0);
INSERT INTO `wp_posts` VALUES (106,1,'2020-03-29 02:29:45','2020-03-29 02:29:45','http://kg.wordpress.local/wp-content/uploads/2020/03/cropped-minimal-steel-light-100-1.jpg','cropped-minimal-steel-light-100-1.jpg','','inherit','open','closed','','cropped-minimal-steel-light-100-1-jpg','','','2020-03-29 02:29:45','2020-03-29 02:29:45','',0,'http://kg.wordpress.local/wp-content/uploads/2020/03/cropped-minimal-steel-light-100-1.jpg',0,'attachment','image/jpeg',0);
INSERT INTO `wp_posts` VALUES (107,1,'2020-03-29 02:29:47','2020-03-29 02:29:47','{\n    \"kevingarubba.com-wp-theme::custom_logo\": {\n        \"value\": 106,\n        \"type\": \"theme_mod\",\n        \"user_id\": 1,\n        \"date_modified_gmt\": \"2020-03-29 02:29:47\"\n    }\n}','','','trash','closed','closed','','b6ed0efe-62f0-4c6b-b1c5-c9f206e50c96','','','2020-03-29 02:29:47','2020-03-29 02:29:47','',0,'http://kg.wordpress.local/b6ed0efe-62f0-4c6b-b1c5-c9f206e50c96/',0,'customize_changeset','',0);
INSERT INTO `wp_posts` VALUES (110,1,'2020-03-29 02:45:07','2020-03-29 02:45:07','<label> Your Name (required)\n    [text* your-name] </label>\n\n<label> Your Email (required)\n    [email* your-email] </label>\n\n<label> Subject\n    [text your-subject] </label>\n\n<label> Your Message\n    [textarea your-message] </label>\n\n[submit \"Send\"]\nKevin Garubba \"[your-subject]\"\nKevin Garubba <wordpress@kg.wordpress.local>\nFrom: [your-name] <[your-email]>\nSubject: [your-subject]\n\nMessage Body:\n[your-message]\n\n-- \nThis e-mail was sent from a contact form on Kevin Garubba (http://kg.wordpress.local)\nkevingarubba@gmail.com\nReply-To: [your-email]\n\n0\n0\n\nKevin Garubba \"[your-subject]\"\nKevin Garubba <wordpress@kg.wordpress.local>\nMessage Body:\n[your-message]\n\n-- \nThis e-mail was sent from a contact form on Kevin Garubba (http://kg.wordpress.local)\n[your-email]\nReply-To: kevingarubba@gmail.com\n\n0\n0\nThank you for your message. It has been sent.\nThere was an error trying to send your message. Please try again later.\nOne or more fields have an error. Please check and try again.\nThere was an error trying to send your message. Please try again later.\nYou must accept the terms and conditions before sending your message.\nThe field is required.\nThe field is too long.\nThe field is too short.','Contact form 1','','publish','closed','closed','','contact-form-1','','','2020-03-29 02:45:07','2020-03-29 02:45:07','',0,'http://kg.wordpress.local/?post_type=wpcf7_contact_form&p=110',0,'wpcf7_contact_form','',0);
/*!40000 ALTER TABLE `wp_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_term_relationships`
--

DROP TABLE IF EXISTS `wp_term_relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_term_relationships` (
  `object_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `term_taxonomy_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `term_order` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  KEY `term_taxonomy_id` (`term_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_term_relationships`
--

LOCK TABLES `wp_term_relationships` WRITE;
/*!40000 ALTER TABLE `wp_term_relationships` DISABLE KEYS */;
INSERT INTO `wp_term_relationships` VALUES (1,1,0);
INSERT INTO `wp_term_relationships` VALUES (8,1,0);
INSERT INTO `wp_term_relationships` VALUES (11,1,0);
INSERT INTO `wp_term_relationships` VALUES (14,1,0);
INSERT INTO `wp_term_relationships` VALUES (17,1,0);
INSERT INTO `wp_term_relationships` VALUES (21,1,0);
INSERT INTO `wp_term_relationships` VALUES (33,2,0);
INSERT INTO `wp_term_relationships` VALUES (33,3,0);
/*!40000 ALTER TABLE `wp_term_relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_term_taxonomy`
--

DROP TABLE IF EXISTS `wp_term_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_term_taxonomy` (
  `term_taxonomy_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `taxonomy` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `description` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `count` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_taxonomy_id`),
  UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  KEY `taxonomy` (`taxonomy`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_term_taxonomy`
--

LOCK TABLES `wp_term_taxonomy` WRITE;
/*!40000 ALTER TABLE `wp_term_taxonomy` DISABLE KEYS */;
INSERT INTO `wp_term_taxonomy` VALUES (1,1,'category','',0,5);
INSERT INTO `wp_term_taxonomy` VALUES (2,2,'Process','',0,1);
INSERT INTO `wp_term_taxonomy` VALUES (3,3,'Process','',0,1);
INSERT INTO `wp_term_taxonomy` VALUES (4,4,'Process','',0,0);
/*!40000 ALTER TABLE `wp_term_taxonomy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_termmeta`
--

DROP TABLE IF EXISTS `wp_termmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_termmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_520_ci,
  PRIMARY KEY (`meta_id`),
  KEY `term_id` (`term_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_termmeta`
--

LOCK TABLES `wp_termmeta` WRITE;
/*!40000 ALTER TABLE `wp_termmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_termmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_terms`
--

DROP TABLE IF EXISTS `wp_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_terms` (
  `term_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `slug` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_id`),
  KEY `slug` (`slug`(191)),
  KEY `name` (`name`(191))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_terms`
--

LOCK TABLES `wp_terms` WRITE;
/*!40000 ALTER TABLE `wp_terms` DISABLE KEYS */;
INSERT INTO `wp_terms` VALUES (1,'Uncategorized','uncategorized',0);
INSERT INTO `wp_terms` VALUES (2,'Design','design',0);
INSERT INTO `wp_terms` VALUES (3,'Development','development',0);
INSERT INTO `wp_terms` VALUES (4,'Project Management','project-management',0);
/*!40000 ALTER TABLE `wp_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_usermeta`
--

DROP TABLE IF EXISTS `wp_usermeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_usermeta` (
  `umeta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_520_ci,
  PRIMARY KEY (`umeta_id`),
  KEY `user_id` (`user_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_usermeta`
--

LOCK TABLES `wp_usermeta` WRITE;
/*!40000 ALTER TABLE `wp_usermeta` DISABLE KEYS */;
INSERT INTO `wp_usermeta` VALUES (1,1,'nickname','kevin');
INSERT INTO `wp_usermeta` VALUES (2,1,'first_name','');
INSERT INTO `wp_usermeta` VALUES (3,1,'last_name','');
INSERT INTO `wp_usermeta` VALUES (4,1,'description','');
INSERT INTO `wp_usermeta` VALUES (5,1,'rich_editing','true');
INSERT INTO `wp_usermeta` VALUES (6,1,'syntax_highlighting','true');
INSERT INTO `wp_usermeta` VALUES (7,1,'comment_shortcuts','false');
INSERT INTO `wp_usermeta` VALUES (8,1,'admin_color','fresh');
INSERT INTO `wp_usermeta` VALUES (9,1,'use_ssl','0');
INSERT INTO `wp_usermeta` VALUES (10,1,'show_admin_bar_front','true');
INSERT INTO `wp_usermeta` VALUES (11,1,'locale','');
INSERT INTO `wp_usermeta` VALUES (12,1,'wp_capabilities','a:1:{s:13:\"administrator\";b:1;}');
INSERT INTO `wp_usermeta` VALUES (13,1,'wp_user_level','10');
INSERT INTO `wp_usermeta` VALUES (14,1,'dismissed_wp_pointers','');
INSERT INTO `wp_usermeta` VALUES (15,1,'show_welcome_panel','1');
INSERT INTO `wp_usermeta` VALUES (16,1,'session_tokens','a:1:{s:64:\"65a1221dfe964587b3f3d0d8d0e40f1f5bcfaa2761981f289a072b6989d2a75c\";a:4:{s:10:\"expiration\";i:1585596555;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:105:\"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36\";s:5:\"login\";i:1585423755;}}');
INSERT INTO `wp_usermeta` VALUES (17,1,'wp_dashboard_quick_press_last_post_id','4');
INSERT INTO `wp_usermeta` VALUES (18,1,'wp_user-settings','libraryContent=browse');
INSERT INTO `wp_usermeta` VALUES (19,1,'wp_user-settings-time','1585432119');
/*!40000 ALTER TABLE `wp_usermeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_users`
--

DROP TABLE IF EXISTS `wp_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wp_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_pass` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_nicename` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_email` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_url` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT '0',
  `display_name` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`),
  KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_users`
--

LOCK TABLES `wp_users` WRITE;
/*!40000 ALTER TABLE `wp_users` DISABLE KEYS */;
INSERT INTO `wp_users` VALUES (1,'kevin','$P$BUNPF8nWx8y0GJ8DlBoW302T1H8ESC0','kevin','kevingarubba@gmail.com','','2020-03-24 03:29:33','',0,'kevin');
/*!40000 ALTER TABLE `wp_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-12 21:15:18
