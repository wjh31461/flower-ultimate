<template>
	<div class="register">
		<div class="wrapper register-wrapper">
			<div class="register-msg">
				<div class="register-title">注册</div>
				<div>
					<el-steps :active="active" finish-status="success">
					  <el-step title="绑定手机号"></el-step>
					  <el-step title="基本信息"></el-step>
					  <el-step title="用户信息"></el-step>
					  <el-step title="注册成功"></el-step>
					</el-steps>
				</div>

				<div v-show='active === 0' class="register-form">
					<el-form :model="user" ref='phoneForm' :rules='rules' status-icon label-position='left'>
						<el-form-item prop='telephone'>
							<el-input v-model="user.telephone" :maxlength='11' placeholder='请输入11位手机号' clearable></el-input>
						</el-form-item>
						<el-form-item prop='securityCode'>
							<el-input v-model="user.securityCode" :maxlength='6' placeholder='请输入验证码' style='width: 50%;'></el-input>
							<el-button @click='getSecurityCode()' :loading='codeLoading' :disabled='disable' style='width: 45%; float: right;'>
								<span v-if='!disable'>获取验证码</span>
								<span v-else>{{countdown}}s后可获取</span>
							</el-button>
						</el-form-item>
						<el-form-item prop='pass'>
							<slider @pass='checkSlider()'></slider>
						</el-form-item>
					</el-form>
				</div>

				<div v-show='active === 1' class='register-form'>
					<el-form :model="user" ref='basicForm' :rules='rules' status-icon label-position='left'>
						<el-form-item label="用户名" prop='username' label-width="80px">
							<el-input v-model="user.username" :minlength='4' :maxlength='8' placeholder='请输入用户名'></el-input>
						</el-form-item>
						<el-form-item label="登录密码" prop='password' label-width="80px">
							<el-input v-model="user.password" :minlength='6' :maxlength='16' show-password></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop='checkpass' label-width="80px">
							<el-input v-model="user.checkpassword" :minlength='6' :maxlength='16' show-password></el-input>
						</el-form-item>
					</el-form>
				</div>

				<div v-show='active === 2' class='register-form'>
					<el-form :model="user" ref='userForm' :rules='rules' status-icon label-position='left'>
						<el-form-item label="昵称" prop='aliase' label-width="80px">
							<el-input v-model="user.aliase" :minlength='4' :maxlength='8' placeholder='请输入昵称'></el-input>
						</el-form-item>
						<el-form-item label="真实姓名" prop='nickname' label-width="80px">
							<el-input v-model="user.nickname" :minlength='2' :maxlength='4'></el-input>
						</el-form-item>
					</el-form>
				</div>

				<div v-show='active === 3' class='register-form'>
					<div class='register-success'>
						<span>注册成功!</span>
						<span>{{backCount}}s后返回首页</span>
					</div>
				</div>
				<div class="register-buttom">
					<el-button v-if='active !== 0 && active !== 3' @click='previous()' style='width: 45%;'>上一步</el-button>
					<el-button v-if='active !== 3' @click='next()' :loading='loading' style='width: 45%; float: right;'>下一步</el-button>
				</div>
			</div>
		</div>

		<!-- 设置支付密码 -->
		<el-dialog
			:title="paycode.status === 1 ? '请输入支付密码' : '请确认支付密码'"
			:visible.sync="paycodeVisible"
			:close-on-press-escape='false'
			>
			<paycode ref='paycode' @ok='paycodeStatusChange' @paycode-back='paycodeBack'></paycode>
		  <span slot="footer" class="dialog-footer">
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import axios from '@/http/axios'
export default {
	name: 'register',
	components: {},
	data () {
		var validSlider = (rule, value, callback) => {
			if (!this.user.pass) {
				callback(new Error('请滑动滑块验证'))
			} else {
				callback()
			}
		}
		var validSecurityCode = (rule, value, callback) => {
			if (!this.user.securityCode) {
				callback(new Error('请输入验证码'))
			} else if (this.user.securityCode !== this.securityCode) {
				callback(new Error('验证码输入错误'))
			} else {
				callback()
			}
		}

		var validPassword2 = (rule, value, callback) => {
			if (!this.user.checkpassword) {
				callback(new Error('请再次输入密码'))
			} else if (this.user.checkpassword !== this.user.password) {
				callback(new Error('两次输入密码不一致'))
			} else {
				callback()
			}
		}

		return {
			active: 0,
			// 用户注册信息全量
			user: {
				telephone: '',
				securityCode: '',
				pass: false,

				username: '',
				password: '',
				checkpassword: '',

				aliase: '',
				paycode: '',
				nickname: ''
			},
			
			// 校验规则
			rules: {
				telephone: [
					{ required: true, message: '请输入11位手机号' },
					{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确的手机号格式' }
				],
				pass: [{ required: true, validator: validSlider }],
				securityCode: [{ required: true, validator: validSecurityCode }],

				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 4, max: 11, message: '请输入4-8位的用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 16, message: '请输入6-16位的密码', trigger: 'blur' }
				],
				checkpass: [{ required: true, validator: validPassword2, trigger: 'blur' }],

				aliase: [{ required: false, message: '请输入昵称', trigger: 'blur' }],
				paycode: [{ required: true, message: '请设置支付密码' }],
				nickname: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
					{ min: 2, max: 4, message: '请输入2-4位的姓名', trigger: 'blur' }
				]
			},

			disable: false,
			codeLoading: false,
			securityCode: '',
			countdown: 30,
			interval: null,
			loading: false,

			paycodeVisible: false,
			paycode: {
				status: 1,	// 1 -> 输入密码 2 -> 确认密码
				code1: [],
				code2: []
			},
			backCount: 5,
			backInterval: null
		}
	},
	methods: {
		// 上一步
		previous () {
			this.active -= 1
		},
		// 下一步
		async next () {
			switch (this.active) {
				case 0:
					this.$refs.phoneForm.validate((valid) => {
						console.log(valid)
						if (valid) {
							this.$refs.basicForm.resetFields()
							this.active = 1
						}
					})
					break
				case 1:
					this.$refs.basicForm.validate(async (valid) => {
						if (valid) {
							let params = {
								username: this.user.username
							}
							this.loading = true
							let { data: res } = await axios.get('/user/findUsername', { params })
							this.loading = false
							if (!res.success) {
								this.$message.error(res.desc)
								return false
							} else if (res.data) {
								this.$message.warning('该用户名已被使用')
								return false
							}
							this.active = 2
						}
					})
					break
				case 2:
					this.$refs.userForm.validate((valid) => {
						console.log(valid)
						if (valid) {
							this.paycodeVisible = true
							this.paycode = {
								status: 1,
								code1: [],
								code2: []
							}
						}
					})
					break
			}
		},

		// -------------------------------第一步 绑定手机号-------------------------------
		// 获取验证码
		async getSecurityCode () {
			let that = this
			if (this.user.telephone && this.user.telephone.length === 11) {
				// 检验手机号是否已被注册
				let params = {
					telephone: this.user.telephone,
					justValid: true
				}
				this.codeLoading = true
				let { data: res } = await axios.get('/user/findPhone', { params })
				this.codeLoading = false
				if (!res.success) {
					this.$message.error(res.desc)
					return false
				} else if (res.data > 0) {
					this.$message.warning('该手机号已被注册')
					return false
				}
				setTimeout(() => {
					that.securityCode = (Math.random() + '').substr(2, 6)
					console.log(that.securityCode)
					that.$message.success('验证码已生成')
					that.disable = true
					that.interval = setInterval(() => {
						that.countdown--
						if (that.countdown === 0) {
							clearInterval(that.interval)
							that.disable = false
							that.securityCode = ''
							that.countdown = 30
						}
					}, 1000)
				}, 200)
			} else {
				this.$message.warning('请输入11位手机号')
			}
		},
		// 滑块校验
		checkSlider () {
			this.user.pass = true
		},

		// -------------------------------第三步 用户信息-------------------------------
		// 支付密码 确定
		async paycodeStatusChange (paycode) {
			let status = this.paycode.status
			if (status === 1) {
				this.paycode.code1 = paycode
				this.paycode.status = 2
			}
			if (status === 2) {
				this.paycode.code2 = paycode
				if (this.paycode.code1.join('') !== this.paycode.code2.join('')) {
					this.$message.warning('两次输入密码不一致')
					return false
				}
				this.user.paycode = this.paycode.code2.join('')
				this.paycodeVisible = false
				this.loading = true
				// 调接口注册
				let { data: res } = await this.submitForm()
				if (res.success) {
					this.active = 3
					this.$message({
						message: '注册成功！',
						type: 'success'
					})
					// 5s后返回首页
					let that = this
					this.backInterval = setInterval(() => {
						that.backCount--
						if (that.backCount === 0) {
							clearInterval(that.backInterval)
							that.backCount = 5
							that.$router.push('/')
						}
					}, 1000)
				}
			}
		},
		paycodeBack () {
			let status = this.paycode.status
			if (status === 1) {
				this.paycode.code1 = []
				this.paycode.code2 = []
				return false
			}
			if (status === 2) {
				this.paycode.code1 = []
				this.paycode.code2 = []
				this.paycode.status = 1
			}
		},

		submitForm () {
			return new Promise((res, rej) => {
				let params = _.cloneDeep(this.user)
				delete params.checkpass
				delete params.checkpassword
				delete params.pass
				delete params.securityCode
				let result = axios.post('/user/insertUser', params)
				res(result)
			})
		}
	}
}
</script>

<style>
	.register-wrapper {
		background: url('../../static/z-login2.jpg') 0 0 no-repeat;
		height: 500px;
		background-size: contain;
	}
	.register-wrapper::after {
		content: '';
		display: block;
		clear: both;
	}
	.register-wrapper .register-msg {
		width: 400px;
		background-color: rgba(247,99,114,0.1);
		border-radius: 20px;
		float: right;
		margin-top: 20px;
		box-shadow:#ccc 0px 0px 10px;
		padding: 20px 30px;
	}
	.register-msg .register-title {
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
	}
	.register-msg .register-form {
		margin-top: 20px;
	}
	.register-msg .register-buttom button {
		width: 100%;
		color: #fff;
		background-color: #f76372;
		margin-top: 50px;
		border: 1px solid #f76372;
	}
	.register-msg .register-form .register-success {
		text-align: center;
		font-size: 16px;
	}
</style>