const express= require('express');
const authMiddleware=require('../middleware/auth-middleware');
const adminMiddleware=require('../middleware/admin-middleware');
const uploadmiddleware=require('../middleware/upload-middleware');
const {uploadImageController, fetchImagesController, deleteImageController}=require('../controllers/image-controller');

const router = express.Router();

router.post(
    '/upload',
    authMiddleware,
    adminMiddleware,
    uploadmiddleware.single('image'),
    uploadImageController
);

//to get all the images
router.get('/get',authMiddleware, fetchImagesController);

//delete image route
router.delete('/:id',authMiddleware, adminMiddleware, deleteImageController);

module.exports=router;


// why brackets
// const { uploadImageController } = require('../controllers/image-controller');
// This works only if your controller file exports an object with named properties
//Function returns object 
//{ url, publicId } → destructuring
//Curly braces {} = JavaScript object                  url and publicId = object keys


//how u use userInfo in uploadImageController
//because see here first is authMiddleware, it 
//will return userinfo that leterly accessed by uploadImageController
//doubt is this necessary everywhere to pass that func or uske wagair bhi sb jagha userInfo access ho skti h