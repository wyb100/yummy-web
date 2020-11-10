<!--  -->
/* eslint-disable */
<template>
  <div class="restaurantInfo">
    <el-card class="card">
      <el-form :model="restaurant" class="info" label-position="right">
        <el-form-item label="店铺ID">
          <el-input v-model="restaurant.id" readonly="readonly" />
        </el-form-item>
        <el-form-item label="店铺状态">
          <el-input v-model="restaurant.status" readonly="readonly" />
        </el-form-item>
        <el-form-item label="店铺邮箱">
          <el-input v-model="restaurant.email" />
        </el-form-item>
        <el-form-item label="店铺密码">
          <el-input v-model="restaurant.password" />
        </el-form-item>
        <el-form-item
          label="店铺图片"
          style="display:flex;flex-direction:row;"
        >
          <img :src="restaurant.pic" height="100" width="100" />
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
        <el-form-item label="店铺地址">
          <el-input v-model="restaurant.address" />
        </el-form-item>
        <el-form-item label="店铺电话">
          <el-input v-model="restaurant.phone" />
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="handleUpdate">更新信息</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCookie, setCookie, removeCookie } from "@/utils/support";
import { updateRestaurant, getRestaurant } from "@/api/restaurant";
export default {
  data() {
    return {
      restaurant: {}
    };
  },
  created() {
    const restaurantId = JSON.parse(getCookie("restaurant")).id;
    getRestaurant({ id: restaurantId }).then(reponse => {
      if (reponse.data.code === 200) {
        this.restaurant = reponse.data.data;
      } else {
        this.$message.error("读取店铺信息错误");
      }
    });
  },
  methods: {
    handleUpdate() {
      updateRestaurant(this.restaurant).then(reponse => {
        if (reponse.data.code === 200) {
          this.$message.success("更新成功");
          setCookie("restaurant", this.restaurant);
          location.reload();
        } else {
          this.$message.error("更新失败");
        }
      });
    },
    handlePicBack(response) {
      if (response.code === 200) {
        this.$message.success("上传成功");
        this.restaurant.pic = response.data;
      } else {
        this.$.message.error(response.message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  margin:50px;
  .button {
    text-align: center;
  }
}
</style>
