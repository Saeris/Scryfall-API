export const parentSet = ({ parent_set_code: code }, _, { dataSources }) =>
  dataSources.Scryfall.setByCode({ code })

export const cards = ({ code }, { page }, { dataSources }) =>
  dataSources.Scryfall.cardsBySet({ code, page })
