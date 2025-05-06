'use client'
import React, { useEffect, useState } from 'react'
import "../p.css";
import FirstNav from '@/Components/LandingPageComp/FirstNav';
import MainNav from '@/Components/LandingPageComp/MainNav';
import Header from '@/Components/LandingPageComp/Header';
import Carousel from '@/Components/LandingPageComp/Carousel';
import Footer from '@/Components/LandingPageComp/Footer';

const page = () => {
    const [show, setshow] = useState(false)
    function openwindow(id) {
        if (show) { document.getElementById(show).style.display = 'none' }
        document.getElementById(id).style.display = 'flex'
        setshow(id)
    }
    useEffect(() => openwindow('city'), [])
    const imageData = {
        "history": [
            {
                "id": 1,
                "title": "Waterfall",
                "url": "https://static.javatpoint.com/tourist-places/images/tourist-places-in-mirzapur3.png",
                "description": "A Beutifull Waterfall in Mirzapur, Uttar Pradesh."
            },
            {
                "id": 2,
                "title": "Palace",
                "url": "https://static.javatpoint.com/tourist-places/images/tourist-places-in-mirzapur5.png",
                "description": "A memorial palace in  Mirzapur, Uttar Pradesh."
            },
            {
                "id": 3,
                "title": "Waterfall",
                "url": "https://static.javatpoint.com/tourist-places/images/tourist-places-in-mirzapur7.png",
                "description": "A Beutifull Waterfall in Mirzapur, Uttar Pradesh."
            }
        ],
        "tourist": [
            {
                "id": 4,
                "title": "Waterfall",
                "url": "https://static.javatpoint.com/tourist-places/images/tourist-places-in-mirzapur5.png",
                "description": "A Beutifull Waterfall in Mirzapur, Uttar Pradesh."
            },
            {
                "id": 5,
                "title": "Palace",
                "url": "https://static.javatpoint.com/tourist-places/images/tourist-places-in-mirzapur3.png",
                "description": "A memorial palace in  Mirzapur, Uttar Pradesh."
            },
            {
                "id": 6,
                "title": "Waterfall",
                "url": "https://static.javatpoint.com/tourist-places/images/tourist-places-in-mirzapur7.png",
                "description": "A Beutifull Waterfall in Mirzapur, Uttar Pradesh."
            }
        ],
        "city": [
            {
                "id": 7,
                "title": "Amazing Waterfall",
                "url": "https://static.javatpoint.com/tourist-places/images/tourist-places-in-mirzapur7.png",
                "description": "A Beutifull Waterfall in Mirzapur, Uttar Pradesh."
            },
            {
                "id": 8,
                "title": "Palace",
                "url": "https://static.javatpoint.com/tourist-places/images/tourist-places-in-mirzapur5.png",
                "description": "A memorial palace in  Mirzapur, Uttar Pradesh."
            },
            {
                "id": 9,
                "title": "Amazing Waterfall",
                "url": "https://static.javatpoint.com/tourist-places/images/tourist-places-in-mirzapur3.png",
                "description": "A Beutifull Waterfall in Mirzapur, Uttar Pradesh."
            }
        ]
    };

    return (
        <>
            <FirstNav></FirstNav>

            <Header></Header>

            <MainNav></MainNav>

            <Carousel></Carousel>
            <div className="container">
                <h1>Photo Gallery</h1>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                    nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                <div className='d-flex'>
                    <button className='custombuttondesign' name='city' onClick={(e) => { openwindow(e.currentTarget.name) }}>Vidyanchal</button>
                    <button className='custombuttondesign' name='history' onClick={(e) => { openwindow(e.currentTarget.name) }}>Historical Places</button>
                    <button className='custombuttondesign' name='tourist' onClick={(e) => { openwindow(e.currentTarget.name) }}>Tourist Places</button>
                </div>




                <div className=' justify-content-around' id='city' style={{ display: 'none' }}>
                    {imageData.city.map((x) => {
                        return (
                            <div class="card text-bg-dark hovercardgallery" onClick={(e) => { document.getElementById('fallery').style.display = 'flex' }} >
                                <img src={x.url} class="card-img" alt="..." />
                                <div class="card-img-overlay manualcard">
                                    <h5 class="card-title">{x.title}</h5>
                                    <p class="card-text">{x.description}</p>
                                    <p class="card-text"><a href={x.url}>{x.title}</a></p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='justify-content-around' style={{ display: 'none' }} id='history'>
                    {imageData.history.map((x) => {
                        return (
                            <div class="card text-bg-dark hovercardgallery" onClick={(e) => { document.getElementById('fallery').style.display = 'flex' }} >
                                <img src={x.url} class="card-img" alt="..." />
                                <div class="card-img-overlay manualcard">
                                    <h5 class="card-title">{x.title}</h5>
                                    <p class="card-text">{x.description}</p>
                                    <p class="card-text"><a href={x.url}>{x.title}</a></p>
                                </div>
                            </div>

                        )
                    })}
                </div>
                <div className='justify-content-around' style={{ display: 'none' }} id='tourist'>

                    {imageData.tourist.map((x) => {
                        return (
                            <div class="card text-bg-dark hovercardgallery" onClick={(e) => { document.getElementById('fallery').style.display = 'flex' }} >
                                <img src={x.url} class="card-img" alt="..." />
                                <div class="card-img-overlay manualcard">
                                    <h5 class="card-title">{x.title}</h5>
                                    <p class="card-text">{x.description}</p>
                                    <p class="card-text"><a href={x.url}>{x.title}</a></p>
                                </div>
                            </div>
                        )
                    })}
                </div>








                <div className='gallery' style={{ display: 'none' }} id='fallery' >
                    <button className='galleryclose btn-close' onClick={(e) => { document.getElementById('fallery').style.display = 'none' }}></button>
                    <div id="carouselExample568" class="carousel slide" style={{ height: '50vh', width: '50vw' }}>
                        <div class="carousel-inner">
                            {imageData[`${show}`]?.map((x) => {
                                return (
                                    <div class="carousel-item active">
                                        <img src={x.url} alt="Image 1" style={{ width: "-webkit-fill-available", height: " 26rem" }}></img>
                                    </div>
                                )
                            })}

                        </div>


                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample568" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample568" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>

    )
}

export default page