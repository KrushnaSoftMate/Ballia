const connection = require("../../database/db");
const ShaEncrytion = require("js-sha512");
const axios = require("axios").default;
const { BillPaymentCalcultion, BillPaymentCalcultionCash } = require("../../Math/BillCalculation");
const { URLSearchParams } = require("url");
const { RatePayment, LicenseRatePayment } = require('../../Math/AgentCalcultion')
const crypto = require('crypto');
const { Discountcodes, Discountcodescash } = require("../../Math/Discount");

async function ApplyDiscount(req, res) {
  const { id } = req.body;
  let query = "select * from bills LEFT JOIN customers on customers.PropertyID=bills.PropertyID where bills.PropertyID=? and bills.Status = 'NotDump';"
  let query1 = "SELECT * FROM `customerbillbreakdown` WHERE `PropertyID`=? and BillNumber=?"
  res.json(true)
  // let datacheck = new Promise((resolve, reject) => {
  //   connection.query(query, [id], (error, results) => {
  //     if (results) {
  //       resolve(results[0]?.BillNumber)
  //     } else {
  //       console.log(error);
  //       resolve(error)
  //     }
  //   })
  // })

  // let BillNumber = await datacheck

  // let discount = new Promise((resolve, reject) => {
  //   let q1 = "SELECT * FROM `discountcodes` WHERE `DiscountFor`='bills'"
  //   connection.query(q1, (err, result) => {
  //     if (result[0].Status == 'Active') {
  //       let q2 = 'SELECT * FROM `bills` WHERE `BillNumber`=?'
  //       connection.query(q2, [BillNumber], (err1, result1) => {
  //         if (result1[0].Discount == 0) {
  //           DiscountCalculation(result1[0])
  //           resolve(true)
  //         }
  //         else {
  //           resolve(true)
  //         }

  //       })
  //     }
  //     else {
  //       resolve(true)
  //     }
  //   })
  // })
  // let discountapplied = await discount
  // res.json(discountapplied)
}


// async function GenerateHash(req, res) {
//   const {
//     PropertyID,
//     BillNumber,
//     Amount,
//     UserName,
//     Email,
//     Mobile_No,
//     LateFees,
//   } = req.body;
//   let query =
//     "SELECT `Remaining` FROM `bills` WHERE `BillNumber`=?";


//   let data = new Promise((resolve, reject) => {
//     connection.query(query, [BillNumber], async (err, result) => {
//       if (result) {
//         if (result[0]?.Remaining >= Amount == false) {
//           resolve(false)
//         } else {
//           resolve(true);
//         }
//       } else if (err) {
//         console.log(err);
//         res.json(false);
//       }
//     });
//   });

//   const datadiscount = await Discountcodes('Bills', BillNumber, PropertyID, Amount)
//   let actualpaymentamount = datadiscount.newpaymentamount

//   let txnid = Date.now().toString();
//   if (await data) {
//     const configkey = process.env.EazeBuzzkey;
//     const salt = process.env.EazeBuzzSalt;
//     var hashstring = `${configkey}|${txnid}|${actualpaymentamount}|${PropertyID}|${BillNumber}|${Email}|${Mobile_No}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${salt}`;
//     let hash = ShaEncrytion.sha512(hashstring);
//     console.log("hasstring", hashstring);
//     const encodedParams = new URLSearchParams();
//     encodedParams.set("key", configkey);
//     encodedParams.set("txnid", txnid);
//     encodedParams.set("amount", actualpaymentamount);
//     encodedParams.set("productinfo", PropertyID);
//     encodedParams.set("email", Email);
//     encodedParams.set("firstname", BillNumber);
//     encodedParams.set("phone", Mobile_No);
//     encodedParams.set("surl", "https://easebuzz.in/");
//     encodedParams.set("furl", "https://easebuzz.in/");
//     encodedParams.set("hash", hash);
//     encodedParams.set("udf1", Mobile_No);
//     encodedParams.set("udf2", "");
//     encodedParams.set("udf3", "");
//     encodedParams.set("udf4", "");
//     encodedParams.set("udf5", "");
//     encodedParams.set("udf6", "");
//     encodedParams.set("udf7", "");
//     encodedParams.set("udf8", "");
//     encodedParams.set("udf9", "");
//     encodedParams.set("udf10", "");

