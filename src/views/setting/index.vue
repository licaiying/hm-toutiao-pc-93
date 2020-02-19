<template>
  <div class="container-setting">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{user.id}}</el-form-item>
            <el-form-item label="手机号：">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="user.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 用户头像 -->
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px;">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app-setting",
  data() {
    return {
      // 用户信息
      user: {
        name: "",
        intro: "",
        email: "",
        photo: ""
      }
      // 用户头像
      //   imageUrl: ""
    };
  },
  created() {
    // 获取用户信息
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息的函数
    async getUserInfo() {
      const res = await this.$http.get("user/profile");
      this.user = res.data.data;
    }
  }
};
</script>

<style scoped lang="less" >
</style>
