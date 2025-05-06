'use client'
import { useState, useEffect, useRef, useContext } from 'react'
import './tce.css'
import { Customer } from '@/app/AdminContext/CustomerManagement'

const page = ({ params }) => {
  const message = useRef(null)
  const statecalls = useContext(Customer);
  const { GetTicketInfos,ShowMessages,SendTicketChat } = statecalls;
  const [messagelog, Setmessagelog] = useState([{ 'server': 'down' }])
  const [messagetext, setmessagetext] = useState('')
  const [getdata, setData] = useState([])
  const [status, setStatus] = useState('Open');
  let id = params.id
  console.log(id)
  if (!id) {
    alert("Check your ID")
    window.location.href = '/Admin/Complaints/'
  }


  useEffect(() => {
    ShowMessagess(id)
    getTicketInfo(id)
  }, [])
  async function ShowMessagess(id) {
    console.log(id);
    let data = await ShowMessages(id[0])
    console.log(data);
    Setmessagelog(data)
  }

  useEffect(() => {
    const chatbox = document.getElementById('chatbox');
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }, [message.current])

  async function getTicketInfo(id) {
    let data = await GetTicketInfos(id[0])
    // console.log(data)
    setData(data)
  }
  
  const send = () => {
    const messagedd = document.getElementById('w-input-text');
    if (!messagedd) {
      return;
    }

    const message = messagedd.innerHTML;

    if (!message) {
      return;
    }
    const data = SendTicketChat(id[0], message, id[1])
    console.log(data)
    Setmessagelog([...messagelog, { ChatMessage: message, Sender: id[1] }]);
    messagedd.innerHTML = '';
  }
  const displaymessages = (items) => {
    const timestamp = items.date;
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString();
    console.log(items.Userid);
    return (
      <div key={items._id} className='AI'>
        <p className={items.Sender != id[1]? 'reply' : 'sentmess'}>{items.ChatMessage}<span className='username'>{items.Sender}<br />{formattedDate}</span></p>
      </div>
    )
  }

//   const handleButtonClick = async () => {
//     if (status === 'Open' || status==="Reopen" || status==="Reopen By User") {
//       setStatus('Close');
//       await department?.CloseTickets(id[0], 'Close');
//     } 
//     else if (status === 'Close') {
//       setStatus('Open');
//       await department?.CloseTickets(id[0], 'Reopen');
//     }
//   };

  return (
    
    <div>
      <div className='flex justify-around h-auto w-[95vw] bg-slate-50'>
       
        <div>
          <h1 className='text-2xl'>Ticket Information</h1>
          {
            Array.isArray(getdata) && getdata.map((e) => {
              return (
                <>
                  {/* <h6>User ID: <b>{e.Userid}</b></h6> */}
                  <h6>User's Name: <b>{e.fullname}</b></h6>
                  <h6>Contact Number: <b>{e.contact}</b></h6>
                  <h6>Ticket Number:<b> {e.TicketNumber}</b></h6>
                  <h6>Email: <b>{e.email}</b></h6>
                  <h6>Location: <b>{e.Location}</b></h6>
                  {/* <h6>Ticket Status: <b>{e.TicketStatus}</b>
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 mx-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleButtonClick}  disabled={status === 'Close'}>
                        {status === 'Open' || status==="Reopen" || status==="Reopen By User" ? 'Close Ticket' : 'Reopen Ticket'}
                      </button>
                    </h6> */}
                </>
              )
            })
          }
        </div>
      </div>

      <h1 className='text-2xl text-center text-black bg-slate-300'>Ticket Chat</h1>
      <div className='chatbox' id='chatbox'>
        <hr></hr>
        <div id='AI'>
          {Array.isArray(messagelog) && messagelog.map((items) => {
            return displaymessages(items)
          })}
        </div>
      </div>


      <div style={{ display: 'inline-flex' }} className='input-container1'>
        <div id="w-input-container" >
          <div className="w-input-text-group">
            <div id="w-input-text" contentEditable onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const text = e.currentTarget.innerText.trim();
              }
            }} onChange={(e) => setmessagetext(e.currentTarget.innerHTML)} ></div>

          </div>
        </div>
        <button className="buttonsub" onClick={send} type="button"></button>
      </div>

    </div>
  )
}

export default page
