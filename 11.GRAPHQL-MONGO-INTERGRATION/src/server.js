require('dotenv').config();
const {ApolloServer} =require('@apollo/server');
const {startStandaloneServer}=require('@apollo/server/standalone');
const connectDB=require('./databse/db')
const typeDefs=require('./graphql/schema');
const resolvers=require('./graphql/resolver');

async function startServer(){
   
    await connectDB();
    const server=new ApolloServer({
        typeDefs,
        resolvers,
    });

    const {url} = await startStandaloneServer(server, {
        listen : {port : process.env.PORT}
    });

    console.log(`Server read at:${url}`);
    
}

startServer(); 