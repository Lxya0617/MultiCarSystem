<template>
  <div id="NewRobot" class="new-robot">
    <div class="btn-con">
      <Button icon="ios-arrow-dropleft" @click="back">返回</Button>
      <Button type="primary" icon="md-print" @click="preserveHandler">保存 </Button>
      <Divider />
    </div>
    <div class="robot-con">
      <Form :model="formItem" :label-width="80" label-position="left">
        <FormItem label="名称">
          <Input
            v-model="formItem.input"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="任务">
          <Select v-model="formItem.select">
            <Option v-for="(item,index) in taskList" :value="item.name" :key="item.name">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="指派机器" >
          <Select v-model="formItem.select" clearable >
            <Option v-for="(item,index) in taskList" :value="item.name" :key="item.name">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="优先级">
          <RadioGroup v-model="formItem.radio">
            <Radio label="默认"></Radio>
            <Radio label="高"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="运单模式" >
          <Select v-model="formItem.select" clearable >
            <Option v-for="(item,index) in taskList" :value="item.name" :key="item.name">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="备注">
          <Input
            v-model="formItem.textarea"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: "NewRobot",
  data() {
    return {
       taskList:[{name:'task1'},{name:'task2'}],
       formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: "",
      },
    };
  },
  computed: {},
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    back() {
      this.$router.go(-1);
    },
    preserveHandler(){
      console.log('保存')
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
#NewRobot {
  height: 1160px;
  .btn-con {
    .ivu-divider {
      margin-top: 16px;
    }
  }
  .robot-con {
    .ivu-form{
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 6px;
    }
    .ivu-form:hover{
    box-shadow: 0 2px 7px rgba(0,0,0,.15);
    border-color: transparent;
    }
  }
}
</style>
