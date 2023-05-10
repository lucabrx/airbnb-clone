import Container from "@/components/Container";
import EmptyStaate from "@/components/EmptyState";
import Hydrate from "@/components/Hydrate";

export default function Home() {
  const isEmpty = true ;
  if (isEmpty) {
   return (
    <Hydrate>
      <EmptyStaate />
    </Hydrate>
   ) 
  }
  return (
  <div>
    <Hydrate>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-9">
        <h2>future lisings </h2>
        </div>
      </Container>
    </Hydrate>
  </div>
       
  )
}
