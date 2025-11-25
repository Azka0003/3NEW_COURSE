const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//register controller
const registerUser = async (req, res) => {
    try {
        //extract user information from our request body
        //this username etc should be spell same as declared in schema
        const { username, email, password, role } = req.body;

        //check if user is already exists in our database
        const checkExistingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: 'User is already exists either with same username or same email'
            });
        }

        //so if not found then simply store in var like username but cant as for security purpose
        // we need to hash the password usind bcryptjs npm i bcryptjs
        //hash(password: string, salt: number | string): Promise<string>
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user and save in your database
        const newlyCreatedBook = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newlyCreatedBook.save();

        if (newlyCreatedBook) {
            res.status(201).json({
                success: true,
                message: 'User registered successfully'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Unable to register user please try again'
            });
        }


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured! Please try again'
        });
    }
}

//login controller
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        //find if the current user is exists in databse or not 
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User Doesnt exist!`
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentials!'
            });
        }


        //if all data matched then we create token called bearer token
        //bearer what it bear it bears info or the credentials of a particular logged in users 
        //create token 
        const accessToken = jwt.sign
            ({
            userId: user._id,
            username: user.username,
            role: user.role
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '15m'

                }
            );
        //info stored in token  in encrypted form if u decrypt u'll get actual info

        //return token back
        res.status(200).json({
            success: true,
            message: 'Logged in successful',
            accessToken
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured! Please try again'
        });
    }
}


//change password 
const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        //extract old and new password from screen
        const { oldPassword, newPassword } = req.body;

        //find the current logged in user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        //check if old password user entered is correctmex password is 1234 but user entering 1243 we cant chnage password need to give error

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false, message: 'Old password is not correct! Please try again'
            });
        }

        //done with all edge cases now hash new password and update

        //hash
        const salt = await bcrypt.genSalt(10);
        const newhashedPassword = await bcrypt.hash(newPassword, salt)
        //update
        user.password = newhashedPassword
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });

    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured! Please try again'
        });
    }
}


module.exports = {
    registerUser,
    loginUser,
    changePassword
}
















// what u r using to ur login page should be unique
// like here name is unique email aslo unique it is up to u to choose any
// but if imagine there is two user registered of same name then u cant
// use name field on login page as it is confusing which user

