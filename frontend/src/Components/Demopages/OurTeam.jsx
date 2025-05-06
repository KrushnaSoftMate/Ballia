import React, { Suspense, useEffect } from 'react';
import "./LandingPage.css";

const OurTeam = () => {

    return (
        <>
            <section className="c_block_1">
                {/* <div className="container" style={{ display: "flex", justifyContent: 'space-evenly', flexWrap: 'wrap', padding: '20px' }}>

                    <div style={{ backgroundColor: '#eae9f2', width: '12rem', height: '16rem', borderRadius: '20px', padding: '2rem', textAlign: 'center', fontSize: 'small' }}>
                        <figure>
                            <img style={{ width: "7rem", height: "9rem", borderRadius: '22px' }} src="/team photo/EO_nagarpalikaparishad.jpeg" alt="" />
                        </figure>
                        <strong> सुभाष कुमार<br />(अधिशासी अधिकारी)</strong>
                    </div>
                    <div style={{ backgroundColor: '#eae9f2', width: '12rem', height: '16rem', borderRadius: '20px', padding: '2rem', textAlign: 'center', fontSize: 'small' }}>
                        <figure>
                            <img style={{ width: "7rem", height: "9rem", borderRadius: '22px' }} src="/team photo/Abhishekh_Revenu.jpeg" alt="" />
                        </figure>
                        <strong>अभिषेक सिंह<br />(राजस्व निरीक्षक)</strong>
                    </div>
                    <div style={{ backgroundColor: '#eae9f2', width: '12rem', height: '16rem', borderRadius: '20px', padding: '2rem', textAlign: 'center', fontSize: 'small' }}>
                        <figure>
                            <img style={{ width: "7rem", height: "9rem", borderRadius: '22px' }} src="/team photo/Adhyaksha_santkumar.jpeg" alt="" />
                        </figure>
                        <strong>संत कुमार मिठाई लाल<br />(अध्यक्ष नगर पालिका परिषद बलिया)</strong>
                    </div>


                </div> */}




                {/* <div className="container" style={{ display: "flex", justifyContent: 'space-evenly', flexWrap: 'wrap', padding: '20px' }}>

                    <div style={{ backgroundColor: '#eae9f2', width: '12rem', height: '16rem', borderRadius: '20px', padding: '2rem', textAlign: 'center', fontSize: 'small' }}>
                        <figure>
                            <img style={{ width: "7rem", height: "9rem", borderRadius: '22px' }} src="/team photo/EO_nagarpalikaparishad.jpeg" alt="" />
                        </figure>
                        <strong> सुभाष कुमार<br />(अधिशासी अधिकारी)</strong>
                    </div>
                    <div style={{ backgroundColor: '#eae9f2', width: '12rem', height: '16rem', borderRadius: '20px', padding: '2rem', textAlign: 'center', fontSize: 'small' }}>
                        <figure>
                            <img style={{ width: "7rem", height: "9rem", borderRadius: '22px' }} src="/team photo/Abhishekh_Revenu.jpeg" alt="" />
                        </figure>
                        <strong>अभिषेक सिंह<br />(राजस्व निरीक्षक)</strong>
                    </div>
                    <div style={{ backgroundColor: '#eae9f2', width: '12rem', height: '16rem', borderRadius: '20px', padding: '2rem', textAlign: 'center', fontSize: 'small' }}>
                        <figure>
                            <img style={{ width: "7rem", height: "9rem", borderRadius: '22px' }} src="/team photo/Adhyaksha_santkumar.jpeg" alt="" />
                        </figure>
                        <strong>संत कुमार मिठाई लाल<br />(अध्यक्ष नगर पालिका परिषद बलिया)</strong>
                    </div>


                </div> */}

                <div className="col-12 py-5">
                    <div className="row">
                        <div className="col-4 p-2 m-auto">
                            <div className="ImageContainer m-auto">
                                <div className="m-auto ImageContainerSection p-0">
                                    <div className="imageofImg p-0">
                                        <img className='d-block' src="/team photo/EO_nagarpalikaparishad.jpeg" alt="सुभाष कुमार (अधिशासी अधिकारी)" />
                                    </div>
                                    <div className="col-12 text-center">
                                        <p className='appleFonts'> सुभाष कुमार<br />(अधिशासी अधिकारी)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-4 p-2 m-auto">
                            <div className="ImageContainer m-auto ">
                                <div className="m-auto ImageContainerSection p-0">
                                    <div className="imgofImg2 p-0">
                                        <img className='d-block img2' src="/team photo/Abhishekh_Revenu.jpeg" alt="अभिषेक सिंह (राजस्व निरीक्षक)" />
                                    </div>
                                    <div className="col-12 text-center">
                                        <p className='appleFonts'> अभिषेक सिंह<br />(राजस्व निरीक्षक)</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-4 p-2 m-auto">
                            <div className="ImageContainer m-auto">
                                <div className="m-auto ImageContainerSection p-0">
                                    <div className="imageofImg p-0">
                                        <img className='d-block' src="/team photo/Adhyaksha_santkumar.jpeg" alt="संत कुमार मिठाई लाल (अध्यक्ष नगर पालिका परिषद बलिया)" />
                                    </div>
                                    <div className="col-12 text-center">
                                        <p className='appleFonts'>संत कुमार मिठाई लाल<br />(अध्यक्ष नगर पालिका परिषद बलिया)</p>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>




            </section>

        </>
    )
}

export default OurTeam