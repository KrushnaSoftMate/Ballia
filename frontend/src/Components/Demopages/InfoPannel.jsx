import React from 'react';

const InfoPanel = () => {
  return (
    <section className="custom_panel_2" id="infopannel">
      <div className="container">
        <div className="panel_2_block aos-init aos-animate" data-aos="fade-right">
          <h3>Press Release</h3>
          <div className="cont_box">
            <ul>
              <li>
                <a href="#">N/A →</a>
              </li>
              {/* Uncomment below for additional links */}
              {/* <li>
                <a href="#" className="readMore">Read More →</a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="panel_2_block aos-init aos-animate" data-aos="fade-left">
          <h3>Tenders</h3>
          <div className="cont_box">
            <ul>
              <li>
                <a href="#">N/A →</a>
              </li>
              {/* Uncomment below for additional links */}
              {/* <li>
                <a href="#" className="readMore">Read More →</a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoPanel;
