import './footer.css'
export function Footer(){
    return (
        <>
        <div className="footer">
          <div className="footer-links-grid">
            <div className="footer-links-column">
              <p className="footer-column-title">Get to Know Us</p>
              <p>About Zoduko</p>
              <p>Careers</p>
              <p>Press Releases</p>
              <p>Zoduko Science</p>
            </div>
            <div className="footer-links-column">
              <p className="footer-column-title">Connect with Us</p>
              <p>Facebook</p>
              <p>Twitter</p>
              <p>Instagram</p>
            </div>
            <div className="footer-links-column money-grid">
              <p className="footer-column-title">Make Money with Us</p>
              <p>Sell on Zoduko</p>
              <p>Sell under Zoduko Accelerator</p>
              <p>Protect and Build Your Brand</p>
              <p>Zoduko Global Selling</p>
              <p>Supply to Zoduko</p>
              <p>Become an Affiliate</p>
              <p>Fulfilment by Zoduko</p>
              <p>Advertise Your Products</p>
              <p>Zoduko Pay on Merchants</p>
            </div>
            <div className="footer-links-column links-grid">
              <p className="footer-column-title">Let Us Help You</p>
              <p>Your Account</p>
              <p>Returns Centre</p>
              <p>Recalls and Product Safety Alerts</p>
              <p>100% Purchase Protection</p>
              <p>Zoduko App Download</p>
              <p>Help</p>
            </div>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-bottom-row">
            <div><img className="footer-logo" src="/LogoIcon.png" alt="Logo" /></div>
            <div className="footer-locale-btns">
              <button className="footer-lang-btn"><img src="/globe.png" alt="Globe" /> English &#9650;&#9660;</button>
              <button className="footer-country-btn"><img src="/indiaLogo.jpg" alt="India" /> India</button>
            </div>
          </div>
        </div>
        <div className="affiliate-links">
          <div className="affiliate-link-item">
            <p className="affiliate-link-title">AbeBooks</p>
            <p>Books, art</p>
            <p>&amp; collectibles</p>
          </div>
          <div className="affiliate-link-item">
            <p className="affiliate-link-title">Zoduko Web Services</p>
            <p>Scalable Cloud</p>
            <p>Computing Services</p>
          </div>
          <div className="affiliate-link-item">
            <p className="affiliate-link-title">Audible</p>
            <p>Download</p>
            <p>Audio Books</p>
          </div>
          <div className="affiliate-link-item affiliate-entertainment">
            <p className="affiliate-link-title">IMDb</p>
            <p>Movies, TV</p>
            <p>&amp; Celebrities</p>
          </div>
          <div className="affiliate-link-item affiliate-clothing">
            <p className="affiliate-link-title">Shopbop</p>
            <p>Designer</p>
            <p>Fashion Brands</p>
          </div>
          <div className="affiliate-link-item affiliate-bussiness">
            <p className="affiliate-link-title">Zoduko Business</p>
            <p>Everything For</p>
            <p>Your Business</p>
          </div>
          <div className="affiliate-link-item affiliate-music">
            <p className="affiliate-link-title">Zoduko Prime Music</p>
            <p>100 million songs, ad-free</p>
            <p>Over 15 million podcast episodes</p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="copyright">
          <p>Conditions of Use &amp; Sale &nbsp; Privacy Notice &nbsp; Interest-Based Ads</p>
          <p>&#169; 1996-2026, Zoduko.in, Inc. or its affiliates</p>
        </div>
        </>
    )
}