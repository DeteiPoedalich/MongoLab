import '../HeroIcon/HeroIcon.css';
import { useState } from 'react';

export default function HeroIcon(props) {
    const { hero } = props;
    const imageUrl = process.env.REACT_APP_API_URL+`${hero.HeroImg}`; // Формирование URL
    const [isShown, setIsShown] = useState(false);

    return (
        <div>
            {isShown && (
                <div className='HeroOnHover' onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                    <div className='HeroHover'>
                        <img className='HeroHoverImg' src={imageUrl} alt="" />
                        <p>{hero.HeroName}</p>
                    </div>
                </div>
      )}
            <div className='HeroIcon'onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
                <img src={imageUrl} alt={hero.HeroName} />
            </div>
        </div>
    );
}