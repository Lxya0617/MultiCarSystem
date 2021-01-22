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
      <!-- <Button type="primary" icon="md-add" @click="redHandler">red</Button> -->
      <Button type="primary" icon="md-add" @click="actionAdd">actionAdd</Button>
      <Divider />
    </div>
    <div class="robot-con">
      <div class="group">
        <label>
          选择分组&nbsp;
          <Select v-model="model1" style="width: 200px">
            <Option
              v-for="item in groupList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}
            </Option>
          </Select>
        </label>
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
  name: "NewRobot",
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
          key: "age",
        },
        {
          title: "SN码",
          key: "address",
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
     changeHandler(){
      this.$store.commit("change",{name:'post'}); 
      console.log(this.$store.state.name);
    },
    addHandler() {
      // this.$store.commit("add",{name:'jack',age:15,sex:'男'});
      alert('add')
    },
    redHandler(){
      this.$store.commit("reduce");
    },
    actionAdd(){
      this.$store.dispatch('aEdit',{age:15,name:'postmen'})
    }
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
