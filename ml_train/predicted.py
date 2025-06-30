from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from xgboost import XGBRegressor
# Example input (replace with actual user data)
# Format: Age, Weight, Duration, Heart_Rate, Body_Temp, Gender (0/1)
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) # Allow requests from frontend

model = XGBRegressor()
model.load_model("calorie_predictor_model.json")

@app.route('/predict', methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)
        # Create DataFrame from incoming JSON
        input_data = pd.DataFrame([[
           int(data["Gender"]),
    int(data["Age"]),
    float(data["Weight"]),
    float(data["Duration"]),
    float(data["Heart_Rate"]),
    float(data["Body_Temp"])
        ]], columns=['Gender', 'Age', 'Weight', 'Duration', 'Heart_Rate', 'Body_Temp'])
  
        # Predict calories
        prediction = model.predict(input_data)[0]
        return jsonify({"calories": float(round(prediction, 2))})

        

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)