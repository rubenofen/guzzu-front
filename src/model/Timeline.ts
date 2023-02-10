import { Artist } from './Artist'
import { Moment } from './Moment'

export interface Timeline {
  artist: Artist
  urlSlug: string
  profilePicture: string
  moments: Array<Moment>
}
