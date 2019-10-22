import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { setSelectedRestaurant } from '../actions/actionCreators.js';
import mapStyles from '../config/mapStyles.js';
import defaultLocation from '../config/defaultLocation.js'
import '../styles/Map.scss';
import markerCogent from '../assets/images/markerCogent.svg'
import markerActive from '../assets/images/markerActive.svg'
import markerInactive from '../assets/images/markerInactive.svg'

const MapInner = withScriptjs(withGoogleMap(({ filteredRestaurants, selectedRestaurant, setSelectedRestaurant }) => {
	const mapRef = useRef();

	useEffect(() => {
		if (selectedRestaurant) {
			const { lat, lng } = selectedRestaurant.location;
			mapRef.current.panTo({ lat, lng });
		}
	}, [selectedRestaurant])

	return (
		<GoogleMap 
			ref={mapRef}
			defaultZoom={16} 
			defaultCenter={defaultLocation}
			options={{ disableDefaultUI: true, styles: mapStyles }} 
		>
			<Marker position={defaultLocation} icon={markerCogent} onClick={() => mapRef.current.panTo(defaultLocation)} />
			{filteredRestaurants.map(({ id, location }) => 
				<Marker 
					key={id} 
					position={{ lat: location.lat, lng: location.lng }} 
					icon={ selectedRestaurant && selectedRestaurant.id === id ? markerActive : markerInactive}
					onClick={() => setSelectedRestaurant(id)}
				/>
			)}
		</GoogleMap>
	)
}));

export const Map = ({ filteredRestaurants, selectedRestaurant, setSelectedRestaurant }) => (
	<MapInner
		googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`}
		loadingElement={<div className="map__loading" />}
		containerElement={<div className="map__container" />}
		mapElement={<div className="map" />}
		filteredRestaurants={filteredRestaurants}
		selectedRestaurant={selectedRestaurant}
		setSelectedRestaurant={setSelectedRestaurant}
	/>
);

const mapStateToProps = ({ filteredRestaurants, selectedRestaurant }) => ({ filteredRestaurants, selectedRestaurant });
export default connect(mapStateToProps, { setSelectedRestaurant })(Map);