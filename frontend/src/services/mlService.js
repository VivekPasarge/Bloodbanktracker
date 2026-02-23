import api from "./api";

export const getMlPrediction = (stock, usage) => {
  return api.post("/ml/predict", {
    currentStock: stock,
    avgDailyUsage: usage
  });
};
