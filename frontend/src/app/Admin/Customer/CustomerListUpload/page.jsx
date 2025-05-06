import React from 'react'
// import apiurl from '../../../path';

const page = () => {
  const uploadcsv = async (event) => {
    let fname = event.target.files[0]
    let form = new FormData()
    form.append('Winnerlist', fname)
    let data = await fetch('http://' + apiurl + '/AuctionWinners', { method: 'post', headers: { 'AuthToken': token }, body: form })
    data = await data.json()
  }
  return (
    <div style={{ padding: '1rem', justifyContent: 'center', textAlign: 'center' }}>
      <h1>Customers Upload the list</h1>
      <input type='file' className='form-control'></input><br />
      <button className='btn btn-primary' type='submit'>Submit</button>
    </div>
  )
}

export default page