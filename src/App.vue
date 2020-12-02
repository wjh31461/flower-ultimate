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
						<router-link :to="{ path:'/plate/overview', query:{ key: '红玫瑰' }}">红玫瑰</router-link>
						&nbsp;|&nbsp;
						<router-link :to="{ path:'/plate/overview', query:{ key: '白玫瑰' }}">白玫瑰</router-link>
						&nbsp;|&nbsp;
						<router-link :to="{ path:'/plate/overview', query:{ key: '康乃馨' }}">康乃馨</router-link>
						&nbsp;|&nbsp;
						<router-link :to="{ path:'/plate/overview', query:{ key: '百合' }}">百合</router-link>
						&nbsp;|&nbsp;
						<router-link :to="{ path:'/plate/overview', query:{ key: '郁金香' }}">郁金香</router-link>
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
		<el-dialog class='loginDialog' title="登录" :visible.sync="loginVisible" center @open='handleLoginOpen' @close='handleLoginClose'>
			<el-tabs v-model="active" @tab-click="handleTabClick">
				<el-tab-pane label="手机验证码登录" name="0">
					<el-form :model="loginForm" :rules='loginRules' ref='loginDialog1' label-position='left'>
						<el-form-item label="手机号" label-width="70px" prop='telephone'>
							<el-input v-model="loginForm.telephone" :maxlength='11'></el-input>
						</el-form-item>
						<el-form-item label="验证码" label-width="70px" prop='securityCode'>
							<el-input v-model="loginForm.securityCode" :maxlength='6' placeholder='请输入验证码' style='width: 50%;'></el-input>
							<el-button @click='getSecurityCode()' :loading='loginMsg.codeLoading' :disabled='loginMsg.codeDisable' style='width: 45%; float: right;'>
								<span v-if='!loginMsg.codeDisable'>获取验证码</span>
								<span v-else>{{loginMsg.countdown}}s后可获取</span>
							</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				
				<el-tab-pane label="账号密码登录" name="1">
					<el-form :model="loginForm" :rules='loginRules' ref='loginDialog2' label-position='left'>
						<el-form-item label="用户名" label-width="70px" prop='username'>
							<el-input v-model="loginForm.username" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="密码" label-width="70px" prop='password'>
							<el-input v-model="loginForm.password" auto-complete="off" show-password></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeLoginMsg()">取 消</el-button>
				<el-button @click="toLogin()">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 个人信息 -->
		<el-dialog class='usermsgDialog' :title="editMsg.isEdit ? '修改信息' : '个人信息'" :visible.sync="editVisible" width='70%' center>
			<!-- 查看信息 -->
			<el-form v-show='!editMsg.isEdit' label-position='left'>
				<el-form-item label="用户名" label-width="100px">{{userMsg.username}}</el-form-item>
				<el-form-item label="昵称" label-width="100px">{{userMsg.aliase}}</el-form-item>
				<el-form-item label="真实姓名" label-width="100px">{{userMsg.nickname}}</el-form-item>
				<el-form-item label="手机号" label-width="100px">{{userMsg.telephone}}</el-form-item>
				<el-form-item label="收货地址" label-width="100px">
					<div v-if='userMsg.address' v-for='item in userMsg.address' class='addressItem'>
						<div>
							<span>{{item.name}} {{item.telephone}}</span>
							<span v-if='item.isMain' class='isMainAddress' style='float: right;'>默认</span>
						</div>
						<div>
							{{item.addressLabel.join('')}} {{item.addressDetail}}
						</div>
					</div>
				</el-form-item>
			</el-form>

			<!-- 修改信息 -->
			<el-form v-show='editMsg.isEdit' :model='editForm' :rules='editRules' ref='editDialog' label-position='left'>
				<el-form-item label="用户名" label-width="100px">{{editForm.username}}</el-form-item>
				<el-form-item label="昵称" label-width="100px" prop='aliase'>
					<el-input v-model="editForm.aliase" :maxlength='8' placeholder="请输入昵称"></el-input>
				</el-form-item>
				<el-form-item label="密码" label-width="100px" prop='password'>
					<el-input v-model="editForm.password" :minlength='6' :maxlength='16' placeholder="请输入新密码" auto-complete="off" show-password></el-input>
				</el-form-item>
				<el-form-item label="姓名" label-width="100px" prop='nickname'>
					<el-input v-model="editForm.nickname" :minlength='2' :maxlength='4' placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号" label-width="100px" prop='telephone'>
					{{editForm.telephone}}
					<el-button @click="toChangePhone()" style='margin-left: 5px;'>点击更换手机号</el-button>
				</el-form-item>
				<el-form-item label="收货地址" label-width="100px" prop='address'>
					<div v-if='editForm.address' v-for='(item, index) in editForm.address' class='addressItem'>
						<div>
							<span>{{item.name}} {{item.telephone}}</span>
							<span style="float: right;">
								<span v-if='item.isMain' class='isMainAddress'>默认</span>
								<i class='el-icon-edit' @click='toEditAddress(item, index)' style='cursor: pointer;' title='修改地址'></i>
								<i class='el-icon-close' @click='item.popover = true' style='cursor: pointer;' title='删除地址'></i>

								<el-popover
								  ref="popover"
								  placement="top"
								  width="160"
								  v-model="item.popover">
								  <p>确定删除该地址？</p>
								  <div style="text-align: right; margin: 0;">
								    <el-button type="text" size="mini" @click="item.popover = false">取消</el-button>
								    <el-button type="primary" size="mini" @click="deleteAddress(index)">确定</el-button>
								  </div>
								</el-popover>
							</span>
						</div>
						<div>
							{{item.addressLabel.join('')}} {{item.addressDetail}}
						</div>
					</div>
					<el-button v-if='editForm.address ? editForm.address.length < 5 : true' @click="addAddress()">新增收货地址</el-button>
					<p v-if='editForm.address ? editForm.address.length === 5 : false'>暂时只可保存5条地址~</p>
				</el-form-item>
			</el-form>

			<!-- 修改手机号 -->
			<el-dialog
				width="30%"
				title="修改手机号"
				:visible.sync="phoneVisible"
				append-to-body
				:close-on-click-modal='false'
				@close='handlePhoneMsgClose'
				>
				<el-form :model="phoneForm" :rules='loginRules' ref='phoneDialog' label-position='left'>
					<el-form-item label="手机号" label-width="70px" prop='telephone'>
						<el-input v-model="phoneForm.telephone" :maxlength='11'></el-input>
					</el-form-item>
					<el-form-item label="验证码" label-width="70px" prop='securityCode'>
						<el-input v-model="phoneForm.securityCode" :maxlength='6' placeholder='请输入验证码' style='width: 50%;'></el-input>
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
				:visible.sync="addressVisible"
				:title="(addressMsg.isEdit ? '修改' : '新增') + '收货地址'"
				width="50%"
				append-to-body
				:close-on-click-modal='false'
				@close='handleAddressClose'
				>
				<el-form :model="addressForm" :rules='addressRules' ref='addressDialog' label-position='left'>
					<el-form-item label="收件人姓名" label-width="100px" prop='name'>
						<el-input v-model="addressForm.name"></el-input>
					</el-form-item>
					<el-form-item label="手机号" label-width="100px" prop='telephone'>
						<el-input v-model="addressForm.telephone" :maxlength='11'></el-input>
					</el-form-item>
					<el-form-item label="地址" label-width="100px" prop='addressCode'>
						<el-cascader
							v-model="addressForm.addressCode"
							:options="cityCode"
							clearable
							placeholder='请选择省市'
							/>
					</el-form-item>
					<el-form-item label="" label-width="100px" prop='addressDetail'>
						<el-input type='textarea' v-model="addressForm.addressDetail" :rows="2" :maxlength='20' placeholder='具体地址'></el-input>
					</el-form-item>
				</el-form>

				<div>
					设为默认地址
					<el-switch
					  v-model="addressForm.isMain"
					  active-color="#13ce66"
					  inactive-color="#ccc"
					  >
					</el-switch>
				</div>

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
			<span>本项目为虚拟项目，请注意信息安全~</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">我知道了</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
