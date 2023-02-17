import Image, { StaticImageData } from 'next/image'
import defaultProfilePic from 'public/images/500x500_v2.png'

type ProfileImageProps = {
  profilePicture?: string | StaticImageData
  alt?: string
  width?: number
  height?: number
  className?: string
  circle?: boolean
  onClick?: () => void
}

export const ProfileImage = ({
  className,
  profilePicture = defaultProfilePic,
  alt = '',
  circle,
  height,
  onClick,
  width
}: ProfileImageProps) => {
  return (
    <div className={`${className} relative overflow-hidden`}>
      <Image className="object-cover" src={profilePicture} alt={alt} fill />
    </div>
  )
}
