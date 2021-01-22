<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      wsServer:"ws://10.1.17.185:9005",
      websock:null,
      limitConnect: 20, //断线重连次数
      timeConnect: 0, //已经连接次数
    };
  },
  computed: {},
  methods: {
    //websocket
    webSocketInit(service) {
      var that=this
      var ws = new WebSocket(service);
      that.websock=ws
      ws.onopen = function () {
        console.log("已连接TCP服务器");
      };
      ws.onmessage = function (msg) {
        that.limitConnect = 20; // 断线重连次数
        that.timeConnect = 0;
        var resData = JSON.parse(event.data);
        // console.log(resData)
        var data = resData.PData;
      };
      ws.onclose = function () {
        console.log("服务器已经断开");
        that.reconnect(service);
      };

      // 重连
      // function reconnect(service) {
      //   // lockReconnect加锁，防止onclose、onerror两次重连
      //   if (limitConnect > 0) {
      //     limitConnect--;
      //     timeConnect++;
      //     console.log("第" + timeConnect + "次重连");
      //     // 进行重连
      //     setTimeout(function () {
      //       webSocketInit(service);
      //     }, 2500);
      //   } else {
      //     console.log("TCP连接已超时");
      //     $.messager.show({
      //       title: "My Title",
      //       msg: "连接已关闭",
      //       timeout: 800,
      //       showType: "slide",
      //     });
      //   }
      // }
    },
    //ws重连
    reconnect(service) {
      var that = this;
      // lockReconnect加锁，防止onclose、onerror两次重连
      if (this.limitConnect > 0) {
      console.log(this.limitConnect)
      console.log(this.timeConnect)
        this.limitConnect--;
        this.timeConnect++;
        console.log("第" + this.timeConnect + "次重连");
        // 进行重连
        setTimeout(function () {
          that.webSocketInit(service);
        }, 2500);
      } else {
        console.log("TCP连接已超时");
      }
    },
  },
  created() {},
  mounted() {
   this.webSocketInit(this.wsServer);
  },
  beforeDestroy() {},
  // 销毁监听事件
  destroyed() {
    // clearInterval(this.timer); //清除定时器
    // this.timer = null; //清除定时器
    this.websock.close(); //清除websocket
  },
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
