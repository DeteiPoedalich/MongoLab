import HeaderComp from "../../Components/HeaderComp/HeaderComp";
import MatchInfo from "../../Components/MatchInfo/MatchInfo";
import { useParams } from 'react-router-dom'; // Import useParams
import Footer from '../../Components/Footer/Footer'

function Match() {
    const { matchId } = useParams();
    console.log(matchId)
    return(
        <>
            <HeaderComp/>
            <MatchInfo/>
            <Footer/>
        </>
    )
}
export default Match