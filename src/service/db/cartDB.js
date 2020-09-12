let pool = require('./pool')

// 查购物车
let findCartByUsername = (username, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('select * from cart where username=?', [username], (err, results, fields) => {
				if (!err) {
					handle(results)
				}
			})
			connection.release()
		}
	})
}

// 判断购物车内是否有该物品存在
let judgeCart = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('select count(*) count from cart where username=? and id=?', [obj.username, obj.id], (err, results, fields) => {
				if (!err) {
					handle(err,results)
				}
			})
			connection.release()
		}
	})
}

// (新)加入购物车
let insertCart = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('insert into cart values(?,?,?)', [obj.username, obj.id, obj.number], (err, results, fields) => {
				if (!err) {
					handle(err,results)
				}
			})
			connection.release()
		}
	})
}

// 添加购物车
let updateCart = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('update cart set number=number+? where username=? and id=?', [obj.number, obj.username, obj.id], (err, results, fields) => {
				if (!err) {
					handle(err,results)
				}
			})
			connection.release()
		}
	})
}

// 购物车number+1
let addCartNumber = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			console.log(obj)
			connection.query('update cart set number=number+1 where username=? and id=?', [obj.username, obj.id], (err, results, fields) => {
				if (!err) {
					handle(results)
				}
			})
			connection.release()
		}
	})
}

// 购物车number-1
let reduceCartNumber = (obj, handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('update cart set number=number-1 where username=? and id=?', [obj.username, obj.id], (err, results, fields) => {
				if (!err) {
					handle(results)
				}
			})
			connection.release()
		}
	})
}

// 删除购物车
let deleteCart = (obj,handle) => {
	pool.getConnection((err, connection) => {
		if (!err) {
			connection.query('delete from cart where username=? and id=?', [obj.username, obj.id], (err, results, fields) => {
				if (!err) {
					handle(err, results)
				}
			})
			connection.release()
		}
	})
}


module.exports = {
	findCartByUsername,
	judgeCart,
	insertCart,
	updateCart,
	addCartNumber,
	reduceCartNumber,
	deleteCart
}