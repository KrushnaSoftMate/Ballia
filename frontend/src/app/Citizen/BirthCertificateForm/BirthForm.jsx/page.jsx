"use client";

import { useState } from "react";
import './birth.css'
// import React, { Suspense, useContext, useEffect, useState, useRef } from 'react'
// import MainNav from '@/Components/LandingPageComp/MainNav'
// import { Customer } from '@/app/AdminContext/CustomerManagement'
// import { HASHKEY, ENV } from "@/app/paths";

const page=()=> {
  


  // const statecalls = useContext(Customer);
  // const { Birthform, GetHashKeyForBirthForm, CertificatePayment } = statecalls;
  const [formData, setFormData] = useState({
    birth_date: '',
    gender: '',
    baby_name_hindi: '',
    baby_name_english: '',
    father_name_hindi: '',
    father_name_english: '',
    mother_uid: '',
    mother_name_hindi: '',
    mother_name_english: '',
    address: '',
    birth_place: '',
    place_name: '',
    place_address: '',
    informant_mobile: '',
    email: '',
    form_date: '',
    signatureorthumb: '',
    residence_area_name: '',
    city_or_village: '',
    district_name: '',
    state_name: '',
    religion: '',
    other_religion_name: '',
    father_education: '',
    mother_education: '',
    father_occupation: '',
    mother_occupation: '',
    mother_age_at_marriage: '',
    live_children_count: '',
    delivery_method: '',
    pregnancy_weeks: '',
    mother_age_at_birth: '',
    delivery_by: '',
    birth_weight: '',
    file_path: '',
    documents: '',
  });
  
  const [Haskey, SetHaskey] = useState();
  const [documents, SetDocument] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const emailCharacters = /^[a-zA-Z0-9@._-]*$/;
    const safePhoneNumber = /^[0-9]*$/;
    const safeAadhar = /^[0-9]*$/;
    const safeCharacters = /^[a-zA-Z._-]*$/; 

    if (!emailCharacters.test(value) && name==="email" ) {
      alert("Only safe characters are allowed .");
      return;
    }
    else if (!safePhoneNumber.test(value) && name === 'informant_mobile') {
      alert("Only Numbers 10 are allowed .");
      return;
    }
    else if (!safeAadhar.test(value) && name === 'mother_uid') {
      alert("Only Numbers are allowed .");
      return;
    }
    else if (
      !safeCharacters.test(value) && 
      (
        name === 'baby_name_hindi' ||
        name==='gender'||
        name === "father_name_english" ||
        name === "father_name_hindi" ||
        name === "mother_name_hindi" ||
        name === "mother_name_english" ||
        name === "address" ||
        name === "place_name" ||
        name === "place_address" ||
        name === "residence_area_name" ||
        name === "district_name" ||
        name === "father_education" ||
        name === "mother_education" ||
        name === "father_occupation" ||
        name === "mother_occupation" ||
        name === "mother_age_at_marriage"
      )
    ) {
      alert("Only safe characters are allowed.");
      return;
    }
    
    if (type === 'checkbox') {
      const [mainName, subName] = name.split('.');
      if (checked) {
        setFormData({
          ...formData,
          [mainName]: subName,
        });
      } else {
        setFormData({
          ...formData,
          [mainName]: '',
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const ImageForm = (e) => {
    const file = e.currentTarget.files[0];
    const inputField = e.currentTarget.name;
    SetDocument([...documents, { file, inputField }]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting form:", formData);

    const uploadform = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      uploadform.append(key, value);
    });
    documents.forEach((item) => {
      const { file, inputField } = item;

      if (file) {
        if (file.name.includes('pdf')) {
          uploadform.append("file_path", file); // Array of application documents
        } else {
          uploadform.append("signatureorthumb", file); // Array of live photos
        }
      }
    });
    for (const [key, value] of uploadform.entries()) {
      console.log(`${key}:`, value);
    }
    let data = await Birthform(uploadform);
    if (data) {
      console.log("Form submitted, response:", data);
      alert("Form Submitted Successfully");
    } else {
      console.error("Error submitting form:");
    }
  };

  async function GetHashKeyData(x) {
    x.preventDefault();
    let obj = {
      ...formData,
    };
    let haskey = await GetHashKeyForBirthForm(obj);
    console.log(haskey);
    if (haskey?.message === "No Charges for Birth Certificate") {
      alert("No Charges for Birth Certificate")
      handleSubmit(x)
      return
    }
    if (haskey?.message === 'already exist') {
      alert("You have already applied for Birth Certificate")
      return
    }
    SetHaskey(haskey?.data);
    if (typeof window !== "undefined") {


      var easebuzz = new window.EasebuzzCheckout(HASHKEY, ENV);
      let response1 = null;
      var options = {
        access_key: haskey?.data,

        onResponse: async (response1) => {
          let obj1 = {
            ...formData,

            ...response1
          };
          await CertificatePayment(obj1);
          if (response1.status === "success") {
            alert('Payment Success full')
            handleSubmit(x)
            // window.location.href = `/Reciept/${params.id}`
          }
          else {
            alert('Payment Failed,form not submitted')
          }
        },
        theme: "#123456",
      };
      easebuzz.initiatePayment(options);
    }
  }

  return (
   
    <>
      {/* <MainNav /> */}
      <div style={{backgroundColor:"#af737317"}}>
        <button className='btn btn-primary m-2' onClick={() => window.history.back()}>Back</button>
      <h4 className='text-center text-3xl font-bold'>जन्म प्रमाण पत्र फॉर्म</h4>
        <form className="birth-form" style={{ display: 'flex', width: '80%', flexWrap: "wrap", padding: '2%', backgroundColor: 'white', marginTop: '14px' , margin:"auto" }} onSubmit={GetHashKeyData}>
      <h5 style={{ fontWeight: 'bold'}}>कृपया फॉर्म भरें।</h5>
      <div  className="form-section"></div>
          <div className="form-section">
            <label >जन्म की तिथि:</label>
            <input type="date" placeholder="DD-MM-YYYY" name="birth_date" value={formData.birth_date || ""} onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>लिंग:</label>
            <input type="text" placeholder="महिला/पुरुष/ट्रांसजेंडर अंकित करें, संक्षिप्त में नहीं" name="gender" value={formData.gender || ""} onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>नवजात शिशु का नाम:</label>
            <input type="text" placeholder="(हिंदी में)" name="baby_name_hindi" value={formData.baby_name_hindi} onChange={handleChange} required/>
            <input type="text" placeholder="(अंग्रेजी के बड़े अक्षरों में)" name="baby_name_english"  value={formData.baby_name_english || ""} onChange={handleChange} />
          </div>
 
          <div className="form-section">
            <label>पिता का नाम:</label>
            <input type="text" placeholder="(पूर्व जैसे सामन्यः लिखा जाता है) (हिंदी में)" name="father_name_hindi" value={formData.father_name_hindi} onChange={handleChange} required/>
            <input type="text" placeholder="(अंग्रेजी के बड़े अक्षरों में)" name="father_name_english" value={formData.father_name_english || ""} onChange={handleChange}required />
          </div>
 
          <div className="form-section">
            <label>माता का UID NO./ आधार नं.:</label>
            <input type="text" placeholder="(यदि कोई हो)" name="mother_uid" maxLength={12} value={formData.mother_uid || ""} onChange={handleChange} required/>
            <input type='text' style={{visibility:"hidden"}}></input>
          </div>
 
          <div className="form-section">
            <label>माता का नाम:</label>
            <input type="text" placeholder="(पूर्व जैसे सामन्यः लिखा जाता है) (हिंदी में)" name="mother_name_hindi" value={formData.mother_name_hindi} onChange={handleChange}  required/>
            <input type="text" placeholder="(अंग्रेजी के बड़े अक्षरों में)" name="mother_name_english" value={formData.mother_name_english || ""} onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>माता-पिता के स्वामी निवास का पता:</label>
            <input type="text" placeholder="माता-पिता के स्वामी निवास का पता" name="address" value={formData.address || ""} onChange={handleChange}required />
          </div>
 
          <div className="form-section">
            <label>जन्मका स्थान:(1,2 अथवा 3 पर सही ✔ का निशान लगाएं तथा अस्पताल/स्थान का
              नाम/पता एवं जहां जन्म हुआ हो उस घर का पता ।)</label>
            <div>
              <label>
                <input type="checkbox"  name="birth_place.hospital" checked={formData.birth_place === 'hospital'} onChange={handleChange} /> अस्पताल/स्थल
              </label>
              <label>
                <input type="checkbox"  name="birth_place.home" checked={formData.birth_place === 'home'} onChange={handleChange} /> घर
              </label>
            </div>
          </div>
 
          <div className="form-section">
            <label>नाम:</label>
            <input type="text" placeholder="नाम" name="place_name" value={formData.place_name || ""} onChange={handleChange}required />
          </div>
 
          <div className="form-section">
            <label>पता:</label>
            <input type="text"  placeholder="पता" name="place_address" value={formData.place_address || ""} onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>मोबाइल नं.:</label>
            <input type="text" placeholder="मोबाइल नं." name="informant_mobile" maxLength={10} value={formData.informant_mobile || ""} onChange={handleChange}required />
            
          </div>
 
          <div className="form-section">
            <label>ईमेल आई.डी.:</label>
            <input type="email " placeholder='ईमेल आई.डी' name="email" value={formData.email || ""} onChange={handleChange} required/>
           </div>
 
          <div className="form-section">
            <label>तारीख:</label>
            <input type="date" placeholder="DD-MM-YYYY" name='form_date' value={formData.form_date || ""} onChange={handleChange}required />
          </div>
 
          <div className="form-section">
            <label>हस्ताक्षर या अंगूठे का फोटो</label>
            <input type="file" name='signatureorthumb' onChange={ImageForm} required/>
          </div>
 
          <div className="form-section">
            <label>शहर/ग्राम का नाम:</label>
            <input type="text" placeholder='शहर/ग्राम का नाम' name='residence_area_name' value={formData.residence_area_name || ""} onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>क्या शहर है अथवा ग्राम है: (सही ✔ का निशान लगाएं)</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="city_or_village.city" checked={formData.city_or_village === "city"} onChange={handleChange} required/> शहर
              </label>
              <label>
                <input type="checkbox" name="city_or_village.village" checked={formData.city_or_village === "village"} onChange={handleChange}required /> ग्राम
              </label>
            </div>
          </div>
 
          <div className="form-section">
            <label>जिले का नाम:</label>
            <input type="text" placeholder='जिले का नाम' name="district_name" checked={formData.district_name} onChange={handleChange}required />
          </div>
 
          <div className="form-section">
            <label>राज्य का नाम:</label>
            <input type="text" value="उत्तर प्रदेश" name='उत्तर प्रदेश' readOnly onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>धर्म (सही ✔ का निशान लगाएं)</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox"  name="religion.hindu" checked={formData.religion === "hindu"} onChange={handleChange} />हिन्दू
              </label>
              <label>
                <input type="checkbox"  name="religion.muslim" checked={formData.religion === "muslim"} onChange={handleChange} />मुस्लिम
              </label>
              <label>
                <input type="checkbox"  name="religion.christian" checked={formData.religion === "christian"} onChange={handleChange} />ईसाई
              </label>
              <label>
                <input type="checkbox"  name="religion.other" checked={formData.religion === "other"} onChange={handleChange} />अन्य
              </label>
            </div>
            <input type="text" className='px-1' placeholder="अन्य धर्म : (धर्म का नाम लिखें)" name='other_religion' value={formData.other_religion} onChange={handleChange} />
          </div>
 
          <div className="form-section">
            <label>पिता का शैक्षिक स्तर:</label>
            <input type="text" placeholder="(पूर्ण किए गए शैक्षिक स्तर की प्रविष्टि करें जैसे यदि पिता कक्षा 7 तक ही पढ़े हो तथा कक्षा 6 की ही परीक्षा पास की हो, तो कक्षा 6 ही लिखें)" name="father_education" checked={formData.father_education} onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>माता का शैक्षिक स्तर:</label>
            <input type="text" placeholder="(पूर्ण किए गए शैक्षिक स्तर की प्रविष्टि करें जैसे यदि माता कक्षा 7 तक ही पढ़े हो तथा कक्षा 6 की ही परीक्षा पास की हो, तो कक्षा 6 ही लिखें)" name="mother_education" checked={formData.mother_education} onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>पिता का व्यवसाय:</label>
            <input type="text" placeholder="(यदि कोई व्यवसाय नहीं हो तो शून्य लिखें)" name="father_occupation" checked={formData.father_occupation} onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>माता का व्यवसाय:</label>
            <input type="text" placeholder="(यदि कोई व्यवसाय नहीं हो तो शून्य लिखें)" name="mother_occupation" checked={formData.mother_occupation} onChange={handleChange}required />
          </div>
 
          {/* New form sections */}
          <div className="form-section">
            <label>माता की आयु विवाह के समय (पूर्ण वर्ष में):</label>
            <input type="text" placeholder="(यदि विवाह एक से अधिक बार हुआ हो तो प्रथम विवाह की आयु लिखें)" name="mother_age_at_marriage" checked={formData.mother_age_at_marriage} onChange={handleChange}required />
          </div>
 
          <div className="form-section">
            <label>माता की इस संतान को मिलाकर जीवित संतानों की संख्या लिखें:</label>
            <input type="text" placeholder="(पूर्व के विवाह से संतान की संख्या यदि हो जोड़ी जायेगी)" name='live_children_count' checked={formData.live_children_count} onChange={handleChange}required />
          </div>
 
          <div className="form-section">
            <label>प्रसव प्रक्रिया:(सही ✔ का निशान लगाएं)</label>
            <label>
              <input type="checkbox" name="delivery_method.natural" checked={formData.delivery_method === "natural"} onChange={handleChange} /> स्वाभाविक
            </label>
            <label>
              <input type="checkbox" name="delivery_method.cesarean" checked={formData.delivery_method === "cesarean"} onChange={handleChange} /> सिजेरियन
            </label>
            <label>
              <input type="checkbox" name="delivery_method.instrumental" checked={formData.delivery_method === "instrumental"} onChange={handleChange} /> उपकरण द्वारा (फोर्सेप/वैक्यूम)
            </label>
          </div>
 
          <div className="form-section">
            <label>गर्भधारण का समय (हफ्तों में):</label>
            <input type="text" placeholder="गर्भधारण का समय (हफ्तों में)" name='pregnancy_weeks' checked={formData.pregnancy_weeks} onChange={handleChange}required />
          </div>
 
          <div className="form-section">
            <label>इस संतान के जन्म के समय (पूर्ण वर्ष में) माता की आयु:</label>
            <input type="text" placeholder='इस संतान के जन्म के समय (पूर्ण वर्ष में) माता की आयु' name='mother_age_at_birth' checked={formData.mother_age_at_birth} onChange={handleChange} required/>
          </div>
 
          <div className="form-section">
            <label>प्रसव किस प्रकार से सम्पन्न हुआ:(सही ✔ का निशान लगाएं )</label>
            <div className="checkbox-group" style={{display:'grid'}}>
              <label>
                <input type="checkbox" name="delivery_by.institutional_govt" checked={formData.delivery_by === "institutional_govt" } onChange={handleChange}required /> संस्थागत - सरकारी
              </label>
              <label>
                <input type="checkbox" name="delivery_by.institutional_private" checked={formData.delivery_by === "institutional_private"} onChange={handleChange} required/> संस्थागत - निजी या गैर सरकारी
              </label>
              <label>
                <input type="checkbox" name="delivery_by.doctor_nurse" checked={formData.delivery_by === "doctor_nurse"} onChange={handleChange} required/> डॉक्टर/नर्स या प्रशिक्षित मिडवाइफ द्वारा
              </label>
              <label>
                <input type="checkbox" name="delivery_by.traditional_midwife" checked={formData.delivery_by === "traditional_midwife"} onChange={handleChange} required/> परम्परागत प्रसव परिचारिका द्वारा
              </label>
              <label>
                <input type="checkbox" name="delivery_by.relative_other" checked={formData.delivery_by === "relative_other"} onChange={handleChange} required/> रिश्तेदार या अन्य
              </label>
            </div>
          </div>
 
          <div className="form-section">
            <label>जन्म के समय वजन (किलो ग्राम) (यदि ज्ञात हो):</label>
            <input type="text" placeholder='जन्म के समय वजन (किलो ग्राम) (यदि ज्ञात हो)' name='birth_weight' checked={formData.birth_weight} onChange={handleChange} required/>
            <label>दस्तावेज़ अपलोड करें:</label>
            <input type="file" name='file_path' onChange={ImageForm} />
            <input type='text' style={{visibility:"hidden"}}></input>
         </div>
          <button type="submit" style={{ width: '10rem' }} className="form-control mt-2 btn btn-success my-2 col-4" >Submit</button>
          <button type="submit" style={{ width: '10rem' ,backgroundColor:"#e3e4e6" }} className="form-control mt-2  my-2 col-4" >Clear</button>
        </form>
      </div>
    </>
  )
}
export default page;

