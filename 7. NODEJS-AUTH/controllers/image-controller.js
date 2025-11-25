const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');


const fs = require("fs");


// const cloudinary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {
    try {
        //check if file is missing in req object
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'file is required. please upload an image'
            });
        }
        //upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        //store the image url and public id along with the uploaded user id in databse
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });
        await newlyUploadedImage.save();

//delete the image from local storage
fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUploadedImage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'

        });
    }
}
module.exports={
    uploadImageController,

}

//till now we have created model/schema controller asal kaam jo krega main logic helper bhi kr lia(cloudinary pr upadte ka function) nowit is the time for routes

/*No, req.file is NOT default like req.body.

req.file only exists when you use Multer middleware.
Express cannot handle files by default.

So we use:
const multer = require('multer');
After using upload.single('image'), Multer adds:
req.file → for a single file
req.files → for multiple files */