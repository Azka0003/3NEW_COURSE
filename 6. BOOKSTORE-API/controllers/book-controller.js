const Book = require('../models/book')

const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find({});
        if (allBooks?.length > 0) {
            res.status(200).json({
                success: true,
                message: 'List of books fetched successfully',
                data: allBooks
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: 'No books found in collection',
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong! Please Try Again',
        })
    }
}

//here we r providing real ids by copy paste 
const getSingleBookById = async (req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const bookDetailByID = await Book.findById(getCurrentBookID)

        if (!bookDetailByID) {
            return res.status(404).json({
                success: false,
                message: 'Book with the current ID is not found! Please try with another ID'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book from the id is found!',
            data: bookDetailByID
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong! Please Try Again',
        })
    }
}

const addNewBook = async (req, res) => {
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData)
        if (newlyCreatedBook) {
            res.status(201).json({
                success: true,
                message: 'Book added successfully',
                data: newlyCreatedBook
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong! Please Try Again',
        });
    }
}

//jo bhi hume user dega vo sb req mein hota h as res mein to srf res hota h
const updateBook = async (req, res) => {
    try {
        const updatedBookFormData = req.body;
        const getCurrentBookID = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(
            getCurrentBookID, updatedBookFormData, { new: true }
        );

        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book is not found with this ID'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong! Please Try Again',
        });
    }
}

const deleteBook = async (req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);

        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: 'Book is not found with this ID'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Details of Book that is deleted',
            data: deletedBook
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong! Please Try Again',
        });
    }
}

module.exports = {
    getAllBooks,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook
};