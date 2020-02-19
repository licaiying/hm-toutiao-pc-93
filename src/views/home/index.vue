<template>
  <div class="container-home">
    <el-container class="container-home">
      <el-aside class="my-aside" :width="isOpen?'200px':'64px'">
        <!-- logo区域 -->
        <div class="logo" :class="{minLogo:!isOpen}"></div>
        <!-- 导航菜单 -->
        <el-menu
          :default-active="$route.path"
          background-color="#002233"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border-right:none"
          :collapse="!isOpen"
          :collapse-transition=" false"
          router
        >
          <el-menu-item index="/">
            <!-- 菜单图标 -->
            <i class="el-icon-s-home"></i>
            <!-- 菜单文字 -->
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="my-header">
          <span class="icon el-icon-s-fold" @click="toggleMenu()"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <!-- 右侧下拉菜单 -->
          <el-dropdown class="my-dropdown" @command="handleClick">
            <span class="el-dropdown-link">
              <!-- 用户头像 -->
              <img class="head" :src="photo" alt />
              <!-- 用户名称 -->
              <strong class="name">{{name}}</strong>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- 二级路由显示的位置 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/javascript">
// 导入工具auth
import auth from "@/utils/auth";
import eventBus from "@/eventBus";

export default {
  name: "app-home",
  data() {
    return {
      isOpen: true,
      name: "",
      photo: ""
    };
  },
  methods: {
    toggleMenu() {
      // 侧边栏的“展开”和“收起”效果
      this.isOpen = !this.isOpen;
    },
    // 处理下拉菜单的点击
    handleClick(command) {
      if (command === "setting") {
        this.$router.push("/setting");
      }
      if (command === "logout") {
        // 退出登录
        // 1.清除本地用户信息
        auth.delUser();
        // 2.跳转到登录页面
        this.$router.push("/login");
      }
    }
  },
  created() {
    // 获取用户信息 给name photo 赋值
    const user = auth.getUser();
    this.name = user.name;
    this.photo = user.photo;
    // 绑定eventBus事件,接收，从setting组件中传递过来的修改后的name值
    eventBus.$on("updateUserName", name => {
      this.name = name;
    });
  }
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
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    // minLogo 一定要写在logo的下方，将来在调用的时候，可以覆盖上面的logo 的样式
    .minLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
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
