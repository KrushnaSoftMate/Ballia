const connection = require("../../database/db");
const { GenerateToken } = require('../../jwt/citizen/JWTToken')
const axios = require("axios").default;
const crypto = require('crypto');



function GetBill(req, res) {
    // let data = req.CitizenDetail;
    // const { userID } = data;
    const { BillNumber } = req.body;

    // console.log("Get bill token ", VerifyToken(token))

    let query = "select * from bills LEFT JOIN customers on customers.PropertyID=bills.PropertyID LEFT JOIN toproperty on toproperty.id=customers.PropertyType where bills.PropertyID=? and bills.Status = 'NotDump'"
    let query1 = "SELECT * FROM `customerbillbreakdown` WHERE `PropertyID`=? and BillNumber=?"

    connection.query(query, [BillNumber], (error, results) => {
        if (results) {
            connection.query(query1, [BillNumber, results[0]?.BillNumber], (err1, result1) => {
                if (err1) {
                    console.log(err1);
                    res.json(error)
                } else {
                    let obj = {
                        customer: results,
                        BillBreakdown: result1
                    }
                    res.status(200).json(obj)
                }
            })

        } else {
            console.log(error);
            res.json(error)
        }
    })
}


function ViewBill(req, res) {
    const { BillNumber } = req.body;

    // let data = req.CitizenDetail;
    // const { userID } = data

    let query = `SELECT *
    FROM bills
    WHERE bills.PropertyID = ? and bills.Status = 'NotDump'
    `

    let query1 =
        "SELECT Particulars , Amount FROM `customerbillbreakdown` WHERE `PropertyID`=? and BillNumber=?";

    let query2 = `SELECT * FROM customers WHERE PropertyID = ?`;

    connection.query(query, [BillNumber], (error, results) => {
        if (results) {

            connection.query(
                query1,
                [BillNumber, results[0]?.BillNumber],
                (err1, result1) => {
                    if (err1) {
                        res.json(error);
                    } else {

                        connection.query(query2, [BillNumber], (err3, result3) => {
                            if (err3) {
                                throw err3
                            }

                            let obj = {
                                customer: results,
                                BillBreakdown: result1,
                                customerinfo: result3
                            };
                            res.status(200).json(obj);

                        })

                    }
                }
            );
        } else {
            console.log(error);
            res.json(error)
        }
    })
}


function CustomerDetails(req, res) {
    const { Para } = req.body;
    let query = "SELECT * FROM customers WHERE FullName = ? or ContactNumber=? or AadharNumber=?"
    connection.query(query, [Para, Para, Para], (error, results) => {
        if (results) {
            res.json(results)
        } else {
            res.json(error)
        }
    })
}

function BillHistory(req, res) {
    const { Para } = req.body
    let query = "select * from licensebill where Gala=?"
    // let query = "select * from bills where PropertyID=?"
    connection.query(query, [Para], (error, results) => {
        if (results) {
            res.json(results)
        } else {
            res.json(error)
        }
    })
}


function GetPermitBill(req, res) {
    const { Para } = req.body
    let query = "select * from permitbills where ContactNumber=? or AadharNumber=? or permitbills.BillNumber=?"
    connection.query(query, [Para, Para, Para], (error, result) => {
        if (result) {
            res.status(200).json(result)
            console.log(result);
        } else {
            res.status(404).json(error)
        }
    })
}


function GetReciept(req, res) {

    const { BillNumber } = req.body;
    let query = "select * from bills LEFT JOIN customers on customers.PropertyID=bills.PropertyID LEFT JOIN paymenttable on paymenttable.cryptoid=bills.cryptoid where bills.PropertyID=? and bills.Status = 'NotDump';"

    connection.query(query, [BillNumber], (error, results) => {
        if (results) {
            console.log(results);
            res.json(results)
        } else {
            console.log(error);
            res.json(error)
        }
    })
}

function GetPermitReciept(req, res) {

    const { BillNumber } = req.body;
    let query = "select * from licensebill LEFT JOIN licensepaymenttable on licensepaymenttable.cryptoid=licensebill.cryptoid where licensebill.BillNumber=?;"
    connection.query(query, [BillNumber], (error, results) => {
        if (results) {
            console.log(results);
            res.json(results)
        } else {
            console.log(error);
            res.json(error)
        }
    })
}

function GetNoticeReciept(req, res) {

    const { BillNumber } = req.body;
    let query = "select * from permitbills LEFT JOIN permitpaymenttable on permitpaymenttable.cryptoid=permitbills.cryptoid where permitbills.BillNumber=?;"

    connection.query(query, [BillNumber], (error, results) => {
        if (results) {
            console.log(results);
            res.json(results)
        } else {
            console.log(error);
            res.json(error)
        }
    })
}

