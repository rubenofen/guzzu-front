import { MkResponse, NftMinted } from '../model/types'
import { getApi, putApi } from './tools'

export const NftMintedAPI = {
  getByUser: async (): Promise<NftMinted[]> => getApi('/nft_minted/user'),
  getSoldNtfsByuser: async (): Promise<NftMinted[]> => getApi('/nft_minted/user/sold'),
  transfer: async (address: string): Promise<MkResponse> => putApi('/nft_minted/user/transfer', { address }),
}
