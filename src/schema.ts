import { makeExecutableSchema, IResolvers } from "graphql-tools"
import { Numbers, Dates, Strings } from "@saeris/graphql-directives";
import { DateTimeScalar, DateTime, URLScalar, URL } from "@saeris/graphql-scalars"
import * as types from "./types"
import * as enums from "./types/enums"
import * as inputs from "./types/inputs"
//import * as interfaces from "./types/interfaces"
import * as unions from "./types/unions"
import resolvers from "./resolvers"

const schemaDirectives = {
  ...Numbers,
  ...Dates,
  ...Strings
};

const directives = Object.values(schemaDirectives).map(directive =>
  directive.declaration()
);

export const schema = makeExecutableSchema({
  typeDefs: [
    ...Object.values(types),
    ...Object.values(enums),
    ...Object.values(inputs),
    ...Object.values(unions),
    DateTimeScalar,
    URLScalar,
    ...directives
  ],
  schemaDirectives,
  resolvers: {
    DateTime,
    URL,
    ...(resolvers as IResolvers<any, any>)
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  inheritResolversFromInterfaces: true
})

export default schema
