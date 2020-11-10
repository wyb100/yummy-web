import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/views/user/login'
import UserRegister from '@/views/user/register'
import UserOrderList from '@/views/order/orderList'
import UserInfo from '@/views/user/info'
import UserWallet from '@/views/user/wallet'
import Home from '@/views/home/home'
import Order from '@/views/order/order'
import OrderDetail from '@/views/order/orderDetail'

import Shop from '@/views/shop/shop'
import ShopManage from '@/views/shop/manage'
import ShopLogin from '@/views/shop/login'
import ShopRegister from '@/views/shop/register'
import ShopOrderDetail from '@/views/shop/orderDetail'
import FoodList from '@/views/shop/foodList'
import OrderList from '@/views/shop/orderList'
import Statistics from '@/views/shop/statistics'
import ShopInfo from '@/views/shop/info'
import Manage from '@/views/manage/manage'
import ManageShopList from '@/views/manage/shopList'
import ManageStatistics from '@/views/manage/statistics'
import ManageWallet from '@/views/manage/wallet'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/user/login',
      component: UserLogin
    },
    {
      path: '/user/register',
      component: UserRegister
    },
    {
      path: '/user/info',
      component: UserInfo
    },
    {
      path: '/user/wallet',
      component: UserWallet
    },
    {
      path: '/shop/login',
      component: ShopLogin
    },
    {
      path: '/shop/register',
      component: ShopRegister
    },
    {
      path: '/shop/manage',
      component: ShopManage,
      children: [
        {
          path: 'FoodList',
          component: FoodList
        }, {
          path: 'orderList',
          component: OrderList
        }, {
          path: 'statistics',
          component: Statistics
        }, {
          path: 'info',
          component: ShopInfo
        }
        , {
          path: 'orderDetail',
          component: ShopOrderDetail
        }
      ]
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/orderList',
      component: UserOrderList
    },
    {
      path: '/order/detail',
      component: OrderDetail
    },
    {
      path:'/shop',
      component:Shop
    },{
      path:'/manage',
      component:Manage,
      children:[
        {
          path:'shopList',
          component:ManageShopList
        },
        {
          path:'statistics',
          component:ManageStatistics
        },
        {
          path:'wallet',
          component:ManageWallet
        }
      ]
    }
  ]
})
