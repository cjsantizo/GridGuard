
const dialog = document.getElementById('projectDialog');
const form = document.getElementById('projectForm');

// open / close
document.getElementById('newProjectBtn').addEventListener('click', () => dialog.showModal());
document.getElementById('cancelBtn').addEventListener('click', () => dialog.close());

// save
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // grab everything the user entered
  const project = {
    company: document.getElementById('companyName').value,
    name: document.getElementById('projectName').value,
    type: document.getElementById('projectType').value,
    state: document.getElementById('state').value,
    startMonth: document.getElementById('startMonth').value, // "03"
    startYear: document.getElementById('startYear').value    // "2027"
  };

  console.log(project); // check it works (F12 -> Console)

  // later: send "project" to your backend / add it to the list here

  form.reset();
  dialog.close();
});
