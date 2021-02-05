<template>
  <div id="SyncMap" class="sync-map">
    <!-- 按钮区 -->
    <div class="btn-con">
      <Button icon="ios-arrow-dropleft" @click="back">返回</Button>
      <Button type="primary" icon="ios-cloud-download-outline">同步</Button>
      <Divider />
    </div>
    <!-- 内容区 -->
    <div class="con">
      <!-- 标签 -->
      <div class="robot-name">
        <Tag type="dot">同步地图</Tag>
      </div>
      <!-- 地图 -->
      <div class="map-con">
        <div class="left-con">
          <!-- 地图列表 -->
          <div class="lsit">
            <Table
              border
              ref="selection"
              width="278"
              :columns="mapListTit"
              :data="mapList"
            >
              <template slot-scope="{ row, index }" slot="action">
                <Button
                  type="info"
                  shape="circle"
                  icon="ios-eye"
                  @click="previewHandler(row)"
                ></Button>
              </template>
            </Table>
          </div>
          <!-- 机器人列表 -->
          <div class="lsit">
            <Table
              border
              ref="selection"
              width="300"
              :columns="robotListTit"
              :data="robotList"
            >
              <template slot-scope="{ row, index }" slot="action">
                <Button
                  type="info"
                  icon="ios-cloud-download-outline"
                  @click="synHandler(row)"
                ></Button>
              </template>
            </Table>
          </div>
        </div>
        <div class="right-con">
          <div id="map" ref="map" style="overflow: hidden; position: relative">
            <!-- <ButtonGroup style="z-index: 99">
                <Button icon="md-add" @click="enlarge" :disabled="map_form.enlarge_state"></Button>
                <Button icon="md-remove" @click="narrow" :disabled="map_form.narrow_state"></Button>
                <Button icon="md-refresh" @click="restore"></Button>
            </ButtonGroup> -->
            <div class="dragDiv" id="dragDiv">
              <svg
                class="zoomSvg"
                id="zoomSvg"
                width="500"
                height="500"
                ref="zoomSvg"
              >
                <image id="zoom" ref="zoom"></image>
                <!--特殊区域-->
                <!--<polygon id="polygon1"  preserveAspectRatio="none meet"  opacity="0.8" stroke="black" v-for="(item,index) in Special_point1"  :fill="bgColor(item.Typeid,item.Direction)"  :points="Appoint(item.Appoint)"@click="delSpecial(item,index)" >{{item.option}} </polygon>-->
                <!--位置点-->
                <rect
                  class=""
                  v-for="(item, index) in positionList"
                  :key="index"
                  :filter="activeClass(item.Type)"
                  :x="item.MapX"
                  :y="item.MapY"
                  width="20"
                  height="20"
                  :transform="item.MapOrientation"
                  @click="positionInfo(item, index, $event)"
                ></rect>
                <!--<rect ref="car1" id="car1" width="20"height="20"  filter="url('#this_car')" x="0" y="0" :transform="positionCarOrien()" ></rect>-->
                <!--<rect ref="car" id="car" width="20"height="20"   filter="url('#this_car')" :x="100" :y="200" transform="rotate(0,110 210)" ></rect>-->
                <!--规划路径-->
                <!--<circle v-show="playPath"  v-for="(item,index) in playPath" :key="index" :cx="mapX(item.x,item.y)" :cy="mapY(item.x,item.y)" r="2" stroke="#388E8E" stroke-width="1" fill="#388E8E"/>-->
                <!--小车   -->
                <rect
                  v-show="carState"
                  ref="car"
                  v-for="(item, index) in robotInfo"
                  id="car"
                  width="10"
                  height="20"
                  filter="url('#this_car')"
                  :x="mapX(item.x, item.y) - 5"
                  :y="mapY(item.x, item.y) - 10"
                  :transform="
                    positionCarOrien(
                      mapX(item.x, item.y) - 5,
                      mapY(item.x, item.y) - 10,
                      mapOrientation(item.th)
                    )
                  "
                ></rect>
                <!--点云-->
                <!--<rect  v-for="(item,index) in pointCloud"    :x="mapX(item.X,item.Y)" :y="mapY(item.X,item.Y)"width="1"height="1" style="fill:red" ></rect>-->
                <!--<path fill="transparent" stroke="red" stroke-width="4" d="M10 380 Q 77.5 280, 145 380 T 280 380" class="path" stroke-dasharray = '10' ></path>-->
                <defs>
                  <!-- 这里的width、height都是相对的比例，所以1也代表100% -->
                  <pattern
                    id="patter-1"
                    height="1"
                    width="1"
                    patternContentUnits="objectBoundingBox"
                  >
                    <!-- 这里的width、height是相对图片的真实大小，数字越大，显示的区域越小 -->
                    <image
                      height="1.1"
                      width="0.9"
                      preserveAspectRatio="none"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="/static/top.png"
                    ></image>
                  </pattern>
                  <pattern
                    id="patter-2"
                    height="1"
                    width="1"
                    patternContentUnits="objectBoundingBox"
                  >
                    <image
                      height="1.1"
                      width="0.8"
                      preserveAspectRatio="none"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="/static/right_top.png"
                    ></image>
                  </pattern>
                  <pattern
                    id="patter-3"
                    height="1"
                    width="1"
                    patternContentUnits="objectBoundingBox"
                  >
                    <image
                      height="1.1"
                      width="0.9"
                      preserveAspectRatio="none"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="/static/right.png"
                    ></image>
                  </pattern>
                  <pattern
                    id="patter-4"
                    height="1"
                    width="1"
                    patternContentUnits="objectBoundingBox"
                  >
                    <image
                      height="1.1"
                      width="0.9"
                      preserveAspectRatio="none"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="/static/right_down.png"
                    ></image>
                  </pattern>
                  <pattern
                    id="patter-5"
                    height="1"
                    width="1"
                    patternContentUnits="objectBoundingBox"
                  >
                    <image
                      height="1.1"
                      width="0.9"
                      preserveAspectRatio="none"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="/static/down.png"
                    ></image>
                  </pattern>
                  <pattern
                    id="patter-6"
                    height="1"
                    width="1"
                    patternContentUnits="objectBoundingBox"
                  >
                    <image
                      height="1.1"
                      width="0.9"
                      preserveAspectRatio="none"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="/static/left_down.png"
                    ></image>
                  </pattern>
                  <pattern
                    id="patter-7"
                    height="1"
                    width="1"
                    patternContentUnits="objectBoundingBox"
                  >
                    <image
                      height="1.1"
                      width="0.9"
                      preserveAspectRatio="none"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="/static/left.png"
                    ></image>
                  </pattern>
                  <pattern
                    id="patter-8"
                    height="1"
                    width="1"
                    patternContentUnits="objectBoundingBox"
                  >
                    <image
                      height="1.1"
                      width="0.9"
                      preserveAspectRatio="none"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="/static/left_top.png"
                    ></image>
                  </pattern>
                </defs>
                <g>
                  <!--<filter id="this_image" x="0%" y="0%" width="100%" height="100%">
                    <feImage xlink:href="../../../static/icon_position_0.svg"/>
                    </filter>-->
                  <filter
                    id="this_position"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                  >
                    <feImage xlink:href="static/11.png" />
                  </filter>
                  <filter
                    id="this_precision"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                  >
                    <feImage
                      xlink:href="static/point_up_48px_1094876_easyicon.net.ico"
                    />
                  </filter>
                  <filter
                    id="this_charge"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                  >
                    <feImage xlink:href="static/Charging_48px.ico" />
                  </filter>
                  <filter
                    id="this_car"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                  >
                    <feImage xlink:href="static/car.png" />
                  </filter>
                </g>
              </svg>
              <Tag
                v-show="positionState"
                id="positionInfo"
                size="large"
                style="font-size: 16px"
              ></Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../api";
