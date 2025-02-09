// portfolioSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('portfolioState');
    if (serializedState === null) {
      return {
        investments: [],
        totalValue: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      investments: [],
      totalValue: 0,
    };
  }
};

const initialState = loadState();

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addInvestment: (state, action) => {
      state.investments.push(action.payload);
      // Recalculate total value
      state.totalValue = state.investments.reduce(
        (total, investment) => total + investment.quantity * investment.price,
        0
      );
    },
    removeInvestment: (state, action) => {
      state.investments = state.investments.filter(
        (investment) => investment.id !== action.payload
      );
      // Recalculate total value
      state.totalValue = state.investments.reduce(
        (total, investment) => total + investment.quantity * investment.price,
        0
      );
    },
    updatePortfolioValue: (state, action) => {
      state.totalValue = action.payload;
    },
  },
});

export const { addInvestment, removeInvestment, updatePortfolioValue } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;