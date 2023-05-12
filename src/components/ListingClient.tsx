import { SafeListing, SafeReservation, SafeUser } from '@/types';
import { useMemo, type FC } from 'react';
import { categories } from "@/components/navbar/Categories";

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
<div> 
ListingClient
</div>
)
}

export default ListingClient