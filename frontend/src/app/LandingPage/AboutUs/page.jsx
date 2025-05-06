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
            <h2 style={{ textAlign: 'center', textDecoration: 'underline orange', paddingTop: '1rem', fontWeight: 'bold' }}>About Us</h2>
            <p style={{ fontSize: ' larger', padding: '50px' }}>Mirzapur is a city in Uttar Pradesh, India, roughly 650 km from both Delhi and Kolkata, almost 87 kms from Allahabad and 67 kms from Varanasi. It has a population of 2,496,970 of which male and female were 1,312,302 and 1,184,668 respectively(via:-census2011). It is known for its carpets and brassware industries. The city is surrounded by several hills and is the headquarters of Mirzapur District and is famous for the holy shrine of Vindhyachal, Ashtbhuja and Kali khoh and also have Devrahwa Baba ashram. It has many waterfalls and natural spots. It was once the largest district in Uttar Pradesh before the split up of Sonebhadra. There are a few cinema-halls. At first look the city appears to be a confluence of town, village and city life. Before the establishment of the town, the area was a dense forest and freely used by various states like Varanasi (A.K.A.:-Benaras), Sakteshgarh, Vijaygarh, Nainagarh (Chunar), Naugarh, Kantit and Rewa for Hunting. British East India Company had established this area to fulfill the needs of a trading center between central and western India. This time Rewa was a well-established state of central India and was directly connected with Mirzapur by the Great Deccan Road.Over the time Mirzapur became a famous trading center of Central India and started trading of cotton, and silk at very large scale. The East India Company named this place as Mirzapur. The word Mirzapur is derived from ‘Mirza’ which in turn is derived from the Persian term ‘Trip Kalchu which literally means “child of the ‘Amīr” or “child of the ruler”. In Persia‘ Amīrzād in turn consists of the Arabic title ‘Amīr (English. “Emir”), meaning “commander”, and the Persian suffix -zād, meaning “birth” or “lineage”. Due to vowel harmony in Turkic languages, the alternative pronunciation Morza (plural morzalar; derived from the Persian word) is also used. The word entered English in 1595, from the French émir. The meaning of Mirzapur is the place of King.</p>
        </div>
        <Footer></Footer>
        </>
        
    )
}

export default page