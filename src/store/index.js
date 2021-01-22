import Vue from 'vue'
import Vuex from 'vuex'

//挂载vuex
Vue.use(Vuex)

//创建vueX对象
const store=new Vuex.Store({
    state:{
        name:'Jones',
        age:18,
    },
    mutations:{
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