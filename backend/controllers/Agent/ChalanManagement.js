const { log } = require("console");
const connection = require("../../database/db");
const fs = require('fs')
const crypto=require('crypto')

function CreatePermitBill(req, res) {
    const cryptoid = crypto.randomUUID()
    const { Permitset, FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter, Gala, PermitType, Rate, FromDate, ToDate } = req.body;
    const permitdocumentinf = JSON.parse(Permitset)
    const BillNumber = Date.now().toString()
    const files = req.files;
    try {

        const createpermitbill =
            "INSERT INTO `permitbills`( `BillNumber`,`PermitID`, `FullName`,`ContactNumber`,`AadharNumber`,`PanNumber`, `Location`, `Address`,`Locality`,`Meter`,`Gala`, `PermitType`, `Rate`,`FromDate`,`ToDate`,TotalAmount,PaidAmount,Remaining,cryptoid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const docinserrt = 'INSERT INTO `permitdocs`( `Permitid`, `PermitTypes`, `BillNumber`, `FullName`,`DocumentName`) VALUES (?,?,?,?,?)'
        const values = [BillNumber, permitdocumentinf.id, FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter, Gala, permitdocumentinf.PermitTypes, Rate, FromDate, ToDate, Rate, 0, Rate, cryptoid];

        connection.query(createpermitbill, values, (error, results) => {
            if (results) {
                files.map((x) => {
                    connection.query(docinserrt, [permitdocumentinf.id, permitdocumentinf.PermitTypes, BillNumber, FullName, x.filename], (err1, result1) => { })
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

function GetPermit(req, res) {

    connection.query("SELECT * FROM localityrates", (err, result) => {
        if (err) {
            res.status(500).json("Got Some Server Err : " + err);
        } else {
            connection.query(
                "SELECT * FROM meter",
                (err1, result1) => {
                    if (err1) {
                        res.status(500).json("Got Some Server Err : " + err1);
                    } else {
                        connection.query("SELECT * FROM typesofpermit", (err2, result2) => {
                            if (err2) {
                                res.status(500).json("Got Some Server Err : " + err2);
                            } else {
                                const obj = {
                                    locality: result,
                                    meter: result1,
                                    permit: result2
                                };
                                res.status(200).json(obj);
                            }
                        });
                    }
                }
            );
        }
    })
}

function getpermitbyid(req, res) {
    const sql = 'SELECT * FROM `typesofpermit` WHERE `id`=?'
    connection.query(sql, [req.body.id], (err, result) => {
        res.json(result)
    })
}

function AgentProfile(req, res) {
    const ID = req.AgentDetails.ID;
      console.log(ID);
    const query = "select * from agentlogin where ID=?"
    connection.query(query, [ID], (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json(error);
        }
    })

}

function GetPermitBill(req, res) {
    const { BillNumber } = req.body
    const query = 'select * from permitbills where BillNumber=? or AadharNumber=? or PanNumber=?'
    connection.query(query, [BillNumber, BillNumber, BillNumber], (error, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json(error)
            console.log(error);
        }
    })
}

async function UpdatePermitBill(req, res) {
    const { BillNumber, FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter, Gala, Permitset, Rate, FromDate, ToDate } = req.body;
    console.log(req.body)
    const { id, PermitTypes } = JSON.parse(Permitset)
    console.log(id)
    const query = "Update permitbills SET FullName=?, ContactNumber=?, AadharNumber=?, PanNumber=?, Location=?, Address=?,Locality=?, Meter=?, Gala=?, PermitID=?, PermitType=?, Rate=?, FromDate=?, ToDate=? where BillNumber=?"
    const mynewfiles = req.files
    let datacustomer = new Promise((resolve, reject) => {
        let query = 'SELECT * FROM `permitdocs` WHERE `BillNumber`=?'
        connection.query(query, [BillNumber], (err, result) => {
            if (result) {
                resolve(result);
            }
        })
    })

    let customerdocs = await datacustomer
    customerdocs.map((x) => {
        if (x) {
            try {
                fs.unlinkSync('public/Permitdocs/' + x.DocumentName)

            } catch (error) {
                console.log(error);
            }

        }
    })

    const datacustomerupdate = new Promise((resolve, reject) => {
        connection.query(query, [FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter, Gala, id, PermitTypes, Rate, FromDate, ToDate, BillNumber], (error, result) => {
            if (result) {
                resolve(true)
            } else {
                resolve(false)
                console.log(error);
            }
        })
    })

    const checkcustomerupdate = await datacustomerupdate
    if (checkcustomerupdate) {
        const sqldwlwtw = "DELETE FROM `permitdocs` WHERE `BillNumber`=?"
        const insertdocs = "INSERT INTO `permitdocs`(`Permitid`, `PermitTypes`, `BillNumber`, `FullName`, `DocumentName`) VALUES (?,?,?,?,?)"
        connection.query(sqldwlwtw, [BillNumber], (err, result) => { err ? console.log(err) : true })
        mynewfiles.map((x) => {
            connection.query(insertdocs, [id, PermitTypes, BillNumber, FullName, x.filename], (err1, result1) => { })
        })
        res.send({
            status: 200,
            message: "Permit Updated Successfully"
        })
    } else {
        res.send({
            status: 400,
            message: "error"
        })
    }

}

function GetTransactionHistory(req, res) {
    const ID = req.AgentDetails.AgentID;
    const { FromDate, ToDate, Limit } = req.body
    const query = 'SELECT * FROM permitpaymenttable WHERE AgentID=? AND addedon BETWEEN ? AND ?;'
    const query1 = 'SELECT * FROM permitpaymenttable WHERE AgentID=? LIMIT ?'
    

    if (FromDate && ToDate) {
        connection.query(query, [ID,FromDate, ToDate], (error, result) => {
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
        connection.query(query1, [ID,LimitNum], (error, result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json(error)
                console.log(error);
            }
        })
    }

}

module.exports = { CreatePermitBill, GetPermit, getpermitbyid, AgentProfile, GetPermitBill, UpdatePermitBill, GetTransactionHistory }