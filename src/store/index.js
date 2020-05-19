import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios'
import Axios from 'axios'


Vue.use(Vuex);
Vue.use(VueAxios,Axios)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : '',
    states:[],
    lga:[]
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userName: state=>state.user,
    states: state=>{
      return state.states
    }
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, user, token){
    //auth_success(state, user){
      state.status = 'success'
      state.token = token
      state.user = user
      console.log('lalalalal')
      console.log(state.user)
      console.log(state.token)
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user= ''
    },
    fetch_states(state,states){
       state.states=states
    }
  },
  actions:{
    /*async getAllPosts({ commit }) {
      let uri =  'http://127.0.0.1:8000/api/get_all'
      return commit('setPosts', await Axios.get(uri))
    }*/
    register({commit}, profile){
      return new Promise((resolve, reject) => {
        let uri = 'http://127.0.0.1:8000/api/register' 	
        commit('auth_request')
        Axios.post(uri, profile)
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token
          commit('auth_success', user, token)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    login({commit}, credentials){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        let url='http://127.0.0.1:8000/api/login'
        Axios.post(url, credentials)
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token
          commit('auth_success', user, token)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete Axios.defaults.headers.common['Authorization']
        resolve()
        reject()
      })
      
    },
    fetchStates({commit}){
        return new Promise((resolve,reject)=>{
          let uri= 'http://127.0.0.1:8000/api/states'
          Axios.get(uri)
            .then((res)=>{
              commit('fetch_states',res.data)
              resolve(res)
            })
            .catch((err)=>{
              reject(err)
            })
        })
          
    }
  },
  strict: debug
});