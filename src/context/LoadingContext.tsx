import { createContext } from 'react'

export const LoadingContext = createContext<any>({
  showLoading: false,
  setShowLoading: () => {
    console.log('undefined setShowLoading')
  },
})
