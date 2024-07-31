// change password for admin
document.addEventListener('DOMContentLoaded', function() {
    // Handle the form submission when the "Change Password" button is clicked
    const changePasswordBtn = document.querySelector('#change-password-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const Name = urlParams.get('name'); // Get the 'name' parameter from the URL
    const Email = urlParams.get('email'); // Get the 'name' parameter from the URL
    
    changePasswordBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Retrieve input values
        const currentPassword = document.querySelector('#currentPassword').value;
        const newPassword = document.querySelector('#newPassword').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;
        const email = new URLSearchParams(window.location.search).get('email'); // Get email from the URL
    
        // Perform validation
        if (newPassword !== confirmPassword) {
            displayErrorMessage('Passwords do not match');
            return;
        }
        // Create a request object
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email, // Send email
                currentPassword: currentPassword,
                newPassword: newPassword
            })
        };

        // Send a request to change the password
        fetch('http://localhost:4000/changePassword', request)
            .then(function(response) {
                if (response.ok) {
                    document.querySelector('#currentPassword').value='';
                    document.querySelector('#newPassword').value='';
                    document.querySelector('#confirmPassword').value='';
                    document.querySelector('#email').value='';
         
                    return response.json();
                } else {
                    throw new Error('Failed to change password');
                }
            })
            .then(function(data) {
                if (data.success) {
                    displaySuccessMessage('Password changed successfully');
                } else {
                    displayErrorMessage('Failed to change password');
                }
            })
            .catch(function(error) {
                console.error(error);
                displayErrorMessage('An error occurred');
            });
    });

    // Function to display error message
    function displayErrorMessage(message) {
        const errorMessage = document.querySelector('.error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        const successMessage = document.querySelector('.success-message');
        successMessage.style.display = 'none';
    }

    // Function to display success message
    function displaySuccessMessage(message) {
        const successMessage = document.querySelector('.success-message');
        successMessage.textContent = message;
        successMessage.style.display = 'block';

        const errorMessage = document.querySelector('.error-message');
        errorMessage.style.display = 'none';
    }

    // Handle the "Back to Dashboard" button click
    const backToDashboardBtn = document.querySelector('.back-to-dashboard');

    backToDashboardBtn.addEventListener('click', function(event) {
        event.preventDefault();

        // Retrieve the name and email from the URL
        // const name = new URLSearchParams(window.location.search).get('name');
        // const email = new URLSearchParams(window.location.search).get('email');

        // Build the URL with parameters
        const url = `C:/Users/akava/Desktop/Project/complaint portal/AdminDashboard/admin.html?name=${Name}&email=${Email}`;
        
        // Redirect to admin.html with parameters
        window.location.href = url;
    });
});
