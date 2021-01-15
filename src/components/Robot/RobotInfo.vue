<template>
  <div id="RobotInfo" class="Robot-info">
    <div class="btn-con">
      <Button type="primary" icon="md-beaker">删除</Button>
      <Divider />
    </div>
    <div class="robot-con">
      <div class="group"></div>
      <div class="lsit">
        <div>
          <Table border ref="selection" :columns="columns4" :data="data1">
            <template slot-scope="{ row, index }" slot="status">
              <!-- <Tag type="dot" color="primary">待机</Tag> -->
              <Tag type="dot" color="success">正在执行</Tag>
              <!-- <Tag type="dot"  color="error">标签三</Tag> -->
              <!-- <Tag type="dot" color="warning">暂停</Tag> -->
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="info" icon="md-build" @click="editHandler(row)">编辑</Button>
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
          key: "age",
          align: "center",
        },
        {
          title: "剩余电量",
          key: "address",
          align: "center",
        },
        {
          title: "机器人状态",
          key: "address",
          slot: "status",
          align: "center",
        },
        {
          title: "所属分组",
          key: "address",
          align: "center",
        },
        {
          title: "IP地址",
          key: "address",
          align: "center",
        },
        {
          title: "SN码",
          key: "address",
          align: "center",
        },
        {
          title: "异常信息",
          key: "address",
          align: "center",
        },
        {
          title: "操作",
          key: "address",
          slot: "action",
          align: "center",
          width: 120,
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
    editHandler(item){
      this.$router.push({path:"/maincontent/robotedit",query:{item:item}})
    },
  },
  created() {},
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
