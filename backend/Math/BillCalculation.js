const connection = require("../database/db");
const { onepercentdiscont, Discountcodes, DiscountCalculation,DicountFor ,Discountcodescash} = require("./Discount");

async function CalculateBill(obj,TotalArv,WaterConnection) {
  console.log("ssssss",obj,TotalArv,WaterConnection)
  let CalculatedObj = [];
  let amount = 0;
  let ConsumerNo = "";
  let details = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM taxtype', (err, result) => {
      resolve(result);
    })
  })

  let rate = obj[0].rate
  details = await details
  let OtherRate = obj[0].OtherRate
  details.forEach((element) => {
    let name = element.TaxName;
    let AmountRate;

    if (name === "Water Tax" && WaterConnection === "No") {
      AmountRate = 0; // Set water tax to 0 if WaterTaxConnection is not "yes"
    } else {
       let newTotalArv=parseInt(TotalArv)
       AmountRate = Number(newTotalArv) * 10 / 100;
    }

    console.log(`${name} AmountRate: ${AmountRate}`);

    CalculatedObj[name] = Math.ceil(AmountRate);
    CalculatedObj.push({ TaxName: name, amountrate: AmountRate, rate: rate });
    amount += Math.ceil(AmountRate);
  });
  CalculatedObj.push({ Total: amount });


  return CalculatedObj;
}

async function GenerateBillCalcultion(Amount, CustomerID) {
  let data = new Promise((resolve, reject) => {
    let query = "SELECT `Remaining` AS TotalDueAmount FROM `bills` WHERE `PropertyID` = ? and `Status` = 'NotDump'"
    connection.query(query, [CustomerID], (err, result) => {
      if (result) {
        resolve(result[0]);
      } else {
        console.log("Error in calcution" + err);
      }
    }
    );
  });
  let DueAmount = await data

  let TotalAmountTobePaid = 0;
  TotalAmountTobePaid = DueAmount?.TotalDueAmount == undefined || null ? Number(0) : Number(DueAmount?.TotalDueAmount)
  if(TotalAmountTobePaid>=0){
    let interest = TotalAmountTobePaid * 10 / 100
  

  const TotalAmount = Number(Amount) + Number(TotalAmountTobePaid) + Number(interest)
  let Remaining = Number(TotalAmount) - Number(0)
  let obj = {
    Amount: Math.ceil(Amount),
    DueAmount: Math.ceil(Number(TotalAmountTobePaid) + Number(interest)),
    TotalAmount: Math.ceil(TotalAmount),
    PaidAmount: 0,
    Remaining: Math.ceil(Remaining)
  }
  return obj
}
 else{
  let interest=0
  const TotalAmount = Number(Amount) + Number(TotalAmountTobePaid) + Number(interest)
  let Remaining = Number(TotalAmount) - Number(0)
  let obj = {
    Amount: Math.ceil(Amount),
    DueAmount: Math.ceil(Number(TotalAmountTobePaid) + Number(interest)),
    TotalAmount: Math.ceil(TotalAmount),
    PaidAmount: 0,
    Remaining: Math.ceil(Remaining)
  }
  return obj
 }
}

async function GenerateLicenseBillCalcultion(Amount, Gala,Area,Rate) {
  console.log(Amount, Gala,Area,Rate)
  let data = new Promise((resolve, reject) => {
      let query = "SELECT `Remaining` AS TotalDueAmount FROM `licensebill` WHERE `Gala` = ? and `Status` = 'NotDump'"
      connection.query(query, [Gala], (err, result) => {
          if (result) {
              resolve(result[0]);
          } else {
              console.log("Error in calcution" + err);
          }
      }
      );

  });
  let DueAmount = await data
  let TotalAmountTobePaid = 0;
  TotalAmountTobePaid = DueAmount?.TotalDueAmount == undefined || null ? Number(0) : Number(DueAmount?.TotalDueAmount)

  const TotalAmount = 555 * Number(Area) + Number(TotalAmountTobePaid)
  let Remaining = Number(TotalAmount) - Number(0)
  let obj = {
      Rate: Amount,
      DueAmount: TotalAmountTobePaid,
      TotalAmount: TotalAmount,
      PaidAmount: 0,
      Remaining: Remaining
  }
  console.log("obj",obj);
  
  return obj
}

async function BillPaymentCalcultion(CustomerID, BillNumber, TotalpaidAmount,Amount,paymentmode) {

  let discountdata = paymentmode=='Cash'?await Discountcodescash('Bills', BillNumber, CustomerID, Amount):await Discountcodes('Bills', BillNumber, CustomerID, Amount)
  
  let newTotalpaid=discountdata.newpaymentamount
   let query = "SELECT * FROM `bills` WHERE `BillNumber`=? and `PropertyID`=? and `Status`='NotDump'"
  let data = new Promise((resolve, reject) => {
    connection.query(query, [BillNumber,CustomerID ], async(err, result) => {
        resolve(result[0])
    });
  });
  let obj = await data;

  const newtotalamount=Math.ceil(Number(obj.Amount)+Number(obj.DueAmount)-Number(discountdata.discountedamout))
  const paidamount = Math.ceil(Number(obj.PaidAmount) + Number(newTotalpaid))
  let Remaining = Math.ceil(Number(newtotalamount) - Number(paidamount))
  let dyanmiobj={
    Remaining: Remaining, 
    paidamount: paidamount,
    newtotalamount:newtotalamount,
    ...discountdata
  }
  return dyanmiobj
}


