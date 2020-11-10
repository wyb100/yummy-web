<!--  -->
/* eslint-disable */
<template>
  <div class="">
    <el-row>
      <el-col :span="3">
        <el-menu
          default-active="2"
          class="el-menu-vertical-dem?o"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          theme="dark"
          router
        >
          <el-menu-item index="/shop/manage/foodList">
            <i class="el-icon-setting"></i>
            <span slot="title">管理食物</span>
          </el-menu-item>
          <el-menu-item index="/shop/manage/orderList">
            <i class="el-icon-setting"></i>
            <span slot="title">管理订单</span>
          </el-menu-item>
          <el-menu-item index="/shop/manage/info">
            <i class="el-icon-setting"></i>
            <span slot="title">餐厅信息</span>
          </el-menu-item>
          <el-menu-item index="/shop/manage/statistics">
            <i class="el-icon-menu"></i>
            <span slot="title">餐厅统计</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-button round v-if="!restaurant" @click="gotoLogin()"
          >登录|注册</el-button
        >
        <el-dropdown @command="handleCommand" v-if="restaurant">
          <div style="display: flex; align-items: center;">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <span class="el-dropdown-link">
              {{ restaurant.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCookie, removeCookie } from "@/utils/support";
export default {
  data() {
    return {
      restaurant: null
    };
  },
  created() {
    this.restaurant = JSON.parse(getCookie("restaurant"));
  },
  methods: {
    handleCommand(command) {
      if (command === "exit") {
        removeCookie("restaurant");
        this.$router.push({ path: "/shop/login" });
      }
    },
    gotoLogin() {
      this.$router.push({ path: "/shop/login" });
    }
  }
};
</script>
<style scoped></style>
