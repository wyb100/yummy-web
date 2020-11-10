<template>
  <div class="list-item">
    <el-card class="box-card" body-style="{display:flex;flex-direction:row}">
      <el-row>
        <el-col :span="12"
          ><div class="img-wrap">
            <img class="img" :src="item.img" :alt="item.name" /></div
        ></el-col>
        <el-col :span="12">
          <div class="info-wrap">
            <h3 class="name">{{ item.name }}</h3>
            <p class="price">￥{{ item.price }}</p>
            <p class="button">
              <Calculator
                :id="Number(item.id)"
                :shopId='shopId'
                :totalMount='Number(item.totalMount)'
                :price='Number(item.price)'
              />
            </p></div
        ></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Calculator from "./calculator";

export default {
  name: "ListItem",
  props: {
    item: Object,
    shopId:Number
  },
  components: {
    Calculator
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  .img{
    width:150px;
    height: 150px;
    margin:20px;
  }
  .info-wrap {
    .button {
      float: right;
    }
  }
}
</style>
