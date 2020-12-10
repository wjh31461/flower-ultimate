/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : flower

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2020-12-10 21:56:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cart`
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `username` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL COMMENT '数量',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`username`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for `commodity_msg`
-- ----------------------------
DROP TABLE IF EXISTS `commodity_msg`;
CREATE TABLE `commodity_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '花名',
  `material` varchar(200) DEFAULT NULL COMMENT '材料',
  `packing` varchar(200) DEFAULT NULL COMMENT '包装',
  `language` varchar(200) DEFAULT NULL COMMENT '花语',
  `priceh` int(11) DEFAULT NULL,
  `pricel` int(11) NOT NULL,
  `src` varchar(255) DEFAULT NULL COMMENT '缩略图路径',
  `src1` varchar(255) DEFAULT NULL,
  `src2` varchar(255) DEFAULT NULL,
  `src3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=701 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commodity_msg
-- ----------------------------
INSERT INTO `commodity_msg` VALUES ('20', '绿野仙踪 永生花 鲜花礼盒', '奥斯汀玫瑰、泉水玫瑰、绣球、棉毛苏叶、细爪草、褐色果、满天星', '头层牛皮，环保松木', '给予守护的爱', '499', '469', '/static/time-1.jpg', '/static/time-1/20.jpg', '/static/time-1/20-1.jpg', '/static/time-1/20-2.jpg');
INSERT INTO `commodity_msg` VALUES ('300', '一心一意', '红玫瑰11枝，粉色(或者紫色）勿忘我0.3扎，栀子叶8枝', '内层白色雾面纸，外层牛皮纸,咖啡色花结', '11枝玫瑰，寓意一心一意！', '189', '138', '/static/love-1.jpg', '/static/love-1/300.jpg', '/static/love-1/300-1.jpg', '/static/love-1/300-2.jpg');
INSERT INTO `commodity_msg` VALUES ('301', '爱你如初', '雪山玫瑰66枝', '牛皮英文报纸4张，白蓝细条纹罗文带2米', '岁月匆匆如白驹过隙，即使时光往复，我依然爱你如初。', '636', '529', '/static/love-2.jpg', '/static/love-2/301.jpg', '/static/love-2/301-1.jpg', '/static/love-2/301-2.jpg');
INSERT INTO `commodity_msg` VALUES ('302', '致美丽的你', '红玫瑰11枝，满天星0.3扎，栀子叶0.5扎', '外层浅灰紫/香芋紫人造纸，里层白色人造单面纸，白绿粗罗纹带', '很爱你，想把你捧在手心，放在心里......11枝红玫瑰，寓意一心一意。纵然途中万般风景，我的眼里只有你！', '191', '138', '/static/love-3.jpg', '/static/love-3/302.jpg', '/static/love-3/302-1.jpg', '/static/love-3/302-2.jpg');
INSERT INTO `commodity_msg` VALUES ('303', '青青子衿', '白色多头香水百合6枝，澳州腊梅做点缀', '咖啡色条纹纸，牛皮纸，拉菲草', '“青青子衿，悠悠我心。”你在我的心里是如此的超凡脱俗，我喜欢你也为你祝福，祝福你开在最美丽的地方', '359', '280', '/static/love-4.jpg', '/static/love-4/303.jpg', '/static/love-4/303-1.jpg', '/static/love-4/303-2.jpg');
INSERT INTO `commodity_msg` VALUES ('304', '月光女神', '白玫瑰11枝+绿色桔梗5枝，小菊3枝，白色石竹梅4枝，尤加利0.5扎', '灰色雾面纸，白绿细罗纹带', '那些芳香迷人的花儿啊，在无边的海水和长长的海岸之间，她将成为我的爱人。', '305', '232', '/static/love-5.jpg', '/static/love-5/304.jpg', '/static/love-5/304-1.jpg', '/static/love-5/304-2.jpg');
INSERT INTO `commodity_msg` VALUES ('305', '真爱如初', '高档礼盒装鲜花:雪山玫瑰11枝、深紫色勿忘我0.3扎', '中灰人造纸3张，雪梨纸0.5张，银灰色logo缎带1米，魔力铁山灰盒(小)', '用一袭白裙装扮你那无瑕的身姿，向一抹白云倾诉对你的思念，用一捧鲜花证明我不变的心。', '265', '202', '/static/love-6.jpg', '/static/love-6/305.jpg', '/static/love-6/305-1.jpg', '/static/love-6/305-2.jpg');
INSERT INTO `commodity_msg` VALUES ('306', '爱的小确幸', '戴安娜粉玫瑰21枝，粉色桔梗5枝，石竹梅7枝', '57#魔力铁山灰包装盒', '一个人有一种幸福，爱是最简单的音符，啦啦啦~微小确定的幸福！', '395', '309', '/static/love-7.jpg', '/static/love-7/306.jpg', '/static/love-7/306-1.jpg', '/static/love-7/306-2.jpg');
INSERT INTO `commodity_msg` VALUES ('307', '致青春', '满天星一大扎', '经典米色旧报纸平面纸圆形包装，深咖啡色丝带花结', '我爱你，胜过爱爱情，更胜过爱自己！', '295', '229', '/static/love-8.jpg', '/static/love-8/307.jpg', '/static/love-8/307-1.jpg', '/static/love-8/307-2.jpg');
INSERT INTO `commodity_msg` VALUES ('308', '恋恋情深', '11枝香槟玫瑰，多头白百合2枝，栀子叶8枝', '深浅绿双面人造纸2张，米白色缎带1.5米', '喜欢像是一阵风，而爱你是细水长流', '255', '199', '/static/love-9.jpg', '/static/love-9/308.jpg', '/static/love-9/308-1.jpg', '/static/love-9/308-2.jpg');
INSERT INTO `commodity_msg` VALUES ('309', '甜美公主', '各色玫瑰共36枝：白玫瑰22枝，粉佳人粉玫瑰14枝；粉色桔梗5枝，尤加利0.5扎', '绿色/浅绿色双面人造纸，白咖罗纹带花结', '再多一点点距离，我就能靠近你。清晰甜美的空气里，爱你到不能呼吸。', '485', '369', '/static/love-10.jpg', '/static/love-10/309.jpg', '/static/love-10/309-1.jpg', '/static/love-10/309-2.jpg');
INSERT INTO `commodity_msg` VALUES ('310', '爱的芬芳', '白色郁金香9枝，粉色郁金香9枝，紫色小菊3枝，高山羊齿叶7枝', '蓝色手提花篮，米白色缎带花结', '穿过开满鲜花的山岗，穿过生命散发的芬芳，我会遇见你，在人海茫茫', '395', '308', '/static/love-11.jpg', '/static/love-11/310.jpg', '/static/love-11/310-1.jpg', '/static/love-11/310-2.jpg');
INSERT INTO `commodity_msg` VALUES ('311', '亭亭玉立', '玫红色郁金香19枝，叶上花5枝', '内层白色手揉纸 外层银灰色短平板印花树叶草 草绿色双层缎带花结', '有一位女子，美如郁金香，高贵典雅，亭亭玉立', '358', '279', '/static/love-12.jpg', '/static/love-12/311.jpg', '/static/love-12/311-1.jpg', '/static/love-12/311-2.jpg');
INSERT INTO `commodity_msg` VALUES ('312', '海洋之心', '白玫瑰29枝', '宝蓝色中条纹纸,白色平面纸，米色缎带蝴蝶结', '无际的蓝色大海，轻轻地泛起白色的浪花，这是在诉说心事，带着远离喧嚣城市的亲切、温婉和单纯，就像是亲密恋人之间的耳语。', '379', '296', '/static/love-13.jpg', '/static/love-13/312.jpg', '/static/love-13/312-1.jpg', '/static/love-13/312-2.jpg');
INSERT INTO `commodity_msg` VALUES ('313', '幸福的约定', '苏醒玫瑰33枝、浅紫色紫罗兰1扎（紫罗兰花期为3-6月，其他月份用白色/粉色金鱼草等相似线状花材替代）、银叶菊1扎', '浅紫香芋紫人造纸3张、白蓝细条纹罗文带1.5米', '幸福是一种温暖的陪伴，即使没说出口，也让它蔓延永远', '448', '349', '/static/love-14.jpg', '/static/love-14/313.jpg', '/static/love-14/313-1.jpg', '/static/love-14/313-2.jpg');
INSERT INTO `commodity_msg` VALUES ('314', '永恒的爱情', '红玫瑰99枝，香槟、紫、绿色洋桔梗各5枝，腊梅5枝、叶上花5枝', '长春藤白色压纹纸，灰色不织布，酒红色缎带蝴蝶结', '“世界上万物也许会消亡，永恒的爱情天长地久。”巴基斯坦的民歌《永恒的爱情》，唱出了爱的真谛，也唱出了世界人民共同的心声。', '859', '639', '/static/love-15.jpg', '/static/love-15/314.jpg', '/static/love-15/314-1.jpg', '/static/love-15/314-2.jpg');
INSERT INTO `commodity_msg` VALUES ('400', '母爱', '紫红色康乃馨9枝，粉色多头康乃馨10枝', '白色雪梨纸，香芋紫人造纸，粉色opp雾面纸，白蓝罗纹带花结', '没你疼爱我怎么生活，没你抚养我怎能长大，你给了我青春的年华，自己却满头白发，不负青春年华，是对你最好的报答！', '228', '175', '/static/thanks-1.jpg', '/static/thanks-1/400.jpg', '/static/thanks-1/400-1.jpg', '/static/thanks-1/400-2.jpg');
INSERT INTO `commodity_msg` VALUES ('401', '天使之祈', '高档礼盒装鲜花: 粉色康乃馨19枝，勿忘我0.3扎', '浅灰色素染纸2张，紫色缎带1.2米,魔力铁山灰花盒1个', '健康、平安、幸福，一切尽在不言中，让花儿的香味弥漫四周，带来对于生活最美好的祝福。', '252', '198', '/static/thanks-2.jpg', '/static/thanks-2/401.jpg', '/static/thanks-2/401-1.jpg', '/static/thanks-2/401-2.jpg');
INSERT INTO `commodity_msg` VALUES ('402', '向日葵之歌', '向日葵6枝，黄色勿忘我0.2扎、黄莺10枝', '咖啡色英文报纸,拉菲草花结', '采一束阳光，制成书签，每一天都有温暖入怀。', '242', '189', '/static/thanks-3.jpg', '/static/thanks-3/402.jpg', '/static/thanks-3/402-1.jpg', '/static/thanks-3/402-2.jpg');
INSERT INTO `commodity_msg` VALUES ('403', '爱的思念', '红玫瑰12枝，红色康乃馨12枝，红豆10枝', '有柄花篮一个，墨绿色缎带花结一个', '爱的思念绵延不绝，终于和天在地平线上交汇......有一种很玄的东西叫思念，思念是是甜蜜，夹杂着淡淡苦涩，被人思念，也是一种被爱的幸福。', '251', '196', '/static/thanks-4.jpg', '/static/thanks-4/403.jpg', '/static/thanks-4/403-1.jpg', '/static/thanks-4/403-2.jpg');
INSERT INTO `commodity_msg` VALUES ('404', '留住好时光', '粉绣球1枝，粉雪山玫瑰6枝，粉桔梗0.3扎，栀子叶0.5扎', '长方形手提花篮1个', '让每点阳光，洒于你脸庞；令你的微笑，比花更盛放！', '306', '238', '/static/thanks-5.jpg', '/static/thanks-5/404.jpg', '/static/thanks-5/404-1.jpg', '/static/thanks-5/404-2.jpg');
INSERT INTO `commodity_msg` VALUES ('405', '温馨问候', '香槟玫瑰9枝、多头白百合2枝、粉色康乃馨13枝', '粉色opp雾面纸1张、蓝色条纹纸1张、香槟色丝带1米、魔力铁山灰花盒(大号60#)1个', '母亲节，把你平时羞涩于说出口的我爱你，就在母亲节这天告诉她吧~', '389', '285', '/static/thanks-6.jpg', '/static/thanks-6/405.jpg', '/static/thanks-6/405-1.jpg', '/static/thanks-6/405-2.jpg');
INSERT INTO `commodity_msg` VALUES ('406', '漾恬假期', '7枝白色马蹄莲，10枝红玫瑰，11枝红康乃馨，尤加利10枝，石竹梅2枝', '牛皮纸，深咖啡色条纹纸，拉菲草花结', '忙碌中难得片刻安宁，看水波荡漾，看细水长流，怡然尽享闲暇时光。', '305', '238', '/static/thanks-7.jpg', '/static/thanks-7/406.jpg', '/static/thanks-7/406-1.jpg', '/static/thanks-7/406-2.jpg');
INSERT INTO `commodity_msg` VALUES ('407', '妈妈的爱', '红色康乃馨16枝，香槟色桔梗3枝，叶上花8枝', '内层黄色不织布，外层粉色吊花压纹纸，绿色缎带花结', '妈妈的爱很细腻，妈妈的爱很温暖，妈妈的爱无处不在！', '202', '159', '/static/thanks-8.jpg', '/static/thanks-8/407.jpg', '/static/thanks-8/407-1.jpg', '/static/thanks-8/407-2.jpg');
INSERT INTO `commodity_msg` VALUES ('500', '桃心玻璃罩 永生花 礼盒', '厄瓜多尔玫瑰', '礼盒、礼品袋、贺卡', '为了爱', '235', '176', '/static/immortal-1.jpg', '/static/immortal-1/500.jpg', '/static/immortal-1/500-1.jpg', '/static/immortal-1/500-2.jpg');
INSERT INTO `commodity_msg` VALUES ('501', 'Be My Love', '厄瓜多尔进口红色永生玫瑰（直径6-7cm）2枝，进口白色永生玫瑰（直径5-6cm)1枝，棉花2朵，进口粉色珍珠5颗，红色小果子2枝，桂皮、秋色绿绣球、松枝、小叶尤加利叶永生花适量', '玻璃罩 蓝色定制礼盒', '比喜欢更深的是爱，比爱更重要的，是你。', '598', '398', '/static/immortal-2.jpg', '/static/immortal-2/501.jpg', '/static/immortal-2/501-1.jpg', '/static/immortal-2/501-2.jpg');
INSERT INTO `commodity_msg` VALUES ('502', '看得到的美好', '进口哥伦比亚粉玫瑰，安第斯粉/香槟绣球，皮革蕨叶桉树，兔尾草，凌风草', '礼盒', '以花为媒，感受生活最美好的模样', '499', '399', '/static/immortal-3.jpg', '/static/immortal-3/502.jpg', '/static/immortal-3/502-1.jpg', '/static/immortal-3/502-2.jpg');
INSERT INTO `commodity_msg` VALUES ('503', '一生一世', '厄瓜多尔进口永生红玫1朵(直径6-7CM)，搭配双色永生绣球，白色小星花（所有材料均为永生花花材，可存放2～3年）', '心形玻璃罩+礼盒', '弱水三千只取一瓢饮，一生一世只爱你一人。', '259', '198', '/static/immortal-4.jpg', '/static/immortal-4/503.jpg', '/static/immortal-4/503-1.jpg', '/static/immortal-4/503-2.jpg');
INSERT INTO `commodity_msg` VALUES ('504', '一路有你', '精选绽放优美的玫瑰5枝，配叶适量，在采摘后一个小时内用荷兰最新专利工艺处理，完整保留鲜花色泽和形态，经泰国花艺师精妙构思与巧手装扮，封入精美玻璃花瓶，保证产品使用寿命5年以上。', '精美花瓶,纸盒外包装,附送精美留言贺卡。', '不凋谢的鲜花，寓意：情感美丽永恒。', '569', '338', '/static/immortal-5.jpg', '/static/immortal-5/504.jpg', '/static/immortal-5/504-1.jpg', '/static/immortal-5/504-2.jpg');
INSERT INTO `commodity_msg` VALUES ('505', '海洋之恋', '进口蓝色永生玫瑰5朵（直径6-7cm），进口白玫瑰5朵（直径4-5cm),浅蓝色奥斯丁4朵，搭配进口白色蓝色绣球、海星、海螺', '玻璃罩 蓝色定制礼盒', '爱上了你，身边的世界骤然变得寂静了，就像蓝色海洋时而静谧，时而又汹涌澎湃，就像我们的爱情，这就是你带给我的一场蓝色风暴。', '1399', '999', '/static/immortal-6.jpg', '/static/immortal-6/505.jpg', '/static/immortal-6/505-1.jpg', '/static/immortal-6/505-2.jpg');
INSERT INTO `commodity_msg` VALUES ('506', '永生花 玻璃罩 礼盒', '厄瓜多尔玫瑰', '礼盒、礼品袋、贺卡', '为了爱', '399', '338', '/static/immortal-7.jpg', '/static/immortal-7/506.jpg', '/static/immortal-7/506-1.jpg', '/static/immortal-7/506-2.jpg');
INSERT INTO `commodity_msg` VALUES ('507', '十二星座红色永生玫瑰', 'FlowerSong巨型玫瑰系列：厄瓜多尔进口巨型玫瑰（直径9-10CM）', '专属定制高档礼盒', '把对你的爱，种在我最柔软的心房，和风细雨催她发芽生长，温暖阳光伴她昂扬向上。', '328', '268', '/static/immortal-8.jpg', '/static/immortal-8/507.jpg', '/static/immortal-8/507-1.jpg', '/static/immortal-8/507-2.jpg');
INSERT INTO `commodity_msg` VALUES ('600', '十全十美', '蝴蝶兰- 室内盆栽（10株红色一品蝴蝶兰）', '白色陶瓷花盆', '被誉为“洋兰王后”的蝴蝶兰，越来越受到花迷们的青睐', '999', '899', '/static/green-1.jpg', '/static/green/600.jpg', '/static/green/600.jpg', '/static/green/600.jpg');
INSERT INTO `commodity_msg` VALUES ('601', '纯洁天使', '蝴蝶兰- 室内盆栽（5株白色一品蝴蝶兰）', '白色陶瓷花盆', '被誉为“洋兰王后”的蝴蝶兰，越来越受到花迷们的青睐', '560', '498', '/static/green-2.jpg', '/static/green/601.jpg', '/static/green/601.jpg', '/static/green/601.jpg');
INSERT INTO `commodity_msg` VALUES ('602', '蝴蝶兰5株', '蝴蝶兰- 室内盆栽(紫蝴蝶兰3株、浅粉蝴蝶兰2株)', '长木盒（或精致瓷盆）装，高度0.5米左右', '开幕喜庆好吉兆；蝴蝶盆栽搬进家，富贵喜庆一起来。', '538', '498', '/static/green-3.jpg', '/static/green/602.jpg', '/static/green/602.jpg', '/static/green/602.jpg');
INSERT INTO `commodity_msg` VALUES ('603', '蝴蝶兰7株', '盆栽：蝴蝶兰7株- 室内盆栽(蝴蝶兰7株)', '瓷盆装，高度0.7-0.8米左右', '开幕誌庆、居家摆饰、office . 绿化空间 大方实惠．视\r\n觉享受 .', '698', '658', '/static/green-4.jpg', '/static/green/603.jpg', '/static/green/603.jpg', '/static/green/603.jpg');
INSERT INTO `commodity_msg` VALUES ('604', '万年青', '多头斑马万年青', '白色瓷盆，0.4米左右', '办公室', '150', '135', '/static/green-5.jpg', '/static/green/604.jpg', '/static/green/604.jpg', '/static/green/604.jpg');
INSERT INTO `commodity_msg` VALUES ('605', '大绿萝', '大绿萝', '陶瓷花盆，高1.5米', '大绿萝：性耐旱、耐阴，也耐强光，为驰名之室内盆栽植物', '298', '258', '/static/green-6.jpg', '/static/green/605.jpg', '/static/green/605.jpg', '/static/green/605.jpg');
INSERT INTO `commodity_msg` VALUES ('606', '万事顺意', '盆栽：大花惠兰（红色，4-5箭）', '瓷盆装，约1.2米', '大花蕙兰，欧美称之“新美娘兰”，其花大，花形规整丰满，色泽鲜艳，花茎直立，花朵多，花色品种丰富，花期长（三个月以上），不怕寒冷，栽培容易，生长健壮。是深受各国人民喜爱的一种洋兰。', '598', '568', '/static/green-7.jpg', '/static/green/606.jpg', '/static/green/606.jpg', '/static/green/606.jpg');
INSERT INTO `commodity_msg` VALUES ('607', '花开富贵', '盆栽两株粉红色仙客来加精美包装', '盆栽', '适用于家庭，办公环境的装饰，用来美化环境，净化空气\r\n等起到良好的作用', '380', '358', '/static/green-8.jpg', '/static/green/607.jpg', '/static/green/607.jpg', '/static/green/607.jpg');
INSERT INTO `commodity_msg` VALUES ('700', '开业庆典', '红掌5枝，红玫瑰20枝，粉玫瑰20枝，粉、白香水百合共1\r\n1朵，黄色太阳花(或黄菊花)20枝，各色康乃馨28枝，洋\r\n兰、剑兰、小鸟若干，散尾叶，黄莺、绿叶间插', '1.8米高三层花篮一个', '以红色为喜庆主调，寓意红红火，兴旺发达', '692', '619', '/static/other-1.jpg', '/static/other/700.jpg', '/static/other/700.jpg', '/static/other/700.jpg');

-- ----------------------------
-- Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `orderId` varchar(14) NOT NULL DEFAULT '' COMMENT '订单号（时间戳）',
  `dealId` varchar(17) NOT NULL DEFAULT '' COMMENT '交易号（时间戳+商品信息）',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `name` varchar(255) NOT NULL COMMENT '收件人',
  `telephone` varchar(11) NOT NULL COMMENT '手机号',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `id` varchar(11) NOT NULL COMMENT '商品id',
  `number` int(11) NOT NULL COMMENT '数量',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '生成时间',
  PRIMARY KEY (`orderId`,`dealId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('20201202231324', '20201202231324400', '坂田银时', 'wjh1', '18111111111', '{\"addressCode\":[\"110000\",\"110100\",\"110101\"],\"addressDetail\":\"1\"}', '400', '1', '2020-12-02 23:13:24');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(45) NOT NULL COMMENT '用户名（相当于id）',
  `aliase` varchar(45) DEFAULT NULL COMMENT '别名',
  `password` varchar(45) NOT NULL COMMENT '登录密码',
  `paycode` int(6) NOT NULL COMMENT '支付密码 6位',
  `nickname` varchar(255) DEFAULT NULL COMMENT '真实姓名',
  `telephone` varchar(11) NOT NULL COMMENT '电话号码',
  `address` varchar(1000) DEFAULT '[]' COMMENT '收件地址',
  `registerTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `updateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('坂田银时', '小银啊', 'wjh1997', '123456', '啊哈哈', '18135183472', '[{\"name\":\"wjh1\",\"telephone\":\"18111111111\",\"addressCode\":[\"110000\",\"110100\",\"110101\"],\"addressDetail\":\"1\",\"isMain\":true,\"addressLabel\":[\"北京市\",\"市辖区\",\"东城区\"]},{\"name\":\"wjh2\",\"telephone\":\"18122222222\",\"addressCode\":[\"120000\",\"120100\",\"120101\"],\"addressDetail\":\"22222222222\",\"isMain\":false},{\"name\":\"wjh3\",\"telephone\":\"18133333333\",\"addressCode\":[\"130000\",\"130300\",\"130303\"],\"addressDetail\":\"33\",\"isMain\":false},{\"name\":\"wjh4\",\"telephone\":\"18144444444\",\"addressCode\":[\"140000\",\"140400\",\"140421\"],\"addressDetail\":\"44444444\",\"isMain\":false}]', '2020-08-23 18:54:30', '2020-10-05 19:57:27');
