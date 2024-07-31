document.addEventListener('DOMContentLoaded', () => {
  // Extract URL parameters for Name and Email
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name'); // Get the 'name' parameter from the URL
  const email = urlParams.get('email'); // Get the 'email' parameter from the URL

  // Populate the profile section with the extracted Name and Email
  document.getElementById('studentName').textContent = name;
  document.getElementById('studentEmail').textContent = email;

  // Grievance form submission
  const grievanceForm = document.getElementById('grievanceForm');
  grievanceForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form input values
    const id = document.getElementById('id').value;
    const grievanceName = document.getElementById('id-name').value;
    const year = document.getElementById('year').value;
    const issue = document.getElementById('issue').value;
    const description = document.getElementById('description').value;

    // Create grievance data object
    const grievanceData = {
      id: id,
      name: grievanceName,
      year: year,
      issue: issue,
      description: description,
      email:email
    };

    // Send grievance data to server
    fetch('http://localhost:4000/submit-grievance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(grievanceData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Grievance submitted successfully');
        // Clear the form
        grievanceForm.reset();
      } else {
        console.log('Failed to submit grievance');
      }
    })
    .catch(error => {
      console.error('Error during grievance submission:', error);
    });
  });

  // View Grievances button
  const viewGrievancesButton = document.getElementById('viewGrievancesBtn');
  viewGrievancesButton.addEventListener('click', handleViewGrievances);

  // Change Password button
  const changePasswordButton = document.getElementById('changePasswordBtn');
  changePasswordButton.addEventListener('click', handleChangePassword);

  // Logout button
  const logoutButton = document.getElementById('logoutBtn');
  logoutButton.addEventListener('click', handleLogout);
});

function handleViewGrievances(event) {
  event.preventDefault();
  const name = document.getElementById('studentName').textContent;
  const email = document.getElementById('studentEmail').textContent;
  const url = `C:/Users/akava/Desktop/Project/complaint portal/StudentDashboard/viewComplaints.html?name=${name}&email=${email}`;
  window.location.href = url;
}

function handleChangePassword(event) {
  event.preventDefault();
  const name = document.getElementById('studentName').textContent;
  const email = document.getElementById('studentEmail').textContent;
  const url = `C:/Users/akava/Desktop/Project/complaint portal/ChangePasswordDashboard/ChangePassword.html?name=${name}&email=${email}`;
  window.location.href = url;
}

function handleLogout(event) {
  event.preventDefault();
  window.location.href = 'C:/Users/akava/Desktop/Project/complaint portal/LoginPage/index.html';
}
