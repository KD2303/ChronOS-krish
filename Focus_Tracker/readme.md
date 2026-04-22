# **Focus Tracker**

Track your browsing behavior, calculate your **Focus Score**, and take back control of your time.

---

## **Folder Structure**

```
focus-tracker/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI app entry point
│   │   ├── database.py       # SQLite database setup
│   │   ├── models.py         # SQLAlchemy ORM models
│   │   ├── schemas.py        # Pydantic request/response schemas
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── activity.py   # POST /activity, GET /activity/logs
│   │   │   ├── reports.py    # GET /report/daily, /report/weekly
│   │   │   └── focus.py      # GET /focus-score
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── focus_utils.py  # Classification + score logic
│   └── requirements.txt
│
├── frontend/
│   └── index.html            # Complete dashboard (single file)
│
├── chrome-extension/
│   ├── manifest.json         # MV3 manifest
│   ├── background.js         # Service worker (tracking logic)
│   └── popup.html            # Extension popup UI
│
├── start.sh                  # Quick start script
└── README.md
```

---

## **Setup Instructions**

### 1. Backend (FastAPI)

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate          # Linux/Mac
# OR
venv\Scripts\activate              # Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- **API runs at:** `http://localhost:8000`
- **Swagger docs:** `http://localhost:8000/docs`

---

### 2. Frontend Dashboard

Simply open `frontend/index.html` in your browser.

> **Note:** The dashboard connects to `http://localhost:8000` by default. You can change this in Settings → API Configuration.

---

### 3. Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `chrome-extension/` folder
5. The Focus Tracker icon will appear in your toolbar
6. Start browsing — data is sent every 15 seconds!

---

## **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/activity/` | Log browsing activity |
| `GET` | `/activity/logs` | Get recent activity logs |
| `GET` | `/activity/sites` | Get custom site categories |
| `POST` | `/activity/sites` | Set custom site category |
| `DELETE` | `/activity/sites/{domain}` | Remove custom category |
| `GET` | `/focus-score/` | Get today's focus score + suggestion |
| `GET` | `/report/daily` | Get daily report |
| `GET` | `/report/weekly` | Get weekly report |
| `GET` | `/health` | Health check |

### Example: Log Activity
```bash
curl -X POST http://localhost:8000/activity/ \
  -H "Content-Type: application/json" \
  -d '{"user_id": "default_user", "url": "https://github.com", "duration": 300}'
```

### Example: Get Focus Score
```bash
curl http://localhost:8000/focus-score/
```

---

## **Focus Score Formula**

```
Focus Score = (Productive Time / Total Time) × 100
```

- **≥ 70** → 🟢 Great focus day (counts toward streak)
- **40–69** → 🟡 Average focus
- **< 40** → 🔴 Needs improvement

---

## **Default Site Classifications**

**Productive:** github.com, stackoverflow.com, docs.*, coursera.org, udemy.com, leetcode.com, notion.so, figma.com, aws.amazon.com, and more.

**Distracting:** youtube.com, instagram.com, facebook.com, twitter.com, tiktok.com, netflix.com, reddit.com, twitch.tv, and more.

**Neutral:** google.com, gmail.com, news sites, amazon.com, etc.

> You can override any classification in **Settings → Add Site Classification**

---

## **Features**

- **Real-time tracking** via Chrome extension (every 15s)
- **Auto-classification** of websites (productive/neutral/distracting)
- **Focus Score** calculation
- **AI-generated suggestions** based on your activity
- **Streak system** (maintain score ≥ 70 to build a streak)
- **Daily & weekly reports**
- **Custom site rules** (override defaults)
- **Mobile-responsive** dashboard
- **Live auto-refresh** every 30 seconds

---

## **Troubleshooting**

**Backend won't start:**
- Make sure Python 3.8+ is installed
- Check that port 8000 is not in use

**Chrome extension not sending data:**
- Make sure the backend is running
- Check the extension permissions in `chrome://extensions/`
- Check DevTools → Service Worker → background.js for errors

**Dashboard shows no data:**
- Verify backend is running at `http://localhost:8000`
- Try the Settings page to test the API connection
- Manually log activity in Settings → Test Activity Log

**CORS errors:**
- The backend allows all origins by default (configured in `main.py`)
- If using a different port, update the `host_permissions` in `manifest.json`

---

## **Dependencies**

**Backend:**
- `fastapi` — Modern Python web framework
- `uvicorn` — ASGI server
- `sqlalchemy` — ORM for SQLite
- `pydantic` — Data validation

**Frontend (CDN, no install needed):**
- Bootstrap 5
- Chart.js
- Font Awesome
- Google Fonts (Poppins)

**Chrome Extension:** No dependencies (vanilla JS + MV3)

---

## **Privacy**

- All data is stored **locally** in `focus_tracker.db` (SQLite)
- The Chrome extension only sends the **domain name** (not full URLs) to your local backend
- No data leaves your machine
