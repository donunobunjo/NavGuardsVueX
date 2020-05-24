<template>
  <div id="app" class="container">
      <top-bar></top-bar>
      <!--<nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-item nav-link">Home</router-link>
                    <router-link v-if="!isLoggedIn" to="/register" class="nav-item nav-link">Register</router-link>
                    <router-link v-if="!isLoggedIn" to="/login" class="nav-item nav-link">Login</router-link>
                    <span v-if="isLoggedIn">Welcome, {{user}}</span>
                    <button v-if="isLoggedIn" @click.prevent="logout" class="btn btn-secondary lefty">log out</button>
                </div>
            </div>S
        </nav>-->
        <br/>
        <NavBar></NavBar>
        <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import TopBar from './components/TopBar.vue'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components:{
    NavBar,
    TopBar
  },
  data(){
    return{
      //loggedIn:null,
      //name:''
    }
  },
  methods:{
    logout(){
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({name:'home'})
        })

    },
  },
  //computed:mapState(['user']),
  computed : {
      isLoggedIn : function(){ 
        return this.$store.getters.isLoggedIn
      },
      //userName: function(){ return this.$store.getters.userName}
      userName: function(){ 
        return this.$store.state.user
      },
      ...mapState(['user'])
  },

  mounted () {
    //this.loggedIn=localStorage.getItem('token')
    //this.name=localStorage.getItem('name')
    //console.log('user name is '+this.name)
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
