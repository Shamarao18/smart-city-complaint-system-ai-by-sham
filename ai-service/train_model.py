import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import pickle

# Load your dataset
df = pd.read_csv("complaints_dataset.csv")

print("📊 Dataset loaded:")
print(df.head())

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["label"], test_size=0.2, random_state=42
)

# Build TF-IDF + Naive Bayes pipeline
model = make_pipeline(TfidfVectorizer(stop_words="english"), MultinomialNB())

# Train the model
model.fit(X_train, y_train)

# Evaluate quickly
accuracy = model.score(X_test, y_test)
print(f"✅ Model trained successfully! Accuracy: {accuracy:.2f}")

# Save model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("💾 model.pkl saved successfully!")