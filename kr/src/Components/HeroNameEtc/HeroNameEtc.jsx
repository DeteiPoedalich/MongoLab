import { useEffect, useState } from 'react';
import Facets from "../Facets/Facets"
import "./HeroNameEtc.css"
import {Box,Typography} from "@mui/material"

const HeroNameEtc = ({heroId}) => {
    const [hero, setHero] = useState(null);  // Состояние для данных героя
    const [loading, setLoading] = useState(true);  // Состояние загрузки
    const [error, setError] = useState(null);  // Состояние ошибки
    useEffect(() => {
        if (!heroId) { 
            console.error('Hero is not provided');
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const loadedHero = await fetch(process.env.REACT_APP_API_URL+`api/heroes/${heroId}`);
                const data = await loadedHero.json();  
                setHero(data);  // Устанавливаем данные героя в состояние
            } catch (error) {
                console.error("Ошибка при загрузке героя:", error);
                setError("Не удалось загрузить данные о герое"); 
            } finally {
                setLoading(false);  // Завершаем загрузку
            }
        };
            fetchData();  // Запрашиваем данные только если heroId есть
    }, [heroId]);  // Эффект срабатывает при изменении heroId
    if (loading) return <div>Loading...</div>;  // Отображаем индикатор загрузки
    if (error) return <div>{error}</div>;  // Отображаем ошибку, если она произошла
    if (!hero) return <div>Hero not found</div>;  // Если данных нет, отображаем ошибку
    let fileName;
    if(hero.Attribute==="Strength"){
        fileName=process.env.REACT_APP_API_URL+"hero_strength.png"
    }
    else if(hero.Attribute==="Agility"){
        fileName=process.env.REACT_APP_API_URL+"hero_agility.png"
    }
    else if(hero.Attribute==="Intelligence"){
        fileName=process.env.REACT_APP_API_URL+"hero_intelligence.png"
    }
    else if(hero.Attribute==="Universal"){
        fileName=process.env.REACT_APP_API_URL+"hero_universal.png"
    }
    let HeroDifficulty1,HeroDifficulty2,HeroDifficulty3
    if(hero.Difficulty===1){
        HeroDifficulty1=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty2=process.env.REACT_APP_API_URL+"Frame_117.png"
        HeroDifficulty3=process.env.REACT_APP_API_URL+"Frame_117.png"
    }
    else if(hero.Difficulty===2){
        HeroDifficulty1=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty2=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty3=process.env.REACT_APP_API_URL+"Frame_117.png"
    }
    else if(hero.Difficulty===3){
        HeroDifficulty1=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty2=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty3=process.env.REACT_APP_API_URL+"Rectangle_1.png"
    }

    let AttackTypeImg
    if(hero.AttackType==="Melee")
    {
        AttackTypeImg=process.env.REACT_APP_API_URL+"melee.svg"
    }
    else{
        AttackTypeImg=process.env.REACT_APP_API_URL+"ranged.svg"
    }

    return (
        <Box sx={{mt: "1%",width:"100%"}}>
            <Box sx={{display: "flex",flexDirection:{xs:"column",sm:"column",md:"row",lg:"row"},alignItems:{xs:"center",sm:"center"}}}>
                <Box sx={{display: "flex",flexDirection: "column",gap:"5%",width:{xs:"100%",sm:"80%",md:"50%",lg:"50%"}, ml: {xs:0,sm:0,md:0,lg:"5em"},}}>
                    <Typography variant='h1' sx={{fontSize: {xs:"48px",sm:"72px"},fontWeight:600,color: "white",margin: "0 0 0 5%"}}>{hero.HeroName}</Typography>
                    <Box sx={{display: "flex",alignItems: "center",gap:"0.5%",ml: "0.5em"}}>
                        <img className='AttributeImg' src={fileName} alt="" />
                        <Box className='difficulty'>
                            <img src={HeroDifficulty1} alt="" />
                            <img src={HeroDifficulty2} alt="" />
                            <img src={HeroDifficulty3} alt="" />
                        </Box>
                        <Box className='attacktype'>
                            <Typography>Attack Type: </Typography>
                            <img src={AttackTypeImg} alt="" />
                        </Box>
                    </Box>
                    <Facets heroId={parseInt(heroId)}/>
                </Box>
                <Box sx={{display: "flex",mt: "5em",width: {xs:"100%",sm:"90%",md:"50%",lg:"50%"}}}>
                    <Box sx={{display: "flex",flexDirection: "column",gap:"1em",padding: "0.5em 2em 2em 0",borderBottom: "1px solid rgb(92, 0, 0)",borderTop: "1px solid rgb(92, 0, 0)"}}>                    
                        <Box >
                            <Typography sx={{fontSize: "12px",margin:"0 0 0.3em 0.2em" }}>STRENGTH</Typography>
                            <Box className='stat'>
                                <img src={process.env.REACT_APP_API_URL+"hero_strength.png"} alt="" />
                                <Typography>{hero.Strength}+{hero.StrengthPlus}</Typography>   
                            </Box>
                        </Box>
                        <Box >
                            <Typography  sx={{fontSize: "12px",margin:"0 0 0.3em 0.2em" }}>AGILITY</Typography>
                            <Box className='stat'>
                                <img src={process.env.REACT_APP_API_URL+"hero_agility.png"} alt="" />
                                <Typography>{hero.Agility}+{hero.AgilityPlus}</Typography>
                            </Box>
                            
                        </Box>            
                        <Box>
                            <Typography  sx={{fontSize: "12px",margin:"0 0 0.3em 0.2em" }}>INTELLIGENCE</Typography>
                            <Box className='stat'>
                                <img src={process.env.REACT_APP_API_URL+"hero_intelligence.png"} alt="" />
                                <Typography>{hero.Intelligence}+{hero.IntelligencePlus}</Typography>
                            </Box>
                            
                        </Box>                      
                    </Box>
                    <Box sx={{display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",width: "100%",borderTop: "1px solid rgb(92, 0, 0)",borderBottom: "1px solid rgb(92, 0, 0)",borderLeft: "1px solid rgb(92, 0, 0)"}}>
                        <Typography className='healttext'>Health</Typography>
                        <Box sx={{backgroundColor: "rgb(18, 158, 0)",width: "50%",height: "15%",borderRadius: "30px",display: "flex",alignItems: "center",justifyContent: "center"}}>
                            <Typography>{hero.Health}</Typography>
                            <Typography className='healthplus'>+{hero.HealthPlus}</Typography>
                        </Box>
                        <Typography className='healttext'>Mana</Typography>
                        <Box sx={{backgroundColor: "rgb(3, 0, 158)",width: "50%",height: "15%",borderRadius: "30px",display: "flex",alignItems: "center",justifyContent: "center"}}>
                            <Typography>{hero.Mana}</Typography>
                            <Typography className='healthplus'>+{hero.ManaPlus}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HeroNameEtc;
