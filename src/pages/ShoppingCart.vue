<template>
	<div class="shoppingcart">
		<div class="wrapper cart-wrapper">
			<div class="cart-commodity">
				<el-table
					ref="multipleTable"
					:data="tableList"
					v-loading='loading'
					tooltip-effect="dark"
					empty-text='购物车空空如也'
					@selection-change="handleSelectionChange"
					style="width: 100%;"
					>
					<el-table-column
						type="selection"
						width="55">
					</el-table-column>
					<el-table-column
						label="商品信息"
						width="343">
						<template slot-scope='{row}'>
							<img :src="row.src" @click='viewComDetail(row)' style='cursor: pointer;'>
							<span style='position: relative; bottom: 40px;'>{{row.commodityName}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="单价"
						width="200"
						align='center'>
						<template slot-scope='{row}'>
							<span>￥{{row.pricel}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="数量"
						width="200"
						align='center'>
						<template slot-scope='{row}'>
							<el-button icon='el-icon-minus' :disabled='row.number === 1' @click='minus(row)'></el-button>
							<span>{{row.number}}</span>
							<el-button icon='el-icon-plus' :disabled='row.number === 99' @click='plus(row)'></el-button>
						</template>
					</el-table-column>
					<el-table-column
						label="小计"
						width="200"
						align='center'>
						<template slot-scope='{row}'>
							<div>￥{{row.number * row.pricel}}</div>
						</template>
					</el-table-column>
					<el-table-column
						label="操作"
						width='200'
						align='center'>
						<template slot-scope='{row}'>
							<span @click='deleteCommodity(row)' style='color: red;'>删除</span>
						</template>
					</el-table-column>
				</el-table>

				<div class="cart-pay">
					<div class="cart-total">
						<span>共{{tableList.length}}件商品，已选择{{multipleSelection.length}}件</span>
						<span>总计：</span>
						<span>￥{{total_price}}</span>
					</div>
					<div class="cart-gopay">
						<el-button @click='gopay()'>下 单</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from '@/http/axios'
import { mapState } from 'vuex'
export default {
	data(){
		return {
			// 去支付模态框
			pay: {
				visible: false
			},
			paynow: {
				visible: false
			},
			loading: false,
			
			multipleSelection: [],
			cart: [],
			commodity: [],
			tableList: [],
			commodityIds: []
		}
	},
	computed:{
		...mapState({
			userMsg: state => state.userMsg
		}),
		total_price () {
			// 计算总价
			let total = 0
			this.multipleSelection.forEach(item => {
				total += Number(item.pricel) * Number(item.number)
			})
			return total
		},
		commodity_price () {
			// 计算单个商品价格
			let price = 0
			this.tableList.forEach(item => {
				price = Number(item.pricel) * Number(item.number)
			})
			return price
		}
	},
	watch: {
		'userMsg.username': function (val) {
			if (!val) {
				this.$router.push('/')
			}
		},
		userMsg: async function (val) {
			if (val) {
				this.findTableData()
			}
		}
	},
	async created () {
		this.findTableData()
	},
	methods: {
		// 查数据
		async findTableData () {
			this.loading = true
			await this.findCartByUsername()
			await this.findCommodityByIds(this.commodityIds)
			this.loading = false
		},
		// 根据用户名查购物车信息
		async findCartByUsername () {
			if (!this.userMsg.username) {
				return false
			}
			
			this.tableList = []
			this.cart = []
			this.commodity = []
			let params = {
				username: this.userMsg.username
			}
			await axios.get('/cart/findCartByUsername', { params })
			.then(res => {
				if (!res.data.success) {
					this.$message.error(res.data.desc)
					return false
				}

				this.cart = res.data.data
				let ids = this.cart.map((item) => {
					return item.id
				})
				this.commodityIds = [...new Set(ids)]
			})
			.catch(() => {
				this.$message.error('购物车查询失败')
			})
		},
		// 查询商品信息
		async findCommodityByIds (ids) {
			if (!ids.length) {
				return false
			}
			
			let params
			let res
			if (ids.length === 1) {
				params = { id: ids[0] }
				res = await axios({
					method: 'GET',
					url: '/commodity/findCommodityById',
					params
				})
			} else {
				params = { ids: JSON.stringify(ids) }
				res = await axios({
					method: 'POST',
					url: '/commodity/findCommodityByIds',
					data: params
				})
			}

			if (!res.data.success) {
				this.$message.error(res.data.desc)
				return false
			}

			this.commodity = res.data.data
			this.generateTableData()
		},
		// 处理列表数据
		generateTableData () {
			this.cart.forEach(cart => {
				this.commodity.forEach(com => {
					if (cart.id === com.id) {
						let obj = _.cloneDeep(cart)
						obj.src = com.src
						obj.commodityName = com.name
						obj.pricel = com.pricel
						this.tableList.push(obj)
					}
				})
			})
		},

		handleSelectionChange (val) {
			this.multipleSelection = val
		},
		minus (row) {
			if (row.number > 1 && row.number <= 99) {
				let obj = {
					username: this.userMsg.username,
					id: row.id
				}
				axios.post('/cart/reduceCartNumber', obj)
				.then(res => {
					if (!res.data.success) {
						this.$message.error(res.data.desc)
						return false
					}
					this.findTableData()
				})
				.catch(() => {
					this.$message.warning('minus失败')
				})
			}
		},
		plus (row) {
			if (row.number >= 1 && row.number < 99) {
				let obj = {
					username: this.userMsg.username,
					id: row.id
				}
				axios.post('/cart/addCartNumber', obj)
				.then(res => {
					if (!res.data.success) {
						this.$message.error(res.data.desc)
						return false
					}
					this.findTableData()
				})
				.catch(() => {
					this.$message.warning('plus失败')
				})
			}
		},
		// 去支付
		gopay () {
			if (!this.multipleSelection.length) {
				this.$message.warning('请选择商品')
			} else {
				// payMsg中包含商品的id和number
				let payMsg = this.multipleSelection.map(item => {
					return {
						id: item.id,
						number: item.number
					}
				})
				this.$router.push({
					path: '/plate/pay',
					name: 'pay',
					params: {
						payMsg
					}
				})
			}
		},
		// 删除商品
		deleteCommodity (row) {
			this.$confirm('确认删除商品？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let data = {
					username: this.userMsg.username,
					id: row.id
				}
				axios({
					method: 'POST',
					url: '/cart/deleteCart',
					data
				})
				// axios.post('/cart/deleteCart', obj)
				.then(res => {
					if (!res.data.success) {
						this.$message.error(res.data.desc)
					}
					this.findTableData()
				})
				.catch(() => {
					this.$message.error('删除失败')
				})
			})
			.catch(() => {})
		},
		// 查看商品详情
		viewComDetail (detail) {
			this.$router.push({
				path: '/plate/commodity',
				query: {
					id: detail.id
				}
			})
		}
	}
}
</script>

