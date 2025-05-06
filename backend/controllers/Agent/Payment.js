const connection = require('../../database/db')
const axios = require('axios').default
const Sha512 = require('js-sha512')
const { URLSearchParams } = require('url');
const crypto=require('crypto')
const {RatePayment,AgentMoneyLimiter,LicenseRatePayment} =require('../../Math/AgentCalcultion')
async function GetPaymentToken(req, res) {
    const txnid = Date.now().toString()
    const { PaymentAmountRate, BillNumber, FullName, Email, ContactNumber } = req.body
    const key = process.env.EazeBuzzkey
    const salt = process.env.EazeBuzzSalt
    const RatePaymenta = await RatePayment(BillNumber,PaymentAmountRate)
    if (RatePaymenta.RemainingAmount<0) {
      return res.json('error')
    }
    const stringhash = `${key}|${txnid}|${PaymentAmountRate}|${BillNumber}|${FullName}|${Email}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${salt}`
    const hashedstring = Sha512.sha512(stringhash)
    console.log(hashedstring)
    const encodedParams = new URLSearchParams();
    encodedParams.set('key', key);
    encodedParams.set('txnid', txnid);
    encodedParams.set('amount', PaymentAmountRate);
    encodedParams.set('productinfo', BillNumber);
    encodedParams.set('firstname', FullName);
    encodedParams.set('phone', ContactNumber);
    encodedParams.set('email', Email);
    encodedParams.set('surl', 'https://easebuzz.in/');
    encodedParams.set('furl', 'https://easebuzz.in/');
    encodedParams.set('hash', hashedstring);
    encodedParams.set('udf1', '');
    encodedParams.set('udf2', '');
    encodedParams.set('udf3', '');
    encodedParams.set('udf4', '');
    encodedParams.set('udf5', '');
    encodedParams.set('udf6', '');
    encodedParams.set('udf7', '');
    encodedParams.set('udf8', '');
    encodedParams.set('udf9', '');
    encodedParams.set('udf10', '');
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
        console.log(data)
        res.json(data);
      } catch (error) {
        console.log(error)
        res.json(error);
      }
}


async function PayBill(req, res) {
  const cryptoid = crypto.randomUUID()
  const {txnid,AadharNumber,BillNumber,status,productinfo,mode,net_amount_debit,name_on_card,PaymentMode,hash,firstname,email,easepayid,}=req.body
  const agent=req.AgentDetails.AgentID
  const RatePaymenta = await RatePayment(BillNumber,net_amount_debit)
  const sqlpaymentquery="INSERT INTO `permitpaymenttable`(`txnid`, `CustomerID`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`, `AgentID`, `PaymentMode`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  const agentquery="UPDATE `agentlogin` SET `Moneylimit`=? WHERE `AgentID`=?"
  const billpaymentquery="UPDATE `permitbills` SET `PaidAmount`=? ,`Remaining`=?,`cryptoid`=? WHERE `BillNumber`=? and `AadharNumber`=?"
const valuesinsertpaymentquery=[
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
agent,
PaymentMode,
cryptoid,
]
const dataofmoneyagent=await AgentMoneyLimiter(agent,net_amount_debit)
  connection.query(sqlpaymentquery,valuesinsertpaymentquery,(err,result)=>{
    if (err) {return err}
    if(status=='success'){
      connection.query(agentquery,[dataofmoneyagent.Moneylimit,agent],(err,result)=>{
        if (err) {return err}
        connection.query(billpaymentquery,[RatePaymenta.PaidAmount,RatePaymenta.RemainingAmount,cryptoid,BillNumber,AadharNumber],(err55,result55)=>{
          res.json({
            status:'success',
            message:'Payment Successfull'
          })
        })
      })
    }
  })
}

async function CashPayBill(req, res) {
  const cryptoid = crypto.randomUUID()
  const {AadharNumber,BillNumber,PaymentAmountRate,PaymentMode,FullName,Email}=req.body
  const txnid=Date.now().toString()+'Cash'
  const status='success'
  const agent=req.AgentDetails.AgentID
  const RatePaymenta = await RatePayment(BillNumber,PaymentAmountRate)
  const sqlpaymentquery="INSERT INTO `permitpaymenttable`(`txnid`, `CustomerID`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`, `AgentID`, `PaymentMode`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  const agentquery="UPDATE `agentlogin` SET `Moneylimit`=? WHERE `AgentID`=?"
  const billpaymentquery="UPDATE `permitbills` SET `PaidAmount`=? ,`Remaining`=?,`cryptoid`=? WHERE `BillNumber`=? and `AadharNumber`=?"
const valuesinsertpaymentquery=[
txnid,
AadharNumber,
BillNumber,
status,
BillNumber,
'Cash',
PaymentAmountRate,
FullName,
'Cash',
'Cash',
FullName,
Email,
'Cash',
agent,
PaymentMode,
cryptoid,
]
const dataofmoneyagent=await AgentMoneyLimiter(agent,PaymentAmountRate)
  connection.query(sqlpaymentquery,valuesinsertpaymentquery,(err,result)=>{
    if (err) {
      console.log(err)
      return err}
    if(status=='success'){
      connection.query(agentquery,[dataofmoneyagent.Moneylimit,agent],(err,result)=>{
        console.log(result);
        if (err) {return err}
        connection.query(billpaymentquery,[RatePaymenta.PaidAmount,RatePaymenta.RemainingAmount,cryptoid,BillNumber,AadharNumber],(err55,result55)=>{
          if (result55) {
            console.log(result55);
            res.json({
              status:'success',
              message:'Payment Successfull'
            })
          } else {
            console.log(err55);
          }
        })
      })
    }
  })
}

