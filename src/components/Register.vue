<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
            <div class="card card-block">
                <div class="card-header">
                    Register
                </div>
                <div class="card-body">
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
                }
            }
        },
        methods: {
            register() {
                this.axios.post('http://127.0.0.1:8000/api/register', this.profile).
                    then(res => {
                        //console.log(res)
                        localStorage.setItem('name', res.data.user);
                        localStorage.setItem('token', res.data.token);
                        if (localStorage.getItem('token') !== null) {
                            this.$router.push({ name: 'dashboard' })
                        }
                    }).
                    catch(function (err) {
                        console.log(err)
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