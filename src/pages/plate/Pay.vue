<template>
	<div class="pay">
		<div class="wrapper pay-wrapper">
			<div class="pay-content">
				<div class="pay-receive">
					<div class="pay-title">收货信息</div>
					<div class="pay-receive-msg">
						<div class="nickname">
							<span>收件人：</span>
							<span>{{receive.form.nickname}}</span>
						</div>
						<div class="telephone">
							<span>联系电话：</span>
							<span>{{receive.form.telephone}}</span>
						</div>
						<div class="address">
							<span>收货地址：</span>
							<span>{{receive.form.address}}</span>
						</div>
						<el-button @click='toModifyMsg'>修改信息</el-button>
					</div>
				</div>
				
				<div class="pay-commodity">
					<div class="pay-title">
						<span>商品信息</span>
						<span>单价</span>
						<span>数量</span>
						<span>小计</span>
						<span>实付</span>
					</div>
					<div class="pay-commodity-msg">
						<ul>
							<li v-for='row in msg' :key='row.id'>
								<div class="commodity-img"><img :src="row.src"></div>
								<div class="commodity-title"><span>{{row.name}}</span></div>
								<div class="commodity-price">￥<span>{{row.pricel}}</span></div>
								<div class="commodity-number"><span>{{row.number}}</span></div>
								<div class="commodity-xiaoji">￥<span >{{row.number * row.pricel}}</span></div>
								<div class="commodity-shifu"><span>￥{{row.number * row.pricel}}</span></div>
							</li>
						</ul>
					</div>
					<div class="pay-pay">
						<div class="pay-total"><span>总计：</span><span>￥{{total_price}}</span></div>
						<div class="pay-gopay"><el-button @click='gopay'>去付款</el-button></div>
					</div>
				</div>
			</div>
		</div>

		<!-- 修改信息的模态框 -->
		<el-dialog title="收货地址" :visible.sync="receive.visible">
			<el-form :model="receive.form" ref='modifyForm' :rules='modify_rules' label-position='left'>
				<el-form-item label="收件人" label-width='100px' prop='nickname'>
					<el-input v-model="receive.form.nickname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" label-width='100px' prop='telephone'>
					<el-input v-model="receive.form.telephone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="收货地址" label-width='100px' prop='address'>
					<el-input v-model="receive.form.address" autocomplete="off" placeholder='请填写详细地址'></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closePDialog">恢复默认</el-button>
				<el-button type="primary" @click="saveOrUpdateReceive">保 存</el-button>
			</div>
		</el-dialog>

		<!-- 去付款的模态框 -->
		<el-dialog title="选择支付方式" :visible.sync="pay.visible" class='topay'>
			<div class="pay-way">
				<el-radio-group v-model="radio">
					<el-radio :label="1">
						<img src="static/a-pay/支付宝.png">
						<span>支付宝</span>
					</el-radio>
					<el-radio :label="2">
						<img src="static/a-pay/微信.png">
						<span>微信支付</span>
					</el-radio>
					<el-radio :label="3">
						<img src="static/a-pay/银行卡.png">
						<span>银行卡</span>
					</el-radio>
				</el-radio-group>
			</div>
			<el-dialog
				width="30%"
				title="输入支付密码"
				:visible.sync="paynow.visible"
				append-to-body>
				<el-input v-model='password' placeholder='请输入密码' show-password></el-input>
				<div slot="footer" class="dialog-footer">
					<el-button @click="closePaypasswdDialog">取 消</el-button>
					<el-button type="primary" @click="payed">确 定</el-button>
				</div>
			</el-dialog>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closePayDialog">取 消</el-button>
				<el-button type="primary" @click="topaynow">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import axios from '@/http/axios'
