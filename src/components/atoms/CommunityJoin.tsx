import Image from 'next/image'
import communityJoin from 'public/images/community-join.png'
import discord from 'public/images/discord.gif'
import rule from 'public/images/rule.png'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Button } from './Button'

type CommunityJoinProps = {
  className?: string
}

export const CommunityJoin = ({ className }: CommunityJoinProps) => (
  <div className={`relative flex w-full h-full ${className}`}>
    <Image src={communityJoin} alt="community join" />
    <div className="flex flex-col w-full">
      <div className="p-6">
        <h2 className="font-normal">JOIN OUR COMMUNITY AND BE AWARE OF OUR LATEST NEWS</h2>
        <Button className="btn-primary btn-big mt-4" icon={<AiOutlineArrowRight />}>
          JOIN OUR DISCORD
        </Button>
      </div>
      <div className="relative w-full h-full flex justify-center items-center">
        <Image src={rule} alt="rule" fill className="object-cover" />
        <Image src={discord} alt="discord" fill className="object-contain z-10" />
      </div>
    </div>
  </div>
)
