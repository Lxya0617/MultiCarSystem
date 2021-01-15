<template>
  <div class="_map" id="_map">
    <div id="map-box" class="map-box">
        <div id="map"  ref="map" style="overflow: hidden;position: relative">
          <ButtonGroup style="z-index: 99">
            <Button icon="md-add" @click="enlarge" :disabled="map_form.enlarge_state"></Button>
            <Button icon="md-remove" @click="narrow" :disabled="map_form.narrow_state"></Button>
            <Button icon="md-refresh" @click="restore"></Button>
          </ButtonGroup>
          <div class="dragDiv" id="dragDiv" >
            <svg class="zoomSvg" id="zoomSvg"  width="500" height="500" ref="zoomSvg" >
              <image id="zoom" ref="zoom" ></image>
              <!--特殊区域-->
              <!--<polygon id="polygon1"  preserveAspectRatio="none meet"  opacity="0.8" stroke="black" v-for="(item,index) in Special_point1"  :fill="bgColor(item.Typeid,item.Direction)"  :points="Appoint(item.Appoint)"@click="delSpecial(item,index)" >{{item.option}} </polygon>-->
              <!--位置点-->
              <rect  class="" v-for="(item,index) in positionList":key="index"  :filter="activeClass(item.Type)"  :x="item.MapX" :y="item.MapY"width="20"height="20" :transform="item.MapOrientation" @click="positionInfo(item,index,$event)"></rect>
              <!--<rect ref="car1" id="car1" width="20"height="20"  filter="url('#this_car')" x="0" y="0" :transform="positionCarOrien()" ></rect>-->
              <!--<rect ref="car" id="car" width="20"height="20"   filter="url('#this_car')" :x="100" :y="200" transform="rotate(0,110 210)" ></rect>-->
              <!--规划路径-->
              <!--<circle v-show="playPath"  v-for="(item,index) in playPath" :key="index" :cx="mapX(item.x,item.y)" :cy="mapY(item.x,item.y)" r="2" stroke="#388E8E" stroke-width="1" fill="#388E8E"/>-->
              <!--小车   -->
              <rect v-show="carState" ref="car" v-for="(item,index) in robotInfo" id="car" width="10"height="20"   filter="url('#this_car')" :x="(mapX(item.x,item.y)-5)" :y="(mapY(item.x,item.y)-10)" :transform="positionCarOrien(mapX(item.x,item.y)-5,mapY(item.x,item.y)-10,mapOrientation(item.th))"  ></rect>
              <!--点云-->
              <!--<rect  v-for="(item,index) in pointCloud"    :x="mapX(item.X,item.Y)" :y="mapY(item.X,item.Y)"width="1"height="1" style="fill:red" ></rect>-->
              <!--<path fill="transparent" stroke="red" stroke-width="4" d="M10 380 Q 77.5 280, 145 380 T 280 380" class="path" stroke-dasharray = '10' ></path>-->
              <defs>
                <!-- 这里的width、height都是相对的比例，所以1也代表100% -->
                <pattern id="patter-1" height="1" width="1" patternContentUnits="objectBoundingBox">
                  <!-- 这里的width、height是相对图片的真实大小，数字越大，显示的区域越小 -->
                  <image height="1.1" width="0.9" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/static/top.png">
                  </image>
                </pattern>
                <pattern id="patter-2" height="1" width="1" patternContentUnits="objectBoundingBox">
                  <image height="1.1" width="0.8" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/static/right_top.png">
                  </image>
                </pattern>
                <pattern id="patter-3" height="1" width="1" patternContentUnits="objectBoundingBox">
                  <image height="1.1" width="0.9" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/static/right.png">
                  </image>
                </pattern>
                <pattern id="patter-4" height="1" width="1" patternContentUnits="objectBoundingBox">
                  <image height="1.1" width="0.9" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/static/right_down.png">
                  </image>
                </pattern>
                <pattern id="patter-5" height="1" width="1" patternContentUnits="objectBoundingBox">
                  <image height="1.1" width="0.9" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/static/down.png">
                  </image>
                </pattern>
                <pattern id="patter-6" height="1" width="1" patternContentUnits="objectBoundingBox">
                  <image height="1.1" width="0.9" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/static/left_down.png">
                  </image>
                </pattern>
                <pattern id="patter-7" height="1" width="1" patternContentUnits="objectBoundingBox">
                  <image height="1.1" width="0.9" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/static/left.png">
                  </image>
                </pattern>
                <pattern id="patter-8" height="1" width="1" patternContentUnits="objectBoundingBox">
                  <image height="1.1" width="0.9" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/static/left_top.png">
                  </image>
                </pattern>
              </defs>
              <g>
                <!--<filter id="this_image" x="0%" y="0%" width="100%" height="100%">
                  <feImage xlink:href="../../../static/icon_position_0.svg"/>
                </filter>-->
                <filter id="this_position" x="0%" y="0%" width="100%" height="100%">
                  <feImage xlink:href="static/11.png"/>
                </filter>
                <filter id="this_precision" x="0%" y="0%" width="100%" height="100%">
                  <feImage xlink:href="static/point_up_48px_1094876_easyicon.net.ico"/>
                </filter>
                <filter id="this_charge" x="0%" y="0%" width="100%" height="100%">
                  <feImage xlink:href="static/Charging_48px.ico"/>
                </filter>
                <filter id="this_car" x="0%" y="0%" width="100%" height="100%" >
                  <feImage   xlink:href="static/car.png"/>
                </filter>
              </g>
            </svg>
            <Tag v-show="positionState" id="positionInfo"size="large" style="font-size: 16px"></Tag>
          </div>
        </div>
      </div>
  </div>
