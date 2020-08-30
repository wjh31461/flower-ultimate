<template>
	<div class="commodity">
		<div class="commodity-content">
			<div class="wrapper commodity-wrapper">
				<div class="commodity-left">
					<ul>
						<li v-for='imgnav in commodity.src'>
							<img :src="imgnav.src" alt="">
							<img :src="imgnav.src" alt="">
						</li>
					</ul>
				</div>
				<div class="commodity-right">
					<div class="commodity-name">鲜花花名：{{commodity.name}}</div>
					<div class="commodity-msg">
						<div class="commodity-id">
							<span class="commoditymsg-left">鲜花id：</span>
							<span class="commoditymsg-right">{{commodity.id}}</span>
						</div>
						<div class="commodity-material">
							<span class="commoditymsg-left">鲜花材料：</span>
							<span class="commoditymsg-right">{{commodity.material}}</span>
						</div>
						<div class="commodity-language">
							<span class="commoditymsg-left">鲜花花语：</span>
							<span class="commoditymsg-right">{{commodity.language}}</span>
						</div>
						<div class="commodity-packing">
							<span class="commoditymsg-left">鲜花包装：</span>
							<span class="commoditymsg-right">{{commodity.packing}}</span>
						</div>
						<div class="commodity-language">
							<span class="commoditymsg-left">配送范围：</span>
							<span class="commoditymsg-right">全国(市区免配送费~)</span>
						</div>
					</div>
					<div class="commodity-price">
						<div class="commodity-price1">市场价：￥{{commodity.priceh}}</div>
						<div class="commodity-price2">
							<span>现价：</span>
							<span>￥{{commodity.pricel}}</span>
						</div>
						<div class="commodity-buy">
							<div class="number">
								<span>数量：</span>
								<el-input-number v-model="number" @change='handleChange' :precision="0" :min="1" :max="99"></el-input-number>
							</div>
							<a @click='buy' class="buy">立即购买</a>
							<a class="addshoppingcart" @click='addshoppingcart'><i class="fa fa-shopping-cart"></i>加入购物车</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from '@/http/axios'
export default {
	props: ['username'],
	data () {
		return {
			commodity: {},
			src: [{}, {}, {}],
			number: '1'
		}
	},
	watch: {},
	created () {
		this.findCommodityById()
	},
	methods: {
		/*BlurText(e){
			// 数量限制为正整数
			let boolean=new RegExp('^[1-9][0-9]*$').test(e.target.value);
			if(!boolean){
				this.$message.warning('请输入正整数');
				e.target.value='1';
				this.$refs.number.focus();
			}
		},*/
		// 根据id查找商品
		findCommodityById () {
			axios.get('/commodity/findCommodityById?id=' + this.$route.query.id)
			.then(({ data: results }) => {
				this.commodity = results[0]	//这个没有src[]
				this.src = [{
					src: this.commodity.src1
				},{
					src: this.commodity.src2
				},{
					src: this.commodity.src3
				}]
				this.commodity.src = this.src
				this.$message.success('查询成功')
			})
			.catch(() => {
				this.$message.warning('查询失败')
			})
		},
		handleChange (value) {
			let boolean = new RegExp('^[1-9][0-9]*$').test(value)
			if (!boolean) {
				this.$message.warning('请输入正整数')
			}
		},
		// 加入购物车
		addshoppingcart () {
			if (this.$parent.$parent.username == undefined || this.$parent.$parent.username == '') {
				this.$message.warning('请先登录')
			} else {
				// 此处加入购物车
				let obj = {
					username: this.$parent.$parent.usermsg.form.username,
					id: this.commodity.id,
					number: this.number
				}
				axios.post('/cart/insertCart', obj)
				.then(() => {
					this.$message.success('加入购物车成功')
				})
				.catch(() => {
					this.$message.error('加入购物车失败')
				})
			}
		},
		// 立即购买
		buy () {
			if (this.$parent.$parent.username == undefined || this.$parent.$parent.username == '') {
				this.$message.warning('请先登录')
			} else {
				// 此处跳转到pay页
				this.$router.push({
					path: '/plate/pay',
					query: {
						id: [{ id: this.commodity.id, number: this.number }]
					}
				})
			}
		}
	}
}
</script>

