<template>
  <div class="container-fans">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs标签页 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans-list">
            <div class="fans-item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="pictrue">
          <div style="width:600px;height:400px" ref="dom"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/javascript">
// 导入echarts
import echarts from "echarts";

export default {
  name: "app-fans",
  data() {
    return {
      activeName: "list",
      // 粉丝列表
      fansList: [],
      // 总条数
      total: 0,
      // 参数信息
      reqParams: {
        page: 1,
        per_page: 24
      }
    };
  },
  created() {
    // 调用函数，渲染页面
    this.getFansList();
  },
  mounted() {
    const myChart = echarts.init(this.$refs.dom);
    const option = {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    myChart.setOption(option);
  },
  methods: {
    async getFansList() {
      // 发请求，获取粉丝列表信息
      const res = await this.$http.get("followers", { params: this.reqParams });
      // 列表数据
      this.fansList = res.data.data.results;
      this.total = res.data.data.total_count;
    },
    // 分页函数
    changePage(newPage) {
      this.reqParams.page = newPage;
      this.getFansList();
    }
  }
};
</script>

<style scoped lang="less" >
.fans-list {
  .fans-item {
    padding-top: 10px;
    width: 100px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 20px;
    p {
      padding: 0;
      font-size: 12px;
    }
  }
}
</style>
