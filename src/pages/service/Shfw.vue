<template>
	<div class="shfw">
		<div class="title">售后服务</div>
		<div class="shfw-table">
			<table rules="all" frame="box" width="100%" cellpadding="20" style="border-color: #d9d9d9">
				<thead>
					<tr style="background-color: #eeeeee">
						<th width="12%"></th>
						<th width="38%">客户投诉事件</th>
						<th width="50%">解决办法</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style="background-color: #f8f8f8;" align="center">漏单</td>
						<td>客户按时支付成功，我们没有做任何处理。</td>
						<td style="line-height: 25px;">100%全额退款，退回至客户指定帐户或存入客户会员余额(可随时订购抵扣)。同时和客户另协商配送时间，我们免费重新派送原订单。</td>
					</tr>
					<tr>
						<td style="background-color: #f8f8f8" align="center">误单</td>
						<td>因我方失误，配送日期提前或延后。</td>
						<td style="line-height: 25px;">将订单款项的50%退还，存入客户的会员余额，或者在客户指定时间，再配送一次与原订单鲜花。</td>
					</tr>
					<tr>
						<td style="background-color: #f8f8f8" rowspan="3" align="center">花材不符</td>
						<td>没有和客户沟通，由于我方失误造成主花材鲜花颜色不符</td>
						<td>给收花人补送原订单的鲜花，或者将订单款项的50%退还，存入客户的会员余额。</td>
					</tr>
					<tr>
						<td>主花材数量不符</td>
						<td>向收花人真诚道歉，并补送道歉花束。</td>
					</tr>
					<tr>
						<td>花材不新鲜</td>
						<td>A、配送的鲜花不新鲜，收花人拒收。<br>
								处理方式：重新配送新鲜的鲜花，并向客户真诚道歉。<br>
								<br>
								B、收花人已收下花束，后客户投诉鲜花不新鲜。<br>
								处理方法：<br>
								如果经核实花材是新鲜的，是部分花材需要时间才能开放等类似原因，我们将认真向客户解释清楚。<br>
								如果经核实确属花材不新鲜，重新给收花人补送原订单的新鲜鲜花，并向客户真诚道歉。<br>
								1.B类情况，请务必在夏季鲜花收到2个小时内、其他季节鲜花收到4个小时内向我们投诉。同时收花人需保留鲜花，我们将派工作人员调查核实，如果已将花礼损坏或丢弃，或者投诉时效逾期，将不便核实，视为无效投诉。<br>
								2.B类情况，如果收花人签收了我们的签收单，且对收到货品的反馈意见没有签写为“不满意”，则不做投诉处理。
						</td>
					</tr>
					<tr>
						<td style="background-color: #f8f8f8" align="center">其他</td>
						<td>任何您不满的地方</td>
						<td>均可向客服反馈，我们将认真倾听，用心改进，为您提供更满意的服务。</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="shfw-msg">
			<div>如果出现以下情况，不作为投诉处理：</div>
			<div>1. 因自然灾害(台风、地震等)、交通戒严等不可抗因素，导致鲜花配送延误或不太新鲜。</div>
			<div> 2. 如果配送地某种花材短缺，在无法及时联系到订花人的情况下，我方将考虑该订单的时效性(如：生日、节日、结婚、纪念日），采用相似、等价值的原则决定替用花材，保证订单在客户要求的时间送到。</div>
		</div>
	</div>
</template>

<style>
	.shfw > .title {
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20px;
	}
	.shfw .shfw-table {
		margin-bottom: 25px;
	}
	.shfw-table tbody {
		font-size: 13px;
	}
	.shfw-table tbody > * > * {
		line-height: 23px;
	}
	.shfw .shfw-msg > * {
		margin-bottom: 5px;
		font-size: 13px;
		text-align: justify;
		line-height: 22px;
	}
</style>