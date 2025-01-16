import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeroIcon from "../HeroIcon/HeroIcon";
import { fetchHeroById } from "../../http/heroesAPI";
import "./MatchInProf.css"

function MatchInprof({ match }) {
    const [hero, setHero] = useState(null); // Initialize hero as null

    useEffect(() => {
        const fetchHero = async () => {
            try {
                if (match && match.HeroId) { // Check if match and HeroId exist
                    const loadedHero = await fetchHeroById(match.HeroId);
                    setHero(loadedHero);
                }
            } catch (error) {
                console.error("Error fetching hero:", error);
            }
        };

        fetchHero();
    }, [match]); // match is the dependency

    if (!hero) { // Conditionally render HeroIcon
      return <div>Loading hero...</div>;
    }

    let imgUrl=process.env.REACT_APP_API_URL+`${hero.HeroImg}`
    return (
        <Box 
  key={match.id} 
  sx={{ 
    p: 2, 
    width: { xs: "40%", sm: "80%", md: "100%", lg: "100%" }, 
    backgroundColor: "darkgray", 
    display: "flex", 
    alignSelf:"center",
    flexDirection: { xs: "column", sm: "row" }, 
    justifyContent: "space-between", 
    flexWrap:"wrap",
    alignItems: "center",
    borderLeft: { xs: 'none', sm: '1px solid gray' }
  }}
>
  <Box 
    sx={{ 
      display: "flex", 
      flexDirection: { xs: "column", sm: "row" }, 
      gap: { xs: "1em", sm: "10em", md: "20em" }, 
      alignItems: "center" 
    }}
  >
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" }, 
        gap: "1em", 
        alignItems: "center" 
      }}
    >
      <img 
        className='heroimg' 
        src={imgUrl} 
        alt="" 
      />
      <Typography 
        sx={{ 
          fontSize: { xs: 16, sm: 20, md: 30 }, 
          textAlign: { xs: "center", sm: "left" } 
        }}
      >
        {hero.HeroName}
      </Typography>
    </Box>
  </Box>
  <Typography 
    sx={{ 
      fontSize: { xs: 16, sm: 20, md: 30 }, 
      marginTop: { xs: "1em", sm: "0" }, 
      textAlign: { xs: "center", sm: "right" } 
    }}
  >
    Result: Won
  </Typography>
</Box>



    );
}

export default MatchInprof;