async function GetPaymentTokenForLicense(req, res) {
  const txnid = Date.now().toString()
  const { PaymentAmountRate, BillNumber, FullName, Email, ContactNumber,Gala } = req.body
  const key = process.env.EazeBuzzkey
  const salt = process.env.EazeBuzzSalt
  const RatePaymenta = await LicenseRatePayment(BillNumber,PaymentAmountRate)

  if (RatePaymenta.RemainingAmount<=0) {
    return res.json('error')
  }

  const stringhash = `${key}|${txnid}|${PaymentAmountRate}|${Gala}|${FullName}|${Email}|${BillNumber}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${""}|${salt}`
  const hashedstring = Sha512.sha512(stringhash)
  console.log(hashedstring)
  const encodedParams = new URLSearchParams();
  encodedParams.set('key', key);
  encodedParams.set('txnid', txnid);
  encodedParams.set('amount', PaymentAmountRate);
  encodedParams.set('productinfo', Gala);
  encodedParams.set('firstname', FullName);
  encodedParams.set('phone', ContactNumber);
  encodedParams.set('email', Email);
  encodedParams.set('surl', 'https://easebuzz.in/');
  encodedParams.set('furl', 'https://easebuzz.in/');
  encodedParams.set('hash', hashedstring);
  encodedParams.set('udf1', BillNumber);
  encodedParams.set('udf2', '');
  encodedParams.set('udf3', '');
  encodedParams.set('udf4', '');
  encodedParams.set('udf5', '');
  encodedParams.set('udf6', '');
  encodedParams.set('udf7', '');
  encodedParams.set('udf8', '');
  encodedParams.set('udf9', '');
  encodedParams.set('udf10', '');
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
      console.log(data)
      res.json(data);
    } catch (error) {
      console.log(error)
      res.json(error);
    }
}

async function PayLicenseBill(req, res) {
  const cryptoid = crypto.randomUUID()
  const {txnid,Gala,BillNumber,status,productinfo,mode,net_amount_debit,name_on_card,PaymentMode,hash,firstname,email,easepayid}=req.body
  const agent=req.AgentDetails.AgentID
  const RatePaymenta = await LicenseRatePayment(BillNumber,net_amount_debit)
  const sqlpaymentquery="INSERT INTO `licensepaymenttable`(`txnid`, `Gala`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`, `AgentID`, `PaymentMode`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  const agentquery="UPDATE `agentlogin` SET `Moneylimit`=? WHERE `AgentID`=?"
  const billpaymentquery="UPDATE `licensebill` SET `PaidAmount`=? ,`Remaining`=?,`cryptoid`=? WHERE `BillNumber`=? and Status='NotDump' "
const valuesinsertpaymentquery=[
txnid,
Gala,
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
agent,
PaymentMode,
cryptoid,
]
const dataofmoneyagent=await AgentMoneyLimiter(agent,net_amount_debit)
  connection.query(sqlpaymentquery,valuesinsertpaymentquery,(err,result)=>{
    if (err) {return err}
    if(status=='success'){
      connection.query(agentquery,[dataofmoneyagent.Moneylimit,agent],(err,result)=>{
        if (err) {return err}
        connection.query(billpaymentquery,[RatePaymenta.PaidAmount,RatePaymenta.RemainingAmount,cryptoid,BillNumber],(err55,result55)=>{
          res.json({
            status:'success',
            message:'Payment Successfull'
          })
        })
      })
    }
  })
}

async function LicenseCashPayBill(req, res) {
  const cryptoid = crypto.randomUUID()
  const {Gala,BillNumber,PaymentAmountRate,PaymentMode,FullName,Email}=req.body
  
  const txnid=Date.now().toString()+'Cash'
  const status='success'
  const agent=req.AgentDetails.AgentID
  const RatePaymenta = await LicenseRatePayment(BillNumber,PaymentAmountRate)
  if (RatePaymenta.RemainingAmount<=0 || PaymentAmountRate<=0) {
    return res.status(500).json('error')
  }
  const sqlpaymentquery="INSERT INTO `licensepaymenttable`(`txnid`, `Gala`, `BillNumber`, `status`, `productinfo`, `payment_source`, `net_amount_debit`, `name_on_card`, `mode`, `hash`, `firstname`, `email`, `easepayid`, `AgentID`, `PaymentMode`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  const agentquery="UPDATE `agentlogin` SET `Moneylimit`=? WHERE `AgentID`=?"
  const billpaymentquery="UPDATE `licensebill` SET `PaidAmount`=? ,`Remaining`=?,`cryptoid`=? WHERE `BillNumber`=? and Status='NotDump'"
const valuesinsertpaymentquery=[
txnid,
Gala,
BillNumber,
status,
BillNumber,
'Cash',
PaymentAmountRate,
FullName,
'Cash',
'Cash',
FullName,
Email,
'Cash',
agent,
PaymentMode,
cryptoid,
]
const dataofmoneyagent=await AgentMoneyLimiter(agent,PaymentAmountRate)
  connection.query(sqlpaymentquery,valuesinsertpaymentquery,(err,result)=>{
    if (err) {
      console.log(err)
      return err}
    if(status=='success'){
      connection.query(agentquery,[dataofmoneyagent.Moneylimit,agent],(err,result)=>{
        console.log(result);
        if (err) {return err}
        connection.query(billpaymentquery,[RatePaymenta.PaidAmount,RatePaymenta.RemainingAmount,cryptoid,BillNumber],(err55,result55)=>{
          if (result55) {
  
            res.json({
              status:'success',
              message:'Payment Successfull'
            })
          } else {
            console.log(err55);
          }
        })
      })
    }
  })
}

module.exports = { PayBill ,GetPaymentToken,CashPayBill,GetPaymentTokenForLicense,PayLicenseBill,LicenseCashPayBill}