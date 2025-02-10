// pages/Settings.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, DarkMode, LightMode } from '@mui/icons-material';
import Sidebar from '../components/SideBar';

function Settings() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // Theme toggle state and handler
  const [darkMode, setDarkMode] = React.useState(theme.palette.mode === 'dark');

  const handleThemeChange = () => {
    // Get the toggleTheme function from your theme context
    const toggleTheme = window.__toggleTheme;
    if (toggleTheme) {
      toggleTheme();
      setDarkMode(!darkMode);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>U</Avatar>
        </Toolbar>
      </AppBar>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Appearance
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={handleThemeChange}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {darkMode ? <DarkMode /> : <LightMode />}
                    <Typography>
                      {darkMode ? 'Dark Mode' : 'Light Mode'}
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Settings;