<template>
    <div>
        <h1>Create Post</h1>
        <div class="row justify-content-center">
            <form>
                <div class="row form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" class="form-control" v-model="title">
                </div>
                <div class="row form-group">
                    <label for="content">Content</label>
                    <!-- <input type="text" id="content" class="form-control" v-model="content"> -->
                    <textarea id="content" cols="30" rows="10" class="form-control" v-model="content"></textarea>
                </div>
            </form>
        </div>
        <div>
            <el-upload action="/" list-type="picture-card" :on-preview="handlePictureCardPreview"
                :on-change="updateImageList" :auto-upload="false">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <button class="el-icon-plus">Plus</button>
            <button class="el-icon-success">Plus</button>
        </div>
        <div>
            <button class="btn btn-success" @click.prevent='createPost'>Submit</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogImageUrl: "",
                dialogVisible: false,
                imageList: [],
                title: "",
                content: "",
            };
        },
        computed: {

        },
        methods: {
            createPost() {
                let formData = new FormData();
                formData.append("title", this.title);
                formData.append("content", this.content);
                for(let i=0;i<this.imageList.length;i++){
                    formData.append('images[]',this.imageList[i])
                }
                let uri = 'http://127.0.0.1:8000/api/create_post'
                this.axios.post(uri, formData, {
                     headers: { "Content-Type": "multipart/form-data" }
                })
                .then((res) => {
                    console.log(res)
                })
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.imageList.push(file);
                this.dialogVisible = true;
            },
            updateImageList(file) {
                this.imageList.push(file.raw)
            }
        }
    }
</script>