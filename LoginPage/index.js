// document.addEventListener('DOMContentLoaded', () => {
//     const loginButton = document.querySelector('#LOGIN');
//     const errorMessage = document.querySelector('.error-message');
//     errorMessage.style.display = 'none';
  
//     loginButton.addEventListener('click', () => {
//       const email = document.querySelector('.email').value;
//       const password = document.querySelector('.password').value;
  
//       const requestBody = {
//         email: email,
//         password: password
//       };
  
//       fetch('http://localhost:4000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//       })
//       .then(response => {
//         if (response.ok) {
//           console.log('Login success');
//           return response.json();
//         } else {
//           console.log('Login failed');
//           throw new Error('Login failed');
//         }
//       })
//       .then(data => {
//         console.log('Data received from server:', data);
//         if (data.user === 'MainAdmin') {
//             console.log('Redirecting to MainAdmin Dashboard');
//             const encodedName = encodeURIComponent(data.name);
//             const encodedEmail = encodeURIComponent(data.email);
//             window.location.href = `C:/Users/akava/Desktop/Project/complaint portal/MainAdminDashboard/mainadmin.html?name=${encodedName}&email=${encodedEmail}`;
//         } else if (data.user === 'Admin') {
//             console.log('Redirecting to Admin Dashboard');
//             window.location.href = `C:/Users/akava/Desktop/Project/complaint portal/AdminDashboard/admin.html?name=${data.name}&email=${data.email}`;
//         } else if (data.user === 'Student') {
//             console.log('Redirecting to Student Dashboard');
//             window.location.href = `C:/Users/akava/Desktop/Project/complaint portal/StudentDashboard/student.html?name=${data.name}&email=${data.email}`;
//         } else {
//             console.log('Unknown user type:', data.user);
//         }
//     })
//     .catch(error => {
//         console.error('Error during login:', error);
//         errorMessage.style.display = 'block'; // Show the error message
//         document.querySelector('.email').value = ''; // Clear email input field
//         document.querySelector('.password').value = ''; // Clear password input field
//     });
//   });
// });

// const forgotPasswordButton = document.querySelector('.forgot-password');

// forgotPasswordButton.addEventListener('click', () => {
//     window.location.href = `C:/Users/akava/Desktop/Project/complaint portal/LoginPage/forgotPassword.html`;
// });

// // Disable back navigation on index.html
// window.history.pushState(null, '', window.location.href);
// window.onpopstate = function(event) {
//     window.history.pushState(null, '', window.location.href);
// };


document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('#LOGIN');
  const errorMessage = document.querySelector('.error-message');
  errorMessage.style.display = 'none';

  loginButton.addEventListener('click', () => {
      const email = document.querySelector('.email').value;
      const password = document.querySelector('.password').value;

      const requestBody = {
          email: email,
          password: password
      };

      fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
      })
      .then(response => {
          if (response.ok) {
              console.log('Login success');
              return response.json();
          } else {
              console.log('Login failed');
              throw new Error('Login failed');
          }
      })
      .then(data => {
          console.log('Data received from server:', data);
          if (data.user === 'MainAdmin') {
              console.log('Redirecting to MainAdmin Dashboard');
              const encodedName = encodeURIComponent(data.name);
              const encodedEmail = encodeURIComponent(data.email);
              window.location.href = `C:/Users/akava/Desktop/Project/complaint portal/MainAdminDashboard/mainadmin.html?name=${encodedName}&email=${encodedEmail}`;
          } else if (data.user === 'Admin') {
              console.log('Redirecting to Admin Dashboard');
              window.location.href = `C:/Users/akava/Desktop/Project/complaint portal/AdminDashboard/admin.html?name=${data.name}&email=${data.email}`;
          } else if (data.user === 'Student') {
              console.log('Redirecting to Student Dashboard');
              window.location.href = `C:/Users/akava/Desktop/Project/complaint portal/StudentDashboard/student.html?name=${data.name}&email=${data.email}`;
          } else {
              console.log('Unknown user type:', data.user);
          }
      })
      .catch(error => {
          console.error('Error during login:', error);
          errorMessage.style.display = 'block';
          document.querySelector('.email').value = '';
          document.querySelector('.password').value = '';
      });
  });

  const forgotPasswordButton = document.querySelector('.forgot-password');
  forgotPasswordButton.addEventListener('click', () => {
      window.location.href = `C:/Users/akava/Desktop/Project/complaint portal/LoginPage/forgotPassword.html`;
  });

  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.querySelector('.password');

  togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
  });
});

// Disable back navigation on index.html
window.history.pushState(null, '', window.location.href);
window.onpopstate = function(event) {
  window.history.pushState(null, '', window.location.href);
};
