import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios'
import Axios from 'axios'


Vue.use(Vuex);
Vue.use(VueAxios,Axios)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    posts: [],
  },

  actions: {
    async getAllPosts({ commit }) {
      let uri =  'http://127.0.0.1:8000/api/get_all'
      return commit('setPosts', await Axios.get(uri))
    },
  },

  mutations: {
    setPosts(state, response) {
      state.posts = response.data.data;
    },
  },
  strict: debug
});