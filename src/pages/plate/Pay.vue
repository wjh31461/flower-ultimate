<template>
	<div class="pay">
		<div class="wrapper pay-wrapper">
			<div class="pay-content">
				<div class="pay-receive">
					<div class="pay-title">收货信息</div>
					<div class="pay-receive-msg">
						<div class="nickname">
							<span>收件人：</span>
							<span>{{receiveMsg.name}}</span>
						</div>
						<div class="telephone">
							<span>联系电话：</span>
							<span>{{receiveMsg.telephone}}</span>
						</div>
						<div class="address">
							<span>收货地址：</span>
							<span>{{receiveMsg.addressLabel ? receiveMsg.addressLabel.join('') + receiveMsg.addressDetail : ''}}</span>
						</div>
						<el-button @click='toEditMsg()'>修改地址</el-button>
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
								<div class="commodity-price"><span>￥{{row.pricel}}</span></div>
								<div class="commodity-number"><span>{{row.number}}</span></div>
								<div class="commodity-xiaoji"><span>￥{{row.number * row.pricel}}</span></div>
								<div class="commodity-shifu"><span>￥{{row.number * row.pricel}}</span></div>
							</li>
						</ul>
					</div>
					<div class="pay-pay">
						<div class="pay-total"><span>总计：</span><span>￥{{total_price}}</span></div>
						<div class="pay-topay"><el-button @click='topay()'>去付款</el-button></div>
					</div>
				</div>
			</div>
		</div>

		<!-- 修改地址 -->
		<el-dialog title="我的收货地址" :visible.sync="receiveVisible">
			<div v-for='(item, index) in addressList' @click='setAddress(item)' class='addressItem' style='cursor: pointer;'>
				<div>
					<span>{{item.name}} {{item.telephone}}</span>
					<span style="float: right;">
						<span v-if='item.isMain' class='isMainAddress'>默认</span>
						<i class='el-icon-edit' @click.stop='toEditAddress(item, index)' style='cursor: pointer;' title='修改地址'></i>
						<i class='el-icon-close' @click.stop='item.popover = true' title='删除地址' style='cursor: pointer;'></i>

						<el-popover
							ref="popover"
							placement="top"
							width="160"
							v-model="item.popover">
							<p>确定删除该地址？</p>
							<div style="text-align: right; margin: 0;">
								<el-button type="text" size="mini" @click.stop="item.popover = false">取消</el-button>
								<el-button type="primary" size="mini" @click.stop="deleteAddress(index)">确定</el-button>
							</div>
						</el-popover>
					</span>
				</div>
				<div>
					{{item.addressLabel.join('')}} {{item.addressDetail}}
				</div>
			</div>
			
			<div slot="footer" class="dialog-footer">
				<el-button v-if='addressList.length < 5' @click="addAddress()">新增收货地址</el-button>
			</div>

			<!-- 增加/修改收货地址 -->
			<el-dialog
				:visible.sync="addressVisible"
				:title="(addressMsg.isEdit ? '修改' : '新增') + '收货地址'"
				width="50%"
				append-to-body
				:close-on-click-modal='false'
				@close='handleAddressClose'
				>
				<editAddress ref='editAddress' :isEdit='addressMsg.isEdit' :data='addressMsg.data' :index='addressMsg.index'></editAddress>

				<div slot="footer" class="dialog-footer">
					<el-button @click="saveAddress()">保存地址</el-button>
					<el-button @click="cancelAddress()">取 消</el-button>
				</div>
			</el-dialog>
		</el-dialog>

		<!-- 去付款 -->
		<el-dialog title="输入支付密码" :visible.sync="payVisible" class='topay'>
			<paycode ref='paycode' @ok='submitPay'></paycode>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closePayDialog()">取 消</el-button>
				<el-button type="primary" @click="toSubmitPay()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import axios from '@/http/axios'
import _ from 'lodash'
import { mapState, mapGetters, mapActions } from 'vuex'
import cityCode from '../../data/city.json'

