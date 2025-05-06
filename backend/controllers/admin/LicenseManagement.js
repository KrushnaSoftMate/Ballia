const connection = require("../../database/db");
const { Worker, workerData } = require('worker_threads')

async function CreateLicense(req, res) {
    const { Permitset, FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter, GalaType, Area, Plot_No } = req.body;
    const permitdocumentinf = JSON.parse(Permitset)

    // Fetch the latest serial number for the PropertyID
    let serialNumberQuery = await new Promise((resolve, reject) => {
        connection.query(
            `SELECT ID AS lastSerial, Gala, RIGHT(Gala, 4) AS last4Digits FROM licenseregistration WHERE ID = (SELECT MAX(ID) FROM licenseregistration);`,  // Ensures only the row with the highest Srno is retrieved
            (err, result) => {
                if (err) reject(err);
                console.log(result[0].last4Digits)
                resolve(result[0]?.last4Digits || 0);  // Default to 0 if no records exist
            }
        );
    });
    let serialNumber = Number(serialNumberQuery) + Number(1);
    console.log("Serial Number:", serialNumber);

    // Validate serial number
    if (isNaN(serialNumber) || serialNumber < 0 || serialNumber > 9999) {
        throw new Error("Invalid serial number! It must be between 0001 and 9999.");
    }
    const Gala = `NPR${String(serialNumber).padStart(4, '0')}`
    const files = req.files;
    try {
        const createpermitbill =
            "INSERT INTO `licenseregistration`(  `FullName`,`ContactNumber`,`AadharNumber`,`PanNumber`, `Location`, `Address`,`Locality`,`Meter`,`Gala`,`GalaType`,`PermitID`, `PermitType`,`Area`,`Plot_No`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const docinserrt = 'INSERT INTO `permitdocs`( `Permitid`, `PermitTypes`, `BillNumber`, `FullName`,`DocumentName`,`Area`) VALUES (?,?,?,?,?)'
        const values = [FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter, Gala, GalaType, permitdocumentinf.id, permitdocumentinf.PermitTypes, Area, Plot_No];

        connection.query(createpermitbill, values, (error, results) => {
            console.log(results);
            if (results) {
                files.map((x) => {
                    connection.query(docinserrt, [permitdocumentinf.id, permitdocumentinf.PermitTypes, Gala, FullName, x.filename], (err1, result1) => { })
                })
                res.json(true)
            } else {
                console.error(error);
                res.status(400).json({ error: "Internal Server Error", message: error.message });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function BulkLicenseBillGeneration(req, res) {
    const worker = new Worker('./threads/BulkLicenseBillGeneration.js', { name: 'heloo' })
    // res.json(true)
}
async function GetLicenseBill(req, res) {

    const query = "select * from licensebill where Status='NotDump'";
    connection.query(query, (error, result) => {
        if (error) {
            res.status(400).json({ error: "Internal Server Error", message: error.message });
        } else {
            res.json(result)
        }
    })
}


function LicenceApprovals(req, res) {
    const { condition, Gala } = req.body
    const query = "UPDATE `licenseregistration` SET `Approvance`=?  WHERE `Gala`=?";
    connection.query(query, [condition, Gala], (error, result) => {
        if (result) {
            console.log(result);
            res.status(200).json(true)
        } else {
            res.status(404).json(false)
        }
    })
}
module.exports = { CreateLicense, BulkLicenseBillGeneration, GetLicenseBill, LicenceApprovals }




