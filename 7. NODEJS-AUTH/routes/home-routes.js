const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

router.get('/welcome', authMiddleware, (req, res) => {
    const { username, userId, role } = req.userInfo;//tokenn wale var
    res.json({
        message: 'Welcome to the home page',
        selfWrittenInfo: {
            message: 'logged in user data',
        },
        user: {
            _id: userId,
            username,
            role
        }
    });
});

module.exports = router;



//u can pass many handlers/middleware
// router.get('/welcome',handler1,handler2,(req,res)=>{
//     res.json({
//         message:'Welcome to the home page'
//     });
// });
//imagine handler1 is a middleware if it runs fine then handler2 then rest if at any point it stops it will not execute home page
//  so its helpful in checking whether user is login or not through middleware and acc to ans aage ka execute hoga
