import React from 'react';
import '../../scss/tag.scss';

interface Props {
    id: string,
    name: string,
    description: string,
    hourlyRate: number | undefined,
    backgroundColor: string,
    onClick: (...args:any[]) => any
}

export default function Tag({id, name, description, hourlyRate, backgroundColor, onClick}: Props){
 


    return (
        <div className="tag" style={{ backgroundColor: backgroundColor }} onClick={onClick}>
            <div>
                <h4>{name}</h4>
                {/* {hourlyRate !== undefined && hourlyRate > 0 ? <p>{hourlyRate}</p> : ""} */}
                <p style={{display:"none"}}>{id}</p>
            </div>
        </div>
    )
}