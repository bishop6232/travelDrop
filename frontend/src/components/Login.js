import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function Login() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = () => {
        axios
          .post('http://localhost:3000/api/login', { email })
          .then((response) => {
            console.log('Login successful:', response.data);
            alert('login successful')
            navigate('/Welcome');
          })
          .catch((error) => {
            console.error('Login failed:', error);
            alert('E-mail not found or registered')
           
          });
      };

  return (
    <>
      <div className='login-container' style={{
        margin:0,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundImage: 'url("images/airplane.png")'
        }}>
          
          <div className='login-form'>
            <h2>(Airways Fast Delivery)</h2>
                    <p>Login with your user email</p>
                    <input type='email' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='E-mail Address'></input>
                    <button onClick={handleLogin}>Log in</button>
                <p>Don't have account yet?<br></br></p>
                <p> Click here  to <strong> <Link to = './createUser'>Create new user</Link></strong></p>
               
            </div>     
       </div>
      
    </>
  )
}

export default Login