async function CalculateBillForBulkBill(obj, Area_Use,TotalArv,WaterConnection) {
  // console.log(TotalARV);
  let CalculatedObj = {};
  let amount = 0;
  let ConsumerNo = "";

  let details = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM `taxtype`', (err, result) => {
      resolve(result);
    })
  })

  let rate = obj[0].rate
  let OtherRate = obj[0].OtherRate
  details = await details

  details.forEach((element) => {
    let name = element.TaxName;
    let AmountRate;

    if (name === "Water Tax" && WaterConnection === "No") {
      AmountRate = 0; // Set water tax to 0 if WaterTaxConnection is not "yes"
    } else {
      AmountRate = Number(TotalArv) * 10 / 100;
    }

    // console.log(`${name} AmountRate: ${AmountRate}`);

    CalculatedObj[name] = Math.ceil(AmountRate);
    amount += Math.ceil(AmountRate);
  });
  
  CalculatedObj['Total'] = amount
  return CalculatedObj;
}


async function UpdateBillCalcultion(BillNumber, Amount) {
  const data = new Promise((resolve, reject) => {
    let query = 'SELECT * FROM `bills` WHERE `BillNumber`=?'
    connection.query(query, [BillNumber], (err, result) => {
      resolve(result[0])
    })
  })
  const valution = await data


  let Newamout = Amount
  let DueAmount = Number(valution.DueAmount)
  let TotalAmount = Number(Newamout) + Number(DueAmount)
  let PaidAmount = Number(valution.PaidAmount)
  let Remaining = Number(TotalAmount) - Number(PaidAmount)
  let obj = {
    Newamout: Newamout,
    DueAmount: DueAmount,
    TotalAmount: TotalAmount,
    PaidAmount: PaidAmount,
    Remaining: Remaining
  }

  return obj
}


async function BillPaymentCalcultionCash(CustomerID, BillNumber, TotalpaidAmount) {
  let query =
    "SELECT * FROM `bills` WHERE `PropertyID`=? and `BillNumber`=? and `Status`='NotDump'";
  let data = new Promise((resolve, reject) => {
    connection.query(query, [CustomerID, BillNumber], (err, result) => {
      resolve(result[0]);
    });
  });
  let obj = await data;
 
  const paidamount=Math.ceil(Number(obj.PaidAmount)+Number(TotalpaidAmount))
 
  let Remaining = Math.ceil(Number(obj.TotalAmount) - Number(paidamount))
 
  return {Remaining:Remaining,paidamount:paidamount}
}

async function CalculateBillForLicenseBulkBill(obj,Meter,PermitID,PermitType) {
  // console.log(TotalARV);
  let CalculatedObj = [];
  let amount = 0;
  let ConsumerNo = "";

  let details = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM `typesofpermit` WHERE `PermitTypes`=?',[PermitType], (err, result) => {
      resolve(result);
    })
  })

  // let rate = obj[0].rate
  let OtherRate = obj[0].OtherRate
  let rate = "555"
  let Area = obj[0].Area //Area in square meter  
  //Conversion: 1 meter is approximately equal to 39.37 inches. 
//Foot to Meter: 1 foot is roughly equal to 0.3048 meters. 
  details = await details
  console.log("details",details);
  
  // details.forEach((element) => {
  //   let name = element.TaxName;
  //   let AmountRate;

  //   if (name === "Water Tax" && WaterConnection === "No") {
  //     AmountRate = 0; // Set water tax to 0 if WaterTaxConnection is not "yes"
  //   } else {
  //     AmountRate = Number(TotalArv) * 10 / 100;
  //   }

  //   // console.log(`${name} AmountRate: ${AmountRate}`);

  //   CalculatedObj[name] = Math.ceil(AmountRate);
  //   amount += Math.ceil(AmountRate);
  // });
 
    let name= details[0].PermitTypes
    let Rate = Number(rate) 
    console.log("Rate",Rate);
    console.log("name",name);
    
    
      CalculatedObj.push({TaxName:name,amountrate:Rate});
      console.log(CalculatedObj);
      amount = amount + Rate * Area;
    
  
  CalculatedObj['Total'] = amount
  return CalculatedObj;
}

module.exports = { BillPaymentCalcultionCash,CalculateBill, GenerateBillCalcultion, BillPaymentCalcultion, CalculateBillForBulkBill, UpdateBillCalcultion,CalculateBillForLicenseBulkBill,GenerateLicenseBillCalcultion };