function GetLicenseBill(req, res) {
    const { Gala } = req.body
    console.log("req.body", req.body);

    let query = "select * from licensebill left join licenseregistration on licenseregistration.Gala=licensebill.Gala where licensebill.Gala=? and licensebill.Status = 'NotDump';"
    connection.query(query, [Gala], (error, result) => {
        if (result) {
            console.log(result);
            res.status(200).json(result)

        } else {
            res.status(404).json(error)
        }
    })
}

function Signup(req, res) {
    console.log(req.body);
    const { fullname, email, mobile, password } = req.body

    const timestamp = Date.now();
    const rawString = `${fullname}-${email}-${mobile}-${timestamp}`;
    const userId = crypto.createHash('sha256').update(rawString).digest('hex').slice(0, 12);
    console.log(userId);

    let query = "INSERT INTO `citizensignup`(`userID`,`fullname`, `email`, `mobile`, `password`) VALUES (?,?,?,?,?)"
    connection.query(query, [userId, fullname, email, mobile, password], (error, result) => {
        if (result) {
            console.log("Function :: signup , result ::", result);
            res.status(200).json("true")
        } else {
            res.status(404).json(error)
        }
    })
}

function Login(req, res) {
    const { email, password } = req.body
    try {
        connection.query("SELECT * FROM `citizensignup` WHERE  email=? and BINARY password=?", [email, password], (err, result) => {
            if (result) {
                if (result.length > 0) {
                    const user = result[0];
                    const token = GenerateToken(JSON.stringify(user));
                    res.status(200).json({ error: false, token });
                }
                else {
                    res.status(401).json({ error: true, message: "Login Failed provided Data didn't matched !!" })
                }
            } else {
                console.error(err);
                res.status(500).json(false)
            }



        })
    } catch (error) {
        console.error(error);
        res.status(500).json(false)
    }
}

async function sendotp(req, res) {
    const { phone, otp } = req.body
    let query = "INSERT INTO `login_user`(`phone`, `otp`) VALUES (?,?)"
    connection.query(query, [phone, otp], (error, result) => {
        if (result) {
            console.log("result", result);
        } else {
            res.status(404).json(error)
        }
    })

    // Prepare SMS details
    const message = `OTP for Softmate Login Transaction is ${otp} and valid till 30 minutes. Do not share this OTP to anyone for security reasons.`;
    const authKey = "367968ABZpwkFOuMqa615701e8P1";
    const senderId = "SFTMAT";
    const route = "4";
    const dltTeId = "1007161579229709505";
    const url = "http://sms.ssdweb.in/api/sendhttp.php";

    const postData = new URLSearchParams({
        authkey: authKey,
        mobiles: `91${phone}`,
        message: encodeURIComponent(message),
        sender: senderId,
        route: route,
        DLT_TE_ID: dltTeId,
    }).toString();

    // Send SMS
    const options = {
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
        },
        data: postData,
    };

    try {
        const { data } = await axios.request(options);
        console.log("SMS API Response:", data);
        return res.json({ success: "1", message: "OTP SEND Success", response: data });
    } catch (error) {
        console.error("Error sending SMS:", error);

        return res.status(500).json({ success: "0", message: "Failed to send OTP", error: error.message });
    }

}

const verifyOtp = (req, res) => {
    const { phone, otp } = req.body;
    console.log(req.body);



    let query = `SELECT * FROM login_user WHERE phone = ? AND otp = ? AND created_At >= NOW() - INTERVAL 1 MINUTE`;
    connection.query(query, [phone, otp], (error, results) => {
        if (error) {
            throw error;
        }

        console.log("Function :: verifyOtp , result ::", results);

        if (results.length > 0) {
            res.status(200).json("OTP Verified Successfully !!!");
        }
        else {
            res.status(401).json("OTP expired or invalid !!!");
        }



        let deleteOldOTPQery = `DELETE FROM login_user WHERE created_At < NOW() - INTERVAL 1 MINUTE`;

        connection.query(deleteOldOTPQery, (error1, result1) => {
            if (error1) {
                throw error1;
            }

            console.log("Successfully deleted expired OTP ");
        })
    })
};

function GetLicenseDetails(req, res) {
    const { billdata } = req.body
    let query = "SELECT * FROM licenseregistration WHERE FullName = ? OR ContactNumber = ? OR AadharNumber=?";
    connection.query(query, [billdata, billdata, billdata], (error, result) => {
        if (result) {
            res.status(200).json(result)
            console.log(result);
        } else {
            res.status(404).json(error)
        }
    })
}

module.exports = { GetBill, ViewBill, CustomerDetails, BillHistory, GetPermitBill, GetReciept, GetPermitReciept, GetLicenseBill, Signup, Login, GetNoticeReciept, sendotp, verifyOtp, GetLicenseDetails }
