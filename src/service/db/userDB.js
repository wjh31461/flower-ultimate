let pool = require('./pool')

// 查找phone
let findPhone = (telephone, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('select * from user where telephone=?', [telephone], (err, results, fields) => {
				if (!err) {
					handle(err, results)
				} else {
					handle(err)
				}
			})
			connection.release()
		}
	})
}

// 查找用户名
let findUsername = (username, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('select * from user where username=?', [username], (err, results, fields) => {
				if (!err) {
					handle(err, results)
				} else {
					handle(err)
				}
			})
			connection.release()
		}
	})
}

// 查找user
let findUser = (username, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('select * from user where username=?', [username], (err, results, fields) => {
				if (!err) {
					handle(results)
				}
			})
			connection.release()
		}
	})
}

// 删除user
/*let deleteUser=(username,handle) => {
	pool.getConnection((err,connection) => {
		if (!err) {
			connection.query('delete from user where username=?',[username],(err, results, fields) => {
				if (!err) {
					handle(results)
				}
			})
			connection.release()
		}
	})
}*/

// 更新user
let updateUser = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			if (obj.password) {
				connection.query(
					'update user set aliase = ?, password = ?, nickname = ?, telephone = ?, address = ? where username = ?',
					[obj.aliase, obj.password, obj.nickname, obj.telephone, obj.address, obj.username],
					(err, results, fields) => {
					if (!err) {
						handle(err, results)
					}
				})
			} else {
				connection.query(
					'update user set aliase = ?, nickname = ?, telephone = ?, address = ? where username = ?',
					[obj.aliase, obj.nickname, obj.telephone, obj.address, obj.username],
					(err, results, fields) => {
					if (!err) {
						handle(err, results)
					}
				})
			}
			connection.release()
		}
	})
}

// 添加user
let insertUser = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('insert into user(username, aliase, password, paycode, nickname, telephone) value(?,?,?,?,?,?)', [obj.username, obj.aliase, obj.password, obj.paycode, obj.nickname, obj.telephone], (err, results, fields) => {
				if (!err) {
					handle(err,results)
				}
			})
			connection.release()
		}
	})
}

module.exports = {
	findPhone,
	findUsername,
	findUser,
	// deleteUser,
	updateUser,
	insertUser
}