import axios from "axios";

export const GET_ALL_COINS = "GET_ALL_COINS";

export const getAllCoins = () => {
  return (dispatch) => {
    return axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
      )
      .then((res) => dispatch({ type: GET_ALL_COINS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};
