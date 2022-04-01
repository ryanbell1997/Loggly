import React from 'react';
import '../../../../scss/tag.scss';

interface Props {
    id: string,
    name: string,
    description: string,
    hourlyRate: number | undefined,
    userId: string,
    backgroundColor: string
}

export default function Tag({id, name, description, hourlyRate, userId, backgroundColor}: Props){
 


    return (
        <div className="tag" style={{ backgroundColor: backgroundColor }}>
            <div>
                <h4>{name}</h4>
                {hourlyRate !== undefined && hourlyRate > 0 ? <p>{hourlyRate}</p> : ""}
                <p style={{display:"none"}}>{userId}</p>
                <p style={{display:"none"}}>{id}</p>
            </div>
        </div>
    )
}