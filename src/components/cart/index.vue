<!--  -->
/* eslint-disable */
<template>
  <!--物品-->
  <div class="cart">
    <div v-if="cartData[shopId]">
      <listItem
        v-for="(item, index) of cartData[shopId]['foodList']"
        :key="index"
        :item="item"
        :shopId='shopId'
      >
      </listItem>
      <div class="bar">
        <span class="total-price">
          总价：<span class="price">{{ cartData[shopId]["totalPrice"] }}</span>
        </span>
        <el-button type="primary" round @click="gotoOrder">结算</el-button>
      </div>
    </div>
    <div v-else>
      <div class="bar">
        <span class="total-price">
          总价：<span class="price">{{0}}</span>
        </span>
        <el-button type="primary" round @click="gotoOrder">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "./item";
import { mapState } from "vuex";
import { setStorage } from "@/utils/support.js";
export default {
  name: "cartList",
  data:{
    return (){
    }

  },
  props: {
    shopId: Number,
  },
  components: {
    ListItem
  },
  computed: {
    ...mapState(['cartData'])
  },
  methods: {
    gotoOrder() {
      this.$router.push({ path: "/order" ,query:{
        shopId:this.shopId
      }});
    }
  },
  updated() {
    
  },
  mounted() {
    this.$store.dispatch("setData");
    
  },
  created(){

  }
};
</script>
<style lang="scss" scoped>
.cart {
  .bar {
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
