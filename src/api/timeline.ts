import { Timeline } from '../model/Timeline'
import { getApi } from './tools'

const TimelineAPI = {
  fetch: async (slug: string): Promise<Timeline> => {
    return getApi(`/timeline/${slug}`)
  },
  fetchSelected: async (): Promise<Timeline> => {
    return getApi('/timelines/selected')
  },
}

export default TimelineAPI
