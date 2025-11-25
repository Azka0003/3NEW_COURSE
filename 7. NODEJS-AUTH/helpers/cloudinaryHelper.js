// public_id(output u get after uploading) etc is needed laterly as imagine if u want to delete image ull not only delete from mongo db but also from the cloudinary etc

const cloudinary = require('../config/cloudinary');
const uploadToCloudinary = async(filePath)=>{
    try{
const result = await cloudinary.uploader.upload(filePath); //used(cloudinary.uploader.upload) to upload to cloudinary
  
return {
    url:result.secure_url,
    publicId:result.public_id,
};
}catch(error){
        console.error('Error while uploading to cloudinary',error);
        throw new Error('Error while uploading to cloudinary');
    }
}

module.exports={
    uploadToCloudinary
}




// 🔑 Short direct answer
// The names on the left side are created by you.
// They are just normal JavaScript object keys.
// MongoDB schema has no role here.