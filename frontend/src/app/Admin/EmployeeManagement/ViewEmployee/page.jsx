'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Admin } from '@/app/AdminContext/AdminManageMent'
import CreateEmployee from '../CreateEmployee/page';
import Pagination from '@/Components/pagination'

const EditViewEmp = () => {
  const types = useContext(Admin);
  const { EmployeeManagement, Roles, DepartmentHandler } = types;
  const [Employees, SetEmployees] = useState([]);
  const [Search, SetSearch] = useState(null);
  const [searchdata, SetSearchData] = useState([])
  const [Role, SetRole] = useState([])
   const [editingRowId, setEditingRowId] = useState(false);
  var [form, setForm] = useState({
    type: 'Edit',
    FullName: '',
    PhoneNumber: '',
    Email: '',
    Password: '',
    RoleID: '',
    Role: ''
  })
  useEffect(() => {
    GetData();
  }, []);

  const handleEdit = (data) => {
    setEditingRowId(data.id);
    setForm({
      type: 'Edit',
      FullName: data.FullName,
      PhoneNumber: data.PhoneNumber,
      Email: data.Email,
      Password: data.Password,
      RoleID: data.RoleID,
      Role: data.Role
    });
};

  const handleChange = (e) => {
    if (e.target.id === 'Role') {
      let obj = JSON.parse(e.target.value)
      form.Role = obj.Designation;
      form.RoleID = obj.RoleID
    }
    else {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    }

  };
  async function GetData() {
    let data = await EmployeeManagement('View', Search);
    let data1 = await Roles('View', null)
    SetRole(data1)
    SetEmployees(data);
    SetSearchData(data)
  }

  function Display_Option(id) {
    let data = document.getElementById(id)

    if (data.style.display === 'none') {

      data.style.display = 'block'
    } else {
      data.style.display = 'none'
    }

  }

  const SearchEmployee = (e) => {
    let searchValue = e.target.value.toLowerCase();

    if (!searchValue) {
      SetEmployees(searchdata)
      return;
    }

    let newData = searchdata.filter((item) => {
      return (
        item.FullName.toLowerCase().includes(searchValue) ||
        item.Email.toLowerCase().includes(searchValue) ||
        item.Password.toLowerCase().includes(searchValue) ||
        item.RoleID.toString().toLowerCase().includes(searchValue) ||
        item.Role.toLowerCase().includes(searchValue)
      )
    });
    SetEmployees(newData)
  }

  async function SubmitEdit() {
    let b = await EmployeeManagement("Update", form)
  }

  function showtable(emp, index) {
    return (

      <tr key={index}>
        <td>{emp.ID}</td>
        <td>{emp.FullName}</td>
        <td>{emp.Email}</td>
        <td>{emp.Password}</td>
        <td>{emp.RoleID}</td>
        <td>{emp.Role}</td>
        <td>
          <button className='btn btn-primary mx-1' onClick={() => handleEdit(emp)}>Edit</button>
          <button className='btn btn-danger my-1' onClick={(e) => popupOpen(e, emp)} >Delete</button>
        </td>
      </tr>
    )
  }


  const popupOpen=(e,data)=>{
    console.log(data)
  var result = confirm(`Do you want to delete Employee` );
  if (result) {
    // const deleteemp=await 
  } else {
  }
  }
  

  return (
    <div className="container" style={{ backgroundColor: " rgb(242, 244, 247)" }}>
      <h4 style={{ textAlign: 'center' }}>View Employee</h4>
      <button className='btn btn-light' onClick={(e) => Display_Option('create_Employee')}> Create Employee</button>
      <div id='create_Employee' style={{ display: "none" }}>
        <CreateEmployee></CreateEmployee>
      </div>

      <form onSubmit={GetData}>
        <div className="row mt-3">
          <div className="col-md-6">
            <span style={{ display: "flex", justifyContent: "center" }}>
              <input className='form-control' type='search' placeholder='Search Employees by Full Name or Email ID or Role ID' onChange={(e) => { SearchEmployee(e) }} />
            </span>
          </div>
        </div>
      </form>

      <div style={{ width: '70vw', height: '90vh', margin: '30px 45px', backgroundColor: 'white', borderRadius: '15px', textAlign: 'center' }}>
        <div style={{ padding: "20px" }}>
          <table className='my-2 table table-bordered table-striped'>
            <thead className='table-light '>

              <tr>
                <th >Sr No.</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">RoleID</th>
                <th scope="col">Role</th>
                <th scope="col">Acton</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(Employees) && Employees.length > 0 ? (
                <Pagination data={Employees} func={showtable} perPageItems={10} searchparam={['Employees', 'Status']} />) : (
                <tr>
                  <td colSpan="14">No approved customer data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="container my-5" id='edit_emp' style={{ display: "none" }}>
          <div className="card p-4">
            <h2 className="card-title text-center">Edit/View Employee</h2>
            <form onSubmit={SubmitEdit} >
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="FullName"
                  value={form.FullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="Email"
                  value={form.Email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  value={form.Password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  id='Role'
                  onChange={(e) => handleChange(e)}>
                  <option value={form.RoleID}>{form.Role}</option>
                  {Role.map((e) => {
                    return (
                      <option key={e.RoleID} value={JSON.stringify(e)}>
                        {e.Designation}
                      </option>
                    )
                  })}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>


      </div>
    </div>
  );
};

export default EditViewEmp;
