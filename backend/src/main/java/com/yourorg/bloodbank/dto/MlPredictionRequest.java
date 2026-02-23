package com.yourorg.bloodbank.dto;

public class MlPredictionRequest {

    private int currentStock;
    private int avgDailyUsage;

    public MlPredictionRequest() {}

    public MlPredictionRequest(int currentStock, int avgDailyUsage) {
        this.currentStock = currentStock;
        this.avgDailyUsage = avgDailyUsage;
    }

    public int getCurrentStock() {
        return currentStock;
    }

    public void setCurrentStock(int currentStock) {
        this.currentStock = currentStock;
    }

    public int getAvgDailyUsage() {
        return avgDailyUsage;
    }

    public void setAvgDailyUsage(int avgDailyUsage) {
        this.avgDailyUsage = avgDailyUsage;
    }
}
