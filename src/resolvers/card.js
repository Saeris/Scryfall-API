export const set = ({ set: code }, _, { dataSources }) =>
  dataSources.Scryfall.setByCode({ code })

export const faces = parent => ({ card: parent, ...parent.card_faces })
