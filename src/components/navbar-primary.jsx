import { useState, useEffect } from 'react'
import Data from '../data/cardsdata.json' 
import './navbar-primary.css'
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export function NavbarPrimary({counter}){
    const [userName, setUserName] = useState('');
    const [addforNav,setAddForNav]= useState('No Location')
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
    const [pincode,SetPincode]=useState('')
    const [SearchQuery, setSearchQuery] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const Navigate = useNavigate();


    function handleProductClick(product) {
        Navigate('/ProductPage', { state: product })
    }
    // flatten all products
    const allProducts = Data.cards.flatMap(card => card.products || [])

    // filter
    const filtered = allProducts.filter(product =>
        product.name?.toLowerCase().includes((SearchQuery || '').toLowerCase())
    )
    const [langOpen, setLangOpen] = useState(false)
    const [profileOption, setProfileOption] = useState(false)
    const [loginState,setloginState]=useState(()=>{
      return userEmail?'SignOut':'SignIn'
    })
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
          <div className="search-input-wrapper">
            <input onChange={(e) => setSearchQuery(e.target.value)}  className="search-input" placeholder=" Search About Any Product" />
            {SearchQuery && (
            <div className="search-results">
                {filtered.map((product) => (
                    <div className="search-result-item" key={product.id} onClick={() =>{
                      setSearchQuery('')
                      handleProductClick(product)
                    } }>
                        <img src={product.image} alt={product.name} />
                        <div className="search-result-item-name">{product.name}</div>
                    </div>
                ))}
            </div>
        )}
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
        <div className="more-option"  onClick={() => setMenuOpen(true)}>
          ☰
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
        <div className={`slide-menu ${menuOpen ? 'open' : ''}`}>
    <button className="close-btn" onClick={() => setMenuOpen(false)}>✕</button>
    <nav>
        <Link to='/' onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to='/orderspage' onClick={() => setMenuOpen(false)}>Orders</Link>
        <Link to='/CartPage' onClick={() => setMenuOpen(false)}>Cart</Link>
        <div onClick={() => {
            setMenuOpen(false)
            loginState === 'SignIn' ? Navigate('/signin') : Navigate('/signout')
        }}>{loginState}</div>
    </nav>
</div>
      </div>
    )
}