export const cardByID = `query cardByID($id: ID!) {
  card(id: $id) {
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
