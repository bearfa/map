import React from 'react';

const SpeedCard = (props) => {
    return(
        <div className="col-md-3">
            <div className="text-center top-card">
                {props.title}
            </div>
            <div className="top-card-text text-center">
                {props.data} Mbps
            </div>                        
        </div>
    )
}
export default SpeedCard;