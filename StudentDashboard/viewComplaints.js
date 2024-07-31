// viewComplaints.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const email = params.get('email');

  // Update profile information
  document.getElementById('studentName').textContent = name;
  document.getElementById('studentEmail').textContent = email;

  // Fetch grievances data
  fetch(`http://localhost:4000/get-grievances?email=${email}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const grievancesBody = document.getElementById('grievancesBody');

          data.forEach(grievance => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${grievance.Name}</td>
                  <td>${grievance.Year}</td>
                  <td>${grievance.Issue}</td>
                  <td>${grievance.Description}</td>
                  <td class="${grievance.Status === 'Completed' ? 'solved-status' : 'pending-status'}">${grievance.Status}</td>
              `;
              grievancesBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching grievances:', error);
      });
});

// Logout functionality
document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutBtn');
  logoutButton.addEventListener('click', handleLogout);
});

function handleLogout(event) {
  event.preventDefault();
  const name = document.getElementById('studentName').textContent;
  const email = document.getElementById('studentEmail').textContent;
  const url = `student.html?name=${name}&email=${email}`;
  window.location.href = url;
}
