import './Map.scss'

import { MapContainer, Polygon, TileLayer } from "react-leaflet";

const Map = ({coordinates}) => {
    const renderPolygon = () => {
        const coordinateList = coordinates;
        const items = coordinateList.map((item) => (
            [item.northernLatitude, item.eastLongitude]
          ))
        return(
            <Polygon  positions={items} />
        );
    }
    

    return(
        <div className="readyMap">
            <MapContainer center={[coordinates[0].northernLatitude, coordinates[0].eastLongitude]} zoom={13}
                    >
            <TileLayer
                attribution="Google Maps"
                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
            {renderPolygon()}
        </MapContainer>
        </div>
    )
}

export default Map