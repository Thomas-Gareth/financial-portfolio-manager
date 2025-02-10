// pages/About.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, GitHub, LinkedIn } from '@mui/icons-material';
import Sidebar from '../components/SideBar';

function About() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

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
            About Portfolio Manager
          </Typography>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>U</Avatar>
        </Toolbar>
      </AppBar>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Financial Portfolio Manager
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to the Financial Portfolio Manager, a modern solution for tracking and managing your investment portfolio. This application helps you monitor your stocks and cryptocurrency investments in one place.
              </Typography>
              
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Key Features
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Portfolio Tracking
                      </Typography>
                      <Typography variant="body2">
                        Monitor your investments in real-time with automatic price updates and portfolio valuation.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Risk Analysis
                      </Typography>
                      <Typography variant="body2">
                        Advanced risk metrics including volatility, beta, and Sharpe ratio calculations.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Asset Distribution
                      </Typography>
                      <Typography variant="body2">
                        Visual representation of your portfolio distribution across different asset classes.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Technology Stack
              </Typography>
              <Typography variant="body1" paragraph>
                Built with React, Material-UI, and Redux for state management. Real-time data fetching from Alpha Vantage and CoinGecko APIs.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;