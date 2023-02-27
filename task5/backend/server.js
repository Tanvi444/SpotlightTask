// require("dotenv").config();
const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const graphql = require('graphql');
// const {graphqlHTTP} = require("express-graphql")
// const app = express();
// const port = process.env.PORT || 3001;

// // connecting to database
// connectDB();

// app.use(cors({ origin: "*" }));

// app.get("/", (req, res) => {
//   res.send("APIs working properly");
// });

// app.use("/api/manager/", require("./routes/accountRoutes"));

// app.listen(port, () => console.log(`APIs listening on port ${port}!`));








// graphql and apollo-server-express

require("dotenv").config();
const {ApolloServer,gql} = require('apollo-server-express')
const cors = require("cors");
const connectDB = require("./config/db");
const typeDefs = require('./Graphql/typeDefs')
const resolvers = require('./Graphql/resolver')
const port = process.env.PORT || 3001;



async function startServer(){

  const app = express();
  

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

await apolloServer.start()

apolloServer.applyMiddleware({ app:app})



app.use((req,res)=>{
  res.send("APIs working properly")
})

connectDB(); 
app.use(cors({ origin: "*" }));



app.listen(port, () => console.log(`APIs listening on port ${port}!`));


}
startServer()
