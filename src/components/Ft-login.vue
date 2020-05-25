<template>
  <div>
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <header class="login-header">
      <h3 class="login-title">登陆界面</h3>
    </header>
    <section class="login-section">
      <h4 class="login-section-header">账户密码登陆</h4>
      <div class="account">
        <el-input v-model="loginInput" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
      </div>
      <div class="password">
        <el-input
          placeholder="请输入密码"
          v-model="loginPassword"
          show-password
          prefix-icon="el-icon-lock"
          @keypress.enter.native="login"
        ></el-input>
      </div>
      <div class="login-selected">
        <span class="login-checkbox">
          <el-checkbox v-model="checked">自动登录</el-checkbox>
        </span>
        <a href="#" class="login-forgotPassword" @click="dialogTableVisible = true">忘记密码</a>
      </div>
      <el-dialog title="修改密码" :visible.sync="dialogTableVisible" width="30%">
        <div class="backPass">
          <el-input v-model="backInput" placeholder="请输入要找回密码的账号" prefix-icon="el-icon-user-solid"></el-input>
          <div class="email">
            <el-input
              v-model="email"
              placeholder="请输入账号绑定邮箱"
              type="email"
              prefix-icon="el-icon-message"
              @change="checkEmail"
            ></el-input>
            <el-input
              class="verifycation"
              v-model="checkcode"
              @change="checkEmpty"
              placeholder="输入验证码"
            ></el-input>
            <span class="getVerifycation">
              <el-button type="info" @click="getVerification" :disabled="disabled">{{message}}</el-button>
            </span>
          </div>
          <div class="backPassword">
            <el-input
              placeholder="请输入密码"
              v-model="backPassword"
              show-password
              prefix-icon="el-icon-lock"
              @change="checkPassword(backPassword)"
            ></el-input>
            <el-input
              placeholder="请确认密码"
              v-model="backPasswordCheck"
              show-password
              prefix-icon="el-icon-lock"
              @change="checkPassword( backPasswordCheck)"
            ></el-input>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="changePassword">确 定</el-button>
        </div>
      </el-dialog>
    </section>
    <footer class="login-footer">
      <div class="login-signIn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
      <div class="login-signUp">
        <el-button type="primary" @click="$router.push({name :'#register'})">注册账户</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginInput: "",
      loginPassword: "",
      checked: false,
      dialogTableVisible: false,
      backInput: "",
      email: "",
      checkcode: "",
      backPassword: "",
      backPasswordCheck: "",
      gotCheck: "获取验证码",
      disabled: false
    };
  },
  methods: {
    login() {
      if (!this.loginInput || !this.loginPassword) {
        this.$message.warning("请输入账号或密码");
        return;
      }
      this.$axios({
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        url: "/user/login",
        data: {
          username: this.loginInput,
          password: this.loginPassword
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this.$router.push({ name: "all" });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    checkPassword(password) {
      if (
        !password ||
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/.test(password)
      ) {
        this.$message.warning(
          "密码必须由7-20位大小写英文字母,数字(允许中文和特殊字符)组成"
        );
        return false;
      }
      return true;
    },
    checkEmpty() {
      if (!this.checkcode || this.checkcode.length != 6) {
        this.$message.error("请输入正确的验证码");
        return false;
      }
      return true;
    },
    checkEmail() {
      if (
        !this.email ||
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)
      ) {
        this.$message.warning("请输入正确的邮箱");
        return false;
      }
      return true;
    },
    getVerification() {
      if (!this.checkEmail()) {
        return false;
      }
      this.$refs.topProgress.start();
      this.$axios({
        url: "/send/email/checkCode",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        data: {
          email: this.email
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$refs.topProgress.done();
            this.internal();
            this.$message.success("验证码发送成功，请在邮箱中查看");
          } else {
            this.$refs.topProgress.fail();
            this.$message.error("验证码发送失败，请重试");
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    changePassword() {
      if (
        !this.backPassword ||
        !this.backPasswordCheck ||
        !this.checkcode ||
        !this.email
      ) {
        return false;
      }
      if (this.backPassword != this.backPasswordCheck) {
        this.$message.error("两次输入的密码要一致");
        return false;
      }
      if (!this.backInput) {
        this.$message.error("账号不能为空");
        return false;
      }
      this.$refs.topProgress.start();
      this.$axios({
        url: "/user/changePassword",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        data: {
          name: this.backInput,
          email: this.email,
          checkCode: this.checkcode,
          password: this.backPassword
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$refs.topProgress.done();
            this.$message.success("密码修改成功");
            this.dialogTableVisible = false;
            this.backInput = "";
            this.email = "";
            this.checkcode = "";
            this.backPassword = "";
            this.backPasswordCheck = "";
            this.gotCheck = "获取验证码";
          } else {
            this.$refs.topProgress.fail();
            this.$message.error("验证码不正确，请重试");
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    internal() {
      this.disabled = true;
      var vm = this;
      var timeLeft = 120;
      //重新发送计时函数
      var timeCount = function() {
        setTimeout(function() {
          if (timeLeft > 0) {
            timeLeft -= 1;
            vm.gotCheck = timeLeft + "秒";
            timeCount();
          } else {
            vm.message = "获取验证码";
            vm.disabled = false;
            timeLeft = 120;
          }
        }, 1000);
      };
      timeCount();
    }
  },
  computed: {
    message() {
      return this.gotCheck;
    }
  }
};
</script>

<style >
.login-header {
  height: 140px;
  padding: 35px 0;
}
.login-title {
  width: 183px;
  height: 65px;
  color: rgb(255, 255, 255);
  font-size: 44px;
  margin: 0 auto;
  font-weight: 400;
}
.login-section-header {
  color: rgb(255, 255, 255);
  font-size: 24px;
  text-align: center;
}
.login-section,
.login-footer {
  width: 369px;
  height: 186px;
  margin: 0 auto;
}

.account,
.password {
  margin-bottom: 20px;
}

.login-forgotPassword {
  float: right;
  color: rgb(255, 255, 255);
  font-size: 14px;
}
.login-signIn .el-button,
.login-signUp .el-button {
  display: inline-block;
  width: 369px;
  margin-top: 20px !important;
}

.el-checkbox__label {
  color: rgb(255, 255, 255) !important;
}

.login-forgotPassword:hover {
  display: inline-block;
  background-color: rgba(201, 201, 201, 0.5);
  color: rgb(75, 111, 222);
}

.backPass .getVerifycation .el-button {
  display: inline-block;
  height: 40px;
  border-radius: 0;
  border: none;
}

.backPass .getVerifycation {
  position: absolute;
  top: 100px;
  right: 110px;
  z-index: 1;
}

.backPass .el-input {
  width: 300px;
  margin: 20px 120px;
}
</style>