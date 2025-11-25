const express= require('express');
const authMiddleware=require('../middleware/auth-middleware');
const adminMiddleware=require('../middleware/admin-middleware');
const uploadmiddleware=require('../middleware/upload-middleware');
const {uploadImageController}=require('../controllers/image-controller');

const router = express.Router();

router.post(
    '/upload',
    authMiddleware,
    adminMiddleware,
    uploadmiddleware.single('image'),
    uploadImageController
)

module.exports=router;


// why brackets
// const { uploadImageController } = require('../controllers/image-controller');
// This works only if your controller file exports an object with named properties

//how u use userInfo in uploadImageController
//because see here first is authMiddleware, it 
//will return userinfo that leterly accessed by uploadImageController
//doubt is this necessary everywhere to pass that func or uske wagair bhi sb jagha userInfo access ho skti h