import React, { useState, useEffect } from 'react';
import HeaderComp from "../../Components/HeaderComp/HeaderComp"
import Footer from "../../Components/Footer/Footer"
import axios from 'axios';
import { TextField, Button, Grid2, Box, Typography, Autocomplete, CircularProgress, MenuItem } from '@mui/material';

const AddMatchPage = () => {
    const [players, setPlayers] = useState(Array(10).fill({
        User_Id: null, PlayerName: 'Anonymous', HeroId: null, Kills: null, Deaths: null, Assists: null,
        ItemId1: null, ItemId2: null, ItemId3: null, ItemId4: null, ItemId5: null, ItemId6: null,
        NeutralSlotId: null, MatchMatchId: null, Side: '' 
    }));
    const [heroes, setHeroes] = useState([]);
    const [loadingHeroes, setLoadingHeroes] = useState(true);
    const [matchCreated, setMatchCreated] = useState(false);
    const [error, setError] = useState(null);
    const [matchData, setMatchData] = useState({});
    const [matchId,setMatchId]= useState() // Инициализация matchData

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL+'api/heroes'); // Replace with your heroes API endpoint
                setHeroes(response.data);
            } catch (error) {
                console.error("Error fetching heroes:", error);
                setError("Failed to load heroes.");
            } finally {
                setLoadingHeroes(false);
            }
        };
        fetchHeroes();
    }, []);

    const handlePlayerChange = (index, field, value) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player, i) =>
                i === index ? { ...player, [field]: value } : player
            )
        );
    
        if (field === 'PlayerName') {
            findUserId(index, value);
        }
    };
    
    const findUserId = async (index, playerName) => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL+`api/user?NickName=${playerName}`);
            console.log(response);
            if (response.data && response.data.length > 0) {
                setPlayers((prevPlayers) =>
                    prevPlayers.map((player, i) =>
                        i === index ? { ...player, User_Id: response.data[0].UserId } : player
                    )
                );
            } else {
                console.warn(`User ${playerName} not found.`);
            }
        } catch (error) {
            console.error("Error finding user ID:", error);
        }
    };
    
    const handleHeroChange = (index, heroName) => {
        const selectedHero = heroes.find(hero => hero.HeroName === heroName);
        if (selectedHero) {
            setPlayers((prevPlayers) =>
                prevPlayers.map((player, i) =>
                    i === index ? { ...player, HeroId: selectedHero.HeroId } : player
                )
            );
        } else {
            console.warn(`Hero ${heroName} not found.`);
        }
    };

    const handleSubmit = async () => {
        setError(null);

        for (const player of players) {
            if (!player.HeroId) {
                setError(`Player ${player.PlayerName} is missing User_Id or HeroId.`);
                return;
            }
        }

        try {
            const playerPromises = players.map(playerData =>
                axios.post(process.env.REACT_APP_API_URL+'api/playerinmatch', {
                    ...playerData, // Передаем всю структуру, включая MatchMatchId
                })
            );
            const playerResponses = await Promise.all(playerPromises);
            const playerIds = await playerResponses.map(response => response.data.PlayerId);

            console.log("Player IDs:", playerIds); // Логирование playerIds

            setMatchData({
                PlayerId1: playerIds[0], PlayerId2: playerIds[1], PlayerId3: playerIds[2],
                PlayerId4: playerIds[3], PlayerId5: playerIds[4],
                PlayerId6: playerIds[5], PlayerId7: playerIds[6], PlayerId8: playerIds[7],
                PlayerId9: playerIds[8], PlayerId10: playerIds[9] // Укажите ID матча, который вам нужен
            });

            console.log("Match data to send:", matchData); // Логирование данных матча

            const response=await axios.post(process.env.REACT_APP_API_URL+'api/match', {PlayerId1: playerIds[0], PlayerId2: playerIds[1], PlayerId3: playerIds[2],
                PlayerId4: playerIds[3], PlayerId5: playerIds[4],
                PlayerId6: playerIds[5], PlayerId7: playerIds[6], PlayerId8: playerIds[7],
                PlayerId9: playerIds[8], PlayerId10: playerIds[9]});
            console.log(response.data)
            playerIds.map(playerId =>
                axios.put(process.env.REACT_APP_API_URL+`api/playerinmatch/${playerId}`, { // Передаем всю структуру, включая MatchMatchId
                    MatchMatchId: response.data.MatchId // Используем matchData.id
                })
            );
            setMatchCreated(true);
        } catch (e) {
            setError(e.message);
            console.error("Error creating match:", e);
        }
    };
    if (matchCreated) {
        return <div>Match created successfully!</div>;
    }

    return (
        <>
        <HeaderComp/>
        <Box sx={{ width: "95%", m: 2, p: 0 ,display:"flex",flexDirection:"column",alignItems:'center'}}>
            <Typography variant="h4" sx={{textAlign:"center",mb:2,color:"white"}} gutterBottom>Add Match</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid2 container spacing={1} sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
                {players.map((player, index) => (
                    <Grid2 item xs={12} key={index} sx={{ width: {xs:"99%",sm:"90%",md:"70%",lg:"53%"}, backgroundColor: "rgb(200,200,200)", mb: 1 ,borderRadius:"10px",pt:"5px"}}>
                        <Grid2 container spacing={1} sx={{ width: "100%" , display: "grid", gridTemplateColumns: {xs:"0.5fr 0.5fr 0.5fr",sm:"0.5fr 0.5fr 0.2fr 0.2fr 0.2fr 0.4fr",lg:"0.5fr 0.5fr 0.1fr 0.1fr 0.1fr 0.4fr"}, gridAutoColumns:1}}>
                            <Grid2 item xs={6}>
                                <TextField
                                    label="Player Name"
                                    fullWidth
                                    value={player.PlayerName}
                                    onChange={e => handlePlayerChange(index, 'PlayerName', e.target.value)}
                                />
                            </Grid2>
                            <Grid2 item xs={6}>
                                <Autocomplete
                                    options={heroes.map(hero => hero.HeroName)}
                                    value={heroes.find(hero => hero.HeroId === player.HeroId)?.HeroName || ''}
                                    onChange={(event, newValue) => handleHeroChange(index, newValue)}
                                    loading={loadingHeroes}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Hero"
                                            fullWidth
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loadingHeroes ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid2>
                            <Grid2 item xs={4}>
                                <TextField label="Kills" fullWidth value={player.Kills} onChange={e => handlePlayerChange(index, 'Kills', e.target.value)} />
                            </Grid2>
                            <Grid2 item xs={4}>
                                <TextField label="Deaths" fullWidth value={player.Deaths} onChange={e => handlePlayerChange(index, 'Deaths', e.target.value)} />
                            </Grid2>
                            <Grid2 item xs={4}>
                                <TextField label="Assists" fullWidth value={player.Assists} onChange={e => handlePlayerChange(index, 'Assists', e.target.value)} />
                            </Grid2>
                            <Grid2 item xs={4}>
                                <TextField
                                    select
                                    label="Side"
                                    value={player.Side}
                                    onChange={e => handlePlayerChange(index, 'Side', e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="Radiant">Radiant</MenuItem>
                                    <MenuItem value="Dire">Dire</MenuItem>
                                </TextField>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                ))}
            </Grid2>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1, width: "20%"}}>Create Match</Button>
        </Box>
        <Footer/>
        </>
    );
};

export default AddMatchPage;
