const About = () => {
  return (
    <>
      <section
        className="custom_panel_1"
        id="aboutus"
        // style={{ background: "#f5f9fc" }}
      >
       <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <div
            className="col-4"
            style={{ textAlign: "justify", fontSize: "1.2rem" }}
          >
            <strong>
              स्थापना वर्ष -१९४२
              {/* <span className="star_line">
                <img
                  src="https://nppnanpara.com/public/images/star.png"
                  alt=""
                />
              </span> */}
            </strong>
            <h2>
              नगर पालिका परिषद्
              {/* <span className="star_line">
                <img
                  src="https://nppnanpara.com/public/images/star.png"
                  alt=""
                />
              </span> */}
            </h2>
            <strong>बलिया उत्तर प्रदेश</strong>
            <div
              className="card c1"
              style={{
                width: "20rem",
                marginBottom: "1rem",
                marginTop: "1rem",
                textAlign: "center",
                boxShadow: "1px 0 10px 3px",
                background: "#ecf4f5"
              }}
            >
             <div style={{ padding: "10px" }}>
                <img src="/team photo/photo.png" />
              </div>
              <div className="card-body">
                <h5>District Magistrate</h5>
                <h6>
                  <b>Shivasharanappa G N </b>
                </h6>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-left"
            className="col-7"
            style={{ textAlign: "justify", fontSize: "1.2rem" }}
          >
            <p>
              {" "}
              बलिया (Ballia) भारत के उत्तर प्रदेश राज्य के बलिया ज़िले में स्थित एक नगर है। यह उस ज़िले का मुख्यालय भी है। यह दो नदियों, गंगा और घाघरा, के संगम के समीप बसा हुआ है। यह वाराणसी से 140 किमी और राज्य राजधानी, लखनऊ, से 380 किमी पूर्व में, बिहार की राज्य सीमा से 4 किमी दूर स्थित है।
             {" "}इस शहर की पूर्वी सीमा गंगा और सरयू के संगम द्वारा बनायी जाती है। यह शहर वाराणसी से 140 किलोमीटर, लखनऊ से 390 किलोमीटर, गोरखपुर से 165 किलोमीटर और देश की राजधानी नई दिल्ली से 900 किलोमीटर की दुरी पर स्थित है। भोजपुरी यहाँ की प्राथमिक स्थानीय भाषा है। यह क्षेत्र गंगा और घाघरा के बीच के जलोढ़ मैदानों में स्थित है। अक्सर बाढ़ग्रस्त रहने वाले इस उपजाऊ क्षेत्र में चावल, जौ, मटर, ज्वार-बाजरा, दालें, तिलहन और गन्ना उगाया जाता है। शहर की पूर्वी सीमा गंगा और घाघरा के संगम में निहित है। वहाँ पर एक बहुत प्रसिद्ध भगवती जी का मन्दिर है जो रेवती के बगल में एक छोटे गाँव सोभनाथपुर में स्थित है।बलिया एक प्राचीन शहर है। भारत के कई महान संत और साधु जैसे जमदग्नि, वाल्मीकि, भृगु, दुर्वासा आदि के आश्रम बलिया में थे। बलिया प्राचीन समय में कोसल साम्राज्य का एक भाग था। यह भी कुछ समय के लिए बौद्ध प्रभाव में आया था। पहले यह् गाजीपुर जिले का एक हिस्सा था, लेकिन बाद में यह जिला हो गया। यह राजा बलि की धरती मानी जाती हैं। उन्ही के नाम पर इसका नाम बलिया पड़ा। 1942 के अंग्रेजो भारत छोड़ो आन्दोलन के वक़्त बलिया के क्रांतिकारियों ने चित्तू पाण्डे के नेतृत्व में बलिया को आजाद करा लिया गया था।चित्तू पाण्डे के नेतृत्व में स्वतंत्र सरकार की स्थापना कर ली गई थी।</p>
          </div>
        </div>
      </section>
    </>
  );
};
export default About;
