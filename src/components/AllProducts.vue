<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <table class="table table-responsive">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in allProducts" :key="product.id">
                            <td>{{product.item}}</td>
                            <td>{{product.quantity}}</td>
                            <td>{{product.price}}</td>
                            <td>
                                <button class="btn btn-primary">View</button>
                                <button class="btn btn-secondary">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters(['allProducts'])
    },
    beforeMount(){
        this.$store.dispatch('fetchAllProducts')
    }
}
</script>