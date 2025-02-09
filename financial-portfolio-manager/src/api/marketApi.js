import axios from "axios";

const ALPHA_VANTAGE_API_KEY = "2UYI3YBKLC1S7WWU";
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchStockPrice = async (symbol) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    return response.data["Global Quote"]["05. price"];
  } catch (error) {
    console.error("Error fetching stock price:", error);
    return null;
  }
};

export const fetchCryptoPrice = async (cryptoId) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
      params: { ids: cryptoId, vs_currencies: "usd" },
    });
    return response.data[cryptoId].usd;
  } catch (error) {
    console.error("Error fetching crypto price:", error);
    return null;
  }
};
