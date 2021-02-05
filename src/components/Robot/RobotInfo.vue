<template>
  <div id="RobotInfo" class="Robot-info">
    <div class="btn-con">
      <Button type="primary" icon="md-beaker" @click="deleteHandler"
        >删除</Button
      >
      <Divider />
    </div>
    <div class="robot-con">
      <div class="group"></div>
      <div class="lsit">
        <div>
          <Table
            border
            ref="selection"
            :columns="columns4"
            :data="robotList"
            @on-select="selectHandler"
            @on-select-all="selectAll"
            @on-select-all-cancel="selectCancel"
          >
            <template slot-scope="{ row, index }" slot="state">
              <Tag type="dot" v-show="row.state === 1" color="primary"
                >待机</Tag
              >
              <Tag type="dot" v-show="row.state === 2" color="success"
                >正在执行</Tag
              >
              <Tag type="dot" v-show="row.state === 3" color="error"
                >标签三</Tag
              >
              <Tag type="dot" v-show="row.state === 4" color="warning"
                >暂停</Tag
              >
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="info" icon="md-build" @click="editHandler(row)"
                >编辑</Button
              >
            </template>
          </Table>
          <!-- <Button @click="handleSelectAll(true)">Set all selected</Button> -->
          <!-- <Button @click="handleSelectAll(false)">Cancel all selected</Button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../api";
export default {
  name: "RobotInfo",
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "机器人名称",
          key: "name",
          align: "center",
        },
        {
          title: "型号",
          key: "type",
          align: "type",
        },
        {
          title: "剩余电量",
          key: "battery",
          align: "battery",
        },
        {
          title: "机器人状态",
          key: "state",
          slot: "state",
          align: "center",
        },
        {
          title: "所属分组",
          key: "group",
          align: "group",
        },
        {
          title: "IP地址",
          key: "ip",
          align: "ip",
        },
        {
          title: "SN码",
          key: "sn",
          align: "sn",
        },
        {
          title: "异常信息",
          key: "error",
          align: "error",
        },
        {
          title: "操作",
          key: "address",
          slot: "action",
          align: "center",
          width: 120,
        },
      ],
      robotList: [
        {
          name: "John Brown",
          age: 18,
          type: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
      ],
      guid: "1000000000000000000000000000009",
      list: [], //选中机器人
    };
  },
  computed: {},
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    editHandler(item) {
      console.log(item);
      this.$router.push({
        path: "/maincontent/robotedit",
        query: { item: item },
      });
    },
    //获取调度系统机器人
    getRobot() {
      api
        .robots()
        .then((response) => {
          this.robotList = response.data;
        })
        .catch((error) => {});
      // api.robot(`${this.guid}`).then(response=>{
      //   this.list=response.data
      //   this.robotList=[]
      //   this.robotList.push(this.list)
      // })
      // .catch(error=>{
      //   console.log(error)
      // })
    },
    selectHandler(selection, row) {
      console.log(selection, row);
      this.list = selection;
    },
    selectAll(selection) {
      this.list = selection;
    },
    selectCancel(selection) {
      this.list = selection;
    },
    deleteHandler() {
      console.log(this.list);
      var selectList = [];
      for (var i = 0; i < this.list.length; i++) {
        selectList.push(this.list[i].guid);
      }
      selectList = selectList.map((item) => ({
        guid: item,
      }));
      api
        .delete_robot(selectList)
        .then((response) => {
          if (response.code === 0) {
            this.getRobot();
            this.$Message.success(response.message);
          } else {
            this.$Message.error(response.message);
          }
        })
        .catch((error) => {
          this.$Message.error(error);
        });
    },
  },
  created() {
    this.getRobot();
  },
  mounted() {
    //    var height=window.innerHeight
    //    var home=document.getElementsByClassName('home')[0]
    //    var header=document.getElementsByClassName('ivu-layout-header')[0].offsetHeight
    //    home.style.height=height-66-header+'px'
    //    console.log(height,home,header)
  },
};
</script>
<style lang="scss" scoped>
#RobotInfo {
  height: 1160px;
  .btn-con {
    .ivu-divider {
      margin-top: 16px;
    }
  }
  .robot-con {
    .lsit {
      margin-top: 16px;
    }
  }
}
</style>
