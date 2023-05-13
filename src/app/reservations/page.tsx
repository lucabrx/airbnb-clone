import EmptyState from "@/components/EmptyState";
import Hydrate from "@/components/Hydrate";
import Reservations from "@/components/Reservations";

import getCurrentUser from "@/utils/getCurrentUser";
import getReservations from "@/utils/getReservations";


const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Hydrate> 
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </Hydrate>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <Hydrate>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </Hydrate>
    );
  }

  return (
    <Hydrate>
      <Reservations
        reservations={reservations}
        currentUser={currentUser}
      />
    </Hydrate>
  );
}
 
export default ReservationsPage;