//     const options = {
//       method: "POST",
//       url: process.env.HASHLINK,
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Accept: "application/json",
//       },
//       data: encodedParams,
//     };

//     try {
//       const { data } = await axios.request(options);
//       res.json(data);
//     } catch (error) {
//       console.log(error)
//       res.json(error);
//     }
//   } else {
//     res.status(409).json("No Due Against Customer");
//   }
// }


async function GenerateHash(req, res) {
  const {
    PropertyID,
    BillNumber,
    Amount,
    UserName,
    Email,
    Mobile_No,
    LateFees,
  } = req.body;
  let query =
    "SELECT `Remaining` FROM `bills` WHERE `BillNumber`=?";


  const hasRemaining = await new Promise((resolve, reject) => {
    connection.query(query, [BillNumber], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]?.Remaining >= Amount);
    });
  });

  if (!hasRemaining) {
    return res.status(409).json("No Due Against Customer");
  }

  const datadiscount = await Discountcodes('Bills', BillNumber, PropertyID, Amount);
  if (!datadiscount?.newpaymentamount) {
    return res.status(500).json("Failed to calculate discounted amount.");
  };

  let actualpaymentamount = datadiscount.newpaymentamount

  let txnid = Date.now().toString();
  const configkey = process.env.EazeBuzzkey;
  const salt = process.env.EazeBuzzSalt;
  var hashstring = `${configkey}|${txnid}|${actualpaymentamount}|${PropertyID}|${BillNumber}|${Email}|${Mobile_No}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${salt}`;
  let hash = ShaEncrytion.sha512(hashstring);
  console.log("hasstring", hash);

  const encodedParams = new URLSearchParams();
  encodedParams.set("key", String(configkey));
  encodedParams.set("txnid", String(txnid));
  encodedParams.set("amount", String(actualpaymentamount));
  encodedParams.set("productinfo", String(PropertyID));
  encodedParams.set("email", String(Email));
  encodedParams.set("firstname", String(BillNumber));
  encodedParams.set("phone", String(Mobile_No));
  encodedParams.set("surl", "https://easebuzz.in/");
  encodedParams.set("furl", "https://easebuzz.in/");
  encodedParams.set("hash", String(hash));
  encodedParams.set("udf1", String(Mobile_No));
  encodedParams.set("udf2", "");
  encodedParams.set("udf3", "");
  encodedParams.set("udf4", "");
  encodedParams.set("udf5", "");
  encodedParams.set("udf6", "");
  encodedParams.set("udf7", "");
  encodedParams.set("udf8", "");
  encodedParams.set("udf9", "");
  encodedParams.set("udf10", "");
  console.log("Params being sent:", encodedParams.toString());

  const options = {
    method: "POST",
    url: process.env.HASHLINK,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    data: encodedParams,
  };

  try {
    const { data } = await axios.request(options);
    console.log("data i get form ", data);
    res.json(data);
  } catch (error) {
    console.log(error)
    res.json(error);
  }

}









