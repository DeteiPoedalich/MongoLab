import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // useParams removed as you're passing userId directly
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchTeam } from '../../http/teamsAPI';
import { getProfile } from '../../http/userAPI';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GetTeamsinProf({ userId }) { // Receive userId as a prop
    const location = useLocation();
    const { isLoggedIn } = location.state || {};
    const [user, setUser] = useState(null);
    const [teamIds, setTeamIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);
// Log the received userId

useEffect(() => {
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL+`api/user/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                console.log(response.data.Avatar)
                setUser(response.data); // Ensure this contains user data
            } catch (error) {
                console.error('Error fetching user data:', error);              
            }
        } else {
            setUser(null);
        }
    };
    fetchUserData();
}, []);

    useEffect(() => {
        if (user && user.TeamList) {
            try {
                const array = user.TeamList.split(" ").map(Number);
                setTeamIds(array);
            } catch (err) {
                console.error('Error processing TeamList:', err);
                setTeamIds([]);
            }
        }
    }, [user]);
    useEffect(() => {
        const fetchTeamDetails = async () => {
            if (teamIds.length > 0) {
                console.log("Fetching details for team IDs:", teamIds); // Log the IDs being fetched
                setTeams([]); // Clear teams before fetching
                try {
                    const fetchedTeams = await Promise.all(
                        teamIds.map(teamId => fetchTeam(teamId))
                    );
                    console.log("Fetched Teams (before filter):", fetchedTeams); // Log before filtering
                    const validTeams = fetchedTeams;
                    console.log("Valid Teams:", validTeams); // Log after filtering
                    setTeams(validTeams);
                } catch (error) {
                    console.error("Error fetching team details:", error);
                    console.error("Full error object:", error); // Log the full error object
                    setTeams([]);
                }
            } else {
                console.log("Team IDs array is empty."); // Log if no team IDs are found
                setTeams([]);
            }
        };
    
        fetchTeamDetails();
    }, [teamIds]); // Add user as a dependency

    console.log(teams)


    if (teams.length === 0 && teamIds.length > 0) { // Check for no teams AFTER loading is done
        return <div>No teams found for this user.</div>
    }
    
    console.log("Received userId:", user); 
    console.log(teams)
// ,borderRight:'1px solid rgb(109, 0, 0)',borderBottom:'1px solid rgb(109, 0, 0)'
return (
    <Box sx={{ pt: { xs: 0, sm: 5 }, pl: { xs: 0, sm: 5 }, width: { xs: '100%', sm: '25em' }, height: '70%' }}>
  <Typography variant="h6" sx={{ fontSize: { xs: '24px', sm: '36px' }, color: 'white', ml: 2 ,textAlign:{xs:"center"},}}>
    Teams played in
  </Typography>
  {teams.map((team, index) => (
    <Link key={team.TeamId || index} to={`/teams/${team.TeamId}`}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:{xs:"center",sm:"initial"},
          width: { xs: '90%', sm: '20em' },
          mt: 2,
          mb: 2,
        }}
      >
        <Avatar
          alt={`${team.TeamName} Avatar`}
          src={process.env.REACT_APP_API_URL + (team.TeamImg || 'nivea.jpg')}
          sx={{ width: { xs: 80, sm: 100 }, height: { xs: 80, sm: 100 } }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '18px', sm: '24px' },
            color: 'white',
            ml: 2,
          }}
        >
          {team.TeamName}
        </Typography>
      </Box>
    </Link>
  ))}
</Box>


);
}

export default GetTeamsinProf;