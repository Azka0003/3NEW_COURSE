const products = require('../data/product');

const resolvers = {

    Query: {
        products: () => products,
        product: (_, { id }) => products.find((item) => item.id === id),
    },

    Mutation: {
        createProduct: (_, { title, category, price, inStock }) => {
            const newlyCreatedProduct = {
                id: String(products.length + 1),
                title,
                category,
                price,
                inStock,
            };

            products.push(newlyCreatedProduct);
            return newlyCreatedProduct
        },

        deleteProduct: (_, { id }) => {
            const index = products.findIndex((product) => product.id === id);
            if (index === -1) return false;

            products.splice(index, 1);

            return true;
        },

        updateProduct: (_, { id, ...updates }) => {
            const index = products.findIndex((product) => product.id === id);

            const updateProduct = {
                ...products[index], ...updates
            }

            products[index]=updateProduct;

            return updateProduct
        }
    }
};



module.exports = resolvers;



// const products = require('../data/product');

// const resolvers = {

//     Query: {
//         products: () => products,
//         product: (_, { id }) => products.find((item) => item.id === id)
//     },

//     Mutation: {

//         createProduct: (_, { category, price }) => {
//             const newProduct = {
//                 id: String(products.length + 1),
//                 category,
//                 price,
//             };

//             products.push(newProduct);
//             return newProduct
//         },

//         deleteProduct: (_, { id }) => {
//             const index = products.findIndex((item1) => item1.id === id);

//             if (index === -1) return false;
//             products.splice(index, 1);
//             return true;
//         },

//         updateProduct: (_, { id, category, price }) => {
//             const uproduct = products.find((item) => item.id === id);
//             uproduct.id = id;
//             uproduct.category = category,
//                 uproduct.price = price

//             return uproduct;
//         }
//     }
// }

// module.exports = resolvers;