import { ApolloServer } from "apollo-server-lambda"
import schema from "./schema"
import dataSources from "./sources"
import "./logger"

const defaultQuery = `
  query cardById {
    card(id: "f0bb1a5c-0f59-4951-827f-fe9df968232d") {
      name
      text
      cmc
      cost
      colors
      identities
      flavorText
      type
      set {
        code
        name
        cardCount
        cards {
          page
          hasMore
          results {
            ... on Card {
              name
            }
          }
        }
      }
    }
  }
`

const server = new ApolloServer({
  schema,
  dataSources
})

export const graphqlHandler = server.createHandler()
