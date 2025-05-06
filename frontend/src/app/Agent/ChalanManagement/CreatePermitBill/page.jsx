'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Agent } from '@/app/AdminContext/AgentManagement'
import { useRouter } from 'next/navigation';
const page = () => {
    const nav = useRouter()
    const { GetPermit } = useContext(Agent);
    const [permittype, setPermitType] = useState([])

    useEffect(() => {
        GetForm()
    },[])

    async function GetForm() {
        let data = await GetPermit();
        setPermitType(data.permit)
    }

    return (
        <>
            <form>
                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Permit Type</label><br />
                    <select className="form-control mt-2" name="PermitType" onChange={(e) => { nav.push('/Agent/ChalanManagement/CreatePermitBill/' + e.currentTarget.value) }} required>
                        <option selected disabled>Select Permit</option>
                        {permittype && permittype.map((e) => (
                            <option className="form-control mt-2" value={e.id} id={e.PermitTypes}>{e.PermitTypes}</option>
                        ))}
                    </select>
                </div>
            </form>
        </>
    )
}

export default page
