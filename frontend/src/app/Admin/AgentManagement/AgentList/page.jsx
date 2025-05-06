'use client'
import React, { useState, useEffect, useContext } from 'react'
import { Admin } from "@/app/AdminContext/AdminManageMent"
import Pagination from '@/Components/pagination';

const page = () => {
    const statecalls = useContext(Admin);
    const { GetAgent } = statecalls;
    const [getAgent, setAgent] = useState([]);
    const [searchdata, SetSearchData] = useState([])

    useEffect(() => {
        getAgents()
    }, [])
    async function getAgents() {
        const data = await GetAgent()
        setAgent(data)
        SetSearchData(data)
    }

    const SearchAgent = (e) => {
        let searchValue = e.target.value.toLowerCase();

        if (!searchValue) {
            setAgent(searchdata)
            return;
        }

        let newData = searchdata.filter((item) => {
            return (
                item.AgentID.toLowerCase().includes(searchValue) ||
                item.FullName.toLowerCase().includes(searchValue) ||
                item.ContactNumber.toLowerCase().includes(searchValue)
            )
        });
        setAgent(newData)
    }
    function cards(data) {
        return (
            <>
                <tr>
                    <td>{data.ID}</td>
                    <td>{data.AgentID}</td>
                    <td>{data.FullName}</td>
                    <td>{data.ContactNumber}</td>
                    <td>{data.Email}</td>
                    <td>{data.Password}</td>
                    <td>{data.Moneylimit}</td>
                    <td>{data.Address}</td>
                </tr>
            </>
        )
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px' }}>
            <h4 style={{ textAlign: 'center' }}>Agent List</h4>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    position: 'relative',
                    background: 'transparent',
                    marginRight: '10px',
                }}
            >
                <img
                    src="/Search1.png"
                    alt="Search"
                    style={{
                        position: 'absolute',
                        left: '4%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                    }}
                />
                <input
                    className="form-control"
                    type="search"
                    style={{ padding: '9px 40px', border: 'none', borderRadius: '10px' }}
                    placeholder="Search"
                    onChange={(e) => { SearchAgent(e) }}
                />
            </div>
            </div>
            <div style={{ width: '70vw', backgroundColor: 'white', borderRadius: '15px', margin: '25px 45px', textAlign: 'center' }}>
                <div style={{ padding: "20px" }}>
                    <table className='my-2 table table-bordered'>
                        <thead className='table-light'>
                            <tr>
                                <th>ID</th>
                                <th>Agent ID</th>
                                <th>Fullname</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Money Limit</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                    getAgent && getAgent.map((e) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{e.ID}</td>
                                                    <td>{e.AgentID}</td>
                                                    <td>{e.FullName}</td>
                                                    <td>{e.ContactNumber}</td>
                                                    <td>{e.Email}</td>
                                                    <td>{e.Password}</td>
                                                    <td>{e.Moneylimit}</td>
                                                    <td>{e.Address}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                } */}
                            {Array.isArray && getAgent && getAgent.length > 0 ? (

                                <Pagination data={getAgent} perPageItems={10} func={c => cards(c)} searchparam={["AgentID", "FullName", "ContactNumber"]} searchword={""} useeffectactive={getAgent} />
                            ) : (
                                <tr>
                                    <td colSpan="14">No data available</td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default page