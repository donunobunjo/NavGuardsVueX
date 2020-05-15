<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <create-post/>
                </div>
                <div class="col-md-6">
                    <all-posts/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreatePost from './CreatePost.vue'
import AllPosts from './AllPosts.vue'
export default {
    name:'DashBoard',
    components:{
        CreatePost,
        AllPosts
    },
    beforeMount() {
      let token = localStorage.getItem('token')
        this.axios.defaults.headers.common['Content-Type'] = 'application/json'
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
}
</script>