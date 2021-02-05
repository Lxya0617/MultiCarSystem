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
/**
 * 全局路由守卫
 */
var that=this
const rightPathList = ['/login', '/404', '/403'];//直接可以进入的页面(白名单)
// router.beforeEach((to, from, next) => {
//   // console.log('(路由守卫)跳转到:', to.fullPath); //来的路径和to.path差不多
//   // console.log('(路由守卫)跳转到:', to); //来的路径和to.path差不多
//   var token = sessionStorage.getItem('userName'); //获取token
//   var userGroup = sessionStorage.getItem('userGroup'); //获取token
//   if (!token && to.path != '/login') {//登陆认证token校验,没登录则跳转/login
//     console.log('登陆认证token校验,没登录则跳转/login')
//     next({path:'/login'})
//   }
//   else {
//     //权限认证
//     if (rightPathList.includes(to.path)) { //如果白名单存在to.path，让它执行(login要进去的路由)
//       next();
//     }
//     else { //执行(login要进去的路由)
//       if(from.path=='/home/newmap'){
//         if(store.state.createdMap==1){
//           var iform=document.getElementById('iform')
//           var wrapper=document.getElementById('box_wrapper')
//           var confirm=document.getElementsByClassName('confirm')[0]
//           var cancel=document.getElementsByClassName('cancel')[0]
//           console.log(confirm)
//           console.log(cancel)
//           iform.style.display='block'
//           wrapper.style.display='block'
//           confirm.addEventListener('click',function (e) {
//             next();
//             iform.style.display='none'
//             wrapper.style.display='none'
//           })
//           cancel.addEventListener('click',function (e) {
//             next({ path: '/home/newmap' })
//             iform.style.display='none'
//             wrapper.style.display='none'
//           })
//             console.log(iform)
//         }else{
//           next();
//         }
//       }
//       else{
//         // console.log('权限等级'+userGroup)
//         // console.log(to.meta.grade,Number(userGroup)+1)
//         if(to.meta.grade>Number(userGroup)+1){
//           next({ path: "/home" });
//         }else{
//           next();
//         }
//       }
//     }
//   }
// })
