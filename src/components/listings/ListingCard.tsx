"use client"
import useCountries from '@/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/types';
import { Listing, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, type FC, MouseEvent, useMemo } from 'react';
import {format} from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';
interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
}

const ListingCard: FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancle = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(disabled) return

        onAction?.(actionId);
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {   
        if(reservation) return reservation.totalPrice;

        return data.price;
    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if (!reservation) {
          return null;
        }
      
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
    
        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
      }, [reservation]);

  return (
<div 
onClick={() => router.push(`/listings/${data.id}`)}
className='col-span-1 cursor-pointer group'> 
<div className='flex flex-col gap-2 w-full'>
<div className='aspect-square w-full relative overflow-hidden rounded-xl'>
    <Image 
    src={data.imageSrc}
    alt={data.title}
    className='object-cover w-full h-full group-hover:scale-110 transition'
    fill
    />
    <div className='absolute top-3 right-3'>
        <HeartButton listingId={data.id} currentUser={currentUser} />
    </div>
</div>
<h2 className='font-semibold text-lg'>
    {location?.region}, {location?.label}
</h2>
<p className='text-neutral-500 font-light'>
    {reservationDate || data.category} 
</p>
<div className='flex flex-row items-center gap-1'>
    <span className='font-semibold'>${price}</span>
    {!reservation && ( 
        <span className='font-light'>night</span>
     )}
</div>
{onAction && actionLabel && (
 <Button 
    disabled = {disabled}
    small 
    label={actionLabel}
    onClick={handleCancle}
 />   
)}
</div>
</div>
)
}

export default ListingCard