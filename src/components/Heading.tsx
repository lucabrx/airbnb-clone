"use client"
import { type FC } from 'react';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;

}

const Heading: FC<HeadingProps> = ({center,title,subtitle}) => {
  return (
<div className={center ? "text-center" : "text-start"}> 
<h2 className='text-2xl font-bold'>
{title}
</h2>
<h3 className='font-light text-neutral-500 mt-2'>
{subtitle}
</h3>
</div>
)
}

export default Heading