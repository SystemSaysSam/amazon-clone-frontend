import { useState, useEffect } from 'react'
import './navbar-primary.css'
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export function NavbarPrimary({counter}){
    const [userName, setUserName] = useState('');
    const [addforNav,setAddForNav]= useState('No Location')
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
    const [pincode,SetPincode]=useState('')
    const [langOpen, setLangOpen] = useState(false)
    const [profileOption, setProfileOption] = useState(false)
    const [loginState,setloginState]=useState(()=>{
      return userEmail?'SignOut':'SignIn'
    })
    const Navigate=useNavigate();
    // truncate to first 20 characters and add ...
    
    async function showName(){
      const res = await fetch(`https://amazon-clone-backend-s4ui.onrender.com/user/${userEmail}`);
      const user = await res.json();
      setUserName(user.name)
      setAddForNav(user.address.replace(/^(.{12}).+/, '$1...')) 
      SetPincode(user.pincode)
    }
        useEffect(() => {
        // Listen for localStorage changes (even from other components/pages)
        const handleStorageChange = () => {
            const email = localStorage.getItem('userEmail');
            setUserEmail(email);
            setloginState(email ? 'SignOut' : 'SignIn');
        };
        window.addEventListener('storage', handleStorageChange);
        
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if(userEmail) {
            showName();
        }
    }, [userEmail]);
    return (
        <div className="navbar-primary">
          <Link to='/'  className="brand-logo">
          <img className="brand-logo-img" src="/LogoIcon.png" alt="Logo" />
          </Link>
        <div className="delivery-address">
          <div className="delivery-address-icon">
            <img className="delivery-address-icon-img" src="/Location.png" alt="Location" />
          </div>
          <div className="delivery-address-wrapper">
            <div className="delivery-address-info">
              <div className="delivery-address-label">Delivering to <span>{userName}</span></div>
              <div className="delivery-address-value"><span>{addforNav}</span> {pincode}</div>
            </div>
          </div>
        </div>
        <div className="search-bar">
          <select className="search-category-select" name="categories" id="categories">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Clothing &amp; Fashion</option>
            <option value="home">Home &amp; Kitchen</option>
            <option value="beauty">Beauty &amp; Personal Care</option>
            <option value="books">Books</option>
            <option value="toys">Toys &amp; Games</option>
            <option value="sports">Sports &amp; Outdoors</option>
            <option value="grocery">Grocery &amp; Gourmet Foods</option>
            <option value="automotive">Automotive</option>
            <option value="health">Health &amp; Household</option>
            <option value="baby">Baby Products</option>
            <option value="computers">Computers &amp; Accessories</option>
            <option value="mobile">Mobiles &amp; Accessories</option>
          </select>
          <input className="search-input" placeholder=" Search About Any Product" />
          <div>
            <button className="search-btn"><img src="/searchIcon.png" alt="Search" /></button>
          </div>
        </div>
        <div className="language-selector">
          <div className="language-flag" onClick={()=>{
            setLangOpen(!langOpen)
          }}>
            <img src="/indiaLogo.jpg" alt="India" />EN<div><span className="dropdown-arrow">&#9660;</span></div>
          </div>
          {langOpen && 
          (
            <>
            <div className='lang-dropdown'>
              <p>English</p>
              <p>Hindi</p>
            </div>
            </>
            
          )}
        </div>
        <div className="account-wrapper"  onClick={()=>{
            setProfileOption(!profileOption)
          }}>
          <div className="account-info">
            <div className="account-label">Hello {userName}</div>
            <div className="account-dropdown">Accounts &amp; Lists <span className="dropdown-arrow">&#9660;</span>
            {profileOption && 
          (
            <>
            <div className='profile-dropdown'>
              <p>English</p>
              <p>Hindi</p>
            </div>
            </>
            
          )}
            </div>
          </div>
        </div>
        
        <div className="orders-wrapper">
          <div className="orders-label">Returns</div>
          <Link to='orderspage'><div><div className="orders-text">&amp; Orders</div></div></Link>
        </div>
        <div className="Signin" onClick={()=>{
          if(loginState==="SignIn"){
            Navigate('/signin')
          }
          if(loginState==='SignOut'){
            localStorage.removeItem('userEmail')
            setUserEmail(null);
            Navigate('/signout')
            setloginState('SignIn')
          }
          
        }}>{loginState}</div>
        <div className="more-option">
          More Options &#9660;
        </div>
        <div>
          <button className="cart-btn">
            <Link to="CartPage">
            <div className="cart-icon">
              <div className="cart-count">{counter}</div>
              <div><img src="/shopping-basket.png" alt="Cart" /></div>
            </div>
            </Link>
          </button>
        </div>
      </div>
    )
}