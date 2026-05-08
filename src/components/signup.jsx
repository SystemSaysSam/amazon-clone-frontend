import { useState } from 'react';
import './signup.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export function SignUp(){
    const navigate=useNavigate();
    const [Uemail,SetEmail]=useState('')
    const [address,Setaddress]=useState('')
    const [password,Setpassword]=useState('')
    const [cfpassword,Setcfpassword]=useState('')
    const [pincode,SetPincode]=useState('')
    const [name,SetName]=useState('')
    async function handleClick(){
      if(password!=cfpassword){
            toast.error('Password Dont Match')
        }
        
      const res = await fetch(('https://amazon-clone-backend-s4ui.onrender.com/signup'),{
            method:"POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              email:Uemail,
              password,
              cfpassword,
              address,
              pincode,
              name
            })
        })
        localStorage.setItem('userEmail', Uemail);
        const data = await res.json();
        toast.error(data.message);
        if(res.ok) navigate('/signin');
        
      }
    function navigateToSignIn(){
        navigate('/signin')
    } 
     return(
        <>
        <ToastContainer /> 
        <div className="loginpage-signup">
    <div className="dialougebox" onKeyDown={(e)=>{if (e.key==="Enter") handleClick()}}>
      <div className="signin">Sign Up</div>
      <div className="email">
        <input value={name} onChange={(e)=>SetName(e.target.value)} placeholder="Your Name" type="text" />
      </div>      
      <div className="email">
        <input value={Uemail} onChange={(e)=>SetEmail(e.target.value)} placeholder="Email ID" type="email" />
      </div>
      <div className="pass">
        <input value={address} onChange={(e)=>Setaddress(e.target.value)}placeholder="Address" type="text" />
      </div>
      <div className="pass">
        <input value={pincode} onChange={(e)=>SetPincode(e.target.value)} placeholder="Pincode" type="text" />
      </div>
      <div className="pass">
        <input value={password} onChange={(e)=>Setpassword(e.target.value)} placeholder="Password" type="password" />
      </div>
      <div className="pass">
        <input value={cfpassword} onChange={(e)=>Setcfpassword(e.target.value)} placeholder="Confirm Password" type="password" />
      </div>

      <div className="submit">
        <button onClick={handleClick}>Create Account</button>
      </div>
    </div>

    <div className="redirect-signup">
      <span>Already have an account? </span>
      <button onClick={navigateToSignIn}>Sign In</button>
    </div>
  </div></>

    )
}