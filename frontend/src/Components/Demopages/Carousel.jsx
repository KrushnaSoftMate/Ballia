import React from "react";

const Carousel = () => {
  return (
    <>
   <section  style={{ padding: '1rem', marginBottom: "20px",backgroundColor: "#f5f9fc" }}>
      <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" >
          <div className="carousel-item active">
            <img src="/Slider Images/Ballia-railway-station.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/Slider Images/BHILAI-STEEL-PLANT.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/Slider Images/Nath-Baba-Temple-Ballia.png" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          id="nextbtn"
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </section>
    </>
  );
};

export default Carousel;
