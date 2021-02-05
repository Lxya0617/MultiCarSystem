<template>
  <div id="NewRobot" class="new-robot">
    <div class="btn-con">
      <!-- {{ this.$store.state.name }}
      {{ this.$store.state.password }}
      <br>
      {{this.$store.getters.nameInfo}}
      <br>
      {{this.$store.getters.fullInfo}} -->
      <!-- <Button type="primary" icon="md-add" @click="changeHandler">change</Button> -->
      <Button type="primary" icon="md-add" @click="addHandler">添加</Button>
      <Divider />
    </div>
    <div class="robot-con">
      <div class="group">
        <label>
          选择分组&nbsp;
          <Select v-model="groupId" style="width: 200px">
            <Option
              v-for="item in groupList"
              :value="item.guid"
              :key="item.guid"
              >{{ item.name }}
            </Option>
          </Select>
        </label>
      </div>
      <div class="lsit">
        <div>
          <Table
            @on-select="selectHandler"
            @on-select-all="selectAll"
            @on-select-all-cancel="selectCancel"
            border
            ref="selection"
            :columns="columns4"
            :data="RobotList"
          >
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
  name: "NewRobot",
  data() {
    return {
      groupId: "",
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "机器人名称",
          key: "name",
        },
        {
          title: "IP",
          key: "ip",
        },
        {
          title: "SN码",
          key: "sn",
        },
      ],
      RobotList: [
        {
          name: "John Brown",
          ip: 18,
          sn: "1 Lake Park",
        },
        {
          name: "John Brown",
          ip: 18,
          sn: "1 Lake Park",
        },
        {
          name: "John Brown",
          ip: 18,
          sn: "1 Lake Park",
        },
      ],
      groupList: [
        {
          guid: "New York",
          name: "New York",
        },
        {
          guid: "1",
          name: "1",
        },
      ],
      list: [], //选中机器人
    };
  },
  computed: {},
  methods: {
    getReportRobot() {
      api
        .reportRobot()
        .then((response) => {
          console.log(response);
          this.RobotList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGroup() {
      api
        .groups()
        .then((response) => {
          console.log(response);
          this.groupList = response.data;
          this.groupId = this.groupList[0].guid;
        })
        .catch((error) => {
          console.log(error);
        });
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
    addHandler() {
      api
        .add_robot(this.list)
        .then((response) => {
          if (response.code === 0) {
            this.getReportRobot();
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
    this.getReportRobot();
    this.getGroup();
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
#NewRobot {
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
