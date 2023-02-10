import { User } from '../model/User'
import { getApi, postApi, putApi } from './tools'

const UserAPI = {
  fetchAll: async (): Promise<User[]> => getApi('/user'),
  fetchById: async (id: string): Promise<User> => getApi(`/user/${id}`),
  create: async (userData: {
    name: string
    username: string
    email: string
    role: string
    bio: string
    profilePicture: string
    showcasePicture: string
  }): Promise<User> => postApi('/user', userData),
  update: async (
    id: string,
    userData: {
      name: string
      username: string
      email: string
      role: string
      bio: string
      profilePicture: string
      showcasePicture: string
    }
  ): Promise<User> => putApi(`/user/${id}`, userData),
  fetchAllArtists: async (): Promise<User[]> => getApi('/user/artists'),
  changeRole: async (userId: string, newRole: string): Promise<string> => putApi('/user/role', { userId, newRole }),
  registerWithMetamask: async (walletId: string): Promise<string> => {
    const response = await postApi('/user/register/metamask', {
      wallet_id: walletId
    })
    // handle errors
    return response.token
  },
  registerWithMagicLink: async (
    name: string,
    username: string,
    did: string | null
  ): Promise<{ token: string; user: User }> => {
    const response = await postApi('/user/register/magiclink', { name, username, did })
    return response
  },
  loginWithMagicLink: async (did: string | null): Promise<{ token: string; user: User }> => {
    const response = await postApi('/user/login/magiclink', { did })
    return response
  },
  checkEmail: async (email: string): Promise<{ result: string }> => {
    let response = { result: 'ko' }
    try {
      response = await getApi(`/user/email/${email}`)
    } catch (error) {
      console.log('Controlled error: ', error)
    }
    return response
  },
  checkUserName: async (username: string): Promise<{ result: boolean }> => {
    return getApi(`/user/check-username/${username}`)
  },
  fetchUserByUserName: async (username: string): Promise<User> => {
    return getApi(`/user/username/${username}`)
  },
  me: async (): Promise<User> => {
    return getApi('/user/me')
  },
  updateBasicInfo: async (
    email: string,
    username: string,
    name: string,
    profilePicture?: string,
    bio?: string,
    showcasePicture?: string
  ): Promise<User> => {
    return postApi('/user/update', {
      email,
      username,
      profilePicture,
      name,
      bio,
      showcasePicture
    })
  },
  updateArtistInfo: async (
    displayName?: string,
    showcasePicture?: string,
    bio?: string,
    country?: string,
    urlSlug?: string
  ): Promise<User> => {
    return putApi('/user/artist/update', {
      displayName,
      showcasePicture,
      bio,
      country,
      urlSlug
    })
  },
  updateMetamaskWalletId: async (walletId: string): Promise<User> => {
    return putApi('/user/metamask/walletId', {
      walletId
    })
  },
  suscribeNewsletter: (email: string): Promise<any> => {
    const result = postApi('/subscribe', {
      email
    })
    getApi(`/send-promotional-codes?email=${email}`)
    return result
  }
}

export default UserAPI
