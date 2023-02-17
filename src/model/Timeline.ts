import { Artist } from './Artist'
import { Nft } from './Nft'

export interface Timeline {
  artist: Artist
  urlSlug: string
  profilePicture: string
  moments: Array<Nft>
}
