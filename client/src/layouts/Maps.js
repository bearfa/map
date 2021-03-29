import React from "react";
import ReactDOMServer from "react-dom/server";
import { Map,TileLayer, GeoJSON} from 'react-leaflet';
import { Box, InputLabel } from "@material-ui/core";
import 'leaflet/dist/leaflet.css';
import "assets/App.css";
import {mapColor1,mapColor2,mapColor3,mapOpacity,mapBorderColor} from '../Config';
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
  height:'700px',
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
        // console.log(feature);
        // var coordinates = feature.geometry.coordinates;
        // var swapped_coordinates = [coordinates[1], coordinates[0]];  //Swap Lat and Lng
        var avg_d_mbps_wt = Math.round(feature.properties.avg_d_mbps_wt/1000);
        var avg_u_mbps_wt = Math.round(feature.properties.avg_u_mbps_wt/1000);
        var NeighName = feature.properties.NeighName;
        layer.setStyle({
        weight: 1,
        color: mapBorderColor,
        fillColor: avg_d_mbps_wt > 150 ? mapColor1 : avg_d_mbps_wt > 100 ? mapColor2: mapColor3,
        fillOpacity:mapOpacity,
        });
        const popupContentNode = <MyPopup avg_d_mbps_wt={avg_d_mbps_wt} avg_u_mbps_wt={avg_u_mbps_wt} NeighName={NeighName} />;
        const popupContentHtml = ReactDOMServer.renderToString(popupContentNode);
        layer.bindTooltip(popupContentHtml, popupOptions);
    }
    console.log(props)
    if(props.locations.length){
      return (
          <div>
              {/* <Map center={[-81.35, 28.35]} zoom={9}> */}
              <Map center={[28.475, -81.35]} zoom={12} maxWidth={30} style={mapStyle}>
                <TileLayer
                    // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <GeoJSON data={props.locations} onEachFeature={onEachFeature} radius={2000} crs={'urn:ogc:def:crs:EPSG::26916'} />
              </Map> 
          </div>
      );
    }else{
      return (
        <div>
          
        </div>
      )
    }
}
