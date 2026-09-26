const dialog = document.getElementById('projectDialog');
const form = document.getElementById('projectForm');

let projectMap = null;
let selectedCoordinates = null;
let locationMarker = null;


// Open dialog
document.getElementById('newProjectBtn').addEventListener('click', () => {

    dialog.showModal();

    // Create the map the first time the dialog opens
    if (!projectMap) {

        projectMap = L.map('projectMap').setView([40.7128, -74.0060], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(projectMap);

        // When the user clicks the map
        projectMap.on('click', (e) => {

            selectedCoordinates = {
                lat: e.latlng.lat,
                lng: e.latlng.lng
            };

            // Display coordinates in the input
            document.getElementById('coordinates').value =
                `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;

            // Remove old marker
            if (locationMarker) {
                locationMarker.remove();
            }

            // Add marker at clicked location
            locationMarker = L.marker(e.latlng).addTo(projectMap);
        });
    }

    // Leaflet needs this because the map was initially inside a hidden dialog
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


// Save
form.addEventListener('submit', (e) => {

    e.preventDefault();

    // Make sure the user selected a location
    if (!selectedCoordinates) {
        alert('Please select a location on the map.');
        return;
    }

    const project = {

        company: document.getElementById('companyName').value,

        name: document.getElementById('projectName').value,

        type: document.getElementById('projectType').value,

        state: document.getElementById('state').value,

        startMonth: document.getElementById('startMonth').value,

        startYear: document.getElementById('startYear').value,

        // Save the coordinates
        latitude: selectedCoordinates.lat,

        longitude: selectedCoordinates.lng
    };

    console.log(project);

    form.reset();

    selectedCoordinates = null;

    if (locationMarker) {
        locationMarker.remove();
        locationMarker = null;
    }

    dialog.close();
});