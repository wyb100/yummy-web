<!--  -->
/* eslint-disable */
<template>
  <div class="container">
    <Header></Header>
    <el-card class="wallet-container">
      <el-row>
        <el-col :span="12">
          <el-card class="wallet">
            <h1 align="center">{{ "余额:" + member.money }}</h1>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-form :model="deposit" label-width="100px">
            <el-form-item label="充值金额">
              <el-input v-model="deposit.money" width='50'></el-input>
            </el-form-item>
            <el-form-item align='center'>
              <el-button
                class="button"
                type="primary"
                @click="handleDeposit"
                round
                >充值</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import { getCookie } from "@/utils/support";
import { getUser, update,deposit} from "@/api/user";
export default {
  components: { Header },
  data() {
    return {
      member: {},
      deposit:{
        id:0,
        money:0
      }
    };
  },
  methods: {
    handleDeposit(){
      if(this.deposit.money<=0){
        this.$message.error('请输入金额');
      }else{
        deposit(this.deposit).then(response=>{
          if(response.data.code===200){
            this.$message.success('充值成功');
            location.reload();
          }
        })
      }
      
    }
  },
  created() {
    const memberId = JSON.parse(getCookie("member")).id;
    getUser({ id: memberId }).then(response => {
      if (response.data.code === 200) {
        this.member = response.data.data;
        this.deposit.id=this.member.id;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.wallet-container {
  position: absolute;
  left: 0;
  right: 0;
  width: 700px;
  margin: 140px auto;
  .wallet {
    background-color: #90ee90;
  }
  .el-form{
    margin:30px
  }
 
}
</style>
