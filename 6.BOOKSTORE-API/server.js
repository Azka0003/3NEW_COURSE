//run server
require('dotenv').config()
const express=require('express')
const connectToDB=require("./database/db")
const bookRoutes = require('./routes/book-routes')

const app= express();
const PORT= process.env.PORT || 3000
//now connect to our db
connectToDB();

//middleware->express.json() parse json data
app.use(express.json());



// ✅ ROOT ROUTE - Add this before other routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Bookstore API is running!',
        status: 'OK',
        endpoints: {
            getAllBooks: 'GET /api/books',
            getBookById: 'GET /api/books/:id',
            addBook: 'POST /api/books',
            updateBook: 'PUT /api/books/:id',
            deleteBook: 'DELETE /api/books/:id'
        }
    });
});

//routes here ex /api/books/delete/:2 ,this below one is parent
app.use("/api/books",bookRoutes);

app.listen(PORT,()=>{
    console.log(`Server is now running on port ${PORT}`);
});