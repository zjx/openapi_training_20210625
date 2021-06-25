const {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const {v4: uuidv4} = require('uuid')

//跨域组件
const cors = require('cors')

const app = express()
app.use(cors())

const articles = [
    {id: '1', title: 'article 1', body: 'article 1 body'},
    {id: '2', title: 'article 2', body: 'article 2 body'},
    {id: '3', title: 'article 3', body: 'article 3 body'},
    {id: '4', title: 'article 4', body: 'article 4 body'}
]

//GraphQLSchema的使用


//1.使用GraphQLSchema类构建一个schema
const ArticleSchema = new GraphQLObjectType({
    name: "Article",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        body: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tagList: {
            type: new GraphQLList(new GraphQLNonNull(GraphQLString))
        }
    }
});

const QuerySchema = new GraphQLObjectType({
    name: 'Query',
    fields: {
        articles: {
            type: new GraphQLList(ArticleSchema),
            async resolve(parent) {
                console.log(articles);
                return articles;
            }
        },
        article: {
            type: ArticleSchema,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, {id}) {
                console.log(articles);
                return articles.find(article => article.id === id);
            }
        },
    }
});

const ArticleInputSchema = new GraphQLInputObjectType({
    name: "ArticleInput",
    fields: {
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        body: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});

const MutationSchema = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createArticle: {
            type: ArticleSchema,
            args: {
                article: {type: new GraphQLNonNull(ArticleInputSchema)}
            },
            async resolve(parent, {article}) {
                console.log(article);
                article.id = uuidv4();
                articles.push(article);

                return article;
            }
        },
        updateArticle: {
            type: ArticleSchema,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                article: {type: new GraphQLNonNull(ArticleInputSchema)}
            },
            async resolve(parent, {id, article}) {
                console.log(id, article);
                const articleOld = articles.find(article => article.id === id);
                articleOld.title = article.title;
                articleOld.body = article.body;

                return articleOld;
            }
        },
        deleteArticle: {
            type: GraphQLBoolean,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, {id}) {
                console.log('id is ', id)
                const index = articles.findIndex(article => article.id === id);
                console.log(index);

                if(index>-1)
                    articles.splice(index, 1);

                return true;
            }
        }
    }
});


const Schema = new GraphQLSchema({
    query: QuerySchema,
    mutation: MutationSchema
})


//2.挂载GraphQL中间件
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true //开启浏览器GraphQL IDE调试工具
}))

//3.启动Web服务
app.listen(4000, () => {
    console.log('GraphQL Server is running at http://localhost:4000')
})
