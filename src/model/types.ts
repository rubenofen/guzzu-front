import { Nft } from './Nft'
import { User } from './User'

export type NftMintedMedia = {
  createdAt: string
  fileUrl: string
  mimetype: string
  name: string
  path: string
  projectId: string
  size: string
  url: string
  _id: string
}

export type NftMinted = {
  owner: User
  issuer: User
  nft: Nft
  contractId: string
  createdAt: string
  dropId: string
  lastLockAt: string
  media: NftMintedMedia
  mediaId: string
  metadata: string
  name: string
  state: string
  tokenId: number
  updatedAt: string
  uri: string
  _id: string
  isLockedBySignature: boolean
  lastLockBySignatureAt: string
  addressOfLastLock: string
}

export type MkResponse = {
  code?: number
  error?: string
  success: boolean
  type?: string
  retry?: any
  nft?: NftMinted
  data?: any
}
