import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	// 全局要访问的state对象
	state: {
		userMsg: {}
	},
	// 实时监听state值的变化 最新状态
	getters: {
		getUserMsg (state) {
			return state.userMsg
		}
	},
	mutations: {
		setUserMsg (state, userMsg) {
			state.userMsg = userMsg
		}
	},
	actions: {
		toSetUserMsg (context, userMsg) {
			context.commit('setUserMsg', userMsg)
		}
	}
})