const BillPayment = async (req, res) => {

  const cryptoid = crypto.randomUUID()
  console.log(cryptoid);
  const {
    txnid,
    PropertyID,
    BillNumber,
    status,
    productinfo,
    payment_source,
    net_amount_debit,
    name_on_card,
    mode,
    hash,
    firstname,
    email,
    easepayid,
    LateFees,
    Amount
  } = req.body;
  console.log(PropertyID,
    net_amount_debit,
    BillNumber,
    firstname,
    email,
    Amount)
  let query =
    "INSERT INTO `paymenttable`( `txnid`, `CustomerID`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`,`DiscountedAmount`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  let data = await BillPaymentCalcultion(
    PropertyID,
    BillNumber,
    net_amount_debit,
    Amount,
    'Online'
  );

  const valueinsert = [
    txnid,
    PropertyID,
    BillNumber,
    status,
    productinfo,
    payment_source,
    net_amount_debit,
    data.paidamount,
    name_on_card,
    mode,
    hash,
    firstname,
    email,
    easepayid,
    cryptoid,
  ];

  const valuepayment = [data.discountedamout, data.newtotalamount, data.paidamount, data.Remaining, cryptoid, PropertyID, BillNumber];
  let query1 =
    "UPDATE `bills` SET  `Discount`=?,`TotalAmount`=?,`PaidAmount`=? , `Remaining`=?,`cryptoid`=? WHERE `PropertyID`=? and `BillNumber`=?";

  connection.query(query, valueinsert, (err, results) => {
    if (err) {
      console.error(err);
      res.json("err");
    } else {
      if (status === "success") {
        connection.query(query1, valuepayment, (err1, result1) => {
          if (result1) {
            res.json(true);
          } else {
            console.log(err1);
            res.json("Duplicate entry");
          }
        });
      } else {
        res.json(false);
      }
    }
  });
};

async function BillWhatsappPayment(req, res) {
  const {
    PropertyID,
    Amount,
    Email,
    PhoneNumber
  } = req.body;
  console.log(req.body)
  let txnid = Date.now().toString();
  const configkey = process.env.EazeBuzzkey;
  const salt = process.env.EazeBuzzSalt;
  let query = 'select * from bills LEFT JOIN customers on customers.PropertyID=bills.PropertyID where bills.PropertyID=? and Remaining > 0;'
  let customerdata = new Promise((resolve, reject) => {
    connection.query(query, [PropertyID], (err, result) => {
      if (result) {
        resolve(result[0])
      }
    })
  })
  let datacustomer = await customerdata
  console.log(datacustomer)
  // key|merchant_txn|name|email|phone|amount|udf1|udf2|udf3|udf4|udf5|message|salt
  var hashstring = `${configkey}|${txnid}|${datacustomer.FullName}|${Email}|${PhoneNumber}|${Amount}|${""}|${""}|${""}|${""}|${""}|${"Thank you for paying bill"}|${salt}`;
  console.log("hashstring", hashstring);
  let hash = ShaEncrytion.sha512(hashstring);
  console.log("hash", hash);
  const options = {
    method: 'POST',
    url: 'https://dashboard.easebuzz.in/easycollect/v1/create',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    data: {
      merchant_txn: txnid,
      key: configkey,
      email: Email,
      name: datacustomer.FullName,
      amount: Amount,
      phone: PhoneNumber,
      udf1: '',
      udf2: '',
      udf3: '',
      udf4: '',
      udf5: '',
      message: 'Thank you for paying bill',
      expiry_date: '31-03-2025',
      // operation: [
      //    { type: 'sms', template:  `Dear sankalp,\n\nPlease pay your bill of Rs. 1000 from Website or app.\n\nThank you!`, },
      //   // { type: 'sms', template:  `Dear sankalp,\n\nPlease pay your bill of Rs. 1000 from Website or app.\n\nThank you!`, },
      //   // { type: 'email', template: 'Default email template' },
      //   { type: 'whatsapp', template: 'Default whatsapp template' }
      // ],
      operation: [
        {
          "type": "sms",
          "template": 'sms template'
        },
        {
          "type": "email",
          "template": "Default Mail"
        },
        {
          "type": "whatsapp",
          "template": 'Default whatsapp template'
        }
      ],
      hash: hash
    }
  };

  try {
    const { data } = await axios.request(options);
    console.log('Easebuzz Full Response:', data); // Log full response for debugging

    if (data && data.whatsapp_operation) {
      if (data.whatsapp_operation.status === true) {
        console.log('WhatsApp message sent successfully.');
      } else {
        console.log('WhatsApp message sending failed:', JSON.stringify(data.whatsapp_operation, null, 2));
      }
    } else {
      console.log('WhatsApp operation not found in response:', JSON.stringify(data, null, 2));
    }

    // Insert transaction data into DB
    // connection.query(query1, valueinsert, (err, result) => {
    //   if (err) {
    //     console.error('Error inserting into database:', err);
    //     return res.status(500).json({ error: 'Failed to insert transaction' });
    //   }
    //   res.status(201).json({
    //     data: data,
    //     txnid: txnid
    //   });
    // });

  } catch (error) {
    console.error('Error in process:', error.response ? error.response.data : error.message); // Log API error response
    res.status(500).json({ error: error.message });
  }


  // let query1 =
  //   "INSERT INTO `paymenttable`( `txnid`, `CustomerID`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  // const valueinsert = [
  //   txnid,
  //   PropertyID,
  //   datacustomer.BillNumber,
  //   'pending',
  //   datacustomer.FullName,
  //   "Link",
  //   Amount,
  //   PhoneNumber,
  //   "Link",
  //   hash,
  //   datacustomer.FullName,
  //   Email,
  //   "",
  // ];




  // try {
  //   const { data } = await axios.request(options);
  //   console.log(data);
  //   let obj = {
  //     data: data,
  //     txnid: txnid
  //   }
  //   connection.query(query1, valueinsert, (err, result) => {
  //     if (result) {
  //       res.status(201).json(obj)
  //     } else {
  //       console.log(err);
  //       res.status(201).json(obj)
  //     }
  //   })

  // } catch (error) {
  //   console.error(error);
  //   res.json(error)
  // }
}

