<!--  -->
/* eslint-disable */
<template>
  <div class="order-container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="order">
      <!--地址选择-->
      <el-card class="address-container">
        <h3>地址选择</h3>
        <ul-button v-if="!address" type="primary" round>添加地址</ul-button>
        <ul v-for="(item, index) in address" v-if="address">
          <el-radio v-model="addSelect" :label="index">
            <div class="address">
              <h3>{{ item.address }}</h3>
              <span class="info">{{ item.name }} {{ item.phone }}</span>
            </div>
          </el-radio>
        </ul>
      </el-card>
      <!--订单列表-->
      <el-card class="foodList">
        <h3>订单详情</h3>
        <el
          v-for="(food, index) of shopCart.foodList"
          :key="index"
          style="display: flex;align-items: center;"
        >
          <img :src="food.img" height="50" width="50" />
          <span>{{ food.name }}</span>
          <span style="font-size:18px">X{{ food.totalMount }}</span>
          <span style="color:#999;margin-left:auto"
            >￥{{ food.totalPrice }}</span
          ><br />
        </el>
      </el-card>
      <!--提交-->

      <el-card class="submit">
        <el-input
          type="textarea"
          placeholder="请输入订单备注"
          v-model="order.note"
        >
        </el-input>
        <div style="float:right">
          合计:<span style="color:red">￥{{ shopCart.totalPrice }}</span
          ><br />
          <el-button type="primary" @click="handleOrder" round
            >提交订单</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import { mapState } from "vuex";
import { getCookie } from "@/utils/support";
import { getAddress } from "@/api/user.js";
import { addOrder, addOrderFood } from "@/api/order.js";
export default {
  components: { Header },
  data() {
    return {
      member: null,
      address: null,
      shopCart: {},
      shopId: null,
      addSelect: 0,
      order: {
        memberId: null,
        restaurantId: null,
        totalAmount: 0,
        note: null,
        status: 0,
        receiverName: null,
        receiverPhone: null,
        receiverAddress: null
      }
    };
  },
  computed: {
    ...mapState(["cartData"])
  },
  methods: {
    initData() {
      getAddress({ memberId: this.member.id }).then(response => {
        this.address = response.data.data.list;
      });
    },
    handleOrder() {
      if(!this.address){
        this.$message.error('请添加地址！');
        return 0;
      }
      //添加订单
      this.order.restaurantId = this.shopId;
      this.order.memberId = this.member.id;
      this.order.totalAmount = this.shopCart.totalPrice;
      this.order.receiverName = this.address[this.addSelect].name;
      this.order.receiverPhone = this.address[this.addSelect].phone;
      this.order.receiverAddress = this.address[this.addSelect].address;
      addOrder(this.order).then(response => {
        const orderId = response.data.data;
        //添加订单食品
        for (let food of this.shopCart.foodList) {
          addOrderFood({
            orderId: orderId,
            foodId: food.id,
            foodPic: food.img,
            foodName: food.name,
            foodPrice: food.totalPrice,
            foodQuantity: food.totalMount
          });
        }
        this.$message({
          message: "提交订单成功！",
          type: "success"
        });
        this.$router.push({
          path: "/orderList"
        });
      });
    }
  },
  created() {
    this.$store.dispatch("setData");
    this.shopId = this.$route.query.shopId;
    this.shopCart = this.cartData[this.shopId];
    this.member = JSON.parse(getCookie("member"));
    this.order.memberId = this.member.id;
    this.initData();
  },
  mounted() {
    this.$store.dispatch("setData");
  }
};
</script>
<style lang="scss" scoped>
.order {
  margin-top: 20px;
  margin-left: 200px;
  margin-right: 200px;
  .info {
    color: #999;
  }
}
</style>
