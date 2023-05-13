import EmptyState from "@/components/EmptyState";
import Favorite from "@/components/Favorite";
import Hydrate from "@/components/Hydrate";

import getCurrentUser from "@/utils/getCurrentUser";
import getFavoriteListings from "@/utils/getFavoriteListings";



const Favorites = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <Hydrate>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </Hydrate>
    );
  }

  return (
    <Hydrate>
      <Favorite
        listings={listings}
        currentUser={currentUser}
      />
    </Hydrate>
  );
}
 
export default Favorites;