async function BulkBillWhatsappPayment(req, res) {
  // const {
  //   PropertyID,
  //   Amount,
  //   Email,
  //   PhoneNumber
  // } = req.body;
  let txnid = Date.now().toString();
  const configkey = process.env.EazeBuzzkey;
  const salt = process.env.EazeBuzzSalt;
  let query = 'SELECT * FROM bills LEFT JOIN customers ON customers.PropertyID = bills.PropertyID WHERE customers.uniqueness = "demo/demoward/demozone" AND bills.Remaining > 0 AND bills.PropertyID IN ("1729768906", "1729769094", "1729769722");'
  let customerdata = new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);  // Resolve all results (not just the first one)
      }
    });
  });
  let datacustomers = await customerdata
  // key|merchant_txn|name|email|phone|amount|udf1|udf2|udf3|udf4|udf5|message|salt
  for (const datacustomer of datacustomers) {
    let txnidForCustomer = txnid + '-' + datacustomer.PropertyID; // Unique txn id per customer

    // key|merchant_txn|name|email|phone|amount|udf1|udf2|udf3|udf4|udf5|message|salt
    let hashstring = `${configkey}|${txnidForCustomer}|${datacustomer.FullName}|${""}|${datacustomer.ContactNumber}|${datacustomer.Remaining}|${""}|${""}|${""}|${""}|${""}|${"Thank you for paying your bill."}|${salt}`;
    let hash = ShaEncrytion.sha512(hashstring);
    console.log(`Hash for ${datacustomer.ContactNumber}:`, hash);

    const options = {
      method: 'POST',
      url: 'https://dashboard.easebuzz.in/easycollect/v1/create',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      data: {
        merchant_txn: txnidForCustomer,
        key: configkey,
        email: '',  // Add email if available
        name: datacustomer.FullName,
        amount: datacustomer.Remaining,
        phone: datacustomer.ContactNumber,
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: '',
        udf5: '',
        message: 'Thank you for paying your bill.',
        expiry_date: '31-03-2025',
        operation: [
          { type: 'sms', template: 'Default sms template' },
          { type: 'email', template: 'Default email template' },
          { type: 'whatsapp', template: 'Default whatsapp template' }
        ],
        hash: hash
      }
    }

    try {
      const { data } = await axios.request(options);
      console.log('Easebuzz Full Response:', data); // Log full response for debugging

      if (data && data.whatsapp_operation) {
        if (data.whatsapp_operation.status === true) {
          console.log('WhatsApp message sent successfully.');
        } else {
          console.log('WhatsApp message sending failed:', JSON.stringify(data.whatsapp_operation, null, 2));
        }
      } else {
        console.log('WhatsApp operation not found in response:', JSON.stringify(data, null, 2));
      }

      // Insert transaction data into DB
      // connection.query(query1, valueinsert, (err, result) => {
      //   if (err) {
      //     console.error('Error inserting into database:', err);
      //     return res.status(500).json({ error: 'Failed to insert transaction' });
      //   }
      //   res.status(201).json({
      //     data: data,
      //     txnid: txnid
      //   });
      // });

    } catch (error) {
      console.error('Error in process:', error.response ? error.response.data : error.message); // Log API error response
      res.status(500).json({ error: error.message });
    }
  }
}