<style>
	.commodity-content {
		padding-top: 35px;
	}
	.commodity-content .commodity-wrapper {
		height: 617px;
		border: 1px solid grey;
	}
	.commodity-wrapper > * {
		float: left;
		height: 100%;
	}
	.commodity-wrapper > .commodity-left {
		width: 510px;
		padding: 20px 40px;
	}
	.commodity-left ul > * {
		float: left;
		position: relative;
	}
	.commodity-left ul > * > img:last-child {
		width: 430px;
		height: 470px;
		position: absolute;
		top: 105px;
	}
	.commodity-left ul > li:nth-child(2) > img:last-child {
		left: -107px;
	}
	.commodity-left ul > li:nth-child(3) > img:last-child {
		left: -214px;
	}
	.commodity-left ul > * > img:first-child {
		width: 75px;
		height: 75px;
		position: relative;
		/*top: 475px;*/
		border: 1px solid rgba(247,99,114,0.3);
		padding: 5px;
		margin-right: 20px;
	}
	.commodity-left ul > * > img:first-child:hover {
		border: 1px solid #f76372;
	}
	.commodity-left ul > * > img:first-child:hover + img {
		z-index: 20;
	}
	.commodity-wrapper > .commodity-right {
		width: 688px;
		padding: 25px;
	}
	.commodity-right .commodity-name {
		font-size: 25px;
		padding-bottom: 10px;
		border-bottom: 1px solid #ccc;
	}
	.commodity-right .commodity-msg {
		margin-top: 20px;
		font-size: 13px;
		padding-bottom: 20px;
		border-bottom: 1px solid #ccc;
	}
	.commodity-msg > *,
	.commodity-price > * {
		margin-bottom: 15px;
	}
	.commodity-msg > * > span.commoditymsg-left {
		float: left;
	}
	.commodity-msg > * > span.commoditymsg-right {
		display: block;
		margin-left: 80px;
	}
	.commodity-right .commodity-price {
		margin-top: 20px;
	}
	.commodity-price .commodity-price1 {
		font-size: 18px;
		text-decoration: line-through;
	}
	.commodity-price .commodity-price2 {
		font-size: 25px;
	}
	.commodity-price2 span:last-child {
		color: #f76372;
		font-weight: bold;
	}
	.commodity-price .commodity-buy .number > * {
		float: left;
	}
	.number > span {
		display: inline-block;
		line-height: 40px;
	}
	.number > .el-input {
		width: 100px;
	}
	.number > .el-input input {
		text-align: center;
	}
	.commodity-price .commodity-buy {
		padding-top: 20px;
	}
	.commodity-buy .number{
		margin-bottom: 30px;
	}
	.commodity-buy .buy,
	.commodity-buy > a {
		display: inline-block;
		width: 160px;
		height: 50px;
		font-size: 18px;
		text-align: center;
		line-height: 50px;
		cursor: pointer;
		border-radius: 4px;
		border: 1px solid #f76372;
		border-radius: 3px;
	}
	.commodity-buy .buy {
		background-color: #f76372;
		color: #fff;
		margin-right: 20px;
	}
	.buy:hover {
		background-color: rgba(247,99,114,0.9);
	}
	.commodity-buy > a.addshoppingcart {
		background-color: #f5f3ef; 
		cursor: pointer;
	}
	.commodity-buy > a.addshoppingcart:hover {
		background-color: #fff;
	}
	.commodity-buy > a.addshoppingcart .fa-shopping-cart {
		margin-right: 10px;
	}
	.commodity-wrapper::after,
	.commodity-msg > *::after,
	.commodity-buy .number::after {
		content: '';
		display: block;
		clear: both;
	}
</style>