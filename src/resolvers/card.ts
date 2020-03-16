import { Resolver } from "./types"

export const set: Resolver = ({ set: code }, _, { dataSources }) =>
  dataSources.Scryfall.setByCode({ code })

export const faces: Resolver = parent => ({ card: parent, ...parent.card_faces })
