import React from 'react'
import "../p.css";
import MainNav from '@/Components/Demopages/MainNav';
import Footer from '@/Components/Demopages/Footer';

const page = () => {
    return (
        <>
         

            <MainNav></MainNav>

         
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ textAlign: 'center', textDecoration: 'underline orange', paddingTop: '1rem', fontWeight: 'bold', padding: '1rem' }}>Contact Us</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className='contus'  style={{ fontSize: '25px', fontFamily: 'sans-serif' }}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <img src="/Location.png"  height={30} alt="" />
                            <p className='col-10'>Address: Ballia.</p>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} >
                            <img src="/Mail-1.png" height={25} alt="" />
                            <p className='col-10'>E-mail id - </p>
                        </div>
                        {/* <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <img src="/Contact-1.png" height={30} alt="" />
                            <p className='col-10'>Contact No - 9874563210</p>
                        </div> */}
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <img src="/Timing.png" height={30} alt="" />
                            <p className='col-10'>Timing - Monday-Saturday <br /> 10 AM to 5 PM</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <iframe className='map' style={{ height: '21rem', width: '45vw' }} src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57490.94485721184!2d84.10792128221753!3d25.76448355159981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399264de6d336a87%3A0xd8d5251dac89a330!2sBallia%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1734003275723!5m2!1sen!2sin'></iframe>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default page