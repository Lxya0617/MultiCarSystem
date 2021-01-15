<template>
  <div id="User" class="user">
    <!-- 按钮区 -->
    <div class="btn-con">
      <Button  icon="ios-arrow-dropleft" @click="back">返回</Button>
      <Button type="primary" icon="md-add" @click="addUser()">创建用户</Button>
      <Divider />
    </div>
    <!-- 内容区 -->
    <div class="con">
      <!-- 默认组 -->
      <div class="def-group">
        <Tag type="dot">默认用户</Tag>
        <div class="group-list">
          <div class="group-box" v-for="(item ,index) in defgroupList" :key="index" >
            <div class="group-state">
              <Icon type="md-lock" size="20" />
              {{item.user}}
            </div>
          </div>
        </div>
      </div>
      <!-- 任务组 -->
      <div class="task-group">
        <Tag type="dot">用户组</Tag>
        <div class="group-list">
          <div class="group-box" v-for="(item ,index) in taskgroupList" :key="index" >
            <div class="group-state">
              <Icon type="md-person" size="20" />
              {{item.user}}
            </div>
            <div class="group-state">
              <Button  icon="ios-construct" type="primary" shape="circle" @click.stop="userEdit(item)"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "User",
  data() {
    return {
      defgroupList:[{user:'admin'}],
      taskgroupList:[{user:1},{user:2},{user:3},{user:4}],
    };
  },
  computed: {},
  methods: {
    //根据Type去改变它的icon
    activeClass:function (val) {
    if(val===0){
        return "url('#this_position')"
    }else if(val===1){
        return "url('#this_precision')"
    }else if(val===2){
        return "url('#this_charge')"
    }
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    //地图预览
    previewHandler(){

    },
    back() {},
    addUser(){
    this.$router.push({path:"/maincontent/newuser"})
    },
    userJump(item){
      //  console.log(item)
       this.$router.push({name:'NewUser',query:{item:item}})
    },
    userEdit(item){
       console.log(item)
       this.$router.push({name:'EditUser',query:{item:item}})
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
#User {
  height: 1160px;
  .btn-con {
    .ivu-btn {
      // float: left;
      // margin-right: 4px;
    }
    .ivu-upload {
      float: left;
    }
    .ivu-divider {
      margin-top: 16px;
    }
    .ivu-tag {
      height: 32px;
      line-height: 32px;
      margin: 0;
    }
  }
  .con {
      //清除浮动
      // :after {
      //   content: "";
      //   display: block;
      //   clear: both;
      //   /* height:0;和overflow:hidden;是为了解决IE兼容的问题 */
      //   height: 0;
      //   overflow: hidden;
      //   /* visibility:hidden;是为了去除content中的文字 */
      //   visibility: hidden;
      // }
    .def-group {
      margin: 16px 0;
       /*列表*/
      .group-list{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        .group-box{
          width: 31%;
          height: 80px;
          padding: 10px 10px 10px 40px;
          margin: 10px 0;
          background:#f8f8f9;
          color: #515a6e;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          @media screen and(max-width:700px){
            width: 100%;
          }
          .group-name{
            font-size: 16px;
            margin-left: 20px;
            line-height: 60px;
            /*float: left;*/
            .ivu-tag{
              margin: 0 10px;
            }
          }
          .group-state{
            margin-right: 20px;
            line-height: 60px;
            >i{
              padding: 4px;
            }
          }
        }
        .group-box:hover{
          background-color:#e8eaec;
          border-color:#e8eaec;
        }
      }
    }
    .task-group {
      margin: 16px 0;
       /*列表*/
      .group-list{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        .group-box{
          width: 31%;
          height: 80px;
          padding: 10px 10px 10px 40px;
          margin: 10px 0;
          background:#f8f8f9;
          color: #515a6e;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          @media screen and(max-width:700px){
            width: 100%;
          }
          .group-state{
            margin-right: 20px;
            line-height: 60px;
            >i{
              padding: 4px;
            }
          }
          .group-state:nth-child(2){
            margin-right: 20px;
            line-height: 60px;
            >i{
              padding: 4px;
              background: #2d8cf0;
              border-radius:50%;
              border: 1px solid #2d8cf0;
              color: #ffffff;
            }
          }
        }
        .group-box:hover{
          background-color:#e8eaec;
          border-color:#e8eaec;
        }
      }
    }
  }
}
</style>
