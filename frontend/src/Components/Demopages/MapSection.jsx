import React from "react";

const MapSection = () => {
  return (
    <>
      <section
        className="map_display aos-init"
        data-aos="fade-left"
        data-aos-offset="500"
        id="location"
      >
        <div className="container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3635788.814623532!2d80.85930415!3d27.138192749999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39994e9f7b4a09d3%3A0xf6a5476d3617249d!2sUttar%20Pradesh!5e0!3m2!1sen!2sin!4v1732538953364!5m2!1sen!2sin"
            width="40%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
        </div>
      </section>
    </>
  );
};
export default MapSection;
