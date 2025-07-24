import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";
import  useProtectedPage  from './ProtectedPage'

function Home() {
  const { passed, loading } = useProtectedPage();
  const [selected, setSelected] = useState(null);

  if (loading||!passed) return null;

  const containerStyle = {
    width: '100%',
    height: '100%',
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

  return (
    <div className="appPage">  
      <Navigation />

      <section className="mapContainer">
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
      </section>
    </div>
  );
}

export default Home;