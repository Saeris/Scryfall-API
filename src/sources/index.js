import { Images } from "./images"
import { Scryfall } from "./scryfall"

export default () => ({
  Images: new Images(),
  Scryfall: new Scryfall()
})
