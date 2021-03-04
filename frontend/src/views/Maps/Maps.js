import React from "react";
import ReactDOMServer from "react-dom/server";
import { Map, GeoJSON} from 'react-leaflet';
import { Box, InputLabel } from "@material-ui/core";
import 'leaflet/dist/leaflet.css';
import "assets/App.css";
const defaultProps = {
  // border: 1,
  // borderColor: "grey.500",
  // backgroundColor: "black"
};
const normalStyle = {
  color: "white",
  fontSize: "20px",
  padding: "5px",
};
const mapStyle = {
  width:'100%',
  height:'500px',
}
function MyPopup(props) {
  const { avg_d_mbps_wt,avg_u_mbps_wt,NeighName } = props;
  return (
    <Box border={0}style={{ backgroundColor: "black" }} {...defaultProps}>
        <InputLabel style={normalStyle}>{NeighName} </InputLabel>
        <InputLabel style={normalStyle}>Download:{avg_d_mbps_wt} Mbps</InputLabel>
        <InputLabel style={normalStyle}>Upload:{avg_u_mbps_wt} Mbps</InputLabel>
    </Box>
  );
}
export default function Maps(props) {
    const onEachFeature = (feature, layer) => {
        const popupOptions = {
        minWidth: 250,
        maxWidth: 500,
        className: "popup-classname"
        };
        const color1 = '#dc5256';
        const color2 = '#5eb6e4';
        const color3 = '#f0ca69';
        // console.log(feature);
        // var coordinates = feature.geometry.coordinates;
        // var swapped_coordinates = [coordinates[1], coordinates[0]];  //Swap Lat and Lng
        console.log(feature)
        var avg_d_mbps_wt = Math.round(feature.properties.avg_d_mbps_wt/1000);
        var avg_u_mbps_wt = Math.round(feature.properties.avg_u_mbps_wt/1000);
        var NeighName = feature.properties.NeighName;
        layer.setStyle({
        weight: 0.1,
        // color: '#666',
        color: '#000000',
        // fillColor: 'white',
        // fillColor: avg_d_mbps_wt > 150 ? color1 : avg_d_mbps_wt > 100 ? color2 : color3,
        fillColor: avg_d_mbps_wt > 150 ? color1 : avg_d_mbps_wt > 100 ? color2 : color3,
        });
        const popupContentNode = <MyPopup avg_d_mbps_wt={avg_d_mbps_wt} avg_u_mbps_wt={avg_u_mbps_wt} NeighName={NeighName} />;
        const popupContentHtml = ReactDOMServer.renderToString(popupContentNode);
        layer.bindTooltip(popupContentHtml, popupOptions);
    }
    return (
        <div>
            {/* <Map center={[-81.35, 28.35]} zoom={9}> */}
            <Map center={[28.475, -81.35]} zoom={10.5} maxWidth={30} style={mapStyle}>
                <GeoJSON data={props.locations} onEachFeature={onEachFeature} radius={200} crs={'urn:ogc:def:crs:EPSG::26916'} />
            </Map> 
        </div>
    );
}
