<template>
  <div id="TaksManage" class="task-manage">
    <div class="btn-con">
      <Button icon="ios-arrow-dropleft" @click="back">返回</Button>
      <Button type="primary" icon="md-add">新建</Button>
      <Divider />
    </div>
    <div class="robot-con">
      <div class="lsit">
        <div>
          <Table ref="selection" :columns="columns4" :data="data1">
            <template slot-scope="{ row, index }" slot="edit">
              <Button type="info" icon="md-build" @click="editHandler(row)">编辑</Button>
              <Button type="error" icon="md-trash" @click="removeHandler(row)">删除</Button>
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
  name: "TaksManage",
  data() {
    return {
      groupList: [
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
        {
          value: "Sydney",
          label: "Sydney",
        },
        {
          value: "Ottawa",
          label: "Ottawa",
        },
        {
          value: "Paris",
          label: "Paris",
        },
        {
          value: "Canberra",
          label: "Canberra",
        },
      ],
      model1: "",
      columns4: [
        {
          title: "任务",
          key: "name",
          align:'center'
        },
        {
          title: "操作",
          key: "age",
          slot: "edit",
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
    //删除
    back(){
        this.$router.go(-1)
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
#TaksManage {
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
