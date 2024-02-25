import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import {ApolloServer} from '@apollo/server';
import bodyParser from 'body-parser';
import cors from 'cors'; 

const app = express();
const server = new ApolloServer({
    typeDefs : `
        type Todo {
            id : ID!
            title : String
            completed : Boolean
        }
        type Query {
            getTodos : [Todo]
        }
    `,
    resolvers : {
        Query : {
            getTodos : () => [{id : 1, title : "Ryan Rego", completed : true}]
        }
    },
});

app.use(bodyParser.json());
app.use(cors());

await server.start();
app.use('/graphql', expressMiddleware(server));

app.listen(8000, () => console.log("Server listening on PORT 8000"));   

