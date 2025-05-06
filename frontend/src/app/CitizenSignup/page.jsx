"use client"
import React, { useState, useContext } from 'react';
import { Customer } from '@/app/AdminContext/CustomerManagement'

const CitizenSignUp = () => {
  const { CitizenSignup } = useContext(Customer)
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: ""
  })
  const togglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let data = await CitizenSignup(formData)
    console.log(data)
    if (data == "true") {
      alert("Signup successfully");
      window.location.href = "/CitizenLogin";
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
      {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div style={{ width: '600px', borderRadius: '20px', boxShadow: '1px 3px 7px', height: '55rem', padding: '30px', justifyContent: 'center' }}>
            <div className="mt-10" style={{ marginTop: '2rem' }}>
              <h1 className="fw-bold">Sign up</h1>
              <p className="fw-normal"><b>To continue, please enter your email address and password</b></p>
            </div>
            <form style={{ marginTop: '3rem' }} onSubmit={handleSubmit}>
              <div>
                <label>Full Name</label>
                <input type="text" placeholder="Enter Full Name" name='fullname' style={{ width: "100%", height: "60px", border: "1px solid #B1B6C6", outline: "none", borderRadius: "16px", paddingLeft: "19px", marginTop: "5px" }} onChange={handleChange} />
              </div>
              <div>
                <label>Email Address</label>
                <input type="email" placeholder="Enter Email Address" name='email' style={{ width: "100%", height: "60px", border: "1px solid #B1B6C6", outline: "none", borderRadius: "16px", paddingLeft: "19px", marginTop: "5px" }} onChange={handleChange} maxLength={25} />
              </div>
              <div>
                <label>Mobile Number</label>
                <input type="tel" placeholder="Enter Mobile Number" name='mobile' style={{ width: "100%", height: "60px", border: "1px solid #B1B6C6", outline: "none", borderRadius: "16px", paddingLeft: "19px", marginTop: "5px" }} onChange={handleChange} maxLength={10} />
              </div>
              <div className="my-3">
                <label>Password</label><br />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    placeholder="Enter Password"
                    onChange={handleChange}
                    style={{ width: "100%", height: "60px", border: "1px solid #B1B6C6", outline: "none", borderRadius: "16px", paddingLeft: "19px", marginTop: "5px" }}
                  />
                  <img
                    id="togglePassword"
                    src={showPassword ? "/View32.png" : "/View-Hide32.png"}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '2rem',
                      cursor: 'pointer'
                    }}
                    onClick={togglePassword}
                    alt="Toggle Password Visibility"
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '3rem' }}>
                <button className="fw-bold" type="submit" style={{ height: '60px', width: '374px', textAlign: 'center', backgroundColor: '#6179c8', color: '#FFFFFF', borderRadius: '3rem', border: 'none' }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(0.98)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                ><b>Sign Up</b></button>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
                You have an account?
                <a href="/CitizenLogin" style={{ color: 'red', display: 'inline-block', transition: 'transform 0.2s ease-in-out', }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}>Login</a>
              </div>
            </form>
          </div>
        </div>
        <div>
          <img src="/loginsliderimg.png" />
        </div>
      </div> */}



      <div className="col-12 ps-0">
        <div className="row">

          <div className="col-7 ps-0">
            <div className="ps-0" style={{
              width: "90%",
              height: "100vh",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              borderTopRightRadius: "190px",
              borderBottomRightRadius: "190px",
            }}>
              <img src="/LoginsignupdesignforLandingPage.png" className="img-fluid" style={{ width: "102%", height: "100%" }} />

            </div>
          </div>

          <div className="col-5 my-auto">


            <div className="col-12">

              <div className="col-10 m-auto py-3" style={{
                boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.74)",
                borderRadius: "20px"
              }}>
                <div className="col-12 m-auto">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <img src="/BALLIA-Logo512.png" alt="Logo" style={{ width: '5rem', height: '5rem' }} />
                      <br />
                    </div>

                    <p className="my-auto ms-2" style={{ width: "40%", fontSize: "18px", fontWeight: "700" }}>
                      BALLIA MUNICIPAL CORPORATION
                    </p>

                  </div>
                </div>

                <div className="col-9 m-auto text-center my-3">
                  <h3 className="fw-bold">Customer Login</h3>
                </div>


                <div className="col-12 m-auto">
                  <form onSubmit={handleSubmit}>

                    <div className="col-12 my-3">
                      <label className="col-12 fw-bold">Full Name</label>

                      <div className="col-12 px-3">
                        <input className="col-12 py-2 px-2" type="text" placeholder="Enter Full Name" onChange={handleChange} name='fullname' value={formData.fullname}
                          style={{ border: 'none', borderBottom: "1px solid black", backgroundColor: "#FFF6CD" }}
                        />
                      </div>
                    </div>

                    <div className="col-12 my-3">
                      <label className="col-12 fw-bold">Email Address</label>

                      <div className="col-12 px-3">
                        <input className="col-12 py-2 px-2" type="email" placeholder="Enter Email Address" onChange={handleChange} name='email' value={formData.email}
                          style={{ border: 'none', borderBottom: "1px solid black", backgroundColor: "#FFF6CD" }}
                        />
                      </div>
                    </div>

                    <div className="col-12 my-3">
                      <label className="col-12 fw-bold">Mobile Number</label>

                      <div className="col-12 px-3">
                        <input className="col-12 py-2 px-2" type="tel" placeholder="Enter Mobile Number" onChange={handleChange} name='mobile' value={formData.mobile}
                          style={{ border: 'none', borderBottom: "1px solid black", backgroundColor: "#FFF6CD" }}
                        />
                      </div>
                    </div>

                    <div className="col-12 my-3">
                      <label className="col-12 fw-bold" >Password</label>

                      <div className="col-12 px-3">
                        <input className="col-12 py-2 px-2" type={showPassword ? "text" : "password"} placeholder="Enter Password" onChange={handleChange} name="password" value={formData.password}
                          style={{ border: 'none', borderBottom: "1px solid black", backgroundColor: "#FFF6CD" }}
                        />

                        <span
                          onClick={togglePasswordVisibility}
                          style={{
                            position: 'absolute',
                            right: '30px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontSize: '18px',
                            display: "flex",
                          }}
                        >
                          <img

                            src={showPassword ? "/View32.png" : "/View-Hide32.png"}
                            style={{
                              width: '60%',
                              cursor: 'pointer'
                            }}
                            onClick={togglePassword}
                            alt=" Password Visibility"
                          />
                        </span>

                      </div>
                    </div>

                    <div className="col-12 text-center my-3" >
                      <button
                        className="col-10"
                        type="submit"
                        style={{
                          borderRadius: "50px", border: "none", fontSize: "23px",
                          color: "white", fontWeight: "400", padding: "8px 20px",
                          background: "linear-gradient(to right , #F1881B , #F1881B , #F0711C , #EF4E1E)"

                        }}
                      >Sign Up &gt;&gt;
                      </button>
                    </div>

                    <div className="col-12 my-3">
                      <p className="text-center">
                        You have an account ?
                        <a href="/CitizenLogin" style={{ color: 'red', display: 'inline-block', transition: 'transform 0.2s ease-in-out', }}
                          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}> <ins>Login</ins></a>
                      </p>
                    </div>
                  </form>

                </div>

              </div>


            </div>
          </div>


        </div>
      </div>

    </>
  );
};

export default CitizenSignUp;

