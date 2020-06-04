<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <form>
                    <div class="row form-group">
                        <label for="item">Item</label>
                        <input type="text" class="form-control" id="item" v-model='productDetails.item' ref="item">
                        <span v-if="error.errItem" class='err'>{{error.errItem}}</span>
                    </div>
                     <div class="row form-group">
                        <label for="quantity">Quantity</label>
                        <input type="number" class="form-control" id="quantity" v-model="productDetails.quantity" ref="quantity">
                        <span v-if="error.errQuantity" class='err'>{{error.errQuantity}}</span>
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
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in calculateAmount" :key="product.id">
                            <td>{{product.item}}</td>
                            <td>{{product.quantity}}</td>
                            <td>{{product.price}}</td>
                            <td>{{product.amount}}</td>
                            <td>
                                <button class="btn btn-primary">View</button>
                                <button class="btn btn-secondary" @click.prevent='edit(product)'>Edit</button>
                                <button class="btn btn-danger" @click.prevent='destroy(product)'>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <el-dialog v-if='editID' :visible.sync=' editDialogueVisible'>
                    <form>
                        <div class="form-group row">
                            <label for="item">Item</label>
                            <input type="text" class="form-control" id="item" v-model="currentProduct.item">
                        </div>
                        <div class="form-group row">
                            <label for="quantity">Quantity</label>
                            <input type="number" class="form-control" id="quantity" v-model="currentProduct.quantity">
                        </div>
                        <div class="form-group row">
                            <label for="price">Price</label>
                            <input type="number" class="form-control" id="price" v-model="currentProduct.price">
                        </div>
                        <div class="form-group row">
                            <button @click.prevent="update(currentProduct)">Save</button>
                            <button>Cancel</button>                        
                        </div>
                    </form>
                </el-dialog>
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
            products:[],
            // item:'',
            // quantity:0,
            // price:0
            error:{
                errMessage:'',
                errItem:'',
                errQuantity:'',
                errPrice:''
            },
            editDialogueVisible:false,
            currentProduct:{},
            editID:'',
            initialProduct:{}
        }
    },
    methods:{
        submit(){
            // let payload={'item':this.item,'quantity':this.quantity,'price':this.price}
            // this.$store.dispatch('addProduct',payload)
            // .then(()=>{
                
            // })
            if (this.productDetails.item==''){
                this.error.errItem='Item is required'
                setTimeout(()=>{
                    this.error.errItem=''
                },3000)
                
                this.$refs.item.focus()
                return false
            }
            if (this.productDetails.quantity==''){
                this.error.errQuantity='A number is needed here'
                setTimeout(()=>{
                    this.error.errQuantity=''
                },3000)
                
                this.$refs.quantity.focus()
                return false
            }
            let uri='http://127.0.0.1:8000/api/product'
            this.axios.post(uri,this.productDetails)
            .then((res)=>{
                this.products.push(res.data.product)
                this.productDetails.item=''
                this.productDetails.quantity=''
                this.productDetails.price=''
                swal("Prouct","Product saved successfully","success")
                console.log(this.calculateAmount)
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        edit(i){
            //console.log(i.id)
            this.initialProduct=i
            this.editID=i.id
            this.currentProduct.id = i.id
            this.currentProduct.item = i.item
            this.currentProduct.quantity = i.quantity
            this.currentProduct.price = i.price
           // console.log(this.editID)

            this.editDialogueVisible=true
        },
        destroy(i){


            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this product!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    let uri='http://127.0.0.1:8000/api/product/'+i.id
                    this.axios.delete(uri)
                    .then((res)=>{
                       if (res.data.message=='Product deleted successfully'){
                         this.products.splice(this.products.indexOf(i), 1);
                       }
                    })
                    swal("Product deleted successfully!", {
                    icon: "success",
                    });
                } else {
                    //swal("Your imaginary file is safe!");
                }
            });
        },
        update(i){
            //console.log(i.id)
             const uri = 'http://127.0.0.1:8000/api/product/'+i.id
             this.axios.put(uri,this.currentProduct)
             .then((res)=>{
                 if(res.data.message=='Product updated succesfully')
                 {
                     //console.log(res.data.message)
                     this.products.splice(this.products.indexOf(this.initialProduct), 1,this.currentProduct);
                     this.editID=''
                     this.editDialogueVisible=false
                 }
             })
             .catch((err)=>{
                 console.log(err)
             })
        }
    },
    computed:{
        // ...mapGetters(['products'])
        calculateAmount(){
            return this.products.map((product)=>{
                return {
                    id:product.id,
                    item:product.item,
                    quantity:product.quantity,
                    price:product.price,
                    amount:product.quantity*product.price
                }
            })
        },
        // totalAmount(){
        //     calculateAmount.reduce()
        // }
    }
}
</script>

<style scoped>
    .err{
        font-weight: bolder;
    }
</style>