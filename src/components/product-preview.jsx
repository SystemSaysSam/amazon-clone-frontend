import './product-preview.css'
import React from 'react'
import { useState } from 'react'
import { useUserBuys } from './handlebuyclick'
import { useLocation } from "react-router-dom";
export function ProductPage({setCounter,setProductId}){
    const location = useLocation()
    const product = location.state
    const [release,SetRelease]=useState(false)
    const rating=product.rating
    const [atcbutton,SetATCButton]=useState('Add to cart')
    const {handleBuyClick,placeorder}=useUserBuys()
    {if (!product) {return <div>Loading...</div>}}
    return(
        
        <div className="product-Preview">
            <div className="Product-photo"><img src={product.image}/></div>
            
            <div className="final-cta">
                <div className="product-name">{product.name}</div>
                {
                        <div className="ratings">
                        {[1,2,3,4,5].map((star)=>(
                        <span 
                        key={star}
                        className={star <= rating ? "star-filled" : "star"}
                        >
                        ★
                        </span>
                        ))}
                        <span style={{fontSize:'12px'}}> {rating} star ratings </span>
                    </div>
                    }
                <div className="button-wrap">
                    <button className='ATCbutton' onClick={()=>{
                        if (atcbutton === 'Add to cart'){
                            SetATCButton('Added')
                            setCounter(count=>{
                                return count+1;
                            })
                            setProductId(product.id)
                            const existing = JSON.parse(localStorage.getItem('cartIds') || '[]')
                            existing.push(product.id)
                            localStorage.setItem('cartIds', JSON.stringify(existing))
                        }
                        if (atcbutton === 'Added'){
                            SetATCButton('Add to cart')
                            setCounter(count=>{
                                return count-1;
                            })
                            setProductId(null)
                            const existing = JSON.parse(localStorage.getItem('cartIds') || '[]')
                            const updated = existing.filter(id => id !== product.id)
                            localStorage.setItem('cartIds', JSON.stringify(updated))
                        }
                    }}>{atcbutton}</button>
                    <button onClick={()=>{handleBuyClick(product);placeorder(product)}} className='BNbutton'>BUY NOW</button>
                    <div className="emiOptions">Buy Now Pay Later!</div> 
                </div>
                           
            </div>
            
            
            {
                release ? 
                (<div className="Product-Specs">
                    {product.specs.map((item,i)=>{
                        return (
                            <div className="SpecItem" key={i}>
                                <div className="SubHead">{item.subHead}:</div>
                                <div className="SpecText">{item.specText}</div>
                            </div>
                        )
                    })}
                    <div className="seemore"><button onClick={()=>{SetRelease(!release)}}>See more</button></div>
            </div>) : (
                <div className="Product-Specs">
                    {product.specs.slice(0, 3).map((item,i)=>{
                        return (
                            <div className="SpecItem" key={i}>
                                <div className="SubHead">{item.subHead}:</div>
                                <div className="SpecText">{item.specText}</div>
                            </div>
                        )
                    })}
                    <div className="seemore"><button onClick={()=>{SetRelease(!release)}}>See more</button></div>
                </div>
                
            )
            }            
        </div>
        
    )
    
}
