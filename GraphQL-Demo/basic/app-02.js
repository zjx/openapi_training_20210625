const { buildSchema } = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql');

const app = express()

app.all("*", function (req, res, next) {
    // 设置请求头为允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 设置服务器支持的所有头信息字段
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken"
    );
    // 设置服务器支持的所有跨域请求的方法
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    if (req.method.toLowerCase() == "options") {
        res.send(200); // 让options尝试请求快速结束
    } else {
        next();
    }
});

//1.使用GraphQL Schema语法构建一个schema
const schema = buildSchema(`
    type Query{
        foo: String,
        count: Int
    }
`)

//2.定义schema的resolver
const root = {
    foo() {
        return 'bar'
    },
    count() {
        return 123;
    }
}

//3.挂载GraphQL中间件
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true //开启浏览器GraphQL IDE调试工具
}))

//4.启动Web服务
app.listen(4000, () => {
    console.log('GraphQL Server is running at http://localhost:4000')
})
