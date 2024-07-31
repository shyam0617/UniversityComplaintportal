document.addEventListener('DOMContentLoaded', () => {
    const changePasswordButton = document.getElementById('changePasswordBtn');
    changePasswordButton.addEventListener('click', handleChangePassword);
  });
  
  function handleChangePassword(event) {
    event.preventDefault();
    const name = document.getElementById('adminName').textContent;
    const email = document.getElementById('adminEmail').textContent;
    const url = `changePassword.html?name=${name}&email=${email}`;
    window.location.href = url;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const name = params.get('name');
      const email = params.get('email');
     
      document.getElementById('adminName').textContent = name;
      document.getElementById('adminEmail').textContent = email;
    });
     
    document.addEventListener('DOMContentLoaded', () => {
      const viewComplaintsButton = document.getElementById('viewGrievancesBtn');
      viewComplaintsButton.addEventListener('click', handleViewGrievances);
    });
    //jkwsjk
    function handleViewGrievances(event) {
      event.preventDefault();
      const issue = document.getElementById('IssueSelect').value;
      const Name=document.getElementById('adminName').textContent;
      const Email=document.getElementById('adminEmail').textContent;
      // const url = `C:/Users/akava/Desktop/Project/complaint portal/AdminDashboard/viewComplaints.html?hostel=${hostel}&wing=${wing}&name=${Name}&email=${Email}&issue=${issue}`;
      const url = `viewComplaints.html?name=${Name}&email=${Email}&issue=${issue}`;
      window.location.href = url;
    }
    
    // handle view statistics
    
    document.addEventListener('DOMContentLoaded', () => {
      const viewStatisticsButton = document.getElementById('viewStatisticsBtn');
      viewStatisticsButton.addEventListener('click', handleViewStatistics);
    });
    //jkwsjk
    function handleViewStatistics(event) {
      event.preventDefault();
      // const issue = document.getElementById('IssueSelect').value;
      const Name=document.getElementById('adminName').textContent;
      const Email=document.getElementById('adminEmail').textContent;
      // const url = `C:/Users/akava/Desktop/Project/complaint portal/AdminDashboard/viewComplaints.html?hostel=${hostel}&wing=${wing}&name=${Name}&email=${Email}&issue=${issue}`;
      const url = `viewStatistics.html?name=${Name}&email=${Email}`;
      window.location.href = url;
    }

     document.addEventListener('DOMContentLoaded', () => {
      const logoutButton = document.getElementById('logoutBtn');
      logoutButton.addEventListener('click', handleLogout);
    });
    
    function handleLogout(event) {
      event.preventDefault();
      window.location.href = 'C:/Users/akava/Desktop/Project/complaint portal/LoginPage/index.html';
    }