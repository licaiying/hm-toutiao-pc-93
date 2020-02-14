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
        <el-button type="success" style="float:right;" size="small" @click="openDialog()">添加素材</el-button>
      </div>
      <!-- 图片列表区域 -->
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="icon" v-if="!reqParams.collect">
            <span
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
              @click="toggleStatus(item)"
            ></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
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
    <!-- 对话框的结构 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- 上传组件 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
// 导入封装的获取token的模块
import auth from "@/utils/auth";

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
      total: 0,
      // 控制对话框的显示与隐藏
      dialogVisible: false,
      // 图片的预览地址
      imageUrl: null,
      // 设置上传图片时的请求头，获取token
      uploadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      }
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
    },
    // 添加收藏与取消收藏
    async toggleStatus(item) {
      // 发请求
      try {
        const res = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        });
        // res.data.data.collect 就是当前素材状态
        this.$message.success(
          res.data.data.collect ? "添加收藏成功" : "添加收藏失败"
        );
        // item 就是素材数据  is_collected 显示收藏图标的 颜色
        item.is_collected = res.data.data.collect;
      } catch (e) {
        this.$message.error("操作失败");
      }
    },
    // 删除图片
    delImage(id) {
      // 确认框(组件提供的方法)
      this.$confirm("是否确定删除该图片素材?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            // 发送删除图片的请求
            await this.$http.delete(`user/images/${id}`);
            // 删除成功的提示信息
            this.$message.success("删除成功");
            // 重新渲染页面
            this.getImages();
          } catch (e) {
            // 删除失败的提示信息
            this.$message.error("删除失败");
          }
        })
        .catch(() => {});
    },
    // 当点击“添加素材”时，打开对话框
    openDialog() {
      this.dialogVisible = true;
      // // 再次打开对话框会出现之前的图片,所以需要将之前的预览图片清空
      this.imageUrl = null;
    },
    // 上传成功对应的函数
    handleSuccess(res) {
      // 提示 + 预览
      this.$message.success("上传成功");
      this.imageUrl = res.data.url;
      // console.log(res);
      // 关闭对话框 + 更新当前列表
      window.setTimeout(() => {
        this.dialogVisible = false;
        this.getImages();
      }, 3000);
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