</template>
<style>
  .el-dialog{
    width: 280px;
  }
</style>
<script>
  export default {
    name: 'maps',
    data () {
      return {
        title:'',
        timer:'',
        activeMapId:'',//当前激活地图id
        carState:true,//小车状态
        map_form:{
          expand:1,//放大缩小倍数
          narrow:1,//放大缩小倍数
          enlarge_state:false,//放大状态/禁用启用
          narrow_state:false,//缩小状态/禁用启用
          orienShow:false ,//单行方向区按钮
          speed:false,//速度input
        },//map按钮状态
        columns1: [
          {
            title: 'Id',
            key: 'Id',
          },
          {
            title: '地图名称',
            key: 'Name',
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],//表头
        mapList:[],//地图数据
        robotList:[],//机器列表
        robotInfo:[],//机器详情
        positionList:[],//位置点数据
        mapName:'', //地图名称
        map_Height:'',//地图高度
        mapEvent:{
          MapId:'',
          worldX:'',
          worldY:'',
          Orientation:''
        }, //地图world值
        positionState:false,//位置点信息
      }
    },
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
      //实时转换角度
      positionCarOrien(x,y,orientation){
//          var orientation=90-Number((orientation/3.14*180)) //事件角度转css地图角度
        var orien=`rotate(${orientation},${x+5} ${y+10})` //css地图角度转svg角度
        return orien
      },
      //放大
      enlarge(){
        this.map_form.narrow_state=false   //缩小按钮可点
        this.map_form.expand+=0.2;
        this.map_form.narrow+=0.2;
        this.$refs.zoomSvg.style.transform=(`matrix(${this.map_form.expand},0,0,${this.map_form.expand},0,0)`)
        if(this.map_form.expand>2 ||this.map_form.narrow>2){
          this.map_form.enlarge_state=true
        }
//        that.$refs.zoomSvg.setAttribute('width',that.$refs.zoom.getBoundingClientRect().width) // 让svg的宽等于image
//        console.log(this.$refs.dragDiv.style.width,this.$refs.dragDiv.style.height)
//        console.log(this.$refs.zoomSvg.style.width,this.$refs.zoomSvg.style.height)
      },
      //缩小
      narrow(){
        this.map_form.enlarge_state=false  //放大按钮可点
        this.map_form.expand-=0.2;
        this.map_form.narrow-=0.2;
        console.log(this.$refs.zoom.getBoundingClientRect().width)
        this.$refs.zoomSvg.style.transform=(`matrix(${this.map_form.expand},0,0,${this.map_form.expand},0,0)`)
        if(this.map_form.expand<0.4 ||this.map_form.narrow<0.4){
          this.map_form.narrow_state=true
        }
      },
      //原始大小
      restore(){
        this.map_form.narrow_state=false  //缩小按钮可点
        this.map_form.enlarge_state=false   //放大按钮可点
        this.map_form.expand=1;
        this.map_form.narrow=1;
        this.$refs.zoomSvg.style.transform=(`matrix(${this.map_form.expand},0,0,${this.map_form.narrow},0,0)`)
      },
      //查看位置的详情
      positionInfo(item,index,dom){
//        console.log(item,index,dom)
        dom.stopPropagation()
        var left=dom.clientX
        var top=dom.clientY
        var positionInfo=document.getElementById('positionInfo')
        positionInfo.style.border='1px solid red'
        positionInfo.style.position='fixed'
        positionInfo.style.left=left+'px'
        positionInfo.style.top=top+'px'
        positionInfo.style.padding='0  40px'
        positionInfo.innerHTML=item.Name
        this.positionState=true
      },
      //返回
      goBack(){
        this.$router.push({name:'Menu'})
      },
      //获取当前地图
      getMap(){
        this.$http.post(window.url+'getmastermap')
          .then(response=>{
            console.log(response)
            this.activeMapId=response.Data
            this.getMapInfo(this.activeMapId)
          })
      },
      //查看地图详情
      show(row,index){
        this.getMapInfo(row.Id)
      },
      //获取地图List
      getMapList(){
        this.$http.post(`${window.url}maplist`)
          .then(response=>{
            console.log(response)
            this.mapList=response.Data
          })
      },
      //获取小车信息
      getRobotList(){
        this.$http.post(`${window.url}vehicleposes`)
          .then(response=>{
            this.robotInfo=response.Data
          })
      },
      /*//获取机器List
      getRobotList(){
        this.$http.post(`${window.url}vehiclelist`)
          .then(response=>{
//            console.log(response)
            this.robotList=response.Data
            for(var i=0;i<this.robotList.length;i++){
                this.getRobotInfo(this.robotList[i].Id)
            }
            console.log(this.robotInfo)
          })
      },
      //获取机器详情
      getRobotInfo(Id){
        this.$http.post(`${window.url}vehicleinfo`,{Id:Id})
          .then(response=>{
            if(response.Data.Status!==-1){
              this.robotInfo.push(response.Data)
            }
            console.log(this.robotInfo)
          })
      },*/
      //获取地图详情
      getMapInfo(MapId){
        var that=this
        this.$http.post(`${window.url}mapinfo`,{Id:MapId})
          .then(response=>{
            var data=response.Data
             if(data.Id===this.activeMapId){
               this.carState=true
             }else{
               this.carState=false
             }
            this.mapName=data.Name //地图名
            this.mapEvent.MapId=data.Id              //地图MapId
            this.map_Height=data.Height
            this.mapEvent.worldX=data.OriginX
            this.mapEvent.worldY=data.OriginY
            this.mapEvent.Orientation=data.Orientation
            var map_n ="data:image/jpeg;base64,"+data.Data  //地图url
            this.$refs.zoom.href.baseVal =map_n;
            this.positionList=data.Positions
            //转换地图坐标
            for(var i=0;i<this.positionList.length;i++){
              this.positionList[i].MapX=this.mapX(this.positionList[i].x,this.positionList[i].y)-10
              this.positionList[i].MapY=this.mapY(this.positionList[i].x,this.positionList[i].y)-10
              this.positionList[i].MapOrientation=this.mapOrientation(this.positionList[i].th)
              this.positionList[i].MapOrientation=`rotate(${this.positionList[i].MapOrientation},${this.positionList[i].MapX+10} ${this.positionList[i].MapY+10})`//转换地图y坐标
            }
            setTimeout(function () {
              that.$refs.zoomSvg.setAttribute('width',that.$refs.zoom.getBoundingClientRect().width) // 让svg的宽等于image
              that.$refs.zoomSvg.setAttribute('height',that.$refs.zoom.getBoundingClientRect().height)//让svg的高等于image
              that.$refs.zoomSvg.style.marginLeft=-that.$refs.zoom.getBoundingClientRect().width/2
              that.$refs.zoomSvg.style.marginTop=-that.$refs.zoom.getBoundingClientRect().height/2
            },0)
//            this.getList()
//            this.getAreaList()
          })
      },
      //地图X坐标
      mapX(x,y){
//        return (worldX+((height-worldY)*0.05*Math.sin(eventOrientation))- world)/Math.cos(eventOrientation)/0.05
        return ((x-this.mapEvent.worldX)*Math.cos(this.mapEvent.Orientation)+(y-this.mapEvent.worldY)*Math.sin(this.mapEvent.Orientation))/0.05
      },
      //地图Y坐标
      mapY(x,y) {
//        worldY= (x*0.05)*Math.sin(eventOrientation)+((height-y)*0.05*Math.cos(eventOrientation))+world
//        return height-((worldY-(worldX*0.05)*Math.sin(eventOrientation)-world)/Math.cos(eventOrientation)/0.05)
        return this.map_Height-((x-this.mapEvent.worldX)*Math.sin(-this.mapEvent.Orientation)+(y-this.mapEvent.worldY)*Math.cos(this.mapEvent.Orientation))/0.05

      },
      //地图角度
      mapOrientation(Orientation){
        return -(Orientation-this.mapEvent.Orientation)/Math.PI*180+90
      },
    },
    created(){
      this.title=this.$route.query.title
      //获取当前地图id
    //   this.getMap()
    //   //地图列表数据
    //   this.getMapList()
    //   //获取小车
    //   this.getRobotList()
    //   //所有小车
    //   this.timer=setInterval(()=>{
    //     this.getRobotList()
    //   },2000)
      /*this.$http.post(`${window.url}vehiclelist`)
        .then(response=>{
            console.log(response)
          this.robotList=response.Data
          for(var i=0;i<this.robotList.length;i++){
//            this.getRobotInfo(this.robotList[i].Id)
            this.$http.post(`${window.url}vehicleinfo`,{Id:this.robotList[i].Id})
              .then(response=>{
                console.log(response)
                if(response.Data.Status!==-1){
                  this.robotInfo.push(response.Data)
                }
              })
          }
        })
      //轮询小车实时位置*/
    },
    mounted(){
      var that=this

      /*var drag = document.getElementById('dragDiv');
      //点击某物体时，用drag对象即可，move和up是全局区域，也就是整个文档通用，应该使用document对象而不是drag对象
      drag.onmousedown = function(e) {
        console.log(e)
        var e = e || window.event;
        var diffX = e.clientX - drag.offsetLeft;//鼠标按下那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
        var diffY = e.clientY - drag.offsetTop;//同理计算距相对上边框位置
        document.onmousemove = function(e) {
          console.log(e)
          e.preventDefault()
          var e = e || window.event;
          var left = e.clientX - diffX;//计算左边距
          var top = e.clientY - diffY; //计算右边距
          console.log(left,top)
          if (left < 0) {  //过界判断
            left = 0; //从左边移出浏览器窗口
          } else if (left > window.innerWidth - drag.offsetWidth) {
            left = window.innerWidth - drag.offsetWidth;//从右边移出浏览器窗口
          }
          if (top < 0) {
            top = 0; //从上边移出浏览器窗口
            console.log('+++',left)
          } else if (top > window.innerHeight - drag.offsetHeight) {
            top = window.innerHeight - drag.offsetHeight;  //从下面移出浏览器窗口
            console.log('---',top)
          }
          drag.style.left = left + 'px';
          drag.style.top = top + 'px';
        }

        document.onmouseup = function(e) { //移除事件，让物体停下
          this.onmousemove = null;
          this.onmouseup = null;
        }
      }*/
      var flag = false;
      var cur = {
        x: 0,
        y: 0
      }
      var nx, ny, dx, dy, x, y;
      function down() {
        flag = true;
        var touch;
        if(event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        cur.x = touch.clientX;
        cur.y = touch.clientY;
        dx = div2.offsetLeft;
        dy = div2.offsetTop;
      }
      function move() {
        if(flag) {
          var touch;
          if(event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          nx = touch.clientX - cur.x;
          ny = touch.clientY - cur.y;
          x = dx + nx;
          y = dy + ny;
          div2.style.left = x + "px";
          div2.style.top = y + "px";
          //阻止页面的滑动默认事件
          var zoomSvg=document.getElementById('dragDiv')
          zoomSvg.addEventListener("touchmove", function() {
            event.preventDefault();
          },{ passive: false });
        }
      }
      //鼠标释放时候的函数
      function end() {
        flag = false;
      }
      var div2 = document.getElementById("dragDiv");
      div2.style.position='absolute'
      console.log(div2)
      div2.addEventListener("mousedown", function() {
        down();
      },{ passive: false });
      div2.addEventListener("mousemove", function() {
        move();
      },{ passive: false });
      document.body.addEventListener("mouseup", function() {
        end();
      },{ passive: false });
      div2.addEventListener("touchstart", function() {
        down();
      }, { passive: false })
      div2.addEventListener("touchmove", function() {
        move();
      }, { passive: false })
      div2.addEventListener("touchend", function() {
        end();
      },{ passive: false });
      /*点击关闭位置点名称提示*/
      document.addEventListener('click',clickHandler)
      function clickHandler(e) {
        if(that.positionState){
          that.positionState=false
        }else{
          return
        }
      }
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>
<style scoped  lang="scss">
/*------最外层---*/
  #_map{
    width: 100%;
    height: 100%;
    /*地图*/
      #map-box{
        margin: 10px 0;
        .ivu-btn-group{
          button{
            border-radius: 0;
          }
        }
        #map{
          width: 100%;
          height:600px;
          background: #808080;
          overflow: hidden;
          position: relative;
          .dragDiv{
            width: 100%;
            min-width: 500px;
            height: 100%;
            min-height: 400px;
            /*------地图svg层------*/
            .zoomSvg{
              overflow: visible;
              position: absolute;
              transition: all 0.3s ease 0s;
              cursor: pointer;
              left: 50%;
              top:50%;
              -webkit-tap-highlight-color: transparent;
              /*---------路径----------*/
              /*rect .linestyle{*/
              stroke:red;
              /*stroke-width:2;*/
              /*filter:url('../../../static/icon_position_5.svg')*/
              /*}*/
              /*---------小车----------*/
              #car{
                stroke-dasharray: 340; stroke-dashoffset: 40;
                animation: all 5s linear;
              }
            }
          }
        }
      }
  }

/*  svg{
    path{
      stroke-dasharray: 20 ,10;
      stroke-dashoffset: 0;
      animation: all 1s linear;
    }
  }
  @keyframes dash {
    from { stroke-dashoffset: 320; }
    to { stroke-dashoffset: 0; }
  }*/
</style>
