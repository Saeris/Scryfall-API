import { Resolver } from "./types"

export const hasMore: Resolver = parent => parent.has_more

export const results: Resolver = parent => parent.data

export const totalCards: Resolver = parent => parent.total_cards
