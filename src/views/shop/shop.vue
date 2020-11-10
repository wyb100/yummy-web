<!--  -->
/* eslint-disable */
<template>
  <div class="shop">
    <Header></Header>
    <!-- 商家信息  -->
    <el-card class="shop-info">
      <el-row>
        <el-col :span="18">
          <div style="padding: 14px;">
            <h1>{{shop.name}}</h1>
            <el-rate
              v-model="shop.rate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
            >
            </el-rate>
            <span class="per-price">人均￥20</span><br />
            <el-divider></el-divider>
            <div class="left">
              地址:<span class="adress">{{shop.address}}</span><br />
              电话:<span class="phone">{{shop.phone}}</span><br />
              营业时间：<span class="time">24小时</span><br />
            </div></div
        ></el-col>
        <el-col :span="6">
          <img
            :src="shop.pic"
            class="image"
        /></el-col>
      </el-row>
    </el-card>

    <el-row>
   
      <el-col :span="18">
        <h2 align="center">点餐</h2>
        <!-- 搜索 -->
        <div class="search">
          <el-form :inline="true" class="demo-form-inline" :model='query'>
            <el-form-item>
              <el-input placeholder="请输入菜品名称" v-model="query.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
           <!-- 菜单 -->
        <div class="food-container">
          <div class="food-list">
            <el-card class="food" v-for="(food,index) in foodList" :key="index">
              <img
                :src="food.pic"
                class="image"
                height="220" width="100" 
              />
              <div style="padding: 14px;">
                <span>{{food.name}}</span><br />
                <span class="price">￥{{food.price}}</span>
                <el-button
                  type="text"
                  class="add-cart"
                  @click="addToCart(food, 'PLUS')"
                  >加入购物车</el-button
                >
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
      <!-- 购物车 -->
      <el-col :span="6">
        <h2 align="center">购物车</h2>
        <Cart class="cart" :shopId='shopId'></Cart>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Header from "@/components/header/header";
import Cart from "@/components/cart";
import {getRestaurant} from "@/api/restaurant.js"
import {getFoodList} from '@/api/food.js'
export default {
  
  components: {
    Header,
    Cart
  },
  data() {
    const defaultQuery={
      restaurantId:null,
      name:null
    }
    return {
      query:Object.assign({},defaultQuery),
      shop:{},
      shopId:null,
      foodList:[]
    };
  },
  methods: {
    addToCart(data, type) {
      // this.$store.dispatch("setTotal", {
      //   type,
      //   shopId:Number(data.restaurantId),
      //   price: Number(data.price)
      // });
      this.$store.dispatch("setCart", {
          type,
          id: Number(data.id),
          shopId:Number(data.restaurantId),
          img: data.pic,
          name: data.name,
          price: Number(data.price)
        });
        this.$message({
          message:'添加成功',
          type:'success'
        })
    },
    initData(){
      getRestaurant({id:this.shopId}).then(response=>{
        this.shop=response.data.data;
      })
      getFoodList(this.query).then(response=>{
        this.foodList=response.data.data.list;
      })
    },
    handleSearch(){
      this.initData();
    }
  },
  created(){
    this.shopId=Number(this.$route.query.shopId);
    this.query.restaurantId=Number(this.$route.query.shopId);
    this.initData();
  }
};
</script>
<style scoped>
.shop-info {
  margin-top: 20px;
  margin-left: 100px;
  margin-right: 100px;
  width: 80%;
  height: 50%;
}
.adress {
  font-size: 18px;
  color: #999;
}
.phone {
  font-size: 18px;
  color: #999;
}
.time {
  font-size: 18px;
  color: #999;
}
.per-price {
  font-size: 20px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  width: 100%;
  display: block;
}
.search {
  margin-top: 10px;
  margin-left: 100px;
}
.food-list {
  margin-top: 5px;
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.price {
  color: red;
}
.food {
  width: 300px;
}
.add-cart {
  float: right;
}
.cart {
  margin-right: 20px;
}
</style>
