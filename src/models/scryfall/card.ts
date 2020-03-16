import { capitalize } from "../../utils"

export class Card {
  oracleId: string
  language: string
  identities: string[]
  handModifier: string
  layout: string
  legalities: {
    format: string
    legality: string
  }[]

  lifeModifier: string
  cost: string
  text: string
  type: string
  border: string
  number: string
  flavorText: string
  frame: string
  fullArt: string
  rarity: string
  printedName: string
  printedText: string
  printedType: string;
  [prop: string]: any

  constructor({
    oracle_id: oracleId,
    lang,
    color_identity: identities,
    hand_modifier: handModifier,
    layout,
    legalities,
    life_modifier: lifeModifier,
    mana_cost: cost,
    oracle_text: text,
    type_line: type,
    border_color: border,
    collector_number: number,
    flavor_text: flavorText,
    frame,
    full_art: fullArt,
    rarity,
    printed_name: printedName,
    printed_text: printedText,
    printed_type_line: printedType,
    ...rest
  }: Record<any, any>) {
    this.oracleId = oracleId
    this.language = lang
    this.identities = identities
    this.handModifier = handModifier
    this.layout = layout
      .split(`_`)
      .map((name: string) => capitalize(name))
      .join(``)

    this.legalities = Object.entries(legalities).map(([format, legality]) => {
      const key = format === `1v1` ? `CommanderVersus` : capitalize(format)
      const value =
        legality === `not_legal` ? `Illegal` : capitalize(legality as string)

      return { format: key, legality: value }
    })

    this.lifeModifier = lifeModifier
    this.cost = cost
    this.text = text
    this.type = type
    this.border = capitalize(border)
    this.number = number
    this.flavorText = flavorText

    const frames: Record<string, string> = {
      1993: `Original`,
      1997: `Classic`,
      2003: `Modern`,
      2015: `Holofoil`,
      future: `Future`
    }

    this.frame = frames[frame]
    this.fullArt = fullArt
    this.rarity = capitalize(rarity)
    this.printedName = printedName
    this.printedText = printedText
    this.printedType = printedType

    for (const [prop, value] of Object.entries(rest)) {
      this[prop] = value
    }
  }
}
