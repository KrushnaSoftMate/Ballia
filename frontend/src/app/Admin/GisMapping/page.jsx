'use client'
import React, { useContext, useState, useEffect } from 'react'
import { APIProvider, Map, Marker, Pin, InfoWindow, GoogleMapReact } from '@vis.gl/react-google-maps';
import { Admin } from '../../AdminContext/AdminManageMent'
import { backend } from '../../paths'

const page = () => {
  const { GetCordinates, GetDocumentForm,GetCordinatesOnStartup } = useContext(Admin)
  const [open, setOpen] = useState();
  const [locality, setlocality] = useState([]);
  const [Helper, SetHelper] = useState([]);
  const [formdata, setFormData] = useState({})
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const temprolposition = { lat: 18.5138, lng: 73.8487 };
  const [openMarkerId, setOpenMarkerId] = useState(null);

  let key = 'AIzaSyB50PBHh1RXyR0dF13rO-IHTfqDLkGymF0'
  useEffect(() => {
    Getdata()
    // GetCordinatesOnStartup().then((data) => setlocality(data));
    return () => { }
  }, [])

  async function Getdata() {
    let helper = await GetDocumentForm()
    SetHelper(helper?.locality)
  }

  function DisplayCompomentOnStart(data) {
    let location = data?.location.split('/')
    console.log(data);
    const position = { lat: Number(location[0]), lng: Number(location[1]) };
    return (
      <>
        <Marker position={position} onClick={() => setOpenMarkerId(data.PropertyID)}>
          <Pin />
        </Marker>
        {openMarkerId === data.PropertyID && (
          <InfoWindow position={position} onCloseClick={() => setOpenMarkerId(null)}>
            <p>Consumer Number: {data?.PropertyID}</p>
            <p>Name: {data?.FullName}</p>
            <p>Zone: {data?.Zone}</p>
            <p>Ward: {data?.Ward}</p>
            <p>Total Floors: {data.totalFloors}</p>
            <p>Total Area: {data.totalSqft}</p>
            <p>Total ARV: {data.TotalArv}</p>
            <p>Mohalla: {data?.Mohalla}</p>
            <img style={{ borderRadius: '5px', width: '10rem', marginBottom: '1rem' }} src={backend + "/CustomerDocuments/" + data?.documents}></img>
          </InfoWindow>
        )}
      </>
    )
  }
  
  function DisplayCompoment(data) {
    let location = data?.location.split('/')
    console.log(data);
    const position = { lat: Number(location[0]), lng: Number(location[1]) };
    return (
      <>
        <Marker position={position} onClick={() => setOpenMarkerId(data.PropertyID)}>
          <Pin />
        </Marker>
        {openMarkerId === data.PropertyID && (
          <InfoWindow position={position} onCloseClick={() => setOpenMarkerId(null)}>
            <p>Consumer Number: {data?.PropertyID}</p>
            <p>Name: {data?.FullName}</p>
            <p>Zone: {data?.Zone}</p>
            <p>Ward: {data?.Ward}</p>
            <p>Total Floors: {data.totalFloors}</p>
            <p>Total Area: {data.totalSqft}</p>
            <p>Total ARV: {data.TotalArv}</p>
            <p>Mohalla: {data?.Mohalla}</p>
            <img style={{ borderRadius: '5px', width: '10rem', marginBottom: '1rem' }} src={backend + "/CustomerDocuments/" + data?.documents}></img>
          </InfoWindow>
        )}
      </>
    )
  }
   
  // const uniqueZones = Array.from(new Set(Helper.map(e => e.Zone)));
  // const filteredWards = Helper.filter(e => e.Zone === selectedZone);
  const uniqueWards = Array.from(new Set(Helper.map(e => e.Ward)));
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,  // Use e.target.id to correctly identify the form field
    });
    if (e.target.id === 'Zone') {
      setSelectedZone(e.target.value);
    }
    if (e.target.id === 'Ward') {
      setSelectedWard(e.target.value);
    }
};
  async function SubmitLocality(e) {
    e.preventDefault();
    let datalocality = await GetCordinates(formdata)
    setlocality(datalocality)
    setIsFiltered(true); 
  }
  return (
    <>
      <div style={{height:'23vh', backgroundColor: '#f2f4f7'}}>
      <h4 style={{ textAlign: 'center' }}>GIS Mapping</h4>
      <form onSubmit={SubmitLocality} className='form-control mb-2' style={{ display: 'flex',justifyContent: 'space-around',alignItems: 'center', margin: 'auto',width:'60vw',backgroundColor: 'lightyellow',border: "1px solid rgb(241, 119, 46)",height:"8vw" }}>
        <div className='col-4'>
        <label htmlFor="" className='form-label'>Select Ward</label>
        <select className="form-select" id="Ward" onChange={handleChange}>
          <option selected disabled>Select Ward</option>
          {uniqueWards && uniqueWards.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        </div>
        <button className='btn btn-primary col-2' type='submit' >Search Owners</button>
      </form>
      <h4 style={{ textAlign: 'center' }}>Google Map</h4>
      </div>
      <APIProvider apiKey={key}>
        <Map zoom={5} center={temprolposition}style={{width:"90%",margin:"auto"}}>
          {/* Conditionally render markers based on filtered or initial state */}
          {isFiltered
            ? locality.map((x) => DisplayCompoment(x)) // When form is submitted, display filtered results
            : locality.map((x) => DisplayCompomentOnStart(x)) // On page load, display all locations
          }
        </Map>
      </APIProvider>
    </>
  )
}

export default page