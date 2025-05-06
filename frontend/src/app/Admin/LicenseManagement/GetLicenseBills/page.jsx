'use client'
import React, { useContext, useRef, useState, useEffect, useCallback } from 'react'
import { Admin } from '@/app/AdminContext/AdminManageMent'
import Pagination from '@/Components/pagination';

const page = () => {
    useEffect(() => {
        GetBill()
    }, [])


    const { GetLicenseBill } = useContext(Admin)
    const [detail, Setdetail] = useState()
    const [searchpermittype, Setsearchpermittype] = useState([])
    async function GetBill() {
        let data = await GetLicenseBill()
        console.log(data);
        Setdetail(data);
        Setsearchpermittype(data)
    }

    function showtable(e) {
        return (
            <tr>
                <td>{e.Gala}</td>
                <td>{e.BillNumber}</td>
                <td>{e.Rate}</td>
                {/* <td>{e.DueAmount}</td> */}
                <td>{e.TotalAmount}</td>
                <td>{e.PaidAmount}</td>
                <td>{e.Remaining}</td>
                <td>{e.FromDate}</td>
                <td>{e.ToDate}</td>
                <td>{e.Date}</td>
            </tr>
        )
    }

    // const debounce = (func, delay) => {
    //         let debounceTimer;
    //         return function (...args) {
    //             clearTimeout(debounceTimer);
    //             debounceTimer = setTimeout(() => func.apply(this, args), delay);
    //         };
    //     };
    const SearchLocalityRate = (e) => {
        let searchValue = e.target.value.toLowerCase();
        // console.log(searchValue);

        if (!searchValue) {
            Setdetail(searchpermittype);
            return;
        }
        let newData = searchpermittype.filter((item) => {
            return (
                item.Gala.toLowerCase().includes(searchValue) ||
                item.BillNumber.toLowerCase().includes(searchValue)
            )
        });
        Setdetail(newData);
    };
    // const debouncedSearch = useCallback(debounce(SearchLocalityRate, 800), [searchpermittype]);
    return (
        <>
            <div style={{ backgroundColor: '#f6f8fc', height: '100vh' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px' }}>
                        <h5><b>License Bills</b></h5>
                        {/* <div
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
                            onChange={(e) => { SearchLocalityRate(e) }}
                        />
                    </div> */}
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            border: '2px solid',
                            borderRadius: '20px',
                            border: 'none',
                            padding: '20px',
                            marginTop: '20px',
                        }}
                    >
                        <div style={{ backgroundColor: '#f6f8fc', padding: '5px', overflow: 'auto' }}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="1">Shop Number</th>
                                        <th rowspan="3">Bill Number</th>
                                        <th rowspan="3">Rate</th>
                                        {/* <th rowspan="4">Due Amount</th> */}
                                        <th rowspan="4">Total Amount</th>
                                        <th rowspan="4">Paid Amount</th>
                                        <th rowspan="4">Remaining</th>
                                        <th rowspan="4">From Date</th>
                                        <th rowspan="4">To Date</th>
                                        <th rowspan="4">Creation Date</th>

                                        {/* <th rowspan="4">Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray && detail && <Pagination data={detail} func={showtable} perPageItems={10} searchparam={['Gala', 'BillNumber']} searchword={searchpermittype} useeffectactive={detail} />}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page