<!--  -->
/* eslint-disable */
<template>
  <div class="">
    <el-row>
      <el-col :span="3">
        <el-menu
          default-active="2"
          class="el-menu-vertical-dem?o"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          theme="dark"
          router
        >
          <el-menu-item index="/manage/shopList">
            <i class="el-icon-setting"></i>
            <span slot="title">管理餐厅</span>
          </el-menu-item>
          <el-menu-item index="/manage/statistics">
            <i class="el-icon-menu"></i>
            <span slot="title">统计信息</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-button round v-if="!manager" @click="gotoLogin()"
          >登录|注册</el-button
        >
        <el-dropdown @command="handleCommand" v-if="manager">
          <div style="display: flex; align-items: center;">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <span class="el-dropdown-link">
              {{ manager.name
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
      manager: null
    };
  },
  created() {
    this.manager = JSON.parse(getCookie("manager"));
  },
  methods: {
    handleCommand(command) {
      if (command === "exit") {
        removeCookie("manager");
        this.$router.push({ path: "/manage/login" });
      }
    },
    gotoLogin() {
      this.$router.push({ path: "/manage/login" });
    }
  }
};
</script>
<style scoped></style>
