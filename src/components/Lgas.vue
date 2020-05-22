<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card card-default">
                        <div class="card-header">
                            <h3>States and LGA's</h3>
                        </div>
                        <div class="card-body">
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
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                    <tr v-for="lga in lgas" :key="lga.lga">
                                        <td>{{lga.lga}}</td>
                                        <td>{{lga.state}}</td>
                                        <td><button class="btn btn-primary" @click="view(lga)">View</button></td>
                                    </tr>
                                </tbody>
                            </table>
                            <el-dialog v-if="currentLga" :visible.sync='lgaViewDialog'>
                                <form>
                                    <div class="row form-group">
                                        <label for="state">State</label>
                                        <input type="text" id="state" class="form-control" v-model="currentLga.state" disabled>
                                    </div>
                                    <div class="row form-group">
                                        <label for="lga">Lga</label>
                                        <input type="text" id="lga" class="form-control" v-model="currentLga.lga" disabled>
                                    </div>
                                </form>
                            </el-dialog>
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
                currentLga:'',
                lgaViewDialog: false
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
               
            },
            view(i){
                this.currentLga=i
                //console.log(this.currentLga)
                this.lgaViewDialog= true
            }
        },
        mounted () {
           // console.log('mounted')
            this.$store.dispatch('fetchStates')
        }
    }
</script>