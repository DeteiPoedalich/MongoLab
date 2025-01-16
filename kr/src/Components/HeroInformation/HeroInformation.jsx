
import HeroNameEtc from "../HeroNameEtc/HeroNameEtc";
import { useParams } from 'react-router-dom';
import Skills from "../Skills/Skills"
import SkillBuild from "../SkillBuild/SkillBuild";
import ItemBuild from "../ItemBuild/ItemBuild";
import HeroReport from '../HeroReport/HeroReport';
import Box from '@mui/material/Box';

export default function HeroInfomation(){
    const { HeroId } = useParams();
    console.log('Hero ID from URL:', HeroId); 
    return(
        <>           
            <Box sx={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>
                <HeroNameEtc heroId={parseInt(HeroId)}/>
                <Skills heroId={parseInt(HeroId)} className1="SkillsForDisplay" className2="SkillForDisplay"/>
                <SkillBuild buildId={parseInt(HeroId)}/> 
                <HeroReport heroId={HeroId}/>               
            </Box>
        </>
    )
}