import { Box, Typography, CircularProgress } from "@mui/material"; // Import CircularProgress
import { fetchTeam } from "../../http/teamsAPI";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // No need for Link here
import TeamComp from "../../Components/TeamComp/TeamComp";
import Footer from '../../Components/Footer/Footer';
import HeaderComp from "../../Components/HeaderComp/HeaderComp";

export default function Team() {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);   // Add error state
    const { TeamId } = useParams();

    useEffect(() => {
        const loadTeam = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const loadedTeam = await fetchTeam(TeamId);
                setTeam(loadedTeam);
            } catch (error) {
                console.error("Error fetching team:", error);
                setError("Failed to load team details.");
                setTeam(null);
            } finally {
                setLoading(false); // Set loading to false after fetch completes (success or fail)
            }
        };

        loadTeam();
    }, [TeamId]); // Add TeamId as a dependency

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress /> {/* Display loading spinner */}
            </Box>
        );
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    if (!team) { // Check if team is null after loading is complete
        return <Typography variant="body1">Team not found.</Typography>;
    }


    return (
        <>
        <HeaderComp/>
        <TeamComp team={team}/>
        <Footer/>
        </>
    );
}