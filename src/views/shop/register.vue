<!--  -->
/* eslint-disable */
<template>
  <div class="login">
    <el-card class="login-form-layout">
        <el-form ref="registerForm" 
        :model="registerForm" 
        :rules="registerRules"
        label-position='right'
        label-width="80px" >
            <h2 class="login-title" align='center'>餐厅注册</h2>
            <el-form-item label="餐厅名" prop='name'>
                <el-input v-model="registerForm.name"
                          placeholder="请输入餐厅名"
                ></el-input>
            </el-form-item>
             <el-form-item label="密码" prop='password'>
                <el-input v-model="registerForm.password"
                          placeholder="请输入密码"
                          type='password'
                ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop='phone'>
                <el-input v-model="registerForm.phone"
                          placeholder="请输入电话"
                ></el-input>
            </el-form-item>
             <el-form-item label="地址" prop='adress'>
                <el-input v-model="registerForm.address"
                          placeholder="请输入地址"
                ></el-input>
            </el-form-item>
            <el-form-item label="店铺图片" style="display:flex;flex-direction:row;">
            <el-upload
                class="upload-demo"
                drag
                action="http://localhost:9000/restaurant/addPic"
                :on-success="handlePicBack"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
                </div>
            </el-upload>
            </el-form-item>
            <el-form-item label="邮箱" prop='email'>
                <el-input v-model="registerForm.email"
                          type='text'
                          placeholder="请输入邮箱"
                ></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom:60px;text-align: center"></el-form-item>
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
import {setCookie,getCookie} from '@/utils/support'
import {register} from '@/api/restaurant'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
        registerForm:{
            email:'',
            password:'',
            name:'',
            phone:'',
            address:'',
            pic:null
        },
        registerRules:{
            password:[
               { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            name:[
                { required: true, message: '请输入餐厅名', trigger: 'blur'},
            ]
        }
    };
  },
  methods:{
      gotoLogin(){
          this.$router.push({path:'/shop/login'})
      },
      handleRegister(){
         register(this.registerForm).then(response=>{
              this.$alert('您注册的餐厅ID为'+response.data.data.id,{
                  confirmText:'确定',
                  callback:action=>{
                    this.$router.push({path:'/shop/login'})
                  }
              })
          }).catch(()=>{

          })
      }, 
      handlePicBack(response){
          if(response.code===200){
              this.registerForm.pic=response.data;
          }
      }
  }
};
</script>
<style lang='scss' scoped>
     .login-form-layout {
        position: absolute;
        left: 0;
        right: 0;
        width: 700px;
        margin: 140px auto;
        border-top: 10px solid #409EFF;
        .el-form{
            margin:30px
        }
  }
</style>
