import "./orderspage.css";
import { Link, useNavigate } from "react-router-dom";
import data from '../data/cardsdata.json'
import { useState,useEffect } from "react";
import EmptyOrders from "./noorders";
export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  //const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  const currentYear = new Date().getFullYear();
  const navigate=useNavigate()
  const allproducts=data.cards.flatMap((item)=>item.products || [])
  useEffect(() => {
  fetch('https://amazon-clone-backend-s4ui.onrender.com/orders')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setOrders(data);
    });
}, []);
   if (orders.length === 0) {
    return <EmptyOrders onBrowse={() => window.location.href = '/'} />;
  }
  return ( 
    <>
    <div className="orders-page">
      <div className="breadcrumb">
        <div>Your Account</div>
        <span>&#9658; Your Orders</span>
      </div>

      <div className="orders-header">
        <h2 className="Breadcrumb-title">Your Orders</h2>

        <div className="orders-search">
          <input type="text" placeholder="Search all orders" />
          <button>Search Orders</button>
        </div>
      </div>

      <div className="order-tabs">
        <span>Orders</span>
      </div>
      <div className="order-filter">
          <div>
            <b>{Number(orders.length)} orders</b> placed in
          </div>
          <div>{currentYear} ▼</div>
        </div>
    {orders.map((order)=> {
    const product=allproducts.find((p)=>p.id===Number(order.productid))
    const deliveryDate=new Date(order.Orderdate)
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    return(
      <div key={order.id}>
      <div className="order-summary">
        <div>
          <div>Order Placed</div>
          <div>{order.Orderdate}</div>
        </div>

        <div>
          <div>Total</div>
          <div>₹{product.price}</div>
        </div>

        <div>
          <div>Ship To</div>
          <div>Anaam ▼</div>
        </div>

        <div>
          <div>Order # {order.ordernum}</div>
          <div style={{ color: "#007185", cursor: "pointer" }}>
            View order details | Invoice ▼
          </div>
        </div>
      </div>

      <div className="product-container">
        <div className="product-part">
          <div className="mobile-wrapped-status">
            <img src={product.image} alt="product" />
            <div className="divider"> </div>
            <div className="order-status">Arriving on {deliveryDate.toDateString()}!</div>
          </div>
          <div className="product-info">
            <div className="product-title">
              {product.name}
            </div>
            <button  onClick={()=>navigate('/Tracking', {state:order.productid})} className="trackyourproduct">
              Track product
            </button>

            <div className="product-links">
              <div className="item-mobile">View your item</div>
              <div className="tracking-mobile">Track your product</div>
            </div>
          </div>
          <div>
            <div onClick={()=>navigate('/Tracking', {state:order.productid})} className="review-button">Track your order</div>
          </div>
        </div>

        <div className="buttons">
          <div className="tracking-mobile">Track your product</div>
          <div className="item-mobile">View your item</div>
        </div>
      </div>
      </div>
    )
})}
</div> 
    </>
  );
}
