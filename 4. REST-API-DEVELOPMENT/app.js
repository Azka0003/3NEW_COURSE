const express = require('express')
const app = express();

//Middleware
app.use(express.json())
//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.urlencoded({ extended: true }))

let books = [
    {
        id: 1,
        title: "Book 1"
    },
    {
        id: 2,
        title: "Book 2"
    },

];

//intro route
app.get('/',(req,res)=>{
res.json({
    message: "Welcome to our bookstore api",
});
});

//get all books
app.get('/get',(req,res)=>{
res.json(books);
});


app.get('/get/:id',(req,res)=>{
    const book=books.find(item => item.id === parseInt(req.params.id));
    if(book)
    {
        res.status(200).json(book)
    }
    else{
        res.status(404).json({
            message: 'Book not found please try with different book ID'
        });
    }
});

//add a new book
app.post('/add',(req,res)=>{
    const newBook={
        // to get unique id
        id: Math.floor(Math.random()*1000),
        title: `Book ${Math.floor(Math.random()*1000)}`
    }

    books.push(newBook);
    res.status(200).json({
        data: newBook,
        message: "New book is added successfully",
    });
});

//update a book
app.put('/update/:id',(req,res)=>{
    const findCurrentBook=books.find(bookItem => bookItem.id === parseInt(req.params.id))
    if(findCurrentBook)
    {
        findCurrentBook.title=req.body.title || findCurrentBook.title

        res.status(200).json({
            message:`Book with ID ${req.params.id} updated successfully`,
            data: findCurrentBook
        })
    } else{
        res.status(404).json({
            message:'Book not found'
        });
    }
});


//delete a book
app.delete('/delete/:id',(req,res)=>{
    const findIndexOfCurrentBook = books.findIndex(item=>item.id === parseFloat(req.params.id));
    if(findIndexOfCurrentBook !== -1)
    {
        const deletedBook=books.splice(findIndexOfCurrentBook,1);
        res.status(200).json({
            message:'Book deleted Successufully',
            data: deletedBook[0]
        })
    }else{
        res.status(404).json(
            {
                 message:'Book not found'
            }
        )
    }
})

const port = 3000;

app.listen(port,()=>{
    console.log(`Server is now running on port ${port}`)
})




// So yes ✅
// Everything you’re doing now — routes like /get, /add, /update/:id, /delete/:id, using JSON, and testing in Postman — 
// is part of the REST API module in Express.