import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import {
  Home,
  Info,
  AccountBalance,
  Settings,
  TrendingUp,
  Logout,
} from '@mui/icons-material';

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const menuItems = [
    { path: '/', icon: <Home />, text: 'Dashboard' },
    { path: '/investments', icon: <AccountBalance />, text: 'Investments' },
    { path: '/about', icon: <Info />, text: 'About' },
    { path: '/settings', icon: <Settings />, text: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
        },
      }}
    >
      {/* User Profile Section */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          {user?.email?.[0]?.toUpperCase() || 'U'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">
            {user?.email || 'User'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Portfolio Manager
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item.path}
            onClick={onClose}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Logout Section */}
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.lighter',
            },
          }}
        >
          <ListItemIcon>
            <Logout sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;