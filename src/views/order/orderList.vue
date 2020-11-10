<!--  -->
/* eslint-disable */
<template>
  <div class="orderList">
    <!-- 头部导航 -->
    <Header></Header>
    <div class="orderList-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i>
        <span>订单列表</span>
      </el-card>
      <el-card class="search">
        <el-form :inline="true" :model="query" class="search-form">
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="最低金额">
            <el-input
              v-model="query.lowPrice"
              placeholder="最低金额"
            ></el-input>
          </el-form-item>
          <el-form-item label="最高金额">
            <el-input
              v-model="query.highPrice"
              placeholder="最高金额"
            ></el-input>
          </el-form-item>
          <el-form-item label="餐厅">
            <el-input
              v-model="query.restaurantName"
              placeholder="餐厅名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card shadow="never">
        <el-table :data="orderData.list" style="width: 100%">
          <el-table-column prop="id" align="center" label="订单号">
          </el-table-column>
          <el-table-column prop="restaurantName" align="center" label="餐厅">
          </el-table-column>
          <el-table-column
            prop="createTime"
            align="center"
            :formatter="dateFormat"
            label="提交时间"
          >
          </el-table-column>
          <el-table-column prop="totalAmount" align="center" label="订单金额">
          </el-table-column>
          <el-table-column prop="status" align="center" label="订单状态">
            <template slot-scope="scope">
              <el-tag type="info">
                {{ scope.row.status | stateFormat }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="500" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="handleDetail(scope.row)"
                size="mini"
                round
                >查看订单</el-button
              >
              <el-button
                type="success"
                size="mini"
                v-show="scope.row.status === 0"
                @click="gotoPay(scope.row)"
                round
                >支付订单</el-button
              >
              <el-button
                type="danger"
                size="mini"
                v-show="scope.row.status === 0"
                @click="handleClose(scope.row)"
                round
                >关闭订单</el-button
              >
              <el-button
                type="danger"
                size="mini"
                v-show="scope.row.status === 1"
                @click="handleBack(scope.row)"
                round
                >退款</el-button
              >
              <el-button
                type="success"
                size="mini"
                v-show="scope.row.status === 2"
                @click="handleConfirm(scope.row)"
                round
                >确认收货</el-button
              >
              <el-button
                type="danger"
                size="mini"
                v-show="scope.row.status === 3"
                round
                >删除订单</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog
        class="pay"
        title="支付窗口"
        width="40%"
        height="60%"
        :visible.sync="dialogVisible"
      >
        订单总金额:<span style="color:red">{{ payData.order.totalAmount }}</span
        ><br />
        支付倒计时：<span style="color:red">{{
          payData.min + "分钟" + payData.sec + "秒"
        }}</span
        ><br />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handlePay"
            :loading="payData.payloading"
            >立即支付</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import { getList, updateOrder, getOrderDetail } from "@/api/order";
import { getCookie } from "@/utils/support";
import moment from "moment";
export default {
  components: { Header },
  data() {
    const defaultQuery = {
      memberId: null,
      restaurantId: null,
      status: null,
    };
    return {
      member: null,
      query: Object.assign({}, defaultQuery),
      orderData: {},
      dialogVisible: false,
      payData: {
        min: 0,
        sec: 0,
        order: {},
        payloading: false,
        payTimer: null
      },
      dateRange: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    handleSearch() {
      if (this.dateRange.size != 0) {
        this.query.startTime = this.dateRange[0];
        this.query.endTime = this.dateRange[1];
      }
      getList(this.query).then(response => {
        this.orderData = JSON.parse(JSON.stringify(response.data.data));
      });
    },
    handleDetail(row) {
      this.$router.push({
        path: "/order/detail",
        query: {
          orderId: row.id
        }
      });
    },
    gotoPay(row) {
      this.payData.order = row;
      this.dialogVisible = true;
      if (this.payData.payTimer) {
        clearTimeout(this.payData.payTimer);
      }

      this.countdown(row.createTime);
    },
    handlePay() {
      updateOrder({ orderId: this.payData.order.id, select: 1 }).then(
        response => {
          this.dialogVisible = false;
          this.payData.payloading = false;
          if (response.data.code === 200) {
            this.$message.success("支付成功！");
            location.reload();
          } else {
            this.$message.error(response.data.message);
          }
        }
      );
    },
    handleBack(row) {
      this.$confirm("确定退款？系统将根据时间退还相应金额。", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        updateOrder({ orderId: row.id, select: 2 }).then(response => {
          if (response.data.code === 200) {
            this.$message.success("退款成功");
            location.reload();
          }
        });
      });
    },
    handleConfirm(row) {
      updateOrder({ orderId: row.id, select: 3 }).then(response => {
        location.reload();
      });
    },
    handleClose(row) {
      updateOrder({ orderId: row.id, select: 4 }).then(response => {
        location.reload();
      });
    },
    dateFormat(value) {
      if (value.createTime == undefined || value.createTime == "") {
        return "";
      }
      return moment(value.createTime).format("YYYY-MM-DD HH:mm:ss");
    },
    countdown(createTime) {
      const end = Date.parse(new Date(createTime)) + 15 * 60 * 1000;
      const now = Date.parse(new Date());
      const msec = end - now;
      if (msec > 0) {
        let min = parseInt((msec / 1000 / 60) % 60);
        let sec = parseInt((msec / 1000) % 60);
        this.payData.min = min > 9 ? min : "0" + min;
        this.payData.sec = sec > 9 ? sec : "0" + sec;
        const that = this;
        this.payData.payTimer = setTimeout(function() {
          that.countdown(createTime);
        }, 1000);
      }
    }
  },
  filters: {
    stateFormat(value) {
      switch (value) {
        case 0:
          return "待付款";
          break;
        case 1:
          return "待发货";
          break;
        case 2:
          return "待确认";
          break;
        case 3:
          return "已完成";
          break;
        case 4:
          return "已关闭 ";
          break;
        case 5:
          return "已删除 ";
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.member = JSON.parse(getCookie("member"));
    this.query.memberId = this.member.id;
    getList(this.query).then(response => {
      this.orderData = JSON.parse(JSON.stringify(response.data.data));
    });
  },
  mounted() {}
};
</script>
<style scoped>
.orderList-container {
  margin: 20px;
}
.search {
  margin-left: 100px；;
}
</style>
