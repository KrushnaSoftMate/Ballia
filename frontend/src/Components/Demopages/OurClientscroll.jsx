const OurClient = () => {
  return (
    <>
      <section
        className="our_client aos-init aos-animate"
        data-aos="fade-right"
        id="clients"
      >
        <div
          style={{
            height: "26vh",
            width: "90vw",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "auto",
            margin: "auto",
            padding:"6px"
          }}
        >
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/Digital-India.png" alt="" />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/MAKE-IN-INDIA.png" alt="" />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/india.gov.in.png" alt="" />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img
              style={{ height: "8rem" }}
              src="/GOI-Web-Directory.png"
              alt=""
            />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/data.gov.in.png" alt="" />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/My-Gov.png.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};
export default OurClient;
