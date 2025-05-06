"use client";
import React, { Suspense, useContext, useEffect, useState, useRef } from "react";
import { Admin } from "@/app/AdminContext/AdminManageMent";
import { useRouter } from "next/navigation";
const CreateCommercial = () => {
  const [activeTab, setActiveTab] = useState("residential"); // State for switching tabs
  const { hey, GetDocumentForm, CreateCustomer, LocalityRate } = useContext(Admin);
  const router = useRouter();

  const [formData, setFormData] = useState({
    // propertyID: '',
    FullName: '',
    FatherorGaurdianName: '',
    ContactNumber: '',
    AadharNumber: '',
    PanNumber: '',
    Plot_No: '',
    TotalArea: '',
    Area_Use: '',
    TotalARV: '',
    Talo_ki_Sankhya: '',
    PropertyType: '1',
    PropertyAge: "0",
    location: '',
    Address: '',
    Meter: '',
    locality: '',
    localityrate: '',
    ConstructionType: '',
    WaterTaxConnection: '',
    ElectricityConnection: '',
    SewerConnection: '',
  });

  const uploadform = new FormData()

  useEffect(() => {
    if (Number(formData.PropertyAge) < 0) {
      // alert("Property Age can't be less than 0");
      setFormData({ ...formData, PropertyAge: "0" })
    }

    if (Number(formData.Talo_ki_Sankhya) < 0) {
      // alert("Floor Number can't be less than 0");
      setFormData({ ...formData, Talo_ki_Sankhya: "0" })
    }

  }, [formData.PropertyAge, formData.Talo_ki_Sankhya]);

  const [DocumentForm, SetDocumentForm] = useState([]);
  const [TypeofProperty, SetTypeofProperty] = useState([]);
  const [documentinformation, Setdocumentinformation] = useState([]);
  const [Locality, SetLocality] = useState([]);
  const [Meter, SetMeter] = useState([]);
  const [localityrate, SetLocalityRate] = useState("No Locality Selected");
  const formref = useRef(null)
  const [Verification, setVerification] = useState(false);

  let token;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("AuthUser");
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "semi-commercial") {
      router.push("./CreateCustomer/SemiCommercial"); // Navigate to commercial page
    }
  };

  useEffect(() => {
    GetForm();
    return () => { };
  }, []);


  async function getlocation() {
    if (typeof navigator != undefined) {
      navigator.geolocation.getCurrentPosition((x) => {
        let lat = x.coords.latitude
        let long = x.coords.longitude
        let val = lat + '/' + long
        setFormData({
          ...formData,
          ['location']: val,
        });
      })
    } else {
      alert('not available')
    }
  }
  async function GetForm() {
    let data = await GetDocumentForm();
    console.log("Data i Get :: ", data)
    SetDocumentForm(data.form);
    SetTypeofProperty(data.toproperty)
    SetLocality(data.locality)
    SetMeter(data.Meter)
  }
  const uniqueWards = Array.from(new Set(Locality.map(e => e.Ward)));
  const uniqueMeter = Array.from(new Set(Locality.map(e => e.Meter)));

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleChange = (e) => {
    const { value, name } = e.currentTarget;

    const safePhoneNumber = /^[0-9]*$/;
    const safeName = /^[a-zA-Z/\s]*$/;
    const safeAadhar = /^[0-9]*$/;;
    const safepancard = /^[a-zA-Z0-9]*$/;
    const safeAddress = /^[a-zA-Z0-9/\s]*$/;

    if (!safeAadhar.test(value) && name === 'AadharNumber') {
      alert("Only Numbers are allowed.");
      return;
    }
    else if ((!safePhoneNumber.test(value)) && (name === 'ContactNumber' || name === 'Plot_No' || name === 'TotalArea' || name === 'Area_Use')) {
      alert("Only Numbers are allowed.");
      return;
    }
    else if ((!safeName.test(value)) && (name === 'FullName' || name === 'FatherorGaurdianName')) {
      alert("Only safe characters are allowed .");
      return;
    }
    else if (!safeAddress.test(value) && name === 'Address') {
      alert("Only safe characters are allowed.");
      return;
    }
    else if ((!safepancard.test(value)) && (name == 'PanNumber')) {
      alert("Only numbers and safe charachers allowed");
      return;
    } if (name === 'ownerType' && value.trim() === '') {
      alert("Owner Type cannot be empty.");
      return;
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'ContactNumber') {
      const contactRegex = /^[6-9]\d{9}$/;
      if (value && !contactRegex.test(value)) {
        alert("Invalid Indian Contact Number. It must start with 6-9 and be 10 digits long.");
      }
    }

    if (name === 'AadharNumber') {
      const aadharRegex = /^\d{12}$/;
      if (value && !aadharRegex.test(value)) {
        alert("Invalid Aadhar Number. It must be exactly 12 digits.");
      }
    }

    if (name === 'PanNumber') {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
      if (value && !panRegex.test(value.toUpperCase())) {
        alert("Invalid PAN Number. Format: 5 letters, 4 digits, 1 letter.");
      }
    }
  };


  const ImageForm = (e) => {
    let name = e.currentTarget.files[0].name;
    let value = e.currentTarget.name;

    // added new 
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const file = e.currentTarget.files[0];
    if (!allowedTypes.includes(file.type)) {
      alert("Incorrect document type. Please upload a valid image (JPEG, PNG, JPG only).");
      e.target.value = ""; // clear file input
      return;
    }


    Setdocumentinformation([...documentinformation, { [name]: value }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      console.log("Form Data :: ", formData);

      Object.keys(formData).map((x) => {
        uploadform.append(x, formData[x])
      })
      uploadform.append('documentinformation', JSON.stringify(documentinformation));

      if (documentinformation.length === 0 || documentinformation.length < 2) {
        alert("Please upload images before submitting !!!");
        return;
      };

      documentinformation.map((item, index) => {
        const [key, value] = Object.entries(item)[0];
        uploadform.append('CustomerDocs', document.getElementById(value).files[0])
      })
      if (!Verification) {
        alert("Please check the Verification Certificate box to proceed !!!")
      } else {
        // let data = await CreateCustomer(uploadform)
        // console.log("backend response :: ", data);

        // if (data) {
        //   alert(data.message)
        //   window.location.reload()
        // }
      }
    } catch (error) {
      console.log(error);
    }

  };

  const handleReset = () => {
    setFormData({
      // propertyID: '',
      FullName: '',
      FatherorGaurdianName: '',
      ContactNumber: '',
      AadharNumber: '',
      PanNumber: '',
      Plot_No: '',
      TotalArea: '',
      Area_Use: '',
      TotalARV: '',
      Talo_ki_Sankhya: '',
      PropertyType: '1',
      PropertyAge: '',
      location: '11111.222',
      Address: '',
      Meter: '',
      locality: '',
      localityrate: '',
      ConstructionType: '',
      WaterTaxConnection: '',
      ElectricityConnection: '',
      SewerConnection: '',
    });
    window.location.reload();
  };

  //For area of use
  useEffect(() => {
    if (formData.TotalArea) {
      const areaUse = Number(formData.TotalArea) * 0.8;
      setFormData((prev) => ({ ...prev, Area_Use: areaUse })); // Update state
    }
  }, [formData.TotalArea]);

  //For total ARV
  useEffect(() => {
    let totalARV = 0
    if (localityrate && formData.TotalArea) {
      totalARV = Number(localityrate) * Number(formData.Area_Use) * 12;
    }

    setFormData((prev) => ({ ...prev, TotalARV: totalARV })); // Update state

  }, [localityrate, formData.TotalArea, formData.PropertyType, formData.Area_Use]);;

  // Runs whenever localityrate changes
  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      localityrate: localityrate // Update localityrate inside formData
    }));
  }, [localityrate]);

  useEffect(() => {
    if (formData.locality && formData.Meter && formData.ConstructionType) {
      calculateARV();
    }
  }, [formData.locality, formData.Meter, formData.ConstructionType]);

  async function calculateARV() {
    console.log("Locality:", formData.locality);
    console.log("ConstructionType:", formData.ConstructionType);
    console.log("Meter:", formData.Meter);

    if (!formData.locality || !formData.Meter || !formData.ConstructionType) {
      console.log("Missing required values!");
      return;
    }

    let data = await LocalityRate(formData.locality, formData.Meter, formData.ConstructionType);
    console.log(data);

    const Rate = data[0]?.Rate;
    SetLocalityRate(Rate);
  }
  function handleCheckboxChange(detail1) {
    setVerification(true);
  }
  const [isChecked, setIsChecked] = useState(false);
  const [formData1, setFormData1] = useState({
    name: "",
    ward: "",
    locality: "",
    buildingNumber: "",
    buildingUID: ""
  });

  const handleChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const handleSubmit1 = () => {
    alert("Declaration submitted successfully!");
  };


  console.log("Unique Wards :: ", uniqueWards);

  return (
    <>

      <div style={{ display: "grid", width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f4f7', padding: '20px' }}>
        <h4>Customer Management : Create Customer</h4>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center", alignItems: "center", color: 'blue' }}>
          <button style={{ color: activeTab === "residential" ? "blue" : "black", border: '1px solid blue' }} className={`tab ${activeTab === "residential" ? "active" : ""}`} onClick={() => handleTabChange("residential")}>
            Residential Form B
          </button>
          <button style={{ color: activeTab === "semi-commercial" ? "blue" : "black", border: '1px solid blue' }} className={`tab ${activeTab === "semi-commercial" ? "active" : ""}`} onClick={() => handleTabChange("semi-commercial")}>
            Commercial Form D
          </button>
        </div>

        {/* Form */}{
          (activeTab === "residential" || activeTab === "semi-commercial") &&
          <div >
            <h5>Residential Form B</h5>
            <form ref={formref} onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: 'white', marginTop: '10px' }} autoComplete="off">

              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Full Name</label><br />
                <input autoComplete="off" type="text" name="FullName" value={formData.FullName} placeholder="Full Name" onChange={handleChange} className='form-control mt-2' required />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Father/Gaurdian Name</label><br />
                <input autoComplete="off" type="text" name="FatherorGaurdianName" value={formData.FatherorGaurdianName} placeholder="Father/Gaurdian Name" onChange={handleChange} className='form-control mt-2' required />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Contact Number</label><br />
                <input autoComplete="off" type="text" name="ContactNumber" value={formData.ContactNumber} placeholder="Contact Number" onChange={handleChange} onBlur={handleBlur} className='form-control mt-2' required />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Aadhar Number</label><br />
                <input autoComplete="off" type="text" name="AadharNumber" value={formData.AadharNumber} placeholder="Aadhar Number" onChange={handleChange} onBlur={handleBlur} className='form-control mt-2' required />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Pan Number</label><br />
                <input autoComplete="off" type="text" name="PanNumber" value={formData.PanNumber} placeholder="Pan Number" onChange={handleChange} onBlur={handleBlur} className='form-control mt-2' style={{ textTransform: 'uppercase' }} required />
              </div>

              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Plot No</label><br />
                <input autoComplete="off" type="text" name="Plot_No" value={formData.Plot_No} placeholder="Plot No" onChange={handleChange} className='form-control mt-2' required />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Total Area</label><br />
                <input autoComplete="off" type="text" name="TotalArea" value={formData.TotalArea} placeholder="Total Area" onChange={handleChange} className='form-control mt-2' required />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Area Use</label><br />
                <input autoComplete="off" type="text" name="Area_Use" value={formData.Area_Use} placeholder="Area Use" onChange={handleChange} className='form-control mt-2' required disabled />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }} className='form-label'>Water Tax Connection</label>
                <select className="form-select mb-3" name="WaterTaxConnection" onChange={handleChange} required>
                  <option disabled selected>Select</option>
                  <option className="form-control"  >Yes</option>
                  <option className="form-control"  >No</option>
                </select>
              </div>

              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }} className='form-label'>Electricity Connection</label>
                <select className="form-select mb-3" name="ElectricityConnection" onChange={handleChange} required>
                  <option disabled selected>Select</option>
                  <option className="form-control"  >Yes</option>
                  <option className="form-control"  >No</option>
                </select>
              </div>

              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }} className='form-label'>Sewer Connection</label>
                <select className="form-select mb-3" name="SewerConnection" onChange={handleChange} required>
                  <option disabled selected>Select</option>
                  <option className="form-control"  >Yes</option>
                  <option className="form-control"  >No</option>
                </select>
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Property Type</label><br />
                {/* <select className="form-control mt-2" name="PropertyType" onChange={(e) => { handleChange(e) }} required>
                  <option>Select option</option>
                  <option className="form-control mt-2" value={1} id={1}>Residential</option>
                </select> */}

                <input type="text" value={"Residential"} className="form-control py-2" disabled />

              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Meter (in m<sup>3</sup>)</label><br />
                <select className="form-control mt-2" name="Meter" value={formData.Meter} onChange={(e) => { handleChange(e) }} required>
                  <option>Select option</option>
                  {uniqueMeter && uniqueMeter.map((e) => (
                    <option className="form-control mt-2" value={e} >{e}</option>
                  ))}
                </select>
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Locality</label><br />
                <select className="form-control mt-2" name="locality" onChange={(e) => { handleChange(e) }} required>
                  <option>Select option</option>
                  {uniqueWards &&
                    uniqueWards.map((e, i) => (
                      <option className="form-control" key={i} value={e} style={{ textTransform: "capitalize" }}>{e}</option>

                    ))}
                </select>
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Construction Type</label><br />
                <select className="form-select mt-2" name="ConstructionType" value={formData.ConstructionType} onChange={(e) => { handleChange(e) }} required>
                  <option>Select Construction Type</option>
                  <option className="form-control mt-2" value="RccRate" >RCC Rate</option>
                  <option className="form-control mt-2" value="OtherPakkaRate" >Other Pakka Rate</option>
                  <option className="form-control mt-2" value="KacchaRate" >Kaccha Rate</option>
                </select>
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Locality Rate for selected options</label><br />
                <input autoComplete="off" type="text" name="localityrate" value={formData.localityrate} disabled className='form-control mt-2' onChange={handleChange} />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Total ARV</label><br />
                <input type="text" name="TotalARV" value={formData.TotalARV} placeholder="Total ARV" onChange={handleChange} className='form-control mt-2' required disabled />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Floor Number</label><br />
                <input autoComplete="off" type="number" name="Talo_ki_Sankhya" value={formData.Talo_ki_Sankhya} placeholder="Enter Floor Number" onChange={handleChange} className='form-control mt-2' required />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Property Age</label><br />
                <input autoComplete="off" type="number" name="PropertyAge" value={formData.PropertyAge} placeholder="Property Age" onChange={handleChange} className='form-control mt-2' required />
              </div>
              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Address</label><br />
                <textarea name="Address" value={formData.Address} placeholder="Address" onChange={handleChange} className='form-control mt-2' required />
              </div>

              <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                <label style={{ fontWeight: 'bold' }}>Location</label><br />
                <div className="mt-2" style={{ display: 'flex', height: '40px', fontSize: '20px' }}>
                  <button style={{ fontSize: '13px', width: '10rem' }} className="btn btn-primary" onClick={() => { getlocation() }}>Get Location</button>
                  <input autoComplete="off" className="form-control " type="text" name="location" value={formData.location} required />
                </div>
              </div>


              {/* new fields */}


              <Suspense>
                {DocumentForm &&
                  DocumentForm.map((e) => (
                    <div key={e.id} className="mx-2" style={{ width: '45%', padding: '8px' }}>
                      <label style={{ fontWeight: 'bold' }}>{e.DocumentName}</label><br />
                      <input autoComplete="off" className="form-control mt-2"
                        accept="image/png, image/jpeg, image/jpg"
                        type="file"
                        name={e.Doc_id}
                        id={e.Doc_id}
                        onChange={ImageForm}
                      />
                    </div>

                  ))}
              </Suspense>
              <>
                <div>
                  <h4 style={{ textAlign: "center", margin: "10px", textTransform: "capitalize" }}>Verification certificate</h4>
                  <div className="col-11 mt-3 " style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      className="mr-4"
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                    I {formData.FullName || "......"}, Owner/Occupant of Plot No. {formData.Plot_No || "...... "}, situated in {formData.locality || "......"} Mohalla, hereby declare that the details given in this form are true and complete to the best of my knowledge and belief. No particulars given herein have been concealed nor are falsely stated.
                  </div>
                </div>
              </>
              <div className="col-11 mt-3" style={{ display: 'grid', justifyContent: "center", alignItems: 'center' }}>
                <button type="submit" style={{ width: '20rem' }} className="form-control mt-2 btn btn-success my-2 col-12" >Submit</button>
                <button onClick={() => handleReset()} className="form-control mt-2 btn btn-danger my-2" >Cancel</button>
              </div>
            </form>
          </div>
        }
        {hey}

      </div>
      {/* <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-4">
     
    </div> */}
    </>
  );
};

export default CreateCommercial;
