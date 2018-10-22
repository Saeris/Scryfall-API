import { capitalize } from "../../utils"

export class Card {
  constructor({
    oracle_id,
    lang,
    color_identity,
    hand_modifier,
    layout,
    legalities,
    life_modifier,
    mana_cost,
    oracle_text,
    type_line,
    border_color,
    collector_number,
    flavor_text,
    frame,
    full_art,
    rarity,
    printed_name,
    printed_text,
    printed_type_line,
    ...rest
  }) {
    this.oracleId = oracle_id
    this.language = lang
    this.identities = color_identity
    this.handModifier = hand_modifier
    this.layout = layout
      .split(`_`)
      .map(name => capitalize(name))
      .join(``)

    this.legalities = Object.entries(legalities).map(([format, legality]) => {
      const key = format === `1v1` ? `CommanderVersus` : capitalize(format)
      const value = legality === `not_legal` ? `Illegal` : capitalize(legality)

      return { format: key, legality: value }
    })

    this.lifeModifier = life_modifier
    this.cost = mana_cost
    this.text = oracle_text
    this.type = type_line
    this.border = capitalize(border_color)
    this.number = collector_number
    this.flavorText = flavor_text

    const frames = {
      "1993": `Original`,
      "1997": `Classic`,
      "2003": `Modern`,
      "2015": `Holofoil`,
      future: `Future`
    }

    this.frame = frames[frame]
    this.fullArt = full_art
    this.rarity = capitalize(rarity)
    this.printedName = printed_name
    this.printedText = printed_text
    this.printedType = printed_type_line

    for (const [prop, value] of Object.entries(rest)) {
      this[prop] = value
    }
  }
}
