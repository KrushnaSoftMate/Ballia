import React, { useState } from 'react';
import './d.css';

const Dropdown = ({ Locality, handleChange, keyname, ID }) => {
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(true);

    // Filter out duplicate values and ensure they are valid strings
    const uniqueLocality = Array.from(new Set(
        Locality.map(item => item[keyname])
        .filter(value => typeof value === 'string' && value) // Filter out undefined, null, and non-string values
    ));

    // Filter based on the search value
    const filteredLocality = uniqueLocality.filter(value =>
        value.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div>
            <span 
                style={{fontSize:'11px'}}
                className='btn btn-dark' 
                onClick={() => setOpen(!open)}
            >
                Choose {keyname}
            </span>
            <div id={ID} hidden={open} className='mydrop'>
                <input
                    className="form-control my-2 search-input"
                    placeholder={`Search ${keyname}`}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <hr />
                <div className="dropdown-list">
                    {filteredLocality && filteredLocality.map((value, index) => (
                        <div key={index} className="dropdown-item">
                            <input 
                                className="my-1 form-control" 
                                name={keyname} 
                                onClick={(e) => { 
                                    handleChange(e); 
                                    setOpen(!open);
                                    setSearchValue('');  // Clear search after selection
                                }} 
                                value={value} 
                                style={{ cursor: "pointer" }} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
