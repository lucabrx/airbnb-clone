"use client"
import Image from 'next/image';
import { type FC } from 'react';

interface AvatarProps {
  
}

const Avatar: FC<AvatarProps> = ({}) => {
  return (
<Image
className='rounded-full'
height={30}
width={30}
alt="avatar"
src="/placeholder.jpg"
/>
)
}

export default Avatar