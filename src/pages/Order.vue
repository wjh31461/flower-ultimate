<template>
	<div class="order">
		<div class="wrapper order-wrapper">
			<el-table
				ref="multipleTable"
				:data="tableList"
				tooltip-effect="dark"
				empty-text='暂无订单'
				style="width: 100%;"
				>
				<el-table-column
					label="商品信息"
					width="399">
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
						{{row.number}}
					</template>
				</el-table-column>
				<el-table-column
					label="总计"
					width="200"
					align='center'>
					<template slot-scope='{row}'>
						<div>￥{{row.number * row.pricel}}</div>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					width='200'>
					<template slot-scope='{row}'>
						<span @click='deleteCommodity(row)' style='cursor: pointer; color: red;'>删除</span>
						<span @click='show(row)' style='cursor: pointer;'>查看详情</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
		<el-dialog title="订单详情" :visible.sync="visible">
			<div class='marginB10'>订单号：{{detail.orderId}}</div>
			<div class='marginB10'>交易号：{{detail.dealId}}</div>
			<div class='marginB10'>收件人：{{detail.name}}</div>
			<div class='marginB10'>联系电话：{{detail.telephone}}</div>
			<div class='marginB10'>收货地址：<span>{{detail.addressStr}}</span></div>

			<div class="order-commodity">
				<el-row>
					<el-col :span='4' class='textCenter'>&nbsp;</el-col>
					<el-col :span='5' class='textCenter'>商品名称</el-col>
					<el-col :span='5' class='textCenter'>单价</el-col>
					<el-col :span='5' class='textCenter'>数量</el-col>
					<el-col :span='5' class='textCenter'>总计</el-col>
				</el-row>

				<el-row>
					<el-col :span='4' class=''><img :src="detail.src" alt="" @click='viewComDetail(detail)' class='detailImg' title='点击查看商品详情'></el-col>
					<el-col :span='5' class='textCenter detailItem'>{{detail.commodityName}}</el-col>
					<el-col :span='5' class='textCenter detailItem'>￥{{detail.pricel}}</el-col>
					<el-col :span='5' class='textCenter detailItem'>{{detail.number}}</el-col>
					<el-col :span='5' class='textCenter detailItem'>￥{{detail.number * detail.pricel}}</el-col>
				</el-row>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import axios from '@/http/axios'
import _ from 'lodash'
import { mapState } from 'vuex'
import cityCode from '../data/city.json'

export default {
	props: ['usermsg'],
	data () {
		return {
			cityCode: [],
			tableList: [],
			order: [],
			commodity: [],
			commodityIds: [],

			// 详情
			visible: false,
			detail: {}
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
	computed: {
		...mapState({
			userMsg: state => state.userMsg
		})
	},
	async created () {
		this.cityCode = JSON.parse(JSON.stringify(cityCode))
		this.findTableData()
	},
	methods: {
		// 查数据
		async findTableData () {
			await this.findOrderByUsername()
			this.findCommodityByIds(this.commodityIds)
		},
		// 根据用户名查订单信息
		async findOrderByUsername () {
			if (!this.userMsg.username) {
				return false
			}

			this.tableList = []
			this.order = []
			this.commodity = []
			let params = {
				username: this.userMsg.username
			}
			await axios.get('/order/findOrderByUsername', { params })
			.then(res => {
				if (!res.data.success) {
					this.$message.error(res.data.desc)
					return false
				}
				
				this.order = res.data.data
				let ids = this.order.map((item) => {
					return item.id
				})
				this.commodityIds = [...new Set(ids)]
			})
			.catch(() => {
				this.$message.error('查询失败')
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
				// axios.get('/commodity/findCommodityById', { params })
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
			this.order.forEach(order => {
				this.commodity.forEach(com => {
					if (order.id === (com.id + '')) {
						let obj = _.cloneDeep(order)
						obj.src = com.src
						obj.commodityName = com.name
						obj.pricel = com.pricel
						obj.address = JSON.parse(obj.address)
						obj.addressStr = this.getCodeLabel(obj.address.addressCode).join('') + obj.address.addressDetail
						this.tableList.push(obj)
					}
				})
			})
		},
		// 获取地址码对应显示
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

		// 删除订单
		deleteCommodity (row) {
			this.$confirm('确认删除商品？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {
					orderId: row.orderId,
					dealId: row.dealId
				}
				axios.get('/order/deleteOrder', { params })
				.then(res => {
					if (!res.data.success) {
						this.$message.error(res.data.desc)
						return false
					}
					this.$message.success('删除成功')
					this.findTableData()
				})
				.catch(() => {
					this.$message.error('删除失败')
				})
			}).catch(() => {})
		},
		// 查看详情
		show (row) {
			this.visible = true
			this.detail = _.cloneDeep(row)
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
	.order-wrapper .el-table {
		border: 1px solid #e8e8e8;
	}
	.order-wrapper table img {
		width: 100px;
		height: 100px;
	}
	.order-wrapper .el-table__header-wrapper thead.has-gutter > tr > * {
		background-color: #f5f5f5;
		font-size: 16px;
		font-weight: normal;
	}

	.order-commodity {
		margin-top: 35px;
	}

	.detailImg {
		width: 100px;
		cursor: pointer;
	}
	.detailItem {
		height: 100px;
		padding-top: 20px;
	}
</style>