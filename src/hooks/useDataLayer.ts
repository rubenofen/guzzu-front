import TagManager, { DataLayerArgs } from 'react-gtm-module'

import { Collection } from '../model/Collection'
import { Moment } from '../model/Moment'
import { Timeline } from '../model/Timeline'
import { User } from '../model/User'

export const useDataLayer = (): {
  pushMomentImpressions: (moments: Moment[]) => void
  pushCollectionImpressions: (collections: Collection[]) => void
  pushTimelineImpressions: (timeline: Timeline[]) => void
  pushCollectionClick: (collection: Collection) => void
  pushMomentClick: (moment: Moment) => void
  pushTimelineClick: (timelineItem: Timeline) => void
  pushMomentDetailView: (moment: Moment) => void
  pushCollectionDetailView: (collection: Collection) => void
  pushTimelineDetailView: (user: User) => void
  pushAddToCart: (moment: Moment) => void
  pushCheckout: (moments: Moment[], option: string) => void
  pushPurchase: (moments: Moment[], transactionId: string) => void
} => {
  const resetDatalayerEcommerce = (): void => {
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        ecommerce: null,
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }
  const pushMomentImpressions = (moments: Moment[]): void => {
    if (moments?.length > 0) {
      resetDatalayerEcommerce()
      const tagManagerArgs: DataLayerArgs = {
        dataLayer: {
          ecommerce: {
            impressions: moments.map((moment, index) => ({
              name: moment.title,
              id: moment.id,
              price: moment.priceEur,
              brand: moment.user.name,
              category: `${moment.user.name}/${moment.nft_collection.name}`,
              list: 'product',
              position: index,
            })),
          },
        },
      }
      TagManager.dataLayer(tagManagerArgs)
    }
  }

  const pushCollectionImpressions = (collections: Collection[]): void => {
    if (collections?.length > 0) {
      resetDatalayerEcommerce()
      const tagManagerArgs: DataLayerArgs = {
        dataLayer: {
          ecommerce: {
            impressions: collections.map((collection, index) => ({
              name: collection.name,
              id: collection.id,
              brand: collection.user.name,
              category: `${collection.user.name}`,
              list: 'collection',
              position: index,
            })),
          },
        },
      }
      TagManager.dataLayer(tagManagerArgs)
    }
  }

  const pushTimelineImpressions = (timeline: Timeline[]): void => {
    if (timeline?.length > 0) {
      resetDatalayerEcommerce()
      const tagManagerArgs: DataLayerArgs = {
        dataLayer: {
          ecommerce: {
            impressions: timeline.map((timelineItem, index) => ({
              name: timelineItem.artist.displayName,
              id: timelineItem.urlSlug,
              brand: timelineItem.artist.displayName,
              category: `Timeline/${timelineItem.artist.displayName}`,
              list: 'timeline',
              position: index,
            })),
          },
        },
      }
      TagManager.dataLayer(tagManagerArgs)
    }
  }

  const pushCollectionClick = (collection: Collection): void => {
    resetDatalayerEcommerce()
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        event: 'collectionClick',
        ecommerce: {
          click: {
            actionField: { list: 'collection' },
            products: [
              {
                name: collection.name,
                id: collection.id,
                brand: collection.user.name,
                category: `${collection.user.name}`,
              },
            ],
          },
        },
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }

  const pushMomentClick = (moment: Moment): void => {
    resetDatalayerEcommerce()
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        event: 'nftClick',
        ecommerce: {
          click: {
            actionField: { list: 'product' },
            products: [
              {
                name: moment.title,
                id: moment.id,
                price: moment.priceEur,
                brand: moment.user.name,
                category: `${moment.user.name}/${moment.nft_collection.name}`,
              },
            ],
          },
        },
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }

  const pushTimelineClick = (timelineItem: Timeline): void => {
    resetDatalayerEcommerce()
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        event: 'timelineClick',
        ecommerce: {
          click: {
            actionField: { list: 'timeline' },
            products: [
              {
                name: timelineItem.artist.displayName,
                id: timelineItem.urlSlug,
                brand: timelineItem.artist.displayName,
                category: `Timeline/${timelineItem.artist.displayName}`,
              },
            ],
          },
        },
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }

  const pushMomentDetailView = (moment: Moment): void => {
    resetDatalayerEcommerce()
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        event: 'nftDetailView',
        ecommerce: {
          detail: {
            actionField: { list: 'product' },
            products: [
              {
                name: moment.title,
                id: moment.id,
                price: moment.priceEur,
                brand: moment.user.name,
                category: `${moment.user.name}/${moment.nft_collection.name}`,
              },
            ],
          },
        },
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }

  const pushCollectionDetailView = (collection: Collection): void => {
    resetDatalayerEcommerce()
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        event: 'collectionDetailView',
        ecommerce: {
          detail: {
            actionField: { list: 'collection' },
            products: [
              {
                name: collection.name,
                id: collection.id,
                brand: collection.user.name,
                category: `${collection.user.name}`,
              },
            ],
          },
        },
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }

  const pushTimelineDetailView = (user: User): void => {
    resetDatalayerEcommerce()
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        event: 'timelineDetailView',
        ecommerce: {
          detail: {
            actionField: { list: 'timeline' },
            products: [
              {
                name: user.name,
                brand: user.name,
                category: `Timeline/${user.name}`,
              },
            ],
          },
        },
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }

  const pushAddToCart = (moment: Moment): void => {
    resetDatalayerEcommerce()
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        event: 'addToCart',
        ecommerce: {
          add: {
            products: [
              {
                name: moment.title,
                id: moment.id,
                price: moment.priceEur,
                brand: moment.user.name,
                category: `${moment.user.name}/${moment.nft_collection.name}`,
              },
            ],
          },
        },
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }

  const pushCheckout = (moments: Moment[], option: string): void => {
    resetDatalayerEcommerce()
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        event: 'checkout',
        ecommerce: {
          checkout: {
            actionField: { step: 1, option },
            products: moments.map((moment) => ({
              name: moment.title,
              id: moment.id,
              price: moment.priceEur,
              brand: moment.user.name,
              category: `${moment.user.name}/${moment.nft_collection.name}`,
              quantity: 1,
            })),
          },
        },
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }

  const pushPurchase = (moments: Moment[], transactionId: string): void => {
    resetDatalayerEcommerce()
    const tagManagerArgs: DataLayerArgs = {
      dataLayer: {
        event: 'purchase',
        ecommerce: {
          purchase: {
            actionField: {
              id: transactionId,
              revenue: moments.reduce((acc, moment) => acc + moment.priceEur, 0),
              tax: '0',
              shipping: '0',
            },
            products: moments.map((moment) => ({
              name: moment.title,
              id: moment.id,
              price: moment.priceEur,
              brand: moment.user.name,
              category: `${moment.user.name}/${moment.nft_collection.name}`,
              quantity: 1,
            })),
          },
        },
      },
    }
    TagManager.dataLayer(tagManagerArgs)
  }

  return {
    pushMomentImpressions,
    pushCollectionImpressions,
    pushTimelineImpressions,
    pushCollectionClick,
    pushMomentClick,
    pushTimelineClick,
    pushMomentDetailView,
    pushCollectionDetailView,
    pushTimelineDetailView,
    pushAddToCart,
    pushCheckout,
    pushPurchase,
  }
}
