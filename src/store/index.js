import Vue from 'vue'
import Vuex from 'vuex'
//1.安装插件
Vue.use(Vuex)
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
//2.创建Store对象
const state={
  cartList:[]
}
const store = new Vuex.Store({
  state,
  //mutations唯一的目的是改变state中状态且每个方法尽可能完成的事件比较单一
  mutations,
  actions,
  getters
})

//3.挂载Vue实例
export default store

