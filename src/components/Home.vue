<template>
  <div class="home">
    <div class="list-con">
      <Table
        class="con-robot"
        border
        width="400"
        max-height="500"
        :columns="columns1"
        :data="data1"
      >
      <template slot-scope="{ row, index }" slot="age">
          {{row.age}}%
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Tag type="dot" color="primary">待机</Tag>
          <!-- <Tag type="dot" color="success">正在执行</Tag> -->
          <!-- <Tag type="dot"  color="error">标签三</Tag> -->
          <!-- <Tag type="dot" color="warning">暂停</Tag> -->
        </template>
      </Table>
      <Table
        class="con-task"
        border
        width=""
        resizable="true"
        max-height="500"
        :columns="columns2"
        :data="data2"
      >
      </Table>
    </div>
    <div class="map-con">
      <mape></mape>
    </div>
  </div>
</template>
<script>
import mape from "./Map/Mape";
export default {
  name: "Home",
  components: {
    mape,
  },
  data() {
    return {
      columns1: [
        {
          title: "车辆名称",
          key:"name",
          align: "center",
        },
        {
          title: "剩余电量",
          key:"age",
          slot:"age",
          align: "center",
        },
        {
          title: "运动状态",
          slot: "action",
          align: "center",
          width: 160,
        },
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No",
          date: "2016-10-01",
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No",
          date: "2016-10-02",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No",
          date: "2016-10-04",
        },
      ],
      columns2: [
        {
          title: "运单名称",
          key: "name",
          align: "center",
        },
        {
          title: "运单模式",
          key: "age",
          align: "center",
        },
        {
          title: "优先级",
          key: "address",
          align: "center",
        },
        {
          title: "运单状态",
          key: "address",
          align: "center",
        },
      ],
      data2: [
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
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {
    // var height = window.innerHeight;
    // var home = document.getElementsByClassName("home")[0];
    // var header = document.getElementsByClassName("ivu-layout-header")[0]
    //   .offsetHeight;
    // home.style.height = height - 66 - header + "px";
    // console.log(height, home, header);
  },
};
</script>
<style lang="scss" scoped>
.home {
  .list-con {
    width: 100%;
    display: flex;
    overflow: hidden;
    > div {
      float: left;
    }
    .con-robot {
      margin-right: 20px;
      .ivu-tag {
        width: 120px;
      }
    }
    .con-task {
      float: left;
      flex: 1;
    }
  }
}
</style>
