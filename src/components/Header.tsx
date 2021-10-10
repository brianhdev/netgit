import React from 'react';

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/system/Box';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';


interface HeaderProps {
  darkMode: boolean,
  toggleDarkMode: () => void
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const theme = useTheme();
  const screenLarge = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontStyle: 'italic', color: grey[100], fontSize: 15}}>
              <Button color="inherit" href="/">
                <img
                  src="/logo.svg"
                  width="70px"
                  alt="innit"
                />
              </Button>
              { screenLarge && `"Your Favorite Company's Git At A Glance"`}
            </Typography>
          </Box>
          <Tooltip title="Toggle Dark/Light Mode" placement="top">
            <IconButton
              size="large"
              color="inherit"
              aria-label="search"
              onClick={() => props.toggleDarkMode()}
            >
              { props.darkMode ? <LightModeIcon /> : <DarkModeIcon /> }
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;