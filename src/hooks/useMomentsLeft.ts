import { useEffect, useState } from 'react'

import { Moment } from '../model/Moment'

type UseMomentsLeft = {
  only: string
  description: string
}

const useMomentsLeft = (moment: Moment): UseMomentsLeft => {
  const [only, setOnly] = useState('')

  const momentsLeft = moment?.numberOfCopies - moment?.minteds?.length
  const calc = momentsLeft / (moment ? moment.numberOfCopies : 1)
  const description = `#${momentsLeft}/${moment?.numberOfCopies}`

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
  }, [moment])

  return {
    only,
    description,
  }
}
export default useMomentsLeft
