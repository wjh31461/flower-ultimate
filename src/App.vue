<template>
	<div id="app">
		<div class="top-nav">
			<div class="wrapper top-nav-wrapper">
				<ul>
					<li>
						<el-dropdown @command="handleCommand" trigger='click'>
							<span @click='login($event)' class="el-dropdown-link">
								{{userMsg.username ? ('欢迎，' + userMsg.username) : '你好，请登录'}}
							</span>
							<el-dropdown-menu slot="dropdown" v-if='dropdownMenu'>
								<el-dropdown-item command='showMsg'>个人信息</el-dropdown-item>
								<el-dropdown-item command='logout'>退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
					<li :class='{ current: currentRoute == "/register" }'>
						<router-link to='/register'>快速注册</router-link>
					</li>
					<li :class='{ current: currentRoute == "/order" }'>
						<a @click='toOrder()'>我的订单</a>
					</li>
					<li :class='{ current: currentRoute == "/shoppingcart" }'>
						<a @click='toShoppingcart()'>
							<i class="fa fa-shopping-cart"></i>
							购物车
							<i class="fa fa-caret-down"></i>
						</a>
					</li>
					<li :class='{ current: currentRoute == "/" }'>
						<router-link to='/'>樱花部落</router-link>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="header">
			<div class="wrapper header-wrapper">
				<div class="logo">
					<router-link to='/'>
						<img src="../static/title-1.jpg" alt="">
						<img src="../static/title-2.jpg" alt="">
					</router-link>
				</div>
				<div class="search">
					<div class="search-top">
						<el-input placeholder="鲜花关键词" v-model="input" class="input-with-select" prefix-icon='el-icon-search' clearable>
							<el-button slot="append" @click='search()'>搜 索</el-button>
						</el-input>
					</div>
					<div class="search-bottom">
						<router-link to='/plate/overview?key=红玫瑰'>红玫瑰</router-link>
						&nbsp;|&nbsp;
						<router-link to='/plate/overview?key=白玫瑰'>白玫瑰</router-link>
						&nbsp;|&nbsp;
						<router-link to='/plate/overview?key=康乃馨'>康乃馨</router-link>
						&nbsp;|&nbsp;
						<router-link to='/plate/overview?key=百合'>百合</router-link>
						&nbsp;|&nbsp;
						<router-link to='/plate/overview?key=郁金香'>郁金香</router-link>
					</div>
				</div>
				<div class="service">
					<i class="fa fa-phone"></i>123-456-789
					<router-link to='/plate/service/cjwt'>
						<i class="fa fa-commenting"></i>
						客户服务
					</router-link>
				</div>
			</div>
		</div>
		
		<router-view></router-view>
		
		<div class="footer">
			<div class="wrapper footer-wrapper">
				<div class="footer-help">
					<div class="footer-help-left">
						<div>客户服务</div>
						<div class="customer-server">
							<div>
								<router-link to='/plate/service/cjwt'>常见问题</router-link>
								<router-link to='/plate/service/qxdd'>取消订单</router-link>
							</div>
							<div>
								<router-link to='/plate/service/shfw'>售后服务</router-link>
								<router-link to='/plate/service/fwsm'>服务声明</router-link>
							</div>
							<div>
								<router-link to='/plate/service/pssm'>配送说明</router-link>
								<router-link to='/plate/service/aqtk'>安全条款</router-link>
							</div>
						</div>
					</div>
					<div class="footer-help-center">
						<div>咨询</div>
						<div class="question">
							<router-link to='/plate/service/liucheng'>鲜花购物流程？</router-link>
							<router-link to='/plate/service/pscs'>鲜花配送城市？</router-link>
							<router-link to='/plate/service/yuding'>应该提前多久预定？</router-link>
						</div>
					</div>
					<div class="footer-help-right">
						<div>联系我们</div>
						<div class="callus">
							<div>订购热线：123-456-789</div>
							<div>7×24小时在线订购</div>
							<div>支持货到付款</div>
							<div>企业邮箱：123456789@163.com</div>
						</div>
					</div>
				</div>
				<div class="footer-foot">
					<div class="footer-foot-top">
						<div>
							<img src="../static/handshake-o.png" alt="">
							<span>诚信网站</span>
						</div>
						<div>
							<img src="../static/卡车.png" alt="">
							<span>满98元免邮费</span>
						</div>
						<div>
							<img src="../static/微信.png" alt="">
							<span>微信支付</span>
						</div>
						<div>
							<img src="../static/支付宝.png" alt="">
							<span>支付宝</span>
						</div>
						<div>
							<img src="../static/thumbs-up.png" alt="">
							<span>品质保证</span>
						</div>
					</div>
					<div class="footer-foot-bottom">CopyRight：2019</div>
				</div>
			</div>
		</div>
		
		<!-- 登录模态框 -->
		<el-dialog class='loginDialog' title="登录" :visible.sync="loginForm.visible" center @open='handleLoginOpen' @close='handleLoginClose'>
			<el-tabs v-model="active" @tab-click="handleTabClick">
				<el-tab-pane label="手机验证码登录" name="0">
					<el-form :model="loginForm.form" :rules='loginRules' ref='loginDialog1' label-position='left'>
						<el-form-item label="手机号" label-width="70px" prop='telephone'>
							<el-input v-model="loginForm.form.telephone" :maxlength='11'></el-input>
						</el-form-item>
						<el-form-item label="验证码" label-width="70px" prop='securityCode'>
							<el-input v-model="loginForm.form.securityCode" :maxlength='6' placeholder='请输入验证码' style='width: 50%;'></el-input>
							<el-button @click='getSecurityCode()' :loading='loginForm.codeLoading' :disabled='loginForm.codeDisable' style='width: 45%; float: right;'>
								<span v-if='!loginForm.codeDisable'>获取验证码</span>
								<span v-else>{{loginForm.countdown}}s后可获取</span>
							</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				
				<el-tab-pane label="账号密码登录" name="1">
					<el-form :model="loginForm.form" :rules='loginRules' ref='loginDialog2' label-position='left'>
						<el-form-item label="用户名" label-width="70px" prop='username'>
							<el-input v-model="loginForm.form.username" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="密码" label-width="70px" prop='password'>
							<el-input v-model="loginForm.form.password" auto-complete="off" show-password></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeLoginForm()">取 消</el-button>
				<el-button @click="toLogin()">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 个人信息 -->
		<el-dialog class='usermsgDialog' :title="editMsg.isEdit ? '修改信息' : '个人信息'" :visible.sync="editMsg.visible" width='70%' center>
			<!-- 查看信息 -->
			<el-form v-if='!editMsg.isEdit' label-position='left'>
				<el-form-item label="用户名" label-width="100px">{{userMsg.username}}</el-form-item>
				<el-form-item label="昵称" label-width="100px">{{userMsg.aliase}}</el-form-item>
				<el-form-item label="真实姓名" label-width="100px">{{userMsg.nickname}}</el-form-item>
				<el-form-item label="手机号" label-width="100px">{{userMsg.telephone}}</el-form-item>
				<el-form-item label="收货地址" label-width="100px">
					<div v-if='userMsg.address' v-for='item in userMsg.address' class='addressItem'>
						{{item.name}} {{item.telephone}}
						<div>
							{{item.addressLabel.join('')}} {{item.addressDetail}}
						</div>
					</div>
				</el-form-item>
			</el-form>

			<!-- 修改信息 -->
			<el-form v-if='editMsg.isEdit' ref='editDialog' :model='editMsg.form' :rules='editRules' label-position='left'>
				<el-form-item label="用户名" label-width="100px">{{editMsg.form.username}}</el-form-item>
				<el-form-item label="昵称" label-width="100px" prop='aliase'>
					<el-input v-model="editMsg.form.aliase" :maxlength='8' placeholder="请输入昵称"></el-input>
				</el-form-item>
				<el-form-item label="密码" label-width="100px" prop='password'>
					<el-input v-model="editMsg.form.password" :minlength='6' :maxlength='16' placeholder="请输入新密码" auto-complete="off" show-password></el-input>
				</el-form-item>
				<el-form-item label="姓名" label-width="100px" prop='nickname'>
					<el-input v-model="editMsg.form.nickname" :minlength='2' :maxlength='4' placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号" label-width="100px">
					{{editMsg.form.telephone}}
					<el-button @click="toChangePhone()">点击更换手机号</el-button>
				</el-form-item>
				<el-form-item label="收货地址" label-width="100px" prop='address'>
					<div v-if='editMsg.form.address' v-for='item in editMsg.form.address' class='addressItem'>
						{{item.name}} {{item.telephone}}
						<div>
							{{item.addressLabel.join('')}} {{item.addressDetail}}
						</div>
					</div>
					<el-button v-if='editMsg.form.address ? editMsg.form.address.length < 5 : true' @click="addAddress()">新增收货地址</el-button>
				</el-form-item>
			</el-form>

			<!-- 修改手机号 -->
			<el-dialog
				width="30%"
				title="修改手机号"
				:visible.sync="phoneMsg.visible"
				append-to-body>
				<el-form :model="phoneMsg.form" :rules='loginRules' ref='phoneDialog' label-position='left'>
					<el-form-item label="手机号" label-width="70px" prop='telephone'>
						<el-input v-model="phoneMsg.form.telephone" :maxlength='11'></el-input>
					</el-form-item>
					<el-form-item label="验证码" label-width="70px" prop='securityCode'>
						<el-input v-model="phoneMsg.form.securityCode" :maxlength='6' placeholder='请输入验证码' style='width: 50%;'></el-input>
						<el-button @click='getSecurityCode()' :loading='phoneMsg.codeLoading' :disabled='phoneMsg.codeDisable' style='width: 45%; float: right;'>
							<span v-if='!phoneMsg.codeDisable'>获取验证码</span>
							<span v-else>{{phoneMsg.countdown}}s后可获取</span>
						</el-button>
					</el-form-item>
				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button @click="saveNewPhone()">确 定</el-button>
					<el-button @click="cancelNewPhone()">取 消</el-button>
				</div>
			</el-dialog>

			<!-- 增加/修改收货地址 -->
			<el-dialog
				:visible.sync="addressMsg.visible"
				:title="(addressMsg.isEdit ? '修改' : '新增') + '收货地址'"
				width="50%"
				append-to-body>
				<el-form :model="addressMsg.form" :rules='addressRules' ref='addressDialog' label-position='left'>
					<el-form-item label="收件人姓名" label-width="100px" prop='name'>
						<el-input v-model="addressMsg.form.name"></el-input>
					</el-form-item>
					<el-form-item label="手机号" label-width="100px" prop='telephone'>
						<el-input v-model="addressMsg.form.telephone" :maxlength='11'></el-input>
					</el-form-item>
					<el-form-item label="地址" label-width="100px" prop='addressCode'>
						<el-cascader
							v-model="addressMsg.form.addressCode"
							:options="cityCode"
							clearable
							placeholder='请选择省市'
							@change="handleChange"
							/>
					</el-form-item>
					<el-form-item label="" label-width="100px" prop='addressDetail'>
						<el-input type='textarea' v-model="addressMsg.form.addressDetail" :rows="2" :maxlength='20' placeholder='具体地址'></el-input>
					</el-form-item>
				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button @click="saveAddress()">保存地址</el-button>
					<el-button @click="cancelAddress()">取 消</el-button>
				</div>
			</el-dialog>
			
			<div slot="footer" class="dialog-footer">
				<div v-if='editMsg.isEdit'>
					<el-button @click="closeModify()">取 消</el-button>
					<el-button @click="saveUsermsg()">保 存</el-button>
				</div>
				<div v-else>
					<el-button @click="closeUsermsg()">确 定</el-button>
					<el-button @click="toEdit()">修改信息</el-button>
				</div>
			</div>
		</el-dialog>

		<!-- 提示信息 -->
		<!-- <el-dialog
			title="提示"
			width="30%"
			:visible.sync="dialogVisible"
			>
			<span>本项目为虚拟项目，可选择不输入真实信息，且不可用于商业用途，不可随意转发，仅用于开发者开发和查看。</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">我知道了</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
