import './cards-grid.css'
import Data from '../data/cardsdata.json'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
export function CardsGrid(){
    const navigate = useNavigate();
    function handleProductClick(product) {
                    navigate('/ProductPage', { state: product })
            }
     const images=[
        "/crosel1.png",
        "/crosel2.png",
        "/crosel3.png",
        "/crosel4.png"
      ]
      function goNext() {
      if (index < images.length - 1) {
        setIndex(index + 1);
      }
    }
    
    function goPrev() {
      if (index > 0) {
        setIndex(index - 1);
      }
    }
      const [index,setIndex]=useState(0)
    return (
        <div className="home">
             <div className="corouselbox">
                <div className="corouselmover" style={{transform:`translateX(-${index*100}%)`}}>
                {images.map((image,i)=>(
                    <img key={i} src={image} className='corouselslide'/>
                ))}
                </div>
                <button onClick={goNext}><span>&#9654;</span></button>
                <button onClick={goPrev}>&#9664;</button>
             </div>
             <div className="cards-grid">
            {
                Data.cards.map((card, index) => {
                    if (card.type === "card") {
                        return (
                            <div key={index} className="card">
                                <div className="card-title">{card.title}</div>
                                <div className="card-product-grid">
                                    {card.products.map((product, i) => (
                                        <div className="product-item" key={i} onClick={() => handleProductClick(product)} >
                                            <img src={product.image} alt={product.name} />
                                            <div className="product-item-name">{product.name}</div>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                        )
                    }

                    if (card.type === "card-featured") {
                        return (
                            <div key={index} className="card-featured" onClick={() => handleProductClick(card)}>
                                <div className="card-title">{card.title}</div>
                                <div className="product-item-featured">
                                    <img src={card.image} alt={card.title} />
                                </div>
                            </div>
                        )
                    }

                    if (card.type === "card-promo") {
                        return (
                            <div key={index} className="card-promo">
                                <div>
                                    <div className="promo-headline">{card.headline}</div>
                                    <div className="promo-register-link">{card.cta}</div>
                                </div>
                                <div className="product-brand-logo">
                                    <img src={card.logo} alt={card.logoname} />
                                </div>
                            </div>
                        )
                    }

                    if (card.type === "card-wide card-wide-live") {
                        return (
                            <div key={index} className="card-wide">
                                <div>
                                    <div className="card-section-title">{card.title}</div>
                                    
                                </div>
                                <div className="card-product-row">
                                    {card.products.map((product, i) => (
                                        <div key={i} className="product-item" onClick={() => handleProductClick(product)}>
                                            <img src={product.image} alt={`product ${i}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }

                    if (card.type === "card-featured card-featured-detailed") {
                        return (
                            <div key={index} className="card-featured-detailed">
                                <div className="card-title">{card.title}</div>
                                <div className="product-item-featured product-item-featured-contain" onClick={() => handleProductClick(card)}>
                                    <img src={card.mainImage} alt="Invoice" />
                                </div>
                                <div className="discount-badge">
                                    <button>{card.discount}</button>
                                    <span className="discount-label">{card.label}</span>
                                </div>
                                <div className="product-thumb-row">
                                    {card.thumbnails.map((product, i) => (
                                        <img key={i} src={product.image} alt={`thumbnail ${i}`} onClick={() => handleProductClick(product)}/>
                                    ))}
                                </div>
                                
                            </div>
                        )
                    }

                    if (card.type === "card-wide card-wide-live card-video") {
                        return (
                            <div key={index} className="card-wide card-wide-live">
                                <div className="card-wide-live-header">
                                    <div className="card-section-title">{card.title}</div>
                                    <div className="see-more-live">{card.subtitle}</div>
                                </div>
                                <div className="card-wide-live-products">
                                    <div className="live-video-wrapper">
                                        <video loop autoPlay muted src={card.video} />
                                    </div>
                                        {card.products.map((product, i) => (
                                            <div className="live-product-card" key={i} onClick={() => handleProductClick(product)}>
                                            <div className="live-product-img">
                                                <img src={product.image} alt={product.name} />
                                                <div className="live-product-title">
                                                    <p>{product.name}</p>
                                                </div>
                                                {product.discount && (
                                                    <div className="discount-badge discount-badge-wide">
                                                        <button>{product.discount}</button>
                                                        <span className="discount-label">Limited time deal</span>
                                                    </div>
                                                )}
                                                <div className="price-block">
                                                    <span className="price-currency">&#8377;</span>
                                                    <span className="price-amount">{product.price}</span>
                                                    <span className="price-currency">.00</span>
                                                    <span className="price-original"> &#8377;{product.originalPrice}</span>
                                                </div>
                                            </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
        </div>
        
    )
}