import _ from 'lodash'
export default {
	props: ['usermsg'],
	data () {
		return {
			// 收件人的信息
			receive: {
				visible: false,	//修改收货信息的模态框
				form: {
					//nickname: '刘浩',
					//telephone: '18454236854',
					//address: '江苏省苏州市昆山市巴城镇学院路999号美居客电商产业大楼'
				}
			},

			// 商品信息
			/*commodity: [{
				id: '300',
				name: '一心一意',
				pricel: '138',
				src: '/static/love-1/9010011.jpg',
				number: '2'
			},{
				id: '300',
				name: '一心3意',
				pricel: '28',
				src: '/static/love-1/9010011.jpg',
				number: '4'
			}],*/
			
			// 去支付模态框
			pay: {
				visible: false
			},
			paynow: {
				visible: false
			},
			radio: '',
			password: '',
			modify_rules: {
				nickname: [{
					required: true, message: '请输入收件人姓名', trigger: 'blur'
				}],
				telephone: [{
					required: true, message: '请输入联系电话', trigger: 'blur'
				}],
				address: [{
					required: true, message: '请输入收货地址', trigger: 'blur'
				}]
			},
			order: [],
			msg: [],
		}
	},
	computed: {
		// 计算总价
		total_price () {
			let total = 0
			this.msg.forEach(item => {
				total += Number(item.pricel) * Number(item.number)
			})
			return total
		}
	},
	watch: {
		'$parent.$parent.usermsg.form.username': function () {
			if (this.$parent.$parent.usermsg.form.username == undefined) {
				this.$router.push('/')
			}
		}
	},
	beforeCreate () {},
	created () {
		this.getcommodityid()	// 获取id(单件)
		this.getusermsg()			// 获取user信息
	},
	mounted () {},
	methods: {
		// 页面跳转时get商品id msg->pay
		getcommodityid () {
			let id = this.$route.query.id	// id是数组
			if (Array.isArray(id) === true) {
				let entries = id.entries()	// entries为数组的key,val值
				for ([index, val] of entries) {
					this.msg.push(val)	// [{id:'302',number:2}{}{}]
				}
			}
			let ids = this.msg.map(item => {
				return item.id
			})
			this.findCommodityByIds(ids)
		},
		//收货信息替换
		getusermsg () {
			let receive = _.clone(this.$parent.$parent.usermsg.form)
			this.receive.form = receive
		},
		// 根据id查找商品
		findCommodityByIds (ids) {
			if (ids.length == 1) {
				axios.get('/commodity/findCommodityById?id=' + ids[0])
				.then(({ data: results }) => {
					this.$set(this.msg[0], 'name', results[0].name)
					this.$set(this.msg[0], 'src', results[0].src)
					this.$set(this.msg[0], 'pricel', results[0].pricel)
				})
				.catch(() => {
					this.$message.error('ids查询失败')
				})
			} else {
				axios.post('/commodity/findCommodityByIds', { ids })
				.then(({ data: results }) => {
					for(let i = 0; i < this.msg.length; i++) {
						this.$set(this.msg[i], 'name', results[i].name)
						this.$set(this.msg[i], 'src', results[i].src)
						this.$set(this.msg[i], 'pricel', results[i].pricel)
					}
				})
				.catch(() => {
					this.$message.error('ids查询失败')
				})
			}
		},
		// 修改收货信息
		toModifyMsg () {
			this.receive.visible = true
			this.$refs.modifyForm.resetFields()
		},
		// 取消->关闭修改收件人信息的模态框(恢复默认)
		closePDialog () {
			this.receive.visible = false
			let receive = _.clone(this.$parent.$parent.usermsg.form)
			this.receive.form = receive
		},
		// 保存->保存新收货信息
		saveOrUpdateReceive () {
			this.$refs.modifyForm.validate((valid) => {
				if (valid) {
					this.receive.visible = false
				} else {
					this.$message.warning('请输入完整收货信息')
					return false
				}
			})
		},
		// 点击去付款->模态框
		gopay () {
			if (this.receive.form.nickname == null) {
				this.$message.warning('请输入完整收货信息')
			} else {
				this.pay.visible = true
			}
		},
		// 关闭选择支付方式模态框
		closePayDialog () {
			this.pay.visible = false
			this.radio = ''	// 清除支付单选项
		},
		// 去付款->确定
		topaynow () {
			if (this.radio == '') {
				this.$message.warning('请选择支付方式')
			}else{
				this.paynow.visible = true
			}
		},
		// 取消->关闭输入支付密码的模态框
		closePaypasswdDialog () {
			this.paynow.visible = false
			this.password = ''
		},
		// 输入支付密码->确定
		payed () {
			if (this.password !== this.$parent.$parent.usermsg.form.password) {
				this.$message.warning('密码错误')
			} else {
				// 传数据到购物车，清除掉支付成功的商品
				// 清除order数组，传数据到我的订单
				this.order.length = 0
				this.msg.forEach(item => {
					this.order.push({
						username: this.$parent.$parent.usermsg.form.username,
						nickname: this.receive.form.nickname,
						telephone: this.receive.form.telephone,
						address: this.receive.form.address,
						id: item.id,
						number: item.number
					})
				})

				this.order.forEach(item => {
					axios.post('/order/insertOrder', item)
					.then(() => {
						this.$message.success('支付成功！')
						this.paynow.visible = false
						this.pay.visible = false

						let obj = {
							username: item.username,
							id: item.id
						}
						axios.post('/cart/deleteCart', obj)
						.then(() => {
							this.$message.success('购物车修改成功')
							this.$router.push('/')
						})
						.catch(() => {
							this.$message.error('购物车修改错误')
						})
					})
					.catch(() => {
						this.$message.error('支付错误')
					})
				})
			}
		},
		
	}
}
</script>

