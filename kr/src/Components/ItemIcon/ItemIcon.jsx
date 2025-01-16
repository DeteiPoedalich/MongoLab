import './ItemIcon.css';
import React, { useState } from 'react';

export default function ItemIcon(props) {
    const { item } = props;
    const imageUrl = process.env.REACT_APP_API_URL+`${item.ItemImg}`; // Формирование URL
    const [isShown, setIsShown] = useState(false);
    return (
        <div>
            {isShown && (
                <div className='OnHover' onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                    <div className='Hover'>
                        <img className='HoverImg' src={imageUrl} alt="" />
                        <p>{item.ItemName}</p>
                    </div>
                    <div className='Hover-description'>
                        <p>{item.ItemDescription}</p>
                    </div>
                </div>
      )}
        
            <div className='ItemIcon'onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
                <img className='image' src={imageUrl} alt={item.ItemName} />
            </div>
        </div>
    );
}