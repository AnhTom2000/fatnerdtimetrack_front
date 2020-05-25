<template>
  <div class="personal">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <div class="personal-header">
      <div class="personal-avator">
        <el-avatar :size="100" :src="userImage"></el-avatar>
        <div class="personal-changAvator">
          <el-link type="warning" :underline="false" @click="showdialog">更换头像</el-link>
        </div>
      </div>
      <div class="personal-panel">
        <ft-input :username.sync="user.username"></ft-input>
        <ul class="personal-counts">
          <li>
            <span class="number">{{counts.eventNum}}</span>&nbsp;
            <span class="name">任务</span>
          </li>
          <li>
            <span class="number">{{counts.finishedNum}}</span>&nbsp;
            <span class="name">已完成</span>
          </li>
          <li>
            <span class="number">{{counts.tagNum}}</span>&nbsp;
            <span class="name">标签</span>
          </li>
          <li>
            <span class="number">{{counts.useDays}}</span>&nbsp;
            <span class="name">使用天数</span>
          </li>
        </ul>
        <p class="qutoes">有些烦恼，丢掉了，才有云淡风轻的机会。</p>
      </div>
    </div>
    <div class="privacysettings">
      <div class="email">
        <span class="inputNumber">绑定邮箱:</span>
        <el-input
          v-model="user.email"
          placeholder="绑定邮箱"
          type="email"
          prefix-icon="el-icon-message
"
        ></el-input>
        <el-input class="verifycation" v-model="verifycode" placeholder="输入验证码"></el-input>
        <span class="getVerifycation">
          <el-button type="info" @click="getVerification">{{message}}</el-button>
        </span>
      </div>
      <div class="phone">
        <span class="inputPhone">绑定手机号：</span>
        <el-input
          class="phone-input"
          v-model="user.phone"
          placeholder="绑定手机号"
          @change="bindingPhone"
        ></el-input>
      </div>
      <div class="qq">
        <span class="inputNumber">绑定qq：</span>
        <el-input class="qq-input" v-model="user.qq" placeholder="绑定qq" @change="bindingQq"></el-input>
      </div>
      <div class="self-saying">
        <span class="inputNumber">个性签名:</span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="写点话激励一下自己吧"
          v-model="user.description"
          @change="bindDescription"
        ></el-input>
      </div>
    </div>
    <el-dialog title="更换头像" :visible.sync="dialogVisible" width="18%">
      <el-row>
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            drag
            ref="upload"
            action="/update/user/updateUserAvator"
            :before-upload="beforeupload"
            :show-file-list="false"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
          </el-upload>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import FtInput from "../components/Ft-input";
