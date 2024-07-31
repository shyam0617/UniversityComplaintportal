const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ComplaintPortal')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the Mongoose schema for registrations
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  user: String,
  
});

// Create the Mongoose model for registrations
const Registration = mongoose.model('Registration', registrationSchema);

// Create a Mongoose schema for the queries
const querySchema = new mongoose.Schema({
  Id: String,
  Name: String,
  Year: String,
  Issue: String,
  Description: String,
  Status: String
});

// Create a Mongoose model for the queries
const Query = mongoose.model('Query', querySchema);

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  Registration.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log('Login success');
        // Send the user data back as JSON response
        res.status(200).json({ name: user.name, user: user.user, email: user.email });
      } else {
        console.log('Login failed');
        // If user not found, send a 404 status
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      // Send a 500 status for internal server error
      res.sendStatus(500);
    });
});


// const newRegistration = new Registration({
//   name: 'Gopaldas Pavan',
//   email: 'iampavankumar47@gmail.com',
//   password: 'pavan123@',
//   user: 'MainAdmin'
// });

// newRegistration.save()
// .then((savedRegistration) => {
//   console.log('Registration saved:', savedRegistration);
// })
// .catch((error) => {
//   console.error('Error saving registration:', error);
// });




//add a query or complaint
app.post('/submit-grievance', (req, res) => {
  console.log("iuv");
  // Get the data from the request body
  const { id, name, year, issue, description } = req.body;

  // Create a new query document
  const query = new Query({
    Id: id,
    Name: name,
    Year: year,
    Issue: issue,
    Description: description,
    Status: 'Pending'
  });

  // Save the query to the database
  query.save()
    .then(() => {
      console.log('Query saved:', query);
      res.sendStatus(200); // Send a success response
    })
    .catch((error) => {
      console.error('Error saving query:', error);
      res.sendStatus(500); // Send an error response
    });
});



// fetch the complaints of specific student

app.get('/get-grievances', async (req, res) => {
  try {
   
    
    const email = req.query.email;
    console.log(email);
    if (!email) {
      return res.status(400).json({ error: 'email parameter is missing' });
    }
    const grievances = await Query.find({ Email: email }).exec();
    res.json(grievances);
  } catch (error) {
    console.error('Error fetching grievances:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// view complaints by admin
app.get('/AdminViewComplaints', async (req, res) => {
  try {
    console.log("sai");
    // const hostel=req.query.name;
    // const wing=req.query.wing;
    const issue=req.query.issue;
    
    // console.log(hostel);
    // if (!hostel) {
    //   return res.status(400).json({ error: 'Name parameter is missing' });
    // }
    // if (!wing) {
    //   return res.status(400).json({ error: 'Name parameter is missing' });
    // }
    // if (!issue) {
    //   return res.status(400).json({ error: 'Name parameter is missing' });
    // }
    const complaints = await Query.find().exec();
    console.log(complaints);
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching grievances:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// change the password  
app.post('/changePassword', async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Find the user by their email
    const user = await Registration.findOne({ email });

    // If the user with the provided email is not found, return a 404 status
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare the current password provided by the user with the password stored in the database
    if (user.password !== currentPassword) {
      return res.status(400).json({ success: false, message: "Incorrect current password" });
    }

    // Update the password for the user with the provided email
    const updatedUser = await Registration.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true }
    );

    // If the user with the provided email is not found during the update, return a 404 status
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If the password is successfully updated, return a success response
    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error('Error updating password:', error);
    // If an error occurs during the update process, return a 500 status
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Handle user registration POST request
app.post('/signup', async (req, res) => {
  const { name, email, user } = req.body;
  const generatedPassword = generateRandomPassword();

  try {
    const existingUser = await Registration.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    const registration = new Registration({
      name,
      email,
      password: generatedPassword,
      user,
    });
    console.log(generatedPassword);
    await registration.save();
    sendEmailToUser(email,'New User Created', `Your password is : ${generatedPassword}`);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.sendStatus(500);
  }
});

// function sendEmailToUser(to, subject, text) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'shyamvudumu@gmail.com',
//       pass: 'cghwfoqczlxftbop'
//     }
//   });

  // const mailOptions = {
  //   from: 'shyamvudumu@gmail.com',
  //   to,
  //   subject,
  //   text
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error('Error sending email:', error);
  //   } else {
  //     console.log('Email sent:', info.response);
  //   }
  // });
// }

// Function to generate a random password
function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const passwordLength = 8;
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}



// Handle password recovery POST request
app.post('/forgot-password', async (req, res) => {
  const { name, email, user } = req.body;


  try {
    const userRecord = await Registration.findOne({ name, email, user }).exec();
    console.log(userRecord);
    if (userRecord) {
      const password = userRecord.password;
      sendEmailToUser(email, 'Password Recovery', `Your password is: ${password}`);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error during password recovery:', error);
    res.sendStatus(500);
  }
});





// Function to send an email using Nodemailer
function sendEmailToUser(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shyamvudumu@gmail.com',
      pass: 'cghwfoqczlxftbop'
    }
  });

  const mailOptions = {
    from: 'shyamvudumu@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}


//update status

app.put('/updateStatus/:id', async (req, res) => {
  const grievanceId = req.params.id;
  const { Status } = req.body;

  try {
    const updatedGrievance = await Query.findByIdAndUpdate(grievanceId, { Status }, { new: true });

    if (!updatedGrievance) {
      return res.status(404).json({ error: 'Grievance not found' });
    }

    res.status(200).json(updatedGrievance);
  } catch (error) {
    console.error('Error updating grievance status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

