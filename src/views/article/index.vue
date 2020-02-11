<template>
  <div class="container-article">
    <!-- 筛选区域 -->
    <el-card>
      <!-- 面包屑区域 -->
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 表单区域 -->
      <el-form label-width="80px">
        <el-form-item label="状态"></el-form-item>
        <el-form-item label="频道"></el-form-item>
        <el-form-item label="日期"></el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 结果区域 -->
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app-article",
  created() {
    // 发请求进行测试
    this.$http
      .get("articles")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="less" >
</style>
