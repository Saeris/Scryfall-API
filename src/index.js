import { ApolloServer } from "apollo-server-lambda"
import { error } from "winston"
import schema from "./schema"
import dataSources from "./sources"
import { defaultQuery } from "./defaultQuery"
import "./logger"

const isDev = process.env.stage === `dev`
const server = new ApolloServer({
  schema,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  dataSources,
  tracing: true,
  formatError: err => {
    error(err)
    return err
  },
  introspection: isDev,
  playground: isDev ? { tabs: [{ endpoint: `http://localhost:1337/`, query: defaultQuery, name: `cardById` }] } : false
})

export const graphqlHandler = server.createHandler({
  cors: {
    origin: `*`,
    credentials: true
  }
})
