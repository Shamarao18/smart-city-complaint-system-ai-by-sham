from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import datetime

app = Flask(__name__)
CORS(app)

# Load trained AI model (TF-IDF + Naive Bayes)
model = pickle.load(open("model.pkl", "rb"))

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "🤖 Smart City AI Service Active",
        "version": "1.0",
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        text = data.get("text", "").strip()
        if not text:
            return jsonify({"success": False, "error": "No text provided"}), 400

        prediction = model.predict([text])[0]
        probabilities = model.predict_proba([text])[0]
        confidence = round(float(max(probabilities)) * 100, 2)

        print(f"[AI] {text} → {prediction} ({confidence}%)")

        return jsonify({
            "success": True,
            "category": prediction,
            "confidence": confidence
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 Flask AI running on http://127.0.0.1:5001")
    app.run(port=5001, debug=True)