async function confirmpayment(req, res) {
  const { txnid } = req.body;
  const configkey = process.env.EazeBuzzkey;
  const salt = process.env.EazeBuzzSalt;
  // key|merchant_txn|salt
  var hashstring = `${configkey}|${txnid}|${salt}`;
  let hash = ShaEncrytion.sha512(hashstring);
  const options = {
    method: 'GET',
    url: 'https://dashboard.easebuzz.in/easycollect/v1/get',
    params: {
      key: configkey,
      merchant_txn: txnid,
      hash: hash
    },
    headers: { Accept: 'application/json' }
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
    res.json(data)
  } catch (error) {
    console.error(error);
  }
}

async function PermitGenerateHash(req, res) {
  const {
    PropertyID,
    BillNumber,
    Amount,
    UserName,
    Email,
    Mobile_No,
    LateFees,
  } = req.body;
  let query =
    "SELECT SUM(`Remaining`) AS TotalDueAmount FROM `permitbills` WHERE `BillNumber` = ?";
  let data = new Promise((resolve, reject) => {
    connection.query(query, [BillNumber], async (err, result) => {
      if (result) {
        console.log(result);
        if (result[0]?.TotalDueAmount <= 0 || result[0]?.TotalDueAmount === undefined) {
          resolve(false);
        } else {
          resolve(true);
        }
      } else if (err) {
        console.log(err);
        res.json(false);
      }
    });
  });
  let txnid = Date.now().toString();
  if (await data) {
    const configkey = process.env.EazeBuzzkey;
    const salt = process.env.EazeBuzzSalt;
    var hashstring = `${configkey}|${txnid}|${Amount}|${BillNumber}|${UserName}|${Email}|${Mobile_No}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${salt}`;
    let hash = ShaEncrytion.sha512(hashstring);
    console.log(hashstring);
    const encodedParams = new URLSearchParams();
    encodedParams.set("key", configkey);
    encodedParams.set("txnid", txnid);
    encodedParams.set("amount", Amount);
    encodedParams.set("productinfo", BillNumber);
    encodedParams.set("email", Email);
    encodedParams.set("firstname", UserName);
    encodedParams.set("phone", Mobile_No);
    encodedParams.set("surl", "https://easebuzz.in/");
    encodedParams.set("furl", "https://easebuzz.in/");
    encodedParams.set("hash", hash);
    encodedParams.set("udf1", Mobile_No);
    encodedParams.set("udf2", "");
    encodedParams.set("udf3", "");
    encodedParams.set("udf4", "");
    encodedParams.set("udf5", "");
    encodedParams.set("udf6", "");
    encodedParams.set("udf7", "");
    encodedParams.set("udf8", "");
    encodedParams.set("udf9", "");
    encodedParams.set("udf10", "");

    const options = {
      method: "POST",
      url: process.env.HASHLINK,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      data: encodedParams,
    };

    try {
      const { data } = await axios.request(options);
      res.json(data);
    } catch (error) {
      console.log(error)
      res.json(error);
    }
  } else {
    res.status(409).json("No Due Against Customer");
  }
}
const PermitBillPayment = async (req, res) => {
  const cryptoid = crypto.randomUUID()
  const { txnid, AadharNumber, BillNumber, status, productinfo, mode, net_amount_debit, name_on_card, PaymentMode, hash, firstname, email, easepayid, } = req.body

  const RatePaymenta = await RatePayment(BillNumber, net_amount_debit)
  const sqlpaymentquery = "INSERT INTO `permitpaymenttable`(`txnid`, `CustomerID`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`, `AgentID`, `PaymentMode`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  const billpaymentquery = "UPDATE `permitbills` SET `PaidAmount`=? ,`Remaining`=?,`cryptoid`=? WHERE `BillNumber`=? and `AadharNumber`=?"
  const valuesinsertpaymentquery = [
    txnid,
    AadharNumber,
    BillNumber,
    status,
    productinfo,
    mode,
    net_amount_debit,
    name_on_card,
    mode,
    hash,
    firstname,
    email,
    easepayid,
    "Customer Payment",
    "Customer Online",
    cryptoid
  ]
  connection.query(sqlpaymentquery, valuesinsertpaymentquery, (err, result) => {
    if (err) {
      console.log(err);
      return err
    }

    if (status == 'success') {

      connection.query(billpaymentquery, [RatePaymenta.PaidAmount, RatePaymenta.RemainingAmount, cryptoid, BillNumber, AadharNumber], (err55, result55) => {
        res.json({
          status: 'success',
          message: 'Payment Successfull'
        })
      })

    }
  })
};

