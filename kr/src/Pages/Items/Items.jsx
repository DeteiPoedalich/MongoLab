import HeaderComp from '../../Components/HeaderComp/HeaderComp'
import ItemPanel from '../../Components/ItemPanel/ItemPanel'
import Navigation from '../../Components/Navigation/Navigation'
import Footer from '../../Components/Footer/Footer'
import "./Items.css"

export default function Items(){
    return(
        <>
            <HeaderComp />
            <div className='AllItems'>
                <Navigation/>
                <div className='Panels'>
                    <ItemPanel text="BASICS"/>
                    <ItemPanel text="UPGRADES"/>
                    <ItemPanel text="NEUTRAL ITEMS"/>
                </div>
            </div>
            <Footer/>
        </>
    )
}