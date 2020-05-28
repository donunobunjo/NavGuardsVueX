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
    token: localStorage.getItem('token') ||null,
    username : localStorage.getItem('username')||null,
    //username : 'Dona',
    states:[],
    lgas:[],
    posts:[]
  },
  getters : {
    
    authStatus: state => state.status,
    username: state=>{
      return state.username
    },
    states: state=>{
      return state.states
    },
    lgas:state=>{
      return state.lgas
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
      state.username = user
     
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = null
      state.username= null
    },
    fetch_states(state,states){
       state.states=states
    },
    fetch_lgas(state,lgas){
      state.lgas=lgas
    },
    setPosts(state,posts){
        state.posts=posts
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
          const user = resp.data.name
          localStorage.setItem('token', token)
          localStorage.setItem('username',user)
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
          localStorage.setItem('username',user)
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
        localStorage.removeItem('username')
        delete Axios.defaults.headers.common['Authorization']
        resolve()
        reject()
      })
      
    },
    fetchStates({commit}){
        return new Promise((resolve,reject)=>{
          let uri= 'http://lga-api.herokuapp.com/api/states'
          Axios.get(uri)
            .then((res)=>{
              commit('fetch_states',res.data)
              resolve(res)
            })
            .catch((err)=>{
              reject(err)
            })
        })
    },
    fetchLgas({commit},state){
      return new Promise((resolve,reject)=>{
        let uri ='http://lga-api.herokuapp.com/api/lgsinstate/'+state
        Axios.get(uri)
          .then(res=>{
              commit('fetch_lgas',res.data)
              resolve(res)
          })
          .catch(err=>{
            reject(err)
            //console.log(err)
          })
      })
    },
    getAllPosts({commit}){
      return new Promise(()=>{
        let uri='http://127.0.0.1:8000/api/get_all'
        Axios.get(uri)
        .then(res=>{
          commit('setPosts',res.data.data)
        })
        .catch()
      })
    }
  },
  strict: debug
});