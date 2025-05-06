'use client'
import React, { useContext, useState } from 'react'

import { Admin } from '@/app/AdminContext/AdminManageMent'

const page = () => {

    const [agentdata, setAgentData] = useState({})
    const { CreateAgent } = useContext(Admin)


    async function AgentCreate(e) {
        e.preventDefault()

        let data = await CreateAgent(agentdata)
        if (data) {
            alert('Agent Created Successfully')
        }
        else {
            alert('Agent Not Created')
        }
    }

    return (
        <>
            <div style={{ display: "grid", width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f4f7', padding: '20px' }}>
                <div>
                    <h4>Create Agent</h4>
                </div>
                <div>
                    <form onSubmit={AgentCreate} style={{ display: 'flex', width: '100%', flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: 'white', marginTop: '10px' }}>
                        <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Agent ID</label>
                            <input className='form-control' id='AgentID' type='text' placeholder='Enter Agent ID' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Full Name</label>
                            <input className='form-control' id='FullName' type='text' placeholder='Enter Full Name' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Contact Number</label>
                            <input className='form-control' id='ContactNumber' type='text' placeholder='Enter Contact Number' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Email ID</label>
                            <input className='form-control' id='Email' type='email' placeholder='Enter Email ID' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Password</label>
                            <input className='form-control' id='Password' type='Password' placeholder='Enter Password' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        {/* <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Role ID</label>
                            <input className='form-control' id='RoleID' type='text' placeholder='Enter Role ID' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Role</label>
                            <input className='form-control' id='Role' type='text' placeholder='Enter Role' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div> */}
                        <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Limit</label>
                            <input className='form-control' id='Moneylimit' type='text' placeholder='Enter Limit' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        <div className="mx-2" style={{ width: '91%', padding: '8px' }} >
                            <label className='form-label'>Address</label>
                            <textarea className='form-control' id='Address' type='text' placeholder='Enter Address' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Aadhar Number</label>
                            <input className='form-control' id='AadharNumber' type='text' placeholder='Enter Aadhar Number' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        <div className='mx-2' style={{ width: '45%', padding: '8px' }} >
                            <label className='form-label'>Pan Number</label>
                            <input className='form-control' id='PanNumber' type='text' placeholder='Enter Pan Number' required onChange={(e) => { setAgentData({ ...agentdata, [e.currentTarget.id]: e.currentTarget.value }) }} />
                        </div>
                        <button type='submit'  className="form-control mt-2 btn btn-success my-2">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page
