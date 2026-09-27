# GridGuard

GridGuard is a hackathon project built for the Sperry Tech Challenge. The goal of the project is to help compare utility construction projects and make it easier to see where projects may be happening near each other.

The website displays utility projects on an interactive map and allows the user to filter projects by things like state, city, project type, month, and year. Users can also click on a project in the list and the map will zoom directly to that project.

GridGuard also allows users to add a new project. The user enters the company name, project name, type, state, and start date, then selects the project location directly on the map. The location is used to get the city information and the new project is saved to the database.

## How it works

The frontend was built using HTML, CSS, and JavaScript. Leaflet and OpenStreetMap are used for displaying the project locations on the map.

The backend was built with Python using Flask. It connects the frontend to the database and handles getting existing projects and adding new projects.

For the database, we used a cloud PostgreSQL database with Supabase as the provider. The project information is stored in a `projects` table and the Flask backend communicates with Supabase when projects need to be loaded or added.

## Main Features

- View utility construction projects on a map
- Filter projects by state, city, project type, month, and year
- Click a project to zoom to its location on the map
- View project information such as the company, location, type, and start date
- Add new utility projects
- Pick the location of a new project directly from the map
- Save new projects to the PostgreSQL database
- Load project information from the database through the Flask backend

## Tech Used

- HTML
- CSS
- JavaScript
- Python
- Flask
- PostgreSQL
- Supabase
- Leaflet
- OpenStreetMap
