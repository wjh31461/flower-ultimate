<template>
	<div class="commodity">
		<div class="commodity-content">
			<div class="wrapper commodity-wrapper">
				<div class="commodity-left">
					<ul>
						<li v-for='(item, index) in commodity.src' class='imgItem' @click='clickImg(item.src, index)' :class='{ active: item.active }'>
							<img :src="item.src" alt="">
						</li>
					</ul>
					<img :src="imgSrc" class='bigImg'>
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
								<el-input-number v-model="number" :precision="0" :min="1" :max="99" />
							</div>
							<a @click='buy()' class="buy">立即购买</a>
							<a class="addshoppingcart" @click='addShoppingcart()'><i class="fa fa-shopping-cart"></i>加入购物车</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from '@/http/axios'
import { mapState, mapGetters } from 'vuex'

export default {
	props: ['username'],
	data () {
		return {
			commodity: {},
			src: [{}, {}, {}],
			number: 1,
			imgSrc: ''
		}
	},
	watch: {},
	computed: {
		...mapState({
			userMsg: state => state.userMsg
		}),
		...mapGetters(['getUserMsg'])
	},
	created () {
		this.findCommodityById()
	},
	methods: {
		// 根据id查找商品
		async findCommodityById () {
			let params = {
				id: this.$route.query.id
			}
			let { data: res } = await axios({
				url: '/commodity/findCommodityById',
				method: 'GET',
				params
			})
			if (res.success) {
				this.commodity = res.data[0]
				this.src = [
					{
						src: this.commodity.src1,
						active: true
					},
					{ src: this.commodity.src2 },
					{ src: this.commodity.src3 }
				]
				this.commodity.src = this.src
				this.imgSrc = this.src[0].src
				this.$message.success('查询成功')
			} else {
				this.$message.warning('查询失败')
			}
		},
		
		// 点击小图片
		clickImg (src, index) {
			this.imgSrc = src
			this.src = this.src.map(item => {
				item.active = false
				return item
			})
			this.src[index].active = true
			this.commodity.src = this.src
		},
		
		// handleChange (value) {
		// 	let boolean = new RegExp(/^[1-9][0-9]*$/).test(value)
		// 	// 也可以这样写 let reg = /^[1-9][0-9]*$/ 然后 reg.test(value)
		// 	if (!boolean) {
		// 		this.$message.warning('请输入正整数')
		// 	}
		// },
		
		// 加入购物车
		async addShoppingcart () {
			if (!this.userMsg.username) {
				this.$message.warning('请先登录')
				return false
			}

			let data = {
				username: this.userMsg.username,
				id: this.commodity.id,
				number: this.number
			}
			let res = await axios.post('/cart/insertCart', data)
			if (!res.data.success) {
				this.$message.error(res.data.desc)
				return false
			}
			this.$message.success('加入购物车成功')
		},

		// 立即购买
		buy () {
			if (!this.userMsg.username) {
				this.$message.warning('请先登录')
				return
			}
			// 跳转到pay页
			this.$router.push({
				path: '/plate/pay',
				name: 'pay',
				params: {
					payMsg: [{
						id: this.commodity.id,
						number: this.number
					}]
				}
			})
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
	.commodity-left .imgItem {
		width: 90px;
		height: 90px;
		display: inline-block;
		margin-right: 10px;
		padding: 5px;
		border: 1px solid #ccc;
	}
	.imgItem img {
		width: 100%;
		height: 100%;
	}
	.bigImg {
		width: 100%;
		height: calc(100% - 142px);
		margin-top: 10px;
	}
	.active {
		border: 1px solid #f76372 !important;
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