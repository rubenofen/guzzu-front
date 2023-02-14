import ReactLoading from 'react-loading'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
  loading?: boolean
  [others: string]: any
}

export const Button = ({ children, className, icon, loading, ...others }: ButtonProps) => {
  return (
    <div className="rounded-sm relative overflow-hidden">
      {loading && (
        <span className="flex justify-center items-center bg-white opacity-90 absolute inset-0">
          <ReactLoading type="spin" width={30} height={30} color="black" />
        </span>
      )}
      <button className={`flex items-center ${className}`} {...others}>
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </button>
    </div>
  )
}
