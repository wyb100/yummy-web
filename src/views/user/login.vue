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
        <h2 class="login-title" align="center">会员登录</h2>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="loginForm.email"
            type="text"
            placeholder="请输入邮箱"
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
            登录
          </el-button>
          <el-button
            style="width: 45%"
            type="primary"
            @click.native.prevent="gotoRegister"
          >
            注册
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
import { login } from "@/api/user.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loginForm: {
        email: "",
        password: ""
      },
      loading: false,
      loginRules: {
        email: [{ required: true, message: "请输入登录邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.loginForm.email = getCookie("email");
    this.loginForm.password = getCookie("password");
    if (this.loginForm.email === undefined || this.loginForm.email === null) {
      this.loginForm.email = "admin";
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
      if (this.loginForm.email === undefined || this.loginForm.email === "") {
        this.$message({
          message: "请输入邮箱！",
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
      login(this.loginForm).then(response => {
        this.loading = false;
        if (response.data.code == 200) {
          //this.$store.dispatch("setMember", response.data.data);
          setCookie("email", this.loginForm.email);
          setCookie("member", response.data.data);

          this.$message.success("登录成功！");
          this.$router.push({ path: "/" });
        } else {
          this.$message({
            message: response.data.message,
            type: "error"
          });
        }
      });
    },
    gotoRegister() {
      this.$router.push({ path: "/user/register" });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-form-layout {
    position:absolute;
  left: 0;
  right: 0;
  width: 500px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
  
}
</style>
