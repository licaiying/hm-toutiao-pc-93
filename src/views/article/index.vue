<template>
  <div class="container-article">
    <!-- 筛选区域 -->
    <el-card>
      <!-- 面包屑区域 -->
      <div slot="header">
        <!-- 使用自己封装的面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单区域 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="filterData.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
            <!-- label 选项文字,  value 选项的值, 当你选择某个选项后，该选项的值提供v-model -->
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 0 条结果：</div>
      <!-- 表格区域 -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script type="text/javascript">
// import MyBread from "@/components/my-bread";
export default {
  // components: { MyBread },
  name: "app-article",
  // created() {
  //   // 发请求进行测试
  //   this.$http
  //     .get("articles")
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  data() {
    return {
      // 声明筛选条件数据，筛选条件数据提交给后台，数据的字段名称，由后台接口决定。
      // 筛选数据是由多个表单元素组成，需要收集所有数据，应该使用对象来进行绑定
      filterData: {
        // 当字段的值null，axios请求不会提交，代表不传
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据
      channelOptions: [],
      // 日期范围数据 [起始日期,结束日期]
      // 当选择完日期范围后，可以根据这个范围数据给 begin_pubdate和end_pubdate 赋值。
      dateArr: [],
      articles: []
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticles();
  },
  methods: {
    // 获取频道数据
    async getChannelOptions() {
      // 发请求,获取频道数据
      const res = await this.$http.get("channels");
      // res = {data:{message:'',data:{channels:[// 频道数组 ]}}}
      // this.channelOptions = [{id,name}]  数据格式
      // console.log(res);
      this.channelOptions = res.data.data.channels;
    },
    // 获取文章数据
    async getArticles() {
      // 发请求,获取文章数据
      // post('地址','请求体数据')
      // 如果是get请求，如何传递参数对象 get('地址',{params:'get对象参数'})
      const res = await this.$http.get("articles", { params: this.filterData });
      // console.log(res);
      this.articles = res.data.data.results;
    }
  }
};
</script>

<style scoped lang="less" >
</style>
