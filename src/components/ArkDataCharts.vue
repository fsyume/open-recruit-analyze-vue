<template>
  <div>
    <el-form label-width="100px" size="medium" :rules="rules" :model="userInfo" ref="loginForm">
      <el-form-item label="用户令牌" prop="token">
        <el-input
            v-model="userInfo.token"
            style="width: 300px; margin-right: 25px"
        ></el-input>
        <el-button type="primary" @click="inquiry('loginForm')">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="box" v-loading="loading">
      <div id="main" style="width: 600px; height: 400px"></div>

      <div class="table">
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="total"
              label="总次数"
              width="180">
          </el-table-column>
          <el-table-column
              prop="newP"
              label="新干员数"
              width="180">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArkDataCharts",
  data() {
    return {
      userInfo: {
        token: "",
      },
      arkData: {
        _six: 0,
        _five: 0,
        _four: 0,
        _three: 0,
        _isnew: 0,
      },
      tableData: [{
        total: 0,
        newP: 0
      }],
      rules: {
        token: [{required: true, message: "请输入令牌", trigger: "blur"}]
      },
      loading: null
    };
  },
  methods: {
    inquiry(fromName) {
      this.$refs[fromName].validate((valid) => {
        console.log(valid)
        this.loading = true;
        if (valid) {
          this.$http.post("arkdata", this.userInfo).then((res) => {
            const fineData = res.data.data;
            console.log(res.data);

            this.arkData._six = fineData.six;
            this.arkData._five = fineData.five;
            this.arkData._four = fineData.four;
            this.arkData._three = fineData.three;

            this.tableData[0].newP = fineData.isnew;
            this.tableData[0].total = fineData.six + fineData.five + fineData.four + fineData.three;

            this.myEcharts();

            this.loading = false;
          }).catch((err) => {
            this.$message.error(err);
            console.log(err)
            this.loading = false;
          });

        } else {
          this.$message.error("请填写您的用户令牌");
          this.loading = false;
        }
      })

    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: "明日方舟寻坊分析",
          subtext: "by：浮生yume",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "公开寻访",
            type: "pie",
            radius: "50%",
            data: [
              {
                value: this.arkData._six,
                name: "6星",
              },
              {
                value: this.arkData._five,
                name: "5星",
              },
              {
                value: this.arkData._four,
                name: "4星",
              },
              {
                value: this.arkData._three,
                name: "3星",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: space-around;
}


.table {
  width: 365px;
}
</style>
