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
          >当前机器人:&nbsp;&nbsp;<span style="font-weight: 700">{{robotName}}</span>
        </Tag>
      </div>
      <div class="group">
        <!-- <label> -->
        <p>选择分组:</p>
        <Select v-model="groupId" style="width: 200px">
          <Option
            v-for="item in groupList"
            :value="item.guid"
            :key="item.guid"
            >{{ item.name }}
          </Option>
        </Select>
        <!-- </label> -->
      </div>
      <div class="lsit"></div>
    </div>
  </div>
</template>
<script>
import api from '../../api'
export default {
  name: "NewRobot",
  data() {
    return {
      robotName:'robot1',
      robotInfo:'',
      groupList: [
        {
          guid: "New York",
          name: "New York",
        },
        {
          guid: "London",
          name: "London",
        },
      ],
      groupId: "",
      Id:'',
    };
  },
  computed: {},
  methods: {
    getGroup(){
      api.groups().then(response=>{
        console.log(response)
        this.groupList=response.data
        this.groupId=this.groupList[0].guid
      })
      .catch(error=>{
        console.log(error)
      })
    },
    back(){
        this.$router.go(-1)
    },
    //更改分组保存
    preserve(){
      console.log({guid:this.robotInfo.guid,groupId:this.groupId})
        api.change_group({guid:this.robotInfo.guid,groupId:this.groupId})
        .then(response=>{
          if(response.code===0){
            this.$Message.success(response.message);
          }else{
            this.$Message.error(response.message);
          }
        })
        .catch(error=>{
          console.log(error)
          this.$Message.error(error);
        })
    },
  },
  created() {
      this.robotInfo=this.$route.query.item
      this.robotName=this.$route.query.item.name
      this.getGroup()
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
