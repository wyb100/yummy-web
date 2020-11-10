<!--  -->
/* eslint-disable */
<template>
  <div class="memberInfo">
    <Header></Header>
    <el-card class="card">
      <el-row>
        <el-col :span="12">
          <el-form :model="member" ref="mamber" class="info">
            <el-form-item label="会员邮箱">
              <el-input v-model="member.email" readonly="readonly" />
            </el-form-item>
            <el-form-item label="会员密码">
              <el-input v-model="member.password" />
            </el-form-item>
            <el-form-item label="会员姓名">
              <el-input v-model="member.name" />
            </el-form-item>
            <el-form-item label="会员电话">
              <el-input v-model="member.phone" />
            </el-form-item>
            <el-form-item class="button">
              <el-button type="primary" @click="handleUpdate"
                >更新信息</el-button
              >
              <el-button type="danger" @click="handleDelete"
                >注销账号</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <ul v-for="(item, index) in address" v-if="address">
            <div class="address">
              {{ item.address }} {{ item.name }} {{ item.phone }}
            </div>
          </ul>
          <div align="center">
            <el-button type="primary" round style="align:center" @click='dialogVisible=true'
              >添加地址</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="添加地址" :visible.sync="dialogVisible" width="30%">
      <el-form :model="addressForm">
        <el-form-item label='收货地址'>
          <el-input v-model='addressForm.address'></el-input>
        </el-form-item>
        <el-form-item label='收货人'>
          <el-input v-model='addressForm.name'></el-input>
        </el-form-item>
        <el-form-item label='电话'>
          <el-input v-model='addressForm.phone'></el-input>
        </el-form-item>
        <el-form-item align='center'>
          <el-button type='primary' round @click='handleSubmit'>提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import { getCookie, setCookie, removeCookie } from "@/utils/support";
import { update, deleteUser, exit, getUser } from "@/api/user";
import { getAddress ,addAddress} from "@/api/user.js";
export default {
  components: { Header },
  data() {
    return {
      member: {},
      address: null,
      dialogVisible:false,
      addressForm:{
        memberId:null,
        address:null,
        name:null,
        phone:null,
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const memberId = JSON.parse(getCookie("member")).id;
      getUser({ id: memberId }).then(res => {
        if (res.data.code === 200) {
          this.member = res.data.data;
        }
      });
      getAddress({ memberId: memberId }).then(res => {
        if (res.data.code === 200) {
          this.address = res.data.data.list;
        }
      });
    },
    handleSubmit(){
        if(this.addressForm.address==null||this.addressForm.name==null||this.addressForm.phone==null){
          this.$message.error("请将地址填写完整");
          return 0;
        }
        this.addressForm.memberId=this.member.id;

        addAddress(this.addressForm).then(res=>{
          if(res.data.code===200){
            this.$message.success('添加成功');
            location.reload();
          }
        })
    },
    handleUpdate() {
      update(this.member).then(reponse => {
        if (reponse.data.code === 200) {
          this.$message.success("更新成功");
          setCookie("member", this.member);
          location.reload();
        } else {
          this.$message.error("更新失败");
        }
      });
    },
    handleDelete() {
      this.$confirm("确定永久删除账号？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(
          deleteUser({ id: this.member.id }).then(reponse => {
            removeCookie("member");
            location.reload();
          })
        )
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  margin: 100px;
  .button {
    text-align: center;
  }
}
</style>
