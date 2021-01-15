<template>
  <div id="RobotEdit" class="robot-edit">
    <div class="btn-con">
      <Button icon="ios-arrow-dropleft" @click="back">返回</Button>
      <Button type="primary" icon="ios-checkbox" @click="preserve">保存</Button>
      <Divider />
    </div>
    <div class="robot-con">
      <div class="robot-name">
        <Tag type="dot"
          >当前机器人:&nbsp;&nbsp;<span style="font-weight: 700">{{mapName}}</span>
        </Tag>
      </div>
      <div class="group">
        <!-- <label> -->
        <p>选择分组:</p>
        <Select v-model="model1" style="width: 200px">
          <Option
            v-for="item in groupList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}
          </Option>
        </Select>
        <!-- </label> -->
      </div>
      <div class="lsit"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NewRobot",
  data() {
    return {
      mapName:'robot1',
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
      Id:'',
    };
  },
  computed: {},
  methods: {
    back(){
        this.$router.go(-1)
    },
    preserve(){
        alert('保存')
    },
  },
  created() {
      this.Id=this.$route.query.Id
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
#RobotEdit {
  height: 1160px;
  .btn-con {
    .ivu-divider {
      margin-top: 16px;
    }
  }
  .robot-con {
    .robot-name {
      margin: 16px 0;
    }
    .group {
      .ivu-select {
        margin-top: 8px;
      }
    }
    .lsit {
      margin-top: 16px;
    }
  }
}
</style>
