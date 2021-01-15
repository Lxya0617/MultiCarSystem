<template>
  <div id="BillInfo" class="bill-info">
    <div class="btn-con">
      <Button icon="ios-arrow-dropleft" @click="back">返回</Button>
      <Button type="primary" icon="ios-pause">暂停</Button>
      <Button type="success" icon="ios-play">继续</Button>
      <Button type="warning" >取消</Button>
      <Divider />
    </div>
    <div class="robot-con">
      <div class="lsit">
        <div>
          <Table  border ref="selection" :columns="columns4" :data="data1">
            <template slot-scope="{ row, index }" slot="status">
              <!-- <Tag type="dot" color="primary">待机</Tag> -->
              <Tag type="dot" color="success">正在执行</Tag>
              <!-- <Tag type="dot"  color="error">标签三</Tag> -->
              <!-- <Tag type="dot" color="warning">暂停</Tag> -->
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="info"  @click="editHandler(row)">编辑</Button>
              <Button type="warning"  @click="editHandler(row)">详情</Button>
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
  name: "BillInfo",
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: 'left'
        },
        {
          title: "运单名称",
          key: "name",
          align: "center",
          fixed: 'left'
          
        },
        {
          title: "任务",
          key: "age",
          align: "center",
        },
        {
          title: "优先级",
          key: "address",
          align: "center",
        },
        {
          title: "开始时间",
          key: "address",
          align: "center",
        },
        {
          title: "结束时间",
          key: "address",
          align: "center",
        },
        {
          title: "实际开始时间",
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
          slot: "status",
        },
        {
          title: "指派机器人",
          key: "address",
          align: "center",
        },
        {
          title: "备注",
          key: "address",
          align: "center",
        },{
          title: "操作",
          key: "address",
          slot: "action",
          align: "center",
          width: 180,
          fixed: 'right'
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
#BillInfo {
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
