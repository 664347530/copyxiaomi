var db=require('../database/sql.js')

// 查看部分商品数据
function showproduct(req, callback) {
    var sql = 'select * from surface order by rand() limit 8'
    db.DBModule(sql, [], (err, results) => {
        if (err) {
            return callback(101, '出现错误', +err, null);
        }
        callback(200, '', results)
    })
}
// 根据类别筛选商品
function classfiyproduct(req,callback){
	var type=req.body.type;
	var sql='select * from surface where type_product=? and state_product="在售"';
	db.DBModule(sql,[type],(err,results)=>{
		if (err) {
		    return callback(101, '出现错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 查看历史搜索记录
function selectsearch(req,callback){
	var sql='select * from search_history';
	db.DBModule(sql,[],(err,results)=>{
		if (err) {
		    return callback(101, '出现错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 清空搜索记录
function cleanhistory(req,callback){
	var sql='delete from search_history';
	db.DBModule(sql,[],(err,results)=>{
		if (err) {
		    return callback(101, '出现错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 查看所点击的内容详情
function seedetail(req,callback){
	var product_id=req.body.product_id;
	var sql='select * from surface where proudct_id=?'
	db.DBModule(sql,[product_id],(err,results)=>{
		if (err) {
		    return callback(101, '出现错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 选择商品详细信息--颜色
function selectgoodcolor(req,callback){
	var p_name=req.body.p_name;
	var sql='select * from p_detail where p_name=?';
	db.DBModule(sql,[p_name],(err,results)=>{
		if (err) {
		    return callback(101, '出现错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 选择商品详细信息--内存
function selectgoodneicun(req,callback){
	var p_name=req.body.p_name;
	var sql='select * from product_neicun where p_name=?';
	db.DBModule(sql,[p_name],(err,results)=>{
		if (err) {
		    return callback(101, '出现错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 显示搜索内容
function searchgood(req,callback){
    var name=req.body.name;
    if (!name) {
        return callback(400, '搜索关键字为空', null);
    }
    var sql=`select * from surface where name_product like '%${name}%'`;
    db.DBModule(sql,[],(err,results)=>{
        if(err){
            return callback(101,'查询失败',+err,null)
        }
        callback(200,'查询成功',results)
    })
}
// 记录搜索内容的关键字
function recordkeywod(req, callback) {
    var search_name = req.body.search_name;
    var checkSql = 'SELECT COUNT(*) AS count FROM search_history WHERE search_name = ?';
    db.DBModule(checkSql, [search_name], (err, results) => {
        if (err) {
            return callback(101, '查询失败', +err, null);
        }
        if (results[0].count > 0) {
            // 如果已有相同记录，则不执行插入
            return callback(200, '记录已存在', null);
        } else {
            // 如果没有相同记录，执行插入操作
            var sql = 'INSERT INTO search_history(search_id, search_name) VALUES(DEFAULT, ?)';
            db.DBModule(sql, [search_name], (err, results) => {
                if (err) {
                    return callback(101, '插入失败', +err, null);
                }
                callback(200, '插入成功', results);
            });
        }
    });
}
// 商品加入购物车
function addshopcar(req, callback) {
  var user_id = req.body.user_id;
  var select = req.body.select;

  // 添加日志输出，检查 'select' 对象是否传递正确
  console.log("Received select data:", select);
  
  if (!select) {
    return callback(101, 'Missing select data', null);
  }
  
  var total = select.product_price * select.product_num; // 总价需要根据数量来计算
  console.log("Total price:", total);

  // 检查数据库中是否已存在相同的 user_id, p_id, product_nei, product_color
  var checksql = 'SELECT * FROM user_shopcar WHERE user_id=? AND p_id=? AND product_nei=? AND product_color=?';
  db.DBModule(checksql, [user_id, select.p_id, select.product_nei, select.product_color], (checkerr, checkResults) => {
    if (checkerr) {
      return callback(101, '出现错误1: ' + checkerr, null);
    }
    if (checkResults.length > 0) {
      // 产品已经在购物车中，更新数量和总价
      var newNum = checkResults[0].product_num + select.product_num; // 新的数量
      var newTotal = newNum * select.product_price; // 更新总价
      var updateSql = "UPDATE user_shopcar SET product_num = ?, total = ? WHERE p_id = ? AND user_id = ? AND product_nei = ? AND product_color = ?";
      db.DBModule(updateSql, [newNum, newTotal, select.p_id, user_id, select.product_nei, select.product_color], (updateErr, updateResults) => {
        if (updateErr) {
          return callback(101, '出现错误2: ' + updateErr, null);
        }
        callback(200, '', updateResults);
      });
    } else {
      // 产品不在购物车中，插入新行
      var insertSql = "INSERT INTO user_shopcar (p_id, user_id, product_img, product_name, product_nei, product_color, product_price, product_num, total, state_product) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
      db.DBModule(insertSql, [select.p_id, user_id, select.product_img, select.product_name, select.product_nei, select.product_color, select.product_price, select.product_num, total], (insertErr, insertResults) => {
        if (insertErr) {
          return callback(101, '出现错误3: ' + insertErr, null);
        }
        callback(200, '', insertResults[0]);
      });
    }
  });
}
// 渲染购物车
function showshopcar(req,callback){
	var user_id=req.body.user_id;
	var sql='select * from user_shopcar where user_id=?';
	db.DBModule(sql,[user_id],(err,results)=>{
		if (err) {
		    return callback(101, '出现错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 更新购物车商品数量
function updatenum(req,callback){
	var user_id=req.body.user_id;
	var product=req.body.product;
	var total=req.body.product_total;
	var sql='update user_shopcar set product_num=?,total=? where p_id=? and product_color=? and product_nei=? and user_id=?';
	db.DBModule(sql,[product.product_num,total,product.p_id,product.product_color,product.product_nei,user_id],(err,results)=>{
		if (err) {
		    return callback(101, '更新错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 更新商品是否选中
function updatastate(req,callback){
	var user_id=req.body.user_id;
	var product=req.body.checkgoods;
	var state_num=req.body.state_num;
	var sql='update user_shopcar set state_product=? where p_id=? and product_color=? and product_nei=? and user_id=?';
	db.DBModule(sql,[state_num,product.p_id,product.product_color,product.product_nei,user_id],(err,results)=>{
		if (err) {
		    return callback(101, '更新错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 删除购物车中商品
function deleteproduct(req,callback){
	var user_id=req.body.user_id;
	var product=req.body.checkgoods;
	var sql='delete from user_shopcar where user_id=? and p_id=? and product_color=? and product_nei=?';
	db.DBModule(sql,[user_id,product.p_id,product.product_color,product.product_nei],(err,results)=>{
		if (err) {
		    return callback(101, '更新错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 展示所选商品订单
function showselectproduct(req,callback){
	var user_id=req.body.user_id;
	var sql='select * from user_shopcar where user_id=? and state_product=1';
	db.DBModule(sql,[user_id],(err,results)=>{
		if (err) {
		    return callback(101, '更新错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 添加地址
function newaddress(req, callback) {
  const {
    user_id,
    address_name,
    address_phone,
    address_main,
    address_detail,
    address_default,
  } = req.body;
  // 检查是否与数据库中已有的数据完全一致
  const checkSql = `
    SELECT * FROM address WHERE user_id = ? AND address_name = ? AND address_phone = ? AND address_main = ? AND address_detail = ? AND address_default = ?;`;
  db.DBModule(checkSql, [user_id, address_name, address_phone, address_main, address_detail, address_default], (err, results) => {
    if (err) {
      return callback(101, '查询错误: ' + err.message, null);
    }
    // 如果存在完全相同的数据，则不插入
    if (results.length > 0) {
      return callback(200, '数据已存在，无需重复插入', null);
    }
    // 如果 address_default 为 1，需要将其他地址的 address_default 改为 0
    if (address_default === 1) {
      const updateSql = `
        UPDATE address 
        SET address_default = 0 
        WHERE user_id = ? AND address_default = 1;
      `;
      db.DBModule(updateSql, [user_id], (err, updateResults) => {
        if (err) {
          return callback(101, '更新默认地址错误: ' + err.message, null);
        }
        // 插入新地址
        const insertSql = `
          INSERT INTO address (user_id, address_name, address_phone, address_main, address_detail, address_default) 
          VALUES (?, ?, ?, ?, ?, ?);
        `;
        db.DBModule(insertSql, [user_id, address_name, address_phone, address_main, address_detail, address_default], (err, insertResults) => {
          if (err) {
            return callback(101, '插入错误: ' + err.message, null);
          }
          callback(200, '插入成功', insertResults);
        });
      });
    } else {
      // 如果 address_default 不为 1，直接插入
      const insertSql = `
        INSERT INTO address (user_id, address_name, address_phone, address_main, address_detail, address_default) 
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      db.DBModule(insertSql, [user_id, address_name, address_phone, address_main, address_detail, address_default], (err, insertResults) => {
        if (err) {
          return callback(101, '插入错误: ' + err.message, null);
        }
        callback(200, '插入成功', insertResults);
      });
    }
  });
}
// 更新预留地址
function updateaddress(req,callback){
	const {address_id,user_id,address_name,address_phone,address_main,address_detail,address_default,} = req.body;
	// 如果 address_default 为 1，需要将其他地址的 address_default 改为 0
	if (address_default === 1) {
	  const updateSql = `
	    UPDATE address 
	    SET address_default = 0 
	    WHERE user_id = ? AND address_default = 1;
	  `;
	  db.DBModule(updateSql, [user_id], (err, updateResults) => {
	    if (err) {
	      return callback(101, '更新默认地址错误: ' + err.message, null);
	    }
	    // 插入新地址
	    var sql='update address set address_name=?,address_phone=?,address_main=?,address_detail=?,address_default=? where address_id=?';
	    db.DBModule(sql,[address_name, address_phone, address_main, address_detail, address_default,address_id],(err,results)=>{
			if (err) {
			    return callback(101, '更新错误', +err, null);
			}
			callback(200, '', results)
		})
	  });
	} else {
	  // 如果 address_default 不为 1，直接插入
		var sql='update address set address_name=?,address_phone=?,address_main=?,address_detail=?,address_default=? where address_id=?';
		db.DBModule(sql,[address_name, address_phone, address_main, address_detail, address_default,address_id],(err,results)=>{
			if (err) {
				return callback(101, '更新错误', +err, null);
			}
			callback(200, '', results)
		})
	}
}
// 查看用户预留地址
function lookaddress(req,callback){
	var user_id=req.body.user_id;
	var sql='select * from address where user_id=?';
	db.DBModule(sql,[user_id],(err,results)=>{
		if (err) {
		    return callback(101, '更新错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 删除地址
function deleteaddress(req,callback){
	var address_id=req.body.address_id;
	var sql='delete from address where address_id=?';
	db.DBModule(sql,[address_id],(err,results)=>{
		if (err) {
		    return callback(101, '更新错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 生成订单
function createorder(req, callback) {
    var user_id = req.body.user_id;
    var address = req.body.address;
    var goods = req.body.goods;
    // 使用 Promise.all 处理所有商品的插入操作
    let promises = goods.map(good => {
        return new Promise((resolve, reject) => {
            var sql = `insert into \`orders\`(user_id, address_name, address_phone, address_main, address_detail, total, product_color, product_img, product_name, product_nei, product_num, product_price, time) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`;
            var values = [
                user_id,
                address.address_name,
                address.address_phone,
                address.address_main,
                address.address_detail,
                good.total, // 每个商品的总价
                good.product_color,
                good.product_img,
                good.product_name,
                good.product_nei,
                good.product_num,
                good.product_price
            ];
            db.DBModule(sql, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    });
    // 所有商品插入完成后，调用 callback
    Promise.all(promises)
        .then(results => {
            callback(200, '', results);
        })
        .catch(err => {
            callback(101, '更新错误', err, null);
        });
}
// 渲染订单页面
function showorders(req,callback){
	var user_id=req.body.user_id;
	var sql='select * from orders where user_id=?';
	db.DBModule(sql,[user_id],(err,results)=>{
		if (err) {
		    return callback(101, '更新错误', +err, null);
		}
		callback(200, '', results)
	})
}
// 删除点击订单
function deleteorder(req,callback){
	var user_id=req.body.user_id;
	var order_id=req.body.order_id;
	var sql='delete  from orders where user_id=? and order_id=?'
	db.DBModule(sql,[user_id,order_id],(err,results)=>{
		if (err) {
		    return callback(101, '删除失败', +err, null);
		}
		callback(200, '', results)
	})
}
// 生成订单删除购物车中对应的
function deleteshopcar(req,callback){
	var user_id=req.body.user_id;
	var goods = req.body.goods;
	// 使用 Promise.all 处理所有商品的插入操作
	let promises = goods.map(good => {
	    return new Promise((resolve, reject) => {
	        var sql = `delete  from user_shopcar where user_id=? and xin=?`;
	        var values = [user_id,good.xin];
	        db.DBModule(sql, values, (err, results) => {
	            if (err) {
	                return reject(err);
	            }
	            resolve(results);
	        });
	    });
	});
	// 所有商品插入完成后，调用 callback
	Promise.all(promises)
	    .then(results => {
	        callback(200, '', results);
	    })
	    .catch(err => {
	        callback(101, '更新错误', err, null);
	    });
}
module.exports = {
	showproduct,
	classfiyproduct,
	selectsearch,
	cleanhistory,
	seedetail,
	selectgoodcolor,
	selectgoodneicun,
	searchgood,
	recordkeywod,
	addshopcar,
	showshopcar,
	updatenum,
	updatastate,
	deleteproduct,
	showselectproduct,
	newaddress,
	lookaddress,
	updateaddress,
	deleteaddress,
	createorder,
	showorders,
	deleteorder,
	deleteshopcar
}