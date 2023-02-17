type ChipProps = {
  className?: string
  children: React.ReactNode
}

export const Chip = ({ className, children }: ChipProps) => {
  return (
    <div
      className={`flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full border border-gray-300 ${className}`}
    >
      <div className="text-xs font-normal leading-none max-w-full flex-initial">{children}</div>
    </div>
  )
}
