<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
            <div class="card card-block">
                <div class="card-header">
                    Register
                </div>
                <div class="card-body">
                    <div v-if="spinner">
                             <b-spinner type="grow" label="Busy"></b-spinner>
                    </div>
                    <!--<div class="col-md-8">-->
                        <form>
                            <div class="row form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" id="name" placeholder="Name ..."
                                    v-model="profile.name" required>
                            </div>
                            <div class="row form-group">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" id="email" placeholder="Email ..."
                                    v-model="profile.email" required>
                            </div>
                            <div class="row form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" id="password" placeholder="Password ..."
                                    v-model="profile.password" required>
                            </div>
                            <div class="row form-group">
                                <button class="btn btn-success" @click.prevent="register">Register</button>
                            </div>
                        </form>
                    <!--</div>-->
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                profile: {
                    name: '',
                    email: '',
                    password: ''
                },
                spinner:false
            }
        },
        methods: {
            register() {
                    this.spinner=true
                    this.$store.dispatch('register', this.profile)
                    .then(() => {
                        this.spinner=false
                        this.$router.push({name:'dashboard'})
                    })
                    .catch(err => {
                        console.log(err)
                        this.spinner=false
                    })

            },
        },
        beforeRouteEnter (to, from, next) { 
            if (localStorage.getItem('token')) {
                return next('/dashboard');
            }
            next();
        }


    }
</script>