<!--  -->
/* eslint-disable */
<template>
  <div class="login">
    <el-card class="login-form-layout">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
      >
        <h2 class="login-title" align="center">商家登录</h2>
        <el-form-item label="餐厅识别码" prop="id">
          <el-input
            v-model="loginForm.id"
            type="text"
            placeholder="请输入识别码"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:60px;text-align: center">
          <el-button
            style="width: 45%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >
            登录餐厅
          </el-button>
          <el-button
            style="width: 45%"
            type="primary"
            @click.native.prevent="gotoRegister"
          >
            注册餐厅
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { setCookie, getCookie } from "@/utils/support";
import {login} from '@/api/restaurant'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loginForm: {
        id: "",
        password: ""
      },
      loading: false,
      loginRules: {
        id: [{ required: true, message: "请输入餐厅识别码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.loginForm.id = getCookie("id");
    this.loginForm.password = getCookie("password");
    if (this.loginForm.id === undefined || this.loginForm.id === null) {
      this.loginForm.id = "1234567";
    }
    if (
      this.loginForm.password === undefined ||
      this.loginForm.password === null
    ) {
      this.loginForm.password = "";
    }
  },
  methods: {
    handleLogin() {
      if (this.loginForm.id === undefined || this.loginForm.id === "") {
        this.$message({
          message: "请输入id！",
          type: "error"
        });
        return 0;
      }
      if (
        this.loginForm.password === undefined ||
        this.loginForm.password === ""
      ) {
        this.$message({
          message: "请输入密码！",
          type: "error"
        });
        return 0;
      }
      this.loading = true;
      login(this.loginForm)
        .then(response => {
          this.loading = false;
          if(response.data.code==200){
              this.loading = false;
              setCookie('restaurant',response.data.data);
              this.$message.success("登录成功");
              this.$router.push({ path: "/shop/manage"});
          }else{
              this.$message.error(response.data.message);
          }
          
        })
        .catch(() => {
          this.loading = false;
        });
    },
    gotoRegister() {
      this.$router.push("/shop/register");
    }
  }
};
</script>
<style lang="scss" scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 500px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
  .el-form {
    margin: 30px;
  }
}
</style>
