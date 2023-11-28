const mysql = require("mysql")

const config = {
	 // 主机
	host: 'localhost',
	// 端口
	port: 3306,
	// 用户名
	user: 'root',
	// 密码
	password: 'wyq123456',
	// 数据库名
	database: 'diymusic',
	// 连接池允许创建的最大连接数，默认值为10
	connectionLimit: 50,
	// 允许挂起的最大连接数,默认值为0,代表挂起的连接数无限制
	queueLimit: 0
}

const pool = mysql.createPool(config)


module.exports = pool