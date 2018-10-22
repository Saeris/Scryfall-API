export const card = (parent, { id }, { dataSources }) =>
  dataSources.Scryfall.cardById({ id })

export const set = (parent, { code }, { dataSources }) =>
  dataSources.Scryfall.setByCode({ code })

export const cards = (parent, args, { dataSources }) =>
  dataSources.Scryfall.cards()

export const sets = async (parent, { filter }, { dataSources }) => {
  const { data, ...results } = await dataSources.Scryfall.sets()
  const filtered = data.filter(({ type }) => {
    if (filter.types.include) {
      return filter.types.types.includes(type)
    } else {
      return !filter.types.types.includes(type)
    }
  })
  return { ...results, data: filtered }
}

export const searchCards = async (parent, { query, page }, { dataSources }) => {
  const operators = {
    gt: token => `${token}>`,
    lt: token => `${token}<`,
    gte: token => `${token}>=`,
    lte: token => `${token}<=`,
    eq: token => `${token}=`,
    noteq: token => `${token}!=`,
    not: token => `-${token}:`,
    is: token => `${token}:`
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

  const buildCompareToken = token => ({ comparison, ...term }) => {
    const value = Object.values(term)[0]
    return `${operators[comparison](token)}${
      Array.isArray(value) ? value.join(``) : value
    }`
  }

  const buildIncludeToken = token => ({
    include,
    combine,
    fullText,
    scope = fullText ? `ft` : token,
    ...term
  }) => {
    const value = Object.values(term)[0]
    const result = val => `${include ? `` : `-`}${scope}:${val}`
    return Array.isArray(value)
      ? value.map(result).join(combine ? ` ` : ` or `)
      : result(value)
  }

  const q = Object.entries(query)
    .reduce((q, [token, terms]) => {
      const concatTokens = token => (q ? `${q} ${token}` : token)

      if (typeof terms === `boolean`) {
        return concatTokens(
          `${terms && token !== `extras` ? `` : `-`}${tokens[token]}:${token}`
        )
      }

      if (terms[0].comparison) {
        return concatTokens(
          terms.map(buildCompareToken(tokens[token] || token)).join(` `)
        )
      }

      if (terms[0].include) {
        return concatTokens(
          `(${terms.map(buildIncludeToken(tokens[token] || token))})`
        )
      }

      return q
    }, ``)
    .toLowerCase()
  console.log(q)
  const results = await dataSources.Scryfall.searchCards({ q, page })
  return { page, ...results }
}
