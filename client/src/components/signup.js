import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import axios from 'axios';

const Signup = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

   const signupUser = async (userData) => {
    try {
        console.log('Coming in signupUser in try block')
        const response = await axios.post('http://localhost:3000/api/signup', userData);
        return response.data;
    } catch (error) {
        console.log('Error signing up:', error);
        throw error;
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('okay, submit button pressed');
    try {
        const response = await signupUser(formData);
        console.log("my response:",response);
        // Handle success response here
        const usernameInitials = response.user.username.substring(0, 2);
        console.log("Hey my username:",usernameInitials)
        if (response.user.username[0] === '2'){
          navigate('/homeStudent');
        }
        else{
          switch (usernameInitials) {
            case '00':
                navigate('/homeInstructor');
                break;
            case '99':
                navigate('/homeAdmin');
                break;
            default:
                // Handle unknown user type
                console.log('Unknown user type');
                break;
          }
        }
    } catch (error) {
        console.log('An error occurred:', error.response.data.error);
        // Handle error response here and update the UI with the error message
        // For example, you can set the error message in the state and display it on the form
        // Update the state to store the error message
        console.log("PLEASE HO JAO")
        setError(error.response.data.error);
    }
};

  return (
    <div className="login-page">
        <div className="login-header"> Zambeel Management <span class="lib-name">System</span></div>
            <div className='partition'></div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            className="pass-inp"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="pass-inp"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="pass-inp"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="pass-inp"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div>
          <button className="sub-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div className="question">Already have an account? <a href="/">Login</a></div>
    </div>
  );
};

export default Signup;


// import '../styles/login.css'


// const Signup = (prop)=>{

//     return (        
//         <div className="login-page">
//             <div className="login-header"> Zambeel Management <span class="lib-name">System</span></div>
//             <div className='partition'></div>
//             <form className='form' >
//                 <div >
//                     <input className="pass-inp" type='username' placeholder='something@lums.edu.pk'  />
//                 </div>
//                 <div >
//                     <input className="pass-inp" type='username' placeholder='First Name'  />
//                 </div>
//                 <div >
//                     <input className="pass-inp" type='username' placeholder='Last Name'  />
//                 </div>
//                <div>
//                     <input className="pass-inp" type='password' placeholder='password'  />
//                </div>
//                <div>
//                 <button className="sub-button">Sign Up</button>
//                </div>
                
//             </form>
//             <div className="question">Already have an account? <a href="/">Login</a></div>
//         </div>
//     )

// }

// export default Signup