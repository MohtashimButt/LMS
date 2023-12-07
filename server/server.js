import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import AdminModel from './models/admin.js';
import InstructorModel from './models/instructor.js';
import StudentModel from './models/student.js';
import auth from './middleware/auth.js';
import SectionsModel from './models/sections.js';
import EnrollmentsModel from './models/enrollment.js';
import CourseModel from './models/course.js';

dotenv.config();

const app = express();

app.use(express.json())

app.use(cors())

mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
    console.log("Connected to Database")
})})
.catch((error)=>{
    console.log(error)
})

//Make your API calls for every usecase here

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// ADMIN
app.get("/getAdmin", async (req, res) => {
    try {
      const result = await AdminModel.find({}).exec();
      res.json(result);
      console.log(result)
      console.log("MASTI")
    } catch (error) {
      console.error('Error fetching admin data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.post("/createAdmin", async (req, res) => {
  try {
      const adminData = req.body;
      const newAdmin = new AdminModel(adminData);
      await newAdmin.save();
      res.json(newAdmin);  // Return the created admin instead of the request body
  } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// INSTRUCTOR
app.get("/getInstructor", async (req, res) => {
  try {
    const result = await InstructorModel.find({}).exec();
    res.json(result);
    console.log(result)
  } catch (error) {
    console.error('Error fetching instructor data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/getInstructor/:username", async (req, res) => {
  const { username } = req.params; // Get the username from the request parameters
  try {
    const result = await InstructorModel.findOne({ username }).exec(); // Find instructor by username
    if (!result) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching instructor data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch sections based on instructor_username
app.get("/api/sections/:instructor_username", async (req, res) => {
  const { instructor_username } = req.params;
  try {
    const sections = await SectionsModel.find({ instructor_username }).select("course_name section_no");
    console.log(sections)
    res.json(sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch enrollments based on course_name and section_no
app.post("/api/enrollment", async (req, res) => {
  // const { pairs } = req.body; // Pairs array containing course_name and section_no
  // console.log("pairs:")
  // console.log(pairs)
  try {
    const result = await EnrollmentsModel.find({}).exec();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/createInstructor", async (req, res) => {
try {
    const instructorData = req.body;
    const newInstructor = new InstructorModel(instructorData);
    await newInstructor.save();
    res.json(newInstructor);  // Return the created Instructor instead of the request body
} catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

// STUDENT
app.get("/getStudent", async (req, res) => {
  try {
    const result = await StudentModel.find({}).exec();
    res.json(result);
    console.log(result)
    console.log("MASTI")
  } catch (error) {
    console.error('Error fetching student data blah blah:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/api/getStudent/:username", async (req, res) => {
  const { username } = req.params; // Get the username from the request parameters
  console.log("Server men aa gya hu")
  try {
    const result = await StudentModel.findOne({ username }).exec(); // Find student by username
    if (!result) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching Student data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post('/api/updateInstructorRanking', async (req, res) => {
  try {
    console.log("UPDATE WALE SERVER MEN AGYA HU");
    const { instructorUsername, newRanking } = req.body;

    // Find the instructor by username
    const instructor = await InstructorModel.findOne({ username: instructorUsername });

    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    instructor.ranking = newRanking;  //assign
    await instructor.save();          //save
    // Respond with the updated instructor
    res.json({ success: true, instructor });
  } catch (error) {
    console.error('Error updating instructor ranking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
          //Enrollment
app.post('/api/enrollStudent', async (req, res) => {
  console.log("AAAAAAAAAAAAaaa")
  try {
    
    const { studentUsername, courseName, sectionNumber, grade } = req.body;

    // Create a new enrollment entry
    const enrollment = new EnrollmentsModel({
      student_username: studentUsername,
      course_name: courseName,
      section_no: sectionNumber,
      grade: grade,
    });
    console.log("enrollStudent api k andar server")

    // Save the enrollment to the database
    await enrollment.save();

    // Respond with success message or any other data
    res.json({ success: true, message: 'Enrollment HOGAI' });
  } catch (error) {
    console.error('SERVER MEN HU OR ENROLLMENT NI HUI:', error);
    res.status(500).json({ error: 'Internal Server Error hue hue' });
  }
});

// SEARCH
app.get('/api/searchCourses', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    // Perform a case-insensitive search for courses containing the search term
    const courses = await CourseModel.find({ course_name: { $regex: searchTerm, $options: 'i' } });

    res.json({ success: true, courses });
    console.log("BHAIAIAIAIAI")
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/createStudent", async (req, res) => {
try {
    const studentData = req.body;
    const newStudent = new StudentModel(studentData);
    await newStudent.save();
    res.json(newStudent);  // Return the created Student instead of the request body
} catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

// SIGN-UP API
app.post("/api/signup", async (req, res) => {
  try {
    const userData = req.body;
    let newUser;
    console.log('Received user data:', userData);

    const { username, firstName, lastName, password } = req.body;

    // Validate or process individual fields
    console.log('Username:', username);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Password:', password);

    // student start from 2 // instructor: 00 // admin: 99

    if (!username || !password){
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!validator.isEmail(username)){
      return res.status(400).json({ error: 'invalid Email format' });
    }

    if (!validator.isStrongPassword(password)){
      console.log('password not strong enough')
      return res.status(400).json({ error: 'Password not strong enough' });
    }

    if (!username.includes('@lums.edu.pk')) {
      console.log("Invalid email domain")
      return res.status(400).json({ error: 'Invalid email domain' });
    }

    let userModel;
    if (username.startsWith('2') && (username.length == 20 || /^\d+$/.test(username.slice(0, 8)))) {
      userModel = StudentModel;
      console.log("Student")
      const existingStudent = await StudentModel.findOne({ username });
      if(existingStudent){
        console.log('Email already in use');
        return res.status(400).json({ error: 'Email already in use' });
      }
    } else if (username.startsWith('00')) {
      userModel = InstructorModel;
      console.log("Instructor")
      const existingInstructor = await InstructorModel.findOne({ username });
      if(existingInstructor){
        console.log('Email already in use');
        return res.status(400).json({ error: 'Email already in use' });
      }
    } else if (username.startsWith('99')) {
      userModel = AdminModel;
      console.log("Admin")
      const existingAdmin = await AdminModel.findOne({ username });
      if(existingAdmin){
        console.log('Email already in use');
        return res.status(400).json({ error: 'Email already in use' });
      }
    } else {
      console.log("Its coming here")
      return res.status(400).json({ error: 'Invalid username format' });
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Create a new user based on the determined userModel
    if (userModel == StudentModel){
      const defaultDOB = new Date('0000-01-01');
      newUser = new StudentModel({
      username: username,
      first_name: firstName,
      last_name: lastName,
      password: hash,
      date_of_birth: defaultDOB,
      major: "undeclared",
    });
    }
    else if (userModel == InstructorModel){
      newUser = new InstructorModel({
      username: username,
      first_name: firstName,
      last_name: lastName,
      password: hash,
      department: "undecided",
      ranking: 0,
      salary: 0,
    });
    }
    else if (userModel == AdminModel){
      newUser = new AdminModel({
      username: username,
      first_name: firstName,
      last_name: lastName,
      password: hash,
    });
    }
    console.log("okay, I think its doing everything. should save.")
    const user = await newUser.save();
    const token = createToken(user._id)

    res.status(201).json({ message: 'User signed up successfully', user: userData, token });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// LOG-IN API STUFF
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Both username and password are required' });
    }

    let userModel;
    if (username.startsWith('2') && (username.length == 20 || /^\d+$/.test(username.slice(0, 8)))) {
      userModel = StudentModel;
    } else if (username.startsWith('00')) {
      userModel = InstructorModel;
    } else if (username.startsWith('99')) {
      userModel = AdminModel;
    } else {
      return res.status(400).json({ error: 'Invalid username format' });
    }
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect username' });
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match){
      return res.status(401).json({ error: 'Incorrect password' })
    }
    const token = createToken(user._id)


    // Depending on the user type, you can send a different response
    switch (userModel) {
      case StudentModel:
        return res.status(200).json({ userType: 'student', message: 'Login successful', token });
      case InstructorModel:
        return res.status(200).json({ userType: 'instructor', message: 'Login successful', token });
      case AdminModel:
        return res.status(200).json({ userType: 'admin', message: 'Login successful', token });
      default:
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});
