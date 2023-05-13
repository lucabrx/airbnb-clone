import getCurrentUser from "@/utils/getCurrentUser";
import getReservations from "@/utils/getReservations";

import Hydrate from "@/components/Hydrate";
import EmptyState from "@/components/EmptyState";
import Trips from "@/components/Trips";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Hydrate>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </Hydrate>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <Hydrate>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
      </Hydrate>
    );
  }

  return (
    <Hydrate>
      <Trips
        reservations={reservations}
        currentUser={currentUser}
      />
    </Hydrate>
  );
}
 
export default TripsPage;