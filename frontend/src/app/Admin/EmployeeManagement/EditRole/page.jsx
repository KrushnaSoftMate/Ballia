'use client'
import React, { useState, useContext, useEffect } from 'react';
import { Admin } from "@/app/AdminContext/AdminManageMent";

const EditRoles = () => {
  const statecalls = useContext(Admin);
  const { GetMenus, Roles, EditRoleActions } = statecalls;
  const [MenuList, SetMenuList] = useState([])
  const [Role, SetRoles] = useState([])
  const [AccessRole, SetAccessRole] = useState(false)
  const [menu, setmenu] = useState({})
  const [menuset, Menuaccess] = useState({})

  useEffect((e) => {
    Getdata()
  }, [])

  useEffect((e) => {
    uncheckAllCheckboxes()
    GetRolesActions()
  }, [AccessRole])

  async function objectpusher(event, menuname, access) {
    const updatedMenu = { ...menu };

    if (!event) {
      // If event is false, remove the specific access
      if (updatedMenu[menuname] && updatedMenu[menuname].includes(access)) {
        updatedMenu[menuname] = updatedMenu[menuname].filter(item => item !== access);
      }
    } else {
      // If event is true, add the access to the menu
      if (!Array.isArray(updatedMenu[menuname])) {
        updatedMenu[menuname] = [access];
      } else {
        updatedMenu[menuname] = [...updatedMenu[menuname], access];
      }
    }
    setmenu(updatedMenu);
  }

  const menuSetter = (menukey, checked, ex) => {
    let main = false
    let id = ex.currentTarget.parentElement.parentElement
    if (!id.children[0].children[1].checked && !id.children[1].children[1].checked && !id.children[2].children[1].checked && !id.children[3].children[1].checked) {
      Menuaccess({ ...menuset, [menukey]: [AccessRole] });
    } else {
      let obj = { ...menuset }; // Create a shallow copy of the original object
      delete obj[menukey]; // Delete the specified key
      Menuaccess(obj); // Update the state with the modified object
    }
  };



  async function Getdata() {
    const data = await GetMenus()
    let data1 = await Roles('View', null)
    SetRoles(data1)
    SetMenuList(data)
  }

  function uncheckAllCheckboxes() {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Uncheck each checkbox
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
  async function GetRolesActions() {
    try {
      const data2 = await EditRoleActions('view', AccessRole);
      const object = {};

      data2.forEach(element => {
        const createRole = document.getElementById('CreateRole' + element.MenuId);
        const readRole = document.getElementById('ReadRole' + element.MenuId);
        const editRole = document.getElementById('EditRole' + element.MenuId);
        const deleteRole = document.getElementById('DeleteRole' + element.MenuId);

        if (createRole && readRole && editRole && deleteRole) {
          createRole.checked = element.create === "1" ? true : false;
          readRole.checked = element.view === "1" ? true : false;
          editRole.checked = element.edit === "1" ? true : false;
          deleteRole.checked = element.delete === "1" ? true : false;
        }

        object[element.MenuId] = [
          element.create === "1" ? 'create' : null,
          element.view === "1" ? 'Read' : null,
          element.edit === "1" ? 'Edit' : null,
          element.delete === "1" ? 'Delete' : null,
        ];
      });

      setmenu(object);
    } catch (error) {
      console.error(error);
    }
  }

  const submit = async () => {
    let data2 = await EditRoleActions('update', AccessRole, menu, menuset)
  }
  return (
    <div style={{backgroundColor:" rgb(242, 244, 247)"}}>
    <div style={{ padding: '5rem' }}>
      <h4>Employee Management: Edit Roles</h4>
      <select onChange={(e) => { SetAccessRole(e.target.value) }} className="form-control my-5" >
        <option value={false}>Please Select</option>
        {
          Role.map((e) => {
            return (
              <option value={e.RoleID}>{e.Designation}</option>
            )
          })
        }

      </select>
      {
        MenuList.map((e, index) => {
          if (e.Access_Role.includes(AccessRole) && e.Summenuid === 0) {
            return (
              <>
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item" >
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                      <button style={{ backgroundColor: '#cfe2ff' }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapseOne"+index} aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        {e.Menu_Name}
                      </button>
                    </h2>
                    <b>{e.Menu_Name}</b>
                    <div style={{ display: 'flex' }}>
                      <span className='mx-2'><b>Create</b><input type='checkbox' name={e.Menu_ID} id={'CreateRole' + e.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, e.Menu_ID, 'create'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                      <span className='mx-2'><b>Read</b><input type='checkbox' name={e.Menu_ID} id={'ReadRole' + e.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, e.Menu_ID, 'Read'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                      <span className='mx-2'><b>Edit</b><input type='checkbox' name={e.Menu_ID} id={'EditRole' + e.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, e.Menu_ID, 'Edit'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                      <span className='mx-2'><b>Delete</b><input type='checkbox' name={e.Menu_ID} id={'DeleteRole' + e.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, e.Menu_ID, 'Delete'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                    </div>
                    <div id={"panelsStayOpen-collapseOne"+index} className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                      <div className="accordion-body">
                        {MenuList.map((x) => {
                          if (e.Menu_ID === x.Summenuid) {
                            return (
                              <div style={{ backgroundColor: 'lemonchiffon', border: 'black 2px solid' }}>
                                <label> {x.Menu_Name}</label>
                                <div style={{ display: 'flex' }}>
                                  <span className='mx-2'><b>Create</b><input type='checkbox' name={x.Menu_ID} id={'CreateRole' + x.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, x.Menu_ID, 'create'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                                  <span className='mx-2'><b>Read</b><input type='checkbox' name={x.Menu_ID} id={'ReadRole' + x.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, x.Menu_ID, 'Read'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                                  <span className='mx-2'><b>Edit</b><input type='checkbox' name={x.Menu_ID} id={'EditRole' + x.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, x.Menu_ID, 'Edit'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                                  <span className='mx-2'><b>Delete</b><input type='checkbox' name={x.Menu_ID} id={'DeleteRole' + x.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, x.Menu_ID, 'Delete'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>

                                </div>
                              </div>
                            )
                          }

                        })}


                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </>
            )
          }
          else if (e.Summenuid === 0 && !e.Access_Role.includes(AccessRole)) {
            return (
              <>
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item" >
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                      <button style={{ backgroundColor: '#ff858591' }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Do Not Have Access to {e.Menu_Name}
                      </button>
                    </h2>
                    <b>{e.Menu_Name}</b>
                    <div style={{ display: 'flex' }}>
                      <span className='mx-2'><b>Create</b><input type='checkbox' name={e.Menu_ID} id={'CreateRole' + e.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, e.Menu_ID, 'create'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                      <span className='mx-2'><b>Read</b><input type='checkbox' name={e.Menu_ID} id={'ReadRole' + e.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, e.Menu_ID, 'Read'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                      <span className='mx-2'><b>Edit</b><input type='checkbox' name={e.Menu_ID} id={'EditRole' + e.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, e.Menu_ID, 'Edit'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                      <span className='mx-2'><b>Delete</b><input type='checkbox' name={e.Menu_ID} id={'DeleteRole' + e.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, e.Menu_ID, 'Delete'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                    </div>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                      <div className="accordion-body">
                        {MenuList.map((x) => {
                          if (e.Menu_ID === x.Summenuid) {
                            return (
                              <div style={{ backgroundColor: 'lemonchiffon', border: 'black 2px solid' }}>
                                <label> {x.Menu_Name}</label>
                                <div style={{ display: 'flex' }}>
                                  <span className='mx-2'><b>Create</b><input type='checkbox' name={x.Menu_ID} id={'CreateRole' + x.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, x.Menu_ID, 'create'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                                  <span className='mx-2'><b>Read</b><input type='checkbox' name={x.Menu_ID} id={'ReadRole' + x.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, x.Menu_ID, 'Read'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                                  <span className='mx-2'><b>Edit</b><input type='checkbox' name={x.Menu_ID} id={'EditRole' + x.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, x.Menu_ID, 'Edit'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>
                                  <span className='mx-2'><b>Delete</b><input type='checkbox' name={x.Menu_ID} id={'DeleteRole' + x.Menu_ID} onClick={(np) => { np.stopPropagation(); objectpusher(np.currentTarget.checked, x.Menu_ID, 'Delete'); menuSetter(np.currentTarget.name, np.currentTarget.checked, np) }} /></span>

                                </div>
                              </div>
                            )
                          }

                        })}


                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </>
            )
          }
        })
      }

      <button className='btn btn-danger' onClick={(e) => { submit() }} style={{ backgroundColor: "#e73d26", border: "none" }}>Change Access</button>
    </div>
    </div>

  )
}

export default EditRoles