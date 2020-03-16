import { KeyValueCache } from "apollo-server-caching"

const defaultStore = new Map()

export const cache = async (
  key: string,
  value: any,
  store: KeyValueCache | Map<any, any> = defaultStore
) => {
  if (store.get(key)) {
    return store.get(key)
  }
  await store.set(key, typeof value === `function` ? value() : value)
  return store.get(key)
}

export const memoize = <T extends Function>(
  fn: T,
  store: KeyValueCache | Map<any, any> = new Map()
) => (...args: any[]) => cache(JSON.stringify(args), () => fn(...args), store)
