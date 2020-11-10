<!--  -->
/* eslint-disable */
<template>
  <div class="order-container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="order">
      <el-card class='status'>
        <h3>{{order.status|statusFormat}}</h3>
      </el-card>
      <!--订单列表-->
      <el-card class="foodList">
        <h3>{{order.restaurantName}}</h3>
        <el v-for="(food, index) of order.foodList" :key="index" style="display: flex;align-items: center;">
          <img :src=food.pic height="50" width="50">
          <span>{{ food.name }}</span>
          <span style="font-size:18px">X{{ food.quantity }}</span>
          <span style="color:#999;margin-left:auto">￥{{ food.price }}</span
          ><br />
        </el>
        备注:<span style='color:red'>{{order.note}}</span><br>
        
        <div style="float:right">
          合计:<span style="color:red">￥{{ order.totalAmount }}</span
          ><br />
        </div>
      </el-card>

       <!--地址选择-->
      <el-card class="addressInfo">
        <h4>配送信息</h4>
        <div class="address">
          <h5>{{ order.receiverAddress }}</h5>
        </div>
        <div>
          <span class="info">{{ order.receiverName }} {{ order.receiverPhone }}</span>
        </div>
      </el-card>
     

      <el-card class="orderInfo">
        <h3>订单信息</h3>
        订单号:{{order.id}}<br>
        下单时间:{{order.createTime|dateFormat}}
      </el-card>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import { mapState } from "vuex";
import { getCookie } from "@/utils/support";
import { getAddress } from "@/api/user.js";
import { addOrder, addOrderFood ,getOrderDetail} from "@/api/order.js";
import moment from 'moment'
export default {
  components: { Header },
  data() {
    return {
      orderId:null,
      order:null
    };
  },

  methods: {
    
  },
  created() {
    this.orderId=this.$route.query.orderId;
    getOrderDetail({id:this.orderId}).then(response=>{
        if(response.data.code===200){
            this.order=response.data.data;
        }
    })
  },
  filters:{
      dateFormat(value){
          if(!value)return '';
          else return moment(value).format('YYYY-MM-DD HH:mm:ss')
      },
      statusFormat(value){
        switch (value) {
        case 0:
          return "待付款";
          break;
        case 1:
          return "待发货";
          break;
        case 2:
          return "待确认";
          break;
        case 3:
          return "已完成";
          break;
        case 4:
          return "已关闭 "
          break;
        default:
          break;
      }
      }
  }
};
</script>
<style lang="scss" scoped>
.order {
  margin-top: 20px;
  margin-left: 200px;
  margin-right: 200px;
  
}
</style>
