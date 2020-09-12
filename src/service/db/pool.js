// 生成连接池对象
const mysql = require('mysql')

let pool = mysql.createPool({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'flower'
})

module.exports = pool