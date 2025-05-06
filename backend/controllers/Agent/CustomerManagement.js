const connection = require("../../database/db");

async function CustomerManagement(req, res) {
  console.log(req.body);
  const {
    PMCNumber,
    FullName,
    FatherorGaurdianName,
    ContactNumber,
    AadharNumber,
    // PanNumber,
    Plot_No,
    TotalArea,
    // Area_Use,
    Talo_ki_Sankhya,
    PropertyType,
    PropertyAge,
    // PropertyforUse,
    location,
    OtherLocation,
    // Address,
    Ward,
    Zone,
    Mohalla,
    Meter,
 ConstructionType,
    ElectricityConnection,
    WaterConnection,
   SewerConnection,
    // locality,
    documentinformation,
    repeatedData,
    TotalArv,
    createdBy,
  } = req.body;
  console.log(TotalArv);
  const uniq = Mohalla+"/"+Ward+"/"+Zone+"/"+Meter
  const propertyID = Date.now().toString().slice(0, 10);
  const createdOn = new Date().toISOString().slice(0, 19).replace("T", " ");
  let PropertyTax = Number(TotalArv) * 11/100;
  let WaterTax= Number(TotalArv) * 16.5/100;
  try {
    const files = req.files;
    const data = JSON.parse(documentinformation);
    var Store = [];
    data.forEach((item, index) => {
      const keys = Object.keys(item);
      files.forEach((y) => {
        if (keys[0] == y.originalname) {
          let nam = y.filename;
          let value = item[keys[0]];
          Store.push({ [nam]: value });
        }
      });
    });
    // let localitydata = new Promise((resolve, reject) => {
    //   connection.query(
    //     "SELECT * FROM `localityrates` WHERE `uniqueness`=?",
    //     [locality],
    //     (err, result) => {
    //       console.log(err);
    //       resolve(result[0]);
    //     }
    //   );
    // });
    // const { id, Ward, Zone, uniqueness } = await localitydata;

    const createCustomerQuery =
      "INSERT INTO `customers`( `PropertyID`,`PMCNumber`, `FullName`,`FatherorGaurdianName`,`ContactNumber`,`Plot_No`, `TotalArea`, `Talo_ki_Sankhya`,`PropertyType`, `PropertyAge`,  `Ward`, `Zone`, `Meter`,Mohalla, ConstructionType,ElectricityConnection,WaterConnection,SewerConnection,AadharNumber,location,OtherLocation,locality,uniqueness,TotalArv,PropertyTax,WaterTax,createdBy,createdOn ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const query2 =
      "INSERT INTO `customerdocs`(`CustomerID`, `Document_Name`, `Doc_id`, `ApprovalStatus`, `UniqueStatus`) VALUES (?,?,?,?,?)";
    const values = [
      propertyID,
      PMCNumber,
      FullName,
      FatherorGaurdianName,
      ContactNumber,
      Plot_No,
      TotalArea,
      Talo_ki_Sankhya,
      PropertyType,
      PropertyAge,
      // location,
      // Address,
      Ward,
      Zone,
      Meter,
      Mohalla,
      ConstructionType,
      // locality,
      ElectricityConnection,
      WaterConnection,
      SewerConnection,
      // uniqueness,
      AadharNumber,
      location,
      OtherLocation,
      uniq,
      uniq,
      TotalArv,
      PropertyTax,
      WaterTax,
      createdBy,
      createdOn 
    ];
    connection.query(createCustomerQuery, values, (error, results) => {
      if (error) {
        console.error(error);
        res
          .status(400)
          .json({ error: "Internal Server Error", message: error.message });
      } else {
        repeatedData.forEach((floor) => {
          const { Floor, sqft, PropertyforUse,ConstructionType, Arv } = floor;
          const insertFloorQuery = "INSERT INTO `customerarea` (`CustomerID`, `Floor`, `sqft`, `PropertyforUse`,`ConstructionType`, `Arv`) VALUES (?,?,?,?,?,?)";
          const floorValues = [propertyID, Floor, sqft, PropertyforUse,ConstructionType, Arv];
          
          // Execute the insert query for each floor
          connection.query(insertFloorQuery, floorValues, (err, result) => {
            if (err) {
              console.error("Error inserting floor data:", err);
            }
          });
        });

        Store.forEach((e) => {
          const keys = Object.keys(e);
          let value = e[keys[0]];
          connection.query(
            query2,
            [propertyID, keys[0], value, false, propertyID + keys[0]],
            (err1, results1) => {
              if (err1) {
                console.log(err1);
              }
            }
          );
        });
        res.status(201).json({
          message: "Customer created successfully",
          PropertyID: propertyID,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}




function GetCustomer(req, res) {
  const { ConsumerNo } = req.body;
  let query = "select * from customers where PropertyID=?";
  let query1 = "select * from customerdocs where CustomerID=?"
  connection.query(query, [ConsumerNo], (error, results) => {
    if (results) {
      connection.query(query1, [ConsumerNo], (error1, results1) => {
        if (error1) {
          res.json(error)
        } else {
          let obj = {
            customer: results,
            docs: results1
          }
          res.status(200).json(obj)
        }
      })
    } else {
      res.json(error);
      console.log(error);
    }
  });
}





function GetCustomerData(req, res) {
  const { ConsumerNo } = req.body;
  let query = "select * from customers where PropertyID=? ";
  connection.query(query, [ConsumerNo], (error, results) => {
    if (results) {
      res.status(200).json(results)
    } else {
      res.json(error);
      console.log(error);
    }
  });
}





function GetCustomerList(req, res) {
  const { locality,createdBy } = req.body;
  let query = "SELECT * FROM `customers`  WHERE customers.uniqueness=? AND customers.createdBy=?";
  connection.query(query, [locality,createdBy], (error, results) => {
    if (results) {
      res.status(200).json(results)
    } else {
      res.json(error);
      console.log(error);
    }
  });
}







module.exports = {
  GetCustomerList,
  CustomerManagement,
  GetCustomer,
  GetCustomerData,
};