<template>
  <div class="container-home">
    <el-container class="container-home">
      <el-aside class="my-aside" width="200px">Aside</el-aside>
      <el-container>
        <el-header class="my-header">Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app-home"
};
</script>

<style scoped lang="less" >
.container-home {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .my-aside {
    background: #002233;
  }
  .my-header {
    border-bottom: 1px solid #ddd;
  }
}
</style>
