import React, { useState } from 'react';
import "../Facets/Facets.css"

const Facet = ({ color,text,description }) => {
    const [isShown, setIsShown] = useState(false);
    return(
    <div className='hujiokp'>
        {isShown && (
                <div style={{ backgroundColor: color }} className='OnHover' onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                    <div className='Hover'>
                        <p style={{marginLeft:"5px"}}>{text}</p>
                    </div>
                    <div className='Hover-description'>
                        <p>{description}</p>
                    </div>
                </div>
      )}
        <div style={{ backgroundColor: color }} className="facet"onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
            <h3>{text}</h3>                         
            {/* <p>{description}</p> */}
        </div>
    </div>
    )
}
export default Facet