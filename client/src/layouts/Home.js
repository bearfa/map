import React, { useState,useEffect } from 'react';
import MAP_COMPONENT from "../views/Maps/Maps";
import locations from "assets/data.json";
import Chart from "react-google-charts";
import axios from 'axios';
import _ from 'lodash';
import SpeedCard from './SpeedCard';
import ChartCard from './ChartCard';
import {BASE_URL} from './../Config';
import './Home.css';


const Home = () => {
    const [download,setDownload] = useState(0);
    const [upload,setUpload] = useState(0);
    const [latencyData,setLatencyData] = useState(0);
    const [jitterData,setJitterData] = useState(0);
    const [mapData,setMapData] = useState([]);
    
    useEffect(()=>{
        let location_count = 0;
        let sum_downlaod = 0;
        let sum_upload = 0;
        let lat_5 =0,lat_10 = 0,lat_15 = 0,lat_20 = 0;
        axios.get(BASE_URL+'/api/map').then((res)=>{
            location_count = res.data.length;
            setMapData(locations);
            res.data.map(location=>{
                let lat = Number(location.properties.avg_lat_ms_wt).toFixed()*1;
                if(lat<10) lat_5++
                if( lat<15&&lat>=10) lat_10++
                if( lat<20&&lat>=15) lat_15++
                if( lat>=20) lat_20++
                sum_upload += location.properties.avg_u_mbps_wt
                sum_downlaod += location.properties.avg_d_mbps_wt
            })
            setDownload(Math.round(sum_downlaod/location_count/1000))
            setUpload(Math.round(sum_upload/location_count/1000))
            setJitterData([
                ['Jitter', '%'],
                ['5~10ms ',(lat_5/(lat_5+lat_10))*100],
                ['10~15ms',(lat_10/(lat_5+lat_10))*100],
            ])
            setLatencyData([
                ['Latency', '%'],
                ['15~20ms', (lat_15/(lat_15+lat_20))*100],
                ['more than 20ms',(lat_20/(lat_15+lat_20))*100 ],
            ])
        })
    },[]);
    return (
        <div className={'main'}>
            <div className="row">
                <SpeedCard title={'Upload'} data={upload}/>
                <SpeedCard title={'Downlaod'} data={download}/>
                <ChartCard title={'Latency'} data={latencyData} type={'PieChart'} options={'PieChart'} />
                <ChartCard title={'Jitter'} data={jitterData} type={'PieChart'} options={'PieChart'} />
            </div>
            <div className="row">
                <div className="col-md-12">
                    <MAP_COMPONENT  locations={mapData}/>
                </div>
            </div>
        </div>
    )
}

export default Home;