export default {
	data () {
		return {
			payMsg: [],
			cityCode: [],
			from: '',

			// 收件人信息
			receiveVisible: false,
			receiveMsg: {},
			addressList: [],
			addressVisible: false,
			addressMsg: {
				isEdit: false,
				index: 0,
				data: {}
			},
			
			// 去支付模态框
			payVisible: false,
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
			msg: []
		}
	},
	// 获取跳转前路由
	beforeRouteEnter (to, from, next) {
		next(vm => {
			vm.from = from.name
		})
	},
	methods: {
		...mapActions(['toSetUserMsg']),
		// 获取商品id
		getCommodityId () {
			let ids = this.payMsg.map(item => {
				return item.id
			})
			return ids
		},
		
		// 获取默认地址
		getDefaultMsg () {
			let ss = window.sessionStorage
			let userMsg = ss.getItem('userMsg')
			let msg = _.clone(this.getUserMsg) || (userMsg ? JSON.parse(userMsg) : {})

			let address = msg.address.filter(item => {
				return item.isMain === true
			})[0]
			this.receiveMsg = address || msg.address[0] || {}
		},
		
		// 根据id查找商品
		async findCommodityByIds (ids) {
			this.msg = []
			let res
			if (ids.length === 1) {
				res = await axios({
					method: 'GET',
					url: '/commodity/findCommodityById',
					params: {
						id: ids[0]
					}
				})
			} else {
				res = await axios.post('/commodity/findCommodityByIds', { ids: JSON.stringify(ids) })
			}
			if (res.data.success) {
				res.data.data.forEach(item => {
					let { id, name, src, pricel } = item
					let obj = {
						name,
						src,
						pricel
					}
					this.payMsg.forEach(msg => {
						if (msg.id === id) {
							obj.number = msg.number
						}
					})
					this.msg.push(obj)
				})
				this.msg = JSON.parse(JSON.stringify(this.msg))
			} else {
				this.$message.error(res.data.desc)
			}
		},
		
		// -------------------------------------地址--------------------------------------
		// 修改收货地址
		toEditMsg () {
			this.addressList = _.cloneDeep(this.userMsg.address)
			this.receiveVisible = true
		},
		// 点击更换地址
		setAddress (addr) {
			this.receiveMsg = _.cloneDeep(addr)
			this.receiveVisible = false
		},
		// 点击编辑地址
		toEditAddress (item, index) {
			this.addressVisible = true
			this.addressMsg.index = index
			this.addressMsg.isEdit = true
			this.addressMsg.data = _.cloneDeep(item)
		},
		// 删除地址
		async deleteAddress (index) {
			let data = _.cloneDeep(this.userMsg)
			data.address.splice(index, 1)
			data.address.forEach(item => {
				delete item.addressLabel
			})
			data.address = JSON.stringify(data.address)
			
			let res = await axios.post('/user/updateUser', data)
			if (res.data.success) {
				let res1 = await axios.get('/user/findUser', {
					params: { username: data.username }
				})
				if (res1.data.success) {
					this.addressList[index].popover = false
					this.updateUserData(res1.data.data[0])
					this.addressList = _.cloneDeep(this.userMsg.address)
				} else {
					this.$message.error(res1.data.desc)
				}
			} else {
				this.$message.error(res.data.desc)
			}
		},
		// 点击新增地址
		addAddress () {
			this.addressMsg.isEdit = false
			this.addressVisible = true
		},
		// 地址框关闭
		handleAddressClose () {
			this.$refs.editAddress.resetFields()
		},
		// 保存地址
		async saveAddress () {
			let flag = await this.$refs.editAddress.saveAddress()
			if (flag) {
				this.addressVisible = false
				this.addressList = _.cloneDeep(this.userMsg.address)
			}
		},
		cancelAddress () {
			this.addressVisible = false
		},

		// 点击去付款
		topay () {
			let { name, telephone, addressCode, addressDetail } = this.receiveMsg

			if (!name || !telephone || !addressCode.length || !addressDetail) {
				this.$message.warning('请输入完整收货信息')
				return false
			}
			this.payVisible = true
		},
		// 去付款 -> 点确定
		toSubmitPay () {
			let paycode = this.$refs.paycode.paycode
			this.submitPay(paycode)
		},
		// 关闭输入支付密码
		closePayDialog () {
			this.$refs.paycode.clearPaycode()
			this.payVisible = false
		},
		// 密码输入完成 点确定
		async submitPay (paycode) {
			if (paycode.join('') !== this.userMsg.paycode + '') {
				this.$message.warning('密码输入不正确')
				return false
			}
			// 提交订单
			let { username } = this.userMsg
			let { name, telephone } = this.receiveMsg
			let promise = []
			let cartPromise = []
			this.payMsg.forEach(item => {
				let address = {
					addressCode: this.receiveMsg.addressCode,
					addressDetail: this.receiveMsg.addressDetail
				}

				let params = {
					username,
					name,
					telephone,
					address: JSON.stringify(address),
					id: item.id,
					number: item.number
				}

				// 判断是从购物车进入 还是立即购买进入
				if (this.from !== 'commodity') {
					// 1.先清除该购物车信息
					let data = {
						username,
						id: item.id
					}
					cartPromise.push(this.deleteCart(data))
					// 2.添加至订单
				}
				promise.push(this.submitOrder(params))
			})
			if (this.from !== 'commodity') {
				await Promise.all(cartPromise)
			}
			let res = await Promise.all(promise)
			if (res) {
				this.$message.success('购买成功')
				this.$router.push('/')
				// 清除sessionStorage的payMsg
				let ss = window.sessionStorage
				ss.removeItem('payMsg')
			}
		},
		// 提交订单
		submitOrder (params) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					url: '/order/insertOrder',
					data: params
				}).then(res => {
					if (!res.data.success) {
						this.$message.error(res.data.desc)
					}
					resolve(res)
				})
			})
		},
		deleteCart (data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					url: '/cart/deleteCart',
					data
				}).then(res => {
					if (!res.data.success) {
						this.$message.error(res.data.desc)
					}
					resolve(res)
				})
			})
		},

		// -----------------------------------工具函数--------------------------------------
		updateUserData (res) {
			let data = _.cloneDeep(res)
			// 获取城市码对应的名称
			data.address = JSON.parse(data.address)
			data.address.forEach(item => {
				item.addressLabel = this.getCodeLabel(item.addressCode)
			})
			// 存数据 vuex sessionStorage
			this.toSetUserMsg(data)
			let ss = window.sessionStorage
			ss.setItem('userMsg', JSON.stringify(data))
		},
		getCodeLabel (codes) {
			let arr = []
			this.cityCode.forEach(prov => {
				if (prov.value === codes[0]) {
					arr.push(prov.label)
					prov.children.forEach(city => {
						if (city.value === codes[1]) {
							arr.push(city.label)
							city.children.forEach(area => {
								if (area.value === codes[2]) {
									arr.push(area.label)
								}
							})
						}
					})
				}
			})
			return arr
		},
		
	},
	computed: {
		...mapState({
			userMsg: state => state.userMsg
		}),
		...mapGetters(['getUserMsg']),
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
		'userMsg.username': function (val) {
			if (!val) {
				this.$router.push('/')
			}
		},
	},
	created () {
		// 存sessionStorage
		let ss = window.sessionStorage
		if (Object.keys(this.$route.params).length) {
			let params = this.$route.params
			ss.setItem('payMsg', JSON.stringify(params.payMsg))
		}
		this.payMsg = JSON.parse(ss.getItem('payMsg'))
		let ids = this.getCommodityId()
		this.findCommodityByIds(ids)
		this.getDefaultMsg()
		this.cityCode = JSON.parse(JSON.stringify(cityCode))
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
	.pay-pay > .pay-topay .el-button{
		width: 160px;
		height: 50px;
		font-size: 18px;
		background-color: #f76372;
		color: #fff;
		border-color: #f76372;
		float: right;
	}
	.pay-topay .el-button:hover {
		background-color: rgba(247,99,114,0.9);
		border-color: rgba(247,99,114,0.9);
	}
	.pay-pay > *::after {
		content: '';
		display: block;
		clear: both;
	}

	/* 收货地址 */
	.addressItem {
		line-height: normal;
		padding: 5px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 3px;
	}
	.addressItem:hover {
		border: 1px solid #f76372;
	}
	.isMainAddress {
		padding: 2px 5px;
		background-color: #f76372;
		color: #fff;
	}
</style>