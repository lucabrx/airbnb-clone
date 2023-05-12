import Hydrate from '@/components/Hydrate';
import ListingClient from '@/components/ListingClient';
import getCurrentUser from '@/utils/getCurrentUser';
import getListingById from '@/utils/getListingById';

interface IParams {
  listingId?: string;
}
interface ListingProps {
    params: IParams;
    }
const Listing = async ({params}: ListingProps) => {
    const listing = await getListingById({
        listingId: params.listingId
    })
    const currentUser = await getCurrentUser()
  return (
<Hydrate> 
<ListingClient 
        listing={listing as any}
        currentUser={currentUser}
/>
</Hydrate>
)
}

export default Listing