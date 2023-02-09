import Image from 'next/image'

export const LoginLayout = ({
  children,
  image,
  imageAlt
}: {
  children: React.ReactNode
  image?: string
  imageAlt?: string
}) => {
  return (
    <div className="flex h-screen items-center">
      <div className="w-7/12 px-32">{children}</div>
      <div className="flex-1 bg-purple-200 h-full">{image && <Image src={image} alt={imageAlt || ''} />}</div>
    </div>
  )
}
