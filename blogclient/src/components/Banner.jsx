import React from 'react';
import '../styles/Banner.css'

function Banner() {
    return (
        <div className="BannerApp">
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={require('../images/blog-3.jpg')} className="d-block w-100" alt="..." style={{height:380}} />
                    </div>
                    <div className="carousel-item">
                        <img src={require('../images/blog-2.jpg')} className="d-block w-100" alt="..." style={{height:380}} />
                    </div>
                    <div className="carousel-item">
                        <img src={require('../images/blog-1.jpg')} className="d-block w-100" alt="..." style={{height:380}} />
                    </div>
                </div>
            </div>
            <div className="textlogo">
                <h1>Blog Channel</h1>
                <h6>Find Read Create every important Article/Blog</h6>
            </div>
        </div>
    )
}

export default Banner;