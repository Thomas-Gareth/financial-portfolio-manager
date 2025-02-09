// riskAnalysisService.js
export const calculateRiskMetrics = (investment, marketData = []) => {
    // Calculate volatility (standard deviation of returns)
    const calculateVolatility = (returns) => {
      const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
      const squaredDiffs = returns.map(val => Math.pow(val - mean, 2));
      const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / returns.length;
      return Math.sqrt(variance);
    };
  
    // Calculate Sharpe Ratio (assuming risk-free rate of 2%)
    const calculateSharpeRatio = (returns, volatility) => {
      const riskFreeRate = 0.02;
      const meanReturn = returns.reduce((sum, val) => sum + val, 0) / returns.length;
      return (meanReturn - riskFreeRate) / volatility;
    };
  
    // Calculate Beta (market sensitivity)
    const calculateBeta = (returns, marketReturns) => {
      if (!marketReturns || marketReturns.length === 0) return 1;
      
      const covariance = returns.reduce((sum, ret, i) => 
        sum + (ret * marketReturns[i]), 0) / returns.length;
      const marketVariance = marketReturns.reduce((sum, ret) => 
        sum + (ret * ret), 0) / marketReturns.length;
      
      return covariance / marketVariance;
    };
  
    // Mock historical returns for demonstration
    // In a real application, you would fetch this data from an API
    const mockReturns = [0.02, -0.01, 0.03, -0.02, 0.01, 0.02, -0.01];
    const mockMarketReturns = [0.015, -0.008, 0.02, -0.015, 0.01, 0.018, -0.005];
  
    const volatility = calculateVolatility(mockReturns);
    const sharpeRatio = calculateSharpeRatio(mockReturns, volatility);
    const beta = calculateBeta(mockReturns, mockMarketReturns);
  
    return {
      volatility: volatility * 100, // Convert to percentage
      sharpeRatio: sharpeRatio,
      beta: beta,
      riskLevel: beta > 1.2 ? 'High' : beta < 0.8 ? 'Low' : 'Medium'
    };
  };
  
  export const getPortfolioRiskMetrics = (investments) => {
    // Calculate portfolio-level risk metrics
    const portfolioMetrics = investments.reduce((metrics, investment) => {
      const investmentRisk = calculateRiskMetrics(investment);
      const weight = (investment.quantity * investment.price) / 
        investments.reduce((total, inv) => total + (inv.quantity * inv.price), 0);
  
      return {
        volatility: metrics.volatility + (investmentRisk.volatility * weight),
        beta: metrics.beta + (investmentRisk.beta * weight),
        sharpeRatio: metrics.sharpeRatio + (investmentRisk.sharpeRatio * weight)
      };
    }, { volatility: 0, beta: 0, sharpeRatio: 0 });
  
    return {
      ...portfolioMetrics,
      riskLevel: portfolioMetrics.beta > 1.2 ? 'High' : 
                 portfolioMetrics.beta < 0.8 ? 'Low' : 'Medium'
    };
  };