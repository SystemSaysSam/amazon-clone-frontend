import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify";
export function useUserBuys(){
    const user = localStorage.getItem('userEmail');
    const [Loading,SetLoading]=useState(false)
    const navigate=useNavigate()
     useEffect(() => {
        if (!user) {
            toast.info('You are not logged in')
            navigate('/signin') // ✅ redirect instead of just alerting
        }
    }, []) 
    function handleBuyClick(product) {
                    navigate('/paymentsuccess')
                    localStorage.setItem('broughtPID',product.id)
            }
    async function placeorder(product){
        try {
            SetLoading(true)
            const newOrder={
            email:user,
            productid:product.id,
            ordernum:Math.floor(Math.random()*10000)+1000000,
            Orderdate: new Date().toDateString(),
            status: 'Order Placed'
        }
        const res = await fetch(`https://amazon-clone-backend-s4ui.onrender.com/orders?email=${user}`,{
            method:"POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
        if (!res.ok) {
            throw new Error("Server error");
        }
        navigate('/paymentsuccess') 
        
        }
        
        //const existingOrders=JSON.parse(localStorage.getItem('orders') || '[]' )
        catch (error) {
            navigate('/error')
        console.log("Error placing order:", error);
        }
        finally{
            SetLoading(false)
        }

    }
    async function placeallorders(products){    
        try{
            const requests=products.map((product)=>{
                const newOrder={
                email:user,
                productid:product.id,
                ordernum:Math.floor(Math.random()*10000)+1000000,
                Orderdate: new Date().toDateString(),
                status: 'Order Placed'
                    }
   
                return fetch('https://amazon-clone-backend-s4ui.onrender.com/orders?email=${userEmail}',{
                    method:"POST",
                    headers :{
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify(newOrder)
                })       
        })
        await Promise.all(requests)
        navigate('/paymentsuccess') 
        }
        catch (error) {
        console.error("Error placing orders:", error);
        navigate('/error');
        }
    }
    

    return {handleBuyClick,placeorder,placeallorders}
    }
