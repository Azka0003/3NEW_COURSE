const { gql } = require('graphql-tag');

//types
const typeDefs = gql`

type Product {
id: ID!
title:String!
category:String!
price:Float!
inStock:Boolean!
}

#Query like get

type Query {
    products: [Product!]!                          
   product(id: ID): Product              
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

