import { useEffect, useState } from 'react'
import { Nft } from 'src/model/Nft'

type UseMomentsLeft = {
  only: string
  description: string
}

const useMomentsLeft = (nft: Nft): UseMomentsLeft => {
  const [only, setOnly] = useState('')

  const momentsLeft = nft?.numberOfCopies - (nft?.minteds?.length || 0)
  const calc = momentsLeft / (nft ? nft.numberOfCopies : 1)
  const description = `#${momentsLeft}/${nft?.numberOfCopies}`

  const text = () => {
    if (calc === 0) {
      setOnly(' Sold Out')
    }
    if (calc > 0 && calc <= 0.05) {
      setOnly(' Only a few left')
    }
    if (calc > 0.05 && calc <= 0.2) {
      setOnly(` Only ${momentsLeft} left`)
    }
    if (calc > 0.2 && calc < 1) {
      setOnly(` ${momentsLeft} left`)
    }
  }

  useEffect(() => {
    text()
  }, [nft])

  return {
    only,
    description
  }
}
export default useMomentsLeft
