var mysql = require('mysql');
var config = require('../config.js');

var pool = mysql.createPool(config.connectpool);
module.exports.DBModule = (sql, value, callback) => {
    pool.getConnection((err, con) => {
        if (err) {
            return callback(err, null);  // 返回详细的连接池错误
        }
        try {
            con.query(sql, value, (erro, results) => {
                if (erro) {
                    return callback(erro, null);  // 返回查询错误
                }
                callback(null, results);  // 查询成功，返回结果
            });
        } finally {
            con.release();  // 确保连接释放
        }
    });
};
