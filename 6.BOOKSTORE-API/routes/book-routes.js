const express= require('express')

const router=express.Router();

const { getAllBooks,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook}=require('../controllers/book-controller')

// router.get('/get',(req,res)=>{
// here insted of writing full req res and make messy we will use controller mean we will write all req,res part in that and import that file here this is all controller
// })

router.get('/get',getAllBooks);
router.get('/get/:id',getSingleBookById)
router.post('/add',addNewBook)
router.put('/update/:id',updateBook)
router.delete('/delete/:id',deleteBook)

module.exports=router;