const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');

const fs = require("fs");

const cloudinary = require('../config/cloudinary')


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
};

//fetching all images and then pagination and sorting
const fetchImagesController = async (req, res) => {
    try {
        //page number
        const page = parseInt(req.query.page) || 1;
        //  Items per page (limit)
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        //👉 It decides which field will be used for sorting. ex createdAt,title,name,etc.
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;//direction decide krega
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit)

        const sortObj = {};
        sortObj[sortBy] = sortOrder

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        // const images = await Image.find({});

        if (images) {
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPages: totalPages,
                totalImages: totalImages,
                data: images,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'

        });
    }
}

const deleteImageController = async (req, res) => {
    try {
        //first delete from cloudinary then from mongodb
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);//find the image in db atlas
        if (!image) {
            return res.status(404), json({
                success: false,
                message: 'Image not found'
            })
        }

        //we want to delete image but only that image a user can delete that he uploads not any other users image he cant delete
        //check if this image is uploaded by the current user who is trying to delete this image
        // as we know when we upload the image then we also storr uploaded by mean with image image we also have data of the user who upload it
        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this image as u havent upload it'
            });
        }

        //delete image from cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        //now delete image from mongodb db
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

        res.status(200).json({
            success: true,
            messsage: 'Image deleted successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        });
    }
}


module.exports = {
    uploadImageController,
    fetchImagesController,
    deleteImageController,
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



// req.file is available in the controller because Multer is already used in the route.
// There is no need to import Multer inside the controller.
// How this actually works (clear flow)
// 1️⃣ Multer is used in the routes file, not in the controller
// Multer runs before the controller as middleware,
// processes the file upload, and then attaches the file information to the req object.
// When the request reaches the controller, req.file is already present and ready to use.
//idhr uploadmiddleware mein h controller se phle