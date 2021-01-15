<template>
  <div id="BillInfo" class="bill-info">
    <div class="btn-con">
      <div class="r1-con">
        <span>开始时间:&nbsp;</span>
        <Row class="r1">
          <Col span="10">
            <DatePicker
              type="date"
              style="width: 100%"
              :editable="false"
              :clearable="false"
              v-model="StartDate"
            ></DatePicker>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="4">
            <Select v-model="startHour">
              <Option
                v-for="item in hourList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="4">
            <Select v-model="startMinute">
              <Option
                v-for="item in minuteList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </Col>
        </Row>
      </div>
      <div class="r2-con">
        <span>结束时间:&nbsp;</span>
        <Row class="r2">
          <Col span="10">
            <DatePicker
              type="date"
              style="width: 100%"
              :editable="false"
              :clearable="false"
              v-model="EndDate"
              format="yyyy-MM-dd"
            ></DatePicker>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="4">
            <Select v-model="EndHour">
              <Option
                v-for="item in hourList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="4">
            <Select v-model="EndMinute">
              <Option
                v-for="item in minuteList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </Col>
        </Row>
      </div>
      <Button type="primary" icon="ios-search" @click="serchHandler"
        >查询</Button
      >
      <Divider />
    </div>
    <div class="robot-con">
      <!-- 标签 -->
      <div class="robot-name">
        <Tag type="dot">运单详情</Tag>
      </div>
      <div class="lsit">
        <div>
          <Table border ref="selection" :columns="columns4" :data="data1">
          </Table>
          <!-- <Button @click="handleSelectAll(true)">Set all selected</Button> -->
          <!-- <Button @click="handleSelectAll(false)">Cancel all selected</Button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BillInfo",
  data() {
    return {
      formItem: {},
      StartDate: "2020-7-01", //开始日期
      startHour: "", //开始时
      startMinute: "", //开始分
      StartTime: "00:00:00", //开始时间
      EndDate: "2020-07-01", //结束日期
      EndHour: "", //结束时
      EndMinute: "", //结束分
      EndTime: "00:00:00", //结束时间
      hourList: [
        { value: "1", label: "01" },
        { value: "2", label: "02" },
        { value: "3", label: "03" },
        { value: "4", label: "04" },
        { value: "5", label: "05" },
        { value: "6", label: "06" },
        { value: "7", label: "07" },
        { value: "8", label: "08" },
        { value: "9", label: "09" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
      ],
      minuteList: [
        { value: "00", label: "00" },
        { value: "05", label: "05" },
        { value: "10", label: "10" },
        { value: "15", label: "15" },
        { value: "20", label: "20" },
        { value: "25", label: "25" },
        { value: "30", label: "30" },
        { value: "35", label: "35" },
        { value: "40", label: "40" },
        { value: "45", label: "45" },
        { value: "50", label: "50" },
        { value: "55", label: "55" },
      ],
      columns4: [
        {
          title: "运单名称",
          key: "name",
          align: "center",
          fixed: "left",
        },
        {
          title: "优先级",
          key: "address",
          align: "center",
        },
        {
          title: "计划最早开始时间",
          key: "address",
          align: "center",
        },
        {
          title: "计划最晚开始时间",
          key: "address",
          align: "center",
        },
        {
          title: "实际开始时间",
          key: "address",
          align: "center",
        },
        {
          title: "实际结束时间",
          key: "address",
          align: "center",
        },
        {
          title: "运单模式",
          key: "address",
          align: "center",
        },
        {
          title: "运单状态",
          key: "address",
          align: "center",
        },
        {
          title: "指派机器人",
          key: "address",
          align: "center",
        },
        {
          title: "位置点参数",
          key: "address",
          align: "center",
        },
        {
          title: "备注",
          key: "address",
          align: "center",
        },
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
      ],
    };
  },
  computed: {},
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    editHandler(item) {
      this.$router.push({
        path: "/maincontent/robotedit",
        query: { item: item },
      });
    },
    serchHandler() {
      //开始时间
      var reqData = this.formItem;
      var startYear = this.StartDate.getFullYear();
      var startMonth = this.StartDate.getMonth() + 1;
      var startDay = this.StartDate.getDate();
      var StartTime = `${startYear}-${startMonth}-${startDay}`;
      StartTime = new Date(StartTime).getTime() / 1000;
      reqData.StartTime =
        StartTime +
        Number(this.startHour) * 3600 +
        Number(this.startMinute * 60) -
        8 * 3600;
      //结束时间
      var endYear = this.EndDate.getFullYear();
      var endMonth = this.EndDate.getMonth() + 1;
      var endDay = this.EndDate.getDate();
      var EndTime = `${endYear}-${endMonth}-${endDay}`;
      EndTime = new Date(EndTime).getTime() / 1000;
      reqData.EndTime =
        EndTime +
        Number(this.EndHour) * 3600 +
        Number(this.EndMinute * 60) -
        8 * 3600;
      console.log(reqData.StartTime, reqData.EndTime);
    },
  },
  created() {},
  mounted() {
    const myDate = new Date();
    const year = myDate.getFullYear(); //获取当前年份
    const month = myDate.getMonth() + 1; //获取当前月份,0表示1月所以+1
    const day = myDate.getDate(); //获取当前日(0-31)
    const hour = myDate.getHours(); //获取当前小时数(0-23)
    var minute = myDate.getMinutes(); //获取当前分钟(0-60)
    console.log(year, month, day, hour, minute);
    var tenNum;
    var oneNum;
    var minuteT;
    //转换字符串
    var minuteStr = (minute + "").split("");
    if (minuteStr.length === 1) {
      minuteStr.unshift("0");
    }
    tenNum = minuteStr[0];
    oneNum = minuteStr[1];
    console.log(minuteStr);
    console.log(tenNum, oneNum);
    if (oneNum >= 0 && oneNum < 5) {
      oneNum = 0 + "";
    } else if (oneNum >= 5 && oneNum <= 9) {
      oneNum = 5 + "";
    }
    minuteT = tenNum + oneNum;
    this.StartDate = `${year}-${month}-${day}`;
    this.startHour = hour + "";
    this.startMinute = minuteT + "";
    this.EndDate = `${year}-${month}-${day}`;
    this.EndHour = hour + 1 + "";
    this.EndMinute = minuteT + "";
  },
};
</script>
<style lang="scss" scoped>
#BillInfo {
  height: 1160px;
  .btn-con {
    .ivu-divider {
      margin-top: 16px;
    }
    .r1-con {
      float: left;
      span {
        float: left;
        line-height: 32px;
      }
      .r1 {
        float: left;
      }
    }
    .r2-con {
      float: left;
      span {
        line-height: 32px;
        float: left;
      }
      .r2 {
        float: left;
      }
    }
  }
  .robot-con {
    .lsit {
      margin-top: 16px;
    }
  }
}
</style>
