const mongoose=require('mongoose');
const ImageSchema=new mongoose.Schema({
    url:{
        type:'string',
        required:true
    },
    publicId:{//image url etc
        type:'string',
        required:true
    },
    uploadedBy:{//how know user if no refer here also will understnd this in next section currently know this,this is info of who user uploaded
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});
module.exports=mongoose.model('Image',ImageSchema);
//things we need to save while uploading the image