import * as React from 'react'

import { SVGProps } from '../../../types'

export const Circle = ({ size = 32, fill = 'black', className }: SVGProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="16" cy="16" r="16" fill={fill} />
  </svg>
)
