"use client";
import React, { Suspense, useContext, useEffect, useRef, useState } from "react";
import { Agent } from '@/app/AdminContext/AgentManagement';

const Page = () => {
  const { GetDocumentForm, CreateCustomer, LocalityRate, PropertyRate,AgentProfile } = useContext(Agent);


  const [formData, setFormData] = useState({
    // propertyID: '',
    FullName: '',
    ContactNumber: '',
    FatherorGaurdianName: '',
    Zone: "",
    Ward: "",
    Mohalla: "",
    TotalArea: '',
    Area_Use: '',
    // PropertyType: '',
    Talo_ki_Sankhya: '',
    Plot_No: '',
    PropertyforUse: "",
    PropertyAge: '',
    ElectricityConnection: "",
    WaterConnection: "",
    AadharNumber: "",
    location: '',
    Floor: "",
    sqft: "",
    Arv: "",
    // Address: '',
    Meter: '',
    ConstructionType: '',
    TotalArv:"",
    // locality: ''
    createdBy:""
  });
  const uploadform = new FormData()
  const [DocumentForm, SetDocumentForm] = useState([]);
  const [TypeofProperty, SetTypeofProperty] = useState([]);
  const [documentinformation, Setdocumentinformation] = useState([]);
  const [Locality, SetLocality] = useState([]);
  const [Meter, SetMeter] = useState([]);
  const [propertyType, SetPropertyType] = useState([]);
  const [propertyAge, setPropertyAge] = useState('');
  const [annualtax, setAnnualTax] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [repeatedData, setRepeatedData] = useState([]);
  const [Arv, setARV] = useState('');
  const [totalARV, setTotalARV] = useState(0);
  const [createdBy,setCreatedby]=useState(null)
  // const [concatenatedString, setConcatenatedString] = useState('');
  // const [locationnnn, setlocationnnn] = useState('');

  const formref = useRef(null)

  let token;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("AuthUser");
  }

  useEffect(() => {
    GetForm();
    GetAgentData();
    return () => { };
  }, []);

  useEffect(() => {
    // Calculate total ARV whenever repeatedData changes
    const newTotalARV = calculateTotalARV();
    setTotalARV(newTotalARV);
    setFormData({
      ...formData,
      TotalArv: newTotalARV,
      createdBy:createdBy
    });
  }, [repeatedData]);
  // async function getlocation(e) {
  //   if (typeof navigator != undefined) {
  //     navigator.geolocation.getCurrentPosition((x) => {
  //       let lat = x.coords.latitude
  //       let long = x.coords.longitude
  //       let val = lat + '/' + long
  //       setFormData({
  //         ...formData,
  //         ['location']: val,
  //       });
  //     })
  //   } else {
  //     alert('not available')
  //   }

  // }

  async function GetForm() {
    let data = await GetDocumentForm();
    console.log(data);
    SetDocumentForm(data.form);
    SetTypeofProperty(data.toproperty)
    SetLocality(data.locality)

    SetMeter(data.meter)
    SetPropertyType(data.propertytype)
  }
  const getlocation = (e) => {
    // setlocationnnn("18.6161/73.7286")
    e.stopPropagation()
    setFormData({
      ...formData,
      ['location']: "18.6161/73.7286",
    });
  }
  const handleChange = (e) => {
    // const { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'PropertyAge') {
      calculatePropertyAge(e.target.value);
    }
    if (e.target.name === 'Zone') {
      setSelectedZone(e.target.value);
    }
    if (e.target.name === 'Ward') {
      setSelectedWard(e.target.value);
    }


  };



  const calculatePropertyAge = (year) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    setPropertyAge(age);
  };
  async function calculateARV() {
    const updatedString = `${formData?.Mohalla}` + "/" + `${formData?.Ward}` + "/" + `${formData?.Zone}` + "/" + `${formData?.Meter}`;
    const PropertyforUseRate = `${formData?.PropertyforUse}`
     const ConstructionRate=`${formData.ConstructionType}`
    console.log(PropertyforUseRate);
    // setConcatenatedString(updatedString);
    let data = await LocalityRate(updatedString,ConstructionRate)
    const Rate = data[0]?.Rate;
    let data1 = await PropertyRate(PropertyforUseRate)
    console.log(data1);
    const PropertyRateforuse = data1[0]?.Rate
    // const property = parseInt(formData.PropertyforUse) || 0;
    const sqft = parseInt(formData.sqft) || 0;
    const arv = Rate * sqft * 12 * PropertyRateforuse; // Assuming a multiplier for ARV calculation
    console.log(arv);
    setARV(arv);
    setTotalARV(calculateTotalARV());
  };

  const ImageForm = (e) => {
    let name = e.currentTarget.files[0].name;
    let value = e.currentTarget.name;
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
      CreateCustomer(uploadform)
    } catch (error) {
      console.log(error);
    }

  };

  const handleReset = () => {
    formref.current.reset()
    setFormData([])
  };

  async function GetAgentData() {
    let [data] = await AgentProfile()
    console.log("createdBy",data.FullName);
    setCreatedby(data.FullName)
}


  const uniqueZones = Array.from(new Set(Locality.map(e => e.Zone)));

  const filteredWards = Locality.filter(e => e.Zone === selectedZone);
  const uniqueWards = Array.from(new Set(filteredWards.map(e => e.Ward)));

  const filteredMohallas = Locality.filter(e => e.Ward === selectedWard);
  const uniquMohallas = Array.from(new Set(filteredMohallas.map(e => e.locality)));

  const calculateTotalARV = () => {
    let total = 0;
    repeatedData.forEach((item) => {
      total += parseFloat(item.Arv);
    });
    return total;
  };
  const AddFloor = (e) => {
    e.preventDefault();
    setRepeatedData([...repeatedData, { ...formData, annualtax, propertyAge, Arv }]);
    const newTotalARV = calculateTotalARV();
    setTotalARV(newTotalARV);
    setFormData({
      ...formData,
      TotalArv: newTotalARV, // Update formData with new TotalARV
    });
    // handleReset();
  };


  return (

    <div style={{ display: "grid", width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f4f7', padding: '20px' }}>
      <h4>Owner Management : Create Owner</h4>

      <form ref={formref} onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: 'white', marginTop: '10px' }}>
        {/* <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }} >Property ID</label><br />
          <input type="text" name="propertyID" value={formData.propertyID} placeholder="Property ID" onChange={handleChange} className='form-control mt-2' required />
        </div> */}
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Owner Name</label><br />
          <input type="text" name="FullName" value={formData.FullName} placeholder="Owner Name" onChange={handleChange} className='form-control mt-2' required />
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Father/Gaurdian Name</label><br />
          <input type="text" name="FatherorGaurdianName" value={formData.FatherorGaurdianName} placeholder="Father/Gaurdian Name" onChange={handleChange} className='form-control mt-2' required />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Contact Number</label><br />
          <input type="text" name="ContactNumber" value={formData.ContactNumber} placeholder="Contact Number" onChange={handleChange} className='form-control mt-2' required />
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Zone</label><br />
          <select className="form-control mt-2" name="Zone" onChange={(e) => { handleChange(e) }} required>
            <option>Select Zone</option>
            {uniqueZones && uniqueZones.map((Zone) => (
              <option className="form-control mt-2" value={Zone} >{Zone}</option>
            ))}
          </select>
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Ward</label><br />
          <select className="form-control mt-2" name="Ward" onChange={(e) => { handleChange(e) }} required>
            <option>Select Ward</option>
            {uniqueWards && uniqueWards.map((Ward) => (
              <option className="form-control mt-2" value={Ward} >{Ward}</option>
            ))}
          </select>
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Mohalla</label><br />
          <select className="form-control mt-2" name="Mohalla" onChange={(e) => { handleChange(e) }} required>
            <option>Select Mohalla</option>
            {uniquMohallas && uniquMohallas.map((locality) => (
              <option className="form-control mt-2" value={locality} >{locality}</option>
            ))}
          </select>
        </div>





        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Road Meter</label><br />
          <select className="form-control mt-2" name="Meter" value={formData.Meter} onChange={(e) => { handleChange(e) }} required>
            <option>Select option</option>
            {Meter && Meter.map((e) => (
              <option className="form-control mt-2" value={e.Meter} >{e.Meter}</option>
            ))}
          </select>
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Construction Type</label><br />
          <select className="form-control mt-2" name="ConstructionType" value={formData.ConstructionType} onChange={(e) => { handleChange(e) }} required>
            <option>Select Construction Type</option>
              <option className="form-control mt-2" value="RccRate" >RCC Rate</option>
              <option className="form-control mt-2" value="OtherPakkaRate" >Other Pakka Rate</option>
              <option className="form-control mt-2" value="KacchaRate" >Kaccha Rate</option>
              <option className="form-control mt-2" value="EmptyLandRate" >Empty Land Rate</option>
          
          </select>
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Total Area</label><br />
          <input type="text" name="TotalArea" value={formData.TotalArea} placeholder="Total Area" onChange={handleChange} className='form-control mt-2' required />
        </div>

        {/* <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Area Use</label><br />
          <input type="text" name="Area_Use" value={formData.Area_Use} placeholder="Area Use" onChange={handleChange} className='form-control mt-2' required />
        </div> */}

        {/* <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Property Type</label><br />
          <select className="form-control mt-2" name="PropertyType" onChange={(e) => { handleChange(e) }} required>
            <option>Select option</option>
            {propertyType && propertyType.map((e) => (
              <option className="form-control mt-2" value={e.id} id={e.id}>{e.TaxName}</option>
            ))}
          </select>
        </div> */}

        <div className="mx-2" style={{ width: '90%', padding: '8px', display: "flex" }} >
          <div style={{ width: '25%' }} >
            <label style={{ fontWeight: 'bold' }}>Floor</label><br />
            <select className="form-control mt-2" name="Floor" onChange={(e) => { handleChange(e) }} >
              <option selected disabled>Select Floor</option>
              <option value="Basement">Basement</option>
              <option value="Ground">Ground</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="mx-2" style={{ width: '25%' }} >
            <label style={{ fontWeight: 'bold' }}>Sq. Ft.</label><br />
            <input className="form-control mt-2" name="sqft" onChange={(e) => { handleChange(e) }} />
          </div>

          <div className="mx-2" style={{ width: '25%' }}>
            <label style={{ fontWeight: 'bold' }}>Property for Use</label><br />
            <select className="form-control mt-2" name="PropertyforUse" onChange={(e) => { handleChange(e) }} >
              <option selected disabled>Select PropertyforUse</option>
              {TypeofProperty && TypeofProperty.map((e) => (
                <option className="form-control mt-2" value={e.PropertyType} id={e.id}>{e.PropertyType}</option>
              ))}
            </select>
          </div>

          <div className="mx-2" style={{ width: '25%' }} >
            <label style={{ fontWeight: 'bold' }}>ARV Calculation</label><br />
            <input disabled type="number" name="Arv" placeholder="" value={Arv} onChange={handleChange} className='form-control mt-2' required />
          </div>

          <div className="mx-2" style={{ width: '10%' }} >
            <label style={{ fontWeight: 'bold' }}></label><br />
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={calculateARV}>Calculate</button>
            <button className="btn btn-success" onClick={(e) => { AddFloor(e) }}>Add</button>
          </div>

        </div>

        <div className="mx-2" style={{ width: '90%', padding: '8px', display: "flex" }} >
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Floor</th>
                <th>Sq. Ft.</th>
                <th>Property for Use</th>
                <th>ARV</th>
              </tr>
            </thead>
            <tbody>
              {repeatedData?.map((e, index) => (
                <tr key={index}>
                  <td>{e.Floor}</td>
                  <td>{e.sqft}</td>
                  <td>{e.PropertyforUse}</td>
                  <td>{e.Arv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Plot/RG No.</label><br />
          <input type="number" name="Plot_No" value={formData.Plot_No} placeholder="Plot/RG No" onChange={handleChange} className='form-control mt-2' required />
        </div>



        <div className="mx-2" style={{ width: '35%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Year of Construction</label><br />
          <input type="number" name="PropertyAge" value={formData.PropertyAge} placeholder="Year of Construction" onChange={handleChange} className='form-control mt-2' required />
        </div>
        <div className="mx-2" style={{ width: '10%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Age</label><br />
          <input disabled type="number" name="PropertyAge" placeholder={propertyAge} onChange={handleChange} className='form-control mt-2' required />
        </div>
        

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Location</label><br />
          <div className="mt-2" style={{ display: 'flex', height: '40px', fontSize: '20px' }}>
            <button style={{ fontSize: '13px', width: '10rem' }} className="btn btn-primary" onClick={(e) => { getlocation(e) }}>Get Location</button>
            <input className="form-control " type="text" name="location" value={formData.location} required />
          </div>
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Electricity Connection</label><br />
          <select className="form-control mt-2" name="ElectricityConnection" onChange={(e) => { handleChange(e) }} required>
            <option selected disabled>Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Water Connection</label><br />
          <select className="form-control mt-2" name="WaterConnection" onChange={(e) => { handleChange(e) }} required>
            <option selected disabled>Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Aadhar Number</label><br />
          <input type="text" name="AadharNumber" value={formData.AadharNumber} placeholder="Aadhar Number" onChange={handleChange} className='form-control mt-2' maxLength="12" required />
        </div>

        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }}>Total ARV Calculation</label><br />
          <input disabled name="TotalArv" onChange={handleChange} placeholder={totalARV} className='form-control mt-2' required />
        </div>

        <Suspense>
          {DocumentForm &&
            DocumentForm.map((e) => (

              <div key={e.id} className="mx-2" style={{ width: '45%', padding: '8px' }}>
                <label style={{ fontWeight: 'bold' }}>{e.DocumentName}</label><br />
                <input className="form-control mt-2"
                  type="file"
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
