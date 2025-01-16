import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [avatarUrl, setAvatarUrl] = React.useState('');
    const [currentUser, setCurrentUser]=React.useState('') // State for avatar URL
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (route, state = {}) => {
        if (!currentUser) {
            console.warn('User data not yet loaded');
            return;
        }
        handleCloseUserMenu();
        navigate(route, { state });
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        setIsLoggedIn(false);
        setAvatarUrl('');
        handleCloseUserMenu();
        navigate('/')
    };

    React.useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            let userId
            if (token) {
                try {
                    const response = await axios.get(process.env.REACT_APP_API_URL+`api/user/profile/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setIsLoggedIn(true);
                    console.log(response.data.Avatar)
                    setAvatarUrl(process.env.REACT_APP_API_URL+`sema.jpg`);
                    setCurrentUser(response.data); // Ensure this contains user data
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsLoggedIn(false);
                    setAvatarUrl('');
                    setCurrentUser(null); 
                }
            } else {
                setIsLoggedIn(false);
                setAvatarUrl('');
                setCurrentUser(null);
            }
        };
        fetchUserData();
    }, []);

    // Dynamic settings based on login state
    const settings = isLoggedIn
    ? [
          {
              name: 'Profile',
              action: () => handleMenuClick('/profile', { avatarUrl, isLoggedIn, currentUser }),
          },
          { name: 'Log Out', action: handleLogout },
      ]
    : [{ name: 'Log In', action: () => handleMenuClick('/login') }];

    return (
        <div>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                            alt="User Avatar"
                            src={avatarUrl} // Default placeholder if no avatar
                        />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting.name} onClick={setting.action}>
                            <Typography sx={{ textAlign: 'center', color: 'black' }}>
                                {setting.name}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </div>
    );
}

export default ResponsiveAppBar;
