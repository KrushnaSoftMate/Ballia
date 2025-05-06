const connection = require("../../database/db");
const cluster = require('cluster');
const path = require('path');
const { fork } = require('child_process');
// const path = require('path');
const fs = require('fs')
const {
  CalculateBill,
  GenerateBillCalcultion,
  CalculateBillForBulkBill,
  UpdateBillCalcultion
} = require("../../Math/BillCalculation");
const { parentPort, Worker, workerData } = require('worker_threads')
// const {Working}=require('../../threads/BulkBillGeneration')
const crypto = require('crypto');
const { GeneratePDF } = require("../../helper/util/bulkpdf");

async function CustomerManagement(req, res) {
  const { FullName, FatherorGaurdianName, ContactNumber, AadharNumber, PanNumber, Plot_No, TotalArea, Area_Use, TotalARV, Talo_ki_Sankhya, PropertyType, PropertyAge, location, Address, Meter, locality, ConstructionType, localityrate, documentinformation, ElectricityConnection, WaterTaxConnection, SewerConnection } = req.body;

  const wards = {
    "wards": [
      { "name": "jagdishpur", "code": "0001" },
      { "name": "bankata", "code": "0002" },
      { "name": "kazipura harijan Basti", "code": "0003" },
      { "name": "vijayipur", "code": "0004" },
      { "name": "amrtapaalee", "code": "0005" },
      { "name": "midda", "code": "0006" },
      { "name": "harpur", "code": "0007" },
      { "name": "oktenaganj", "code": "0008" },
      { "name": "japlin ganj", "code": "0009" },
      { "name": "bhrigu ashram", "code": "0010" },
      { "name": "krishna nagar", "code": "0011" },
      { "name": "civil line", "code": "0012" },
      { "name": "rampur udaybhan", "code": "0013" },
      { "name": "rajput newari", "code": "0014" },
      { "name": "tagore nagar", "code": "0015" },
      { "name": "bhrigu ashram", "code": "0016" },
      { "name": "shastri nagar", "code": "0017" },
      { "name": "japling ganj", "code": "0018" },
      { "name": "jagdishpur", "code": "0019" },
      { "name": "vijaypur", "code": "0020" },
      { "name": "rajendra nagar", "code": "0021" },
      { "name": "satni sarai", "code": "0022" },
      { "name": "vishwin pur", "code": "0023" },
      { "name": "chaman singh baagroad", "code": "0024" },
      { "name": "jange Ali", "code": "0025" },
      { "name": "aaryasamaaj road", "code": "0026" }, //
      { "name": "kaajeepoora kasaav tola", "code": "0027" }, //
      { "name": "kaasheepur", "code": "0028" },//
      { "name": "kaasim baajaar", "code": "0029" },//
      { "name": "gaandhee nagar", "code": "0030" },//
      { "name": "gudaree baajaar", "code": "0031" },//
      { "name": "chauk", "code": "0032" },//
      { "name": "nyooree taal ke bigahee", "code": "0033" },//
      { "name": "bedua", "code": "0034" },//
      { "name": "yaarapur", "code": "0035" },//
      { "name": "lohaapattee", "code": "0036" },//
      { "name": "gudaree baajaa", "code": "0037" },//
      { "name": "subhaash nagar", "code": "0038" }//
    ]
  }


  console.log("Locality :L: ", locality);

  const ward = wards.wards.find(ward => ward.name.toLowerCase() == locality.toLowerCase());

  if (!ward) {
    throw new Error(`Ward not found for locality: ${locality}`);
  }

  const getLastThreeDigits = (code) => code.slice(-3);
  console.log("Last Three digit value", getLastThreeDigits);

  const wardCode = getLastThreeDigits(ward.code);
  console.log(`Matched Ward Code: ${wardCode}`);

  // Fetch the latest serial number for the PropertyID
  let serialNumberQuery = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT Srno AS lastSerial, PropertyID, 
                RIGHT(LEFT(PropertyID, LENGTH(PropertyID) - 1), 6) AS last6DigitsSkippedLast 
         FROM customers 
         WHERE Srno = (SELECT MAX(Srno) FROM customers);`,  // Ensures only the row with the highest Srno is retrieved
      (err, result) => {
        if (err) reject(err);
        resolve(result[0]?.last6DigitsSkippedLast || 0);  // Default to 0 if no records exist
      }
    );
  });

  let serialNumber = Number(serialNumberQuery) + Number(1);
  console.log("Serial Number:", serialNumber);

  // Validate serial number
  if (isNaN(serialNumber) || serialNumber < 0 || serialNumber > 999999) {
    throw new Error("Invalid serial number! It must be between 000000 and 999999.");
  }

  // Generate Property ID
  let propertyID = `0958101${wardCode}${String(serialNumber).padStart(6, '0')}${PropertyType === "1" ? "R" : "C"}`;
  console.log("Generated Property ID:", propertyID);
  // Example Usage

  const createdOn = new Date().toISOString().slice(0, 19).replace("T", " ");
  const file = req.files
  console.log(file);
  // let localities = locality.replace(/\s/g, '');
  const unq = locality + " " + '/' + Meter
  console.log("unq", unq);

  let ConstructionTypeRate = ConstructionType + "/" + localityrate

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
    let localitydata = new Promise((resolve, reject) => {
      connection.query("SELECT * FROM `localityrates` WHERE `uniqueness`=?", [unq], (err, result) => {
        console.log(err);
        console.log("dsgg", result)
        resolve(result[0]);
      }
      );
    });
    const { Ward, uniqueness } = await localitydata;
    console.log("localitydata", Ward);

    const createCustomerQuery =
      "INSERT INTO `customers`( `PropertyID`, `FullName`,`FatherorGaurdianName`,`ContactNumber`,`AadharNumber`,`PanNumber`, `Plot_No`, `TotalArea`, `Area_Use`,`TotalARV`, `Talo_ki_Sankhya`, `PropertyType`,`PropertyAge`, `location`, `Address`, `Meter`, `locality`,`uniqueness`,`ConstructionType`,`ElectricityConnection`,`WaterTaxConnection`,`SewerConnection`,`createdOn`,`Ward`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const query2 =
      "INSERT INTO `customerdocs`(`CustomerID`, `Document_Name`, `Doc_id`, `ApprovalStatus`, `UniqueStatus`) VALUES (?,?,?,?,?)";
    const values = [propertyID, FullName, FatherorGaurdianName, ContactNumber, AadharNumber, PanNumber, Plot_No, TotalArea, Area_Use, TotalARV, Talo_ki_Sankhya, PropertyType, PropertyAge, location, Address, Meter, locality, uniqueness, ConstructionType, ElectricityConnection, WaterTaxConnection, SewerConnection, createdOn, Ward];

    connection.query(createCustomerQuery, values, (error, results) => {
      if (error) {
        console.error(error);
        res.status(400).json({ error: "Internal Server Error", message: "Customer Not Created" });
      } else {
        Store.forEach((e) => {
          const keys = Object.keys(e);
          let value = e[keys[0]];
          connection.query(query2, [propertyID, keys[0], value, false, propertyID + keys[0]], (err1, results1) => {
            if (err1) {
              console.log(err1);
            }
          });
        });
        res.status(201).json({
          message: `Customer Created Successfully !! Your ID : ${propertyID}`, PropertyID: propertyID,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}


async function UpdateCustomer(req, res) {
  const {
    PropertyID,
    FullName,
    FatherorGaurdianName,
    ContactNumber,
    AadharNumber,
    PanNumber,
    Plot_No,
    TotalArea,
    Area_Use,
    TotalARV,
    Talo_ki_Sankhya,
    PropertyType,
    PropertyAge,
    location,
    Address,
    Meter,
    locality,
    ConstructionType,
    documentinformation,
    ElectricityConnection,
    WaterTaxConnection,
    SewerConnection,
  } = req.body

  let localities = locality.replace(/\s/g, '');
  const unq = localities + " " + '/' + Meter
  let datacustomer = new Promise((resolve, reject) => {
    let query = 'SELECT * FROM `customerdocs` WHERE `CustomerID`=?'
    connection.query(query, [PropertyID], (err, result) => {
      if (result) {
        resolve(result);
      }
    })
  })
  let customerdocs = await datacustomer;
  console.log("Customer Document :: ", customerdocs);

  customerdocs.map((x) => {
    if (x) {
      try {
        fs.unlinkSync('public/client/' + x.Document_Name);

      } catch (error) {
        console.log(error);
      }

    }
    else {
      console.log('some error');
    }
  })


  const query2 =
    "INSERT INTO `customerdocs`(`CustomerID`, `Document_Name`, `Doc_id`, `ApprovalStatus`, `UniqueStatus`) VALUES (?,?,?,?,?)";
  let queryupdate = 'UPDATE `customers` SET `FullName`=?,`FatherorGaurdianName`=? , `ContactNumber`=?, `AadharNumber`=? ,`PanNumber`=?,`Plot_No`=?,`TotalArea`=?,`Area_Use`=?,`TotalARV`=?,`Talo_ki_Sankhya`=?,`PropertyType`=?,`PropertyAge`=?,`location`=?,`Address`=?,`Meter`=?,`locality`=?,`ConstructionType`=? WHERE `PropertyID`=?'

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
  let localitydata = new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `localityrates` WHERE `uniqueness`=?",
      [unq],
      (err, result) => {
        console.log(err);
        resolve(result[0]);
      }
    );
  });
  const { id, Ward, Zone, uniqueness } = await localitydata;
  Store.forEach((e) => {
    const keys = Object.keys(e);
    let value = e[keys[0]];
    connection.query('DELETE FROM `customerdocs` WHERE `CustomerID`=?', [PropertyID], (err1, result1) => {
      if (result1) {
        connection.query(
          query2,
          [PropertyID, keys[0], value, false, PropertyID + keys[0]],
          (err2, results1) => {
            if (err2) {
              console.log(err2);
              res.json(err2);
              return;
            }

          }
        );
      }
      else {
        throw (err1);
      }
    })

  });

  connection.query(queryupdate, [
    // PropertyID,
    FullName,
    FatherorGaurdianName,
    ContactNumber,
    AadharNumber,
    PanNumber,
    Plot_No,
    TotalArea,
    Area_Use,
    TotalARV,
    Talo_ki_Sankhya,
    PropertyType,
    PropertyAge,
    location,
    Address,
    Meter,
    locality,
    ConstructionType,
    // documentinformation,
    PropertyID], (err, result) => {
      if (err) {
        throw err;
      }
      else {
        res.status(200).json("Customer Update Successfully ");
      }
    })


}

async function CustomerListUpload(req, res) {
  const file = req.file;
  const filename = file.filename
  const filePath = path.resolve(__dirname, '..', '..' + '/public/CustomerExcel/' + filename);
  console.log(filePath);
  const fileStream = fs.createReadStream(filePath)
  console.log(fileStream);
  const importQuery = `
    LOAD DATA LOCAL INFILE ?
    INTO TABLE customers
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\\n'
    IGNORE 1 ROWS;
  `;

  connection.query(importQuery, [fileStream], (importErr, results) => {
    if (importErr) {
      console.error('Error importing data:', importErr);
      res.json(importErr)
    } else {
      console.log('CSV data imported successfully' + results);
      console.log(results)
      res.json(results)
    }
  })
}

function GetCustomer(req, res) {
  const { ConsumerNo } = req.body;

  // Queries
  const queryCustomer = "SELECT * FROM customers WHERE PropertyID=?";
  const queryDocs = "SELECT * FROM customerdocs WHERE CustomerID=?";
  const querybill = "SELECT * FROM customerbillbreakdown WHERE PropertyID=?";
  const queryArea = "SELECT * FROM customerarea WHERE CustomerID=?";

  // Execute first query for customer
  connection.query(queryCustomer, [ConsumerNo], (errorCustomer, customerResults) => {
    if (errorCustomer) {
      return res.status(500).json({ error: "Error fetching customer data", details: errorCustomer });
    }

    // Execute second query for area
    connection.query(querybill, [ConsumerNo], (errorArea, areaResults) => {
      if (errorArea) {
        return res.status(500).json({ error: "Error fetching area data", details: errorArea });
      }

      // Execute third query for documents
      connection.query(queryDocs, [ConsumerNo], (errorDocs, docsResults) => {
        if (errorDocs) {
          return res.status(500).json({ error: "Error fetching documents data", details: errorDocs });
        }

        connection.query(queryArea, [ConsumerNo], (error2, result2) => {


          if (error2) {
            throw error2;
          }

          // Combine all results into an object and send the response
          const response = {
            customer: customerResults,
            bill: areaResults,
            docs: docsResults,
            area: result2
          };

          res.status(200).json(response);

        }
        )
      });
    });
  });
}


async function BillCalculation(req, res) {
  const { locality, Meter, Area_Use, PropertyType, TotalARV, WaterTaxConnection, uniqueness } = req.body?.ConsumerNo;
  console.log("backend", locality,
    Meter,
    PropertyType,
    Area_Use,
    TotalARV,
    WaterTaxConnection, uniqueness, Meter);
  const unq = locality + " " + '/' + Meter
  let query =
    "SELECT * FROM `localityrates` WHERE `uniqueness`=?";
  const data = new Promise((resolve, reject) => {
    connection.query(query, [unq],
      (error, results) => {
        console.log("query", results)
        if (results) {
          if (results.length > 0) {
            resolve(results);
          } else {
            reject(false);
          }
        } else {
          console.log(error);
          reject(error);
        }
      }
    );
  })
    .then(async (data) => {
      console.log("bill", data)
      let TotalCalculation = await CalculateBill(data,
        Area_Use,
        TotalARV,
        WaterTaxConnection);
      res.json(await TotalCalculation);
    })
    .catch(() => {
      res.status(401).json("not authorised ");
    });
}

async function BillCreation(req, res) {
  const cryptoid = crypto.randomUUID()
  const {
    PropertyID,
    FromDate,
    ToDate,
    TotalArea,
    TaxRate,
    Amount,
    LateFees,
    dyanamicgem
  } = req.body;

  let TotalPaymentAmount = Amount;
  const currentDate = new Date(FromDate);
  const fromMonth = currentDate.getMonth() + 1;
  const fromYear = currentDate.getFullYear();
  let BillNumber = PropertyID + '_' + fromMonth + '_' + fromYear;
  console.log(BillNumber);
  const valuestobillbreak = { ...dyanamicgem, Total: TotalPaymentAmount };
  let data = await GenerateBillCalcultion(Amount, PropertyID);
  console.log(data);
  let values = [
    PropertyID,
    BillNumber,
    FromDate,
    ToDate,
    TotalArea,
    TaxRate,
    data.Amount,
    data.DueAmount,
    data.TotalAmount,
    data.PaidAmount,
    data.Remaining,
    cryptoid
  ];
  let querytobillbreak =
    "INSERT INTO `customerbillbreakdown`(`PropertyID`, `BillNumber`,Particulars,Amount) VALUES (?,?,?,?)";
  let querybillinserted =
    "INSERT INTO `bills`(`PropertyID`, `BillNumber`, `FromDate`, `ToDate`, `Area`, `TaxRate`, `Amount`,`DueAmount`, `TotalAmount`, `PaidAmount`,`Remaining`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  let updatecustomer = "UPDATE `bills` SET  `Status` = 'Dump' WHERE `PropertyID`=?";
  let validatiioncheck = 'SELECT * FROM `bills` where BillNumber= ? '

  let validatiioncheckresul = new Promise((resolve, reject) => {
    connection.query(validatiioncheck, [BillNumber], (err, reesult) => {
      if (reesult) {
        console.log(reesult);
        if (reesult?.length > 0) {
          resolve(false);
        } else {
          resolve(true)
        }
      } else {
        console.log(err);
        resolve(false)
      }
    })
  })
  let valicheck = await validatiioncheckresul
  console.log("Validation Check :: ", valicheck)
  if (valicheck) {
    connection.query(updatecustomer, [PropertyID], (err1, result1) => {
      if (result1) {
        connection.query(querybillinserted, values, (error, results) => {
          if (results) {
            Object.keys(valuestobillbreak).map((x) => {

              connection.query(querytobillbreak, [PropertyID, BillNumber, x, valuestobillbreak[x]],
                (err2, result2) => {
                  console.log(err2);
                }
              );
            })

          } else {
            // res.status(500).json(error);
            console.log(error);
            return
          }
        });
      } else {
        // res.status(500).json(err1);
        console.log(err1);
        return
      }
    });
    res.status(200).json(true);
  } else {
    res.status(405).json(false);
    console.log('Duplicate');
  }
}

async function UpdateBill(req, res) {
  const { BillNumber, type } = req.body;
  let query =
    "select * from bills LEFT JOIN customers on customers.PropertyID=bills.PropertyID where bills.PropertyID=? and Status ='NotDump' ";
  let query1 =
    "SELECT Particulars , Amount FROM `customerbillbreakdown` WHERE `PropertyID`=? and BillNumber=?";
  connection.query(query, [BillNumber], (error, results) => {
    if (results) {
      connection.query(
        query1,
        [BillNumber, results[0]?.BillNumber],
        (err1, result1) => {
          if (err1) {
            res.json(error);
          } else {
            let obj = {
              customer: results,
              BillBreakdown: result1,
            };
            res.status(200).json(obj);
          }
        }
      );
    } else {
      res.json(error);
    }
  });
}

async function CustomerUpdateBill(req, res) {
  const {
    Amount,
    OtherLateFees,
    TotalAmountNeedPaid,
    PaidAmount,
    PropertyID,
    BillNumber,
    dynamicdata
  } = req.body;
  console.log("", req.body)

  let queryupdate =
    "UPDATE `bills` SET `Amount`=?,`DueAmount`=?,`TotalAmount`=?,`PaidAmount`=?,`Remaining`=? WHERE `PropertyID`=? and `BillNumber`=?";
  let billupdate = "UPDATE `customerbillbreakdown` SET `Amount`=? WHERE `PropertyID`=? and `BillNumber`=? and `Particulars`=?";
  let data = await UpdateBillCalcultion(BillNumber, Amount, dynamicdata);
  let updatevalue = [data.Newamout, data.DueAmount, data.TotalAmount, data.PaidAmount, data.Remaining, PropertyID, BillNumber];

  connection.query(queryupdate, updatevalue, (err, result) => {
    console.log(result);
    if (result) {
      let Total = 0;
      Object.keys(dynamicdata).map((key) => {
        // Total = Number(dynamicdata[x]) + Number(Total)
        // connection.query(billupdate, [dynamicdata[x], PropertyID, BillNumber, x], (err1, result1) => {
        //   if (result1) { } else {
        //     console.log(err1);
        //   }
        // });
        if (key !== 'DueAmount') {
          Total += Number(dynamicdata[key]);
          connection.query(billupdate, [dynamicdata[key], PropertyID, BillNumber, key], (err1, result1) => {
            if (result1) {
              // Handle successful query if needed
            } else {
              console.log(err1);
            }
          });
        }
      })
      connection.query(billupdate, [Total, PropertyID, BillNumber, 'Total'], (err1, result1) => {
        if (result1) { } else {
          console.log(err1);
        }
      });
    } else {
      console.log(err);
    }
  });
  res.json(true)
}


function GetCustomerData(req, res) {
  const { ConsumerNo } = req.body;
  console.log(req.body);

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

function GetCustomerBillData(req, res) {
  const { ConsumerNo } = req.body;
  console.log(req.body);

  let query = `SELECT customers.*, bills.*
                FROM customers
                JOIN bills ON customers.PropertyID = bills.PropertyID
                WHERE customers.PropertyID = ? `;
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
  const { Zone, Ward, Mohalla, Meter } = req.body;

  let unq = `${Ward}${" "}/${Meter}`
  // QUERY FOR LIVE SERVER
  let query = "Select * from customers WHERE customers.uniqueness = ?";

  connection.query(query, [unq], (error, results) => {
    if (error) {
      res.json(error);
      console.log(error);
    } else {
      // Process the results to format documents as an array
      const formattedResults = results.map(customer => ({
        ...customer,
        documents: customer.documents ? customer.documents.split(',') : []
      }));
      console.log(formattedResults);

      res.status(200).json(formattedResults);
    }
  });

}

function Approvals(req, res) {
  const { condition, customerid, remark } = req.body;
  if (condition == "Rejected") {
    const query = "UPDATE `customers` SET `Approvance`=? , `Remark` = ? WHERE `PropertyID`=?";
    connection.query(query, [condition, remark, customerid], (error, result) => {
      if (result) {
        console.log(result);
        res.status(200).json(true)
      } else {
        res.status(404).json(false)
      }
    });
  }
  else {
    const query = "UPDATE `customers` SET `Approvance`=?  WHERE `PropertyID`=?";
    connection.query(query, [condition, customerid], (error, result) => {
      if (result) {
        console.log(result);
        res.status(200).json(true)
      } else {
        res.status(404).json(false)
      }
    });
  }
}

function BulkApprovals(req, res) {
  const { condition, customerid } = req.body
  console.log("Condition :: ", condition);
  console.log("Customer Id :: ", customerid);

  const query = "UPDATE `customers` SET `Approvance`=?  WHERE `PropertyID`=?";
  connection.query(query, [condition, customerid], (error, result) => {
    if (result) {
      console.log(result);
      res.status(200).json(true)
    } else {
      res.status(404).json(false)
    }
  })
}

// async function BulkBillGeneration(req, res) {
//   try {
//     const { FromDate, ToDate, locality } = req.body
//     console.log("Bulk Bill Process Started ")
//     let querycheck = "SELECT * FROM `bulkbillgeneration`";
//     let data = new Promise((resolve, reject) => {
//       connection.query(querycheck, (err, result) => { resolve(result) })
//     })
//     let datacheck = await data
//     if (datacheck.length > 0) {
//       res.json(false)
//       return
//     }

//     let transferquery = 'INSERT INTO `bulkbillgeneration`(`FromDate`, `ToDate`, `locality`) VALUES (?,?,?)'
//     connection.query(transferquery, [FromDate, ToDate, locality], (err, result) => { err ? console.log(err) : null }
//     )
//     const worker = new Worker('./threads/BulkBillGeneration.js', { name: 'heloo' })
//     res.json("Customers Bill Generated successfully !!!");
//     parentPort.postMessage('done');
//   }
//   catch (err) {
//     console.error(err);
//     parentPort.postMessage('error');
//   }
// }


async function BulkBillGeneration(req, res) {
  try {
    const { FromDate, ToDate, locality } = req.body
    console.log("Bulk Bill Process Started ");

    let querycheck = "SELECT * FROM `bulkbillgeneration`";

    let data = new Promise((resolve, reject) => {
      connection.query(querycheck, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    let datacheck = await data;

    if (datacheck.length > 0) {
      console.log("Duplicated Founded !!!")
      return res.json({ success: false, message: "A bulk bill job is already in progress." });
    };

    await new Promise((resolve, reject) => {
      const insertQuery = 'INSERT INTO `bulkbillgeneration`(`FromDate`, `ToDate`, `locality`) VALUES (?, ?, ?)';
      connection.query(insertQuery, [FromDate, ToDate, locality], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    // const worker = new Worker('./threads/BulkBillGeneration.js', { name: 'heloo' });
    const worker = new Worker('./threads/BulkBillGeneration.js');

    res.json({ success: true, message: "Customers' bills generated successfully!" });


  }
  catch (err) {
    console.error(err);
    // parentPort.postMessage('error');
  }
}



async function CheckGenerationProcess(req, res) {
  let querycheck = "SELECT * FROM `bulkbillgeneration`"
  let data = new Promise((resolve, reject) => {
    connection.query(querycheck, (err, result) => { resolve(result) })
  })

  let datacheck = await data
  // console.log(datacheck)
  res.json(datacheck)

}


// async function BulkBillDownload(req, res) {
//   const { locality, FileName, Number } = req.body;

//   let querycheck = "SELECT * FROM `bulkbilldownload`"
//   let data = new Promise((resolve, reject) => {
//     connection.query(querycheck, (err, result) => { resolve(result) })
//   });

//   let datacheck = await data;

//   if (datacheck.length > 0) {
//     res.json(datacheck)
//     return
//   };

//   let indert = "INSERT INTO `bulkbilldownload`(`locality`, `foldername`, `numberfiles`) VALUES (?,?,?)";

//   connection.query(indert, [locality, FileName, Number], (err, result) => err ? console.log(err) : null)
//   const BD = new Worker('./threads/BulkBillDownload.js')
//   res.json('./public/Assets' + '/' + '.zip')

// }




async function BulkBillDownload(req, res) {
  const { locality, FileName, Number } = req.body;
  console.log("Bulk Bill Generation Start -------------------");
  console.log("Data i Get from Frontend :: ", locality, FileName, Number)

  try {
    let querycheck = "SELECT * FROM `bulkbilldownload`";

    let data = new Promise((resolve, reject) => {
      connection.query(querycheck, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
    });

    let datacheck = await data;

    if (datacheck.length > 0) {
      res.json({ success: false, message: "A bulk download is already in progress." });
      return
    };

    let indert = "INSERT INTO `bulkbilldownload`(`locality`, `foldername`, `numberfiles`) VALUES (?,?,?)";

    // connection.query(indert, [locality, FileName, Number], (err, result) => {
    //   if (err) return reject(err);
    //   resolve(result);
    // })

    await new Promise((resolve, reject) => {
      connection.query(indert, [locality, FileName, Number], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const BD = new Worker('./threads/BulkBillDownload.js');
    
    BD.on('message', (msg) => {
      console.log('Worker message:', msg);
    });
    BD.on('error', (err) => {
      console.error('Worker error:', err);
    });
    BD.on('exit', (code) => {
      if (code !== 0)
        console.error(`Worker stopped with exit code ${code}`);
    });

    res.json({
      success: true,
      message: "Bulk bill PDF generated successfully.",
      downloadUrl: `/Assets/${FileName}.zip`,
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error during bill download.",
      error: err.message,
    });
  }

}






module.exports = {
  GetCustomerList,
  CustomerManagement,
  GetCustomer,
  BillCalculation,
  BillCreation,
  UpdateBill,
  GetCustomerData,
  GetCustomerBillData,
  CustomerListUpload,
  Approvals,
  BulkApprovals,
  BulkBillGeneration,
  CustomerUpdateBill,
  BulkBillDownload,
  UpdateCustomer,
  CheckGenerationProcess
};