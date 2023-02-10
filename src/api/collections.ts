import { Collection } from '../model/Collection'
import { getApi, postApi, putApi } from './tools'

export const collectionsApi = {
  fetchAll: (): Promise<Collection[]> => getApi('/collection'),
  fetchLatest: (total?: number): Promise<Collection[]> => getApi(`/collection/latest?total=${total}`),
  fetchCollectionById: (collectionId?: string): Promise<Collection> => getApi(`/collection/${collectionId}`),
  fetchCollectionBySlug: (slug?: string): Promise<Collection> => getApi(`/collection/slug/${slug}`),
  fecthCollectionsByUser: (): Promise<Collection[]> => getApi('/collection/user'),
  fetchCollectionByUserSlug: (slug: string): Promise<Collection[]> => getApi(`/collection/user-slug/${slug}`),
  createCollection: (collectionData: {
    userId?: string
    name: string
    description: string
    date: string
    slug: string
    displayImage?: string
  }): Promise<Collection> => postApi('/collection', collectionData),
  updateCollection: (
    collectionId: string,
    collectionData: { name: string; description: string; date: string; slug: string; displayImage?: string }
  ): Promise<Collection> => putApi(`/collection/${collectionId}`, collectionData),
}
