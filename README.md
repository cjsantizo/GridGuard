# GridGuard

**Sperry Tech Challenge**

## Project Summary

| | |
| --- | --- |
| **Project Name** | **GridGuard** |
| **Elevator Pitch** | GridGuard is a utility construction project tracker that helps users find projects happening in the same area and around the same time. It displays real utility projects on an interactive map, allows users to search by location and date, and helps make overlapping construction work easier to see. |
| **Technologies** | HTML · CSS · JavaScript · Python · Flask · PostgreSQL · Supabase · Leaflet · OpenStreetMap · Nominatim |

---

## Inspiration

The inspiration behind GridGuard came from the problem of utility companies planning large construction projects in different areas without always having an easy way to see what other utilities may also be working on nearby.

Power companies can have projects such as transmission line construction, substation upgrades, grid hardening, and solar connections planned years in advance. If two companies are working in the same area around the same time, there could be opportunities for them to better coordinate things such as workers, equipment, construction schedules, or outages.

For the Sperry Tech Challenge, we wanted to make a tool that could take public utility project information and make it easier to visualize where these projects are happening instead of having someone search through multiple reports and project pages manually.

---

## What it does

GridGuard displays utility construction projects on an interactive map.

The user can search for projects using:

- State
- City
- Project type
- Start month
- Start year

Once a search is made, matching projects are displayed both on the map and in a project list underneath it.

Projects that are within **25 miles of each other** are grouped together on the map. The user can click the group marker to zoom in and view the individual projects in that area.

The project list is also connected to the map. Clicking a project in the list automatically zooms the map into that project's location and opens the project information.

Users can also add new projects through the **New Project** form.

When adding a project, the user enters:

- Company name
- Project name
- Project type
- State
- Start month
- Start year

The user then clicks directly on a map to choose the location of the project.

GridGuard takes those coordinates and uses reverse geocoding to determine the city for that location before saving the project to the database.

---

## How we built it

The frontend of GridGuard was built using **HTML, CSS, and JavaScript**.

For the map, we used **Leaflet** with map tiles from **OpenStreetMap**. Leaflet handles the project markers, map movement, project popups, and location selection when creating a new project.

The frontend also contains the logic used to calculate the distance between projects. We use the latitude and longitude of each project to determine whether projects are within approximately **25 miles** of each other and then group nearby projects together.

The backend was built using **Python and Flask**.

The Flask backend provides API routes that allow the frontend to:

- Retrieve projects from the database
- Add new projects to the database

For the database, we used a **cloud-hosted PostgreSQL database through Supabase**.

Supabase stores the project information including:

- Company name
- Project name
- Project type
- City
- State
- Latitude
- Longitude
- Start month
- Start year

When the website starts, the frontend makes a request to the Flask API. Flask gets the projects from Supabase and returns them to the frontend.

The basic flow of the project is:

**Frontend → Flask API → Supabase → PostgreSQL Database**

When a user creates a new project, the process goes in the opposite direction:

**New Project Form → Flask API → Supabase/PostgreSQL → Frontend Map**

For selecting project locations, we also used the **OpenStreetMap Nominatim API** for reverse geocoding. This takes the latitude and longitude selected by the user and finds the city connected to that location.

---

## Dataset

The project uses real utility construction project information collected from publicly available utility and regional planning sources.

The dataset currently contains **45 utility construction projects** from multiple companies.

### Current project data

| Company | Projects | States Covered |
| --- | ---: | --- |
| Georgia Power | 25 | GA, AL |
| Dominion Energy South Carolina | 9 | SC |
| Duke Energy | 6 | NC, SC |
| LG&E/KU | 2 | KY |
| PowerSouth | 2 | AL, FL |
| AECI | 1 | MO |
| **Total** | **45** | |

### Main Sources

- **2026 SERTP Preliminary Expansion Plan Report (Non-CEII)**
- **Dominion Energy Public Power Line Project Pages**

The SERTP report contains regional transmission planning information from utilities throughout the Southeast.

Dominion Energy also publishes individual project pages that include information about active and planned infrastructure projects.

---

## Data Limitations

One challenge with utility infrastructure data is that exact locations are not always publicly available.

Because of this, many project coordinates represent the **city, town, or general area of the project** instead of the exact substation or transmission line location.

Some project dates also had to be approximated.

For some projects, the source included a construction start date. Other projects only included an expected **in-service year**, so an estimated start date was added so the project could still be compared inside GridGuard.

Because of this, GridGuard is meant to show potential project overlap and is not meant to replace official utility planning information.

---

## Challenges We Ran Into

One of the biggest challenges was getting the frontend, backend, and database to all communicate with each other.

At first, the frontend could display project information locally, but we still needed a way to store new projects permanently.

We created the Flask backend and connected it to our Supabase PostgreSQL database. From there, we had to make sure the data returned from PostgreSQL matched the format expected by our JavaScript frontend.

Another challenge was handling map locations.

The user selects a location using latitude and longitude, but we still needed a readable city name to store with the project. We solved this by using reverse geocoding through OpenStreetMap's Nominatim service.

We also worked through how to display multiple projects that are very close to each other without covering the map with markers. We created our own distance calculation and grouping logic so projects within 25 miles can be displayed together.

---

## Accomplishments We're Proud Of

One accomplishment we're proud of is getting a complete full-stack connection working.

A project can now go from the user's browser, through our Flask backend, into the PostgreSQL database, and then back onto the map.

We were also able to work with real utility project data instead of using completely made-up example projects.

Another feature we liked was connecting the project list and the map together. Instead of manually searching around the map, the user can click on a project and GridGuard automatically moves directly to it.

---

## What We Learned

This project gave us more experience working with different parts of a full-stack application at the same time.

We learned more about:

- Connecting JavaScript to a Python backend
- Creating API routes with Flask
- Using cloud PostgreSQL databases
- Working with Supabase
- Sending and receiving JSON data
- Using latitude and longitude
- Calculating geographic distance
- Working with Leaflet maps
- Reverse geocoding
- Handling frontend and backend integration
- Working as a team while different people are building different parts of the project

One of the biggest things we learned was that building each part separately is one thing, but connecting all of those parts together is where a lot of problems show up.

---

## What's Next for GridGuard

There are several things we would like to continue adding to GridGuard.

One improvement would be making the overlap system more advanced.

Currently, GridGuard can compare projects based on their location and project dates. In the future, the system could use more information such as:

- Project end dates
- Project size
- Utility company
- Required equipment
- Number of workers
- Transmission voltage
- Construction type

Another future feature could allow utility managers to receive alerts when a newly added project is close to another company's existing project.

We could also expand the dataset to include more utilities and states instead of mainly focusing on projects in the southeastern United States.

Another goal would be to improve how the project overlap score works so projects could be given different levels of overlap based on both time and distance.

---

## How to Run GridGuard Locally

### Prerequisites

You will need:

- Python
- pip
- A Supabase project
- A PostgreSQL database through Supabase
- A web browser

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GridGuard-Mock-1
