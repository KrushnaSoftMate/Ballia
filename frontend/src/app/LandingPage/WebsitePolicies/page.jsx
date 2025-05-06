import React from 'react'
import "../p.css";
import MainNav from '@/Components/Demopages/MainNav';
import Footer from '@/Components/Demopages/Footer';

const page = () => {
    return (
        <>
       

        <MainNav></MainNav>

        
        <div>
            <h2 style={{ textAlign: 'center', textDecoration: 'underline orange', paddingTop: '1rem', fontWeight: 'bold' }}>Website Policies</h2>
            <p style={{ fontSize: ' larger', padding: '50px' }}>
           <b><u> Terms of Use </u></b> <br/>
Chunar is managing the content of the website.
Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same 
should not be construed as a statement of law or used for any legal purposes.
In no event will the Chunar district be liable for any expense, loss or damage including, without limitation, indirect 
or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of 
data, arising out of or in connection with the use of this Portal.
Links to other websites that have been included on this Portal are provided for public convenience only. We cannot 
guarantee the availability of such linked pages at all times.
These terms and conditions shall be governed by and construed in accordance with the Indian Laws. Any dispute 
arising under these terms and conditions shall be subject to the exclusive jurisdiction of the courts of India.<br/><br/>
<b><u>Copyright Policy</u></b><br/>
Material featured on this website may be reproduced free of charge after taking proper permission by sending a mail 
to us. However, the material has to be reproduced accurately and not to be used in a derogatory manner or in a 
misleading context. Wherever the material is being published or issued to others, the source must be prominently 
acknowledged. However, the permission to reproduce this material shall not extend to any material which is 
identified as being copyright of a third party. Authorisation to reproduce such material must be obtained from the 
departments/copyright holders concerned.
<br/><br/>
<b><u >Privacy Policy</u></b><br/>
This website does not automatically capture any specific personal information from you, (like name, phone number 
or e-mail address), that allows us to identify you individually.
If the website requests you to provide personal information, you will be informed for the particular purposes for 
which the information is gathered e.g. feedback form and adequate security measures will be taken to protect your 
personal information.
We do not sell or share any personally identifiable information volunteered on the website site to any third party 
(public/private). Any information provided to this website will be protected from loss, misuse, unauthorized access or 
disclosure, alteration, or destruction.
We gather certain information about the User, such as Internet protocol (IP) addresses, domain name, browser type, 
operating system, the date and time of the visit and the pages visited. We make no attempt to link these addresses 
with the identity of individuals visiting our site unless an attempt to damage the site has been detected.
<br/><br/>
<b><u>Hyper Linking Policy</u></b>
<br/>
<b><u>Links to external websites/portals</u></b><br/>
At many places in this website, you shall find links to other websites/portals. This links have been placed for your 
convenience. We can not guarantee that these links will work all the time and we have no control over availability of 
linked pages
            </p>
        </div>
        <Footer></Footer>
        </>
        
    )
}

export default page