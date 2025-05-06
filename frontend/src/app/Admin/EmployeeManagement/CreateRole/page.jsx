'use client'
import React, { useState, useContext, useEffect } from 'react';
import { Admin } from "@/app/AdminContext/AdminManageMent";

const CreateRoles = () => {
  const [roleName, setRoleName] = useState({
    Department_ID: "",
    Rolename: ''
  });
  const [options, setOptions] = useState([]);
  const [show, setshow] = useState(true)
  const [DepartmentList, SetDepartment] = useState([])
  const [menu, setmenu] = useState({})
  const statecalls = useContext(Admin);
  const { GetMenus, Roles } = statecalls;

  useEffect(() => {
    async function getmenus() {
      let menu = await GetMenus()
      setOptions(menu)
    }
    getmenus()
  }, [])

  async function objectpusher(menuname, access) {
    const updatedMenu = { ...menu };
    if (!Array.isArray(updatedMenu[menuname])) {
      updatedMenu[menuname] = [access];
    } else {
      updatedMenu[menuname] = [...updatedMenu[menuname], access];
    }
    setmenu(updatedMenu);
  }


  const rolecreation = async (e) => {
    e.preventDefault()
    let condition = await Roles('CreateRole', roleName, menu)
    setshow(condition)
  }


  return (
     <div style={{backgroundColor:" rgb(242, 244, 247)"}}>
    <div className="mx-5">
            <h4>Employee Management: Create Role</h4>
      <form onSubmit={rolecreation}>

        <div className="">

          <div>
            <label>Role Name</label>
            <input
              type="text"
              className="form-control my-3"
              placeholder="Enter role name"
              id='Rolename'
              value={roleName.Rolename}
              onChange={(e) => { setRoleName({ ...roleName, [e.target.id]: e.target.value }) }}
              required
            />
          </div>
          <div>


            {show ? options.map((e) => {
              if (e.Summenuid === 0) {
                return (
                  <>
                    <div class="accordion" id="accordionPanelsStayOpenExample">
                      <div class="accordion-item" >
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                          <button style={{ backgroundColor: '#cfe2ff' }} class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            {e.Menu_Name}
                          </button>
                        </h2>
                        <b>{e.Menu_Name}</b>
                        <div style={{ display: 'flex' }}>
                          <span className='mx-2'><b>Create</b><input type='checkbox' onClick={() => objectpusher(e.Menu_ID, 'create')} /></span>
                          <span className='mx-2'><b>Read</b><input type='checkbox' onClick={() => objectpusher(e.Menu_ID, 'Read')} /></span>
                          <span className='mx-2'><b>Edit</b><input type='checkbox' onClick={() => objectpusher(e.Menu_ID, 'Edit')} /></span>
                          <span className='mx-2'><b>Delete</b><input type='checkbox' onClick={() => objectpusher(e.Menu_ID, 'Delete')} /></span>
                        </div>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                          <div class="accordion-body">
                            {options.map((x) => {
                              if (e.Menu_ID === x.Summenuid) {
                                return (
                                  <div style={{ backgroundColor: 'lemonchiffon', border: 'black 2px solid' }}>
                                    <label> {x.Menu_Name}</label>
                                    <div style={{ display: 'flex' }}>
                                      <span className='mx-2'><b>Create</b><input type='checkbox' onClick={() => objectpusher(x.Menu_ID, 'create')} /></span>
                                      <span className='mx-2'><b>Read</b><input type='checkbox' onClick={() => objectpusher(x.Menu_ID, 'Read')} /></span>
                                      <span className='mx-2'><b>Edit</b><input type='checkbox' onClick={() => objectpusher(x.Menu_ID, 'Edit')} /></span>
                                      <span className='mx-2'><b>Delete</b><input type='checkbox' onClick={() => objectpusher(x.Menu_ID, 'Delete')} /></span>
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

            }
            ) : null}
          </div>
          <button className='btn btn-primary my-2' type='submit' style={{ backgroundColor: "#e73d26", border: "none" }}>Create Role</button>
        </div>
      </form>




    </div>
    </div>
  );
};

export default CreateRoles;
