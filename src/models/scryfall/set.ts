import { capitalize } from "../../utils"

export class Set {
  type: string
  releaseDate: string
  cardCount: number
  foil: boolean;
  [prop: string]: any

  constructor({
    set_type: type,
    released_at: releaseDate,
    card_count: cardCount,
    foil_only: foil,
    ...rest
  }: Record<any, any>) {
    this.type = type
      .split(`_`)
      .map((name: string) => capitalize(name))
      .join(``)

    this.releaseDate = releaseDate

    this.cardCount = cardCount

    this.foil = foil

    for (const [prop, value] of Object.entries(rest)) {
      this[prop] = value
    }
  }
}
