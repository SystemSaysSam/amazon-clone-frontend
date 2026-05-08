import './error.css'
export function Errorpage(){
    return(
        <>
<div className="error-wrapper">
  <div className="error-card">

    <div className="error-icon">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18A2 2 0 003.54 21H20.46A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z"
          stroke="#dc2626" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <span className="error-code">500 — Server Error</span>
    <h2 className="error-title">Something went wrong</h2>
    <p className="error-message">
      We're having trouble processing your request right now.
      Please try again in a moment.
    </p>

    <hr className="error-divider" />

    <p className="error-contact">
      If this issue persists, kindly
      contact the admin.
    </p>

  </div>
</div>
</>
    )
}