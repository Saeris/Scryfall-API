import { ApolloServer } from "apollo-server-lambda"
import { APIGatewayEvent, Context as LambdaContext } from "aws-lambda"
import schema from "./schema"
import dataSources from "./sources"
import { defaultQuery } from "./defaultQuery"

export interface Context {
  headers: APIGatewayEvent["headers"]
  functionName: LambdaContext["functionName"]
  event: APIGatewayEvent
  context: LambdaContext
}

const isDev = process.env.stage === `dev` || !!process.env.OFFLINE;
export const server = new ApolloServer({
  schema,
  context: ({
    event,
    context
  }: {
    event: APIGatewayEvent
    context: LambdaContext
  }): Context => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  dataSources,
  tracing: true,
  formatError: err => {
    // eslint-disable-next-line no-console
    console.error(err)
    return err
  },
  introspection: isDev,
  playground: isDev
    ? {
        settings: {
          // @ts-ignore
          "schema.polling.interval": 10000
        },
        tabs: [
          {
            endpoint: `${
              process.env.OFFLINE ? `http://localhost:1337/` : process.env.URL
            }${
              process.env.NETLIFY
                ? `.netlify/functions/scryfall-api/`
                : `dev`
            }`,
            query: defaultQuery,
            name: `fetchPopular`,
            variables: `{ "page": 1 }`
          }
        ]
      }
    : false
})
