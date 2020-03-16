import { Resolver } from "./types"

export const flavorText: Resolver = parent => parent.flavor_text

export const cost: Resolver = parent => parent.mana_cost

export const text: Resolver = parent => parent.oracle_text

export const type: Resolver = parent => parent.type_line

export const printedName: Resolver = parent => parent.printed_name

export const printedText: Resolver = parent => parent.printed_text

export const printedType: Resolver = parent => parent.printed_type_line