const CashPayBill = async (req, res) => {

  const cryptoid = crypto.randomUUID()
  console.log(cryptoid);
  const txnid = Date.now().toString() + 'Cash'
  const status = 'success'
  const {
    PropertyID,
    PaymentAmountRate,
    BillNumber,
    FullName,
    Email,
    Amount
  } = req.body;
  console.log(PropertyID,
    PaymentAmountRate,
    BillNumber,
    FullName,
    Email,
    Amount)
  let query =
    "INSERT INTO `paymenttable`( `txnid`, `CustomerID`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";


  let data = await BillPaymentCalcultion(PropertyID, BillNumber, PaymentAmountRate, PaymentAmountRate, 'Cash');

  const valueinsert = [
    txnid,
    PropertyID,
    BillNumber,
    status,
    PropertyID,
    "Cash",
    PaymentAmountRate,
    data.paidamount,
    FullName,
    "Cash",
    "Cash",
    "Admin",
    Email,
    "Cash",
    cryptoid
  ];
  const valuepayment = [data.discountedamout, data.newtotalamount, data.paidamount, data.Remaining, cryptoid, PropertyID, BillNumber];
  let query1 =
    "UPDATE `bills` SET  `Discount`=?,`TotalAmount`=?,`PaidAmount`=? , `Remaining`=?,`cryptoid`=? WHERE `PropertyID`=? and `BillNumber`=?";

  connection.query(query, valueinsert, (err, results) => {
    if (err) {
      console.error(err);
      res.json("err");
    } else {
      console.log(results);
      if (status === "success") {
        connection.query(query1, valuepayment, (err1, result1) => {
          if (result1) {
            res.json(true);
          } else {
            console.log(err1);
            res.json("Duplicate entry");
          }
        });
      } else {
        res.json(false);
      }
    }
  });
};

async function GenerateLicenseHash(req, res) {
  const {
    Gala,
    BillNumber,
    Amount,
    UserName,
    Email,
    Mobile_No,
    LateFees,
  } = req.body;
  console.log(req.body);

  let query =
    "SELECT `Remaining` FROM `licensebill` WHERE `BillNumber`=?";


  let data = new Promise((resolve, reject) => {
    connection.query(query, [BillNumber], async (err, result) => {
      if (result) {
        console.log("result", result);

        if (result[0]?.Remaining <= 0) {
          resolve(false)
        } else {
          resolve(true);
        }
      } else if (err) {
        console.log(err);
        res.json(false);
      }
    });
  });
  let txnid = Date.now().toString();
  if (await data) {
    const configkey = process.env.EazeBuzzkey;
    const salt = process.env.EazeBuzzSalt;
    var hashstring = `${configkey}|${txnid}|${Amount}|${Gala}|${BillNumber}|${Email}|${Mobile_No}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${salt}`;
    let hash = ShaEncrytion.sha512(hashstring);
    console.log(hashstring);
    const encodedParams = new URLSearchParams();
    encodedParams.set("key", configkey);
    encodedParams.set("txnid", txnid);
    encodedParams.set("amount", Amount);
    encodedParams.set("productinfo", Gala);
    encodedParams.set("email", Email);
    encodedParams.set("firstname", BillNumber);
    encodedParams.set("phone", Mobile_No);
    encodedParams.set("surl", "https://easebuzz.in/");
    encodedParams.set("furl", "https://easebuzz.in/");
    encodedParams.set("hash", hash);
    encodedParams.set("udf1", Mobile_No);
    encodedParams.set("udf2", "");
    encodedParams.set("udf3", "");
    encodedParams.set("udf4", "");
    encodedParams.set("udf5", "");
    encodedParams.set("udf6", "");
    encodedParams.set("udf7", "");
    encodedParams.set("udf8", "");
    encodedParams.set("udf9", "");
    encodedParams.set("udf10", "");

    const options = {
      method: "POST",
      url: process.env.HASHLINK,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      data: encodedParams,
    };

    try {
      const { data } = await axios.request(options);
      res.json(data);
    } catch (error) {
      console.log(error)
      res.json(error);
    }
  } else {
    res.status(409).json("No Due Against Customer");
  }
}

