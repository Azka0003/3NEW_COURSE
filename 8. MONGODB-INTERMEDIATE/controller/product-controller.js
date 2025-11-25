const product = require('../models/product');
const productSchema = require('../models/product');

//operator: $match,$gte(greater than),$group,$max,$min,$avg,$sum,$count,$project
const getProductStats = async (req, res) => {
    try {
        const result = await productSchema.aggregate([
            //Stage 1 match
            {
                $match: {
                    inStock: true,
                    price: {
                        $gte: 100
                    }
                }
            },
            //stage 2 group
            {
                $group: {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

        // Add this temporarily to check all products in DB
        // const allProducts = await productSchema.find({});
        // console.log('Total products in DB:', allProducts.length);
        // console.log('All products:', allProducts);

        res.status(200).json({
            success: true,
            data: result
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured!',
        })
    }
}

const getProductAnalysis = async (req, res) => {
    try {
        const result = await productSchema.aggregate([
            {
                $match: {
                    category: "Electronics",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$price"
                    },
                    averagePrice: {
                        $avg: "$price"
                    },
                    maxProductPrice: {
                        $max: "$price"
                    },
                    minProductPrice: {
                        $min: "$price"
                    }
                }
            },
            //reshape
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    averagePrice: 1,
                    maxProductPrice: 1,
                    minProductPrice: 1,
                    priceRange: {
                        $subtract: ["$maxProductPrice", "$minProductPrice"],
                    }

                }
            }
        ]);


        res.status(200).json({
            success: true,
            data: result
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
}

const insertSampleProducts = async (req, res) => {
    try {

        //u have to implement here all crud operations again as takin in data etc as we studied them earlier so we took data from here to fasten the task
        const sampleProducts = [
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"],
            },
            {
                name: "Smartphone",
                category: "Electronics",
                price: 699,
                inStock: true,
                tags: ["mobile", "tech"],
            },
            {
                name: "Headphones",
                category: "Electronics",
                price: 199,
                inStock: false,
                tags: ["audio", "tech"],
            },
            {
                name: "Running Shoes",
                category: "Sports",
                price: 89,
                inStock: true,
                tags: ["footwear", "running"],
            },
            {
                name: "Basketball",
                category: "Sports",
                price: 290,
                inStock: true,
                tags: ["sports", "outdoor"],
            },
            {
                name: "Yoga Mat",
                category: "Sports",
                price: 39,
                inStock: false,
                tags: ["fitness", "yoga"],
            },
        ];

        //here new concept as insertMAny  Inserts one or more new documents as a single insertMany call to the MongoDB server.
        //for single create or save
        const result = await productSchema.insertMany(sampleProducts);
        res.status(201).json({
            success: true,
            data: `Inserted ${result.length} sample products`
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
}

module.exports = { insertSampleProducts, getProductStats, getProductAnalysis };
// module.exports = insertSampleProducts ; Passing without {} works only when we export the function itself, not an object.mean not in {}


