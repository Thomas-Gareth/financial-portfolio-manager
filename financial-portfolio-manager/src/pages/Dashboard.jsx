// Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TrendingUp,
  Timeline,
  Menu as MenuIcon,
  Notifications,
  AttachMoney,
  ShowChart,
  PieChart as PieChartIcon,
  Assessment
} from '@mui/icons-material';
import { PieChart, LineChart, Line, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import InvestmentForm from '../components/InvestmentForm';
import InvestmentList from '../components/InvestmentList';
import RiskMetrics from '../components/RiskMetric';
import { getPortfolioRiskMetrics } from '../services/riskAnalysisService';

// Styled components remain the same
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
  },
}));

function Dashboard() {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  const investments = useSelector((state) => state.portfolio.investments);
  const totalValue = useSelector((state) => state.portfolio.totalValue);

  // Calculate stats
  const totalStocks = investments.filter(inv => inv.type === 'Stock').length;
  const totalCrypto = investments.filter(inv => inv.type === 'Crypto').length;

  // Calculate risk metrics
  const riskMetrics = React.useMemo(() => 
    getPortfolioRiskMetrics(investments),
    [investments]
  );

  // Prepare data for charts
  const pieData = [
    { name: 'Stocks', value: totalStocks },
    { name: 'Crypto', value: totalCrypto },
  ];
  
  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  // Mock performance data
  const performanceData = [
    { month: 'Jan', value: totalValue * 0.9 },
    { month: 'Feb', value: totalValue * 0.95 },
    { month: 'Mar', value: totalValue * 0.97 },
    { month: 'Apr', value: totalValue },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* App Bar - remains the same */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Financial Portfolio Manager
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              px: 2,
              py: 1,
              borderRadius: 1
            }}>
              <AttachMoney />
              <Typography variant="subtitle1">
                ${totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>U</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={4}>
            <StatsCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShowChart sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Total Assets</Typography>
                    <Typography variant="h4">{investments.length}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PieChartIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Stocks/Crypto Split</Typography>
                    <Typography variant="h4">{totalStocks}/{totalCrypto}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Assessment sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Risk Level</Typography>
                    <Typography variant="h4">{riskMetrics.riskLevel}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </StatsCard>
          </Grid>

          {/* Risk Metrics Section */}
          <Grid item xs={12}>
            <RiskMetrics metrics={riskMetrics} />
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="portfolio tabs"
              >
                <Tab label="Investments" />
                <Tab label="Performance" />
              </Tabs>
              <Box sx={{ mt: 2 }}>
                {tabValue === 0 && (
                  <Box>
                    <InvestmentList />
                  </Box>
                )}
                {tabValue === 1 && (
                  <Box sx={{ height: 400, pt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={theme.palette.primary.main} 
                          strokeWidth={2}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Side Panel */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledCard>
                  <CardHeader title="Asset Distribution" />
                  <CardContent>
                    <Box sx={{ height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12}>
                <StyledCard>
                  <CardHeader 
                    title="Add Investment" 
                    titleTypographyProps={{ variant: 'h6' }}
                  />
                  <CardContent>
                    <InvestmentForm />
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;