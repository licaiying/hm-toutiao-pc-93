<template>
  <div class="container-login">
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt />
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <!-- 协议和条款 -->
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入auth
import auth from "@/utils/auth";

export default {
  name: "app-login",
  data() {
    const checkMobile = (rule, value, callback) => {
      // 手机号逻辑 (以1开头  第二位：3-9的数字  其余剩下9位数字)
      if (!/^1[3-9]\d{9}$/.test(value)) {
        // 校验失败
        callback(new Error("手机号格式不正确"));
      } else {
        // 校验成功
        callback();
      }
    };
    return {
      // 表单对应的数据对象
      loginForm: {
        mobile: "13911111111",
        code: "246810"
      },
      // 对单对应的校验规则
      loginRules: {
        mobile: [
          // required 是否必填
          // message 提示信息
          // trigger 触发校验的时机
          { required: true, message: "请输入手机号", trigger: "blur" },
          // 自定义校验手机号  通过 validator 进行声明校验 固定写法
          { validator: checkMobile, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          // len 验证码的长度
          { len: 6, message: "验证码为6位数字", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      // 通过调用组件的函数 validate 进行整体校验  validate(function(valid){ // valid 为 true 校验成功 })
      this.$refs.loginForm.validate(async valid => {
        // valid 值 true 校验成功
        if (valid) {
          // //  调用接口，进行登录
          // this.$http
          //   .post(
          //     "http://ttapi.research.itcast.cn/mp/v1_0/authorizations",
          //     this.loginForm
          //   )
          //   .then(res => {
          //     // 响应报文对象（响应状态行，响应头，响应主体 res.data）
          //     // res.data = {message:'',data:'用户信息'} 比对
          //     // 本地存储用户信息 使用auth.js模块中的setUser函数
          //     auth.setUser(res.data.data); // 这才是用户信息{token,id,name,photo}
          //     // console.log(res);
          //     // 跳转到首页即可
          //     this.$router.push("/");
          //   })
          //   .catch(() => {
          //     this.$message.error("手机号或验证码错误");
          //   });

          // 使用 try{}catch(){} 捕获异常 进行处理
          try {
            // 理想情况
            // 1. 发请求获取数据
            const res = await this.$http.post("authorizations", this.loginForm);
            // 2. 本地存储用户信息
            auth.setUser(res.data.data);
            // 3. 跳转到 首页
            this.$router.push("/");
          } catch (e) {
            // 异常情况
            // 1. 错误提示即可
            this.$message.error("手机号或验证码错误");
          }
        }
      });
    }
  }
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