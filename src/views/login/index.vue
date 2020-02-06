<template>
  <div class="container-login">
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt />
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app-login"
};
</script>

<style lang="less" scoped>
.container-login {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(../../assets/login_bg.jpg) no-repeat;
  background-size: cover;
  .my-card {
    position: absolute;
    width: 400px;
    height: 350px;
    transform: translate(-50%, -60%);
    top: 50%;
    left: 50%;
    img {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}
</style>