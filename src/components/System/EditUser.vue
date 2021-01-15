<template>
  <div id="EditUser" class="edit-user">
    <div class="btn-con">
      <Button icon="ios-arrow-dropleft" @click="back">返回</Button>
      <Button type="error" icon="md-trash" @click="removeHandler">删除</Button>
      <Button type="primary" icon="md-add" @click="preserveHandler">保存</Button>
      <Divider />
    </div>
    <div class="robot-con">
      <Form :model="formItem" :label-width="80" label-position="left">
        <FormItem label="用户名">
          <Input
            :disabled="userNameStatus"
            v-model="formItem.userName"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="密码">
          <Input
            v-model="formItem.password"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="用户组">
          <Select v-model="formItem.select" :disabled="userGroup">
            <Option v-for="(item,index) in userGroup" :value="item.name" :key="item.name">{{item.name}}</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: "EditUser",
  data() {
    return {
      userNameStatus:false,
      userGroup:false,
      preserveType:0,  
      formItem: {
        userName: "",
        password: "",
        checkbox: [],
      },
      userGroup:[{name:'管理员'},{name:'操作员'},{name:'中控员'}],
    };
  },
  computed: {},
  methods: {
    //删除
    back() {
      this.$router.go(-1);
    },
    //删除
    removeHandler(){
        console.log('删除')
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
      this.userNameStatus=true,
      this.userGroup=true,
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
#EditUser {
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
