const connection = require("../database/db");
async function RatePayment(BillNumber, NetAmounDebit) {
    const payment = "SELECT * FROM `permitbills` WHERE `BillNumber`=?"
    const data = new Promise((resolve, reject) => {
        connection.query(payment, [BillNumber], function (err, results, fields) {
            if (err) {
                resolve(false);
            }
            else {
                resolve(results[0])
            }
        })
    })
    console.log(data);
    const caluclation = await data
    console.log(caluclation);
    if (caluclation == false) {
        return false
    }
    else {
        const OldTotalAmount = Number(caluclation.TotalAmount)
        const OldPaidAmount = Number(caluclation.PaidAmount)
        const Newpaid = Number(NetAmounDebit)
        let newTotalPaid = OldPaidAmount + Newpaid
        let newRemaining = OldTotalAmount - newTotalPaid
        return {
            PaidAmount: newTotalPaid,
            RemainingAmount: newRemaining
        }
    }
}

async function AgentMoneyLimiter(Agentid, MoneyCollected) {
    const query = "SELECT `Moneylimit` FROM `agentlogin` WHERE `AgentID`=?"
    const data = new Promise((resolve, reject) => {
        connection.query(query, [Agentid], (err, result) => {
            if (err) {
                resolve(false)
            }
            else {
                resolve(result[0])
            }
        })
    })

    const agentdata = await data
    if (agentdata == false) {
        return false
    }
    else {
        const OldMoneyLimit = Number(agentdata.Moneylimit)
        const NewMoneyCollected = Number(MoneyCollected)
        let newMoneylimit = OldMoneyLimit - NewMoneyCollected
        console.log(newMoneylimit);
        return {
            Moneylimit: newMoneylimit
        }
    }
}

async function GenerateBillCalcultion(Rate, Gala,Area) {
    console.log(Gala,Rate,Area)
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

    const TotalAmount = Number(Rate) * Number(Area) + Number(TotalAmountTobePaid)
    let Remaining = Number(TotalAmount) - Number(0)
    let obj = {
        Rate: Rate,
        DueAmount: TotalAmountTobePaid,
        TotalAmount: TotalAmount,
        PaidAmount: 0,
        Remaining: Remaining,
    Area:Area
    }
    return obj
}

async function LicenseRatePayment(BillNumber, NetAmounDebit) {
    console.log(BillNumber)
    const payment = "SELECT * FROM `licensebill` WHERE `BillNumber`=? and `Status` = 'NotDump'"
    const data = new Promise((resolve, reject) => {
        connection.query(payment, [BillNumber], function (err, results, fields) {
            if (err) {
                console.log(err)
                resolve(false);
            }
            else {
                resolve(results[0])
            }
        })
    })
    const caluclation = await data
    if (caluclation == false) {
        return false
    }
    else {
        const OldTotalAmount = Number(caluclation.TotalAmount)
        const OldPaidAmount = Number(caluclation.PaidAmount)
        const Newpaid = Number(NetAmounDebit)
        let newTotalPaid = OldPaidAmount + Newpaid
        let newRemaining = OldTotalAmount - newTotalPaid
        console.log({
            PaidAmount: newTotalPaid,
            RemainingAmount: newRemaining
        })
        return {
            PaidAmount: newTotalPaid,
            RemainingAmount: newRemaining
        }
    }
}

module.exports = { RatePayment, AgentMoneyLimiter,GenerateBillCalcultion,LicenseRatePayment }