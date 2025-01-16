import HeaderComp from '../../Components/HeaderComp/HeaderComp'
import HeroByAttribute from '../../Components/HeroByAttribute/HeroByAttribute'
import Footer from '../../Components/Footer/Footer'
import "./Heroes.css"

export default function Heroes(){
    return(
        <>
            <HeaderComp />
            <div className='AllHeroes'>
                <HeroByAttribute text="STRENGTH" img={process.env.REACT_APP_API_URL+"hero_strength.png"}/>
                <HeroByAttribute text="AGILITY" img={process.env.REACT_APP_API_URL+"hero_agility.png"}/>
                <HeroByAttribute text="INTELLIGENCE" img={process.env.REACT_APP_API_URL+"hero_intelligence.png"}/>
                <HeroByAttribute text="UNIVERSAL" img={process.env.REACT_APP_API_URL+"hero_universal.png"}/>
            </div>
            <Footer/>
        </>
    )
}