# ⚡ GridGuard

**GridGuard** is a hackathon project built for the **Sperry Tech Challenge** that helps identify potential overlaps between utility construction projects.

The platform compares publicly available power-grid construction plans and highlights projects that may overlap by **location** and **time**, helping utilities identify opportunities for better coordination, resource sharing, and scheduling.

---

## 🎯 The Problem

Utility companies such as Georgia Power, Duke Energy, and Dominion Energy plan infrastructure projects years in advance, including:

- Transmission line construction
- Line rebuilds
- Substation upgrades
- Storm-hardening projects
- Renewable-energy connections

Utilities often plan projects independently, which can make it difficult to identify nearby work being performed by neighboring companies.

When projects happen close together or during similar time periods, utilities may miss opportunities to coordinate crews, equipment, outages, and construction schedules.

---

## 💡 Our Solution

GridGuard compares utility construction projects and identifies potential overlaps based on two main factors:

### 📍 Location Overlap
Projects that are geographically close to one another.

### 📅 Time Overlap
Projects scheduled to begin during similar time periods.

Projects that overlap in **both location and time** receive the strongest warning.

---

## 🗺️ Features

- Interactive map displaying utility projects
- Project markers based on overlap status
  - 🔴 **Red:** Strong overlap
  - 🟡 **Yellow:** Possible overlap / close call
  - 🟢 **Green:** No significant overlap
- Filter projects by:
  - State
  - City
  - Project type
  - Start month
  - Start year
- Dynamic project list that updates with filters
- Click a project to zoom to its location
- Add new utility projects through the **New Project** form
- Select project locations directly from the map
- Automatically compare new projects against existing projects

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Leaflet
- OpenStreetMap

### Backend
- Python
- FastAPI
- SQLite

### Overlap Detection

GridGuard evaluates projects using:

- Geographic distance between project coordinates
- Project start dates
- Location and time proximity

These factors are used to classify projects by their potential level of overlap.

---

## 📊 Dataset

GridGuard currently contains **45 real utility construction projects** gathered from publicly available utility and regional planning documents.

No fabricated or placeholder projects are included in the core dataset.

### Dataset Composition

| Company | Projects | States Covered |
|---|---:|---|
| Georgia Power | 25 | GA, AL |
| Dominion Energy South Carolina | 9 | SC |
| Duke Energy | 6 | NC, SC |
| LG&E/KU | 2 | KY |
| PowerSouth | 2 | AL, FL |
| AECI | 1 | MO |
| **Total** | **45** | |

---

## 📚 Data Sources

### 2026 SERTP Preliminary Expansion Plan Report — Non-CEII

Regional transmission planning information covering multiple utilities throughout the southeastern United States.

Source: **Southeastern Regional Transmission Planning (SERTP)**

### Dominion Energy Power Line Projects

Public project pages containing information about Dominion Energy infrastructure projects and construction schedules.

Source: **Dominion Energy**

---

## ⚠️ Dataset Limitations

### Project Coordinates

Coordinates represent the **city, town, or general project area** rather than exact transmission-line or substation locations.

Precise coordinates for critical electrical infrastructure may not be publicly available.

### Coordinate Confidence

Coordinate accuracy varies by project.

Some locations were individually verified, while others represent the center point of the city or community associated with the project.

### Project Dates

Some projects include publicly documented construction dates.

When a source provided only an **in-service year**, an approximate project start date was added so the project could be used by the overlap-detection system.

These estimated dates should not be interpreted as official construction schedules.

---

## 🌎 Why GridGuard Matters

Improved coordination between utilities could help organizations:

- Coordinate specialized construction crews
- Share or better schedule expensive equipment
- Reduce conflicting outages
- Identify nearby projects that could potentially be coordinated
- Improve regional infrastructure planning
- Make public utility construction plans easier to visualize

GridGuard demonstrates how publicly available infrastructure data can be transformed into a simple visual planning tool for identifying potential coordination opportunities.

---

## 🚀 Running GridGuard Locally

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd GridGuard
```

### 2. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 3. Start the Backend

```bash
python backend/app.py
```

### 4. Open the Frontend

Open the frontend in your browser or run it using your preferred local development server.

---

## 👥 Team

Built during the **Sperry Tech Challenge Hackathon**.

---

## 📌 Project Status

GridGuard is currently a hackathon prototype designed to demonstrate how geographic and scheduling data can be used to identify potential overlaps between utility infrastructure projects.
