import { Magic } from 'magic-sdk'
import API from 'src/api'
import { getApi, updateApiToken } from 'src/api/tools'
import { useSWRConfig } from 'swr'
import useSWRImmutable from 'swr/immutable'

const getFetcher = (url: string) => getApi(url)

export const useUser = () => {
  const { data, error, isLoading } = useSWRImmutable(`/user/me`, getFetcher, {})
  const { mutate } = useSWRConfig()

  const revalidateUser = () => {
    mutate('/user/me')
  }

  const loginWithMagicLink = async (email: string) => {
    const { result } = await API.user.checkEmail(email)
    if (result === 'ok') {
      const did = await new Magic('pk_live_A0F5E1B7E6E38C80').auth.loginWithMagicLink({ email })
      const { token, user } = await API.user.loginWithMagicLink(did)
      updateApiToken(token)
      return { type: 'initialize', payload: user }
    } else {
      throw new Error('User not found')
    }
  }

  return {
    user: data,
    isLoading,
    isError: error,
    loginWithMagicLink,
    revalidateUser
  }
}
