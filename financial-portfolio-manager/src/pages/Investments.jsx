import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography,
  Tab,
  Tabs,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Container,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from '../components/SideBar';

const InvestmentAnalytics = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const investments = useSelector((state) => state.portfolio.investments);
  
  // Generate mock historical data
  const generateHistoricalData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => {
      const baseValue = 10000;
      const growth = 1 + (index * 0.05);
      return {
        month,
        totalValue: baseValue * growth,
        stocks: (baseValue * growth * 0.6),
        crypto: (baseValue * growth * 0.4),
        growth: (growth - 1) * 100
      };
    });
  };

  const historicalData = generateHistoricalData();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
            Investment Analytics
          </Typography>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>U</Avatar>
        </Toolbar>
      </AppBar>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Portfolio Growth" />
            <Tab label="Asset Distribution" />
            <Tab label="Performance Metrics" />
          </Tabs>
        </Box>

        <Grid container spacing={4}>
          {activeTab === 0 && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 4 }}>Portfolio Value Over Time</Typography>
                  <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="stocks" 
                          stackId="1"
                          stroke="#2196f3" 
                          fill="#2196f3" 
                          fillOpacity={0.6}
                          name="Stocks"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="crypto" 
                          stackId="1"
                          stroke="#f50057" 
                          fill="#f50057" 
                          fillOpacity={0.6}
                          name="Crypto"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 4 }}>Asset Distribution Over Time</Typography>
                  <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="stocks" 
                          stackId="a" 
                          fill="#2196f3" 
                          name="Stocks"
                        />
                        <Bar 
                          dataKey="crypto" 
                          stackId="a" 
                          fill="#f50057" 
                          name="Crypto"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 4 }}>Monthly Growth Rate</Typography>
                  <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="growth" 
                          stroke="#4caf50" 
                          strokeWidth={2}
                          name="Growth Rate (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default InvestmentAnalytics;