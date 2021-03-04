import React, { useState,useEffect } from 'react';
import MAP_COMPONENT from "../views/Maps/Maps";
import locations from "assets/data.json";
import Chart from "react-google-charts";
import axios from 'axios';
import SpeedCard from './SpeedCard';
import ChartCard from './ChartCard';

import './Home.css';


const Home = () => {
    const [data,setData] = useState([])
    const [download,setDownload] = useState(0)
    const [upload,setUpload] = useState(0)
    const [latencyData,setLatencyData] = useState(0)
    const [jitterData,setJitterData] = useState(0)
    
    useEffect(()=>{
        let location_count = 0;
        let sum_downlaod = 0;
        let sum_upload = 0;
        let sum_latency = 0;
        let lat_5 =0,lat_10 = 0,lat_15 = 0,lat_20 = 0;
        axios.get('http://localhost:5000/api/map').then((res)=>{
            location_count = res.data.length
            res.data.map(location=>{
                console.log(location)
                let lat = Number(location.avg_lat_ms_wt).toFixed()*1;
                if(lat<10) lat_5++
                if( lat<15&&lat>=10) lat_10++
                if( lat<20&&lat>=15) lat_15++
                if( lat>=20) lat_20++
                sum_latency += location.avg_lat_ms_wt
                sum_upload += location.avg_u_mbps_wt
                sum_downlaod += location.avg_d_mbps_wt
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
        <div>
            <div className="row">
                <SpeedCard title={'Upload'} data={upload}/>
                <SpeedCard title={'Downlaod'} data={download}/>
                <ChartCard title={'Latency'} data={latencyData} type={'PieChart'} options={'PieChart'} />
                <ChartCard title={'Jitter'} data={jitterData} type={'PieChart'} options={'PieChart'} />
            </div>
            <div className="row">
                <div className="col-md-6">
                <Chart
                    title={'fsfdsfsd'}
                    width={'100%'}
                    height={'500px'}
                    chartType="LineChart"
                    loader={''}
                    data={[
                        ['x', 'dogs'],
                        [0, 0],
                        [1, 10],
                        [2, 23],
                        [3, 17],
                    ]}
                    options={{
                        hAxis: {
                        title: 'Time',
                        },
                        vAxis: {
                        title: 'Popularity',
                        },
                        legend: 'none',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
                </div>
                <div className="col-md-6">
                    <MAP_COMPONENT  locations={locations}/>
                </div>
            </div>
        </div>
    )
}

export default Home;
