const express=require('express');
const app= express();

//root route
app.get("/",(req,res)=>{
    res.send("Welcome to our home page");
});

app.get('/products',(req,res)=>{
    const products=[
        {
            id: 1,
            label: 'Product 1'
        },
         {
            id: 2,
            label: 'Product 2'
        },
         {
            id: 3,
            label: 'Product 3'
        }
    ];
    res.json(products)
})


//Dynamic Routing
//get a single product, colon tells it is dynamic example of access:http://localhost:3000/products/3
app.get('/products/:id',(req,res)=>{
    console.log('req.params',req.params) //{ id: '3' }
    console.log('req.params.id',req.params.id)//3
    const productId=parseInt(req.params.id)

     const products=[
        {
            id: 1,
            label: 'Product 1'
        },
         {
            id: 2,
            label: 'Product 2'
        },
         {
            id: 3,
            label: 'Product 3'
        }
    ];

    const getSingleProduct=products.find(product=> product.id === productId)
    if(getSingleProduct){
        res.json(getSingleProduct)
    }else{
        res.status(404).send('product is not found! please try with different id')
    }
})


const port=3000;
app.listen(port,()=>{
    console.log(`Server is now running at port ${port}`)
})




// products.find(productId);
// Then productId is not a function, it’s just a value (like 2 or '3').
// .find() needs a callback function — it can’t guess what condition to check.