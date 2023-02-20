import { Nft } from '../model/Nft'
import { MkResponse, NftMinted } from '../model/types'
import { User } from '../model/User'
import { getApi, postApi, putApi } from './tools'

const NftApi = {
  createPresignedUrlForImage: (fileType: string, fileExtension: string) => {
    return postApi('/moments/create/files/presign-uplaod', {
      fileType,
      fileExtension
    })
  },
  fetch: async (id: string): Promise<Nft> => {
    return getApi(`/moments/fetch/${id}`)
  },
  fetchAll: async (): Promise<Nft[]> => getApi('/drop'),
  fetchAllSlugs: async (): Promise<string[]> => getApi('/drop/slugs'),
  fetchBySlug: async (slug?: string): Promise<Nft> => {
    return getApi(`/moments/fetch/slug/${slug}`)
  },
  create: async (dropData: {
    packageImage?: string
    displayImage?: string
    title: string
    description: string
    numberOfCopies: number
    priceEur: number
    date: string
    nft_collection?: string
    isComingSoon: boolean
    launchDate: string
    dropId: string
    slug: string
  }): Promise<Nft> => {
    return postApi('/moments', dropData)
  },
  update: async (
    id: string,
    dropData: {
      packageImage?: string
      displayImage?: string
      title: string
      description: string
      numberOfCopies: number
      priceEur: number
      date: string
      isComingSoon: boolean
      launchDate: string
      dropId: string
      slug: string
    }
  ): Promise<Nft> => {
    return putApi(`/moments/${id}`, dropData)
  },
  buyNft: async (id: string, pi: string | null = null): Promise<User | any> => {
    let url = `/moments/buy/${id}`
    if (pi) {
      url += `?pi=${pi}`
    }
    return getApi(url)
  },
  fetchLatest: async (): Promise<Array<Nft>> => {
    return getApi('/moments/latest')
  },
  fetchMomentsByUserId: (userId: string): Promise<Array<Nft>> => getApi(`/moments/user/${userId}`),
  mintNftFromDrop: async (
    dropId: string,
    data: { dropCod: string; email: string; name: string; nftId: string }
  ): Promise<MkResponse> => postApi(`/drop/mint/${dropId}`, data),
  lockNftFromDrop: async (
    dropId: string,
    data: { dropCod: string; email: string; name: string; nftId: string }
  ): Promise<MkResponse> => postApi(`/drop/lock/${dropId}`, data),
  mintNftFromLockedNft: async (data: {
    dropCod: string
    email: string
    name: string
    lockedNft: NftMinted
    issuerId: string
    momentId: string
  }): Promise<MkResponse> => postApi('/drop/lockednft/mint', data),
  fetchFeaturedDrop: async (): Promise<Nft> => getApi('/drop/featured')
}

export default NftApi
