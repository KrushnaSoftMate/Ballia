import React from "react";

const GalleryTabPanel = () => {
  return (<>

    <br></br>
    <section
      className="banner aos-init aos-animate mt-1"
      data-aos="fade-left"
      id="gallary"
      style={{ background: "#f5f9fc", paddingTop: "20px", height: "auto" }}
    >
      <nav className="gallery_nav" style={{ backgroundColor: "#fc3e04", height: "20%", borderRadius: "10px", alignItems: "center", margin: "0px 30px 30px 80px", width: "14%", padding: "3px", color: "white", textAlign: "center" }}>
        <h4>Photo Gallery</h4>
      </nav>
      <div
        id="carouselExample2"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item  active">
            <img
              src="/Icons & Images/Ballia-Slider-New1.png"
              style={{ width: '90%', display: 'block', margin: "auto" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/Icons & Images/Ballia-Slider-New2.png"
              style={{ width: '90%', display: 'block', margin: "auto" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample2"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          id="nextbtn"
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample2"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  </>
  );
};

export default GalleryTabPanel;
