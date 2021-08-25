import Vue from 'vue'
import Vuex from 'vuex'
import state from './satate';
import mutations from './mutations';
import getters from './getters';
import action from './action';

import recipes from './modules/recipes';
Vue.use(Vuex)

const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: action,
  modules: {
    recipes,
  }
});

export default store;