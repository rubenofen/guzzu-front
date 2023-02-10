import { Collection } from './Collection'
import { NftMinted } from './types'
import { User } from './User'

export type Moment = {
  id: string
  slug: string
  packageImage: string
  displayImage: string
  images: Array<string>
  title: string
  description: string
  numberOfCopies: number
  priceEur: number
  date: string
  createdAt: string
  user: User
  nft_collection: Collection
  dropId?: string
  minteds?: NftMinted[]
  exclContent?: string
  launchDate?: string
  endDate?: string
  isComingSoon?: boolean
  featured?: boolean
  withCode?: boolean
}
