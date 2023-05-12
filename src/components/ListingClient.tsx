"use client"
import { SafeListing, SafeReservation, SafeUser } from '@/types';
import { useMemo, type FC } from 'react';
import { categories } from "@/components/navbar/Categories";
import Container from './Container';
import ListingHead from './listings/ListingHead';
import ListingInfo from './listings/ListingInfo';

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
      user: SafeUser
    };
    currentUser?: SafeUser | null;
  }

const ListingClient: FC<ListingClientProps> = ({listing,currentUser,reservations}) => {

    const category = useMemo(() => {
        return categories.find((items) => 
         items.label === listing.category);
     }, [listing.category]);
   
  return (
<Container> 
<div className='max-w-screen-lg mx-auto'>
    <div className='flex flex-col gap-6'>
    <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo 
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
            />
        </div>
    </div>
</div>
</Container>
)
}

export default ListingClient