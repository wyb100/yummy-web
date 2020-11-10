<!--  -->
/* eslint-disable */
<template>
  <div class="head">
    <el-menu
      :default-active="activeIndex"
      class="menu"
      mode="horizontal"
      router="true"
      background-color="#F5F5F5"
      @select="handleSelect"
    >
      <el-menu-item index="/home">点餐</el-menu-item>
      <el-menu-item index="/orderList">订单</el-menu-item>
      <el-menu-item class="right" style="margin-left:auto">
        <el-dropdown class="profile" align="center" @command="handleCommand" v-if="member" >
          <div class="user">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <span class="name">{{member['name']}}<i></i> </span>
          </div>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command='wallet'>钱包</el-dropdown-item>
            <el-dropdown-item>数据</el-dropdown-item>
            <el-dropdown-item command='info'>个人设置</el-dropdown-item>
            <el-dropdown-item command='logout'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button round v-if='!member' @click='login()'>登录|注册</el-button></el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getCookie,removeCookie}from '@/utils/support.js'
export default {
  components: {},
  data() {
    return {
      member:null
    };
  },
  created(){
 
    this.member=JSON.parse(getCookie('member'))
  },
  methods: {
    login(){
      this.$router.push({path:'/user/login'})
    },
    handleCommand(command){
      if(command==='logout'){
        removeCookie('member')
        this.$router.push({path:'/user/login'})
      }else if(command==='info'){
        this.$router.push({path:'/user/info'})
      }else if(command==='wallet'){
        this.$router.push({path:'/user/wallet'})
      }
    }
 
  }
};
</script>
y
<style lang="scss" scoped>
.head {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .menu {
    .el-menu-item {
      font-size: 25px;
    }
  }
}
</style>
