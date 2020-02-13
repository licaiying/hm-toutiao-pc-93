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
        <el-radio-group v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 右侧按钮 -->
        <el-button type="success" style="float:right;" size="small">添加素材</el-button>
      </div>
      <!-- 图片列表区域 -->
      <div class="img-list">
        <div class="img-item" v-for="item in 10" :key="item">
          <img src="../../assets/avatar.jpg" alt />
          <div class="icon">
            <span class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页区域 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app-image",
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      }
    };
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
