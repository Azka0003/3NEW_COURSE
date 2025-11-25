const express = require('express');
const { registerUser, loginUser, changePassword } = require('../controllers/auth-controller')
const router = express.Router();

const authMiddleware=require('../middleware/auth-middleware');

//all routes are related to authentication & authorization
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-Password",authMiddleware, changePassword);

module.exports = router;