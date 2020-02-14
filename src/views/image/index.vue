<template>
  <div class="container-image">
    <el-card>
      <!-- 面包屑组件 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div class="btn-box">
        <!-- 左侧按钮 -->
        <!-- collect 值为true收藏的图片  false全部的图片 -->
        <!-- :label 指定值才是布尔类型  -->
        <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect()">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 右侧按钮 -->
        <el-button type="success" style="float:right;" size="small">添加素材</el-button>
      </div>
      <!-- 图片列表区域 -->
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="icon" v-if="!reqParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页区域 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app-image",
  data() {
    return {
      // 查询条件
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片数据
      images: [],
      // 数据的总条数
      total: 0
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    async getImages() {
      // 发请求，获取图片信息
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    },
    // 切换分页
    changePage(newPage) {
      // console.log(newPage);
      this.reqParams.page = newPage;
      this.getImages();
    },
    // 切换全部与收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    }
  }
};
</script>

<style scoped lang="less" >
.img-list {
  margin-bottom: 15px;
  .img-item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    margin-top: 20px;
    position: relative;
    display: inline-block;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .icon {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      span {
        color: #fff;
        margin: 0 30px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
