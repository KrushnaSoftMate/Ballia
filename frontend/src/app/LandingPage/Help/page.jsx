'use client'
import React, { Suspense } from 'react'
import "../p.css";
// import FirstNav from '@/Components/LandingPageComp/FirstNav';
// import MainNav from '@/Components/LandingPageComp/MainNav';
// import Header from '@/Components/LandingPageComp/Header';
// import Carousel from '@/Components/LandingPageComp/Carousel';
// import Footer from '@/Components/LandingPageComp/Footer';
const data = [
    {
        name: 'Screen Access For All (SAFA)',
        website: 'https://lists.sourceforge.net/lists/listinfo/safa-developer',
        type: 'Free',
    },
    {
        name: 'Non Visual Desktop Access (NVDA)',
        website: 'http://www.nvda-project.org',
        type: 'Free',
    },
    {
        name: 'System Access To Go',
        website: 'http://www.satogo.com',
        type: 'Free',
    },
    {
        name: 'Thunder',
        website: 'http://www.webbie.org.uk/thunder',
        type: 'Free',
    },
    {
        name: 'WebAnywhere',
        website: 'http://webinsight.cs.washington.edu/',
        type: 'Free',
    },
    {
        name: 'Hal',
        website: 'http://www.yourdolphin.co.uk/productdetail.asp?id=5',
        type: 'Commercial',
    },
    {
        name: 'JAWS',
        website: 'http://www.freedomscientific.com/Downloads/JAWS',
        type: 'Commercial',
    },
    {
        name: 'Supernova',
        website: 'http://www.yourdolphin.co.uk/productdetail.asp?id=1',
        type: 'Commercial',
    },
    {
        name: 'Window-Eyes',
        website: 'http://www.gwmicro.com/Window-Eyes/',
        type: 'Commercial',
    },
];
const page = () => {

    return (
        <>
            {/* <FirstNav></FirstNav>

            <Header></Header>

            <MainNav></MainNav>

            <Carousel></Carousel> */}
            <div>
                <h2 style={{ textAlign: 'center', textDecoration: 'underline orange', paddingTop: '1rem', fontWeight: 'bold' }}>Help</h2>
                <p style={{ fontSize: ' larger', padding: '50px' }}>
                    <b><u> Accessibility</u></b> <br />
                    We are committed to ensure that the site is accessible to all users irrespective of device in use, technology or ability.
                    It has been built, with an aim, to provide maximum accessibility and usability to its visitors.
                    Best efforts have been put to ensure that all information on this website is accessible to people with disabilities. For
                    example, a user with visual disability can access this website using assistive technology, such as screen reader.
                    Users with low vision can use high contrast and font size increase options. This website meets level AA of the Web
                    Content Accessibility Guidelines (WCAG) 2.0 laid down by the World Wide Web Consortium (W3C).
                    If you have any problem or suggestion regarding the accessibility of this Site, please send a feedback to us.<br /><br />
                    <b><u>Screen Reader Access</u></b><br />
                    Our visitors with visual impairments can access the site using Assistive Technologies, such as screen readers.
                    Following table lists the information about different screen readers
                    <br />
                </p>
                <div className='mx-5'>
                    <table className='table table-primary' >
                        <thead className='table table-dark'>
                            <tr>
                                <th scope="col">Screen Reader</th>
                                <th scope="col">Website</th>
                                <th scope="col">Free / Commercial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} >
                                    <td scope="row" >{item.name}</td>
                                    <td><a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a></td>
                                    <td>{item.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p  style={{ fontSize: ' larger', padding: '50px' }}>

                    <br /><br />
                    <b><u > Viewing Information in Various File Formats</u></b><br />.

                    The information provided by this Web site is available in various file formats, such as Portable Document Format
                    (PDF), Word, Excel and PowerPoint. To view the information properly, your browser need to have the required
                    plug-ins or software. For example, the Adobe Flash software is required to view the Flash files. In case your system
                    does not have this software, you can download it from the Internet for free. The table lists the required plug-ins
                    needed to view the information in various file formats

                    <br /><br />
                    <b><u>Plug-in for alternate document types</u></b>
                  
                </p>
                <div className='mx-5'>
                    <table className='table table-primary' >
                        <thead className='table table-dark'>
                            <tr>
                                <th scope="col">Document Type</th>
                                <th scope="col">Plug-in for Downloa</th>
                             
                            </tr>
                        </thead>
                        <tbody>
                           
                                <tr >
                                    <td scope="row" >Portable Document Format (PDF) files </td>
                                    <td><a  target="_blank" rel="noopener noreferrer">Adobe Acrobat Reader (External website that opens in a new window</a></td>
                                   
                                </tr>
                          
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </>

    )
}

export default page