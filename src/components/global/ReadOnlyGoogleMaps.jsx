import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import MapStyles from '../../constants/MapStyles.ts';

const ReadOnlyGoogleMaps = ({ latLng }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAqZoiL_Zhm2C7SF5CvhX60a2D8-1_crSc',
  });


  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div></div>;
  }

  if (!latLng || !latLng.lat || !latLng.lng) {
    return <div>Invalid coordinates</div>;
  }

  const position = { 
    lat: latLng?.lat === null ? 15.03901119049837 : latLng.lat ,
    lng: latLng?.lng === null ? 120.68086624145508 : latLng.lng   
  }

  return (
    <div className="map-container">
      <GoogleMap
        zoom={14}
        center={position}
        mapContainerClassName="map-container-preview"
        options={{
          styles: MapStyles.readOnly,
          disableDefaultUI: true,
          fullscreenControl: true,
        }}
      >
        <MarkerF 
          position={position} 
          icon={{
            url: 'https://res.cloudinary.com/dueebthen/image/upload/v1699864385/vw60qgm7aoueaexegtby.png',
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default ReadOnlyGoogleMaps;
