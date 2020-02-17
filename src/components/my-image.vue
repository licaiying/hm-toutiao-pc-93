<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog()">
      <img src="../assets/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="list">
          <div v-loading="loading">
            <!-- 按钮 -->
            <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <!-- 图片列表 -->
            <div class="img-list">
              <div class="img-item" v-for="item in images" :key="item.id">
                <img :src="item.url" alt />
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">2</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "my-image",
  data() {
    return {
      // 获取素材列表参数对象
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      activeName: "list",
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 加载中
      loading: false
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    // 打开对话框
    openDialog() {
      this.dialogVisible = true;
      // 打开对话框获取素材列表数据
      // 原因：数据会有变化，用户不用封面
      this.getImages();
    },
    // 获取图片的素材列表函数
    async getImages() {
      // 开始加载
      this.loading = true;
      // 发请求，获取数据
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      // 加载完成
      this.loading = false;
      // console.log(res);
      // 图片列表数据
      this.images = res.data.data.results;
      // 总条数信息
      this.total = res.data.data.total_count;
    },
    // 分页函数
    changePage(newPage) {
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
.my-image {
  display: inline-block;
  margin-right: 20px;
}
// 图片按钮
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
// 图片列表
.img-list {
  padding-top: 15px;
  .img-item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
