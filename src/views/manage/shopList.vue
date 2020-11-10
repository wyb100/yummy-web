<!--  -->
/* eslint-disable */
<template>
  <div class="orderList">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>餐厅列表</span>
    </el-card>
    <el-card>
      <el-table :data="restaurantData.list" style="width: 100%">
        <el-table-column prop="id" label="店铺ID"> </el-table-column>
         <el-table-column prop="name" label="店铺名称"> </el-table-column>
        <el-table-column prop="pic" label="店铺图片">
          <template slot-scope="scope">
            <img :src="scope.row.pic" height="50" width="50" />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="店铺状态"> </el-table-column>
        <el-table-column prop="address" label="店铺地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" size="small" round
              >查看</el-button
            >
            <el-button
              type="success"
              size="small"
              @click="handlePass(scope.row)"
              round
              v-if='scope.row.status==0'
              >审批通过</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRestaurantList,pass} from "@/api/restaurant";
import {getCookie} from '@/utils/support'
export default {
  components: {},
  data() {
    const defaultQuery = {
    };
    return {
      query: Object.assign({}, defaultQuery),
      restaurantData:{}
    };
  },
  methods: {
    getRestaurantList() {
      getRestaurantList(this.query).then(response => {
        this.restaurantData = response.data.data;
        console.log(this.restaurantData)
      });
    },
    handlePass(row){
      pass({id:row.id}).then(response=>{
          if(response.data.code===200){
              this.$message.success('审批通过');
              location.reload();
          }
      })
    }
  },
  created() {
      //this.manager=JSON.parse(getCookie('manager'))
    this.getRestaurantList();
  }
};
</script>
<style scoped>
.orderList {
  margin: 20px;
}
.el-input{
    width:300px
}
</style>
