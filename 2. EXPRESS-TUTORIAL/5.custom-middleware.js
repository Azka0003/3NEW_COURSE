const express = require("express");
const app = express();



//define middleware function
const requestTimeStampLogger = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`${timeStamp} from ${req.method} to ${req.url}`);
    //output look like:
    //     2025-11-02T07:00:31.415Z from GET to /
    // 2025-11-02T07:00:46.598Z from GET to /home
    // 2025-11-02T07:00:56.279Z from GET to /about
    next();
};

app.use(requestTimeStampLogger);

app.get("/", (req, res) => {
    res.send("Home page");
});

app.get("/about", (req, res) => {
    res.send("About page");
});

app.listen(3000, () => {
    console.log(`Server is now running on port 3000`);
});




// | Term             | Meaning                              |
// | ---------------- | ------------------------------------ |
// | `new Date()`     | Current date and time                |
// | `.toISOString()` | Converts date → formatted string     |
// | `req.method`     | Type of HTTP request (GET/POST etc.) |
// | `req.url`        | Path requested by client             |
// | `next()`         | Moves to next middleware or route    |


