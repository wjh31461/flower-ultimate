const url = require('url')
const http = require('http')
const querystring = require('querystring')
const moment = require('moment')
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
			commodityDB.findAllCommodity((err, results) => {
				let obj = {
					success: true,
					data: results,
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
		case '/commodity/findCommodityById': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			commodityDB.findCommodityById(query.id, (err, results) => {
				let obj = {
					success: true,
					data: results,
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
		case '/commodity/findCommodityByType': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			commodityDB.findCommodityByType(query.type, (err, results) => {
				let obj = {
					success: true,
					data: results,
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
		case '/commodity/findCommodityByKey': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			commodityDB.findCommodityByKey(query.key, (err, results) => {
				let obj = {
					success: true,
					data: results,
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
		case '/commodity/findCommodityByIds': {	//post
			let buffer = Buffer.from([])
			req.on('data', data => {
				buffer += data
			})
			req.on('end', () => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)
				// 现在只能接收到x-www-form-urlencoded，接收不到form-data中的内容，此处先接收字符串数组
				let ids = totalQuery.ids
				arr = ids.split('')
				arr.pop()
				arr.shift()
				ids = arr.join('')
				ids.replace(/'/g, '"')

				commodityDB.findCommodityByIds(ids, (err, results) => {
					let obj = {
						success: true,
						data: results,
						desc: '查询ids成功'
					}
					if (err) {
						obj.success = false
						obj.desc = JSON.stringify(err)
					}
					resp.write(JSON.stringify(obj))
					resp.end()
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
				let obj = {
					success: true,
					data: '',
					desc: ''
				}

				if (!results.length) {
					obj.success = false
					obj.desc = '该用户名不存在'
				} else {
					if (results[0].password !== query.password) {
						obj.success = false
						obj.desc = '密码错误'
					}
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
		// 获取用户信息
		case '/user/findUser': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			userDB.findUser(query.username, (err, results) => {
				let obj = {
					success: true,
					data: results,
					desc: ''
				}
				resp.write(JSON.stringify(obj))
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
					let obj = {
						success: true,
						data: '',
						desc: ''
					}
					if (err) {
						obj.success = false
						obj.desc = JSON.stringify(err)
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
			orderDB.findOrderByUsername(query.username, (err, results) => {
				let obj = {
					success: true,
					data: results,
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
		case '/order/deleteOrder': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			orderDB.deleteOrder(query, (err, results) => {
				let obj = {
					success: true,
					data: results,
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
		case '/order/insertOrder': {	//post
			let buffer = Buffer.from([])
			req.on('data', data => {
				buffer += data
			})
			req.on('end', () => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)
				let time = moment().format('YYYYMMDDHHmmss')
				let params = Object.assign({}, totalQuery, {
					orderId: time,
					dealId: time + (totalQuery.id.length < 3 ? ('0' + totalQuery.id) : totalQuery.id)
				})
				orderDB.insertOrder(params, (err, results) => {
					let obj = {
						success: true,
						data: '',
						desc: '添加成功'
					}
					if (err) {
						obj.success = false
						obj.desc = JSON.stringify(err)
					}
					resp.write(JSON.stringify(obj))
					resp.end()
				})
			})
			break
		}


		// ----------------------------------------购物车----------------------------------------
		case '/cart/findCartByUsername': {	//get
			let query = url.parse(req.url).query
			query = querystring.parse(query)
			cartDB.findCartByUsername(query.username, (err, results) => {
				let obj = {
					success: true,
					data: results,
					desc: '查询成功'
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
		case '/cart/addCartNumber': {	//post
			let buffer = Buffer.from([])
			req.on('data',(data) => {
				buffer += data
			})
			req.on('end',() => {
				totalQuery = buffer
				totalQuery = querystring.parse(totalQuery)
				cartDB.addCartNumber(totalQuery, (err, results) => {
					let obj = {
						success: true,
						data: '',
						desc: '+1成功'
					}
					if (err) {
						obj.success = false
						obj.desc = JSON.stringify(err)
					}
					resp.write(JSON.stringify(obj))
					resp.end()
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
					let obj = {
						success: true,
						data: '',
						desc: '-1成功'
					}
					if (err) {
						obj.success = false
						obj.desc = JSON.stringify(err)
					}
					resp.write(JSON.stringify(obj))
					resp.end()
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
				totalQuery = querystring.parse(totalQuery)	//{ username: "123", id: 600, number: 2 }
				cartDB.judgeCart(totalQuery, (err, results) => {
					let obj = {
						success: true,
						data: '',
						desc: ''
					}
					if (err) {
						obj.success = false
						obj.desc = JSON.stringify(err)
					} else {
						let res = JSON.stringify(results)	//[ RowDataPacket { count: 1 } ]
						res = JSON.parse(res)	//[ { count: 1 } ]
						if (res[0].count === 0) {
							cartDB.insertCart(totalQuery, (erri, resultsi) => {
								if (erri) {
									obj.success = false
									obj.desc = JSON.stringify(erri)
								} else {
									obj.desc = '新增成功'
								}
							})
						} else {
							cartDB.updateCart(totalQuery, (erru, resultsu) => {
								if (erru) {
									obj.success = false
									obj.desc = JSON.stringify(erru)
								} else {
									obj.desc = '新增成功'
								}
							})
						}
					}
					resp.write(JSON.stringify(obj))
					resp.end()
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
					let obj = {
						success: true,
						data: '',
						desc: '删除成功'
					}
					if (err) {
						obj.success = false
						obj.desc = JSON.stringify(err)
					}
					resp.write(JSON.stringify(obj))
					resp.end()
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