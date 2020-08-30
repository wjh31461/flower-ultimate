<template>
	<div class="shoppingcart">
		<div class="wrapper cart-wrapper">
			<div class="cart-commodity">
				<el-table
					ref="multipleTable"
					:data="msg"
					tooltip-effect="dark"
					style="width: 100%;"
					@selection-change="handleSelectionChange">
					<el-table-column
						type="selection"
						width="55">
					</el-table-column>
					<el-table-column
						label="商品信息"
						width="343">
						<template slot-scope='{row}'>
							<img :src="row.src">
							<span style='position: relative; bottom: 40px;'>{{row.name}}</span>
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
							<el-button icon='el-icon-minus' @click='minus(row)'></el-button>
							<span>{{row.number}}</span>
							<el-button icon='el-icon-plus' @click='plus(row)'></el-button>
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
							<span @click='deletecommodity(row)'>删除</span>
							<!-- 此处应为row.id -->
						</template>
					</el-table-column>
				</el-table>

				<div class="cart-pay">
					<div class="cart-total">
						<span>共{{msg.length}}件商品，已选择{{multipleSelection.length}}件</span>
						<span>总计：</span>
						<span>￥{{total_price}}</span>
					</div>
					<div class="cart-gopay">
						<el-button @click='gopay'>下 单</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from '@/http/axios'
export default {
	props: ['usermsg'],
	data(){
		return {
			// 商品信息
			/*commodity:[{
				id:'300',
				name:'一心一意',
				pricel:'138',
				src:'/static/love-1/300.jpg',
				number:'2'
			},{
				id:'307',
				name:'致青春',
				pricel:'229',
				src:'/static/love-8.jpg',
				number:'1'
			}],*/

			// 去支付模态框
			pay: {
				visible: false
			},
			paynow: {
				visible: false
			},
			
			multipleSelection: [],
			cart: [],
			commodity: [],
			msg: []
		}
	},
	computed:{
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
			this.msg.forEach(item => {
				price = Number(item.pricel) * Number(item.number)
			})
			return price
		}
	},
	watch: {
		'$parent.usermsg.form.username': function () {
			if (!this.$parent.usermsg.form.username){
				this.$router.push('/')
			}
		}
	},
	created () {
		this.findCartByUsername()
	},
	mounted () {
		// this.$router.push('/')
	},
	methods: {
		findCartByUsername () {
			this.msg = []
			this.cart = []
			this.commodity = []
			axios.get('/cart/findCartByUsername?username=' + this.$route.query.username)
			.then(({ data: results })=>{
				this.$message.success('购物车信息查询成功')
				this.cart = results
				let ids = this.cart.map(item => {
					return item.id
				})
				this.findCommodityByIds(ids)
			})
			.catch(() => {
				this.$message.error('购物车查询错误')
			})
		},
		findCommodityByIds (ids) {
			// console.log({ids})//{ids:['300','304','308']}
			if (ids.length == 1) {
				axios.get('/commodity/findCommodityById?id=' + ids[0])
				.then(({ data: results })=>{
					this.$message.success('id查询成功')
					this.commodity = results
					let obj = {
							id: this.cart[0].id,
							name: this.commodity[0].name,
							pricel: this.commodity[0].pricel,
							src: this.commodity[0].src,
							number: this.cart[0].number
					}
					this.msg.push(obj)
				})
			} else {
				axios.post('/commodity/findCommodityByIds', { ids })
				.then(({ data: results })=>{
					this.$message.success('ids查询成功')
					this.commodity = results
					
					for(let i = 0; i < this.cart.length; i++){
						let obj = {
							id: this.cart[i].id,
							name: this.commodity[i].name,
							pricel: this.commodity[i].pricel,
							src: this.commodity[i].src,
							number: this.cart[i].number
						}
						this.msg.push(obj)
					}
				})
				.catch(() => {
					this.$message.error('ids查询失败')
				})
			}
		},
		handleSelectionChange (val) {
			this.multipleSelection = val
		},
		minus (row) {
			if(row.number > 1 && row.number <= 99){
				row.number--
				let obj = {
					username: this.$parent.usermsg.form.username,
					id: row.id
				}
				axios.post('/cart/reduceCartNumber', obj)
				.then(() => {
					this.$message.success('减少成功')
				})
				.catch(() => {
					this.$message.warning('减少失败')
				})
			}
		},
		plus (row) {
			if(row.number >= 1 && row.number < 99){
				row.number++
				let obj = {
					username: this.$parent.usermsg.form.username,
					id: row.id
				}
				debugger
				axios.post('/cart/addCartNumber', obj)
				.then(() => {
					this.$message.success('增加成功')
				})
				.catch(() => {
					this.$message.warning('增加失败')
				})
			}
		},
		// 去支付
		gopay () {
			if (this.multipleSelection.length == 0) {
				this.$message.warning('请选择商品')
			} else {
				let arr = []	//arr中包含商品的id和number
				this.multipleSelection.forEach(item => {
					arr.push({ id: item.id, number: item.number })
				})
				this.$router.push({
					path: '/plate/pay',
					query: {
						id: arr
					}
				})
			}
		},
		deletecommodity (row) {
			this.$confirm('确认删除商品？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let obj = {
					username: this.$parent.usermsg.form.username,
					id: row.id
				}
				axios.post('/cart/deleteCart', obj)
				.then(() => {
					this.$message.success('删除成功')
					this.findCartByUsername()
				})
				.catch(() => {
					this.$message.error('删除失败')
				})
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