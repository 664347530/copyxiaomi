/*
Navicat MySQL Data Transfer

Source Server         : lazy
Source Server Version : 80018
Source Host           : 127.0.0.1:3308
Source Database       : xiaomishop

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2025-04-05 13:25:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `address_id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) DEFAULT NULL,
  `address_name` varchar(255) DEFAULT NULL,
  `address_phone` varchar(255) DEFAULT NULL,
  `address_main` varchar(255) DEFAULT NULL,
  `address_detail` varchar(255) DEFAULT NULL,
  `address_default` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '2', '周霄翔', '19373302098', '湖南省长沙市望城区', '中南林业科技大学涉外学院', '0');
INSERT INTO `address` VALUES ('8', '2', '周慧敏', '15994786072', '广东省深圳市福田区', '石厦西村', '1');
INSERT INTO `address` VALUES ('4', '2', '周霄薇', '18274215446', '湖南省株洲市攸县', '长鸿实验中学', '0');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) DEFAULT NULL,
  `address_name` varchar(255) DEFAULT NULL,
  `address_phone` varchar(255) DEFAULT NULL,
  `address_main` varchar(255) DEFAULT NULL,
  `address_detail` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `product_color` varchar(255) DEFAULT NULL,
  `product_img` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_nei` varchar(255) DEFAULT NULL,
  `product_num` int(255) DEFAULT NULL,
  `product_price` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `order_state` varchar(255) DEFAULT '已支付',
  PRIMARY KEY (`order_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('9', '2', '周慧敏', '15994786072', '广东省深圳市福田区', '石厦西村', '13497', '浅草绿', 'xiaomi15green.png', 'Xiaomi 15', '12GB+256GB', '3', '4499', '2025-03-26 21:17:06', '已支付');
INSERT INTO `orders` VALUES ('8', '2', '周霄薇', '18274215446', '湖南省株洲市攸县', '长鸿实验中学', '15897', '白色', 'xiaomi15Prowhite.png', 'Xiaomi 15Pro', '12GB+256GB', '3', '5299', '2025-03-26 21:14:46', '已支付');
INSERT INTO `orders` VALUES ('7', '2', '周霄薇', '18274215446', '湖南省株洲市攸县', '长鸿实验中学', '9598', '丁香紫', 'xiaomi15purpo.png', 'Xiaomi 15', '12GB+512GB', '2', '4799', '2025-03-26 21:14:46', '已支付');
INSERT INTO `orders` VALUES ('12', '2', '周霄翔', '19373302098', '湖南省长沙市望城区', '中南林业科技大学涉外学院', '10598', '岩石灰', 'xiaomi15Progrey.png', 'Xiaomi 15Pro', '12GB+256GB', '2', '5299', '2025-03-26 21:19:38', '已支付');
INSERT INTO `orders` VALUES ('13', '2', '周霄翔', '19373302098', '湖南省长沙市望城区', '中南林业科技大学涉外学院', '10998', '亮银', 'xiaomi15silvery.png', 'Xiaomi 15', '16GB+1TB', '2', '5499', '2025-03-26 21:20:25', '已支付');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `product_img` varchar(100) DEFAULT NULL,
  `product_price` varchar(100) DEFAULT NULL,
  `product_introduce` varchar(255) DEFAULT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `product_state` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', 'Xiaomi 15Pro', 'xiaomi1.jpg', '5299', '徕卡光学 Summilux 高速镜头｜骁龙®8至尊版移动平台｜6100mAh 小米金沙江电池 120mm 徕卡潜望长焦 ｜小米澎湃OS 2｜全生态AI助手 超级小爱', 'Xphone', '在售');
INSERT INTO `product` VALUES ('2', 'Xiaomi 15', 'xiaomi2.jpg', '4499', '徕卡光学 Summilux 高速镜头｜骁龙®8至尊版移动平台｜5400mAh 小米金沙江电池 小米澎湃OS 2｜全生态AI助手 超级小爱｜低功耗超级阳光屏', 'Xphone', '在售');
INSERT INTO `product` VALUES ('3', 'Xiaomi 14Ultra', 'xiaomi3.jpg', '5999', '徕卡光学 Summilux 镜头，第三代骁龙®8移动平台', 'Xphone', '在售');
INSERT INTO `product` VALUES ('4', 'Xiaomi 14Pro', 'xiaomi4.jpg', '4599', '徕卡Summilux可变光圈镜头｜光影猎人900影像传感器 | 小米澎湃OS | 全新小米龙晶玻璃｜全等深微曲屏｜第三代骁龙®8移动平台', 'Xphone', '在售');
INSERT INTO `product` VALUES ('5', 'Xiaomi 14', 'xiaomi5.hpg', '3999', '徕卡光学Summilux镜头｜光影猎人900影像传感器 | 75mm徕卡浮动长焦 | 小米澎湃OS ｜第三代骁龙®8移动平台｜小米环形冷泵', 'Xphone', '在售');

-- ----------------------------
-- Table structure for product_neicun
-- ----------------------------
DROP TABLE IF EXISTS `product_neicun`;
CREATE TABLE `product_neicun` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_name` varchar(255) DEFAULT NULL,
  `p_price` varchar(255) DEFAULT NULL,
  `p_neicun` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of product_neicun
-- ----------------------------
INSERT INTO `product_neicun` VALUES ('1', 'Xiaomi 15Pro', '5799', '16GB+512GB');
INSERT INTO `product_neicun` VALUES ('2', 'Xiaomi 15Pro', '5299', '12GB+256GB');
INSERT INTO `product_neicun` VALUES ('3', 'Xiaomi 15Pro', '6499', '16GB+1TB');
INSERT INTO `product_neicun` VALUES ('4', 'xiaomi 15', '4999', '16GB+512GB');
INSERT INTO `product_neicun` VALUES ('5', 'xiaomi 15', '4499', '12GB+256GB');
INSERT INTO `product_neicun` VALUES ('6', 'xiaomi 15', '4799', '12GB+512GB');
INSERT INTO `product_neicun` VALUES ('7', 'xiaomi 15', '5499', '16GB+1TB');

-- ----------------------------
-- Table structure for p_detail
-- ----------------------------
DROP TABLE IF EXISTS `p_detail`;
CREATE TABLE `p_detail` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_img` varchar(255) DEFAULT NULL,
  `p_name` varchar(255) DEFAULT NULL,
  `p_type` varchar(255) DEFAULT NULL,
  `p_color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of p_detail
-- ----------------------------
INSERT INTO `p_detail` VALUES ('1', 'xiaomi15Prosilvery.png', 'Xiaomi 15Pro', 'Xphone', '亮银');
INSERT INTO `p_detail` VALUES ('2', 'xiaomi15Progreen.png', 'Xiaomi 15Pro', 'Xphone', '云杉绿');
INSERT INTO `p_detail` VALUES ('3', 'xiaomi15Prowhite.png', 'Xiaomi 15Pro', 'Xphone', '白色');
INSERT INTO `p_detail` VALUES ('4', 'xiaomi15Progrey.png', 'Xiaomi 15Pro', 'Xphone', '岩石灰');
INSERT INTO `p_detail` VALUES ('5', 'xiaomi15white.png', 'xiaomi 15', 'Xphone', '白色');
INSERT INTO `p_detail` VALUES ('6', 'xiaomi15black.png', 'xiaomi 15', 'Xphone', '黑色');
INSERT INTO `p_detail` VALUES ('7', 'xiaomi15green.png', 'xiaomi 15', 'Xphone', '浅草绿');
INSERT INTO `p_detail` VALUES ('8', 'xiaomi15purpo.png', 'xiaomi 15', 'Xphone', '丁香紫');
INSERT INTO `p_detail` VALUES ('9', 'xiaomi15silvery.png', 'xiaomi 15', 'Xphone', '亮银');

-- ----------------------------
-- Table structure for search_history
-- ----------------------------
DROP TABLE IF EXISTS `search_history`;
CREATE TABLE `search_history` (
  `search_id` int(255) NOT NULL AUTO_INCREMENT,
  `search_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`search_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of search_history
-- ----------------------------
INSERT INTO `search_history` VALUES ('6', 'xiaomi');
INSERT INTO `search_history` VALUES ('7', 'ipad');
INSERT INTO `search_history` VALUES ('9', 'ipads');
INSERT INTO `search_history` VALUES ('10', 'red');
INSERT INTO `search_history` VALUES ('12', 'w');

-- ----------------------------
-- Table structure for surface
-- ----------------------------
DROP TABLE IF EXISTS `surface`;
CREATE TABLE `surface` (
  `proudct_id` int(100) NOT NULL,
  `img_product` varchar(100) DEFAULT NULL,
  `jie_product` varchar(100) DEFAULT NULL,
  `name_product` varchar(100) DEFAULT NULL,
  `price_product` varchar(100) DEFAULT NULL,
  `state_product` varchar(100) DEFAULT NULL,
  `type_product` varchar(100) DEFAULT NULL,
  `youdian_product` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`proudct_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of surface
-- ----------------------------
INSERT INTO `surface` VALUES ('1', 'sxiaomi1.png', '徕卡光学 Summilux 高速镜头｜骁龙®8至尊版移动平台｜6100mAh 小米金沙江电池 120mm 徕卡潜望长焦 ｜小米澎湃OS 2｜全生态AI助手 超级小爱', 'Xiaomi 15Pro', '5299', '在售', 'Xphone', '徕卡光学 Summilux 高速镜头\\n｜骁龙®8至尊版移动平台\\n｜6100mAh 小米金沙江电池 120mm 徕卡潜望长焦 \\n｜小米澎湃OS 2｜全生态AI助手 超级小爱');
INSERT INTO `surface` VALUES ('2', 'sxiaomi2.png', '徕卡光学 Summilux 高速镜头｜骁龙®8至尊版移动平台｜5400mAh 小米金沙江电池 小米澎湃OS 2｜全生态AI助手 超级小爱｜低功耗超级阳光屏', 'Xiaomi 15', '4499', '在售', 'Xphone', '徕卡光学 Summilux 高速镜头\\n｜骁龙®8至尊版移动平台\\n｜5400mAh 小米金沙江电池 小米澎湃OS 2\\n｜全生态AI助手 超级小爱｜低功耗超级阳光屏');
INSERT INTO `surface` VALUES ('3', 'sxiaomi3.png', '徕卡光学 Summilux 镜头，第三代骁龙®8移动平台', 'Xiaomi 14Ultra', '5999', '在售', 'Xphone', '徕卡光学 Summilux 镜头\\n|第三代骁龙®8移动平台');
INSERT INTO `surface` VALUES ('4', 'sxiaomi4.png', '徕卡Summilux可变光圈镜头｜光影猎人900影像传感器 | 小米澎湃OS | 全新小米龙晶玻璃｜全等深微曲屏｜第三代骁龙®8移动平台', 'Xiaomi 14Pro', '4599', '在售', 'Xphone', '徕卡Summilux可变光圈镜头\\n｜光影猎人900影像传感器\\n | 小米澎湃OS | 全新小米龙晶玻璃\\n｜全等深微曲屏｜第三代骁龙®8移动平台');
INSERT INTO `surface` VALUES ('5', 'sxiaomi5.png', '徕卡光学Summilux镜头｜光影猎人900影像传感器 | 75mm徕卡浮动长焦 | 小米澎湃OS ｜第三代骁龙®8移动平台｜小米环形冷泵', 'Xiaomi 14', '3999', '在售', 'Xphone', '徕卡光学Summilux镜头\\n｜光影猎人900影像传感器\\n|75mm徕卡浮动长焦 | 小米澎湃OS \\n｜第三代骁龙®8移动平台｜小米环形冷泵');
INSERT INTO `surface` VALUES ('6', 'sredmi1.png', '第三代骁龙8|狂暴引擎4.0|2K新国屏|小米青山护眼2.0|6550mAh超长续航|90W闪充|IP68|超声波指纹', 'Redmi K80', '2499', '在售', 'Rphone', '第三代骁龙8|狂暴引擎4.0\\n|2K新国屏|小米青山护眼2.0\\n|6550mAh超长续航|90W闪充|IP68|超声波指纹');
INSERT INTO `surface` VALUES ('7', 'sredmi2.png', '第三代骁龙8｜小米澎湃OS｜狂暴引擎3.0｜冰封散热系统｜2K 护眼屏｜5000mAh 超大电量', 'Redmi K70Pro', '2999', '在售', 'Rphone', '第三代骁龙8｜小米澎湃OS\\n｜狂暴引擎3.0｜冰封散热系统\\n｜2K 护眼屏｜5000mAh 超大电量');
INSERT INTO `surface` VALUES ('8', 'sredmi3.png', '新 2 亿像素 更快更清晰｜旗舰直屏 超细四窄边', 'Redmi Note 13Pro', '1299', '在售', 'Rphone', '新 2 亿像素 更快更清晰\\n｜旗舰直屏 超细四窄边');
INSERT INTO `surface` VALUES ('9', 'sipad1.png', '11.2英寸3.2K高清高刷屏 | 第三代骁龙7+ 旗舰芯片 | HyperOS 2', 'Xiaomi Pad 7', '2299', '在售', 'ipad', '11.2英寸3.2K高清高刷屏\\n | 第三代骁龙7+ 旗舰芯片 | HyperOS 2');

-- ----------------------------
-- Table structure for user_count
-- ----------------------------
DROP TABLE IF EXISTS `user_count`;
CREATE TABLE `user_count` (
  `user_id` int(255) NOT NULL AUTO_INCREMENT,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_token` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT '小米用户',
  `user_sex` varchar(255) DEFAULT NULL,
  `user_img` varchar(255) DEFAULT NULL,
  `user_birthday` date DEFAULT NULL,
  `xiaomiid` int(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_count
-- ----------------------------
INSERT INTO `user_count` VALUES ('2', '19373302098', 'zxx20021213', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJwaG9uZSI6IjE5MzczMzAyMDk4IiwiaWF0IjoxNzM4OTgzMDQ0LCJleHAiOjE3Mzg5ODY2NDR9.iZ7aFW1YsPw8r5z3-eIoQUlM5dDa3pxp6hx5mlrQiUk', 'xiaoxiangZhou', '男', null, null, '213456789');
INSERT INTO `user_count` VALUES ('3', '18274215446', 'zxx20021213', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJwaG9uZSI6IjE4Mjc0MjE1NDQ2IiwiaWF0IjoxNzM4OTgzODkxLCJleHAiOjE3Mzg5ODc0OTF9.h7SwqNj-ExiedXjK3g2o_kn3-6AhwGzraisXnBGxgtU', '小米用户', null, null, null, '987654321');
INSERT INTO `user_count` VALUES ('4', '13873384329', 'zxw20021213', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJwaG9uZSI6IjEzODczMzg0MzI5IiwiaWF0IjoxNzM4OTg1MTcyLCJleHAiOjE3Mzg5ODg3NzJ9.9crAcHwJstB0RJAsfCDhzDMMU7OkPlF-WDD4UeUc3lU', '小米用户', null, null, null, '123456789');
INSERT INTO `user_count` VALUES ('6', '13715139719', 'zxx20021213', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJwaG9uZSI6IjEzNzE1MTM5NzE5IiwiaWF0IjoxNzQwNjYxMzkxLCJleHAiOjE3NDA2NjQ5OTF9.AlRNhvwT3JAP0q4teGbqOP9JXrh9kCdGsANu-qKiDpI', '是小周呦!', '男', null, '0000-00-00', '106517052');

-- ----------------------------
-- Table structure for user_shopcar
-- ----------------------------
DROP TABLE IF EXISTS `user_shopcar`;
CREATE TABLE `user_shopcar` (
  `xin` int(11) NOT NULL AUTO_INCREMENT,
  `p_id` int(255) DEFAULT NULL,
  `user_id` int(255) DEFAULT NULL,
  `product_img` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_nei` varchar(255) DEFAULT NULL,
  `product_color` varchar(255) DEFAULT NULL,
  `product_price` varchar(255) DEFAULT NULL,
  `product_num` int(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `state_product` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`xin`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_shopcar
-- ----------------------------
INSERT INTO `user_shopcar` VALUES ('2', '2', '2', 'xiaomi15green.png', 'Xiaomi 15', '16GB+512GB', '浅草绿', '4999', '1', '4999', '1');
INSERT INTO `user_shopcar` VALUES ('10', '2', '6', 'xiaomi15black.png', 'Xiaomi 15', '16GB+512GB', '黑色', '4999', '1', '4999', '0');
