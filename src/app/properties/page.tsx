import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/utils/getCurrentUser";
import getListings from "@/utils/getListings";
import Hydrate from "@/components/Hydrate";
import Properties from "@/components/Properties";



const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <Hydrate>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </Hydrate>
    );
  }

  return (
    <Hydrate>
      <Properties
        listings={listings}
        currentUser={currentUser}
      />
    </Hydrate>
  );
}
 
export default PropertiesPage;