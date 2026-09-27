// ============================================================
// FAKE PROJECT DATA
// ============================================================

const projects = window.gridguardProjects = [

    {
        id: 1,
        projectname: "Miami Substation Upgrade",
        companyname: "Florida Power & Light",
        type: "Substation Upgrade",
        state: "FL",
        city: "Miami",
        latitude: 25.7617,
        longitude: -80.1918,
        startMonth: "03",
        startYear: 2027
    },

    {
        id: 2,
        projectname: "Miami Grid Hardening",
        companyname: "Florida Power & Light",
        type: "Grid Hardening",
        state: "FL",
        city: "Miami",
        latitude: 25.7750,
        longitude: -80.2000,
        startMonth: "03",
        startYear: 2027
    },

    {
        id: 3,
        projectname: "Charlotte Transmission Extension",
        companyname: "Duke Energy",
        type: "Transmission Line Extension",
        state: "NC",
        city: "Charlotte",
        latitude: 35.2271,
        longitude: -80.8431,
        startMonth: "05",
        startYear: 2027
    },

    {
        id: 4,
        projectname: "Atlanta Grid Hardening",
        companyname: "Georgia Power",
        type: "Grid Hardening",
        state: "GA",
        city: "Atlanta",
        latitude: 33.7490,
        longitude: -84.3880,
        startMonth: "08",
        startYear: 2027
    }

];


// ============================================================
// MAIN MAP
// ============================================================

const map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// Keep track of markers currently on the map
let currentMarkers = [];

let lastMatchingProjects = [];
let lastSelectedType = '';


const CLUSTER_DISTANCE_MILES = 25;

function distanceInMiles(lat1, lon1, lat2, lon2) {

    const R = 3958.8; // Earth's radius in miles

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


function findClusters(projects) {

    const visited = new Set();
    const clusters = [];

    function explore(index, cluster) {

        visited.add(index);
        cluster.push(projects[index]);

        for (let i = 0; i < projects.length; i++) {

            if (visited.has(i)) {
                continue;
            }

            const distance = distanceInMiles(
                projects[index].latitude,
                projects[index].longitude,
                projects[i].latitude,
                projects[i].longitude
            );

            if (distance <= CLUSTER_DISTANCE_MILES) {
                explore(i, cluster);
            }
        }
    }

    for (let i = 0; i < projects.length; i++) {

        if (!visited.has(i)) {

            const cluster = [];

            explore(i, cluster);

            clusters.push(cluster);
        }
    }

    return clusters;
}

function createProjectIcon(color) {

    return L.divIcon({
        className: '',
        html: `<div class="project-pin ${color}"></div>`,
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -36]
    });
}


