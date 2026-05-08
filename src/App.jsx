import Data from './data/cardsdata.json'
import { NavbarPrimary } from './components/navbar-primary'
import { ScrollToTop } from './components/scrolltop'
import { NavbarSecondary } from './components/navbar-secondary'
import { CardsGrid } from './components/cards-grid'
import { Footer } from './components/footer'
import { Homepage } from './pages/homepage'
import { PaymentDone } from './pages/paymentpage'
import { Test } from './TestingPage/test'
import { OrdersPage } from './components/orderspage'
import { TrackingPage } from './pages/trackingpage'
import { CartPageView } from './pages/cartpage'
import { ProductViewPage } from './pages/productspage'
import { SignUp } from './components/signup'
import { SignIn } from './components/signin'
import { Signout } from './components/signout'
import { Errorpage } from './components/error'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ProtectedRoute } from './protectroutes'
import './App.css'
import { useState } from 'react'

function App() {
  const [counter,setCounter]=useState(()=>{
    const savedIds = JSON.parse(localStorage.getItem('cartIds') || '[]')
    return savedIds.length;
  })
  const [productid,setProductId]=useState(0)
  const [selectedTracking,setSelectedTracking]=useState(null)
  const location = useLocation()
  const authRoutes = ['/signin', '/signup']
  const isAuthPage = authRoutes.includes(location.pathname)
  function scrollTOpwindow(){
    window.scrollTo({
  top: 0,
  behavior: "smooth"
});}
  
  return (
    
    <>
     <ScrollToTop />
      {!isAuthPage && <NavbarPrimary counter={counter}/>}
      {/* NAVBAR SECONDARY */}
  


      <Routes>

        <Route path='signout' element={<Signout />} />
        <Route path='/TestPage' element={<Test />} />
        <Route path="/" element={<Homepage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/error' element={<Errorpage />} />

        <Route
          path='/ProductPage'
          element={
            <ProtectedRoute>
              <ProductViewPage
                setProductId={setProductId}
                setCounter={setCounter}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path='/CartPage'
          element={
            <ProtectedRoute>
              <CartPageView
                setCounter={setCounter}
                counter={counter}
                productid={productid}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orderspage"
          element={
            <ProtectedRoute>
              <OrdersPage setSelectedTracking={setSelectedTracking} />
            </ProtectedRoute>
          }
        />

        <Route
          path='/Tracking'
          element={
            <ProtectedRoute>
              <TrackingPage selectedTracking={selectedTracking} />
            </ProtectedRoute>
          }
        />

        <Route
          path='/paymentsuccess'
          element={
            <ProtectedRoute>
              <PaymentDone />
            </ProtectedRoute>
          }
        />
</Routes>

      {/* MAIN CONTENT */}

      <div onClick={scrollTOpwindow} className="back-to-top">Back to top</div>

        {/* FOOTER */}
      <Footer />
     
    </>
    /*Last div is of previous div whose class is specified as banners*/
  )
}

export default App