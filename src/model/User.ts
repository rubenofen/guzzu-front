export interface User {
  id: string
  email?: string
  metamaskWalletId?: string
  walletId?: string
  walletDiggestedId?: string
  role: string
  username?: string
  name?: string
  country?: string
  gender?: string
  profilePicture?: string
  cardBrand?: string
  cardLast4?: string
  nfts?: Array<string>
  transactions?: Array<string>
  balanceEuro: number
  bio: string
  showcasePicture?: string
}
