import React from 'react';
import Chart from "react-google-charts";

const ChartCard = (props) => {
    return (
        <div className="col-md-3">
            <div className="text-center top-card">
                {props.title}
            </div>
            <div className="">
            <Chart
                width={'100%'}
                height={'300px'}
                chartType={props.type}
                loader={<div>Loading Chart</div>}
                data={props.data}
                options={{
                    // Just add this option
                    pieHole: 0.4,
                    legend: 'none',
                    backgroundColor: 'none'
                }}
                rootProps={{ 'data-testid': '3' }}
                />
            </div>                        
        </div>
    )
}
export default ChartCard;