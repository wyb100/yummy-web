<!--  -->
/* eslint-disable */
<template>
  <div class="home">
    <!-- 头部导航 -->
    <Header></Header>
    <el-col>
      <el-col :span="19">
        <!-- 搜索  -->
        <div class="search">
          <el-form :inline="true" class="demo-form-inline" :model="query">
            <el-form-item>
              <el-input
                v-model="query.name"
                placeholder="请输入餐厅信息"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 店铺信息  -->
        <div class="shop-container">
          <div class="shop-list">
            <el-card
              class="shop-item"
              v-for="(item, index) in shopList"
              :key="index"
            >
              <img :src="item.pic" class="image" @click="gotoShop(item.id)"/>
              <div style="padding: 14px;">
                <el-rate
                  v-model="item.rate"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                >
                </el-rate>
                <span>{{ item.name }}</span>
                <div class="bottom clearfix">
                  <span class="adress">{{ item.address }}</span>
                  <span class="price">人均￥20</span>
                </div>
              </div>
            </el-card>
          </div>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="query.pageNum"
              :page-size="query.pageSize"
              layout="total, sizes,prev, pager, next,jumper"
              :total="total"
              :page-sizes="[5,10,15]"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
      <div class="recommand">
        <h3>推荐餐厅</h3>
      </div></el-col>
    </el-col>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import { getRestaurantList } from "@/api/restaurant.js";
import { getFood } from "@/api/food.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header
  },
  data() {
    const defaultQuery = {
      name: null,
      pageNum: "1",
      pageSize: "10"
    };
    return {
      query: Object.assign({}, defaultQuery),
      shopList: [],
      food: {},
      total: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getShop() {
      getRestaurantList(this.query).then(response => {
        this.shopList = response.data.data.list;
        this.total=response.data.data.total;
      });
    },
    handleSearch() {
      this.query.pageNum=1;
      this.getShop();
    },
    handleSizeChange(val){
      this.query.pageSize=val;
      this.query.pageNum=1;
      this.getShop();
    },
    handleCurrentChange(val){
      this.queryNum=val;
      this.getShop();
    },
    gotoShop(id){
      this.$router.push({path:'/shop',query:{
        shopId:id
      }})
    }

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getShop();
  }
};
</script>
<style scoped>  
.search {
  margin-top: 10px;
  margin-left: 400px;
}
.shop-list {
  margin: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.adress {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
.shop-item {
  width: 300px;
}
.price {
  font-size: 20px;
  color: #999;
}
.pagination{
  margin-left:500px;
}
</style>
