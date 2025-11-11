# 🌆 Smart City Complaint Management System (AI Powered)
**Developed by: Shamarao patil**  

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB.svg)
![AI Powered](https://img.shields.io/badge/AI-Powered-green.svg)


A full-stack AI-powered web application that allows citizens to easily file, track, and manage civic complaints online.  
The system automatically classifies each complaint (like *Electricity*, *Water*, *Sanitation*, etc.) using a Machine Learning model built with **Python + Flask**.  
It also provides an **Admin Dashboard** to manage and update complaint statuses.

---

## 🖼️ Screenshots

| Complaint Form | Admin Dashboard |
|----------------|-----------------|
| ![Complaint Form](./client/public/screenshots/complaint-form.png) | ![Admin Dashboard](./client/public/screenshots/admin-dashboard.png) |

### AI Prediction in Action
![AI Prediction](./client/public/screenshots/ai-prediction.png)

---
## 🚀 Tech Stack

### 💻 Frontend
- **React.js (Vite)** — For fast and modern UI
- **Tailwind CSS** — For sleek and responsive design
- **Framer Motion** — For animations
- **Recharts** — For analytics and visualization
- **Axios** — For API integration

### ⚙️ Backend
- **Node.js + Express.js** — RESTful API for managing data
- **MongoDB Atlas** — Cloud database for complaint records
- **Multer** — For image uploads
- **Dotenv** — For environment variable management

### 🧠 AI Microservice
- **Flask (Python)** — Serves the ML prediction API
- **Scikit-learn + TF-IDF + Naive Bayes** — Classifies complaint text
- **Pandas & Numpy** — For dataset handling and training

---

## 🗂 Folder Structure

smartcity-complaint-AI-by-SHAM/ │ ├── ai-service/            # Flask AI model service │   ├── app.py │   ├── train_model.py │   ├── complaints.csv │   ├── model.pkl │   └── requirements.txt │ ├── client/                # React Frontend │   ├── src/ │   │   ├── pages/ │   │   ├── components/ │   │   └── assets/ │   ├── package.json │   ├── vite.config.js │   └── tailwind.config.js │ ├── server/                # Express Backend │   ├── config/ │   ├── controllers/ │   ├── middleware/ │   ├── models/ │   ├── routes/ │   ├── uploads/ │   ├── server.js │   └── package.json │ ├── .gitignore └── README.md

---

## ⚡ Features

✅ **Citizens can:**
- Submit complaints with name, location, and image  
- Get an **auto-generated complaint ID** for tracking  
- See AI-detected **department** (like “Electricity Department”)  

✅ **Admins can:**
- View all submitted complaints  
- Filter by department  
- Update complaint status: **Pending → In Progress → Resolved**  
- View statistics in colorful **Recharts graphs**

✅ **AI Features:**
- Predicts department using trained text classification model  
- Uses **TF-IDF + Multinomial Naive Bayes**  
- Hybrid approach with **keyword fallback** for accuracy boost  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/smartcity-complaint-AI.git
cd smartcity-complaint-AI-by-SHAM


---

2️⃣ Setup the Frontend (React)

cd client
npm install
npm run dev

> Runs on: http://localhost:5173




---

3️⃣ Setup the Backend (Node.js)

cd ../server
npm install
npm run server

> Runs on: http://localhost:5000



🧩 Create a .env file inside /server with:

MONGO_URI=your_mongodb_atlas_connection_string


---

4️⃣ Setup the AI Microservice (Flask)

cd ../ai-service
pip install -r requirements.txt
python app.py

> Runs on: http://127.0.0.1:5001




---

📊 Machine Learning Model

Dataset: complaints.csv (custom dataset of civic issues)

Algorithm: Multinomial Naive Bayes

Vectorizer: TF-IDF

Accuracy: Optimized with keyword fallback for better real-world detection.


If you want to retrain the model:

python train_model.py


---

🧾 Example Complaint Flow

1️⃣ Citizen submits:

> “No power supply in my area”



2️⃣ AI predicts → Electricity Department
3️⃣ Complaint stored in MongoDB with status Pending
4️⃣ Admin updates status → In Progress / Resolved
5️⃣ Citizen can track using Complaint ID (e.g., CMP1023)


---

🧠 AI Logic (Hybrid Classification)

AI first predicts via the Flask model.
If confidence < 70%, server uses keyword override logic, e.g.:

Keyword Match	Department

electric, power, light	Electricity Department
road, pothole, traffic	Public Works Department
water, pipe	Water Department
garbage, drain, sewage	Sanitation Department
tree, park, garden	Gardening Department



---

🔒 Environment Variables

server/.env

MONGO_URI=your_mongodb_atlas_uri
PORT=5000


---

🌐 Deployment (Optional)

You can deploy:

Frontend → Vercel / Netlify

Backend → Render / Railway

AI Service → PythonAnywhere / FlaskApp / Local container



---

🌟 Future Enhancements

Add multi-language support (English + Kannada)

Enable push notifications for complaint updates

Add citizen login & feedback system

Integrate Google Maps API for location auto-fill

Dashboard analytics for municipal departments



---

💬 Author

👨‍💻 Shamarao Patil
🎓 4th Year Software Engineering Student
💡 Passionate about Web + AI Integration

📧 Reach me at: [shamraopatila997@gmail.com]
🌐 GitHub: https://github.com/your-github-Shamarao18


---

⭐ If you like this project, consider giving it a star on GitHub!

> “A smarter city begins with smarter complaint management.”

---

## 🙌 Credits & Acknowledgements

This project, **Smart City Complaint Management System (AI Powered)**, was fully developed and customized by **Shamarao Patil**  
as part of a self-initiated academic project integrating **Web Development + Artificial Intelligence**.

Special thanks to:
- **OpenAI ChatGPT (Assistant Guidance)** — for conceptual and structural support during development  
- **MongoDB Atlas**, **Vercel**, and **Render** — for providing free cloud services  
- **React, Node.js, Flask, and Tailwind CSS** — open-source technologies that power this system  

---

## 🏷 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.