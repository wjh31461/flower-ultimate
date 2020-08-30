<template>
	<div class="order">
		<div class="wrapper order-wrapper">
			<el-table
		    ref="multipleTable"
		    :data="msg"
		    tooltip-effect="dark"
		    style="width: 100%">
		    <el-table-column
		      label="商品信息"
		      width="399">
		      <template slot-scope='{row}'>
		      	<img :src="row.form.src">
		      	<span style='position: relative; bottom: 40px;'>{{row.form.name}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="单价"
		      width="200"
		      align='center'>
		      <template slot-scope='{row}'>
		      	<span>￥{{row.form.pricel}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="数量"
		      width="200"
		      align='center'>
		      <template slot-scope='{row}'>
		      	{{row.form.number}}
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="总计"
		      width="200"
		      align='center'>
		      <template slot-scope='{row}'>
		      	<div>￥{{row.form.number * row.form.pricel}}</div>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      width='200'>
		      <template slot-scope='{row}'>
		      	<span @click='deletecommodity(row)'>删除</span><!-- 此处删除应传row.id -->
		      	<span @click='show(row)'>查看详情</span>

		      	<el-dialog title="订单详情" :visible.sync="row.visible">
					  	<div class="order-receiver">
					  		<span>收件人：</span>
					  		<span>{{row.form.nickname}}</span>
					  	</div>
					  	<div class="order-telephone">
					  		<span>联系电话：</span>
					  		<span>{{row.form.telephone}}</span>
					  	</div>
					  	<div class="order-address">
					  		<span>收货地址：</span>
					  		<span>{{row.form.address}}</span>
					  	</div>
					  	<div class="order-commodity">
					  		<div class="order-commoditytitle">
									<div class="title-msg">商品信息</div>
									<div class="title-price">单价</div>
									<div class="title-number">数量</div>
									<div class="title-total">总计</div>
					  		</div>
					  		<div class="order-commoditymsg">
							  	<div class="order-img"><img :src="row.form.src" alt=""></div>
							  	<div class="order-msg">{{row.form.name}}</div>
							  	<div class="order-price">￥{{row.form.pricel}}</div>
							  	<div class="order-number">{{row.form.number}}</div>
							  	<div class="order-total">￥{{row.form.number * row.form.pricel}}</div>
							  </div>
					  	</div>
						</el-dialog>
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
		
	</div>
</template>

<script>
import axios from '@/http/axios'
export default {
	props:['usermsg'],
	data(){
		return {
			/*msg:[{
				visible:false,
				form:{
					nickname:'刘浩',
					telephone:'18454236834',
					address:'江苏省苏州市昆山市巴城镇学院路999号美居客电商产业大楼',
					id:'300',
					number:'2',
					src:'/static/love-1.jpg'
				}
			},{
				visible:false,
				form:{
					nickname:'南宫',
					telephone:'112356',
					address:'浙江省杭州市滨江区',
					id:'307',
					number:'1',
					src:'/static/love-8.jpg'
				}
			}],*/
			msg: [],
			order: [],
			commodity: []
		}
	},
	watch: {
    '$parent.usermsg.form.username': function () {
      if (this.$parent.usermsg.form.username == undefined) {
      	this.$router.push('/')
      }
    }
  },
	created () {
		this.findOrderByUsername()
	},
	methods: {
		findOrderByUsername () {
			this.msg = []
      this.order = []
      this.commodity = []
			axios.get('/order/findOrderByUsername?username=' + this.$route.query.username)
			.then(({ data: results }) => {
				this.$message.success('order查询成功')
				this.order = results
				// console.log(this.order)
				let ids = this.order.map((item) => {
					return item.id
				})
				this.findCommodityByIds(ids)
			})
			.catch(() => {
				this.$message.error('查询失败')
			})
		},
		findCommodityByIds (ids) {
			// console.log({ids})//{ids:['300','304','308']}
			if (ids.length == 1) {
				axios.get('/commodity/findCommodityById?id=' + ids[0])
				.then(({ data: results }) => {
					this.$message({
						message: 'id查询成功',
						type: 'success'
					})
					this.commodity = results
					let obj = {
						visible: false,
						form: {
							id: this.order[0].id,
							nickname: this.order[0].nickname,
							telephone: this.order[0].telephone,
							address: this.order[0].address,
							number: this.order[0].number,
							src: this.commodity[0].src,
							name: this.commodity[0].name,
							pricel: this.commodity[0].pricel,
						}
					}
					this.msg.push(obj)
				})
			} else {
				axios.post('/commodity/findCommodityByIds', { ids })
				.then(({ data: results }) => {
					this.$message({
						message: 'ids查询成功',
						type: 'success'
					})
					this.commodity = results

					for(let i = 0; i < this.order.length; i++){
						let obj = {
							visible: false,
							form: {
								id: this.order[i].id,
								nickname: this.order[i].nickname,
								telephone: this.order[i].telephone,
								address: this.order[i].address,
								number: this.order[i].number,
								src: this.commodity[i].src,
								name: this.commodity[i].name,
								pricel: this.commodity[i].pricel,
							}
						}
						this.msg.push(obj)
					}
				})
				.catch(() => {
					this.$message.error('ids查询失败')
				})
			}
		},
		deletecommodity (row) {
			this.$confirm('确认删除商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
    		axios.get('/order/deleteOrder?username=' + this.$parent.usermsg.form.username + '&id=' + row.form.id + '')
    		.then(() => {
    			this.$message.success('删除成功!')
          this.findOrderByUsername()
    		})
    		.catch(() => {
    			this.$message.error('删除失败')
    		})
      })
		},
		show (row) {
			row.visible = true
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
	.order-wrapper .el-table__body-wrapper tbody > * > td:last-child > div >span {
		cursor: pointer;
	}
	.order-wrapper .el-table__body-wrapper tbody > * > td:last-child > div >span:first-child {
		color: red;
	}
	.el-table__body-wrapper tbody > * > td:last-child > div .el-dialog__body > .order-receiver > span:first-child {
		margin-right: 15px;
	}
	.el-dialog__body > * {
		margin-bottom: 10px;
	}
	.el-dialog__body > .order-commodity {
		margin: 35px 0 0;
	} 
	.order-commodity .order-commoditytitle > * {
		float: left;
		width: 150px;
		text-align: center;
	}
	.order-commoditytitle > .title-msg {
		width: 269px;
		text-align: left;
	}
	.order-commodity > .order-commoditymsg > * {
		float: left;
		width: 150px;
		text-align: center;
		height: 100px;
		line-height: 100px;
	}
	.order-commoditymsg .order-img {
		width: 100px;
	}
	.order-commoditymsg .order-msg {
		width: 169px;
		padding-left: 10px;
		text-align: left;
	} 

	.order-commoditytitle::after,
	.order-commoditymsg::after {
		content: '';
		display: block;
		clear: both;
	}
</style>