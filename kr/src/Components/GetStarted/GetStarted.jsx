import '../GetStarted/GetStarted.css';
import Button from "../../MUI components/button.jsx"
import { Link } from 'react-router-dom';

export default function  GetStarted(){    

    return(
        <div className='GetStarted'>
            <p className='GetStartedName'>Dota 2 Helper</p>
            <p className='GetStartedText'>Your trusted companion in the world of Dota 2! On our website, you will find helpful guides,
             tips to enhance your gameplay in this thrilling multiplayer game. Receive recommendations, study best practices,
             keep up with the meta-game, and upgrade your skills with Dota 2 Helper.
             Immerse yourself in the world of Dota 2 with us and reach new heights in your gaming journey!</p>
             <Link className='LinkStart' to="/login"><Button text="Get Started" color ="#ff00006c" className1="GetStartedBut" className2="GetStartedBut1"/></Link>
            
        </div>
    )
}