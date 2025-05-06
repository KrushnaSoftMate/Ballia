'use client'
import { useRef, useState } from 'react';
// import React, { useContext, useEffect, useState ,useRef ,Suspense } from 'react'
// import { Customer } from '@/app/AdminContext/CustomerManagement'
import './complaint.css';

const Page = () => {
    const [form, setForm] = useState({})
    const [data, setData] = useState([])
    const [photo, SetPhoto] = useState("");
    const [documents, SetDocument] = useState("");
    // //   const statecalls = useContext(Customer);
    //   const { RaiseAcomplaint,EncryptionKey,encryptData1 } = statecalls;
    const formref = useRef(null)

    const handleInputChange = (e) => {
        const { id, value } = e.currentTarget;

        // Allow only safe characters (alphanumeric, spaces, etc.) and restrict length
        const safeCharacters = /^[a-zA-Z0-9._-]*$/; // Allow only safe characters for email
        const safeEmailCharacters = /^[a-zA-Z0-9@._-]*$/; // Allow only safe characters for email
        const safePhoneNumber = /^[0-9]*$/; // Allow only safe characters for contact
        const safeName = /^[a-zA-Z/\s]*$/; // Allow only safe characters for name
        const safeAadhar = /^[0-9]*$/; // Allow only safe characters for aadhar
        const safeMessage = /^[a-zA-Z0-9/\s]*$/; // Allow only safe characters for message
        if (!safeEmailCharacters.test(value) && id === 'email') {
            alert("Only safe characters are allowed .");
            return;
        }
        // else if (!safeCharacters.test(value) && id !== 'email') {
        //   alert("Only safe characters are allowed .");
        //   return;
        // }
        else if (!safePhoneNumber.test(value) && id === 'contact') {
            alert("Only Numbers are allowed .");
            return;
        }
        else if (!safeName.test(value) && id === 'fullname') {
            alert("Only safe characters are allowed .");
            return;
        }
        else if (!safeMessage.test(value) && id === 'address') {
            alert("Only safe characters are allowed.");
            return;
        }
        else if (!safeMessage.test(value) && id === 'Message') {
            alert("Only safe characters are allowed.");
            return;
        }
        setForm({ ...form, [id]: value, documents });
    };

    function AadharManager(e) {
        let input = e.currentTarget.previousElementSibling; // Target the previous sibling, which is the input field
        let eye = e.currentTarget;
        input.type === 'password' ? input.type = 'text' : input.type = 'password'
        eye.className === "fa-regular fa-eye" ? eye.className = "fa-regular fa-eye-slash" : eye.className = "fa-regular fa-eye"
    }

    // const ImageForm = (e) => {
    //   console.log(e)
    //   let value = e.target.value;
    //   SetPhoto( value );
    // };
    const ImageForm = (e) => {
        let name = e.currentTarget.files[0].name;
        let value = e.currentTarget.name;
        SetDocument([...documents, { [name]: value }]);
    };
    const Document = (e) => {
        let value = e.target.value;
        SetDocument(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log("Submitting form:", form);
        try {
            // Generate an encryption key
            const CheckerKey = EncryptionKey();
            console.log(form);

            // Encrypt only the form text fields (excluding files)
            const textFields = { ...form }; // Assuming `form` contains only text fields
            const encryptedTextFields = encryptData1(JSON.stringify(textFields), CheckerKey);

            // Initialize FormData for multipart/form-data
            const uploadform = new FormData();

            // Append encrypted text fields as a single payload
            uploadform.append("encryptedTextFields", encryptedTextFields);

            // Append each document file to the FormData
            documents.forEach((item) => {
                const [fileName, inputField] = Object.entries(item)[0];
                const fileInput = document.getElementById(inputField);

                // Ensure the file exists before appending it
                if (fileInput && fileInput.files[0]) {
                    if (fileName.includes('pdf')) {
                        uploadform.append("ApplicationDoc", fileInput.files[0]); // Specific for application
                    } else {
                        uploadform.append("PhotoDoc", fileInput.files[0]); // Specific for live photo
                    }
                }
            });

            // Send the encrypted form data and files to the server
            let data = await RaiseAcomplaint(uploadform, CheckerKey);

            if (data.message === "Ticket Created Successfully") {
                alert(data.message);
                // handleclear();
            }
        } catch (error) {
            console.log("Error in handleSubmit:", error);
        }
    };

    const handleclear = () => {
        formref.current.reset()
        setForm([])
    };
    return (
        <div className=' h-1'>
            <h2 style={{ padding: '20px', marginLeft: '7rem' }}><b>Complaint Application</b></h2>
            <form ref={formref} onSubmit={(x) => handleSubmit(x)} style={{ display: 'flex', width: '80%', flexWrap: "wrap", padding: '2%', borderRadius: '20px', backgroundColor: 'white', marginTop: '14px', margin: "auto" }} autoComplete="off">
                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Your Full Name</label><br />
                    <input autoComplete="off" type="text" id="fullname" placeholder="Enter Full Name" onChange={handleInputChange} value={form.fullname || ""} className='form-control mt-2' required />
                </div>
                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Your Contact Number</label><br />
                    <input autoComplete="off" type="text" id="contact" placeholder="Enter Contact Number" onChange={handleInputChange} value={form.contact || ""} maxLength={10}
                        className='form-control mt-2' required />
                </div>
                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Your Email ID</label><br />
                    <input autoComplete="off" type="text" id="email" placeholder="Enter Email ID" onChange={handleInputChange} value={form.email || ""} className='form-control mt-2' required />
                </div>
                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Your Address</label><br />
                    <input autoComplete="off" type="text" id="address" placeholder="Address" onChange={handleInputChange} value={form.address || ""} className='form-control mt-2' required />
                </div>
                <div className="mx-2" style={{ width: '45%', padding: '8px' }}>
                    <label style={{ fontWeight: 'bold' }}>Your Application</label><br />
                    <input autoComplete="off" className="form-control mt-2" type="file" name='ApplicationDoc' id="ApplicationDoc" onChange={ImageForm} />
                </div>
                <div className="mx-2" style={{ width: '45%', padding: '8px' }}>
                    <label style={{ fontWeight: 'bold' }}>Live photo</label><br />
                    <input autoComplete="off" className="form-control mt-2" type="file" name="PhotoDoc" id="PhotoDoc" onChange={ImageForm} />
                </div>
                <div className="mx-2" style={{ width: '100%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Select Your Ward</label><br />
                    <select id="ward" className="form-control mt-2" onChange={handleInputChange} required>
                        <option selected disabled>Select Ward</option>
                        <option value="Mirzapur/Shivala Mahant">Mirzapur/Shivala Mahant</option>
                        <option value="Mirzapur/Bathuwa">Mirzapur/Bathuwa</option>
                        <option value="Mirzapur/Chet Ganj">Mirzapur/Chet Ganj</option>
                        <option value="Mirzapur/Fataha">Mirzapur/Fataha</option>
                        <option value="Mirzapur/GaneshGanj">Mirzapur/GaneshGanj</option>
                        <option value="Mirzapur/Imam Ganj">Mirzapur/Imam Ganj</option>
                        <option value="Mirzapur/Mahuwariy">Mirzapur/Mahuwariy</option>
                        <option value="Mirzapur/Sankat Mochan">Mirzapur/Sankat Mochan</option>
                        <option value="Mirzapur/Station">Mirzapur/Station</option>
                        <option value="Mirzapur/Tarkapur">Mirzapur/Tarkapur</option>
                        <option value="Mirzapur/Trimohani">Mirzapur/Trimohani</option>
                        <option value="Mirzapur/Vindhyanchal">Mirzapur/Vindhyanchal</option>
                    </select>
                </div>
                <div className="mx-2" style={{ width: '100%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Your Message</label><br />
                    <textarea autoComplete="off" id="Message" className="form-control mt-2" onChange={handleInputChange} placeholder="Leave a message..." maxLength={200} required></textarea>
                </div>
                <div className="mx-2" style={{ width: '100%', display: "flex", justifyContent: "space-around" }} >
                    <button type="submit" style={{ width: '8rem', backgroundColor: '#f1772e', color: 'white', borderRadius: '12px' }} className="form-control mt-2 btn  my-2 col-12" >Submit</button>
                    <button type="button" style={{ width: '8rem', border: '2px solid #f1772e', borderRadius: '12px' }} className="form-control mt-2 btn  my-2 col-12" onClick={(e) => { handleclear() }}>Clear</button>
                </div>
            </form>
            
        </div>
    )
}

export default Page;