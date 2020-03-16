module.exports = {
  displayName: `scryfall-api`,
  coverageDirectory: `./coverage/`,
  collectCoverage: true,
  transform: {
    "\\.(gql|graphql)$": `jest-transform-graphql`,
    "^.+\\.(js|ts)$": `babel-jest`
  },
  verbose: true
}
