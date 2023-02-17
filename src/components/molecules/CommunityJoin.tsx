import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import communityJoin from 'public/images/community-join.png'
import discord from 'public/images/discord.gif'
import rule from 'public/images/rule.png'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Button } from '../atoms/Button'

type CommunityJoinProps = {
  className?: string
}

export const CommunityJoin = ({ className }: CommunityJoinProps) => {
  const router = useRouter()
  return (
    <div className={`relative flex w-full h-full ${className}`}>
      <Image src={communityJoin} alt="community join" />
      <div className="flex flex-col w-full">
        <div className="p-6">
          <h2 className="font-normal">JOIN OUR COMMUNITY AND BE AWARE OF OUR LATEST NEWS</h2>
          <Link href="https://discord.com/invite/mckxHh2QCz" target="_blank">
            <Button className="btn-primary btn-big mt-4" icon={<AiOutlineArrowRight />}>
              JOIN OUR DISCORD
            </Button>
          </Link>
        </div>
        <div className="relative w-full h-full flex justify-center items-center">
          <Image src={rule} alt="rule" fill className="object-cover" />
          <Image src={discord} alt="discord" fill className="object-contain z-10" />
        </div>
      </div>
    </div>
  )
}
