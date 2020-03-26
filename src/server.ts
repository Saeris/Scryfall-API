import { ApolloServer } from "apollo-server-lambda"
import { APIGatewayEvent, Context as LambdaContext } from "aws-lambda"
import schema from "./schema"
import dataSources from "./sources"
import { playground } from "./playground"

export interface Context {
  headers: APIGatewayEvent["headers"]
  functionName: LambdaContext["functionName"]
  event: APIGatewayEvent
  context: LambdaContext
}

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
  introspection: true,
  playground
})
