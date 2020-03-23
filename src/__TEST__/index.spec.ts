import { handler } from "../../lambda/scryfall-api"

describe(`handler`, () => {
  it(`should be a function`, () => {
    expect(typeof handler).toBe(`function`)
  })
})
