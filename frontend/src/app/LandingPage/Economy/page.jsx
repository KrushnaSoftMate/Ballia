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
                <h2 style={{ textAlign: 'center', textDecoration: 'underline orange', paddingTop: '1rem', fontWeight: 'bold' }}>Economy</h2>
                <p style={{ fontSize: ' larger', padding: '50px' }}>In 2006 the Ministry of Panchayati Raj named Mirzapur one of the country’s 250 most backward districts (out of a total
                    of 640). It is one of the 34 districts in Uttar Pradesh currently receiving funds from the Backward Regions Grant Fund
                    Programme (BRGF). Once tourism used to contribute in the economy but due to lack of care from government officials
                    and local people the unmatched beauty of the places like Sirshe dam and waterfall, Dadri (Pipari) dam, Vindham
                    waterfall, Lower Khajuri, Upper Khajuri, Lakhaniya waterfall, Siddhnath Waterfall, Kotwan-Patehara forest, Fort of
                    Chunar and Dadri-Haliya forest has become ‘the stories of past’. Once there was a time when every Sunday of rainy
                    season used to be a fair like atmosphere for the neighbouring localities of Sirshe waterfall and Vindham waterfall due
                    to their attraction of tourist not only from every part of the U.P. and but neighbourhood states too. The separation of
                    the Sonebhadra largely affected the economical condition and after the closing of mills and depression in the carpet
                    industry Mirzapur has become nearly economically handicapped.</p>
            </div>
            <Footer></Footer>
        </>

    )
}

export default page