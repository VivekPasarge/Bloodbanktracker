import pandas as pd
from sklearn.linear_model import LinearRegression

# Load training data
data = pd.read_csv("data.csv")

# Features
X = data[["current_stock", "avg_daily_usage"]]

# Target
y = data["days_left"]

# Train model
model = LinearRegression()
model.fit(X, y)

def predict_days_left(current_stock, avg_daily_usage):
    # Ensure correct shape for sklearn
    prediction = model.predict([[current_stock, avg_daily_usage]])
    return max(0, round(float(prediction[0])))
