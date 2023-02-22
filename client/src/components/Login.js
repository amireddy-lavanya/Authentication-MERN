import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const[loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  
  // const handleChange=(e)=>{
  //     setLoginData({...loginData , [e.target.name]:e.target.value})
  //     console.log(loginData)
  // }
  // console.log(loginData)
  const handleLogin = () => {

    axios.post('http://localhost:5000/login',
    {email:loginData.email,
      password:loginData.password
    })
    .then((res) => {
      //console.log(res?.data);
      console.log(1);
    
      if (res?.data?.authToken) {
        localStorage.setItem("Authorization", res.data.authToken);
        navigate("/bookmark");
      } else {
        // handle the case where the response is not what you expect
        alert("Unexpected response from server");
      }
    }).catch((err) => {
      // alert(err?.response?.data);
      console.log(err.message);
    });
    
    
  }

  return (
    <div className='col-md-4 mx-auto'>
      <div className='main mt-5'>
        <div className='login-form'>
          <div className='icon'>
            <img src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png' alt='icon' width='50px' height='50px' />
          </div>
          <h2 className='text-center mb-5 mt-3'>Member Login</h2>
          <form>
            <div className="mb-3">
              <input type="email" className="form-control" name='email' placeholder='Enter Email' id="email" onChange={(e)=>setLoginData({...loginData,[e.target.name]:e.target.value})} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="password"  name='password' placeholder='Password' onChange={(e)=>setLoginData({...loginData,[e.target.name]:e.target.value})} />
            </div>
            <div className="mb-3" >
              <input type="button" className="form-control btn btn-primary" id="submitbutton" value='LOGIN' onClick={handleLogin} />
            </div>
            <div>
              <p onClick={() => navigate("/register")} className="pbtn">REGISTER</p>
            </div>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Login;