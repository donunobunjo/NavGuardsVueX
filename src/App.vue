<template>
  <div id="app" class="container">
      <top-bar></top-bar>
        <br/>
        <router-view></router-view>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components:{
    TopBar
  },
  data(){
    return{
     
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
  
  computed : {
      isLoggedIn : function(){ 
        return this.$store.getters.isLoggedIn
      },
      userName: function(){ 
        return this.$store.state.user
      },
      ...mapState(['user'])
  },

  mounted () {
    
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
