from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_days_left

app = Flask(__name__)
CORS(app)  # allows frontend / backend access

# Health check (very important)
@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "ML service running"})

# Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data"}), 400

    current_stock = data.get("currentStock")
    avg_daily_usage = data.get("avgDailyUsage")

    if current_stock is None or avg_daily_usage is None:
        return jsonify({"error": "Invalid input values"}), 400

    days_left = predict_days_left(current_stock, avg_daily_usage)

    if days_left <= 2:
        risk = "CRITICAL"
    elif days_left <= 5:
        risk = "WARNING"
    else:
        risk = "SAFE"

    return jsonify({
        "predictedDaysLeft": days_left,
        "risk": risk
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
