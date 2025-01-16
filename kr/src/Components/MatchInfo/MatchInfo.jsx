import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchSomePIM } from "../../http/pimAPI";
import { Box, Typography,Divider  } from "@mui/material";
import axios from 'axios'; // Import axios
import ItemBuild from "../ItemBuild/ItemBuild";


function MatchInfo() {
    const { matchId } = useParams();
    const [players, setPlayers] = useState([]); // Use an array for players
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                if (!matchId) {
                    console.error("matchId is undefined. Cannot fetch match details.");
                    setIsLoading(false);
                    return;
                }

                const fetchedPlayers = await fetchSomePIM(matchId);
                setPlayers(fetchedPlayers);

                // Fetch hero details for each player *after* fetching players
                const playerWithHeroDetails = await Promise.all(
                    fetchedPlayers.map(async (player) => {
                        try {
                            const heroResponse = await axios.get(process.env.REACT_APP_API_URL+`api/heroes/${player.HeroId}`); // Use player.HeroId
                            return { ...player, hero: heroResponse.data };
                        } catch (heroError) {
                            console.error(`Error fetching hero details for player ${player.PlayerName}:`, heroError);
                            // Handle the error, e.g., set a default hero or return the player without hero details
                            return { ...player, hero: null }; // Or some error indicator
                        }
                    })
                );

                setPlayers(playerWithHeroDetails); // Update players state with hero details


            } catch (error) {
                console.error("Error fetching match details:", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatchDetails();

    }, [matchId]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!players || players.length === 0) {
        return <div>No players found for this match.</div>;
    }

    const radiantPlayers = players.filter(player => player.Side === "Radiant");
    const direPlayers = players.filter(player => player.Side === "Dire");

    const renderPlayerRow = (player) => (
        <Box key={player.id} sx={{
            display: {xs:"flex",sm:"grid"},
            gridTemplateColumns:{sm:"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr",md:"0.2fr 0.5fr 0.05fr 0.05fr 0.05fr 1fr",lg:"0.2fr 0.5fr 0.05fr 0.05fr 0.05fr 1fr"},
            gridAutoRows: "auto",
            backgroundColor: "#4E4E4E",
            alignItems: "center",
            pl: 1,
            flexWrap:{xs:"wrap"},
            width: "70%"
        }}>
            {player.hero ? (
                <>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img style={{ width: '97px', height: '55px' }} src={process.env.REACT_APP_API_URL+`${player.hero.HeroImg}`} alt="" />
                    </Box>
                    <Box sx={{ pl: 2 }}>
                        <Typography sx={{ fontSize: 32, m: 0 }}>{player.PlayerName}</Typography>
                        <Typography>{player.hero.HeroName}</Typography>
                    </Box>
                    <Box sx={{pl:1, display:"flex",flexDirection:{xs:"row",sm:"column"},alignItems:"center"}}>
                                 <Typography sx={{fontSize:24,m:0}}>K</Typography>
                                 <Typography sx={{fontSize:24,m:0}}>{player.Kills}</Typography> {/* Access HeroName */}
                    </Box>
                    <Box sx={{pl:1, display:"flex",flexDirection:{xs:"row",sm:"column"},alignItems:"center"}}>
                                 <Typography sx={{fontSize:24,m:0}}>D</Typography>
                                 <Typography sx={{fontSize:24,m:0}}>{player.Deaths}</Typography> {/* Access HeroName */}
                    </Box>
                    <Box sx={{pl:1, display:"flex",flexDirection:{xs:"row",sm:"column"},alignItems:"center"}}>
                                 <Typography sx={{fontSize:24,m:0}}>A</Typography>
                                 <Typography sx={{fontSize:24,m:0}}>{player.Assists}</Typography> {/* Access HeroName */}
                    </Box>
                    <Box sx={{pl:10, display:{xs:"none",sm:"none",md:'flex',lg:"flex"},alignItems:"center",flexDirection:"row"}}>
                             <ItemBuild  buildId={player.hero.BuildId}/>
                             <Box sx={{borderRadius:"50px",width:"40px",height:"40px",backgroundColor:"#343434",ml:2}}></Box>
                    </Box>
                </>
            ) : (
                <Box>
                    <Typography>{player.PlayerName}</Typography>
                    <Typography>Hero not found</Typography>
                </Box>
            )}
        </Box>
    );
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em", alignItems: "center" }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Radiant</Typography>
            {radiantPlayers.map(renderPlayerRow)}
            <Typography variant="h5" sx={{ mb: 1 }}>Dire</Typography>
            {direPlayers.map(renderPlayerRow)}
        </Box>
    );
}
export default MatchInfo;