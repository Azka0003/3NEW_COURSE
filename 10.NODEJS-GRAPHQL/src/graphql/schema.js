const { gql } = require('graphql-tag');

//DATA TYPES
//String Int Float Boolean ID-an unique identifier(like _id in nodejs)
//ID! -non nullable field mean cant be null

//Product just a name

//types
const typeDefs = gql`

type Product {
id: ID!
title:String!
category:String!
price:Float!
inStock:Boolean!
}

# after creating types u need to create queries
# three things u should know first one is types second query ,third one is mutations

# remember in rest api we have controllers that r actually our queries like
# blog site ->controllers->fetch all the blogs,fetch blog by id delete update etc

#products name of query, type: Product above mentioned, array [] as many products
#both are non nullable query or type
#Query like get

type Query {
    products: [Product!]!                           #1 list of products ,a array
   product(id: ID): Product                         #2 single product,by passing id
}
 #Mutation like post put delete  
type Mutation {

    createProduct(
        title:String!
        category:String!
        price: Float!
        inStock: Boolean!
    ): Product

    deleteProduct(id: ID!): Boolean #return boolean type

    updateProduct(
    id: ID!
    title: String
    category:String #not mandatory update what u want
    price: Float
    inStock: Boolean
    ):Product
}`;
module.exports = typeDefs;

// What is : Product?
// // The : Product tells GraphQL what type of data this operation will RETURN.




// const gql = require('graphql-tag');

// const schema = gql`

// type Product{
// id:ID!
// category:String!
// price:Float!
// }

// type Query{
// products:[Product!]!
// product(id: ID):Product
// }

// type Mutation{

// createProduct(
// category:String!
// price:Float!
// ):Product

// deleteProduct(id: ID!):Boolean

// updateProduct(
// id:ID!
// category:String
// price:Float
// ):Product

// }`;
// //keep remmebr two things: what u need as input and as a return
// module.exports=schema;