import axios from '@/http/axios'
import _ from 'lodash'
import { mapState, mapGetters, mapActions } from 'vuex'
import cityCode from './data/city.json'

export default {
	components: {},
	data () {
		var validSecurityCode = (rule, value, callback) => {
			if (this.loginVisible) {
				if (!this.loginForm.securityCode) {
					callback(new Error('请输入验证码'))
				} else if (this.loginMsg.securityCode !== this.loginForm.securityCode) {
					callback(new Error('验证码输入错误'))
				} else {
					callback()
				}
			}
			if (this.phoneVisible) {
				if (!this.phoneMsg.securityCode) {
					callback(new Error('请输入验证码'))
				} else if (this.phoneMsg.securityCode !== this.phoneForm.securityCode) {
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
			dropdownMenu: true,
			cityCode: [],
			
			// 登录
			active: '0',
			loginVisible: false,
			loginForm: {
				username: '',
				password: '',
				telephone: '',
				securityCode: ''
			},
			loginMsg: {
				codeDisable: false,
				codeLoading: false,
				countdown: 30,
				securityCode: '',
				interval: null
			},
			// 登录校验
			loginRules: {
				telephone: [
					{ required: true, message: '请输入11位手机号' },
					{ pattern: /^1(3|4|5|7|8|9)\d{9}$/, message: '请输入正确的手机号格式' }
				],
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
			editVisible: false,
			editForm: {
				username: '',
				aliase: '',
				nickname: '',
				telephone: '',
				address: []
			},
			editMsg: {
				isEdit: false
			},
			// 修改校验
			editRules: {
				aliase: [
					{ required: true, message: '请输入昵称' },
					{ min: 2, max: 8, message: '昵称为2-8位字符' },
					{ pattern: /^[A-Za-z0-9\u4E00-\u9FA5]{2,8}$/, message: '昵称不可含有特殊字符及空格' }
				],
				password: [
					{ required: false, message: '请输入密码' },
					{ min: 6, max: 16, message: '请输入6-16位的密码' }
				],
				nickname: [
					{ required: true, message: '请输入姓名' },
					{ min: 2, max: 4, message: '请输入2-4位的姓名' },
					{ pattern: /^[A-Za-z0-9\u4E00-\u9FA5]{2,4}$/, message: '姓名不可含有特殊字符及空格' }
				],
				telephone: [
					{ required: true, message: '请输入11位手机号' },
					{ pattern: /^1(3|4|5|7|8|9)\d{9}$/, message: '请输入正确的手机号格式' }
				],
				address: [
					{ required: false, message: '请填写地址' }
				]
			},
			
			// 更换手机号
			phoneVisible: false,
			phoneForm: {
				telephone: '',
				securityCode: ''
			},
			phoneMsg: {
				codeDisable: false,
				codeLoading: false,
				countdown: 30,
				securityCode: '',
				interval: null
			},
			
			// 新增/修改地址
			addressVisible: false,
			addressForm: {},
			addressMsg: {
				isEdit: false,
				editIndex: 0
			},
			// 地址校验
			addressRules: {
				name: [
					{ required: true, message: '请输入收件人姓名' },
					{ min: 2, max: 4, message: '请输入2-4位的收件人姓名' }
				],
				telephone: [
					{ required: true, message: '请输入11位手机号' },
					{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确的手机号格式' }
				],
				addressCode: [{ required: true, message: '请选择省市' }],
				addressDetail: [
					{ required: true, message: '请输入具体地址' },
					{ pattern: /^[A-Za-z0-9-\u4E00-\u9FA5]+$/, message: '请输入正确的地址格式' }
				],
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
			let key
			if (to.query.key) {
				key = to.query.key
			}
			// todo!! 跳转时带上输入框显示关键字
			this.input = key
		}
	},
	methods: {
		...mapActions(['toSetUserMsg']),
		handleCommand (command) {
			if(command == 'logout') {
				this.toSetUserMsg({})
				let sessionStorage = window.sessionStorage
				sessionStorage.setItem('userMsg', '')
				this.$message.success('退出登录')
			}
			if (command == 'showMsg') {
				this.editMsg.isEdit = false
				this.editVisible = true
			}
		},
		
		// 点击你好请登录/用户名
		login (e) {
			if (!this.getUserMsg.username) {
				this.dropdownMenu = false
				this.loginVisible = true
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
			this.loginMsg = {
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
			this.loginMsg = {
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
		closeLoginMsg () {
			this.loginVisible = false
			this.loginForm = {}
		},
		// 获取验证码
		async getSecurityCode () {
			let that = this
			let type
			if (this.loginVisible) {
				type = 'loginMsg'
			}
			if (this.phoneVisible) {
				type = 'phoneMsg'
			}

			let form
			switch (type) {
				case 'loginMsg':
					form = this.loginForm
					break
				case 'phoneMsg':
					form = this.phoneForm
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
				} else if (type === 'loginMsg' && res.data === 0) {
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
			this.editVisible = false
		},
		// 登录校验
		async toLogin () {
			let params
			let form = this.loginForm

			if (this.active === '0') {
				this.$refs.loginDialog1.validate(async valid => {
					if (valid) {
						params = {
							telephone: form.telephone,
							justValid: false
						}
						let { data: res } = await axios.get('/user/findPhone', { params })
						if (res.success) {
							this.updateUserData(res.data[0])
							this.loginVisible = false
							this.$message.success('登录成功')
							this.$refs.loginDialog1.resetFields()
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
							let res1 = await axios.get('/user/findUser', {
								params: { username: form.username }
							})
							this.updateUserData(res1.data.data[0])
							this.loginVisible = false
							this.$message.success('登录成功')
							this.$refs.loginDialog2.resetFields()
						} else {
							this.$message.error(res.data.desc)
						}
					}
				})
			}
		},

		// 点击修改信息
		toEdit () {
			this.editMsg.isEdit = true
			this.editForm = _.cloneDeep(this.userMsg)
			this.editForm.password = ''
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
					console.log(this.editForm)
					let form = _.cloneDeep(this.editForm)
					form.address.forEach(item => {
						delete item.addressLabel
					})
					form.address = form.address ? JSON.stringify(form.address) : []
					delete form.paycode
					let { data } = await axios.post('/user/updateUser', form)
					if (data.success) {
						let res = await axios.get('/user/findUser', {
							params: { username: form.username }
						})
						this.updateUserData(res.data.data[0])
						this.$message.success('修改成功')
						this.$refs.editDialog.resetFields()
						this.editMsg.isEdit = false
					}
				}
			})
		},
		
		// 点击修改手机号
		toChangePhone () {
			this.phoneVisible = true
		},
		// 保存新手机号
		saveNewPhone () {
			this.$refs.phoneDialog.validate(valid => {
				if (valid) {
					this.editForm.telephone = this.phoneForm.telephone
					this.phoneVisible = false
				}
			})
		},
		// 取消修改手机号
		cancelNewPhone () {
			this.phoneVisible = false
		},
		// 手机号框关闭
		handlePhoneMsgClose () {
			this.$refs.phoneDialog.resetFields()
		},

		// 点击新增收货地址
		addAddress () {
			this.addressMsg.isEdit = false
			this.addressVisible = true
		},
		// 保存地址
		saveAddress () {
			this.$refs.addressDialog.validate(valid => {
				if (valid) {
					let form = _.cloneDeep(this.addressForm)
					form.addressLabel = this.getCodeLabel(form.addressCode)
					if (!this.editForm.address) {
						this.editForm.address = []
					}
					// 把地址列表的每一条isMain设为false
					if (form.isMain) {
						this.editForm.address.forEach(item => {
							item.isMain = false
						})
					}
					if (this.addressMsg.isEdit) {
						this.editForm.address[this.addressMsg.editIndex] = form
					} else {
						this.editForm.address.push(form)
					}
					this.addressVisible = false
					this.$refs.addressDialog.resetFields()
				}
			})
		},
		// 点击取消保存地址
		cancelAddress () {
			this.addressVisible = false
			this.$refs.addressDialog.resetFields()
		},
		// 删除地址
		deleteAddress (index) {
			this.editForm.address.splice(index, 1)
			this.editForm.address[index].popover = false
		},
		// 点击编辑地址
		toEditAddress (item, index) {
			this.addressForm = _.cloneDeep(item)
			this.addressMsg.editIndex = index
			this.addressMsg.isEdit = true
			this.addressVisible = true
		},
		// 地址框关闭
		handleAddressClose () {
			this.addressForm = {}
			this.$refs.addressDialog.resetFields()
		},

		// 订单
		toOrder () {
			if (!this.userMsg.username) {
				this.$message.warning('请先登录')
			} else {
				this.$router.push('/order')
			}
		},
		// 购物车
		toShoppingcart () {
			if (!this.userMsg.username) {
				this.$message.warning('请先登录')
			} else {
				this.$router.push('/shoppingcart')
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
		updateUserData (res) {
			let data = _.cloneDeep(res)
			// 获取城市码对应的名称
			data.address = JSON.parse(data.address)
			data.address.forEach(item => {
				item.addressLabel = this.getCodeLabel(item.addressCode)
			})
			// 存数据 vuex sessionStorage
			this.toSetUserMsg(data)
			let sessionStorage = window.sessionStorage
			sessionStorage.setItem('userMsg', JSON.stringify(data))
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
		// 从sessionStorage中获取数据
		let sessionStorage = window.sessionStorage
		let userMsg = sessionStorage.getItem('userMsg')
		if (userMsg) {
			this.toSetUserMsg(JSON.parse(userMsg))
		}
	},
}
</script>

<style scoped>
	.addressItem {
		line-height: normal;
		padding: 5px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 3px;
	}
	.isMainAddress {
		padding: 2px 5px;
		background-color: #f76372;
		color: #fff;
	}
</style>