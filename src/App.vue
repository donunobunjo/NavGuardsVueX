<template>
  <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-item nav-link">Home</router-link>
                    <router-link v-if="!loggedIn" to="/register" class="nav-item nav-link">Register</router-link>
                    <router-link v-if="!loggedIn" to="/login" class="nav-item nav-link">Login</router-link>
                    <span v-if="loggedIn">Welcome, {{name}}</span>
                    <button v-if="loggedIn" @click.prevent="logout" class="btn btn-secondary lefty">log out</button>
                </div>
            </div>
        </nav>
        <br/>
        <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      loggedIn:null,
      name:''
    }
  },
  methods:{
    logout(){
      /*this.axios.get('http://127.0.0.1:8000/api/logout').
          then(res=>{
            console.log(res)
          })*/
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      this.loggedIn=null
      this.name=''
      this.$router.push('/')
    },
  },
  mounted () {
    this.loggedIn=localStorage.getItem('token')
    this.name=localStorage.getItem('name')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.lefty{
  float:right;
}
</style>
