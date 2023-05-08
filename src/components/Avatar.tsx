"use client"
import Image from 'next/image';
import { type FC } from 'react';

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: FC<AvatarProps> = ({src}) => {
  return (
<Image
className='rounded-full'
height={30}
width={30}
alt="avatar"
src={src || "/placeholder.jpg"}
/>
)
}

export default Avatar