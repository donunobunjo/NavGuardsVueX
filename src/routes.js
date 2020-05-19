import Home from './components/Lgas.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import DashBoard from './components/DashBoard.vue'

export default [
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/login',
            name:'login',
            component:Login
        },
        {
            path:'/register',
            name:'register',
            component:Register
        },
        {
            path:'/dashboard',
            name:'dashboard',
            component:DashBoard,
            beforeEnter:function(to,from,next){
                if (localStorage.getItem('token')==null){
                    //next(false)
                    next({name:'login'})
                }
                else{
                  next()
                }
            }
        }
    ]