import { mapState } from "vuex";
export default {
  components: {
    "ft-input": FtInput
  },
  data() {
    return {
      user: {},
      counts: {},
      dialogVisible: false,
      verifycode: "",
      image: "",
      uploadForm: new FormData(),
      userImage: "",
      content: "点击获取验证码"
    };
  },
  created() {
    this.isLogin();
    this.$store.dispatch("initEventList");
    this.$store.dispatch("initTagList");
  },
  computed: {
    ...mapState({
      todo_list: state => state.todo_list,
      tag_list: state => state.tag_list
    }),
    message: {
      get() {
        return this.content;
      }
    }
  },
  methods: {
    showPropress() {
      this.$refs.topProgress.start();
      setTimeout(() => {
        this.$refs.topProgress.done();
      }, 1000);
    },
    bindingPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.user.phone)) {
        this.$message.error("请输入正确的手机号");
        return false;
      }
      this.showPropress();
      this.$axios({
        url: "/user/bind",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        data: {
          bind: this.user.phone,
          flag: "phone"
        }
      }).then(res => {
        if (res.data.code == 200) {
        }
      });
    },
    bindingQq() {
      if (!/[1-9][0-9]{4,14}/.test(this.user.qq)) {
        this.$message.error("请输入正确的qq号");
        return false;
      }
      this.showPropress();
      this.$axios({
        url: "/user/bind",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        data: {
          bind: this.user.qq,
          flag: "qq"
        }
      }).then(res => {
        if (res.data.code == 200) {
        }
      });
    },
    bindDescription() {
      if (this.user.description.length >= 255) {
        this.$message.warning("最多只能写255个字噢");
        return false;
      }
      this.showPropress();
      this.$axios({
        url: "/user/bind",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        data: {
          bind: this.user.description,
          flag: "description"
        }
      }).then(res => {
        if (res.data.code == 200) {
        }
      });
    },
    showdialog() {
      this.dialogVisible = true;
      this.image = this.user.avatarUrl;
    },
    getCounts() {
      return {
        eventNum: this.todo_list.length,
        finishedNum: this.todo_list.filter(event => {
          return !event.finished;
        }).length,
        tagNum: this.tag_list.length,
        useDays: this.getDays()
      };
    },
    getDays() {
      const now = new Date();
      const day = new Date(this.user.createTime);
      var timeDay = now.getTime() / 1000 - parseInt(day.getTime() / 1000);
      return parseInt(timeDay / 60 / 60 / 24) + 1;
    },
    isLogin() {
      this.$axios({
        method: "get",
        url: "/user/isLogin"
      }).then(res => {
        if (res.data) {
          this.user = res.data;
        } else {
          this.$confirm("您的会话已过期或者您未注册", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$router.push({ name: "#login" });
            })
            .catch(() => {
              this.$router.push({ name: "#login" });
            });
        }
      });
    },
    beforeupload(file) {
      this.uploadForm.append("file", file);
      return false;
    },
    clearUpload() {
      this.uploadForm = new FormData();
    },
    submitUpload() {
      this.dialogVisible = false;
      let data = this.uploadForm;
      this.$refs.upload.submit();
      this.$refs.topProgress.start();
      this.$axios({
        url: "/update/user/updateUserAvator",
        method: "post",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (res.data.status) {
          this.$refs.topProgress.done();
          this.$message.success("更改头像成功");
          this.user.avatarUrl = res.data.message;
          this.clearUpload();
        } else {
          this.$refs.topProgress.fail();
          this.$message.error("服务器忙，请重试");
        }
      });
    },
    getVerification() {
      if (
        !this.user.email ||
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          this.user.email
        )
      ) {
        this.$message.warning("请输入正确的邮箱");
        return;
      }
      this.$refs.topProgress.start();
      if (this.content == "点击获取验证码") {
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
            email: this.user.email
          }
        })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.content = "点击绑定邮箱";
              this.internal();
              this.$refs.topProgress.done();
              this.$message.success("验证码发送成功，请在邮箱中查看");
            } else {
              this.$refs.topProgress.fail();
              this.$message.error("验证码发送失败，请重试");
            }
          })
          .catch(error => {
            this.$refs.topProgress.fail();
            this.$message.error(error);
          });
      } else {
        if(this.verifycode.length < 1 || this.user.email.length < 1){
          this.$message.error('请填写必要的字段');
          return false;
        }
        this.$axios({
          url: "/user/bind/bindEmail",
          method: "post",
          transformRequest: [
            data => {
              //  对data进行任意转换处理
              return this.$qs.stringify(data);
            }
          ],
          data: {
            email: this.user.email,
            checkCode: this.verifycode
          }
        })
          .then(res => {
            if (res.data.code == 200) {
              this.$refs.topProgress.done();
              this.$message.success("绑定成功");
            } else {
              this.$refs.topProgress.fail();
              this.$message.error("验证码不正确，请重试");
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      }
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
            vm.content = "点击绑定"+timeLeft + "秒";
            timeCount();
          } else {
            vm.content = "点击获取验证码";
            vm.disabled = false;
            timeLeft = 120;
          }
        }, 1000);
      };
      timeCount();
    }
  },
  watch: {
    todo_list() {
      this.counts = this.getCounts();
    },
    "user.avatarUrl": {
      handler(value, old) {
        this.userImage = value;
      },
      immediate: true,
      deep: true
    },
    "user.username": {
      handler(value, old) {
        // this.$refs.topProgress.start();
        this.$store.dispatch("updateUsername", this.user.username);
        var vm = this;
        // setTimeout(function() {
        //   vm.$refs.topProgress.done();
        // }, 1000);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style >
.personal {
  position: relative;
  height: 100%;
}
.personal-header {
  display: inline-block;
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.personal-panel {
  position: absolute;
  width: 460px;
  height: 150px;
  top: 1%;
  right: 5%;
}

.personal-avator .personal-changAvator {
  width: 100px;
  padding: 0 20px;
}

.personal-counts {
  display: block;
  width: 460px;
  height: 30px;
  list-style: none;
}
.personal-counts li {
  float: left;
  padding-right: 10px;
  border-right: 1px solid #ccc;
  margin-left: 10px;
}
.personal-counts li:last-child {
  border-right: none;
}
.personal-counts .number {
  color: rgba(0, 0, 0, 0.85);
}
.personal-counts .name {
  color: rgb(117, 117, 117);
}
.qutoes {
  display: block;
  height: 28px;
  width: 460px;
  line-height: 28px;
  padding-left: 10px;
  font-family: "楷体";
  color: #ccc;
}
.personal .privacysettings {
  width: 100%;
  height: 530px;
}
.email {
  position: relative;
}
.inputNumber {
  display: inline-block;
  margin-left: 10px;
  margin-right: 30px;
  height: 100px;
}

.privacysettings .el-input__inner,
.privacysettings .el-input {
  width: 400px;
}
.privacysettings .verifycation {
  position: absolute;
  top: 60px;
  right: 25.3%;
}
.privacysettings .getVerifycation {
  position: absolute;
  top: 60px;
  right: 25%;
  z-index: 1;
}
.privacysettings .getVerifycation .el-button {
  display: inline-block;
  height: 40px;
  border-radius: 0;
  border: none;
}

.privacysettings .phone {
  height: 50px;
}

.privacysettings .self-saying {
  position: relative;
  height: 220px;
}
.privacysettings .phone,
.privacysettings .qq {
  line-height: 100px;
}
.privacysettings .el-textarea {
  top: 30px;
  right: 68px;
  position: absolute;
  width: 500px;
  height: 181px !important;
}
.privacysettings .el-textarea__inner {
  width: 500px;
  height: 181px !important;
}
.privacysettings .inputPhone {
  margin-left: 12px;
}

.personal .el-upload-dragger {
  width: 300px;
  margin: 0 auto;
}
.el-message {
  z-index: 10000;
}
</style>