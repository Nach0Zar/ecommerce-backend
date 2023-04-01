const { controllerGraphQLGetAllProducts,
    controllerGraphQLGetProductByID,
    controllerGraphQLPostProduct,
    controllerGraphQLPutProductByID,
    controllerGraphQLDeleteProductByID
} = require('../controllers/controllerProductsGraphQL');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');


const schema = buildSchema(`

  input ProductInput {
    id: ID!
    title: String!
    price: Int!
    thumbnail: String!
  }

  type Product {
    id: ID!
    title: String!
    price: Int!
    thumbnail: String!
  }

  type Query {
    controllerGraphQLGetProductByID(id: ID!): Product
    controllerGraphQLGetAllProducts: [Product]
  }
  
  type Mutation {
    controllerGraphQLPostProduct(datos: ProductInput!): Product
    controllerGraphQLPutProductByID(id: ID!, datos: ProductInput!): Product
    controllerGraphQLDeleteProductByID(id: ID!): Product
  }
`)

const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: {
    controllerGraphQLGetAllProducts,
    controllerGraphQLGetProductByID,
    controllerGraphQLPostProduct,
    controllerGraphQLPutProductByID,
    controllerGraphQLDeleteProductByID
  },
  graphiql: true,
})

exports.graphqlMiddleware = graphqlMiddleware