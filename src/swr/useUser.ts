import { getApi } from 'src/api/tools'
import useSWRImmutable from 'swr/immutable'

const fetcher = (url: string) => getApi(url)

export const useUser = () => {
  const { data, error, isLoading } = useSWRImmutable(`/user/me`, fetcher, {})

  return {
    user: data,
    isLoading,
    isError: error
  }
}
