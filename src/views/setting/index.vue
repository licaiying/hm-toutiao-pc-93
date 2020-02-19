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
              <el-button @click="saveSetting()" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 用户头像 -->
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="uploadImage"
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
import auth from "@/utils/auth";
import eventBus from "@/eventBus";

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
    },
    // 修改用户信息的函数
    async saveSetting() {
      // 发请求
      try {
        // 取出(解构)后台需要的三个数据
        const { name, intro, email } = this.user;
        await this.$http.patch("user/profile", { name, intro, email });
        this.$message.success("修改用户信息成功");
        // 同步本地存储
        // 1. 获取本地用户信息
        // 2. 修改拿到的用户信息用户名称
        // 3. 在把修改好数据存储起来
        const user = auth.getUser();
        user.name = name;
        auth.setUser(user);
        // 同步home组件(在seting组件传用户名称给home组件)
        eventBus.$emit("updateUserName", name);
      } catch (e) {
        this.$message.error("修改用户信息失败");
      }
    },
    // 修改用户头像的函数
    async uploadImage({ file }) {
      // 选择图片之后，触发这个函数，把包含图片信息的对象fileInfo传入进来
      // 自己上传  使用axios进行  所以不需要额外的去配置组件了。
      // 选择图片后获取file对象，封装成formdata数据对象，使用axios进行提交。
      // console.log(fileInfo.file) 就是图片信息
      const fd = new FormData();
      fd.append("photo", file);
      // 发请求，修改用户的头像信息
      const res = await this.$http.patch("user/photo", fd);
      // 预览图片
      this.user.photo = res.data.data.photo;
      // 本地同步更新用户的头像信息
      const user = auth.getUser();
      user.photo = res.data.data.photo;
      auth.setUser(user);
      // home组件同步更新用户的头像信息
      eventBus.$emit("updateUserPhoto", res.data.data.photo);
      // 提示信息
      this.$message.success("修改用户头像成功");
    }
  }
};
</script>

<style scoped lang="less" >
</style>
