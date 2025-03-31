var connectpool={
    host:'127.0.0.1', //服务器地址
    port:'3308',
    user:'root',
    password:'123456',
    database:'xiaomishop',
    multipleStatments:true //表示是否允许执行多条 SQL 语句
}
module.exports={
    host:'127.0.0.1',
    port:3000,
    connectpool:connectpool
}