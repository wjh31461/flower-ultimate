<template>
	<div id='editAddr'>
		<el-form :model="data" :rules='rules' ref='dialog' label-position='left'>
			<el-form-item label="收件人姓名" label-width="100px" prop='name'>
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="手机号" label-width="100px" prop='telephone'>
				<el-input v-model="form.telephone" :maxlength='11'></el-input>
			</el-form-item>
			<el-form-item label="地址" label-width="100px" prop='addressCode'>
				<el-cascader
					v-model="form.addressCode"
					:options="cityCode"
					clearable
					placeholder='请选择省市'
					/>
			</el-form-item>
			<el-form-item label="" label-width="100px" prop='addressDetail'>
				<el-input type='textarea' v-model="form.addressDetail" :rows="2" :maxlength='20' placeholder='具体地址'></el-input>
			</el-form-item>
		</el-form>

		<div>
			设为默认地址
			<el-switch
			  v-model="form.isMain"
			  active-color="#13ce66"
			  inactive-color="#ccc"
			  >
			</el-switch>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import cityCode from '../data/city.json'

export default {
	props: ['isEdit', 'data', 'index'],
	data () {
		return {
			cityCode: [],
			form: {},
			rules: {
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
	methods: {
		...mapActions(['toSetUserMsg']),
		async saveAddress () {
			return new Promise((resolve, reject) => {
				this.$refs.dialog.validate(async valid => {
					if (valid) {
						let form = _.cloneDeep(this.userMsg)
						let res

						if (this.form.isMain) {
							form.address.forEach(item => {
								item.isMain = false
							})
						}
						form.address.forEach(item => {
							delete item.addressLabel
						})
						if (this.isEdit) {
							form.address[this.index] = this.form
						} else {
							form.address.push(this.form)
						}
						form.address = JSON.stringify(form.address)
						res = await axios.post('/user/updateUser', form)
						
						if (res.data.success) {
							let res1 = await axios.get('/user/findUser', {
								params: { username: form.username }
							})
							this.updateUserData(res1.data.data[0])
							resolve(true)
						} else {
							this.$message.error(res.data.desc)
						}
					}
				})
			})
		},
		resetFields () {
			this.$refs.dialog.resetFields()
		},
		// -----------------------------------工具函数------------------------------------
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
	computed: {
		...mapState({
			userMsg: state => state.userMsg
		})
	},
	watch: {
		data: {
			immediate: true,
			// 这里不能写箭头函数
			handler: function (val, oldVal) {
				if (val) {
					this.form = val
				}
			}
		}
	}
}
</script>