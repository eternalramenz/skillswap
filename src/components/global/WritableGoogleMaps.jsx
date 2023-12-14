import { useState, useEffect} from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import MapStyles from '../../constants/MapStyles.ts';

const libraries = ['places'];

const WritableGoogleMaps = ({ setLocation, setLatLng, latLng }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAqZoiL_Zhm2C7SF5CvhX60a2D8-1_crSc',
    libraries: libraries,
  });
  const [markerPosition, setMarkerPosition] = useState(latLng);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLatLng({ lat, lng });
    setMarkerPosition({ lat, lng });
    getNearestPlace(lat, lng);
  };

  const getNearestPlace = async (lat, lng) => {
    if (!window.google) {
      console.error('Google Maps JavaScript API library not loaded');
      return;
    }
  
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
  
      const data = await response.json();
  
      let location = '';
  
      if (data && data.display_name) {
        location += data.display_name;
      } else {
        console.error('Error fetching nearest address');
      }
  
      const map = new window.google.maps.Map(document.createElement('div'));
  
      const service = new window.google.maps.places.PlacesService(map);
  
      service.nearbySearch(
        {
          location: { lat, lng },
          rankBy: window.google.maps.places.RankBy.DISTANCE,
          type: 'establishment',
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            setLocation(location + ' ' + results[0].name);
          } else {
            console.error('Error fetching nearest place:', status);
          }
        }
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div></div>;
  }
  return (
    <div 
      className=""
    >
      <GoogleMap
        zoom={15}
        center={
          (latLng?.lat !== null && latLng?.lng !== null && typeof latLng?.lat === 'number' && typeof latLng?.lng === 'number')
          ? { lat: parseFloat(latLng.lat), lng: parseFloat(latLng.lng) }
          : { lat: 15.03901119049837, lng: 120.68086624145508 }
        }
        mapContainerClassName={`map-container-preview`}
        onClick={handleMapClick}
        options={{ styles: MapStyles.writable, disableDefaultUI: true, fullscreenControl: true, }}
      >
        {markerPosition && (
          <MarkerF
            position={markerPosition}
            icon={{
              url: 'https://res.cloudinary.com/dueebthen/image/upload/v1699864385/vw60qgm7aoueaexegtby.png',
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default WritableGoogleMaps;
