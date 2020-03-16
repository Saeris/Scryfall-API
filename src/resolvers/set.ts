import { Resolver } from "./types"

export const parentSet: Resolver = ({ parent_set_code: code }, _, { dataSources }) =>
  dataSources.Scryfall.setByCode({ code })

export const cards: Resolver = ({ code }: { code: string; }, { page }: { page: number; }, { dataSources }) =>
  dataSources.Scryfall.cardsBySet({ code, page })
