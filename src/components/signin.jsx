
import './signin.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
export function SignIn(){
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate=useNavigate();
async function  handleLoginRequest(){
  const res = await fetch('https://amazon-clone-backend-s4ui.onrender.com/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'
  },
    body:JSON.stringify({
      email, 
      password
    })
  })
  const data= await res.text()
    if(!res.ok){
      toast.info(data);
      return;
    }

    toast.success("Login Successful");
    navigate('/');
 }
    function navigateToSignup(){
        navigate('/signup')
    } 
  return(
    <>
    <ToastContainer position="top-center"/>
  <div className="loginpage">
    <div className="dialougebox" onKeyDown={(e) => {
    if (e.key === 'Enter') handleLoginRequest()
  }}>
        <div className="signin">Sign In</div>
      <div className="email">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='user' />
      </div>
      <div className="pass">
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='pass'/>
      </div>
      <div className="submit">
        <button onClick={handleLoginRequest} >Submit</button>
      </div>
    </div>
    <div className="redirect-signup">
      <span>Or Sign up by clicking </span>
      <button  onClick={navigateToSignup}>Sign up</button>
    </div>
  </div>
    </>
  )}