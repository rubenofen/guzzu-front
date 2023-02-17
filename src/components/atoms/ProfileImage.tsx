import Image, { StaticImageData } from 'next/image'
import defaultProfilePic from 'public/images/500x500_v2.png'

type ProfileImageProps = {
  profilePicture?: string | StaticImageData
  alt?: string
  className?: string
  onClick?: () => void
}

export const ProfileImage = ({ className, profilePicture = defaultProfilePic, alt = '' }: ProfileImageProps) => {
  return (
    <div className={`${className} relative overflow-hidden`}>
      <Image className="object-cover" src={profilePicture} alt={alt} fill />
    </div>
  )
}
