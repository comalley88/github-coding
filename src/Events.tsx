import { useState, useEffect } from "react";

export default function Events(props) {
  const { venue } = props;
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function getVenues() {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=8X6HVGOGo28k9tEihXCuPGKj1ty0aMBd&countryCode=uk&venueId=${venue.id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const responseData = await response.json();
        console.log("response data is", responseData);
        setEvents(responseData);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    }

    getVenues();
  }, [venue]);
  console.log(events);
  return <></>;
}
