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
                            <form>
                                <div class="row form-group">
                                    <label for="state">State:</label>
                                    <select name="" id="">
                                        <option value="">Select a state ...</option>
                                        <option v-for="state in states" :value="state.state" :key="state.id">
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
                
            }
        },
        computed:{
            ...mapGetters(['states'])
        },
        mounted () {
            console.log('mounted')
            this.$store.dispatch('fetchStates')
        }
    }
</script>