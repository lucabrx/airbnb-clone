"use client"
import { type FC } from 'react';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: FC<MenuItemProps> = ({onClick,label}) => {
  return (
<button
onClick={onClick}
className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'> 
{label}
</button>
)
}

export default MenuItem