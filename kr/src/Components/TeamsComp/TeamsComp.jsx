import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { fetchTeams } from "../../http/teamsAPI";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "@mui/material";

export default function TeamsComp() {
    const [teams, setTeams] = useState([]);
    const [open, setOpen] = useState(false); // State for modal visibility
    const [teamName, setTeamName] = useState(""); // State for team name input
    const [createTeamLoading, setCreateTeamLoading] = useState(false); // Loading state for create team button


    useEffect(() => {
        const loadTeams = async () => {
            try {
                const loadedTeams = await fetchTeams();
                setTeams(loadedTeams);
            } catch (error) {
                console.error("Error fetching teams:", error);
                setTeams([]);
            }
        };

        loadTeams();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateTeam = async () => {
        setCreateTeamLoading(true); // Set loading state to true
        try {
            const accessToken = localStorage.getItem('token');
            const response = await fetch(process.env.REACT_APP_API_URL+`api/team`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Include Authorization header
                },
                body: JSON.stringify({ TeamName: teamName }),
            });

            if (!response.ok) {
                alert("Something went wrong")
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create team");
            }

            // Refresh the team list after successful creation
            const updatedTeams = await fetchTeams();
            setTeams(updatedTeams);

            handleClose(); // Close the modal
            setTeamName(""); // Reset the team name input
        } catch (error) {
            console.error("Error creating team:", error);
            // Handle error, e.g., display an error message to the user
        } finally {
            setCreateTeamLoading(false); // Set loading state back to false
        }
    };


    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        display:'flex',
        flexDirection:'column',
        alignItems:"center",
        bgcolor: 'rgb(41,41,41)',
        border: '2px solid #000',
        boxShadow: 24,
        color:'white',
        p: 4,
    };

    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: 'center' }}>
           <Box sx={{
                width: "80%",
                display: "flex",
                alignContent: 'center',
                flexWrap: "wrap",
                flexDirection:"column",
                mt: 5,
                mb: 5,
                gap: 2 
            }}>
        <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        {teams.map(team => (
            <Link to={`${team.TeamId}`}>               
            <Box key={team.TeamId} sx={{ 
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: "center",
            }}>
                <img
                    style={{ width: '70%', height: "70%", borderRadius: "15px" }}
                    src={team.TeamImg ? process.env.REACT_APP_API_URL+`${team.TeamImg}` : process.env.REACT_APP_API_URL+`nivea.jpg`}
                    alt={team.TeamName}
                />
                <p style={{ fontSize: 24 }}>{team.TeamName}</p>
            </Box>
            </Link>
        ))}
        </Box>
            <Button onClick={handleOpen} sx={{ width: "10%", alignSelf: "end" }}>
                Create Team
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        Create New Team
                    </Typography>
                    <TextField
                        label="Team Name"
                        variant="outlined"
                        
                        fullWidth
                        margin="normal"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={handleCreateTeam}
                        disabled={createTeamLoading} // Disable button while loading
                    >
                        {createTeamLoading ? "Creating..." : "Create"} {/* Display loading text */}
                    </Button>
                </Box>
            </Modal>
        </Box>
        </Box>
    );
}