const LicenseBillPayment = async (req, res) => {

  const cryptoid = crypto.randomUUID()
  console.log(cryptoid);
  const {
    txnid,
    Gala,
    BillNumber,
    status,
    productinfo,
    payment_source,
    net_amount_debit,
    name_on_card,
    mode,
    hash,
    firstname,
    email,
    easepayid,
    LateFees,
  } = req.body;
  let query =
    "INSERT INTO `licensepaymenttable`( `txnid`, `Gala`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`,`AgentID`,`PaymentMode`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const valueinsert = [
    txnid,
    Gala,
    BillNumber,
    status,
    productinfo,
    payment_source,
    net_amount_debit,
    name_on_card,
    mode,
    hash,
    firstname,
    email,
    easepayid,
    "Customer Payment",
    "Customer Online",
    cryptoid,
  ];

  let data = await LicenseRatePayment(
    BillNumber,
    net_amount_debit
  );

  console.log(data);
  const valuepayment = [data.PaidAmount, data.RemainingAmount, cryptoid, Gala, BillNumber];
  let query1 =
    "UPDATE `licensebill` SET `PaidAmount`=? , `Remaining`=?,`cryptoid`=? WHERE `Gala`=? and `BillNumber`=?";

  connection.query(query, valueinsert, (err, results) => {
    if (err) {
      console.error(err);
      res.json("err");
    } else {
      console.log(results);
      if (status === "success") {
        connection.query(query1, valuepayment, (err1, result1) => {
          if (result1) {
            res.json(true);
          } else {
            console.log(err1);
            res.json("Duplicate entry");
          }
        });
      } else {
        res.json(false);
      }
    }
  });
};

async function CashHash(req, res) {
  const {
    PropertyID,
    BillNumber,
    PaymentAmountRate,
    UserName,
    Email,
    Mobile_No,
    LateFees,
  } = req.body;
  console.log(PropertyID,
    BillNumber,
    PaymentAmountRate)
  let query =
    "SELECT `Remaining` FROM `bills` WHERE `BillNumber`=?";


  let data = new Promise((resolve, reject) => {
    connection.query(query, [BillNumber], async (err, result) => {
      if (result) {
        if (result[0]?.Remaining >= PaymentAmountRate == false) {
          resolve(false)
        } else {
          resolve(true);
        }
      } else if (err) {
        console.log(err);
        res.json(false);
      }
    });
  });

  const datadiscount = await Discountcodescash('Bills', BillNumber, PropertyID, PaymentAmountRate)
  let actualpaymentamount = datadiscount.newpaymentamount

  let txnid = Date.now().toString();
  if (await data) {

    try {
      res.json(actualpaymentamount);
    } catch (error) {
      console.log(error)
      res.json(error);
    }
  } else {
    res.status(409).json("No Due Against Customer");
  }
}

module.exports = { ApplyDiscount, GenerateHash, BillPayment, BillWhatsappPayment, confirmpayment, PermitGenerateHash, PermitBillPayment, CashPayBill, GenerateLicenseHash, LicenseBillPayment, CashHash };
