"use client";
import React, { Suspense, useContext, useEffect, useState, useRef } from "react";
import { Admin } from "@/app/AdminContext/AdminManageMent";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {

  const { GetDocumentForm, FindCustomer, UpdateCustomer, LocalityRate, PropertyRate } = useContext(Admin);
  const BillNumber = params.id
  const navigate = useRouter()
  const [formData, setFormData] = useState({
    propertyID: BillNumber,
    PMCNumber: '',
    FullName: '',
    FatherorGaurdianName: '',
    ContactNumber: '',
    AadharNumber: '',
    PanNumber: '',
    Plot_No: '',
    TotalArea: '',
    Area_Use: '',
    WaterTaxConnection: '',
    TotalARV: '',
    Talo_ki_Sankhya: '',
    PropertyType: '',
    PropertyAge: '',
    location: '',
    Address: '',
    Meter: '',
    locality: '',
    localityrate: '',
    ConstructionType: '',
    ElectricityConnection: '',
    WaterTaxConnection: '',
    SewerConnection: "",
  });
  const uploadform = new FormData()
  const [DocumentForm, SetDocumentForm] = useState([]);
  const [TypeofProperty, SetTypeofProperty] = useState([]);
  const [documentinformation, Setdocumentinformation] = useState([]);
  const [Locality, SetLocality] = useState([]);
  const [Meter, SetMeter] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [repeatedData, setRepeatedData] = useState([]);
  const [annualtax, setAnnualTax] = useState('');
  const [propertyAge, setPropertyAge] = useState('');
  const [Arv, setARV] = useState('');
  const [localityrate, SetLocalityRate] = useState([]);
  const [totalARV, setTotalARV] = useState(0);
  const [propertyforuserate, SetPropertyforuseRate] = useState([]);
  const [previousSqft, setPreviousSqft] = useState(0);
  const [remainingArea, setRemainingArea] = useState(0);
  const formref = useRef(null)

  let token;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("AuthUser");
  }

  useEffect(() => {
    GetForm();
    getcustomer(BillNumber)
    return () => { };
  }, []);

  const getcustomer = async (id) => {
    const data = await FindCustomer(id);
    // setRenderData(data.customer);
    // setDocs(data.docs);
    console.log(data);
    setFormData(data.customer[0], data.area[0]);

  }
  async function getlocation(e) {
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
    SetDocumentForm(data.form);
    SetTypeofProperty(data.toproperty)
    SetLocality(data.locality)
    SetMeter(data.meter)
  }
  const uniqueMeter = Array.from(new Set(Locality.map(e => e.Meter)));
  const handleChange = (e) => {
    const { value, name } = e.currentTarget;

    const safePhoneNumber = /^[0-9]*$/;
    const safeName = /^[a-zA-Z/\s]*$/;
    const safeAadhar = /^[0-9]*$/;;
    const safepancard = /^[a-zA-Z0-9]*$/;
    const safeAddress = /^[a-zA-Z0-9/\s]*$/;

    if ((!safeAadhar.test(value)) && (name === 'AadharNumber' || name === 'PropertyAge')) {
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
  const ImageForm = (e) => {
    let name = e.currentTarget.files[0].name;
    let value = e.currentTarget.name;


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

      Object.keys(formData).map((x) => {
        uploadform.append(x, formData[x])
      })
      repeatedData.forEach((entry, index) => {
        Object.keys(entry).forEach((key) => {
          uploadform.append(`repeatedData[${index}][${key}]`, entry[key]);
        });
      });
      uploadform.append('documentinformation', JSON.stringify(documentinformation))
      documentinformation.map((item, index) => {
        const [key, value] = Object.entries(item)[0];
        uploadform.append('CustomerDocs', document.getElementById(value).files[0])
      })
      let res = await UpdateCustomer(uploadform);
      console.log(res);
      alert(res);
      // window.location.reload();
      navigate.push('/Admin/Customer/CustomerUpdate/');
    } catch (error) {
      console.log(error);
    }

  };
  const handleReset = () => {
    formref.current.reset()
    setFormData([])
  };
  const uniqueZones = Array.from(new Set(Locality.map(e => e.Zone)));

  const filteredWards = Locality.filter(e => e.Zone === selectedZone);
  const uniqueWards = Array.from(new Set(Locality.map(e => e.Ward)));


  const filteredMohallas = Locality.filter(e => e.Ward === selectedWard);
  const uniquMohallas = Array.from(new Set(filteredMohallas.map(e => e.locality)));

  return (

    <div style={{ display: "grid", width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f4f7', padding: '20px' }}>
      <h4>Customer Management :Update Customer Form</h4>
      <form ref={formref} onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: 'white', marginTop: '10px' }} autoComplete="off">
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }} >Property ID</label><br />
          <input autoComplete="off" type="text" name="propertyID" value={formData.propertyID} placeholder="Property ID" onChange={handleChange} className='form-control mt-2' required disabled />
        </div>
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
          <input autoComplete="off" type="text" name="ContactNumber" value={formData.ContactNumber} placeholder="Contact Number" onChange={handleChange} className='form-control mt-2' required maxLength={10} />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Aadhar Number</label><br />
          <input autoComplete="off" type="text" name="AadharNumber" value={formData.AadharNumber} placeholder="Aadhar Number" onChange={handleChange} className='form-control mt-2' required maxLength={12} />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Pan Number</label><br />
          <input autoComplete="off" type="text" name="PanNumber" value={formData.PanNumber} placeholder="Pan Number" onChange={handleChange} className='form-control mt-2' required maxLength={10} />
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Plot No</label><br />
          <input autoComplete="off" type="text" name="Plot_No" value={formData.Plot_No} placeholder="Plot No" onChange={handleChange} className='form-control mt-2' required />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Total Area</label><br />
          <input autoComplete="off" type="text" name="TotalArea" value={formData.TotalArea} placeholder="Total Area" onChange={handleChange} className='form-control mt-2' required readOnly />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Area Use</label><br />
          <input autoComplete="off" type="text" name="Area_Use" value={formData.Area_Use} placeholder="Area Use" onChange={handleChange} className='form-control mt-2' required disabled readOnly />
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }} className='form-label'>Water Tax Connection</label>
          <input autoComplete="off" type="text" name="WaterTaxConnection" value={formData.WaterTaxConnection} placeholder="WaterConnection" onChange={handleChange} className='form-control mt-2' required readOnly />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }} className='form-label'>Electricity Connection</label>
          <input autoComplete="off" type="text" name="ElectricityConnection" value={formData.ElectricityConnection} placeholder="ElectricityConnection" onChange={handleChange} className='form-control mt-2' required readOnly />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }} className='form-label'>Sewer Connection</label>
          <input autoComplete="off" type="text" name="SewerConnection" value={formData.SewerConnection} placeholder="SewerConnection" onChange={handleChange} className='form-control mt-2' required readOnly />
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Property Type</label><br />
          <input autoComplete="off" type="text" name="PropertyType" value={formData.PropertyType === "1" ? "Residential" : "commercial"} placeholder="PropertyType" onChange={handleChange} className='form-control mt-2' required readOnly />
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Meter</label><br />
          <select className="form-control mt-2" name="Meter" value={formData.Meter} onChange={(e) => { handleChange(e) }} required readOnly>
            <option>Select option</option>
            {uniqueMeter && uniqueMeter.map((e) => (
              <option className="form-control mt-2" value={e} >{e}</option>
            ))}
          </select>
          {/* <input autoComplete="off" type="text" name="meter" placeholder="Meter" onChange={handleChange}  className='form-control' /> */}
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Locality</label><br />
          <select className="form-control mt-2" name="locality" onChange={(e) => { handleChange(e) }} required readOnly>
            <option>Select option</option>
            {uniqueWards &&
              uniqueWards.map((e, i) => (
                <option className="form-control" value={e} style={{ textTransform: "capitalize" }}>{e}</option>

              ))}
          </select>
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Construction Type</label><br />
          <input autoComplete="off" type="text" name="ConstructionType" value={formData.ConstructionType} disabled className='form-control mt-2' onChange={handleChange} readOnly />

        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Locality</label><br />
          <input autoComplete="off" type="text" name="localityrate" value={formData.locality} disabled className='form-control mt-2' onChange={handleChange} readOnly />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Total ARV</label><br />
          <input type="text" name="TotalARV" value={formData.TotalARV} placeholder="Total ARV" onChange={handleChange} className='form-control mt-2' required disabled />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Floor Number</label><br />
          <input autoComplete="off" type="text" name="Talo_ki_Sankhya" value={formData.Talo_ki_Sankhya} placeholder="Floor Number" onChange={handleChange} className='form-control mt-2' required maxLength={2} />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Property Age</label><br />
          <input autoComplete="off" type="text" name="PropertyAge" value={formData.PropertyAge} placeholder="Property Age" onChange={handleChange} className='form-control mt-2' required maxLength={3} />
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
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  name={e.Doc_id}
                  id={e.Doc_id}
                  onChange={ImageForm}
                />
              </div>

            ))}
        </Suspense>
        <div className="col-11 mt-3" style={{ display: 'grid', justifyContent: "center", alignItems: 'center' }}>
          <button type="submit" style={{ width: '20rem' }} className="form-control mt-2 btn btn-success my-2 col-12" >Submit</button>
          <button type="button" onClick={handleReset} className="form-control mt-2 btn btn-danger my-2" >Cancel</button>
        </div>
      </form>
    </div>

  );
};

export default Page;
