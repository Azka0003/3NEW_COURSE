const express=require('express');
const authMiddleware=require('../middleware/auth-middleware');
const adminMiddleware=require('../middleware/admin-middleware');
const router =express.Router();

router.get('/welcome',authMiddleware,adminMiddleware, (req,res) => {
    res.json({
        message:"Welcome to the admin page"
    });
});

module.exports=router;


//it require two layers of protection
// 1.for whether logiin or not
// 2. whether admin or not as if admin then only access