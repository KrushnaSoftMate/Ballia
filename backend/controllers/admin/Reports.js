const connection = require("../../database/db");

// async function DashboardReport(req, res) {
//   let query = "SELECT COUNT(*) COUNT FROM `customers`;";
//   connection.query(query, (err, result) => {
//     res.status(200).json(result);
//   });
// }
async function DashboardReport(req, res) {
  let query = "SELECT SUM(Remaining) AS total_due_amount, SUM(PaidAmount) AS PaidAmount, SUM(TotalAmount) AS total_Billing FROM licensebill WHERE Status='NotDump';"
  connection.query(query, (err, result) => {

      res.status(200).json(result)
  })
}

async function DashboardChart(req, res) {
  const { locality } = req.body;

  let query = "SELECT SUM(Remaining) AS total_due_amount, SUM(PaidAmount) AS PaidAmount, SUM(TotalAmount) AS total_Billing,Count(customers.PropertyID) as total_customers,COUNT(CASE WHEN customers.PropertyType = '1' THEN customers.PropertyID END) AS residential_customers, SUM(CASE WHEN customers.PropertyType = '1' THEN bills.Remaining END) AS residential_due_amount,SUM(CASE WHEN customers.PropertyType = '1' THEN bills.PaidAmount END) AS residential_paid_amount,SUM(CASE WHEN customers.PropertyType = '1' THEN bills.TotalAmount END) AS residential_total_billing,COUNT(CASE WHEN customers.PropertyType = '2' THEN customers.PropertyID END) AS commercial_customers, SUM(CASE WHEN customers.PropertyType = '2' THEN bills.Remaining END) AS commercial_due_amount,SUM(CASE WHEN customers.PropertyType = '2' THEN bills.PaidAmount END) AS commercial_paid_amount,SUM(CASE WHEN customers.PropertyType = '2' THEN bills.TotalAmount END) AS commercial_total_billing FROM bills LEFT JOIN customers ON customers.PropertyID=bills.PropertyID WHERE customers.uniqueness=? AND bills.Status='NotDump';"
  connection.query(query, [locality], (error, result) => {
      if (result) {
          res.json(result)
          
      } else {
          res.json(error)
      }
  })
}
async function DashboardChartForZone(req, res) {
  const { Zone, Ward, createdOn } = req.body;
  let query =
    "SELECT COUNT(*) AS COUNT FROM `customers` WHERE customers.Zone=? AND customers.Ward=? AND customers.createdOn=?";
  connection.query(query, [Zone, Ward, createdOn], (error, result) => {
    if (result) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
}
async function DashboardChartForWard(req, res) {
  console.log(req.body);
  const { Ward, createdOn } = req.body;
  let query =
    "SELECT COUNT(*) AS COUNT FROM `customers` WHERE customers.Ward=?  AND customers.createdOn=?;";
  connection.query(query, [Ward, createdOn], (error, result) => {
    if (result) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
}

async function DashboardChartForTotals(req, res) {
  let query =
    "SELECT COUNT(CASE WHEN PropertyType = 'Residential property' THEN 1 END) AS Residentialproperty,COUNT(CASE WHEN PropertyType = 'Non-Residential property' THEN 1 END) AS NonResidentialproperty,COUNT(CASE WHEN PropertyType = 'Mix property' THEN 1 END) AS Mixproperty ,COUNT(CASE WHEN PropertyType = 'Government property' THEN 1 END) AS Governmentproperty,SUM(PropertyTax) AS PropertyTax,SUM(WaterTax) AS WaterTax FROM customers;";
  connection.query(query, (error, result) => {
    if (result) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
}
async function DashboardChartForToday(req, res) {
  let query =
    "SELECT COUNT(PropertyType) AS PropertyTypes,SUM(PropertyTax) AS PropertyTax,SUM(WaterTax) AS WaterTax FROM customers WHERE createdOn = CURDATE();";
  connection.query(query, (error, result) => {
    if (result) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
}

// async function CustomerReport(req, res) {
//     const { Ward,Zone, CustomerType, Meter, PropertyType,PropertyforUse, Area_Use, BillStatus, FromDate, ToDate,ConstructionType,createdBy } = req.body;
//     const obj = {
//         Ward,Zone, CustomerType, Meter, PropertyforUse,PropertyType, Area_Use, BillStatus, FromDate,ConstructionType,createdBy
//     }

//     let passingobj = {}
//     var dyanamicquery = 'select * from customers left join customerarea on customers.PropertyID = customerarea.CustomerID GROUP_CONCAT(customerdocs.Document_Name) AS documents FROM customers LEFT JOIN customerdocs ON customers.PropertyID = customerdocs.CustomerID where '
//     let arrayofobj = Object.keys(obj)
//     let valuescheck = []
//     arrayofobj.map((x, index) => {
//         if (x == "Ward" && obj[x] != undefined) {
//             dyanamicquery += x + '= ? and '
//             passingobj[x] = obj[x]
//             valuescheck.push(obj[x])
//         }
//         else if (x == "Zone" && obj[x] != undefined) {
//             dyanamicquery += x + '= ? and '
//             passingobj[x] = obj[x]
//             valuescheck.push(obj[x])
//         }
//         // else if (x == "CustomerType" && obj[x] != undefined) {
//         //     dyanamicquery += " and (? = 'Old' AND YEAR(CreationDate) < YEAR(CURDATE())) OR (? = 'New' AND YEAR(CreationDate) = YEAR(CURDATE()))  OR ? = 'All'"
//         //     passingobj[x] = obj[x]
//         //     valuescheck.push(obj[x])
//         //     valuescheck.push(CustomerType)
//         //     valuescheck.push(CustomerType)
//         // }
//         // else if (x == "BillStatus" && obj[x] != undefined) {
//         //     dyanamicquery += " and (? = 'Unpaid' AND Remaining > '0') OR (? = 'Paid' AND Remaining <= '0')  OR ? = 'All'"
//         //     passingobj[x] = obj[x]
//         //     valuescheck.push(obj[x])
//         //     valuescheck.push(BillStatus)
//         //     valuescheck.push(BillStatus)
//         // }
//         else if (x === 'FromDate' && ToDate && obj[x] != undefined) {
//             dyanamicquery += " createdOn BETWEEN ? AND ?"
//             passingobj[x] = obj[x]
//             valuescheck.push(obj[x]);
//             valuescheck.push(ToDate)
//         }
//         else if(x=== 'Meter' && obj[x] != undefined){
//             dyanamicquery += ' Meter = ? and '
//             passingobj[x] = obj[x]
//             valuescheck.push(obj[x])
//         }
//         else if(x=== 'PropertyType' && obj[x] != undefined){
//             dyanamicquery += ' customerarea.PropertyforUse = ? and '
//             passingobj[x] = obj[x]
//             valuescheck.push(obj[x])
//         }
//         else if(x=== 'ConstructionType' && obj[x] != undefined){
//             dyanamicquery += 'and ConstructionType = ? '
//             passingobj[x] = obj[x]
//             valuescheck.push(obj[x])
//         }
//         else if(x=== 'createdBy' && obj[x] != undefined){
//             dyanamicquery += 'and createdBy = ? '
//             passingobj[x] = obj[x]
//             valuescheck.push(obj[x])
//         }
//         else if (obj[x] != undefined) {
//             dyanamicquery += ' and ' + x + '= ? '
//             passingobj[x] = obj[x]
//             valuescheck.push(obj[x])
//         }
//     })

//     const obtainedvalues = await helper(passingobj, dyanamicquery, valuescheck)

//     res.json(obtainedvalues)

// }

async function CustomerReport(req, res) {
  const {
    Ward,
    CustomerType,
    Meter,
    PropertyType,
    PropertyforUse,
    Area_Use,
    BillStatus,
    FromDate,
    ToDate,
    ConstructionType,
    createdBy,
  } = req.body;
  const obj = {
    Ward,
    CustomerType,
    Meter,
    PropertyforUse,
    PropertyType,
    Area_Use,
    BillStatus,
    FromDate,
    ConstructionType,
    createdBy,
  };

  let passingobj = {};
  let dynamicQuery = `SELECT 
        customers.Srno AS Srno,
        customers.PropertyID AS PropertyID, 
        customers.FullName AS FullName,
	customers.FatherorGaurdianName AS FatherorGaurdianName,
        customers.Plot_No AS Plot_No,
        customers.TotalArea AS TotalArea,
	customers.PropertyType AS PropertyType,
        customers.ContactNumber AS ContactNumber,
 	customers.ElectricityConnection AS ElectricityConnection,
        customers.WaterTaxConnection AS WaterConnection,
        customers.SewerConnection AS SewerConnection,
        customers.Meter AS Meter,
        customers.Ward AS Ward,
        customers.PropertyAge AS PropertyAge,
        customers.location AS location,
        customers.createdOn AS createdOn,
	customers.TotalARV AS TotalARV,
        customerdocs.Document_Name AS documents
    FROM customers 

    LEFT JOIN customerdocs ON customers.PropertyID = customerdocs.CustomerID`;

  // QUERY FOR LIVE SERVER
  // let dynamicQuery = `SELECT ANY_VALUE(customers.Srno) AS Srno,ANY_VALUE(customers.PropertyID) AS PropertyID, ANY_VALUE(customers.PMCNumber) AS PMCNumber, ANY_VALUE(customers.FullName) AS FullName,ANY_VALUE(customers.Plot_No) AS Plot_No,ANY_VALUE(customers.TotalArea) AS TotalArea,ANY_VALUE(customers.ContactNumber) AS ContactNumber,ANY_VALUE(customers.Meter) AS Meter,ANY_VALUE(customers.Zone) AS Zone,ANY_VALUE(customers.Ward) AS Ward,ANY_VALUE(customers.Mohalla) AS Mohalla,ANY_VALUE(customers.PropertyAge) AS PropertyAge,ANY_VALUE(customers.location) AS location,ANY_VALUE(customers.createdBy) AS createdBy,ANY_VALUE(customers.TotalARV) AS TotalArv,ANY_VALUE(customerarea.CustomerID) AS CustomerID,ANY_VALUE(customerarea.Floor) AS Floor,ANY_VALUE(customerarea.sqft) AS sqft,ANY_VALUE(customerarea.PropertyforUse) AS PropertyforUse, GROUP_CONCAT(DISTINCT customerarea.ConstructionType) AS ConstructionType, GROUP_CONCAT(customerdocs.Document_Name) AS documents FROM customers LEFT JOIN customerarea ON customers.PropertyID = customerarea.CustomerID LEFT JOIN customerdocs ON customers.PropertyID = customerdocs.CustomerID`;

  let whereClause = "";
  let valuescheck = [];

  const arrayofobj = Object.keys(obj);
  arrayofobj.map((x) => {
    if (x === "Ward" && obj[x] !== undefined) {
      whereClause += `${whereClause ? " AND " : ""}customers.Ward = ?`;
      valuescheck.push(obj[x]);
    }  else if (x === "FromDate" && ToDate && obj[x] !== undefined) {
      whereClause += `${
        whereClause ? " AND " : ""
      }customers.createdOn BETWEEN ? AND ?`;
      valuescheck.push(obj[x]);
      valuescheck.push(ToDate);
    } else if (x === "Meter" && obj[x] !== undefined) {
      whereClause += `${whereClause ? " AND " : ""}customers.Meter = ?`;
      valuescheck.push(obj[x]);
    } 
  });

  // If any conditions exist, append WHERE clause
  if (whereClause) {
    dynamicQuery += ` WHERE ${whereClause}`;
  }

  // Add GROUP BY
  // dynamicQuery += ' GROUP BY customers.PropertyID';

  try {
    const obtainedvalues = await helper(passingobj, dynamicQuery, valuescheck);

    // Now format the documents into an array for frontend
    const formattedValues = obtainedvalues.map((row) => {
      return {
        ...row,
        documents: row.documents ? row.documents.split(",") : [], // Split documents into an array
      };
    });

    res.json(formattedValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
}

async function helper(data, dyanamicquery, valuescheck) {
  console.log("Query:", dyanamicquery);
  console.log("Values:", valuescheck);
  const datavalues = new Promise((resolve, reject) => {
    connection.query(dyanamicquery, valuescheck, (err, result) => {
      console.log(err);
      resolve(result);
    });
  });
  const obtainedvalues = await datavalues;
  return obtainedvalues;
}

async function TransactionReports(req, res) {
  let dyanmicquery = "SELECT * FROM customers c left join bills b on  b.PropertyID = c.PropertyID left join paymenttable p ON c.PropertyID = p.CustomerID where b.status='NotDump'"

  const {
    FromDate,
    ToDate,
    locality,
    PropertyType,
    payment_source,
    Discount,
    firstname,
    FromTotalAmount,
    ToTotalAmount,
  } = req.body;
  const reportcheckerobj = {
    FromDate,
    locality,
    PropertyType,
    Discount,
    payment_source,
    firstname,
    FromTotalAmount,
    ToTotalAmount,
  };

  let dvalues = [];
  Object.keys(reportcheckerobj).map((x) => {

    if (
      reportcheckerobj[x] != undefined &&
      reportcheckerobj[x].length >= 1 &&
      x == "FromDate"
    ) {
      dyanmicquery += " and  addedon BETWEEN ? AND ? ";
      dvalues.push(FromDate);
      dvalues.push(ToDate);
    } else if (
      reportcheckerobj[x] != undefined &&
      reportcheckerobj[x].length >= 1 &&
      x == "Discount"
    ) {
      dyanmicquery += " AND b.Discount>=?";
      const checkdiscount = Discount === "Yes" ? 1 : 0;
      dvalues.push(checkdiscount);
    } else if (
      reportcheckerobj[x] != undefined &&
      reportcheckerobj[x].length >= 1 &&
      x == "payment_source"
    ) {
      dyanmicquery += " AND p.payment_source=?";
      dvalues.push(payment_source);
    } else if (FromTotalAmount && ToTotalAmount) {
      dyanmicquery += " AND b.TotalAmount BETWEEN ? AND ?";
      dvalues.push(FromTotalAmount);
      dvalues.push(ToTotalAmount);
    } else if (
      reportcheckerobj[x] != undefined &&
      reportcheckerobj[x].length >= 1 &&
      x == "firstname"
    ) {
      dyanmicquery += " AND p.firstname=?";
      dvalues.push(firstname);
    } else if (
      reportcheckerobj[x] != undefined &&
      reportcheckerobj[x].length >= 1
    ) {
      dyanmicquery += " and " + x + "=?";
      dvalues.push(reportcheckerobj[x]);
    }
  });
  console.log(dyanmicquery, dvalues);

  // let query = "SELECT * FROM bills b JOIN paymenttable p ON b.PropertyID = p.CustomerID JOIN customers c ON p.CustomerID = c.PropertyID WHERE addedon BETWEEN ? AND ? OR c.locality = ? AND c.propertyType = ? AND p.payment_source =? AND p.DiscountedAmount>=?;"
  connection.query(dyanmicquery, dvalues, (error, result) => {
    if (result) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
}

async function NoticeofdemandReports(req, res) {
  const obj = ({ Ward, Zone, Meter, Mohalla, FromDate, ToDate } = req.body);
  console.log("req.body", req.body);
  let dyanamicquery = `SELECT * FROM licenseregistration LEFT JOIN licensebill ON licenseregistration.Gala = licensebill.Gala WHERE licensebill.Status = "NotDump" AND licensebill.FromDate <= DATE_SUB(CURRENT_DATE, INTERVAL 15 DAY)`
  // `SELECT * FROM customers LEFT JOIN bills ON customers.PropertyID = bills.PropertyID WHERE bills.Status = "NotDump" AND bills.FromDate <= DATE_SUB(CURRENT_DATE, INTERVAL 15 DAY)`;

const reportcheckerobj = { Ward, Zone, Meter, Mohalla, FromDate, ToDate }

    let dvalues = []
    Object.keys(reportcheckerobj).map((x) => {
        
        if (reportcheckerobj[x] != undefined && reportcheckerobj[x].length >= 1 && x == 'Ward') {
            dyanamicquery += ' and licenseregistration.Ward = ? '
            dvalues.push(Ward)
        }
        else if (reportcheckerobj[x] != undefined && reportcheckerobj[x].length >= 1 && x == 'FromDate') {
            dyanamicquery += ' and  Date BETWEEN ? AND ? '
            dvalues.push(FromDate)
            dvalues.push(ToDate)
        }
        else if (reportcheckerobj[x] != undefined && reportcheckerobj[x].length >= 1 && x == 'Zone') {
            dyanamicquery += " and licenseregistration.Zone = ?"
            dvalues.push(Zone)
        }
        if (reportcheckerobj[x] != undefined && reportcheckerobj[x].length >= 1 && x == 'Meter') {
            dyanamicquery += ' and licenseregistration.Meter = ? '
            dvalues.push(Meter)
        }
        if (reportcheckerobj[x] != undefined && reportcheckerobj[x].length >= 1 && x == 'Mohalla') {
            dyanamicquery += ' and licenseregistration.Mohalla = ? '
            dvalues.push(Mohalla)
        }

    })
    console.log(dyanamicquery, dvalues)
    // let query = "SELECT * FROM bills b JOIN paymenttable p ON b.PropertyID = p.CustomerID JOIN customers c ON p.CustomerID = c.PropertyID WHERE addedon BETWEEN ? AND ? OR c.locality = ? AND c.propertyType = ? AND p.payment_source =? AND p.DiscountedAmount>=?;"
    connection.query(dyanamicquery, dvalues, (error, result) => {
        if (result) {
            res.json(result)
        } else {
            res.json(error)
        }
    })
}

async function helper1(dyanamicquery, valuescheck) {
    console.log("Query:", dyanamicquery);
    console.log("Values:", valuescheck);
    const datavalues = new Promise((resolve, reject) => {
      connection.query(dyanamicquery, valuescheck, (err, result) => {
        console.log(err);
        resolve(result);
      });
    });
    const obtainedvalues = await datavalues;
    return obtainedvalues;
  }

module.exports = {
  DashboardReport,
  DashboardChartForZone,
  DashboardChartForWard,
  DashboardChartForTotals,
  DashboardChartForToday,
  CustomerReport,
  TransactionReports,
  NoticeofdemandReports,
  DashboardChart
};
