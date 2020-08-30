<template>
	<div class="liucheng">
		<div class="title">订购流程</div>
		<div class="liucheng-content">
			<div>
				<div class="question">1.选择商品</div>
				<div class="answer">
					进入网站，选择您喜欢的商品，点击商品的图片或者名称，将打开商品详情页面。
				</div>
			</div>
			<div>
				<div class="question">2.放入购物车</div>
				<div class="answer">
					在商品详情页面中，点击“加入购物车”按钮。如果还需同时配送其他商品，您可以继续购物，然后找到所需商品，同样点击“加入购物车”即可。
				</div>
			</div>
			<div>
				<div class="question">3.提交我的订单</div>
				<div class="answer">
					如果您已经确定好选购的商品，点击“下单”。
				</div>
			</div>
			<div>
				<div class="question">4.填写订单信息</div>
				<div class="answer">
					填写收件人信息：收件人姓名、电话、收货地址。
				</div>
			</div>
			<div>
				<div class="question">5.提交订单</div>
				<div class="answer">
					填写完毕后，点击“去付款”按钮。选择支付方式，可以返回修改，如果确认无误，点击“确定”，提交成功。
				</div>
			</div>
			<div>
				<div class="question">6.支付款项</div>
				<div class="answer">
					提交完成订单后，会直接带入您到所选择的支付款项的步骤。您按提示完成付款，即完成订购的全过程。
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.liucheng > .title {
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20px;
	}
	.liucheng > .liucheng-content {
		font-size: 13px;
		text-align: justify;
		line-height: 22px;
	}
	.liucheng > .liucheng-content > * {
		margin-bottom: 35px;
	}
	.liucheng-content > * > .question {
		color: #f76372;
		font-weight: bold;
		margin-bottom: 15px;
	}
	.liucheng-content > * > .answer {
		padding-left: 18px;
		font-size: 13px;
		text-align: justify;
		line-height: 22px;
	}
</style>