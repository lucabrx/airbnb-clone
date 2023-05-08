"use client"
import { type FC } from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
    onClick: (value:string) => void;
    label: string;
    icon: IconType;
    selected?: boolean;
}

const CategoryInput: FC<CategoryInputProps> = ({
    onClick,
    label,
    icon: Icon,
    selected
}) => {
  return (
<div onClick={() => onClick(label)} 
className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transtion cursor-pointer 
${selected ? 'border-black' : 'border-neutral-200'}`}> 

<Icon size={30} />
<span className='font-semibold'>{label}</span>
</div>
)
}

export default CategoryInput