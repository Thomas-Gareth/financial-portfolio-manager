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
  useTheme,
  Divider,
  Button,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  GitHub,
  MonetizationOn,
  Security,
  Analytics,
  Speed,
  Cloud,
  DevicesOther
} from '@mui/icons-material';
import Sidebar from '../components/SideBar';

function About() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const features = [
    {
      icon: <MonetizationOn sx={{ fontSize: 40 }} />,
      title: 'Real-Time Tracking',
      description: 'Monitor your investments with live market data updates and automatic portfolio valuation.'
    },
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: 'Advanced Analytics',
      description: 'Get detailed insights with comprehensive analytics, including performance metrics and trend analysis.'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security and encryption protocols.'
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Risk Analysis',
      description: 'Evaluate your portfolio risk with sophisticated metrics including volatility and Sharpe ratio.'
    }
  ];

  const technologies = [
    'React', 'Redux', 'Material-UI', 'Node.js', 'Express', 'MongoDB',
    'WebSocket', 'REST APIs', 'JWT Auth', 'Docker'
  ];

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
        {/* Hero Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
            borderRadius: 2,
            mb: 4
          }}
        >
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Financial Portfolio Manager
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Your All-in-One Solution for Investment Management
          </Typography>
          
        </Paper>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: theme.palette.primary.light,
                        color: theme.palette.primary.main,
                        mr: 2
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tech Stack Section */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box 
              sx={{ 
                display: 'inline-flex',
                p: 1.5,
                borderRadius: 2,
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                mb: 2
              }}
            >
              <DevicesOther sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h4" gutterBottom>
              Technology Stack
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Built with modern technologies for reliability and performance
            </Typography>
          </Box>
          
          
        </Paper>

        {/* Cloud Infrastructure */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Box 
              sx={{ 
                display: 'inline-flex',
                p: 1.5,
                borderRadius: 2,
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                mb: 2
              }}
            >
              <Cloud sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h5" gutterBottom>
              Cloud-Native Architecture
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Deployed on scalable cloud infrastructure ensuring high availability and performance.
              Our microservices architecture allows for seamless updates and maintenance without disruption.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default About;