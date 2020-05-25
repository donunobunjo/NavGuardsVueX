<template>
    <div>
        <!--<div class="container">
            <div class="row">
                <div class="col-md-6">
                    <create-post/>
                </div>
                <div class="col-md-6">
                    <all-posts/>
                </div>
            </div>
        </div>-->
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
//import AllPosts from './AllPosts.vue'
export default {
    name:'DashBoard',
    components:{
        NavBar,
    },
    beforeMount() {
      let token = localStorage.getItem('token')
        this.axios.defaults.headers.common['Content-Type'] = 'application/json'
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
}
</script>