import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { TrendingUp, Speed, ShowChart } from '@mui/icons-material';

const MetricCard = ({ title, value, icon: Icon, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Box
      sx={{
        backgroundColor: `${color}.light`,
        borderRadius: '50%',
        p: 1,
        mr: 2,
        display: 'flex',
      }}
    >
      <Icon sx={{ color: `${color}.main` }} />
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6">
        {typeof value === 'number' ? value.toFixed(2) : value}
      </Typography>
    </Box>
  </Box>
);

const RiskMetrics = ({ metrics }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Risk Analysis
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MetricCard
              title="Volatility"
              value={metrics.volatility}
              icon={Speed}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MetricCard
              title="Beta"
              value={metrics.beta}
              icon={TrendingUp}
              color="info"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MetricCard
              title="Sharpe Ratio"
              value={metrics.sharpeRatio}
              icon={ShowChart}
              color="success"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MetricCard
              title="Risk Level"
              value={metrics.riskLevel}
              icon={Speed}
              color={
                metrics.riskLevel === 'High'
                  ? 'error'
                  : metrics.riskLevel === 'Medium'
                  ? 'warning'
                  : 'success'
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RiskMetrics;