<style>
	.pay-content {
		margin-top: 50px;
	}
	.pay-content > * {
		border: 1px solid #e8e8e8;
	}
	.pay-content > .pay-receive {
		margin-bottom: 20px;
	}
	.pay-content > * > .pay-title {
		background-color: #f5f5f5;
		color: #999;
		height: 40px;
		line-height: 40px;
		padding: 0 15px;
		border-bottom: 1px solid #e8e8e8;
	}
	.pay-title > * {
		float: left;
	}
	.pay-title > span {
		width: 200px;
		text-align: center;
	}
	.pay-title > span:first-child {
		width: 350px;
		text-align: left;
	}
	.pay-receive .pay-receive-msg {
		padding: 0 20px;
	}
	.pay-receive-msg .nickname {
		margin-top: 20px;
	}
	.nickname span:first-child {
		margin-right: 15px;
	}
	.pay-receive-msg > * {
		margin-bottom: 20px;
	}
	.pay-content > .pay-commodity {
		padding-bottom: 30px;
	}
	.pay-commodity > .pay-commodity-msg {
		margin-bottom: 50px;
	}
	.pay-commodity-msg > ul > li {
		border-bottom: 1px solid #e8e8e8;
		height: 100px;
		padding: 20px 20px;
	}
	.pay-commodity-msg > ul > li > * {
		float: left;
		width: 200px;
		text-align: center;
		padding-top: 5px;
	}
	.pay-commodity-msg > ul > li > .commodity-img {
		width: 100px;
		height: 100px;
		padding: 0;
	}
	.commodity-img img {
		width: 100%;
		height: 100%;
	}
	.pay-commodity-msg > ul > li > .commodity-title {
		padding-left: 10px;
		width: 245px;
		font-size: 16px;
		text-align: left;
	}
	.pay-commodity > .pay-pay {
		padding-right: 20px;
	}
	.pay-pay > .pay-total {
		text-align: right;
		margin-bottom: 20px;
	}
	.pay-total > span:last-child {
		color: #d4282d;
		font-size: 20px;
		font-weight: 700;
	}
	.pay-pay > .pay-gopay .el-button{
		width: 160px;
		height: 50px;
		font-size: 18px;
		background-color: #f76372;
		color: #fff;
		border-color: #f76372;
		float: right;
	}
	.pay-gopay .el-button:hover {
		background-color: rgba(247,99,114,0.9);
		border-color: rgba(247,99,114,0.9);
	}
	.pay-pay > *::after,
	.topay .pay-way::after {
		content: '';
		display: block;
		clear: both;
	}

	
	.topay .pay-way > .el-radio-group > * > .el-radio__label > span {
		font-size: 24px;
	}
	.topay .pay-way > .el-radio-group > * > .el-radio__label > span,
	.topay .pay-way > .el-radio-group > * > .el-radio__input {
		position: relative;
		bottom: 20px;
	}
	.topay .pay-way > .el-radio-group > * {
		margin-right: 60px;
	}
</style>