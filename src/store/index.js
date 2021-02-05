import Vue from 'vue'
import Vuex from 'vuex'

//挂载vuex
Vue.use(Vuex)

//创建vueX对象
const store=new Vuex.Store({
    state:{
        logOnStatus:'',//是否存在登录用户
        name:'Jones',
        age:18,
    },
    mutations:{
        //同步更新登录资格
        logOn(state,payload){
             state.logOnStatus=payload 
        },
        //重置登录资格
        resetLogOn(state,payload){
                state.logOnStatus=null;  
        },
        change(state,payload){
            console.log(state,payload)
            state.name=payload.name
        },
        //es6语法，等同edit:funcion(){...}
        add(state,payload){
            Vue.set(state,'sex',payload.sex)
        },
        reduce(state){
            Vue.delete(state,'age')
        }
    },
    actions:{
        //异步更新登录资格
        SaveLogOn(context,payload){
           context.commit('logOn',payload)    
        },
        //异步重置登录资格
        SaveResetLogOn(context,payload){
            context.commit('resetLogOn')  
        },
    //    aEdit(context,payload){
    //        setTimeout(()=>{
    //            context.commit('change',payload)
    //        },2000)
    //    } 
    aEdit(context,payload){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                context.commit('change',payload)
                console.log(payload)
                resolve()
            },2000)
        })
    }
    },
    getters:{
        nameInfo(state){
            return '姓名'+state.name
        },
        fullInfo(state,getters){
            return getters.nameInfo+'年龄'+state.age
        }
    }
})
export default store