<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card card-default">
                        <div class="card-header">
                            <h3>States and LGA's</h3>
                        </div>
                        <div class="card-body">
                                    <!--<select v-model="selected" @change='change'>
                                        <option disabled value="">Select State</option>
                                        <option v-for="state in states" :value="state.state" :key="state.state">
                                            {{state.state}}
                                        </option>
                                    </select>
                                    <p><b>Selected</b>: {{ selected }} </p>-->
                            <form>
                                <div class="row form-group">
                                    <label for="state">State</label>
                                    <select id="state" class="form-control" @change="change">
                                        <option disabled value="">Select a state ...</option>
                                        <option v-for="state in states" :value="state.state" :key="state.state">
                                            {{state.state}}
                                        </option>
                                    </select>
                                </div>
                            </form>
                            <hr>
                            <table class="table table-responsive">
                                <thead>
                                    <tr></tr>
                                    <tr></tr>
                                </thead>
                                <tbody>
                                    <tr></tr>
                                    <tr></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
   import {mapGetters} from 'vuex'
    export default{
        data(){
            return{
                selected:'',
               // states:[{state:'abia'},{state:'lagos'},{state:'zamfara'},{state:'bornu'}]

            }
        },
        computed:{
            ...mapGetters(['states','lgas'])
        },
        methods:{
            change:(event)=>{
               let state = event.target.value
               //console.log(state)
                //this.$store.dispatch('fetchLgas',state)
                this.$store.dispatch('fetchLgas',state)
                console.log(this.lgas)
            }
        },
        mounted () {
           // console.log('mounted')
            this.$store.dispatch('fetchStates')
        }
    }
</script>