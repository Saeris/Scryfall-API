import { Resolver } from "./types"

export const card: Resolver = (_, { id }, { dataSources }) =>
  dataSources.Scryfall.cardById({ id })

export const set: Resolver = (_, { code }, { dataSources }) =>
  dataSources.Scryfall.setByCode({ code })

export const cards: Resolver = (_, __, { dataSources }) =>
  dataSources.Scryfall.cards()

export const sets: Resolver = async (_, { filter }, { dataSources }) => {
  const { data, ...results } = await dataSources.Scryfall.sets()
  return {
    ...results,
    data: filter
      ? data.filter(({ type }: { type: string }) =>
          filter.types.include
            ? filter.types.types.includes(type)
            : !filter.types.types.includes(type)
        )
      : data
  }
}

export const searchCards: Resolver = async (
  _,
  { query, page },
  { dataSources }
) => {
  const operators = {
    gt: (token: string) => `${token}>`,
    lt: (token: string) => `${token}<`,
    gte: (token: string) => `${token}>=`,
    lte: (token: string) => `${token}<=`,
    eq: (token: string) => `${token}=`,
    noteq: (token: string) => `${token}!=`,
    not: (token: string) => `-${token}:`,
    is: (token: string) => `${token}:`
  }

  const tokens = {
    supertype: `type`,
    subtype: `type`,
    text: `oracle`,
    fullText: `ft`,
    totalPT: `pt`,
    multifaced: `is`,
    spell: `is`,
    permanent: `is`,
    historic: `is`,
    vanilla: `is`,
    extras: `include`,
    flavorText: `flavor`,
    releaseDate: `date`
  }

  const buildCompareToken = (token: string) => ({
    comparison,
    ...term
  }: {
    comparison: keyof typeof operators
  }) => {
    const value = Object.values(term)[0]
    return `${operators[comparison](token)}${
      Array.isArray(value) ? value.join(``) : value
    }`
  }

  const buildIncludeToken = (token: string) => ({
    include,
    combine,
    fullText,
    scope = fullText ? `ft` : token,
    ...term
  }: {
    include: boolean
    combine: boolean
    fullText: string
    scope: string
  }) => {
    const value = Object.values(term)[0]
    const result = (val: string) => `${include ? `` : `-`}${scope}:${val}`
    return Array.isArray(value)
      ? value.map(result).join(combine ? ` ` : ` or `)
      : result(value)
  }

  const q: string = Object.entries(query)
    .reduce((qs, [token, terms]) => {
      const concatTokens = (t: string) => (qs ? `${q} ${t}` : t)

      if (typeof terms === `boolean`) {
        return concatTokens(
          `${terms && token !== `extras` ? `` : `-`}${
            tokens[token as keyof typeof tokens]
          }:${token}`
        )
      }

      if (
        (terms as { comparison: boolean; include: boolean }[])[0].comparison
      ) {
        return concatTokens(
          (terms as any[])
            .map(
              buildCompareToken(tokens[token as keyof typeof tokens] || token)
            )
            .join(` `)
        )
      }

      if ((terms as { comparison: boolean; include: boolean }[])[0].include) {
        return concatTokens(
          `(${(terms as any[]).map(
            buildIncludeToken(tokens[token as keyof typeof tokens] || token)
          )})`
        )
      }

      return qs
    }, ``)
    .toLowerCase()
  // eslint-disable-next-line no-console
  console.log(q)
  const results = await dataSources.Scryfall.searchCards({ q, page })
  return { page, ...results }
}
