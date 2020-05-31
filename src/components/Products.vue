<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <form>
                    <div class="row form-group">
                        <label for="item">Item</label>
                        <input type="text" class="form-control" id="item" v-model='productDetails.item'>
                    </div>
                     <div class="row form-group">
                        <label for="quantity">Quantity</label>
                        <input type="number" class="form-control" id="quantity" v-model="productDetails.quantity">
                    </div>
                    <div class="row form-group">
                        <label for="price">Price</label>
                        <input type="number" class="form-control" id="price" v-model="productDetails.price">
                    </div>
                    <div class="row form-group">
                        <button class="btn btn-primary" @click.prevent="submit">Submit</button>
                    </div>
                </form>
                <hr>
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
                        <tr v-for="product in products" :key="product.id">
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
// import {mapGetters} from 'vuex';
import swal from 'sweetalert'
export default {
    data(){
        return{
            productDetails:{
                item:'',
                quantity:0,
                price:0
            },
            products:[]
            // item:'',
            // quantity:0,
            // price:0
        }
    },
    methods:{
        submit(){
            // let payload={'item':this.item,'quantity':this.quantity,'price':this.price}
            // this.$store.dispatch('addProduct',payload)
            // .then(()=>{
                
            // })
            let uri='http://127.0.0.1:8000/api/product'
            this.axios.post(uri,this.productDetails)
            .then((res)=>{
                this.products.push(res.data.product)
                this.productDetails.item=''
                this.productDetails.quantity=''
                this.productDetails.price=''
                swal("Prouct","Product saved successfully","success")
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    computed:{
        // ...mapGetters(['products'])
    }
}
</script>