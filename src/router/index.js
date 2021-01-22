import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import MainContent from '@/components/MainContent'
import Home from '@/components/Home'
//机器人模块
import NewRobot from '@/components/Robot/NewRobot'
import RobotInfo from '@/components/Robot/RobotInfo'
import RobotEdit from '@/components/Robot/RobotEdit'
//地图模块
import Map from '@/components/Map/Mape'
import UploadMap from '@/components/Map/UploadMap'
import SyncMap from '@/components/Map/SyncMap'
import ActivateMap from '@/components/Map/ActivateMap'
import ListMap from '@/components/Map/ListMap'
//任务模块
import TaskManage from '@/components/Task/TaskManage'
//运单模块
import Newbill from '@/components/Waybill/Newbill'
import BillRecord from '@/components/Waybill/BillRecord'
import BillInfo from '@/components/Waybill/BillInfo'
//分组模块
import GroupInfo from '@/components/Group/GroupInfo'
import NewGroup from '@/components/Group/NewGroup'
//系统模块
import User from '@/components/System/User'
import NewUser from '@/components/System/NewUser'
import EditUser from '@/components/System/EditUser'
import Charge from '@/components/System/Charge'
import Machine  from '@/components/System/Machine'

//日志模块
import WayBillLog  from '@/components/Journal/WayBillLog'
import RobotLog  from '@/components/Journal/RobotLog'
import DispatchLog  from '@/components/Journal/DispatchLog'
Vue.use(Router)
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default new Router({
  routes: [
    {path: '/',  redirect:'/login'},
    {path: '/login', name: 'Login', component: Login},
    {
      path: '/maincontent',
      component: MainContent,
      children:[
        {path:'',name:'Home',component:Home},
        {path:'newrobot',name:'NewRobot',component:NewRobot},
        {path:'robotinfo',name:'RobotInfo',component:RobotInfo},
        {path:'robotedit',name:'RobotEdit',component:RobotEdit},
        
        {path:'uploadmap',name:'UploadMap',component:UploadMap},
        {path:'syncmap',name:'SyncMap',component:SyncMap},
        {path:'activatemap',name:'ActivateMap',component:ActivateMap},
        {path:'listmap',name:'ListMap',component:ListMap},

        {path:'taskmanage',name:'TaskManage',component:TaskManage},
        
        {path:'newbill',name:'Newbill',component:Newbill},
        {path:'billrecord',name:'BillRecord',component:BillRecord},
        {path:'billinfo',name:'BillInfo',component:BillInfo},

        {path:'groupinfo',name:'GroupInfo',component:GroupInfo},
        {path:'newgroup',name:'NewGroup',component:NewGroup},

        {path:'user',name:'User',component:User},
        {path:'newuser',name:'NewUser',component:NewUser},
        {path:'edituser',name:'EditUser',component:EditUser},
        {path:'charge',name:'Charge',component:Charge},
        {path:'machine',name:'Machine',component:Machine},

        {path:'waybilllog',name:'WayBillLog',component:WayBillLog},
        {path:'robotlog',name:'RobotLog',component:RobotLog},
        {path:'dispatchlog',name:'DispatchLog',component:DispatchLog},
      ]
    }
  ]
})
