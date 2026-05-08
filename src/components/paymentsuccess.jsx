import './paymentsuccess.css'
import {useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
export function PayDone() {
  { 
    const [redcount,SetRedCount]=useState(5)
    const navigate=useNavigate()
    useEffect(()=>{
        let count=5;
        const id = setInterval(()=>{
            count=count-1
            SetRedCount(count)
        },1000)
        setTimeout(()=>{
            navigate('/orderspage')
            clearInterval(id)
        },5000)
    },[])
    
    
    return(
            <div class="paymentcard">
                <div className="circle">
                <svg className="tick" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                    <circle class="tick__circle" cx="26" cy="26" r="24" />
                    <path className="tick__check" d="M14 27 l9 9 l16 -16" />
                </svg>
                </div>
                <h1>Payment Successful</h1>
                <div className="redirection">You will be redirected to orders page in {redcount}</div>
            </div>
  )}
}