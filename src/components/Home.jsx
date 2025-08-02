import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";
import  useProtectedPage  from './ProtectedPage'
import supabase from "../supabaseClient";
import { Buffer } from 'buffer';
window.Buffer = Buffer;

function parsePointString(pointString) {
  if (!pointString) return null;
  const matches = pointString.match(/POINT\s?\(([-\d.]+)\s+([-\d.]+)\)/i);
  if (matches && matches.length === 3) {
    const longitude = parseFloat(matches[1]);
    const latitude = parseFloat(matches[2]);
    return { latitude, longitude };
  }
  return null;
}

function parseWKBHex(hex) {
  if (!hex || typeof hex !== 'string' || hex.length < 50) {
    console.warn("Invalid WKB hex:", hex);
    return null;
  }

  const buffer = Buffer.from(hex, 'hex');

  // WKB starts after 9 bytes — coords are 8 bytes each (double)
  const lon = buffer.readDoubleLE(9);   // little-endian
  const lat = buffer.readDoubleLE(17);

  return { latitude: lat, longitude: lon };
}


function Home() {
  
  const { passed, loading } = useProtectedPage();
  const [ selected, setSelected ] = useState(null);
  const [ locationData, setLocationData ] = useState([]);
  const coords = selected?.location ? parseWKBHex(selected.location) : null;
  useEffect(() => {
    const handleLocations = async() => {
      const {data, error} = await supabase
      .from("business_table")
      .select("id, display_name, description, address, location")
      .not("location", "is", null);

      setLocationData(data);
    }
    handleLocations();

    }, [])

  if (loading||!passed) return null;

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: 43.1566,
    lng: -77.6088,
  };


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
            {locationData.map((data) => {
              const parsedLocation = parseWKBHex(data.location);
              if (!parsedLocation) return null;

              return (
                <Marker
                  key={data.id}
                  position={{ lat: parsedLocation.latitude, lng: parsedLocation.longitude }}
                  onClick={() => setSelected(data)}
                />
              );
            })}

           {coords && (
  <InfoWindow
    position={{ lat: coords.latitude, lng: coords.longitude }}
    onCloseClick={() => setSelected(null)}
  >
    <div>
      <h3>{selected.display_name}</h3>
      <p>{selected.description}</p>
      <p>{selected.address}</p>
    </div>
  </InfoWindow>
)}

          </GoogleMap>
      </section>
    </div>
  );
}

export default Home;