export function CloseIcon({ fill, size = '14' }: { fill: string; size?: string }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.34277 1.34314L12.6565 12.6568"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.34277 12.6569L12.6565 1.34315"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
