let pool = require('./pool')

// 查订单
let findOrderByUsername = (username, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('select * from `order` where username=?', [username], (err, results, fields) => {
				if (!err) {
					handle(results)
				}
			})
			connection.release()
		}
	})
}

// 删订单
let deleteOrder = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('delete from `order` where username=? and id=?', [obj.username, obj.id], (err, results, fields) => {
				if (!err) {
					handle(results)
				}
			})
			connection.release()
		}
	})
}

// 新增订单
let insertOrder = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('insert into `order`(username,nickname,telephone,address,id,number) VALUES(?,?,?,?,?,?)', [obj.username, obj.nickname, obj.telephone, obj.address, obj.id, obj.number], (err, results, fields) => {
				if (!err) {
					handle(err,results)
				}
			})
			connection.release()
		}
	})
}

module.exports = {
	findOrderByUsername,
	deleteOrder,
	insertOrder
}