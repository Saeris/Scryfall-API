import { Config } from "apollo-server-core"
import { cardByID } from "./cardByID"

const isDev = !!process.env.OFFLINE

const endpoint = `${
  process.env.OFFLINE ? `http://localhost:1337/` : process.env.URL
}${process.env.NETLIFY ? `.netlify/functions/scryfall-api/` : `dev`}`

export const playground: Config["playground"] = {
  settings: {
    // @ts-ignore
    "schema.polling.enable": isDev,
    // @ts-ignore
    "schema.polling.interval": 15000
  },
  tabs: [
    {
      endpoint,
      query: cardByID,
      name: `cardByID`,
      variables: `{ "id": "f0bb1a5c-0f59-4951-827f-fe9df968232d" }`
    }
  ]
}
