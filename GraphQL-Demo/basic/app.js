const {graphql, buildSchema} = require('graphql')

//1.使用GraphQL Schema语法构建一个schema
const schema = buildSchema(`
    type Query{
        foo: String
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

//3.查询
graphql(schema, '{foo,count}', root).then(res => {
    console.log(res)
})
