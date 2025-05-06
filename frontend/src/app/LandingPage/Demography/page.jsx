import React from 'react'
import "../p.css";
import FirstNav from '@/Components/LandingPageComp/FirstNav';
import MainNav from '@/Components/LandingPageComp/MainNav';
import Header from '@/Components/LandingPageComp/Header';
import Carousel from '@/Components/LandingPageComp/Carousel';
import Footer from '@/Components/LandingPageComp/Footer';

const page = () => {
    return (
        <>
            <FirstNav></FirstNav>

            <Header></Header>

            <MainNav></MainNav>

            <Carousel></Carousel>
            <div>
                <h2 style={{ textAlign: 'center', textDecoration: 'underline orange', paddingTop: '1rem', fontWeight: 'bold' }}>Demography</h2>
                <p style={{ fontSize: ' larger', padding: '50px',textAlign:'center' }}>As per provisional population figures of 2011 Census, the details are as follows</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '60%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', height: '100%' }} className='mx-5 my-5'>
                    <div className='d-flex justify-content-around my-2 innercustomcard' >
                        <span style={{ height: '100%', width: '50%', padding: '10px' }}>
                            <b>
                                4,521 Sq Km
                            </b>
                            <br />
                            Area
                        </span>
                        <div style={{ height: '100%', width: '35%', padding: '10px' }}>
                            <img src="/demography/image.png" alt="Image 1" className="innercustomcardimg" />
                        </div>
                    </div>
                    <div className='d-flex justify-content-around my-2 innercustomcard' >
                        <span style={{ height: '100%', width: '50%', padding: '10px' }}>
                            <b>
                            4,96,97
                            </b>
                            <br />
                            Population
                        </span>
                        <div style={{ height: '100%', width: '35%', padding: '10px' }}>
                            <img src="/demography/second.png" alt="Image 1" className="innercustomcardimg" />
                        </div>
                    </div>  
                     <div className='d-flex justify-content-around my-2 innercustomcard' >
                        <span style={{ height: '100%', width: '50%', padding: '10px' }}>
                            <b>
                           4
                            </b>
                            <br />
                           No. of Tehsil
                        </span>
                        <div style={{ height: '100%', width: '35%', padding: '10px' }}>
                            <img src="/demography/third.png" alt="Image 1" className="innercustomcardimg" />
                        </div>
                    </div>  
                     <div className='d-flex justify-content-around my-2 innercustomcard' >
                        <span style={{ height: '100%', width: '50%', padding: '10px' }}>
                            <b>
                           12
                            </b>
                            <br />
                           No. of Block
                        </span>
                        <div style={{ height: '100%', width: '35%', padding: '10px' }}>
                            <img src="/demography/fourth.png" alt="Image 1" className="innercustomcardimg" />
                        </div>
                    </div>
                     <div className='d-flex justify-content-around my-2 innercustomcard' >
                        <span style={{ height: '100%', width: '50%', padding: '10px' }}>
                            <b>
                           4
                            </b>
                            <br />
                          Nagar Palika/Panchayat
                        </span>
                        <div style={{ height: '100%', width: '35%', padding: '10px' }}>
                            <img src="/demography/fifth.png" alt="Image 1" className="innercustomcardimg" />
                        </div>
                    </div>
                    <div className='d-flex justify-content-around my-2 innercustomcard' >
                        <span style={{ height: '100%', width: '50%', padding: '10px' }}>
                            <b>
                          806
                            </b>
                            <br />
                         No. of Gram Panchayats
                        </span>
                        <div style={{ height: '100%', width: '35%', padding: '10px' }}>
                            <img src="/demography/sixth.png" alt="Image 1" className="innercustomcardimg" />
                        </div>
                    </div> 
                    <div className='d-flex justify-content-around my-2 innercustomcard' >
                        <span style={{ height: '100%', width: '50%', padding: '10px' }}>
                            <b>
                          16
                            </b>
                            <br />
                            No. of Police Station
                        </span>
                        <div style={{ height: '100%', width: '35%', padding: '10px' }}>
                            <img src="/demography/seventh.png" alt="Image 1" className="innercustomcardimg" />
                        </div>
                    </div> 
                    <div className='d-flex justify-content-around my-2 innercustomcard' >
                        <span style={{ height: '100%', width: '50%', padding: '10px' }}>
                            <b>
                          2079
                            </b>
                            <br />
                            No. of Villages
                        </span>
                        <div style={{ height: '100%', width: '35%', padding: '10px' }}>
                            <img src="/demography/eight.png" alt="Image 1" className="innercustomcardimg" />
                        </div>
                    </div>   

                </div>
            </div>
            <Footer></Footer>
        </>

    )
}

export default page