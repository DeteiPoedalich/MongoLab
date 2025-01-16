import '../HeaderComp/Header.css';
import Search from "../../MUI components/Search.jsx"
import { Link } from 'react-router-dom';
import Asd from '../../MUI components/as.jsx'

export default function  HeaderComp(){    
    return(
        <header>
            <Link className='headerName' to ="/"><img  src="http://localhost:5000/D2H.png" alt="" /></Link>               
                <div className='Header_div'>
                    <Asd/>              
                </div>
            </header>
    )
}