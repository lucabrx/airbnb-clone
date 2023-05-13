import Hydrate from '@/components/Hydrate';
import ListingClient from '@/components/ListingClient';
import getCurrentUser from '@/utils/getCurrentUser';
import getListingById from '@/utils/getListingById';
import getReservations from '@/utils/getReservations';

interface IParams {
  listingId?: string;
}
interface ListingProps {
    params: IParams;
    }
const Listing = async ({params}: ListingProps) => {
    const reservations = await getReservations(params)
    const listing = await getListingById({
        listingId: params.listingId
    })
    const currentUser = await getCurrentUser()
  return (
<Hydrate> 
<ListingClient 
        listing={listing as any}
        currentUser={currentUser}
        reservations={reservations}
/>
</Hydrate>
)
}

export default Listing