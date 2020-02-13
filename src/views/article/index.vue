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
          <el-select
            @change="changeChannel"
            clearable
            v-model="filterData.channel_id"
            placeholder="请选择"
          >
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
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格区域 -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <!-- 使用一个作用域插槽 scope 收集封装组件绑定在插槽上的所有数据 -->
          <!-- element-ui 给插槽绑定了一个数据这个数据叫：
          row数据，代码每一行数据(遍历数组，数组后的每一个对象)-->
          <!-- cover:{type:'',images:[]} 取第一张图片进行预览-->
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <!-- 具名插槽  error  当图片加载失败使用这个插槽 -->
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              plain
              type="primary"
              icon="el-icon-edit"
              circle
              @click="toEditArticle(scope.row.id)"
            ></el-button>
            <el-button plain type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- total 指定总条数 -->
      <!-- page-size 设置每一页显示多少条，默认是10条 -->
      <!-- current-page 指定当前是第几页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :current-page="filterData.page"
        :page-size="filterData.per_page"
        :total="total"
        @current-change="pager"
      ></el-pagination>
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
      articles: [],
      total: 0
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
      // 获取文章的总条数
      this.total = res.data.data.total_count;
    },
    // 点击分页按钮时执行的函数
    pager(newPage) {
      // 修改参数
      // console.log(newPage);  // 结果:当前点击的页数的页码
      this.filterData.page = newPage;
      this.getArticles();
    },
    // 筛选逻辑
    search() {
      this.filterData.page = 1;
      this.getArticles();
    },
    // 选择日期范围
    changeDate(dateArr) {
      // 默认参数 dateArr [起始日期,结束日期]  日期默认是Date类型
      // 但是后台需要的数据 字符串类型  例如：2010-01-01
      // 赋值之前：对dateArr中的日期进行格式的转换
      // 文档：可受 value-format 控制，通过这个数据指定组件产生的日期格式 yyyy-MM-dd
      // 当使用组件的 清空功能，也会触发changeDate函数，改变成null === dateArr
      console.log(dateArr);
      if (dateArr) {
        this.filterData.begin_pubdate = dateArr[0];
        this.filterData.end_pubdate = dateArr[1];
      } else {
        this.filterData.begin_pubdate = null;
        this.filterData.end_pubdate = null;
      }
    },
    // 频道改变后执行的函数
    changeChannel() {
      if (this.filterData.channel_id == "") {
        this.filterData.channel_id = null;
      }
    },
    // 点击‘编辑’文章时执行的函数
    toEditArticle(id) {
      // 跳转到编辑文章的页面
      this.$router.push(`/publish?id=${id}`);
    }
  }
};
</script>

<style scoped lang="less" >
</style>
