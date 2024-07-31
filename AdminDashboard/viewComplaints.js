document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    const issue = params.get('issue');
    const email = params.get('name');
    const name = params.get('email');
    
    document.getElementById('studentName').textContent = name;
    document.getElementById('studentEmail').textContent = email;
  
    console.log(issue);
    fetchGrievances(issue);
});
  
  
function fetchGrievances(issue) {
    const url = `http://localhost:4000/AdminViewComplaints`;
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch grievances');
            }
        })
        .then((grievances) => {
            const grievancesBody = document.getElementById('grievancesBody');
            grievancesBody.innerHTML = '';
        
            grievances.forEach((grievance) => {
                if (grievance.Issue === issue) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${grievance.Id}</td>
                        <td>${grievance.Name}</td>
                        <td>${grievance.Issue}</td>
                        <td>${grievance.Description}</td>
                        <td>
                            <select class="status-select" data-grievance-id="${grievance._id}">
                                <option value="Pending" ${grievance.Status === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Completed" ${grievance.Status === 'Completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </td>
                    `;
                    grievancesBody.appendChild(row);
                    
                    // Set color based on status
                    const statusCell = row.querySelector('td:last-child');
                    if (grievance.Status === 'Completed') {
                        statusCell.style.color = 'green';
                    } else {
                        statusCell.style.color = 'red';
                    }
                }
            });
  
            // Add event listener to status selects
            const statusSelects = document.querySelectorAll('.status-select');
            statusSelects.forEach((select) => {
                select.addEventListener('change', handleStatusChange);
            });
        })
        .catch((error) => {
            console.error('Error retrieving grievances:', error);
        });
}
  
function handleStatusChange(event) {
    const grievanceId = event.target.dataset.grievanceId;
    const newStatus = event.target.value;
  
    const requestBody = {
        Status: newStatus
    };
  
    fetch(`http://localhost:4000/updateStatus/${grievanceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then((response) => {
        if (response.ok) {
            console.log('Grievance status updated successfully');
            
            // Update color after status change
            const statusCell = event.target.parentNode;
            if (newStatus === 'Completed') {
                statusCell.style.color = 'green';
            } else {
                statusCell.style.color = 'red';
            }
        } else {
            console.log('Failed to update grievance status');
        }
    })
    .catch((error) => {
        console.error('Error during grievance status update:', error);
    });
}

// Handle admin logout
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutBtn');
    logoutButton.addEventListener('click', handleLogout);
});
  
function handleLogout(event) {
    event.preventDefault();
    const Name = document.getElementById('studentName').textContent;
    const Email = document.getElementById('studentEmail').textContent;
    const url = `admin.html?name=${encodeURIComponent(Name)}&email=${encodeURIComponent(Email)}`;
    window.location.href = url;
}
