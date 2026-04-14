# 🌱 Agro Vision

> **Precision Farming & Weather Intelligence Platform** > Empowering users with hyper-local agricultural intelligence by combining mapping technology, real-time weather data, and machine learning.

[![GitHub Organization](https://img.shields.io/badge/ChronalLabs-Agro--Vision-brightgreen)](https://github.com/ChronalLabs/Agro-Vision)
[![Python](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-Backend-black.svg)](https://flask.palletsprojects.com/)
[![Machine Learning](https://img.shields.io/badge/Machine%20Learning-scikit--learn-orange.svg)](https://scikit-learn.org/)

## 📖 About The Project

Agro Vision solves the problem of guesswork in agriculture. By leveraging interactive mapping and live weather APIs, users can select any plot of land globally to retrieve instant, localized environmental data. Furthermore, our integrated Machine Learning model analyzes this data to recommend the most viable crops and farming types for that specific location.

**Key advantage:** There are no limits. Users can query exact land data for any location as many times as they want without restrictions.

## ✨ Core Features

* 🌍 **Interactive Map Selection:** Drop a pin anywhere using **FleatMaps** to extract precise Latitude and Longitude coordinates.
* ⛅ **Real-Time Weather Forecasting:** Fetches highly accurate, location-specific weather data using a live Weather API.
* 🧠 **ML-Driven Crop Recommendations:** A predictive model built with `scikit-learn` and `pandas` suggests the best crops suited for the selected land and weather conditions.
* 📊 **Visual Analytics:** Dynamic and beautiful data charts rendered via **Chart.js** to track weather patterns and agricultural metrics.
* ♾️ **Unlimited Queries:** Zero restrictions on the number of locations a user can analyze.

## 🛠️ Technology Stack

**Frontend & UI**
* [Ayro UI](https://ayroui.com/) - Modern UI components
* [Chart.js](https://www.chartjs.org/) - Data visualization
* FleatMaps - Interactive map rendering

**Backend & Data Science**
* [Flask](https://flask.palletsprojects.com/) - Python web framework
* `pandas` - Data manipulation and analysis
* `scikit-learn` - Machine Learning model building
* `requests` - API request handling

**Infrastructure & Deployment**
* [Google Cloud Platform (GCP)](https://cloud.google.com/) - Cloud hosting instance
* `gunicorn` - Python WSGI HTTP Server for production
* Weather API - Third-party weather data provider

## 🚀 Getting Started

Follow these instructions to set up Agro Vision on your local machine for development and testing.

### Prerequisites
Make sure you have Python 3.8+ installed. You will also need an API key from your chosen Weather API provider.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ChronalLabs/Agro-Vision.git](https://github.com/ChronalLabs/Agro-Vision.git)
   cd Agro-Vision
Create a Virtual Environment (Recommended):

Bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
Install dependencies:

Bash
pip install -r requirements.txt
(Ensure Flask, pandas, scikit-learn, requests, and gunicorn are in your requirements.txt)

Set Environment Variables:
Create a .env file in the root directory and add your API keys:

Code snippet
WEATHER_API_KEY=your_api_key_here
FLASK_APP=app.py
FLASK_ENV=development
Run the Application:

Bash
flask run
The app will now be running on http://127.0.0.1:5000/.

🌐 Production Deployment
This application is configured to run on a GCP (Google Cloud Platform) instance using gunicorn.

To run the server in a production environment:

Bash
gunicorn -w 4 -b 0.0.0.0:8000 app:app
🤝 Contributing
Contributions, issues, and feature requests are welcome!

🏢 About ChronalLabs
Agro Vision is proudly developed by ChronalLabs. We build intelligent solutions bridging the gap between raw data and actionable real-world insights.


***

### A few quick tips for your repo:
1. Make sure to generate a `requirements.txt` file in your repo if you haven't already (`pip freeze > requirements.txt`).
2. Add a `.gitignore` file to ensure your `.env` (which holds your API keys) and `ven

