import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/pages/Register'
import Order from '@/pages/Order'
import ShoppingCart from '@/pages/ShoppingCart'
import Plate from '@/pages/Plate'
import Overview from '@/pages/plate/Overview'
import Commodity from '@/pages/plate/Commodity'
import Pay from '@/pages/plate/Pay'
import Service from '@/pages/Service'
import Cjwt from '@/pages/service/Cjwt'
import Qxdd from '@/pages/service/Qxdd'
import Shfw from '@/pages/service/Shfw'
import Fwsm from '@/pages/service/Fwsm'
import Pssm from '@/pages/service/Pssm'
import Aqtk from '@/pages/service/Aqtk'
import Liucheng from '@/pages/question/Liucheng'
import Pscs from '@/pages/question/Pscs'
import Yuding from '@/pages/question/Yuding'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      component: HelloWorld
    },{
      path: '/register',
      component: Register
    },{
      path: '/order',
      component: Order
    },{
      path: '/shoppingCart',
      name: '/shoppingCart',
      component: ShoppingCart
    },{
      path: '/plate',
      component: Plate,
      children:[{
        path: 'pay',
        name: 'pay',
        component:Pay
      },{
        path: 'commodity',
        name: 'commodity',
        component: Commodity
      },{
        path: 'overview',
        component: Overview
      },{
        path: 'service',
        component: Service,
        children: [{
          path: 'cjwt',
          component: Cjwt
        },{
          path: 'qxdd',
          component: Qxdd
        },{
          path: 'shfw',
          component: Shfw
        },{
          path: 'fwsm',
          component: Fwsm
        },{
          path: 'pssm',
          component: Pssm
        },{
          path: 'aqtk',
          component: Aqtk
        },{
          path: 'liucheng',
          component: Liucheng
        },{
          path: 'pscs',
          component: Pscs
        },{
          path: 'yuding',
          component: Yuding
        }]
      }]
    }
  ]
})

// 防止重复点击路由会出现报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
