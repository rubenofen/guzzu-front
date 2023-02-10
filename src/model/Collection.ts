import { Contract } from './Contract'
import { Moment } from './Moment'
import { User } from './User'

export type Collection = {
  id: string
  user?: User
  name: string
  displayImage: string
  description: string
  nfts: Moment[]
  date: string
  contract: Contract
  slug: string
}
