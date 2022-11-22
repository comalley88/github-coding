import { useEffect, useState } from "react";
import "./styles.css";
import Events from "./Events";

export default function App() {
  const [venues, setVenues] = useState(null);
  useEffect(() => {
    async function getVenues() {
      try {
        const response = await fetch(
          "https://app.ticketmaster.com/discovery/v2/venues.json?apikey=8X6HVGOGo28k9tEihXCuPGKj1ty0aMBd&countryCode=uk"
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const responseData = await response.json();
        setVenues(responseData._embedded.venues);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    }

    getVenues();
  }, []);
  console.log("venue data is", venues);
  return (
    <div className="App">
      {venues &&
        venues.map((venue) => (
          <>
            <p key={venue.id}>{venue.name}</p>
            <Events venue={venue} />
          </>
        ))}
    </div>
  );
}
