<template>
  <div class="login">
      <div class="box">
        <p class="logo">
          <!-- <img src="../../../static/logo.png" alt=""> -->
        </p>
      </div>
      <div class="content">
        <Form class="form"  ref="formInline" :model="formInline" :rules="ruleInline" inline >
          <h3 style="text-align: center;margin:20px">系统登录</h3>
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="code" v-show="verify">
            <input type="text" v-model="formInline.code" value="" placeholder="    请输入验证码" class="input-val">
            <canvas id="canvas" width="100" height="30" ref="test" @click="drawRec"></canvas>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
          </FormItem>
        </Form>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        verify:false,
        verifyReqState:'',
        testCode:['1','4','G','6'],
        formInline: {
          user: '',
          password: '',
          code:'',
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码.', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ],
          code: [
            { required: false, message: '请填写验证码.', trigger: 'blur' },
            { type: 'string', min: 4, message: '请填写图片中的验证码', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
    },
    mounted(){
    
    },
    methods: {
      drawRec(show_num) {
        console.log('刷新')
        var canvas_width=this.$refs.test.width;
        var canvas_height=this.$refs.test.height;
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        for (var i = 0; i < show_num.length; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
            var j = Math.floor(Math.random() * 54);//获取到随机的索引值
            var deg = Math.random() - 0.5; //产生一个随机弧度
            var txt = show_num[i];//得到随机的一个内容
            show_num[i] = show_num[i].toLowerCase();//转小写
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";
            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = this.randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = this.randomColor();//线条颜色
            context.beginPath();                     //开始路径
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);//起始位置
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);//到达位置
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = this.randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
      },
      //生成验证码
      draw(show_num) {
        console.log('刷新')
        var canvas_width=this.$refs.test.width;
        var canvas_height=this.$refs.test.height;
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度
        for (var i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var deg = Math.random() - 0.5; //产生一个随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();//转小写
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";
            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = this.randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = this.randomColor();//线条颜色
            context.beginPath();                     //开始路径
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);//起始位置
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);//到达位置
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = this.randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
      },
      //随机颜色
       randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
      },
      //是否需要验证码
      verifyReq(){
        this.verifyReqState=1
        this.verify=true;//显示验证组件
        this.ruleInline.code[0].required=true//验证码为必填项
        this.drawRec(this.testCode);//执行验证码操作
        // this.verifyReqState
        // this.$http.post(`${window.url}login`)
        //     .then(response=>{
        //       this.verifyReqState=response.Code //0-1
        //       if(this.verifyReqState===1){
        //         this.testCode=response.Data
        //         this.verify=true;//显示验证组件
        //         this.ruleInline.code[0].required=true//验证码为必填项
        //         this.drawRec(this.testCode);//执行验证码操作
        //       }
        //     })
    },
      //登录
      handleSubmit(name) {
        this.verifyReq()
        if(this.verifyReqState){
          this.$refs[name].validate((valid) => {
            if (valid ) {
              this.$router.push({path:'/maincontent'})
              console.log('登录成功')
              this.$http.post(`${window.url}login`)
                .then(response=>{
                  console.log(response)
                  if(response.Code===0){
                    this.$Message.success('Success!');
                    this.$router.push({path:'/maincontent'})
                  }
                })
                .catch(err=>{
                  this.$Message.error('Fail!');
                })
            }
          })
        }
      }
    },
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
.login{
  width: 100%;
  height: 100%;
  padding: 10px;
  /*logo*/
    .box{
     width: 100%;
      .logo{
        max-width: 1024px;
        margin: 0 auto;
       }
  }
  .content{
    /*表单*/
    .form{
      width: 360px;
      max-width: 1024px;
      margin: 10% auto;
      border:1px solid  #ddd;
      box-shadow: 0 0 10px #ddd;
      background: #fff;
      padding:20px;
      box-sizing: border-box;
      @media screen and(max-width:370px){
        width: 300px;
      }
      .ivu-form-item{
        width: 100%;
      }
      .ivu-form-item:nth-child(3){
        display: block;
      }
      .input-val{
        width: 200px;
        height: 32px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        outline: none;
      }
      #canvas{
        vertical-align: middle
      }
    }
  }
}
</style>
