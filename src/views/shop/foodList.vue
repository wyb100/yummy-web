<!--  -->
/* eslint-disable */
<template>
  <div class="orderList">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>食物列表</span>
    </el-card>
    <el-card>
      <el-button type="primary" @click="gotoAddFood" round>上架食物</el-button>
      <el-table :data="foodData.list" style="width: 100%">
        <el-table-column prop="id" label="食物号"> </el-table-column>
        <el-table-column prop="pic" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.pic" height="50" width="50" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="食物"> </el-table-column>
        <el-table-column prop="price" label="单价"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="stock" label="库存"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" size="small" round
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
              round
              >下架</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog class="addFood"  :visible.sync="dialogVisable"   title="添加食物">
      <el-form :model="newFood" label-position='right' label-width="150px"  >
        <el-form-item label="食物名称">
          <el-input v-model="newFood.name"  />
        </el-form-item>
        <el-form-item label="食物图片">
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:9000/food/addPic"
            :on-success='handlePicBack'
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="食物价格(单位:元)">
          <el-input v-model="newFood.price" />
        </el-form-item>
        <el-form-item label="食物描述">
          <el-input v-model="newFood.description" />
        </el-form-item>
        <el-form-item label="食物库存">
          <el-input v-model="newFood.stock" />
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary">重置</el-button>
          <el-button type="primary" @click='handleAddFood'>添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getFoodList, addFood,downFood } from "@/api/food.js";
import {getCookie} from '@/utils/support'
export default {
  components: {},
  data() {
    const defaultQuery = {
      restaurantId: null,
      name: null
    };
    return {
      query: Object.assign({}, defaultQuery),
      foodData: {},
      dialogVisable: false,
      newFood: {
        pic:null,
      },
      restaurantId:null
    };
  },
  methods: {
    getFoodList() {
      this.query.restaurantId=this.restaurantId;
      getFoodList(this.query).then(response => {
        this.foodData = response.data.data;
      });
    },
    gotoAddFood() {
      this.dialogVisable = true;
     
      
    },
    handleAddFood(){
      this.newFood.restaurantId=this.restaurantId;
      addFood(this.newFood).then(response=>{
        if(response.data.code===200){
          this.$message.success('添加成功');
          this.dialogVisable=false;
          location.reload();
        }else{
          this.$message.error(response.data);
        }
      })
    },
    handleUpdate(row) {
      cosole.log(row);
    },
    handleDelete(row) {
      downFood({id:row.id}).then(reponse=>{
        location.reload();
      })
    },
    handlePicBack(response){
      if(response.code===200){
        this.$message.success('上传成功');
        this.newFood.pic=response.data; 
      }else{
        this.$.message.error(response.message);
      }
           
    }
  },
  created() {
    const restaurantId=JSON.parse(getCookie('restaurant')).id;
    this.restaurantId=restaurantId;
    this.getFoodList();
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
