'use client'
import React, { Suspense } from 'react'
import MainNav from '@/Components/Demopages/MainNav';
import Header from '@/Components/Demopages/Header';
import Carousel from '@/Components/Demopages/Carousel';
import FirstNav from '@/Components/Demopages/FirstNav';
import OurTeam from '@/Components/Demopages/OurTeam';
import Footer from '@/Components/Demopages/Footer';
import MapSection from '@/Components/Demopages/MapSection';
import OurClient from '@/Components/Demopages/OurClientscroll';
import Department from '@/Components/Demopages/Department';
import Services from '@/Components/Demopages/Services';
import About from '@/Components/Demopages/About';
import InfoPanel from '@/Components/Demopages/InfoPannel';
import GalleryTabPanel from '@/Components/Demopages/Gallary';

const Landingpage = () => {

    return (
        <div>
            <Header></Header>

            <MainNav></MainNav>

            <Carousel></Carousel>

            <FirstNav></FirstNav>

            <OurTeam></OurTeam>

            <Department></Department>

            <Services></Services>

            <About></About>

            {/* <InfoPanel></InfoPanel> */}

            <GalleryTabPanel></GalleryTabPanel>

            <OurClient></OurClient>
            <Footer></Footer>
        </div >
    )
}

export default Landingpage