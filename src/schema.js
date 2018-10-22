import { makeExecutableSchema } from "graphql-tools"
import {
  GraphQLDateDirective,
  GraphQLNumberDirective,
  GraphQLCurrencyDirective,
  GraphQLLowerCaseDirective,
  GraphQLUpperCaseDirective,
  GraphQLCamelCaseDirective,
  GraphQLStartCaseDirective,
  GraphQLCapitalizeDirective,
  GraphQLKebabCaseDirective,
  GraphQLTrimDirective,
  GraphQLDefaultToDirective,
  GraphQLToLowerDirective,
  GraphQLToUpperDirective,
  GraphQLTemplateDirective,
  applySchemaCustomDirectives
} from "graphql-custom-directives"
import CustomScalars from "@saeris/graphql-scalars"
import * as types from "./types"
import * as enums from "./types/enums"
import * as inputs from "./types/inputs"
//import * as interfaces from "./types/interfaces"
import * as unions from "./types/unions"
import * as resolvers from "./resolvers"

export const schema = makeExecutableSchema({
  typeDefs: [
    ...Object.values(types),
    ...Object.values(enums),
    ...Object.values(inputs),
    ...Object.values(unions),
    ...CustomScalars.keys()
  ],
  resolvers: {
    ...CustomScalars.values(),
    ...resolvers
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  inheritResolversFromInterfaces: true
})

const directives = [
  GraphQLDateDirective,
  GraphQLNumberDirective,
  GraphQLCurrencyDirective,
  GraphQLLowerCaseDirective,
  GraphQLUpperCaseDirective,
  GraphQLCamelCaseDirective,
  GraphQLStartCaseDirective,
  GraphQLCapitalizeDirective,
  GraphQLKebabCaseDirective,
  GraphQLTrimDirective,
  GraphQLDefaultToDirective,
  GraphQLToLowerDirective,
  GraphQLToUpperDirective,
  GraphQLTemplateDirective
]

schema._directives.push(...directives)
applySchemaCustomDirectives(schema)

export default schema
