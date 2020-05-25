<template>
  <div class="sigin-in">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <header class="register-header">
      <h3 class="register-title">注册界面</h3>
    </header>
    <section class="register-section">
      <h4 class="register-section-header">注册</h4>
      <div class="register-account">
        <el-input
          v-model="registerInput"
          placeholder="请输入用户名"
          @input="findUser"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </div>
      <div class="register-password">
        <el-input
          placeholder="请输入密码"
          v-model="registerPassword"
          show-password
          prefix-icon="el-icon-lock"
        ></el-input>
      </div>
      <div class="register-Repassword">
        <el-input placeholder="请确认密码" v-model="rePassword" show-password prefix-icon="el-icon-lock"></el-input>
      </div>
      <div class="register-email">
        <el-input v-model="email" placeholder="请输入邮箱" prefix-icon="el-icon-message"></el-input>
      </div>
      <div class="register-verification">
        <el-input v-model="verification" placeholder="请输入验证码" prefix-icon="el-icon-view"></el-input>
        <span class="getVerification">
          <el-button type="primary" @click="getVerification" :disabled="disabled">{{message}}</el-button>
        </span>
      </div>
    </section>
    <footer class="register-footer">
      <div class="register-sgin-in">
        <el-button type="primary" @click="register">注册</el-button>
        <router-link :to="{name :'#login'}" class="gotoLogin">使用已有帐号登录</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerInput: "",
      registerPassword: "",
      rePassword: "",
      email: "",
      verification: "",
      content: "获取验证码",
      disabled: false
    };
  },
  methods: {
    findUser() {
      if (!this.registerInput || this.registerInput == "") {
        this.$message.error("用户名不能为空");
        return false;
      }
      this.$axios({
        url: "/check/findUser",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        data: {
          name: this.registerInput
        }
      }).then(res => {
        if (res.data.status) {
          this.$message.warning("该用户名已被注册");
          return false;
        }
      });
      return true;
    },
    register() {
      if (!this.findUser()) {
        return false;
      }
      if (!this.registerInput || !/^\D+?.*$/.test(this.registerInput)) {
        this.$message.warning("用户名长度必须在1-15位之间,且不能以数字开头");
        return;
      }

      if (
        this.registerPassword == "" ||
        this.registerPassword.length < 1 ||
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/.test(this.registerPassword)
      ) {
        this.$message.warning(
          "密码必须由7-20位大小写英文字母,数字(允许中文和特殊字符)组成"
        );
        return;
      }
      if (
        this.rePassword == "" ||
        this.rePassword.length < 1 ||
        this.rePassword !== this.registerPassword
      ) {
        this.$message.error("两次输入的密码必须一致");
        return;
      }
      if (
        this.email == "" ||
        this.email.length < 1 ||
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)
      ) {
        this.$message.error("请输入正确的邮箱");
        return;
      }
      if (this.verification == "" || this.verification.length != 6) {
        this.$message.error("请输入验证码");
        return;
      }

      this.$refs.topProgress.start();
      var vm = this;
      this.$axios({
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        url: "/user/register",
        data: {
          username: this.registerInput,
          password: this.registerPassword,
          email: this.email,
          verification: this.verification
        },
        responseType: "json"
      }).then(res => {
        if (res.data.code === 200) {
          this.$refs.topProgress.done();
          this.$router.replace({ name: "all" });
        } else {
          this.$refs.topProgress.fail();
          this.$message.error("注册失败，请重试");
        }
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
            vm.content = timeLeft + "秒";
            timeCount();
          } else {
            vm.content = "获取验证码";
            vm.disabled = false;
            timeLeft = 120;
          }
        }, 1000);
      };
      timeCount();
    },
    getVerification() {
      if (
        !this.email ||
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)
      ) {
        this.$message.warning("请输入正确的邮箱");
        return;
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
            this.internal();
             this.$refs.topProgress.done()
            this.$message.success(res.data.message);
          } else {
             this.$refs.topProgress.fail()
            this.$message.error("验证码发送失败，请重试");
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  },
  computed: {
    message() {
      return this.content;
    }
  }
};
</script>

<style >
.sigin-in {
  position: relative;
  height: 500px;
}
.register-header {
  height: 140px;
  padding: 35px 0;
}
.register-title {
  width: 183px;
  height: 65px;
  color: rgb(255, 255, 255);
  font-size: 44px;
  margin: 0 auto;
  font-weight: 400;
}
.register-section-header {
  color: rgb(255, 255, 255);
  font-size: 24px;
  text-align: center;
}

.register-section {
  width: 369px;
  height: 186px;
  margin: 0 auto;
}

.register-account,
.register-password,
.register-Repassword,
.register-email {
  margin-bottom: 15px;
}
.register-verification .el-input__inner,
.register-verification .el-input {
  width: 252px;
}

.getVerification {
  width: 100px;
  float: right;
}
.getVerification .el-button {
  width: 100px;
  margin-top: 0 !important;
}
.register-footer {
  position: absolute;
  bottom: 0;
  left: 40px;
}
.register-footer .el-button {
  width: 158px;
}
.register-sgin-in {
  width: 369px;
  height: 70px;
}
.gotoLogin {
  float: right;
  margin-top: 30px;
  height: 20px;
  color: rgb(255, 255, 255);
  font-size: 14px;
}
.gotoLogin:hover {
  background-color: rgba(201, 201, 201, 0.5);
  color: rgb(75, 111, 222);
}

.register-sgin-in .el-button {
  margin-top: 20px !important;
}
</style>