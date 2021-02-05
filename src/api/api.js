import axios from 'axios'
let host=window.url


//登录
export const login=params=>{return axios.post(`${host}login`,params)}
//注销
export const logout=params=>{return axios.post(`${host}logout`,params)}

//查询上报的机器人信息
export const reportRobot=params=>{return axios.get(`${host}reportRobot`,params)}
//查询调度系统中所有机器人信息
export const robots=params=>{return axios.get(`${host}robots`,params)}
//查询调度系统中指定机器人信息
export const robot=params=>{return axios.get(`${host}robot/${params}`)}
//添加机器人
export const add_robot=params=>{return axios.post(`${host}robot`,params)}
//删除机器人
export const delete_robot=params=>{return axios.delete(`${host}robot`,{data:params})}


//分组信息
export const groups=params=>{return axios.get(`${host}groups`,params)}
//更改机器人分组
export const change_group=params=>{return axios.put(`${host}robot/group`,params)}

//获取调度系统中的地图列表
export const maps=params=>{return axios.get(`${host}Maps`,params)}
//获取调度系统中指定地图
export const assignMaps=params=>{return axios.get(`${host}Maps/${params}`)}
//获取指定机器人中的地图
export const RobotMaps=params=>{return axios.get(`${host}RcsMaps/${params}`)}
//将机器人地图上传到调度系统
export const uploadMap=params=>{return axios.post(`${host}Maps/upload`,params)}
//将调度系统地图同步到单车
export const syncMap=params=>{return axios.post(`${host}Maps/sync`,params)}
export const login1='clx'
export const age=21