export default {
  name: "SyncMap",
  data() {
    return {
      robotList: [], //机器列表
      robotInfo: [], //机器详情
      positionList: [], //位置点数据
      positionState: false, //位置点信息
      currentChoose: "", //选中地图
      mapListTit: [
        {
          title: "选择",
          key: "guid",
          width: 70,
          align: "center",
          render: (h, params) => {
            console.log(h, params);
            let guid = params.row.guid;
            let flag = false;
            if (this.currentChoose === guid) {
              flag = true;
            } else {
              flag = false;
            }
            let self = this;
            return h("div", [
              h("Radio", {
                props: {
                  value: flag,
                },
                on: {
                  "on-change": () => {
                    self.currentChoose = guid;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "地图",
          key: "name",
          align: "center",
        },
        {
          title: "操作",
          key: "edit",
          width: "80",
          align: "center",
          slot: "action",
        },
      ],
      mapList: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
      ],
      robotListTit: [
        {
          title: "机器名称",
          key: "name",
          align: "center",
        },
        {
          title: "状态",
          key: "status",
          align: "center",
        },
        {
          title: "操作",
          key: "edit",
          width: "80",
          align: "center",
          slot: "action",
        },
      ],
      robotList: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        
      ],
    };
  },
  computed: {},
  methods: {
    //根据Type去改变它的icon
    activeClass: function (val) {
      if (val === 0) {
        return "url('#this_position')";
      } else if (val === 1) {
        return "url('#this_precision')";
      } else if (val === 2) {
        return "url('#this_charge')";
      }
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
     //获取调度系统机器人
    getRobot() {
      api
        .robots()
        .then((response) => {
          this.robotList = response.data;
        })
        .catch((error) => {});
      // api.robot(`${this.guid}`).then(response=>{
      //   this.list=response.data
      //   this.robotList=[]
      //   this.robotList.push(this.list)
      // })
      // .catch(error=>{
      //   console.log(error)
      // })
    },
    //地图列表
    getMaps() {
      api
        .maps()
        .then((response) => {
          this.mapList = response.data;
          console.log(response);
        })
        .catch((error) => {});
    },
    //地图预览
    previewHandler(val) {
      this.getAssignMap(val.guid);
    },
    //获取指定地图
    getAssignMap(val) {
      api
        .assignMaps(val)
        .then((response) => {
          // this.mapList = response.data;
          console.log(response);
          var data = response.data;
          var map_n = "data:image/jpeg;base64," + data.semanticMap; //地图url
          this.$refs.zoom.href.baseVal = "map_n";
        })
        .catch((error) => {});
    },
    //单个同步
    synHandler(val) {
      console.log('单个同步',val)
      console.log(this.currentChoose);
      var reqData = { Map:this.currentChoose,Robot:val.guid};
      if (!this.currentChoose) {
        this.$Message["warning"]({
          background: true,
          content: "请选择地图",
        });
      } else {
        api
          .syncMap(reqData)
          .then((response) => {
            console.log(response);
            if (response.code === 0) {
              this.$Message.success(response.message);
            } else {
              this.$Message.error(response.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    back() {},
  },
  created() {
    this.getMaps();
    this.getRobot();
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
#SyncMap {
  height: 1160px;
  .btn-con {
    .ivu-btn {
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
    .robot-name {
      margin: 16px 0;
    }
    .map-con {
      //左侧列表
      .left-con {
        float: left;
        margin-right: 10px;
        .group {
        }
        .lsit {
          float: left;
          margin-top: 0;
        }
        .lsit:nth-child(1) {
          margin-right: 10px;
        }
      }
      //地图显示
      .right-con {
        overflow: auto;
        margin-left: 10px;
        #map {
          width: 100%;
          height: 600px;
          background: #808080;
          overflow: hidden;
          position: relative;
          .dragDiv {
            width: 100%;
            min-width: 500px;
            height: 100%;
            min-height: 400px;
            /*------地图svg层------*/
            .zoomSvg {
              overflow: visible;
              position: absolute;
              transition: all 0.3s ease 0s;
              cursor: pointer;
              left: 50%;
              top: 50%;
              -webkit-tap-highlight-color: transparent;
              /*---------路径----------*/
              /*rect .linestyle{*/
              stroke: red;
              /*stroke-width:2;*/
              /*filter:url('../../../static/icon_position_5.svg')*/
              /*}*/
              /*---------小车----------*/
              #car {
                stroke-dasharray: 340;
                stroke-dashoffset: 40;
                animation: all 5s linear;
              }
            }
          }
        }
      }
    }
  }
}
</style>
