import './tracking.css'
import { useLocation } from 'react-router-dom'
import  data  from '../data/cardsdata.json'
import { useEffect, useState } from 'react'
export function Tracking(){
    const [progress,SetProgess]=useState(0)
    useEffect(()=>{
        setTimeout(()=>{
            SetProgess(30);
        },1000)
    },[])
    const { state } = useLocation()
    const allproducts=data.cards.flatMap((item)=>item.products || [])
    const product=allproducts.find((p)=>p.id===Number(state))
    return(
        <>
        <div className="page">
        <div className="container">

        <div className="top-section">
            <div className="delivery-text">
                <span className="status">Order Placed</span>
                <span className="sub-text">Our store is processing this order</span>
            </div>

            <div className="product">
                <img src={product.image} alt="product" />
                <span>{product.name}</span>
            </div>
        </div>

        <div className="tracking-title">
            Tracking Info : Seller is processing this order
        </div>

        <div className="progress">
            <div className="progress-bar" style={{width:`${progress}%`}}></div>
        </div>

    </div>
    </div>
        </>
    )
}