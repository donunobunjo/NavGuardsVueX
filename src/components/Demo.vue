<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3>Just testin sweet alerts</h3>
                    </div>
                    <div class="card-body">
                        <button class="btn btn-info" @click.prevent="testing">click</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert'
export default {
    data(){
        return{}
    },
    methods:{
        testing(){
            // Swal("Hello world!");
            // swal("Here's the title!", "...and here's the text!")
            // swal("Good job!", "You clicked the button!", "error")
            //---------------------------------------------------------
            /*swal({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "info",
                button: "Aww yiss!",
            });*/
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
        }
    }
}
</script>