import axios from '@/http/axios'
import _ from 'lodash'

import commodity from './pages/plate/Commodity'
import pay from './pages/plate/Pay'
import order from './pages/Order'
import shoppingcart from './pages/ShoppingCart'

import cityCode from './data/city.json'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	components: {
		commodity,
		pay,
		order,
		shoppingcart
	},
	data () {
		var validSecurityCode = (rule, value, callback) => {
			if (this.loginForm.visible) {
				if (!this.loginForm.form.securityCode) {
					callback(new Error('请输入验证码'))
				} else if (this.loginForm.securityCode !== this.loginForm.form.securityCode) {
					callback(new Error('验证码输入错误'))
				} else {
					callback()
				}
			}
			if (this.phoneMsg.visible) {
				if (!this.phoneMsg.securityCode) {
					callback(new Error('请输入验证码'))
				} else if (this.phoneMsg.securityCode !== this.phoneMsg.form.securityCode) {
					callback(new Error('验证码输入错误'))
				} else {
					callback()
				}
			}
		}
		return {
			currentRoute: '/',
			dialogVisible: false,
			input: '',
			active: '0',
			loginForm: {
				visible: false,
				codeDisable: false,
				codeLoading: false,
				countdown: 30,
				securityCode: '',
				interval: null,
				form: {	// 登录表单的信息
					username: '',
					password: '',
					telephone: '',
					securityCode: ''
				}
			},
			// 登录校验
			loginRules: {
				telephone: [{ required: true, min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }],
				securityCode: [{ required: true, validator: validSecurityCode }],
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 4, max: 11, message: '请输入4-8位的用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 16, message: '请输入6-16位的密码', trigger: 'blur' }
				],
			},

			// 修改信息
			editMsg: {
				visible: false,
				isEdit: false,
				form: {},
			},
			// 更换手机号
			phoneMsg: {
				visible: false,
				codeDisable: false,
				codeLoading: false,
				countdown: 30,
				securityCode: '',
				interval: null,
				form: {
					telephone: '',
					securityCode: ''
				}
			},
			// 新增/修改地址
			addressMsg: {
				visible: false,
				isEdit: false,
				form: {}
			},
			cityCode: [],
			// 地址校验
			addressRules: {
				name: [
					{ required: true, message: '请输入收件人姓名' },
					{ min: 2, max: 4, message: '请输入2-4位的收件人姓名' },
					{ pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入正确的姓名格式' }
				],
				telephone: [{ required: true, min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }],
				addressCode: [{ required: true, message: '请选择省市' }],
				addressDetail: [
					{ required: true, message: '请输入具体地址' },
					{ pattern: /^[A-Za-z0-9-\u4E00-\u9FA5]+$/, message: '请输入正确的地址格式' }
				],
			},
			dropdownMenu: true,

			//修改校验
			editRules: {
				aliase: [
					{ required: false, message: '请输入昵称' },
					{ max: 8, message: '昵称不可超过8位字符' }
				],
				password: [
					{ required: false, message: '请输入密码' },
					{ min: 6, max: 16, message: '请输入6-16位的密码' }
				],
				nickname: [
					{ required: true, message: '请输入姓名' },
					{ min: 2, max: 4, message: '请输入2-4位的姓名' }
				],
				telephone: [{required: true, message: '请输入联系电话'}],
				address: [{required: false, message: '请输入收货地址'}]
			}
		}
	},
	computed: {
		...mapState({
			userMsg: state => state.userMsg
		}),
		...mapGetters(['getUserMsg'])
	},
	watch: {
		'$route': function (to, from) {
			this.currentRoute = to.path
		}
	},
	methods: {
		...mapActions(['toSetUserMsg']),
		handleCommand (command) {
			if(command == 'logout') {
				this.toSetUserMsg({})
				this.$message.success('退出登录')
			}
			if (command == 'showMsg') {
				this.editMsg.isEdit = false
				this.editMsg.visible = true
			}
		},
		// 点击你好请登录/用户名
		login (e) {
			if (!this.getUserMsg.username) {
				this.dropdownMenu = false
				this.loginForm.visible = true
			} else {
				this.dropdownMenu = true
			}
		},
		// 登录模态框 打开
		handleLoginOpen () {
			this.active = '0'
		},
		// 登录模态框 关闭
		handleLoginClose () {
			this.$refs.loginDialog1.resetFields()
			this.$refs.loginDialog2.resetFields()
			this.loginForm = {
				visible: false,
				codeDisable: false,
				codeLoading: false,
				countdown: 30,
				securityCode: '',
				interval: null,
				form: {
					username: '',
					password: '',
					telephone: '',
					securityCode: ''
				}
			}
		},
		handleTabClick (tab, event) {
			this.$refs.loginDialog1.resetFields()
			this.$refs.loginDialog2.resetFields()
			this.loginForm = {
				visible: true,
				codeDisable: false,
				codeLoading: false,
				countdown: 30,
				securityCode: '',
				interval: null,
				form: {
					username: '',
					password: '',
					telephone: '',
					securityCode: ''
				}
			}
		},
		// 关闭登录模态框
		closeLoginForm () {
			this.loginForm.visible = false
			this.loginForm.form = {}
		},
		// 获取验证码
		async getSecurityCode () {
			let that = this
			let type
			if (this.loginForm.visible) {
				type = 'loginForm'
			}
			if (this.phoneMsg.visible) {
				type = 'phoneMsg'
			}

			let form
			switch (type) {
				case 'loginForm':
					form = this.loginForm.form
					break
				case 'phoneMsg':
					form = this.phoneMsg.form
					break
			}
			if (form.telephone && form.telephone.length === 11) {
				// 检验手机号是否已被注册
				let params = {
					telephone: form.telephone,
					justValid: true
				}
				this[type].codeLoading = true
				let { data: res } = await axios.get('/user/findPhone', { params })
				this[type].codeLoading = false
				if (!res.success) {
					this.$message.error(res.desc)
					return false
				} else if (type === 'loginForm' && res.data === 0) {
					this.$message.warning('该手机号尚未注册')
					return false
				}
				setTimeout(() => {
					that[type].securityCode = (Math.random() + '').substr(2, 6)
					console.log(that[type].securityCode)
					that.$message.success('验证码已生成')
					that[type].codeDisable = true
					that[type].interval = setInterval(() => {
						that[type].countdown--
						if (that[type].countdown === 0) {
							clearInterval(that[type].interval)
							that[type].codeDisable = false
							that[type].securityCode = ''
							that[type].countdown = 30
						}
					}, 1000)
				}, 200)
			} else {
				this.$message.warning('请输入11位手机号')
			}
		},
		// 关闭用户信息模态框
		closeUsermsg () {
			this.editMsg.visible = false
		},
		// 登录校验
		async toLogin () {
			let params
			let form = this.loginForm.form
			if (this.active === '0') {
				this.$refs.loginDialog1.validate(async valid => {
					if (valid) {
						params = {
							telephone: form.telephone,
							justValid: false
						}
						let { data: res } = await axios.get('/user/findPhone', { params })
						if (res.success) {
							let data = res.data[0]
							data.address = JSON.parse(JSON.stringify(data.address))
							this.toSetUserMsg(data)
							this.$refs.loginDialog1.resetFields()
							this.loginForm.visible = false
							this.$message.success('登录成功')
						} else {
							this.$message.error(res.desc)
						}
					}
				})
			}
			if (this.active === '1') {
				this.$refs.loginDialog2.validate(async valid => {
					if (valid) {
						params = {
							username: form.username,
							password: form.password,
						}
						let { data: res } = await axios.get('/user/login', { params })
						if (res.success) {
							let res = await axios.get('/user/findUser', {
								params: { username: form.username }
							})
							let data = res.data[0]
							data.address = JSON.parse(data.address)
							this.toSetUserMsg(data)
							this.$refs.loginDialog2.resetFields()
							this.loginForm.visible = false
							this.$message.success('登录成功')
						} else {
							this.$message.error(res.desc)
						}
					}
				})
			}
		},

		// 点击修改信息
		toEdit () {
			this.editMsg.isEdit = true
			this.editMsg.form = _.cloneDeep(this.userMsg)
			this.editMsg.form.password = ''
		},
		// 取消修改
		closeModify () {
			this.editMsg.isEdit = false
			this.$refs.editDialog.resetFields()
		},
		// 保存修改个人信息
		async saveUsermsg () {
			this.$refs.editDialog.validate(async valid => {
				if (valid) {
					console.log(this.editMsg.form)
					let form = _.cloneDeep(this.editMsg.form)
					form.address = form.address ? JSON.stringify(form.address) : []
					delete form.paycode
					let { data } = await axios.post('/user/updateUser', form)
					console.log(data)
					if (data.success) {
						this.$message.success('修改成功')
						this.$refs.editDialog.resetFields()
						this.editMsg.isEdit = false
					}
					// todo 更新vuex内容 提示是否设为默认地址 修改地址
				}
			})
		},
		
		// 点击修改手机号
		toChangePhone () {
			this.phoneMsg.visible = true
		},
		// 保存新手机号
		saveNewPhone () {
			this.$refs.phoneDialog.validate(valid => {
				if (valid) {
					this.editMsg.form.telephone = this.phoneMsg.form.telephone
					this.phoneMsg.visible = false
				}
			})
		},
		// 取消修改手机号
		cancelNewPhone () {
			this.$refs.phoneDialog.resetFields()
			this.phoneMsg.visible = false
		},

		// 点击新增收货地址
		addAddress () {
			this.addressMsg.isEdit = false
			this.addressMsg.visible = true
		},
		handleChange (value) {
			console.log(value)
		},
		// 保存地址
		saveAddress () {
			this.$refs.addressDialog.validate(valid => {
				if (valid) {
					let form = _.cloneDeep(this.addressMsg.form)
					form.addressLabel = this.getCodeLabel(form.addressCode)
					console.log(form)
					if (!this.editMsg.form.address) {
						this.editMsg.form.address = [form]
					} else {
						this.editMsg.form.address.push(form)
					}
					this.addressMsg.visible = false
					this.$refs.addressDialog.resetFields()
				}
			})
		},
		
		// 提交用户信息
		updateUser () {
			this.$refs.userMsgForm.validate((valid) => {
				if (valid) {
					let obj = {
						username: this.modifymsg.form.username,
						password: this.modifymsg.form.password,
						nickname: this.modifymsg.form.nickname,
						address: this.modifymsg.form.address,
						telephone: this.modifymsg.form.telephone,
					}
					axios.post('/user/updateUser', obj)
					.then(() => {
						this.$message.success('修改成功')
						axios.get('/user/findUser?username=' + obj.username)
						.then(({ data: results }) => {
							this.$message.success('登录成功')
							this.toSetUserMsg(results[0])
						})
						this.modifymsg.visible = false
						this.usermsgVisible = false
						this.$refs.userMsgForm.resetFields()
					})
					.catch(() => {
						this.$message.error('修改失败')
					})
				} else {
					console.log('error submit!!')
					return false
				}
			});
		},
		toOrder () {
			if (!this.userMsg.username) {
				this.$message({
					message: '请先登录',
					type: 'warning'
				})
			} else {
				this.$router.push({
					path: '/order',
					query: {
						username: this.userMsg.username
					}
				})
			}
		},
		toShoppingcart () {
			if (!this.userMsg.username) {
				this.$message({
					message: '请先登录',
					type: 'warning'
				})
			} else {
				this.$router.push({
					path: '/shoppingcart',
					query: {
						username: this.userMsg.username
					}
				})
			}
		},
		//关键字搜索
		search () {
			this.$router.push({
				path: '/plate/overview',
				query: {
					key: this.input
				}
			})
		},

		/* -----------------------------------工具函数-----------------------------------*/
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
		}
	},
	created () {
		this.cityCode = JSON.parse(JSON.stringify(cityCode))
	},
	mounted () {
		let that = this
		setTimeout(() => {
			that.dialogVisible = true
		}, 500)
	},
}
</script>

<style scoped>
	.addressItem {
		line-height: normal;
		padding: 5px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
	}
</style>