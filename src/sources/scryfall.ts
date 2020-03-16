import { RESTDataSource } from "apollo-datasource-rest"
import { ScryfallModels } from "../models"

export class Scryfall extends RESTDataSource {
  baseURL = `https://api.scryfall.com/`

  cardById = async ({ id, ...params }: { id: string }) => {
    const card = await this.get(`cards/${id}`, { ...params })
    return new ScryfallModels.Card(card)
  }

  cards = async ({ page = 1, ...params }) => {
    const { data, ...rest } = await this.get(`cards`, { page, ...params })

    return {
      page,
      ...rest,
      data: data.map(
        (card: ConstructorParameters<typeof ScryfallModels.Card>) =>
          new ScryfallModels.Card(card)
      )
    }
  }

  cardsBySet = async ({
    code,
    page = 1,
    ...params
  }: {
    code: string
    page: number
  }) => {
    const { data, ...rest } = await this.get(`cards/search`, {
      q: `set:${code}`,
      page,
      ...params
    })

    return {
      page,
      ...rest,
      data: data.map(
        (card: ConstructorParameters<typeof ScryfallModels.Card>) =>
          new ScryfallModels.Card(card)
      )
    }
  }

  setByCode = async ({ code, ...params }: { code: string }) => {
    const set = await this.get(`sets/${code}`, { ...params })
    return new ScryfallModels.Set(set)
  }

  sets = async (params = {}) => {
    const { data, ...rest } = await this.get(`sets`, params)
    return {
      ...rest,
      data: data.map(
        (set: ConstructorParameters<typeof ScryfallModels.Set>) =>
          new ScryfallModels.Set(set)
      )
    }
  }

  rulings = ({ id, ...params }: { id: string }) =>
    this.get(`cards/${id}/rulings`, { ...params })

  searchCards = async ({
    q,
    page = 1,
    ...params
  }: {
    q: string
    page: number
  }) => {
    const { data, ...rest } = await this.get(`cards/search`, {
      q,
      page,
      ...params
    })

    return {
      page,
      ...rest,
      data: data.map(
        (card: ConstructorParameters<typeof ScryfallModels.Card>) =>
          new ScryfallModels.Card(card)
      )
    }
  }
}
