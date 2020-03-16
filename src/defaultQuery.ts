export const defaultQuery = `query cardById {
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
}`
