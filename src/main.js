// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './css/Common.css' // 引入公共样式

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

Vue.config.productionTip = false

// 自动化注册引入组件
const requireComponent = require.context(
  '.',
  true,
  /\.vue$/
)
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
    .split('/')
    .pop()
    .split('-')
    .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    .join('')
  Vue.component(componentName, componentConfig.default || componentConfig)
})

/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
window.vm=vm