package com.yourorg.bloodbank.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MlPredictionResponse {

    private int predictedDaysLeft;
    private String risk;

    // ✅ Required by Jackson (JSON → Object)
    public MlPredictionResponse() {
    }

    public int getPredictedDaysLeft() {
        return predictedDaysLeft;
    }

    public void setPredictedDaysLeft(int predictedDaysLeft) {
        this.predictedDaysLeft = predictedDaysLeft;
    }

    public String getRisk() {
        return risk;
    }

    public void setRisk(String risk) {
        this.risk = risk;
    }
}
