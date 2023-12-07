import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Login = () => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }; 
    
    const navigate = useNavigate();
    const loginUser = async (userData) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/login",
            userData
          );
          console.log("Response data:", response.data);
          const userType = response.data.userType;
          const { username,} = userData;
          switch (userType) {
            case "student":
              cookies.set("StudentTOKEN", response.data.token, {
                path: "/",
              });
              cookies.set("StudentUsername", username, {
                path: "/",
              });
              break;
            case "instructor":
              cookies.set("InstructorTOKEN", response.data.token, {
                path: "/",
              });
              cookies.set("InstructorUsername", username, {
                path: "/",
              });
              break;
            case "admin":
              cookies.set("AdminTOKEN", response.data.token, {
                path: "/",
              });
              cookies.set("AdminUsername", username, {
                path: "/",
              });
              break;
            default:
              console.log("Unknown user type");
              break;
          }
          // how it was being done before

          // cookies.set("TOKEN", response.data.token, {
          //     path: "/",
          // });
          // window.location.href = "/auth";
          return response.data;
        } catch (error) {
            console.log('1st one Error logging in:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('okay, submit button pressed');
        try {
            const response = await loginUser(formData);
            console.log("this is my response:",response);

            // Determine user type based on username initials
            const userType = response.userType;

            switch (userType) {
                case 'student':
                    navigate('/homeStudent')
                    break;
                case 'instructor':
                    navigate('/homeInstructor');
                    break;
                case 'admin':
                    navigate('/homeAdmin');
                    break;
                default:
                    console.log('Unknown user type');
                    break;
            }
        } catch (error) {
            console.log('here An error occurred:', error.response.data.error);
            setError(error.response.data.error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-header">Zambeel Management <span className="lib-name">System</span></div>
            <div className='partition'></div>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <input
                        className="pass-inp"
                        type='text'
                        placeholder='Username'
                        name="username"
                        value={formData.username}
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
                    <button className="sub-button" type="submit">Login</button>
                </div>
            </form>
            <div className="question">Don't have an account? <a href="/signup">Signup</a></div>
        </div>
    );
};

export default Login;



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/login.css';

// const Login = (props) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = (event) => {
//         event.preventDefault();

        

//         // Redirect to "/home" after successful login
//         navigate('/homeAdmin');
//     };

//     return (
        // <div className="login-page">
        //     <div className="login-header">Zambeel Management <span className="lib-name">System</span></div>
        //     <div className='partition'></div>
        //     <form className='form' onSubmit={handleLogin}>
        //         <div>
        //             <input
        //                 className="user-inp"
        //                 type='username'
        //                 placeholder='username'
        //                 value={username}
        //                 onChange={(e) => setUsername(e.target.value)}
        //             />
        //         </div>
        //         <div>
        //             <input
        //                 className="pass-inp"
        //                 type='password'
        //                 placeholder='password'
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //         </div>
        //         <div>
        //             <button className="sub-button" type="submit">Login</button>
        //         </div>
        //     </form>
        //     <div className="question">Don't have an account? <a href="/signup">Signup</a></div>
        // </div>
//     );
// };

// export default Login;




// import '../styles/login.css'


// const Login = (prop)=>{

//     return (        
//         <div className="login-page">
//             <div className="login-header"> Zambeel Management <span class="lib-name">System</span></div>
//             <div className='partition'></div>
//             <form className='form' >
//                 <div >
//                     <input className="user-inp" type='username' placeholder='username'  />
//                 </div>
//                <div>
//                     <input className="pass-inp" type='password' placeholder='password'  />
//                </div>
//                <div>
//                 <button className="sub-button">Login</button>
//                </div>
                
//             </form>
//             <div className="question">Don't have an account? <a href="/signup">Signup</a></div>
//         </div>
//     )

// }

// export default Login


