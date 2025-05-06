 "use client";
import { useState } from "react";
// import React, { Suspense, useContext, useEffect, useState,useRef } from 'react'
// import MainNav from '@/Components/LandingPageComp/MainNav'
 import "./death.css"
// import { Customer } from '@/app/AdminContext/CustomerManagement'
// import { HASHKEY, ENV } from "@/app/paths";
 const page = () => {
// //     const statecalls = useContext(Customer);
//      const { Deathform,GetHashKeyForDeathForm,CertificatePayment } = statecalls;
    const [formData, setFormData] = useState({
         date_of_death: '',
        uid_number:'',
        fullname :'',
        gender:'',
        mother_name:'' ,
        father_name:'' ,
        mother_uid_number:'',
        father_uid_number:'',
        husbund_or_spouse_name:'',
        husbund_or_spouse_uid_number:'',
        permanent_address:'' ,
        age_description:'' ,
        death_place:'' ,
        death_place_details:'' ,
        informant_name:'' ,
        informant_address:'' ,
        informant_mobile:'',
        informant_email:'' ,
        date_or_signature:'' ,
        signature_or_thumb_photo:'' , 
        residence_area_name:'' ,
        residence_area_type: '',
        district_name:'' ,
        state_name:'' ,
        religion:'',
        other_religion:'' ,
        occupation:'' ,
        medical_treatment_type: '',
          medically_verified:'',
          female_death_due_to_pregnancy: '',
        tobacco_usage_years:'' ,
        alcohol_usage_years:'' ,
        disease_or_actual_cause_of_death:'' ,
        smoking_usage_years:'' ,
        betel_nut_usage_years: '',
        additional_remarks: '',
      });
      const [Haskey, SetHaskey] = useState();
      const [documents, SetDocument] = useState([]);

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const emailCharacters = /^[a-zA-Z0-9@._-]*$/;
        const safePhoneNumber = /^[0-9]*$/;
        const safeAadhar = /^[0-9]*$/;
        const safeCharacters = /^[a-zA-Z._-]*$/; 
    
         if (!emailCharacters.test(value) && name==="informant_email" ) {
          alert("Only safe characters are allowed .");
          return;
        }
        else if (!safePhoneNumber.test(value) && name === "informant_mobile") {
          alert("Only Numbers are allowed .");
          return;
        }
        else if (!safeAadhar.test(value) &&( name==="husbund_or_spouse_uid_number"||name==="mother_uid_number"||name==="father_uid_number"||name==="uid_number")) {
          alert("Only Numbers are allowed .");
          return;
        }
        else if (
          !safeCharacters.test(value) && 
          (
           
            name==="fullname" ||
            name==="gender" ||
            name==="mother_name"||
            name==="father_name" ||
            name==="husbund_or_spouse_name" ||
            name==="permanent_address"||
            name==="age_description"||
            name==="informant_address" ||
            name==="informant_name" ||
            name === "district_name" ||
            name==='residence_area_name' ||
            name==='state_name' ||
            name==='disease_or_actual_cause_of_death' ||
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
              uploadform.append("Uploadedfile", file); // Array of application documents
            } else {
              uploadform.append("signature_or_thumb_photo", file); // Array of live photos
            }
          }
        });
        for (const [key, value] of uploadform.entries()) {
          console.log(`${key}:`, value);
        }
        let data = await Deathform(uploadform);
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
      let haskey = await GetHashKeyForDeathForm(obj);
      console.log(haskey);
      if(haskey?.message==="No Charges for Death Certificate"){
        alert("No Charges for Death Certificate")
        handleSubmit(x)
        return
      }
      if(haskey?.message==='already exist'){
        alert("You have already applied for Death Certificate")
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
        
    <div className='bg-slate-300'>
    <button className='btn btn-primary m-2' onClick={() => window.history.back()}>Back</button>
      <h4 className='text-center text-3xl font-bold py-3'>मृत्यु प्रमाण पत्र फॉर्म</h4>
      <form className="death-form" style={{ display: 'flex', width: '80%', flexWrap: "wrap", padding: '2%', backgroundColor: 'white', marginTop: '14px' , margin:"auto" }} onSubmit={handleSubmit}>
      <h5 style={{ fontWeight: 'bold'}}>कृपया फॉर्म भरें।</h5>
      <div  className="form-group"></div>
        <div className="form-group">
          <label>मृत्यु की तिथि:</label>
          <input type="date" placeholder='मृत्यु की तिथि' name="date_of_death" value={formData.date_of_death || ""} onChange={handleChange} />
        </div>
 
        <div className="form-group">
          <label>मृतक का UID No./ आधार न. (यदि कोई हो)</label>
          <input type="text" placeholder='मृतक का UID No./ आधार न' name="uid_number"maxLength={12} value={formData.uid_number || ""} onChange={handleChange}/>
        </div>
 
        <div className="form-group">
          <label>मृतक का नाम:</label>
          {/* <input type="text" placeholder="(हिंदी में)" /> */}
          <input type="text" placeholder='मृतक का नाम' name="fullname" value={formData.fullname || ""} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>मृतक का लिंग(महिला/पुरुष/ट्रांसजेंडर अंकित करें, संक्षिप्त में नहीं):</label>
          {/* <input type="text" placeholder="(हिंदी में)" /> */}
          <input type="text" placeholder='लिंग' name="gender" value={formData.gender || ""} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>माता का नाम (हिंदी में)</label>
          <input type="text" placeholder='माता का नाम' name="mother_name" value={formData.mother_name || ""} onChange={handleChange} />
        </div>
 
        <div className="form-group">
          <label>पिता का नाम (हिंदी में)</label>
          <input type="text" placeholder='पिता का नाम' name="father_name" value={formData.father_name || ""} onChange={handleChange} />
        </div>
 
        <div className="form-group">
          <label>माता का UID No./ आधार न. (यदि कोई हो)</label>
          <input type="text" placeholder='माता का UID No./ आधार न.' name="mother_uid_number"maxLength={12} value={formData.mother_uid_number || ""} onChange={handleChange}/>
        </div>
 
        <div className="form-group">
          <label>पिता का UID No./ आधार न. (यदि कोई हो)</label>
          <input type="text" placeholder='पिता का UID No./ आधार न.' name="father_uid_number"maxLength={12} value={formData.father_uid_number || ""} onChange={handleChange}/>
        </div>
 
        <div className="form-group">
          <label>पति/पत्नी का नाम: (हिंदी में)</label>
          <input type="text" placeholder="पति/पत्नी का नाम" name="husbund_or_spouse_name" value={formData.husbund_or_spouse_name || ""} onChange={handleChange}/>
        </div>
 
        <div className="form-group">
          <label>पति/पत्नी का UID No./ आधार न. (यदि कोई हो)</label>
          <input type="text" placeholder='पति/पत्नी का UID No./ आधार न.' name="husbund_or_spouse_uid_number" maxLength={12} value={formData.husbund_or_spouse_uid_number || ""} onChange={handleChange}/>
        </div>
 
        <div className="form-group">
          <label>मृतक का स्थायी पता:</label>
          <input type="text" placeholder="मृतक का स्थायी पता:" name="permanent_address" value={formData.permanent_address || ""} onChange={handleChange} />
        </div>
 
        <div className="form-group">
          <label>मृतक की आयु: (यदि मृतक की आयु 1 वर्ष से अधिक है, तो आयु पूर्ण वर्षों में दें; यदि मृतक की आयु 1 वर्ष से कम है, तो पूर्ण महीनों में दें; और यदि आयु 1 माह से कम है, तो पूर्ण दिनों में दें; तथा यदि आयु 1 दिन से कम है, तो पूर्ण घंटों में दें।)</label>
          <input type="text" name="age_description" value={formData.age_description || ""} onChange={handleChange}  />
        </div>
 
        <div className="form-group">
                        <label>मृत्यु का स्थान:(1,2 अथवा 3 पर सही ✔ का निशान लगाएं तथा अस्पताल/स्थान का
                            नाम/पता एवं जहां मृत्यु हुई हो उस घर का पता ।)</label>
                        <div>
                            <label>
                                <input type="checkbox" name="death_place.hospital" checked={formData.death_place === 'hospital'} onChange={handleChange} /> अस्पताल/स्थल
                            </label>
                            <label>
                                <input type="checkbox" name="death_place.home" checked={formData.death_place === 'home'} onChange={handleChange} /> घर
                            </label>
                            <label>
                                <input type="checkbox" name="death_place.other" checked={formData.death_place === 'other'} onChange={handleChange} /> अन्य स्थान
                            </label>
                        </div>
                    </div>
 
        <div className="form-group">
          <label>नाम:</label>
          <input type="text" placeholder="नाम" name="informant_name" value={formData.informant_name} onChange={handleChange}  />
        </div>
 
        <div className="form-group">
          <label>पता:</label>
          <input type="text" placeholder='पता' name="informant_address" value={formData.informant_address || ""} onChange={handleChange}/>
        </div>
 
        <div className="form-group">
          <label>मोबाइल न.:</label>
          <input type="text" placeholder='मोबाइल न.' name="informant_mobile" maxLength={10} value={formData.informant_mobile || ""} onChange={handleChange}/>
        </div>
 
        <div className="form-group">
          <label>ईमेल आई.डी.:</label>
          <input type="text" placeholder='ईमेल आई.डी.'  name="informant_email" value={formData.informant_email || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>दिनांक या हस्ताक्षर:</label>
          <input type="text" name='date_or_signature' value={formData.date_or_signature || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
           <label>हस्ताक्षर या अंगूठे का फोटो :</label>
           <input type="file" name='signature_or_thumb_photo'  onChange={ImageForm}/>
        </div>
        <div className="form-instructions">
       * ग्राम या शहर का नाम जहाँ माता का निवास हो (मृतक यहाँ सामान्यतः रहता हो) क्योंकि मृत्यु की जगह भिन्न हो सकती है यहाँ का पता की प्रविष्टि आवश्यक नहीं *
      </div>
        <div className="form-group">
          <label>शहर/ग्राम का नाम:</label>
          <input type="text" placeholder='शहर/ग्राम का नाम' name='residence_area_name' value={formData.residence_area_name || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label>क्या शहर है अथवा ग्राम है: (सही ✔ का निशान लगाएं)</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="residence_area_type.city" checked={formData.residence_area_type === "city"} onChange={handleChange} /> शहर
               
              </label>
              <label>
                <input type="checkbox" name="residence_area_type.village" checked={formData.residence_area_type === "village"} onChange={handleChange} /> ग्राम
              </label>
            </div>
          </div>
        <div className="form-group">
          <label>जिले का नाम:</label>
          <input type="text" placeholder='जिले का नाम' name='district_name' value={formData.district_name || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>राज्य का नाम:</label>
          <input type="text" placeholder='राज्य का नाम' name='state_name' value={formData.state_name || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>धर्म (सही ✔ का निशान लगाएं)</label>
          <div className="checkbox-group">
              <label>
                <input type="checkbox" name="religion.hindu" checked={formData.religion==="hindu"} onChange={handleChange} /> हिन्दू
              </label>
              <label>
                <input type="checkbox" name="religion.muslim" checked={formData.religion==="muslim"} onChange={handleChange} /> मुस्लिम
              </label>
              <label>
                <input type="checkbox" name="religion.christian" checked={formData.religion==="christian"} onChange={handleChange} /> ईसाई
              </label>
              <label>
                <input type="checkbox" name="religion.other" checked={formData.religion==="other"} onChange={handleChange} /> अन्य
              </label>
            </div>
          <input type="text" placeholder="अन्य धर्म : (धर्म का नाम लिखें)"  name='other_religion' value={formData.other_religion || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>मृतक का व्यवसाय:</label>
          <small>यदि कोई व्यवसाय नहीं हो तो 'शून्य' लिखे</small>
          <input type="text" placeholder='मृतक का व्यवसाय' name='occupation' value={formData.occupation  || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>मृत्यु से पूर्व चिकित्सा का प्रकार: (सही ✔ का निशान लगाएं)</label>
          <div className="checkbox-group">
              <label>
                <input type="checkbox" name="medical_treatment_type.institutional" checked={formData.medical_treatment_type==="institutional"} onChange={handleChange} /> संस्थागत
              </label>
              <label>
                <input type="checkbox" name="medical_treatment_type.non_institutional" checked={formData.medical_treatment_type==="non_institutional"} onChange={handleChange} /> गैर संस्थागत
              </label>
              <label>
                <input type="checkbox" name="medical_treatment_type.no_treatment" checked={formData.medical_treatment_type==="no_treatment"} onChange={handleChange} /> उपचार नहीं
              </label>
            </div>
        </div>
        <div className="form-group">
            <label>क्या मृत्यु का चिकित्सा प्रमाणन किया गया है:</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="medically_verified.yes" checked={formData.medically_verified==="yes"} onChange={handleChange} /> हां
              </label>
              <label>
                <input type="checkbox" name="medically_verified.no" checked={formData.medically_verified==="no"} onChange={handleChange} /> नहीं
              </label>
            </div>
          </div>
 
          <div className="form-group">
            <label>क्या महिला की मृत्यु गर्भावस्था अथवा गर्भावस्था के 6 सप्ताह के भीतर हुई:</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="female_death_due_to_pregnancy.yes" checked={formData.female_death_due_to_pregnancy==="yes"} onChange={handleChange} /> हां
              </label>
              <label>
                <input type="checkbox" name="female_death_due_to_pregnancy.no" checked={formData.female_death_due_to_pregnancy==="no"} onChange={handleChange} /> नहीं
              </label>
            </div>
          </div>
        <div className="form-group">
          <label>यदि किसी भी रूप में तम्बाकू चबाने का आदि था तो कितने वर्षों से</label>
          <input type="text" name='tobacco_usage_years' value={formData.tobacco_usage_years || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>यदि एल्कोहोल पीने का आदि था तो कितने वर्षों से</label>
          <input type="text" name='alcohol_usage_years' value={formData.alcohol_usage_years || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>बीमारी का नाम या मृत्यु वास्तविक कारण</label>
          <input type="text"  name='disease_or_actual_cause_of_death' value={formData.disease_or_actual_cause_of_death || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>यदि धूम्रपान का आदि था तो कितने वर्षों से</label>
          <input type="text"  name='smoking_usage_years' value={formData.smoking_usage_years || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>यदि सुपारी (पान मसाला को सम्मिलित करते हुए) चबाने का आदि था तो कितने वर्षों से</label>
          <input type="text" name='betel_nut_usage_years' value={formData.betel_nut_usage_years || ""} onChange={handleChange}/>
        </div>
        <div className="form-group">
         <label>दस्तावेज़ अपलोड करें:</label>
            <input type="file" name='Uploadedfile' onChange={ImageForm} />
        </div>
     
          <button type="submit" style={{ width: '10rem' }} className="form-control mt-2 btn btn-success my-2 col-12" >Submit</button>
          <button type="submit" style={{ width: '10rem' ,backgroundColor:"#e3e4e6" }} className="form-control mt-2  my-2 col-4" >Clear</button>
 
      </form>
    </div>
        </>
  )
}

export default page