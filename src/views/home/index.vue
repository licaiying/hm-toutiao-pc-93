<template>
  <div class="container-home">
    <el-container class="container-home">
      <el-aside class="my-aside" width="200px">Aside</el-aside>
      <el-container>
        <el-header class="my-header">
          <span class="icon el-icon-s-fold"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <!-- 右侧下拉菜单 -->
          <el-dropdown class="my-dropdown">
            <span class="el-dropdown-link">
              <!-- 用户头像 -->
              <img class="head" src="../../assets/avatar.jpg" alt />
              <!-- 用户名称 -->
              <strong class="name">黄渤</strong>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
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
    line-height: 60px;
    .icon {
      vertical-align: middle;
      padding-right: 10px;
      font-size: 24px;
    }
    .text {
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .head {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name {
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }
}
</style>
