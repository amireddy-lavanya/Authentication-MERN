import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

const Register = () => {
  const [registerData, setRegisterData]=useState({});
  const navigate=useNavigate();
  // const handleChange =(e)=>{
  //    setRegisterData({...registerData , [e.target.name]:e.target.value})
  // }
  const handleRegister=()=>{
      if(registerData.password===registerData.confirmpassword){
          axios({
              url:"http://localhost:5000/register",
              method:"post",
              data:{email:registerData.email, password:registerData.password}
          }).then((res)=>{
              console.log(res.data)
              navigate("/")
          }).catch((err)=>{
              console.log(err)
              alert(err.res.data)
          })
      }else{
          alert("password didnot Match")
      }
      navigate("/")
  }
  return (
    <div className="col-md-4 mx-auto">
      <div className='main mt-5'>
        <div className='register-form'>
          <div className='icon'>
            <img src='https://www.freeiconspng.com/uploads/pencil-web-pencil-png-pencil-icon-flat-icon-png-1.png' alt='icon' height='50px' width='50px' />
          </div>
          <h2 className='text-center mb-5 mt-3'>Register</h2>
          <form >
            <div className="mb-3">
              <input type="email" className="form-control" name='email' placeholder='User Email' onChange={(e)=>{setRegisterData({...registerData , [e.target.name]:e.target.value})}} />
            </div>
            <p className="errors" style={{ color: "red" }}>
              
            </p>
            <div className="mb-3">
              <input type="password" className="form-control"  name='password' placeholder='Password'  onChange={(e)=>{setRegisterData({...registerData , [e.target.name]:e.target.value})}}/>
            </div>
            <p className="errors" style={{ color: "red" }}>
              
            </p>
            <div className="mb-3">
              <input type="password" className="form-control" name='confirmpassword' placeholder='Confirm Password' onChange={(e)=>{setRegisterData({...registerData , [e.target.name]:e.target.value})}}/>
            </div>
            <p className="errors" style={{ color: "red" }}>
            </p>
            <div className='mb-3' onClick={handleRegister}>
              <button className='form-control' id="submitbutton">Register</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Register