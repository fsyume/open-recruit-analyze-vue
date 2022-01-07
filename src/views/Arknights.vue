<template>
  <!-- 明日方舟页面 -->
  <div>
    <h2>明日方舟Arknights寻访分析</h2>
    <div class="main-box">
      <el-card>
       如何获取明日方舟用户token?
        <el-link href="https://docs.qq.com/doc/DS3ZldmRIQnJrWExO" target="_blank">👉点我获取教程📄 </el-link>

        <br>

        <span style="color: red;font-size: 20px">本站点服务器不会储存您的任何信息</span>
      </el-card>
    </div>

    <div class="main-box">
      <el-card>
        <ArkDataCharts class="findByToken"></ArkDataCharts>
      </el-card>
      <el-card class="card2">
        ©2020 - now By
        <el-link href="https://www.fsyume.com" target="_blank"
        >浮生yume
        </el-link
        >
        &nbsp;
        <el-link href="https://github.com/kzycn/Arknights_OpenSearch_Analyze">后台Github地址</el-link>
        &nbsp;
        <span style="color: red">
        本站为学习和娱乐使用，与
        <el-link type="danger" href="https://www.hypergryph.com/#/">鹰角网络</el-link>
        皆无任何关系
          </span>
      </el-card>
    </div>
  </div>
</template>

<script>
import ArkDataCharts from "@/components/ArkDataCharts";
import clipboard from "clipboard";

export default {
  name: "arknights",
  components: {ArkDataCharts},
  data() {
    return {
      localToken: localStorage.getItem("token"),
      loginForm: {
        phone: "",
        password: "",
        token: "",
      },
      rules: {
        phone: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min: 11, max: 11, message: "手机号为11位数", trigger: "blur"},
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
      },
    };
  },
  methods: {
    // 重制表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交表单
    submitForm(formName) {
      // 验证表单是否符合要求
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 给后台发送post登录请求
          this.$http.post("usertoken", this.loginForm).then((res) => {
            console.log(res.data);
            this.loginForm.token = res.data.token;
            console.log(this.loginForm.token);
            if (res.data.static) {
              // 在本地缓存储存用户信息
              localStorage.setItem("token", res.data.token);
              this.$message.success("登录成功");
            } else {
              this.$message.error("登录失败，请检查用户名和密码");
            }
          }).catch((err) => {
            this.$message.error(err);
            console.log(err)
          });
        } else {
          this.$message.error("请将表单填写完整");
        }
      });
    },
    // 一键复制
    copy() {
      const clip = new clipboard('.copy-txt');

      clip.on('success', e => {
        this.$message.success("复制成功！")
        console.log(e)
        clip.destroy()
      })
      clip.on('error', e => {
        // 不支持复制
        this.$message.error('该浏览器不支持自动复制')
        console.log(e)
        // 释放内存
        clip.destroy()
      })

    }
  },
};
</script>

<style scoped>
h2 {
  margin-top: 25px;
  margin-left: 30px;
}

.findByToken {
  margin-top: 10px;
}

.main-box {
  padding-bottom: 10px;
  margin: 30px;
}

.card2 {
  margin-top: 10px;
}
</style>
