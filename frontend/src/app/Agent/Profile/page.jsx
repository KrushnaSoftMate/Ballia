'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Agent } from "@/app/AdminContext/AgentManagement"

const page = () => {

    const { AgentProfile } = useContext(Agent)
    const [agentdata, SetAgentData] = useState([])

    useEffect(() => {
        GetData()
    }, [])

    async function GetData() {
        let data = await AgentProfile()
        SetAgentData(data)
        console.log(data);
    }

    return (
        <>
            <div>
                <div>
                    <h1>Profile</h1>
                </div>
                <div style={{ padding: "50px" }}>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Agent ID</th>
                                <th>Full Name</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role ID</th>
                                <th>Role</th>
                                <th>Limit</th>
                                <th>Address</th>
                                <th>Aadhar Number</th>
                                <th>Pan Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                agentdata && agentdata.map((e) => {
                                    return (
                                        <tr>
                                            <td>{e.ID}</td>
                                            <td>{e.AgentID}</td>
                                            <td>{e.FullName}</td>
                                            <td>{e.ContactNumber}</td>
                                            <td>{e.Email}</td>
                                            <td>{e.Password}</td>
                                            <td>{e.RoleID}</td>
                                            <td>{e.Role}</td>
                                            <td>{e.Moneylimit}</td>
                                            <td>{e.Address}</td>
                                            <td>{e.AadharNumber}</td>
                                            <td>{e.PanNumber}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default page
