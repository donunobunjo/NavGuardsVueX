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
                                        <option selected disabled value="">Select a state ...</option>
                                        <option v-for="state in states" :value="state.state" :key="state.state">
                                            {{state.state}}
                                        </option>
                                    </select>
                                </div>
                            </form>
                            <hr>
                            <table class="table table-responsive">
                                <thead>
                                    <th>LGA</th>
                                    <th>STATE</th>
                                </thead>
                                <tbody>
                                    <tr v-for="lga in lgas" :key="lga.lga">
                                        <td>{{lga.lga}}</td>
                                        <td>{{lga.state}}</td>
                                    </tr>
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
               // lgas:[]
            }
        },
        computed:{
            ...mapGetters(['states','lgas'])
        },
        methods:{
            change(event){
               let state = event.target.value
                this.$store.dispatch('fetchLgas',state)
                .then(()=>{
                    //console.log(this.lgas)
                })
                .catch((err)=>{
                    console.log(err)
                })
               
            }
        },
        mounted () {
           // console.log('mounted')
            this.$store.dispatch('fetchStates')
        }
    }
</script>