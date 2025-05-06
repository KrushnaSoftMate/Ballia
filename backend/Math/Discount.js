const connection = require("../database/db")


async function Discountcodes(Discountforpercnet, BillNumber, PropertyID, PayingAmount) {
    let discountchecker = await DicountFor(Discountforpercnet, BillNumber, PropertyID, PayingAmount)
    // let finaldiscountchecker = await discountchecker
    let finaldiscountchecker = discountchecker
    const discount = finaldiscountchecker.Discount
    const resultop = finaldiscountchecker.CustomerData

    if (Number(resultop.Remaining) != Number(PayingAmount)) {
        let obj = {
            discountrate: 0,
            newpaymentamount: PayingAmount,
            discountedamout: 0
        }
        return obj
    }
    if (resultop && discount) {
        const Percent = Number(discount.Percent)
        let discountedamout = Math.ceil(Number(resultop.Amount) * Percent / 100)
        let newpaymentamount = Math.ceil(Number(PayingAmount) - Number(discountedamout))
        let obj = {
            discountrate: Percent,
            newpaymentamount: newpaymentamount,
            discountedamout: discountedamout
        }
        return obj
    } else {
        let discountedamout = Math.ceil(Number(resultop.Remaining) * 1 / 100)
        let newpaymentamount = Math.ceil(Number(PayingAmount) - Number(discountedamout))
        let obj = {
            discountrate: 1,
            newpaymentamount: newpaymentamount,
            discountedamout: discountedamout
        }
        return obj
    }


}

async function DicountFor(Discountforpercnet, BillNumber, PropertyID, PayingAmount) {
    let query = "SELECT * FROM `discountcodes` WHERE `DiscountFor`=?";

    let query3check = "SELECT * FROM `bills` WHERE `BillNumber`=? and `PropertyID`=? and `Status`='NotDump'";

    const data = new Promise((resolve, reject) => {
        connection.query(query3check, [BillNumber, PropertyID], (err1, result1) => {
            if (!result1 || result1.length === 0) {
                console.log('No bill found');
                resolve({ Discount: false, CustomerData: null });
                return;
            }

            if (result1[0].Discount == 0) {
                connection.query(query, [Discountforpercnet], (err, result) => {
                    if (result[0].Status == 'Active' && Number(result1[0].Remaining) == Number(PayingAmount) && Number(result1[0].Amount) <= Number(PayingAmount)) {
                        console.log('heavy discount')
                        let obj = {
                            Discount: result[0],
                            CustomerData: result1[0]
                        }
                        resolve(obj)
                    }
                    else if (result1[0].Remaining == PayingAmount) {
                        console.log('one discount')
                        let obj = {
                            Discount: false,
                            CustomerData: result1[0]
                        }
                        resolve(obj)
                    } else {
                        console.log('no discount')
                        let obj = {
                            Discount: false,
                            CustomerData: result1[0]
                        }
                        resolve(obj)
                    }

                })
            }
            else {
                console.log('no discount')
                let obj = {
                    Discount: false,
                    CustomerData: result1[0]
                }

                resolve(obj)

            }
        })
    })
    const checkdata = await data
    return checkdata
}

async function Discountcodescash(Discountforpercnet, BillNumber, PropertyID, PayingAmount) {
    let discountchecker = await DicountForcash(Discountforpercnet, BillNumber, PropertyID, PayingAmount)
    let finaldiscountchecker = await discountchecker
    const discount = finaldiscountchecker.Discount
    const resultop = finaldiscountchecker.CustomerData

    if (Number(resultop.Remaining) != Number(PayingAmount)) {
        let obj = {
            discountrate: 0,
            newpaymentamount: PayingAmount,
            discountedamout: 0
        }
        return obj
    }
    if (resultop && discount) {
        const Percent = Number(discount.Percent)
        let discountedamout = Math.ceil(Number(resultop.Amount) * Percent / 100)
        let newpaymentamount = Math.ceil(Number(PayingAmount) - Number(discountedamout))
        let obj = {
            discountrate: Percent,
            newpaymentamount: newpaymentamount,
            discountedamout: discountedamout
        }
        return obj
    } else {
        // let discountedamout = Math.ceil(Number(resultop.Remaining) * 0 / 100)
        let newpaymentamount = Math.ceil(Number(PayingAmount) - Number(discountedamout))
        let obj = {
            discountrate: 0,
            newpaymentamount: newpaymentamount,
            discountedamout: 0
        }
        return obj
    }


}

async function DicountForcash(Discountforpercnet, BillNumber, PropertyID, PayingAmount) {
    let query = "SELECT * FROM `discountcodes` WHERE `DiscountFor`=?"
    let query3check = "SELECT * FROM `bills` WHERE `BillNumber`=? and `PropertyID`=? and `Status`='NotDump'"
    const data = new Promise((resolve, reject) => {
        connection.query(query3check, [BillNumber, PropertyID], (err1, result1) => {
            if (result1[0].Discount == 0) {
                connection.query(query, [Discountforpercnet], (err, result) => {
                    if (result[0].Status == 'Active' && result1[0].Remaining == PayingAmount && result1[0].Amount <= PayingAmount) {
                        console.log('heavy discount')
                        let obj = {
                            Discount: result[0],
                            CustomerData: result1[0]
                        }
                        resolve(obj)
                    }
                    else if (result1[0].Remaining == PayingAmount) {
                        console.log('one discount')
                        let obj = {
                            Discount: false,
                            CustomerData: result1[0]
                        }
                        resolve(obj)
                    } else {
                        console.log('no discount')
                        let obj = {
                            Discount: false,
                            CustomerData: result1[0]
                        }
                        resolve(obj)
                    }

                })
            }
            else {
                console.log('no discount')
                let obj = {
                    Discount: false,
                    CustomerData: result1[0]
                }

                resolve(obj)

            }
        })
    })
    const checkdata = await data
    return checkdata
}




module.exports = { Discountcodes, DicountFor, Discountcodescash, DicountForcash }