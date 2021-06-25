const express = require('express');
const graphql = require('graphql');
const grapqlHTTP = require('express-graphql');
// 定义schema，查询和类型
// const schema = buildSchema(`
//     type Account {
//         name: String
//         age: Int
//         sex: String
//         department: String
//     }
//     type Query {
//         account(username: String): Account
//     }
// `)

// // 定义查询对应的处理器
// const root = {
//     account({ username }) {
//         const name = username;
//         const sex = 'man';
//         const age = 18;
//         const department = '开发部';
//         return {
//             name,
//             sex,
//             age,
//             department
//         }
//     }
// }

var AccountType = new graphql.GraphQLObjectType({
    name: 'Account',
    fields: {
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        sex: { type: graphql.GraphQLString },
        department: { type: graphql.GraphQLString }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        account: {
            type: AccountType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                username: { type: graphql.GraphQLString }
            },
            resolve: function (_, { username }) {
                const name = username;
                const sex = 'man';
                const age = 18;
                const department = '开发部';
                return {
                    name,
                    sex,
                    age,
                    department
                }
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({ query: queryType });

const app = express();

app.use('/graphql', grapqlHTTP({
    schema: schema,
    graphiql: true
}))

// 公开文件夹，供用户访问静态资源
app.use(express.static('public'))

app.listen(3000);