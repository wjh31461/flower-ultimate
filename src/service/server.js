const url = require('url')
const http = require('http')
const querystring = require('querystring')
const commodityDB = require('./db/commodityDB')
const userDB = require('./db/userDB')
const orderDB = require('./db/orderDB')
const cartDB = require('./db/cartDB')

let server = http.createServer((req, resp) => {
	resp.writeHead(200, 'OK', {
		'Content-Type': 'text/plain;charset=utf-8',	//响应头的数据格式
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "X-Requested-With",
		"Access-Control-Allow-Methods": "POST,GET,OPTIONS",
		// 'Access-Control-Allow-Credentials': true
	})

	let pathname = url.parse(req.url).pathname
	let method = req.method

	switch (pathname) {
		// ----------------------------------------商品----------------------------------------
		case '/commodity/findAllCommodity': {	//get
			commodityDB.findAllCommodity((results) => {
				resp.write(JSON.stringify(results))
				resp.end()
			})
			break
		}
		case '/commodity/findCommodityById': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			commodityDB.findCommodityById(query.id, (results) => {
				resp.write(JSON.stringify(results))
				resp.end()
			})
			break
		}
		case '/commodity/findCommodityByType': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			commodityDB.findCommodityByType(query.type, (results) => {
				resp.write(JSON.stringify(results))
				resp.end()
			})
			break
		}
		case '/commodity/findCommodityByKey': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			commodityDB.findCommodityByKey(query.key, (results) => {
				resp.write(JSON.stringify(results))
				resp.end()
			})
			break
		}
		case '/commodity/findCommodityByIds': {	//post
			let buffer = Buffer.from([])
			req.on('data', data => {
				buffer += data
			})
			req.on('end', () => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)	//{ ids: [ '300', '308', '304' ] }
				commodityDB.findCommodityByIds(totalQuery.ids, (err, results) => {
					if (err) {
						resp.write(JSON.stringify(err))
						resp.end()
					} else {
						resp.write(JSON.stringify(results))
						resp.end()
					}
				})
			})
			break
		}


		// ----------------------------------------用户----------------------------------------
		// 获取用户列表是否包含此手机号
		case '/user/findPhone': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			userDB.findPhone(query.telephone, (err, results) => {
				let obj = {
					success: true,
					data: query.justValid === 'true' ? results.length : results,
					desc: ''
				}
				if (err) {
					obj.success = false
					obj.desc = JSON.stringify(err)
				}
				resp.write(JSON.stringify(obj))
				resp.end()
			})
			break
		}
		// 判断用户名是否已被使用
		case '/user/findUsername': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			userDB.findUsername(query.username, (err, results) => {
				let obj = {
					success: true,
					data: results.length,
					desc: ''
				}
				if (err) {
					obj.success = false
					obj.desc = JSON.stringify(err)
				}
				resp.write(JSON.stringify(obj))
				resp.end()
			})
			break
		}
		// 登录判断
		case '/user/login': {	// get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			userDB.findUsername(query.username, (err, results) => {
				let success = true
				let desc = ''

				if (!results.length) {
					success = false
					desc = '该用户名不存在'
				} else {
					if (results[0].password !== query.password) {
						success = false
						desc = '密码错误'
					}
				}
				if (err) {
					success = false
					desc = JSON.stringify(err)
				}
				let obj = {
					success,
					data: '',
					desc
				}
				resp.write(JSON.stringify(obj))
				resp.end()
			})
			break
		}
		// 获取用户信息
		case '/user/findUser': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			userDB.findUser(query.username, (results) => {
				resp.write(JSON.stringify(results))
				resp.end()
			})
			break
		}
		// 更新用户信息
		case '/user/updateUser': {	//post
			let buffer = Buffer.from([])
			req.on('data', data => {
				buffer += data
			})
			req.on('end', () => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)
				userDB.updateUser(totalQuery, (err, results) => {
					let success = true
					let desc = ''
					
					if (err) {
						success = false
						desc = JSON.stringify(err)
						throw err
					}
					let obj = {
						success,
						data: '',
						desc
					}
					resp.write(JSON.stringify(obj))
					resp.end()
				})
			})
			break
		}
		// 添加用户
		case '/user/insertUser': {	//post
			let buffer = Buffer.from([])
			req.on('data', data => {
				buffer += data
			})
			req.on('end', () => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)
				userDB.insertUser(totalQuery, (err, results) => {
					let obj = {
						success: true,
						data: '',
						desc: ''
					}
					if (err) {
						obj = {
							success: false,
							data: '',
							desc: JSON.stringify(err)
						}
					}
					resp.write(JSON.stringify(obj))
					resp.end()
				})
			})
			break
		}

		
		// ----------------------------------------订单----------------------------------------
		case '/order/findOrderByUsername': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			orderDB.findOrderByUsername(query.username, (results) => {
				resp.write(JSON.stringify(results))
				resp.end()
			})
			break
		}
		case '/order/deleteOrder': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			orderDB.deleteOrder(query, (results) => {
				resp.write(JSON.stringify(results))
				resp.end()
			})
			break
		}
		case '/order/insertOrder': {	//post
			let buffer = Buffer.from([])
			req.on('data', data => {
				buffer += data
			})
			req.on('end', () => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)
				orderDB.insertOrder(totalQuery, (err, results) => {
					if (err) {
						resp.write('添加失败')
						resp.write(JSON.stringify(err))
					} else {
						resp.write('添加成功')
						resp.end()
					}
				})
			})
			break
		}


		// ----------------------------------------购物车----------------------------------------
		case '/cart/findCartByUsername': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			cartDB.findCartByUsername(query.username, (results) => {
				resp.write(JSON.stringify(results))
				resp.end()
			})
			break
		}
		case '/cart/addCartNumber': {	//post
			let buffer = Buffer.from([])
			req.on('data',(data) => {
				buffer += data
			})
			req.on('end',() => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)
				cartDB.addCartNumber(totalQuery, (err, results) => {
					if (err) {
						resp.write('添加失败')
						resp.write(JSON.stringify(err))
					} else {
						resp.write('添加成功')
						resp.end()
					}
				})
			})
			break
		}
		case '/cart/reduceCartNumber': {	//post
			let buffer = Buffer.from([])
			req.on('data',(data) => {
				buffer += data
			})
			req.on('end', () => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)
				cartDB.reduceCartNumber(totalQuery, (err, results) => {
					if (err) {
						resp.write('减去失败')
						resp.write(JSON.stringify(err))
					} else {
						resp.write('减去成功')
						resp.end()
					}
				})
			})
			break
		}
		case '/cart/insertCart': {	//post
			let buffer = Buffer.from([])
			req.on('data', (data) => {
				buffer += data
			})
			req.on('end', () => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)	//{username: "123", id: 600, number: 2}
				cartDB.judgeCart(totalQuery, (err, results) => {
					if (err) {
						resp.write('添加失败')
						resp.write(JSON.stringify(err))
						resp.end()
					} else {
						let a = JSON.stringify(results)	//[ RowDataPacket { count: 1 } ]
						a = JSON.parse(a)	//[ { count: 1 } ]
						if (a[0].count == 0) {
							cartDB.insertCart(totalQuery, (err, results) => {
								if (err) {
									resp.write('新增失败')
									resp.write(JSON.stringify(err))
									resp.end()
								} else {
									resp.write('新增成功')
									resp.end()
								}
							})
						}else{
							cartDB.updateCart(totalQuery, (err, results) => {
								if (err) {
									resp.write('添加失败')
									resp.write(JSON.stringify(err))
									resp.end()
								} else {
									resp.write('添加成功')
									resp.end()
								}
							})
						}
						
					}
				})
			})
			break
		}
		case '/cart/deleteCart': {	//post
			let buffer = Buffer.from([])
			req.on('data', (data) => {
				buffer += data
			})
			req.on('end', () => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)
				cartDB.deleteCart(totalQuery, (err, results) => {
					if (err) {
						resp.write('删除失败')
						resp.write(JSON.stringify(err))
					} else {
						resp.write('删除成功')
						resp.end()
					}
				})
			})
			break
		}

		default:
			resp.end('访问其他接口')
			break
	}
})

server.listen(8081,() => {
	console.log('服务已开启..')
})