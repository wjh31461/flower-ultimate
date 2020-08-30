<template>
	<div class="service">
		<div class="wrapper service-wrapper">
			<div class="service-nav">
				<el-row class="tac">
				  <el-col>
				    <div>服务及咨询</div>
				    <el-menu
				    	router
				      :default-active="currentRoute"
				      active-text-color='#f76372'
				      class="el-menu-vertical-demo">
				      <el-submenu index='service'>
				        <template slot="title">
				          <i class="el-icon-service"></i>
				          <span>客户服务</span>
				        </template>
			          <el-menu-item index="/plate/service/cjwt">常见问题</el-menu-item>
			          <el-menu-item index="/plate/service/qxdd">取消订单</el-menu-item>
			          <el-menu-item index="/plate/service/shfw">售后服务</el-menu-item>
			          <el-menu-item index="/plate/service/fwsm">服务声明</el-menu-item>
			          <el-menu-item index="/plate/service/pssm">配送说明</el-menu-item>
			          <el-menu-item index="/plate/service/aqtk">安全条款</el-menu-item>
				      </el-submenu>

				      <el-submenu index='question'>
				        <template slot="title">
				          <i class="el-icon-question"></i>
				          <span>咨询</span>
				        </template>
			          <el-menu-item index="/plate/service/liucheng">鲜花订购流程</el-menu-item>
			          <el-menu-item index="/plate/service/pscs">鲜花配送城市</el-menu-item>
			          <el-menu-item index="/plate/service/yuding">应该提前多久预定</el-menu-item>
				      </el-submenu>
				    </el-menu>
				  </el-col>
				</el-row>
			</div>
			<div class="service-content">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			currentRoute: '/service/cjwt'
		}
	},
	watch: {
		'$route': function (to, from) {
			this.currentRoute = to.path
		}
	},
	created () {
		this.currentRoute = this.$route.path
	},
	methods: {}
}
</script>

<style>
	.service-wrapper {
		margin-top: 50px;
	}
	.service-wrapper > * {
		float: left;
	}
	.service-wrapper > .service-nav {
		width: 250px;
		height: 700px;
		border: 1px solid #d9d9d9;
		margin-right: 50px;
		padding-top: 20px;
	}
	.service-nav .tac .el-col > div {
		font-size: 18px;
		font-weight: bold;
		text-align: center;
	}
	.service-nav ul {
		border-right: none;
	}
	.service-wrapper > .service-content {
		width: 900px;
		border: 1px solid #d9d9d9;
		padding: 20px;
	}
	.service-wrapper::after {
		content: '';
		display: block;
		clear: both;
	}
</style>