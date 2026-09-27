const dialog = document.getElementById('projectDialog');
const form = document.getElementById('projectForm');

let projectMap = null;
let selectedCoordinates = null;
let locationMarker = null;

let modalProjectMarkers = [];


// Open dialog
document.getElementById('newProjectBtn').addEventListener('click', () => {

    dialog.showModal();

    if (!projectMap) {

        projectMap = L.map('projectMap')
            .setView([39.8283, -98.5795], 4);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(projectMap);


        // Clicking the map selects a new project location
        projectMap.on('click', (e) => {

            selectedCoordinates = {
                lat: e.latlng.lat,
                lng: e.latlng.lng
            };

            document.getElementById('coordinates').value =
                `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;

            if (locationMarker) {
                locationMarker.remove();
            }

            locationMarker = L.marker(e.latlng)
                .addTo(projectMap);
        });
    }

    // Refresh project pins every time the modal opens
    refreshModalProjectMarkers();

    // Leaflet needs this because the map was inside a dialog
    setTimeout(() => {
        projectMap.invalidateSize();
    }, 100);
});


// Cancel
document.getElementById('cancelBtn').addEventListener('click', () => {

    form.reset();

    selectedCoordinates = null;

    if (locationMarker) {
        locationMarker.remove();
        locationMarker = null;
    }

    dialog.close();
});

async function reverseGeocode(latitude, longitude) {

    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    if (!response.ok) {
        throw new Error('Reverse geocoding failed.');
    }

    const data = await response.json();

    return {
        city:
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.municipality ||
            '',

        state: data.address.state || ''
    };
}


// Save
form.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (!selectedCoordinates) {
        alert('Please select a location on the map.');
        return;
    }

    try {

        // ==========================================
        // GET FORM DATA
        // ==========================================

        const companyname =
            document.getElementById('companyName').value;

        const projectname =
            document.getElementById('projectName').value;

        const type =
            document.getElementById('projectType').value;

        const state =
            document.getElementById('state').value;

        const startMonth =
            document.getElementById('startMonth').value;

        const startYear =
            document.getElementById('startYear').value;


        // ==========================================
        // REVERSE GEOCODE
        // ==========================================

        const location = await reverseGeocode(
            selectedCoordinates.lat,
            selectedCoordinates.lng
        );


        // ==========================================
        // CREATE PROJECT
        // ==========================================

        const project = {
          projectname,
          companyname,
          type,
          state,
          city: location.city,
          latitude: selectedCoordinates.lat,
          longitude: selectedCoordinates.lng,
          startMonth,
          startYear: Number(startYear)
        };

        const response = await fetch('http://127.0.0.1:5000/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(project)
        });

        if (!response.ok) {
          throw new Error('Failed to save project.');
        }

        const savedProject = await response.json();


        // ==========================================
        // ADD TO "DATABASE"
        // ==========================================

        window.gridguardProjects.push(savedProject);


        console.log('Project added:', project);


        // ==========================================
        // ADD TO MAIN MAP
        // ==========================================

        window.addProjectToMap(savedProject);


        window.addProjectToList(savedProject);


        // ==========================================
        // CLEAN UP
        // ==========================================

        form.reset();

        selectedCoordinates = null;

        if (locationMarker) {
            locationMarker.remove();
            locationMarker = null;
        }

        dialog.close();

    } catch (error) {

        console.error(error);

        alert(
            'There was a problem adding the project. Please try again.'
        );
    }

});

function refreshModalProjectMarkers() {

    // Remove existing project markers
    modalProjectMarkers.forEach(marker => {
        projectMap.removeLayer(marker);
    });

    modalProjectMarkers = [];

    // Get the current projects
    const existingProjects = window.gridguardProjects || [];

    existingProjects.forEach(project => {

        const marker = L.marker([
            project.latitude,
            project.longitude
        ]);

        marker.bindPopup(`
            <b>${project.projectname}</b><br>
            ${project.companyname}<br>
            ${project.type}<br>
            ${project.city}, ${project.state}<br>
            Start: ${project.startMonth}/${project.startYear}
        `);

        marker.addTo(projectMap);

        modalProjectMarkers.push(marker);
    });
}