<style>
	.cart-commodity {
		margin-top: 50px;
		border: 1px solid #e8e8e8;
		padding-bottom: 30px;
	}
	.cart-commodity .el-table__header-wrapper thead.has-gutter > tr > * {
		background-color: #f5f5f5;
		font-size: 16px;
		font-weight: normal;
	}
	.cart-commodity .el-table__body-wrapper tbody > * > td:last-child span {
		cursor: pointer;
	}
	.cart-commodity table img {
		width: 100px;
		height: 100px;
	}
	.cart-commodity tbody > * > td:nth-child(4) > div > .el-button:first-child {
		background-color: #f5f7fa;
		border-radius: 4px 0 0 4px;
		height: 40px;
	}
	.cart-commodity tbody > * > td:nth-child(4) > div > span {
		display: inline-block;
		width: 40px;
		height: 40px;
		text-align: center;
	}
	.cart-commodity tbody > * > td:nth-child(4) > div > .el-button:last-child {
		background-color: #f5f7fa;
		border-radius: 0 4px 4px 0;
		height: 40px;
	}
	.cart-commodity > .cart-pay {
		padding-right: 20px;
	}
	.cart-pay > .cart-total {
		text-align: right;
		margin-bottom: 20px;
		margin-top: 50px;
	}
	.cart-total span:first-child {
		margin-right: 30px;
	}
	.cart-total > span:last-child {
		color: #d4282d;
		font-size: 20px;
		font-weight: 700;
	}
	.cart-pay > .cart-gopay .el-button{
		width: 160px;
		height: 50px;
		font-size: 18px;
		background-color: #f76372;
		color: #fff;
		border-color: #f76372;
		float: right;
	}
	.cart-gopay .el-button:hover {
		background-color: rgba(247,99,114,0.9);
		border-color: rgba(247,99,114,0.9);
	}
	.cart-pay > *::after {
		content: '';
		display: block;
		clear: both;
	}
</style>