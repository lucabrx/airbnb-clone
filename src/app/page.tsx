import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import Hydrate from "@/components/Hydrate";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "@/utils/getCurrentUser";
import getListings, { IListingsParams } from "@/utils/getListings";

interface HomeProps {
  searchParams: IListingsParams
};
export const dynamic = 'force-dynamic'
export default async function Home({ searchParams } : HomeProps) {
  const listings = await getListings(searchParams);

  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
   return (
    <Hydrate>
      <EmptyState showReset />
    </Hydrate>
   ) 
  }
  return (
  <div>
    <Hydrate>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-9">
        {
          listings.map((listing) => (
            <ListingCard 
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            />
            ))
        }
        </div>
      </Container>
    </Hydrate>
  </div>
       
  )
}
