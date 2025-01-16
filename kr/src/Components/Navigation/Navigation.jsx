import '../Navigation/Navigation.css';
import Button from "../../MUI components/button.jsx"
import { Link } from 'react-router-dom';

export default function  Navigation(){    

    return(
        <div className='Navigation'>
            <Link className='LinkMar' to="/heroes"><Button text="Heroes" color ="#393939" className1="navbut" className2="navbut1"/></Link>
            <Link className='LinkMar' to="/teams"><Button text="Teams" color ="#393939" className1="navbut" className2="navbut1"/></Link>
            <Link className='LinkMar' to="/items"><Button text="Items" color ="#393939" className1="navbut" className2="navbut1"/></Link>
        </div>
    )
}