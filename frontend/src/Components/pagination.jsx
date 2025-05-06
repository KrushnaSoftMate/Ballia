'use client'
import React, { useEffect, useState } from 'react'
// import './Pagination.css'



const Pagination = ({ data, perPageItems, func, searchparam, searchword, displaytype }) => {

    useEffect(() => {
        search(searchword)
    }, [searchword])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(perPageItems);
    const totalpages = Math.ceil(data.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const [Table, SetTable] = useState(currentItems);
    const [length, setLength] = useState(data.length)
    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalpages) {
            setCurrentPage(pageNumber);
            const tempindexOfLastItem = pageNumber * itemsPerPage;
            const tempindexOfFirstItem = tempindexOfLastItem - itemsPerPage;
            const tempcurrentItems = data.slice(tempindexOfFirstItem, tempindexOfLastItem);
            SetTable(tempcurrentItems)
        }
    };

    const search = (e) => {
        try {
            let searchValue = e.target.value.toLowerCase();
            if (!searchValue) {
                SetTable(currentItems); // If search value is empty, show all data
                setLength(data.length)
                return;
            }
            let newdata = data.filter((item) => {
                return (
                    item[searchparam[0]]?.toString()?.toLowerCase()?.includes(searchValue) ||
                    item[searchparam[1]]?.toString()?.toLowerCase()?.includes(searchValue) ||
                    item[searchparam[2]]?.toString()?.toLowerCase()?.includes(searchValue) ||
                    item[searchparam[3]]?.toString()?.toLowerCase()?.includes(searchValue) ||
                    item[searchparam[4]]?.toString()?.toLowerCase()?.includes(searchValue)
                );
            });
            SetTable(newdata);
            setLength(newdata.length)
        } catch (error) {
            console.error('Error in search:', error);
        }
    }

    return (
        <>

            {
                displaytype == 'flex' ?
                    (
                        <div style={{ display: 'flex' }}>
                            {
                                Table && Table.map((e, index) => {
                                    return (func(e, index))
                                })
                            }
                        </div>
                    ) : (
                        Table && Table.map((e, index) => {
                            return (func(e, index + indexOfFirstItem))
                        })
                    )
            }


            <div style={{ display: 'flex', paddingTop: '10px', width: "100%" }}>
                <button disabled={currentPage <= 1 ? true : false} onClick={() => { paginate(1) }} className="page-link" style={{ border: "1px solid #B3B3B3", color: "#336AEA", width: "70px" }}>
                    <img src='/First.png' alt='' style={{ width: "12px" }}></img> First
                </button>
                <button disabled={currentPage <= 1 ? true : false} onClick={() => { paginate(currentPage - 1) }} className="page-link" style={{ border: "1px solid #B3B3B3", color: "#336AEA", width: "25px" }}>
                    <img src='/Back-Arrow.png' alt='' style={{ width: "12px" }}></img>
                </button>
                {/* <button onClick={() => { paginate(currentPage - 1) }} className="page-link" style={{ border: "1px solid #B3B3B3", color: "#336AEA" }}>
                    {currentPage - 1}
                </button> */}
                <button onClick={() => { paginate(currentPage) }} className="page-link" style={{ backgroundColor: "blue", color: 'white', border: "1px solid #B3B3B3" }}>
                    {currentPage}
                </button>
                {/* <button disabled={currentPage >= length ? true : false} onClick={() => { paginate(currentPage + 1) }} className="page-link" style={{ border: "1px solid #B3B3B3", color: "#336AEA" }}>
                    {currentPage + 1}
                </button> */}
                <button disabled={currentPage >= length ? true : false} onClick={() => { paginate(currentPage + 1) }} className="page-link" style={{ border: "1px solid #B3B3B3", color: "#336AEA", width: "25px" }}>
                    <img src='/Next-Arrow.png' alt='' style={{ width: "12px" }}></img>
                </button>
                <button className="page-link" onClick={() => { paginate(totalpages) }} style={{ border: "1px solid #B3B3B3", color: "#336AEA", width: "70px" }}>Last <img src='/Last.png' alt='' style={{ width: "12px" }}></img></button>
                {/* <ul className="pagination">
                    {Array(Math.ceil(length / itemsPerPage))
                        .fill()
                        .map((_, index) => (
                            <li key={index} className="page-item">
                                <button onClick={() => { paginate(index + 1) }} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                </ul> */}
            </div>
        </>
    )
}

export default Pagination;
