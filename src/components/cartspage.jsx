import './cartspage.css'
import cartData from '../data/cartpagedata.json'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useUserBuys } from './handlebuyclick';
export function CartPage({setCounter, counter}) {
  //const allproducts = products.cards.flatMap(card=>card.products)
  const [cartIds, setCartIds] = useState(JSON.parse(localStorage.getItem('cartIds') || '[]'))
  const [savedIds, setSavedIds] = useState(
    JSON.parse(localStorage.getItem('savedIds') || '[]'))
  const {handleBuyClick,placeorder,placeallorders}=useUserBuys()
  function handlePlaceAll() {
      placeallorders(products)   // saves all orders
      // clear cart
      setCartIds([])
      localStorage.setItem('cartIds', JSON.stringify([]))
      setCounter(0)
      localStorage.setItem('counter', 0)
  }
  function SaveForLater(product) {
      // remove from cart
      const updatedCart = cartIds.filter(id => Number(id) !== Number(product.id))
      setCartIds(updatedCart)
      localStorage.setItem('cartIds', JSON.stringify(updatedCart))
      setCounter(updatedCart.length)
      localStorage.setItem('counter', updatedCart.length)

      // add to saved
      const updatedSaved = [...savedIds, product.id] //used for extending the aray of saved IDs
      setSavedIds(updatedSaved)
      localStorage.setItem('savedIds', JSON.stringify(updatedSaved))
  }

  function MoveToCart(product) {
      // remove from saved
      const updatedSaved = savedIds.filter(id => Number(id) !== Number(product.id))
      setSavedIds(updatedSaved)
      localStorage.setItem('savedIds', JSON.stringify(updatedSaved))

      // add back to cart
      const updatedCart = [...cartIds, product.id]
      setCartIds(updatedCart)
      localStorage.setItem('cartIds', JSON.stringify(updatedCart))
      setCounter(updatedCart.length)
      localStorage.setItem('counter', updatedCart.length)
  }
  function RemoveFromCart(product) {
    // remove from cart
    const updatedCart = cartIds.filter(id => Number(id) !== Number(product.id))
    setCartIds(updatedCart)
    localStorage.setItem('cartIds', JSON.stringify(updatedCart))
    setCounter(updatedCart.length)
    localStorage.setItem('counter', updatedCart.length)

    // also remove from saved if it's there
    const updatedSaved = savedIds.filter(id => Number(id) !== Number(product.id))
    setSavedIds(updatedSaved)
    localStorage.setItem('savedIds', JSON.stringify(updatedSaved))
}
  if (counter === 0) {
    return (
       <div className="empty-cart">
      <div className="empty-cart-box">
        <div className="empty-cart-icon">🛒</div>
        <h2 className="empty-cart-title">Your cart is empty!</h2>
        <p className="empty-cart-quote">
          "Don't you think!? You are missing out on some really good things.
          Browse more and find your desired product."
        </p>
        <Link to='/'><button className="empty-cart-btn">Browse Products</button></Link>
      </div>
    </div>
    )
  }
  const savedProducts = savedIds
    .map(id => cartData.cart.find(p => p.id === Number(id)))
    .filter(p => p !== undefined)
  const products= cartIds.map(id => cartData.cart.find(p => p.id === Number(id))).filter(product => product !== undefined) 
  //const product = cartData.cart.find(p=>p.id===productid)
  console.log(products)
  return (
    //products.map(product=>product)
    <div className="cart-page">
    <div className="product-cards">
      {products.map((product,i)=>
        <div className="productcard" key={i}>
        <div className="product-part-cart">
          <div className="productpic">
            <img src={product.image} alt="" className="productphoto" />
          </div> 
          <div className="product-details">
            <div className="product-title">{product.name}</div>
            <div className="product-type">Colour: {product.colour} &nbsp;|&nbsp; Size: {product.size}</div>
            <div className="price-row">
              <div className="product-price">₹{product.price}</div>
              <div className="product-price-old">₹{product.originalPrice}</div>
              <div className="cart-discount-page">{Math.round((product.originalPrice - product.price)/product.originalPrice*100)}% off</div>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="options-bar">
          <div className="saveforlater" onClick={() => SaveForLater(product)}>Save for later</div>
          <div className="remove" onClick={()=>RemoveFromCart(product)}>Remove</div>
          <div onClick={()=>{handleBuyClick(product);placeorder();RemoveFromCart(product)}} className="buythisnow">Buy now</div>
        </div>
      </div>
      )}
      {savedProducts.length > 0 && (
          <div className="saved-for-later">
              <h3>Saved for Later ({savedProducts.length} items)</h3>
              {savedProducts.map((product, i) => (
                  <div className="productcard" key={i}>
                      <div className="product-part-cart">
                          <div className="productpic">
                              <img src={product.image} alt="" />
                          </div>
                          <div className="product-details">
                              <div className="product-title">{product.name}</div>
                              <div className="product-price">₹{product.price}</div>
                          </div>
                      </div>
                      <hr className="divider" />
                      <div className="options-bar">
                          <div className="saveforlater"  onClick={() => MoveToCart(product)}>Move to Cart</div>
                          <div className="remove" onClick={() => RemoveFromCart(product)}>Remove</div>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
      <div className="price-chart">
        <div className="price-card-title">Price details</div>
        <div className="price-row-item">
          <span className="price-label">Price ({counter} item)</span>
          <span className="price-strike">₹{products.reduce((total,p)=>total+p.originalPrice,0)}</span>
        </div>
        <div className="price-row-item">
          <span className="price-label">Discount</span>
          <span className="price-green">− ₹{products.reduce((total,p)=>total + (p.originalPrice - p.price), 0)}</span>
        </div>
        <div className="price-row-item">
          <span className="price-label">Delivery charges</span>
          <span className="price-green">Free</span>
        </div>
        <hr className="divider" />
        <div className="total-row">
          <span>Total amount</span>
          <span className="price-green" style={{ fontSize: '16px' }}>₹{products.reduce((total,p)=>total + p.price, 0)}</span>
        </div>
        <div className="placeorder" onClick={handlePlaceAll}>Place your order</div>
      </div>
    </div>
  )
}