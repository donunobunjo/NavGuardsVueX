<template>
 <div>
   <h1>Create Post</h1>
   <div class>
          <el-upload
            action="/"
            list-type="picture-card"
            limit="4"
            :on-preview="handlePictureCardPreview"
            :on-change="updateImageList"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <button class="el-icon-plus">Plus</button>
        <button class="el-icon-success">Plus</button>
        
 </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imageList: [],
      //status_msg: "",
      //status: "",
      //isCreatingPost: false,
      //title: "",
      //body: "",
      componentKey: 0
    };
  },
  methods:{
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imageList.push(file);
      this.dialogVisible = true;
    },
    updateImageList(file){
      this.imageList.push(file.raw)
    }
  }
}
</script>


