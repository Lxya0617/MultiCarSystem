<template>
  <div id="User" class="user">
    <!-- 按钮区 -->
    <div class="btn-con">
      <Button  icon="ios-arrow-dropleft" @click="back">返回</Button>
      <Button type="primary" icon="md-add" @click="preserve()">保存</Button>
      <Divider />
    </div>
    <!-- 内容区 -->
    <div class="con">
      <!-- 标签 -->
      <div class="def-group">
        <Tag type="dot">充电设置</Tag>
      </div>
      <!-- 内容区 -->
      <div class="charge-con">
        <div class="robot-box"  >
          <h4>自动充电</h4>
          <Form :model="formTop" label-position="top">
            <Tag color="default" size="medium">关闭：机器人必须手动充电。</Tag>
            <FormItem label="自动充电">
              <Select v-model="formTop.select">
                <Option  v-for="(item,index) in chargingList" :key="index" :value="item.value" :label="item.name"></Option>
              </Select>
            </FormItem>
            <FormItem label="自动回充的电量（%）">
              <Input v-model="formTop.input1"></Input>
            </FormItem>
            <FormItem label="充电让位（%）">
              <Input v-model="formTop.input2"></Input>
            </FormItem>
            <FormItem label="" >
            <RadioGroup v-model="formTop.chargeType">
                <Radio label="male" border>电量</Radio>
                <Radio label="female" border>时长</Radio>
            </RadioGroup>
        </FormItem>
            <FormItem label="充电中可接受任务的最低电量（%）">
              <Input v-model="formTop.input3"></Input>
            </FormItem>
            <FormItem label="结束充电的最短充电时长(单位分钟)">
              <Input v-model="formTop.input4"></Input>
            </FormItem>
            <FormItem label="可接受任务的最低电量百分比(%)">
              <Input v-model="formTop.input4"></Input>
            </FormItem>
            <FormItem label="最低电量去往的位置点">
              <Select v-model="formTop.select" multiple>
                <Option  v-for="(item,index) in positionList" :key="index" :value="item.value" :label="item.name"></Option>
              </Select>
            </FormItem>
          </Form>
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
      chargingList:[{name:'开启',value:1},{name:'关闭',value:0}],
      positionList:[{name:'位置点1',value:1},{name:'位置点2',value:2},{name:'位置点3',value:3}],
      formTop: {
          select:[],
          select1:1,
          chargeType:"",
          input1: '',
          input2: '',
          input3: '',
          input4: ''
        },
      defgroupList:[{user:'默认组'}],
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
    //保存
    preserve(){
      console.log('保存')
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    //地图预览
    previewHandler(){

    },
    back() {},
    addGroup(){
    this.$router.push({path:"/maincontent/newgroup"})
    },
    groupEdit(item){
      //  console.log(item)
       this.$router.push({name:'NewGroup',query:{item:item}})
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
    .charge-con{
      .robot-box{
          width: 100%;
          background: #f8f8f9;
          padding: 10px;
          margin: 10px 0;
          color: #515a6e;
          border-radius: 4px;
          cursor: pointer;
          form{
            .ivu-tag{
                margin: 10px 0;
            }
          }

          @media screen and(max-width:700px){
            width: 100%;
          }
        }
    }
   
  }
}
</style>
