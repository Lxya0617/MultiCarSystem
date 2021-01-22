<template>
  <div class="aside">
    <Sider
      :style="{ position: 'fixed', height: '100vh', left: 0, overflow: 'auto' }"
    >
      <Menu active-name="home" :theme="menuTheme" width="auto" :open-names="['home']">
        <template v-for="(item,index) in menuList">
            <Submenu  v-if="!isCollapsed && item.children.length" :key="index" :name="index">
              <template slot="title">
                <Icon :type="item.icon" />
                <span>{{ item.name }}</span>
              </template>
              <MenuItem v-for="(children, index) in item.children" :key="index" :name="children.to" :to="children.to" >
                <!-- <Icon :type="children.icon" /> -->
                <span>{{ children.name }}</span>
              </MenuItem>
            </Submenu>
            <MenuItem v-else-if="!isCollapsed" :name="item.to"  :key="index" :to="item.to">
              <Icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </MenuItem>
        </template>
      </Menu>
    </Sider>
  </div>
</template>
<script>
export default {
  name: "Aside",
  data() {
    return {
      menuTheme: "dark",
      componentIndex:'',
      isCollapsed: false,
      menuList: [
        {
          name: "首页",
          to: "/maincontent",
          icon: "ios-navigate",
          children: [],
        },
        {
          name: "机器人管理",
          icon: "md-car",
          children: [
            {
              name: "新建机器人",
              icon: "ios-create-outline",
              to: "/maincontent/newrobot",
            },
            {
              name: "机器人详情",
              icon: "ios-create-outline",
              to: "/maincontent/robotinfo",
            },
          ],
        },
        {
          name: "地图管理",
          to: "user2",
          icon: "ios-map",
          children: [
            {
              name: "上传地图",
              to: "/maincontent/uploadmap",
            },
            {
              name: "同步地图",
              to: "/maincontent/syncmap",
            },
            {
              name: "地图激活",
              to: "/maincontent/activatemap",
            },
            {
              name: "地图列表",
              to: "/maincontent/listmap",
            },
          ],
        },
        {
          name: "任务管理",
          to: "ios-folder",
          icon: "ios-folder",
          children: [
            {
              name: "任务详情",
              to: "/maincontent/taskmanage",
            },
          ],
        },
        {
          name: "运单管理",
          to: "ios-folder",
          icon: "ios-clipboard",
          children: [
            {
              name: "新建运单",
              to: "/maincontent/newbill",
            },
            {
              name: "运单详情",
              to: "/maincontent/billinfo",
            },
            {
              name: "运单记录",
              to: "/maincontent/billrecord",
            },
          ],
        },
        {
          name: "分组管理",
          to: "ios-photos",
          icon: "ios-photos",
          children: [
            {
              name: "分组信息",
              to: "/maincontent/groupinfo",
            },
          ],
        },
        {
          name: "系统设置",
          to: "ios-photos",
          icon: "ios-cog",
          children: [
            {
              name: "用户设置",
              to: "/maincontent/user",
            },
            {
              name: "充电设置",
              to: "/maincontent/charge",
            },
            {
              name: "机器设置",
              to: "/maincontent/machine",
            },
          ],
        },
        {
          name: "日志管理",
          to: "ios-photos",
          icon: "ios-paper",
          children: [
            {
              name: "运单日志",
              to: "/maincontent/waybilllog",
            },
            {
              name: "机器异常日志",
              to: "/maincontent/robotlog",
            },
            {
              name: "调度异常日志",
              to: "/maincontent/dispatchlog",
            },
          ],
        },
      ],
    };
  },
  computed: {
    menuitemClasses: function () {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
};
</script>
<style scoped>
.aside {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  flex: 0 0 200px;
  /* background: #ffffff; */
 
}
</style>
