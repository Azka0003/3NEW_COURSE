const express = require('express')
const path=require('path');
const { title } = require('process');

const app = express();

app.set('view engine','ejs');
//set directory for the views folder
app.set('views',path.join(__dirname,'views'));


const products=[
    {
        id:1,
        title:'product 1'
    },
       {
        id:2,
        title:'product 2'
    },
       {
        id:3,
        title:'product 3'
    }
];

app.get('/',(req,res)=>{
    res.render('home',{title:'Home',products: products})
});

app.get('/about', (req,res)=>{
    res.render('about',{title:'About Page'})
})


const port = 3000;
app.listen(port, ()=>{
    console.log('Server is running')
})

//now i want to pass the products from here to home page so there are many ways
//one point i want is to display common component say header.ejs in both home and about page
//to include this components we use <%-
// now i want to pass products in ejs ul



// | Part                            | Meaning                                                                                      |
// | ------------------------------- | -------------------------------------------------------------------------------------------- |
// | `app.set('views', ...)`         | Configures the **views** directory path for Express                                          |
// | `path.join(__dirname, 'views')` | Combines the current folder path (`__dirname`) with `'views'` to create an **absolute path** |
// | `__dirname`                     | Gives the **current directory** of the file being executed                                   |
// | `'views'`                       | The **folder name** that holds your template files                                           |
