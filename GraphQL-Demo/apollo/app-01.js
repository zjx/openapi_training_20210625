const { ApolloServer, gql } = require('apollo-server');

// 1.定义schema
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

// 2.定义resolver
const resolvers = {
    // 所有Query都走这里
    Query: {
        books: () => books,
    },
};

// 3.使用ApolloServer创建Web Server，端口默认4000
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});


