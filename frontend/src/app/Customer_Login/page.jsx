'use client'
import { useRouter } from "next/navigation";
export default function Login() {
    const navigate = useRouter();
    // const handlelogin=()=>{
    //     navigate.push('../Customer/')
    // }
    return (
        <div style={{ display: 'flex',justifyContent:'space-evenly',padding:'12px'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div  style={{width:'600px',borderRadius:'20px',boxShadow:'1px 3px 7px',height:'50rem'}}>
                    <div style={{ display: 'flex',justifyContent:'center' ,paddingTop:"4px" }}>
                        <img src="/UP-Logo.png" alt="Logo" style={{ width: '5rem' }} /><br />
                        <h3 className="fw-bold" style={{ color: "#001f67", fontSize: "2rem",marginTop:'10px' }}>नगर पालिका परिषद्,</h3><br />
                        <h5></h5>
                    </div>
                    <div className="mt-10" style={{marginTop:'2rem'}}>
                        <h2 className="fw-bold" style={{ textAlign: 'center' }}>Login</h2>
                        <p className="fw-normal" style={{ paddingTop: '3rem',textAlign:'center' }}>To continue, please enter your email address and password</p>
                    </div>
                    <form className="mt-5 justifyContent-center" style={{ marginTop: '3rem' }}>
                        <div style={{marginLeft:'6rem'}}>
                            <label>Email Address</label><br />
                            <input type="email" placeholder="Enter Email Address"className="form-control mt-2 " style={{width:'25rem',height:'2.7rem'}} /><br />
                        </div>
                        <div style={{marginLeft:'6rem'}}>
                            <label>Password</label><br />
                            <input type="password" placeholder="Enter Password"className="form-control mt-2" style={{width:'25rem',height:'2.7rem'}}/><br />
                        </div>
                        <div className="flex justifyContent-center my-10">
                        <h6 style={{ textAlign: 'center',margin:'2rem' }}>Forget Password?</h6>
                        </div>
                    <div style={{textAlign:'center'}}>
                    <button className="fw-bold" style={{ width:'15rem',height:'4rem',borderRadius:'5rem' ,color:'black'}}>
                       <a href="/Customer">Login</a>
                       </button>
                       </div>

                       {/* <div style={{textAlign:'center'}}>
                       <button className="fw-bold" style={{ width:'15rem',height:'4rem',borderRadius:'5rem'}}>Login</button>
                       </div> */}
                        <div style={{textAlign:'center',paddingTop:'4rem'}}>
                        <p>I don’t have an account? Sign Up</p>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <img src="/sliderimg.png" style={{height:'50rem',borderRadius:'20px',width:'600px'}}/>
            </div>
        </div>
    );
}
 