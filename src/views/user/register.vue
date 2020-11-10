<!--  -->
/* eslint-disable */
<template>
  <div class="login">
    <el-card class="login-form-layout">
        <el-form ref="registerForm" 
        :model="registerForm" 
        :rules="registerRules"
        label-width="80px" >
            <h2 class="login-title" align='center'>会员注册</h2>
            <el-form-item label="邮箱" prop='email'>
                <el-input v-model="registerForm.email"
                          type='text'
                          placeholder="请输入邮箱"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='password'>
                <el-input v-model="registerForm.password"
                          placeholder="请输入密码"
                          type='password'
                ></el-input>
            </el-form-item>
             <el-form-item label="姓名" prop='name'>
                <el-input v-model="registerForm.name"
                          placeholder="请输入姓名"
                    
                ></el-input>
            </el-form-item>
             <el-form-item label="电话" prop='phone'>
                <el-input v-model="registerForm.phone"
                          placeholder="请输入电话"
                ></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom:60px;text-align: center">
                <el-button style="width: 45%" type="primary" @click='gotoLogin'>
                    已有账号？登录
                </el-button>
                 <el-button style="width: 45%" type="primary" @click='handleRegister'>
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
import {setCookie,getCookie} from '@/utils/support'
import {register} from '@/api/user.js'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
        registerForm:{
            email:'',
            password:'',
            name:'',
            phone:''
        },
        registerRules:{
            email:[
               { required: true, message: '请输入登录邮箱', trigger: 'blur' },
            ],
            password:[
               { required: true, message: '请输入密码', trigger: 'blur' },
            ]
        }
    };
  },
  methods:{
      gotoLogin(){
          this.$router.push({path:'/user/login'})
      },
      handleRegister(){
          if(this.registerForm.email===undefined||this.registerForm.email===''){
          this.$message({
              message:'请输入邮箱！',
              type:'error'
          })
          return ;
      }
       if(this.registerForm.password===undefined||this.registerForm.password===''){
          this.$message({
              message:'请输入密码！',
              type:'error'
          })
          return ;
      }
          register(this.registerForm).then(response=>{
              if(response.data.code===200){
                  this.$message({
                      message:"注册成功,请去邮箱激活！",
                      type:'success'
                  })
                  this.$router.push({path:'/user/login'})
              }else{
                  this.$message.error(response.data.message)
              }
              
          }).catch(()=>{

          })
      }
          
      
  }
};
</script>
<style lang='scss' scoped>
     .login-form-layout {
        position: absolute;
        left: 0;
        right: 0;
        width: 500px;
        margin: 140px auto;
        border-top: 10px solid #409EFF;
        .el-form{
            margin:30px
        }
  }
</style>
