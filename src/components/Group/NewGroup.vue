<template>
  <div id="NewGroup" class="new-group">
    <div class="btn-con">
      <Button icon="ios-arrow-dropleft" @click="back">返回</Button>
      <Button type="primary" icon="md-add" @click="preserveHandler">保存</Button>
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
            <CheckboxGroup v-model="formItem.checkbox">
                <Checkbox label="Eat" border v-for="(item,index) in taskList" :key=item.name :label="item.name"></Checkbox>
            </CheckboxGroup>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: "NewGroup",
  data() {
    return {
      preserveType:0,  
      formItem: {
        input: "",
        checkbox: [],
      },
      taskList:[{name:'task1'},{name:'task2'},{name:'task3'},{name:'task4'},{name:'task5'}],
    };
  },
  computed: {},
  methods: {
    //删除
    back() {
      this.$router.go(-1);
    },
    preserveHandler(){
        console.log(this.formItem.checkbox)
        if(this.preserveType===0){
            console.log('新建')
        }else{
            console.log('保存')  
        }
    }
  },
  created() {
      console.log(this.$route.query.item)
      if(this.$route.query.item){
        this.formItem.input=this.$route.query.item.user
        this.preserveType=1
      }else{
        this.preserveType=0 
      }
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
#NewGroup {
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
