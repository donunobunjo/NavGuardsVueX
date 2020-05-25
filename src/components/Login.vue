<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card card-block">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card card-body">
                        <div v-if="spinner">
                             <b-spinner type="grow" label="Busy"></b-spinner>
                        </div>
                        <!--<div>
                            <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
                                 Hello, world! This is a toast message.
                            </b-toast>
                        </div>-->
                        <form>
                            <div class="row form-group">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" v-model="credentials.email" id="email" required>
                            </div>
                            <div class="row form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" v-model="credentials.password" id="password" required>
                            </div>
                            <div class="row form-group">
                                <button class="btn btn-success" @click.prevent="login">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            credentials:{
                email:'',
                password:''
            },
            spinner:false
        }
    },
    methods:{
        login(){
            if(this.credentials.email!=""&&this.credentials.password!=""){
                 this.spinner=true
                 this.$store.dispatch('login', this.credentials)
                .then(() => {
                    this.spinner=false
                    this.$router.push({name:'dashboard'})
                })
                .catch(err => {
                    console.log(err)
                    this.spinner=false
                })
            }
            else{
                //$bvToast.show('example-toast')
            }
        }
    },
     beforeRouteEnter (to, from, next) { 
        if (localStorage.getItem('token')) {
            return next('/dashboard');
        }
        next();
    }
}
</script>