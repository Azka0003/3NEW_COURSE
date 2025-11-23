const jwt=require('jsonwebtoken');
const authMddleware = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if(!token)
    {
        return res.status(401).json({
            success:false,
            message:'Access denied. No token provided. Please login to continue'
        });
    }

    //now decode token
try{

    const decodedTokenInfo=jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(decodedTokenInfo);

    req.userInfo=decodedTokenInfo;
next();
}catch{
     return res.status(500).json({
            success:false,
            message:'Access denied. No token provided. Please login to continue'
        });
}

};

module.exports = authMddleware;


// req.userInfo is created inside your auth middleware so that future routes can know:
// Which user is logged in
// What role they have
// Which userId to use

// mean it is added just for getting info but why did req. as normal var mein bhi to store kr skte the
// ✅ Why do we use req.userInfo instead of a normal variable?
// Because:
// ⭐ A normal variable (like let userInfo = ...)
// ❌ cannot be accessed in the next middleware or controller.
// Every request has isolated scope.

// ⭐ req travels through the entire request–response cycle
// ✔ Whatever you attach to req
// → automatically becomes available
// → in EVERY next middleware/controller.

// ⭐ Summary (1 sentence)
// We use req.userInfo because the req object travels through all middlewares and routes, so attaching data to it lets the next functions access that user’s information — normal variables cannot do that.

// ⭐ Summary (very short)**
// authHeader gets: "Bearer <token>"
// split(" ") converts it into ["Bearer", "<token>"]
// [1] extracts only the <token> part
// authHeader && prevents errors if header is missing


// const token = authHeader && authHeader.split(" ")[1];
// This line does THREE things:
// 🔹 (A) Check if authHeader exists
// authHeader &&
// If authHeader is null or undefined,
// → token becomes undefined
// → No error
// → Prevents app from crashing.

// 🔹 (B) Splitting the string
// authHeader.split(" ")
// "Bearer abcdefgh123" becomes:
// ["Bearer", "abcdefgh123"]

// 🔹 (C) Taking the second part
// [1]
// This gives only:
// "abcdefgh123"
// ➡ This part is the actual JWT token