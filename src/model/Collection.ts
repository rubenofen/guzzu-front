import { Contract } from './Contract'
import { Nft } from './Nft'
import { User } from './User'

export type Collection = {
  id: string
  user?: User
  name: string
  displayImage: string
  description: string
  nfts: Nft[]
  date: string
  contract: Contract
  slug: string
}
