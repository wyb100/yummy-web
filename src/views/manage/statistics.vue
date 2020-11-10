<!--  -->
/* eslint-disable */
<template>
  <div class="statistics">
    <section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{shopCount}}</span> 新增店铺</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{amount}}</span> 销售额</div></el-col>
			</el-row>
            <el-row :gutter="24">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allShopCount}}</span> 店铺</div></el-col>
                 <el-col :span="4"><div class="data_list"><span class="data_num">{{allAmount}}</span> 总销售额</div></el-col>
                  <el-col :span="4"><div class="data_list"><span class="data_num">{{allIncome}}</span> 总收益</div></el-col>
            </el-row>
		</section>
  </div>
</template>

<script>
import axios from 'axios';
import {getUserCount,getAllUserCount} from '@/api/user.js'
import {getOrderCount,getAllOrderCount,getAmount,getAllAmount,getAllMoney} from '@/api/order.js'
import {getRestaurantCount,getAllRestaurantCount} from '@/api/restaurant.js'
import moment from 'moment'
export default {
  components: {},
  data() {

    return {
        userCount:0,
        orderCount:0,
        shopCount:0,
        amount:0,
        allUserCount:null,
        allOrderCount:null,
        allShopCount:null,
        allAmount:null,
        allIncome:null,
        date:{}
    };
  },
  methods:{
      async initData(){
          const date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          this.date.dateStr=date;
          console.log(this.date.date)
          axios.all([getUserCount(this.date),getOrderCount(this.date),
          getRestaurantCount(this.date),getAmount(this.date),getAllMoney(),getAllUserCount(),getAllOrderCount(),getAllRestaurantCount(),getAllAmount()])
          .then(axios.spread( (user,order,restaurant,amount,money,allUser, allOrder,allRestaurant,allAmount)=>{
              this.userCount=user.data.data;
              this.orderCount=order.data.data;
              this.shopCount=restaurant.data.data;
              this.amount=amount.data.data;
              this.allIncome=money.data.data;
              this.allUserCount=allUser.data.data;
              this.allOrderCount=allOrder.data.data;
              this.allShopCount=allRestaurant.data.data;
              this.allAmount=allAmount.data.data;
          }))
      }
  },
  mounted(){
      this.initData();
  }

  
};
</script>
<style lang='scss'scoped>
.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
</style>
