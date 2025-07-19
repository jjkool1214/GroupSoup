import Navigation from "./Navigation";
import { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

function Home() {

  const containerStyle = {
    width: '100%',
    height: '600px',
  };

  const center = {
    lat: 43.1566,
    lng: -77.6088,
  };

  const places = [
    {
      id: 1,
      name: 'Strong Museum',
      position: { lat: 43.1535, lng: -77.5989 },
      info: 'The Strong National Museum of Play',
    },
    {
      id: 2,
      name: 'Highland Park',
      position: { lat: 43.1301, lng: -77.6039 },
      info: 'Famous for its lilac festival',
    },
  ];

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [selected, setSelected] = useState(null);

  return (
    <div>  
      <Navigation />

      <section>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            <section id='SearchBar'>
              <input type='text' placeholder='Search...'></input>
            </section>
            {places.map((place) => (
              <Marker
                key={place.id}
                position={place.position}
                onClick={() => setSelected(place)}
              />
            ))}

            {selected && (
              <InfoWindow
                position={selected.position}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <h3>{selected.name}</h3>
                  <p>{selected.info}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </section>
    </div>
  );
}

export default Home;