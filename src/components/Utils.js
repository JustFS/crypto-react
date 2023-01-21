export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const isStableCoin = (coin) => {
  let stables = [
    "usdt",
    "usdc",
    "busd",
    "dai",
    "ust",
    "mim",
    "tusd",
    "usdp",
    "usdn",
    "fei",
    "tribe",
    "gusd",
    "frax",
    "lusd",
    "husd",
    "ousd",
    "xsgd",
    "usdx",
    "eurs",
    "cusdc",
    "cdai",
    "usdd",
    "ibeur",
    "eurt",
    "flexusd",
    "alusd",
    "susd",
    "usdk",
    "cusd",
    "ageur",
    "musd",
    "yusd",
    "uxd",
    "usds",
    "rsv",
    "eeur",
    "ceur",
    "ustc",
    "gyen",
    "mimatic",
    "tor",
    "euroc",
    "cusdt",
    "edgt",
  ];
  if (stables.includes(coin)) {
    return false;
  } else {
    return true;
  }
};
