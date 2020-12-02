let pool = require('./pool')

// 查订单
let findOrderByUsername = (username, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('select * from `order` where username = ?', [username], (err, results, fields) => {
				if (!err) {
					handle(err, results)
				} else {
					handle(err, results)
				}
			})
			connection.release()
		} else {
			handle(err)
		}
	})
}

// 删订单
let deleteOrder = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('delete from `order` where orderId = ? and dealId = ?', [obj.orderId, obj.dealId], (err, results, fields) => {
				if (!err) {
					handle(err, results)
				} else {
					handle(err)
				}
			})
			connection.release()
		} else {
			handle(err)
		}
	})
}

// 新增订单
let insertOrder = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('insert into `order`(orderId, dealId, username, name, telephone, address, id, number) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [obj.orderId, obj.dealId, obj.username, obj.name, obj.telephone, obj.address, obj.id, obj.number], (err, results, fields) => {
				if (!err) {
					handle(err, results)
				} else {
					handle(err, results)
				}
			})
			connection.release()
		} else {
			handle(err)
		}
	})
}

module.exports = {
	findOrderByUsername,
	deleteOrder,
	insertOrder
}