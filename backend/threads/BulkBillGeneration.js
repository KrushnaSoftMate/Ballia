const { Worker, parentPort, workerData } = require('worker_threads')
const cluster = require('cluster');
const os = require('os');
const {
    CalculateBill,
    GenerateBillCalcultion,
    CalculateBillForBulkBill,
    UpdateBillCalcultion
} = require("../Math/BillCalculation");

const connection = require('../database/db');
const crypto = require('crypto');


if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    async function Working() {
        console.log("---------Worker started");


        let q = 'SELECT * FROM `bulkbillgeneration` LIMIT 1'
        let data = new Promise((resolve, reject) => {
            connection.query(q, (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });

        if (!data) return console.log("No bulk bill job found.");


        const { FromDate, ToDate, locality } = await data;

        const currentDate = new Date(FromDate);
        const fromMonth = currentDate.getMonth() + 1;
        const fromYear = currentDate.getFullYear();

        const customerdata = new Promise((resolve, reject) => {
            let querygetdata = 'SELECT * FROM `customers` LEFT JOIN localityrates on customers.uniqueness=localityrates.uniqueness WHERE customers.uniqueness=? and localityrates.Meter=customers.Meter and localityrates.toproperty=customers.PropertyType;'
            connection.query(querygetdata, [locality], (err, result) => {
                if (!err) resolve(result)
                else resolve(err)
            })
        });

        //get the datafetched to json

        const fetcheddata = await customerdata;
        // fetcheddata.map(async (x) => {
        //     let BillNumber = x.PropertyID + '_' + fromMonth + '_' + fromYear;
        //     let dyanamicgem = await CalculateBillForBulkBill(fetcheddata, x.Area_Use, x.TotalARV, x.WaterTaxConnection)
        //     BulkBillGenerationHelper(x.PropertyID, FromDate, ToDate, x.Area_Use, x.rate, dyanamicgem.Total, 0, dyanamicgem, BillNumber)
        // })

        for (const customer of fetcheddata) {
            const BillNumber = `${customer.PropertyID}_${fromMonth}_${fromYear}`;
            const dyanamicgem = await CalculateBillForBulkBill(fetcheddata, customer.Area_Use, customer.TotalARV, customer.WaterTaxConnection);

            await BulkBillGenerationHelper(
                customer.PropertyID,
                FromDate,
                ToDate,
                customer.Area_Use,
                customer.rate,
                dyanamicgem.Total,
                0,
                dyanamicgem,
                BillNumber
            );
        }

        // setTimeout(() => {
        //     let deletequery = 'DELETE FROM `bulkbillgeneration`'
        //     connection.query(deletequery, (err, result) => { err ? console.log(err) : null })
        // }, 1000)

        await new Promise((resolve, reject) => {
            connection.query('DELETE FROM `bulkbillgeneration`', (err, result) => {
                if (err) return reject(err);
                console.log("Bulk generation job cleared.");
                resolve();
            });
        });

        console.log("Bulk billing process completed.");
        // parentPort.postMessage("done");

    }

    async function BulkBillGenerationHelper(PropertyID, FromDate, ToDate, Area_Use, TaxRate, Amount, LateFees, dyanamicgem, BillNumber) {

        const valuestobillbreak = { ...dyanamicgem };
        let data = await GenerateBillCalcultion(Amount, PropertyID);
        const cryptoid = crypto.randomUUID();

        let values = [
            PropertyID,
            BillNumber,
            FromDate,
            ToDate,
            Area_Use,
            TaxRate,
            data.Amount,
            data.DueAmount,
            data.TotalAmount,
            data.PaidAmount,
            data.Remaining,
            cryptoid,
        ];

        // let querytobillbreak =
        //     "INSERT INTO `customerbillbreakdown`(`PropertyID`, `BillNumber`,Particulars,Amount) VALUES (?,?,?,?)";
        // let querybillinserted =
        //     "INSERT INTO `bills`(`PropertyID`, `BillNumber`, `FromDate`, `ToDate`, `Area`, `TaxRate`, `Amount`,`DueAmount`, `TotalAmount`, `PaidAmount`,`Remaining`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        // let updatecustomer = "UPDATE `bills` SET  `Status` = 'Dump' WHERE `PropertyID`=?";
        // let validatiioncheck = 'SELECT * FROM `bills` where BillNumber= ? '

        // let validatiioncheckresul = new Promise((resolve, reject) => {
        //     connection.query(validatiioncheck, [BillNumber], (err, reesult) => {
        //         if (reesult) {
        //             if (reesult?.length > 0) {
        //                 resolve(false)
        //             } else {
        //                 resolve(true)
        //             }
        //         } else {
        //             console.log(err);
        //             resolve(false)
        //         }
        //     })
        // })
        // let valicheck = await validatiioncheckresul
        // if (valicheck) {
        //     connection.query(updatecustomer, [PropertyID], (err1, result1) => {
        //         if (result1) {
        //             connection.query(querybillinserted, values, (error, results) => {
        //                 if (results) {
        //                     Object.keys(valuestobillbreak).map((x) => {

        //                         connection.query(querytobillbreak, [PropertyID, BillNumber, x, valuestobillbreak[x]],
        //                             (err2, result2) => {
        //                                 if (err2) { console.log(err2) }
        //                             }
        //                         );
        //                     })

        //                 } else {
        //                     console.log(error);
        //                 }

        //             });
        //         } else {

        //             console.log(err1);
        //         }
        //     });
        //     return true
        // } else {
        //     console.log('Duplicate');
        // }


        const isUnique = await new Promise((resolve) => {
            connection.query('SELECT * FROM `bills` WHERE BillNumber = ?', [BillNumber], (err, result) => {
                if (err) return resolve(false);
                resolve(result.length === 0);
            });
        });

        if (!isUnique) return console.log(`Duplicate BillNumber skipped: ${BillNumber}`);

        await new Promise((resolve) => {
            connection.query("UPDATE `bills` SET `Status` = 'Dump' WHERE `PropertyID`=?", [PropertyID], (err) => {
                if (err) console.log(err);
                resolve();
            });
        });

        await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO `bills`(`PropertyID`, `BillNumber`, `FromDate`, `ToDate`, `Area`, `TaxRate`, `Amount`,`DueAmount`, `TotalAmount`, `PaidAmount`,`Remaining`,`cryptoid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                values,
                (err) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });

        for (let key in valuestobillbreak) {
            await new Promise((resolve) => {
                connection.query(
                    "INSERT INTO `customerbillbreakdown`(`PropertyID`, `BillNumber`, Particulars, Amount) VALUES (?,?,?,?)",
                    [PropertyID, BillNumber, key, valuestobillbreak[key]],
                    (err) => {
                        if (err) console.log(err);
                        resolve();
                    }
                );
            });
        }


    }
    Working().catch(console.error)
}

