<template>
	<div id="paycode">
		<!-- 显示 -->
		<el-row class='paycodeShow'>
		  <el-col :span="4" v-for='i in 6' :key='i'>
		  	{{paycode[i - 1] !== undefined ? '*' : undefined}}
		  </el-col>
		</el-row>

		<!-- 输入 -->
		<el-row v-for='(row, indexR) in [1, 2, 3]' :key='indexR'>
		  <el-col :span="8" v-for='(col, indexC) in [1, 2, 3]' :key='indexC'>
		  	<div class='paycodeNum' @click='addPaycode(indexR * 3 + (indexC + 1))'>{{indexR * 3 + (indexC + 1)}}</div>
		  </el-col>
		</el-row>
		<el-row>
		  <el-col :span="8">
		  	<div class='paycodeNum' @click='deletePaycode()'>
		  		<i class="el-icon-back"></i>
		  	</div>
		  </el-col>
		  <el-col :span="8">
		  	<div class='paycodeNum' @click='addPaycode(0)'>0</div>
		  </el-col>
		  <el-col :span="8">
		  	<div class='paycodeNum' @click='ok()'>确定</div>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data () {
		return {
			paycode: [],
		}
	},
	methods: {
		addPaycode (code) {
			if (this.paycode.length < 6) {
				this.paycode.push(code)
			}
		},
		deletePaycode () {
			if (!this.paycode.length) {
				this.$emit('paycode-back')
			}
			this.paycode.pop()
		},
		ok () {
			if (this.paycode.length !== 6) {
				this.$message.warning('请输入6位支付密码')
				return false
			}
			this.$emit('ok', this.paycode)
			this.clearPaycode()
		},
		clearPaycode () {
			this.paycode = []
		}
	}
}
</script>

<style>
	.paycodeShow {
		height: 40px;
		line-height: 40px;
		text-align: center;
		border: 1px solid #eee;
		border-radius: 5px;
		margin-bottom: 15px;
	}
	.paycodeNum {
		height: 40px;
		text-align: center;
		line-height: 40px;
		background: #eee;
		cursor: pointer;
		user-select: none;
	}
	.paycodeNum:hover {
		background: #ccc;
	}
</style>