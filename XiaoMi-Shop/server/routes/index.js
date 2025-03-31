var express = require('express');
var router = express.Router();
var productcontrol=require('../control/productcontrol.js')
var usercontrol=require('../control/usercontrol.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 查看部分商品信息
router.get('/api/showproduct',function(req,res,next){
	productcontrol.showproduct(req,(code,msg,data)=>{
		res.send({ code, msg, data });
	})
})
// 根据类别筛选商品
router.post('/api/classfiyproduct',function(req,res,next){
	productcontrol.classfiyproduct(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 查看搜索历史
router.post('/api/selectsearch',function(req,res,next){
	productcontrol.selectsearch(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 清空搜索历史
router.post('/api/cleanhistory',function(req,res,next){
	productcontrol.cleanhistory(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 查看所点击的内容详情
router.post('/api/seedetail',function(req,res,next){
	productcontrol.seedetail(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 选择商品详细信息--颜色
router.post('/api/selectgoodcolor',function(req,res,next){
	productcontrol.selectgoodcolor(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 选择商品详细信息--内存
router.post('/api/selectgoodneicun',function(req,res,next){
	productcontrol.selectgoodneicun(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 显示搜索内容
router.post('/api/searchgood',function(req,res,next){
	productcontrol.searchgood(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 记录搜索内容的关键字
router.post('/api/recordkeywod',function(req,res,next){
	productcontrol.recordkeywod(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 注册用户
router.post('/api/register',function(req,res,next){
	usercontrol.register(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 登录账号
router.post('/api/userlogin',function(req,res,next){
	usercontrol.userlogin(req,(code,msg,data)=>{
		res.send({code,msg,data});
	})
})
// 查看用户信息
router.post('/api/lookuser',function(req,res,next){
	usercontrol.lookuser(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 修改账号用户名
router.post('/api/updatename',function(req,res,next){
	usercontrol.updateusername(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 填写用户性别
router.post('/api/updatesex',function(req,res,next){
	usercontrol.updatesex(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 商品加入购物车
router.post('/api/addshopcar',function(req,res,next){
	productcontrol.addshopcar(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 渲染购物车
router.post('/api/showshopcar',function(req,res,next){
	productcontrol.showshopcar(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 更新购物车商品数量
router.post('/api/updatenum',function(req,res,next){
	productcontrol.updatenum(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 更新商品是否选中
router.post('/api/updatastate',function(req,res,next){
	productcontrol.updatastate(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 删除购物车中商品
router.post('/api/deleteproduct',function(req,res,next){
	productcontrol.deleteproduct(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 展示所选商品订单
router.post('/api/showselectproduct',function(req,res,next){
	productcontrol.showselectproduct(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 添加地址
router.post('/api/newaddress',function(req,res,next){
	productcontrol.newaddress(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 查看用户预留地址
router.post('/api/lookaddress',function(req,res,next){
	productcontrol.lookaddress(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 更新预留地址
router.post('/api/updateaddress',function(req,res,next){
	productcontrol.updateaddress(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 删除预留地址
router.post('/api/deleteaddress',function(req,res,next){
	productcontrol.deleteaddress(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 生成订单
router.post('/api/createorder',function(req,res,next){
	productcontrol.createorder(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 渲染订单
router.post('/api/showorders',function(req,res,next){
	productcontrol.showorders(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 删除点击的订单
router.post('/api/deleteorder',function(req,res,next){
	productcontrol.deleteorder(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
// 生成订单删除购物车中对应的
router.post('/api/deleteshopcar',function(req,res,next){
	productcontrol.deleteshopcar(req,(code,msg,data)=>{
		res.send({code,msg,data})
	})
})
module.exports = router;
