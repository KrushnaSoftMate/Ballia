const connection = require("../../database/db");
const path = require('path');
const fs = require('fs')
const crypto=require('crypto')


function CreatePermitBill(req, res) {
    const cryptoid = crypto.randomUUID()
    const { Permitset, FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter, Gala, PermitType, Rate, FromDate, ToDate } = req.body;
    const permitdocumentinf = JSON.parse(Permitset)
    const BillNumber=Date.now().toString()
    const files = req.files;
    try {
        const createpermitbill =
            "INSERT INTO `permitbills`( `BillNumber`,`PermitID`, `FullName`,`ContactNumber`,`AadharNumber`,`PanNumber`, `Location`, `Address`,`Locality`,`Meter`,`Gala`, `PermitType`, `Rate`,`FromDate`,`ToDate`,TotalAmount,PaidAmount,Remaining,cryptoid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const docinserrt = 'INSERT INTO `permitdocs`( `Permitid`, `PermitTypes`, `BillNumber`, `FullName`,`DocumentName`) VALUES (?,?,?,?,?)'
        const values = [BillNumber, permitdocumentinf.id, FullName, ContactNumber, AadharNumber, PanNumber, Location, Address, Locality, Meter, Gala, permitdocumentinf.PermitTypes, Rate, FromDate, ToDate, Rate, 0, Rate,cryptoid];

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

module.exports = { CreatePermitBill, GetPermit, getpermitbyid }