
document.addEventListener('DOMContentLoaded', () => {

    fetchTotalStatistics();
    document.getElementById('IssueSelect').addEventListener('change', (event) => {
        fetchIssueStatistics(event.target.value);
    });
    document.getElementById('viewBtn').addEventListener('click', () => {
        const selectedIssue = document.getElementById('IssueSelect').value;
        fetchIssueStatistics(selectedIssue);
    });
});

function fetchTotalStatistics() {
    fetch('http://localhost:4000/fetchTotalStatistics')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Total statistics data:', data); // Debugging

            document.querySelector('.totalComp').textContent = data.totalComp;
            document.querySelector('.totalSolved').textContent = data.totalSolved;
            document.querySelector('.totalPending').textContent = data.totalPending;
        })
        .catch(error => console.error('Error fetching total statistics:', error));
}

function fetchIssueStatistics(issue) {
    fetch(`http://localhost:4000/fetchIssueStatistics?issue=${issue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Issue statistics data:', data); // Debugging

            document.querySelector('.singleComp').textContent = data.totalComp;
            document.querySelector('.singleSolved').textContent = data.totalSolved;
            document.querySelector('.singlePending').textContent = data.totalPending;
            document.querySelector('.singleComplaint').style.display = 'flex';
        })
        .catch(error => console.error('Error fetching issue statistics:', error));
}

// handle back to dash board

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutBtn');
    logoutButton.addEventListener('click', handleLogout);
  });
  
  function handleLogout(event) {
    event.preventDefault();
   const params = new URLSearchParams(window.location.search);

    const Name = params.get('name');
    const Email = params.get('email');
    

    const url = `admin.html?name=${Name}&email=${Email}`;
    window.location.href = url;
  }
  