function createClusterIcon(count) {

    return L.divIcon({
        className: '',
        html: `<div class="cluster-pin">${count}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
}



// ============================================================
// SEARCH
// ============================================================

document.getElementById('filter-bar').addEventListener('submit', (e) => {

    e.preventDefault();

    const state = document.getElementById('f-state').value;
    const city = document.getElementById('f-where').value.trim();
    const type = document.getElementById('f-type').value;
    const month = document.getElementById('f-start-month').value;
    const year = document.getElementById('f-year').value;


    // Require state, city, month, and year
    if (!state || !city || !month || !year) {

        alert('Please enter a state, city, month, and year.');

        return;
    }


    // Find projects matching:
    // State + City + Month + Year
    //
    // Type is intentionally NOT used here.

    const matchingProjects = projects.filter(project => {

        return (
            project.state === state &&
            project.city.toLowerCase() === city.toLowerCase() &&
            project.startMonth === month.padStart(2, '0') &&
            project.startYear === Number(year)
        );

    });


    displayProjects(matchingProjects, type);

});


// ============================================================
// DISPLAY PROJECTS
// ============================================================

function displayProjects(matchingProjects, selectedType) {

    lastMatchingProjects = matchingProjects;
    lastSelectedType = selectedType;

    // Remove old markers
    currentMarkers.forEach(marker => {
        map.removeLayer(marker);
    });

    currentMarkers = [];

    const projectList = document.getElementById('project-list');

    projectList.innerHTML = '';

    if (matchingProjects.length === 0) {

        projectList.innerHTML = `
            <li class="project-row no-projects">
                <div class="row-info">
                    <div class="row-title">
                        No projects found.
                    </div>
                </div>
            </li>
        `;

        return;
    }

    // Find our 25-mile connected groups
    const clusters = findClusters(matchingProjects);

    clusters.forEach(cluster => {

        // ==========================================
        // GROUP OF MULTIPLE PROJECTS
        // ==========================================

        if (cluster.length > 1) {

            // Find center of cluster
            const averageLat =
                cluster.reduce(
                    (sum, project) => sum + project.latitude,
                    0
                ) / cluster.length;

            const averageLng =
                cluster.reduce(
                    (sum, project) => sum + project.longitude,
                    0
                ) / cluster.length;

            const clusterMarker = L.marker(
                [averageLat, averageLng],
                {
                    icon: createClusterIcon(cluster.length)
                }
            );

            clusterMarker.bindPopup(`
                <b>${cluster.length} projects</b><br>
                Within 25 miles
            `);

            // Clicking the cluster zooms in
            clusterMarker.on('click', () => {

                // Remove the blue cluster marker
                map.removeLayer(clusterMarker);

                // Remove it from our marker list
                currentMarkers = currentMarkers.filter(
                    marker => marker !== clusterMarker
                );

                // Show the individual projects
                cluster.forEach(project => {

                    const typeMatches =
                        project.type === selectedType;

                    const color =
                        typeMatches ? 'green' : 'red';

                    const marker = L.marker(
                        [project.latitude, project.longitude],
                        {
                            icon: createProjectIcon(color)
                        }
                    );

                    marker.bindPopup(`
                        <b>${project.projectname}</b><br>
                        ${project.companyname}<br>
                        ${project.type}<br>
                        ${project.city}, ${project.state}<br>
                        Start: ${project.startMonth}/${project.startYear}
                    `);

                    marker.addTo(map);

                    currentMarkers.push(marker);
                });

                // Zoom toward the cluster
                map.setView(
                    [averageLat, averageLng],
                    map.getZoom() + 2
                );

            });

            clusterMarker.addTo(map);

            currentMarkers.push(clusterMarker);

        }

        // ==========================================
        // INDIVIDUAL PROJECTS
        // ==========================================

        else {

            const project = cluster[0];

            const typeMatches =
                project.type === selectedType;

            const color =
                typeMatches ? 'green' : 'red';

            const marker = L.marker(
                [project.latitude, project.longitude],
                {
                    icon: createProjectIcon(color)
                }
            );

            marker.bindPopup(`
                <b>${project.projectname}</b><br>
                ${project.companyname}<br>
                ${project.type}<br>
                ${project.city}, ${project.state}<br>
                Start: ${project.startMonth}/${project.startYear}
            `);

            marker.addTo(map);

            currentMarkers.push(marker);
        }

        // ==========================================
        // PROJECT LIST
        // ==========================================

        cluster.forEach(project => {

            const typeMatches =
                project.type === selectedType;

            const color =
                typeMatches ? 'green' : 'red';

            const listItem = document.createElement('li');

            listItem.className = 'project-row';

            listItem.innerHTML = `
                <div class="row-info">

                    <div class="row-title">
                        <b>${project.companyname}</b> —
                        ${project.projectname}
                    </div>

                    <div class="row-meta">
                        ${project.city}, ${project.state}
                        · ${project.type}
                        · ${project.startMonth}/${project.startYear}
                    </div>

                </div>

                <span
                    class="dot"
                    style="background-color: ${color};"
                ></span>
            `;

            projectList.appendChild(listItem);

        });

    });
}

function addProjectToMap(project) {

    const typeMatches = project.type === lastSelectedType;
    const color = typeMatches ? 'green' : 'red';

    const marker = L.marker(
        [project.latitude, project.longitude],
        {
            icon: createProjectIcon(color)
        }
    );

    marker.bindPopup(`
        <b>${project.projectname}</b><br>
        ${project.companyname}<br>
        ${project.type}<br>
        ${project.city}, ${project.state}<br>
        Start: ${project.startMonth}/${project.startYear}
    `);

    marker.addTo(map);

    currentMarkers.push(marker);
}

window.addProjectToMap = addProjectToMap;

function addProjectToList(project) {

    const projectList = document.getElementById('project-list');

    // Remove "No projects found." message if it exists
    const noProjectsMessage =
        projectList.querySelector('.no-projects');

    if (noProjectsMessage) {
        noProjectsMessage.remove();
    }

    const typeMatches = project.type === lastSelectedType;
    const color = typeMatches ? 'green' : 'red';

    const listItem = document.createElement('li');

    listItem.className = 'project-row';

    listItem.innerHTML = `
        <div class="row-info">

            <div class="row-title">
                <b>${project.companyname}</b> —
                ${project.projectname}
            </div>

            <div class="row-meta">
                ${project.city}, ${project.state}
                · ${project.type}
                · ${project.startMonth}/${project.startYear}
            </div>

        </div>

        <span
            class="dot"
            style="background-color: ${color};"
        ></span>
    `;

    projectList.appendChild(listItem);
}

window.addProjectToList = addProjectToList;