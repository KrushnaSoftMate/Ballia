import React, { useEffect, useState } from 'react'
import './d.css'
const Popup = ({ Dyanmicpage, keyname, data }) => {

    const [searchValue, setSearchValue] = useState('');
    const [open, setopen] = useState(false)

    return (
        <div>

            <div hidden={open} className='mydroppop'>
                <div >
                    <span
                        style={{ fontSize: '11px' }}
                        className='btn btn-dark'
                        onClick={() => { setopen(!open) }}>
                        close
                    </span>
                    {Dyanmicpage(data)}
                </div>
            </div>
        </div>
    )
}


export default Popup
