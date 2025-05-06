const { log } = require("console");
const connection = require("../../database/db");
const fs = require('fs')
const crypto = require('crypto')
const { GenerateBillCalcultion } = require("../../Math/AgentCalcultion")

function CreateLicense(req, res) {
    const { Permitset, FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter,GalaType,Area,Plot_No } = req.body;
    const permitdocumentinf = JSON.parse(Permitset)
    const Gala = Date.now().toString()
    const files = req.files;
    try {
        const createpermitbill =
            "INSERT INTO `licenseregistration`(  `FullName`,`ContactNumber`,`AadharNumber`,`PanNumber`, `Location`, `Address`,`Locality`,`Meter`,`Gala`,`GalaType`,`PermitID`, `PermitType`,`Area`,`Plot_No`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const docinserrt = 'INSERT INTO `permitdocs`( `Permitid`, `PermitTypes`, `BillNumber`, `FullName`,`DocumentName`,`Area`) VALUES (?,?,?,?,?)'
        const values = [FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter, Gala,GalaType, permitdocumentinf.id, permitdocumentinf.PermitTypes,Area,Plot_No];

        connection.query(createpermitbill, values, (error, results) => {
            console.log(results);
            if (results) {
                files.map((x) => {
                    connection.query(docinserrt, [permitdocumentinf.id, permitdocumentinf.PermitTypes, Gala, FullName, x.filename], (err1, result1) => { })
                })
                res.status(200).json(results)
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
function GetCustomerLicense(req, res) {
    const { Gala } = req.body;
    let query = "select * from licenseregistration where Gala=? ";
    connection.query(query, [Gala], (error, results) => {
        if (results) {
            res.status(200).json(results)
        } else {
            res.json(error);
            console.log(error);
        }
    });
}

async function CreateLicenseBill(req, res) {
    const cryptoid = crypto.randomUUID()
    const { Gala, Rate, FromDate, ToDate,Area } = req.body;
    console.log(req.body);
    
    const currentDate = new Date(FromDate);
    const fromMonth = currentDate.getMonth() + 1;
    const fromYear = currentDate.getFullYear();
    let BillNumber = Gala + '_' + fromMonth + '_' + fromYear;
    let data = await GenerateBillCalcultion(Rate, Gala,Area);
    console.log(data);
    try {
        const createlicensebill =
            "INSERT INTO `licensebill`( `Gala`,`BillNumber`,`Rate`,`FromDate`,`ToDate`,DueAmount,TotalAmount,PaidAmount,Remaining,cryptoid,Area) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        let updatecustomer = "UPDATE `licensebill` SET  `Status` = 'Dump' WHERE `Gala`=?";
        let validatiioncheck = 'SELECT * FROM `licensebill` where Gala= ? '
        const values = [Gala, BillNumber, data.Rate, FromDate, ToDate,
            data.DueAmount,
            data.TotalAmount,
            data.PaidAmount,
            data.Remaining,
            cryptoid,data.Area];

        let validatiioncheckresul = new Promise((resolve, reject) => {
            connection.query(validatiioncheck, [BillNumber], (err, reesult) => {
                if (reesult) {
                    console.log("reesult",reesult);
                    if (reesult?.length > 0) {
                        resolve(false)
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
        if (valicheck) {
            connection.query(updatecustomer, [Gala], (err1, result1) => {
                if (result1) {
                    connection.query(createlicensebill, values, (error, results) => {
                        if (results) {
                            console.log("results",results);
                            res.status(200).json(true);

                        } else {
                            res.status(500).json(error);
                            console.log("error",error);
                            return
                        }
                    });
                } else {
                    // res.status(500).json(err1);
                    console.log(err1);
                    return
                }
            });
            // res.status(200).json(true);
        } else {
            res.status(405).json(false);
            console.log('Duplicate');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
function GetLicenseDetails(req, res) {
    const query = 'select * from licenseregistration'
    connection.query(query, (error, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json(error)
            console.log(error);
        }
    })
}

function GetLicenseBill(req, res) {
    const { Gala } = req.body
    const query = "select * from licensebill where Gala=? AND Status='NotDump'"
    connection.query(query, [Gala, Gala], (error, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json(error)
            console.log(error);
        }
    })
}

function GetLicenseTransactionHistory(req, res) {
    const ID = req.AgentDetails.AgentID;
    const { FromDate, ToDate, Limit } = req.body
    const query = 'SELECT * FROM licensepaymenttable WHERE AgentID=? AND addedon BETWEEN ? AND ?;'
    const query1 = 'SELECT * FROM licensepaymenttable WHERE AgentID=? LIMIT ?'


    if (FromDate && ToDate) {
        connection.query(query, [ID, FromDate, ToDate], (error, result) => {
            if (result) {
                res.status(200).json(result)
                // console.log(result);
            } else {
                res.status(404).json(error)
                console.log(error);
            }
        })
    } else {
        const LimitNum = Number(Limit)
        connection.query(query1, [ID, LimitNum], (error, result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json(error)
                console.log(error);
            }
        })
    }

}

function GetGalaDetails(req,res){
    const {parameter}= req.body
    const query="SELECT * FROM `licenseregistration` WHERE `licenseregistration`.`FullName`=? or `ContactNumber`=? or `AadharNumber`=? or `PanNumber`=? or `Gala`=?"
    connection.query(query,[parameter,parameter,parameter,parameter,parameter],(err,result)=>{
        if (result) {
                console.log(result[0].Gala)
            connection.query("select * from permitdocs where BillNumber=?",[result[0].Gala],(err1,rsult1)=>{
                if (rsult1) {
                    const obj={
                        customer:result,
                        docs:rsult1
                    }
                    res.json(obj)
                } else {
                    console.log(err1)
                    
                }
            })
        }
        else {
            console.log(err);
            res.status(500).json(false)
        }
    })
}
module.exports = { CreateLicense, GetCustomerLicense, CreateLicenseBill, GetLicenseDetails, GetLicenseBill, GetLicenseTransactionHistory,GetGalaDetails }




