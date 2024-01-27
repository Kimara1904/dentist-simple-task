import axios, { AxiosResponse } from 'axios'

import { baseUrl } from './ServiceConfig'
import { Token } from '../model/TokenMoldels'

const url = `${baseUrl}/api/identification`

export const Identify = async (request: string): Promise<AxiosResponse<Token>> => {
  return await axios.get<Token>(`${url}/identify/${request}`)
}
