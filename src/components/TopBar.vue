<template>
    <div>
        <router-link v-if="!username" to="/register" class="nav-item nav-link">Register</router-link>
        <router-link v-if="!username" to="/login" class="nav-item nav-link">Login</router-link>
        <router-link v-if="username" to="/dashboard" class="nav-item nav-link">DashBoard</router-link>
        <span v-if="username">Welcome, {{username}} </span>
        <button v-if="username" @click.prevent="logout" class="btn btn-link">logout</button>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['username'])
    },
    methods: {
      logout(){
           this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({name:'home'})
        })
      }  
    }
}
</script>

<style scoped>
    div{
        display: flex; 
        justify-content: flex-end
    }
</style>