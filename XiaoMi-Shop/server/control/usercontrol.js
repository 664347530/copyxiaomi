var db=require('../database/sql.js')
const jwt = require('jsonwebtoken');


function generateXiaomiId() {
    return Math.floor(100000000 + Math.random() * 900000000).toString(); // 生成9位随机数
}
// 注册用户
function register(req, callback) {
    const phone = req.body.phone;
    const password = req.body.password;

    if (!phone || !password) {
        return callback(400, '手机号和密码不能为空', null);
    }

    const checksql = 'SELECT COUNT(*) as count FROM user_count WHERE user_phone = ?';
    db.DBModule(checksql, [phone], (err, results) => {
        if (err) {
            console.log("查询错误:", err);
            return callback(101, '查询失败', null);
        }
        if (results[0].count > 0) {
            return callback(201, '手机号已被注册', null);
        } else {
            const xiaomiid = generateXiaomiId(); // 生成xiaomiid

            // 查询xiaomiid是否存在
            const checkXiaomiIdSql = 'SELECT COUNT(*) as count FROM user_count WHERE xiaomiid = ?';
            db.DBModule(checkXiaomiIdSql, [xiaomiid], (err, xiaomiidResults) => {
                if (err) {
                    console.log("检查xiaomiid错误:", err);
                    return callback(101, '检查xiaomiid失败', null);
                }

                if (xiaomiidResults[0].count > 0) {
                    // 如果xiaomiid已经存在，重新生成一个，重新执行 register 函数，生成一个新的 xiaomiid 并重新进行检查
                    return register(req, callback);
                } else {
                    const insertsql = 'INSERT INTO user_count(user_phone, user_password, xiaomiid) VALUES (?, ?, ?)';
                    db.DBModule(insertsql, [phone, password, xiaomiid], (err, insertresult) => {
                        if (err) {
                            console.log("注册失败:", err);
                            return callback(102, '注册失败', null);
                        }
                        const userId = insertresult.insertId; // 修正 insertId 变量名
                        const token = jwt.sign({ user_id: userId, phone: phone }, 'your-secret-key', { expiresIn: '1h' });

                        // 存储 token
                        const updateTokenSql = 'UPDATE user_count SET user_token=? WHERE user_id=?';
                        db.DBModule(updateTokenSql, [token, userId], (err, updateresult) => {
                            if (err) {
                                console.log("Token 保存失败:", err);
                                return callback(103, 'token保存失败', null);
                            }
                            return callback(200, '注册成功', { token: token, userId: userId });
                        });
                    });
                }
            });
        }
    });
}


// 登录账号
function userlogin(req,callback){
	var phone=req.body.user;
	var password=req.body.password;
	var sql='select * from user_count where user_phone=? and user_password=?';
	db.DBModule(sql,[phone,password],(err,results)=>{
		if(err){
			return callback(101,'登录失败',null)
		}
		if (results.length == 0) {
		    return callback(301, '密码错误或账号异常', null);
		}
		return callback(200,'登录成功',results)
	})
}
// 查看用户信息
function lookuser(req,callback){
	var user_id=req.body.user_id;
	var sql='select * from user_count where user_id=?';
	db.DBModule(sql,[user_id],(err,results)=>{
		if(err){
			return callback(101,'查询失败',null)
		}
		return callback(200,'查询成功',results)
	})
}
// 修改账号用户名
function updateusername(req,callback){
	var newname=req.body.newname;
	var user_id=req.body.user_id;
	var sql='UPDATE user_count SET user_name=? WHERE user_id=?';
	db.DBModule(sql,[newname,user_id],(err,results)=>{
		if(err){
			return callback(101,'更新失败',null)
		}
		return callback(200,'更新成功',results)
	})
}
// 填写用户性别
function updatesex(req,callback){
	var user_id=req.body.user_id;
	var sex=req.body.user_sex;
	var sql='UPDATE user_count SET user_sex=? WHERE user_id=?';
	db.DBModule(sql,[sex,user_id],(err,results)=>{
		if(err){
			return callback(101,'更新失败',null)
		}
		return callback(200,'更新成功',results)
	})
}
module.exports = {
	register,
	userlogin,
	lookuser,
	updateusername,
	updatesex,
}