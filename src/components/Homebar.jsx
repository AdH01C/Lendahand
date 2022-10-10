import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import {useNavigate} from "react-router-dom";

const HomeBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{background: "white"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            HOME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => navigate("/listingpage")}>
                  <Typography textAlign="center">Discover</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/listingpage/mylistings")}>
                  <Typography textAlign="center">My Listings</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/listingpage/myapplications")}>
                  <Typography textAlign="center">My Applications</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}/>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/*link to twitter */}
                    <TwitterIcon/>
                </IconButton>
              </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/*link to fb */}
                    <FacebookIcon/>
                </IconButton>
              </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/*link to insta */}
                    <InstagramIcon/>
                </IconButton>
              </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/*link to mail */}
                    <MailRoundedIcon/>
                </IconButton>
              </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                //component={Link} to="/about"
                onClick={() => navigate("/signup")}
                sx={{ my: 2, color: 'grey', display: 'block' }}
              >
                Sign up
              </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => navigate("/login")}
                sx={{ my: 2, color: 'grey', display: 'block' }}
              >
                Log in
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HomeBar;
