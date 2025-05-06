const { Worker, parentPort, workerData } = require('worker_threads')
const cluster = require('cluster');
const os = require('os');
const {
    CalculateBill,
    GenerateBillCalcultion,
    CalculateBillForBulkBill,
    UpdateBillCalcultion,
    CalculateBillForLicenseBulkBill,
    GenerateLicenseBillCalcultion
} = require("../Math/BillCalculation");
const connection = require('../database/db');

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
        //To get the first day and last day of the next month (for cron job purposes)
        const currentDate = new Date();
        const fromYear = currentDate.getFullYear();
        const fromMonth = currentDate.getMonth() + 1; // Increment by 1 to get the next month

        // Calculate FromDate as 1st day of the next month
        let fromDate = new Date(fromYear, fromMonth, 1).toLocaleDateString('en-CA');

        // Calculate ToDate as the last day of the next month
        let toDate = new Date(fromYear, fromMonth + 1, 0).toLocaleDateString('en-CA');

        console.log("From Date:", fromDate); // Expected: 2025-02-01
        console.log("To Date:", toDate);     // Expected: 2025-02-28
        
        //first and last day of the current month
        // const currentDate = new Date();
        // const fromYear = currentDate.getFullYear();
        // const fromMonth = currentDate.getMonth(); // No increment
        
        // // First day of the current month
        // let fromDate = new Date(fromYear, fromMonth, 1).toLocaleDateString('en-CA');
        
        // // Last day of the current month
        // let toDate = new Date(fromYear, fromMonth + 1, 0).toLocaleDateString('en-CA');
        
        // console.log("From Date:", fromDate); // Expected: 2025-01-01
        // console.log("To Date:", toDate);     // Expected: 2025-01-31
        
        const customerdata = new Promise((resolve, reject) => {
            let querygetdata = 'SELECT * FROM `licenseregistration` LEFT JOIN typesofpermit on licenseregistration.PermitID=typesofpermit.id'
            connection.query(querygetdata, (err, result) => {
                if (!err) resolve(result)
                else resolve(err)
            })
        })
        //get the datafetched to json
        const fetcheddata = await customerdata
        fetcheddata.map(async (x) => {
            let BillNumber = x.Gala + '_' + (fromMonth + 1) + '_' + fromYear;
            // let BillNumber = x.Gala + '_' + "2" + '_' + fromYear;
            let dyanamicgem = await CalculateBillForLicenseBulkBill(fetcheddata, x.Meter, x.PermitID, x.PermitType)
            console.log(dyanamicgem);
            
            BulkLicenseBillGenerationHelper(x.Gala, fromDate, toDate, x.Area_Use, x.Rate, dyanamicgem.Total, 0, dyanamicgem, BillNumber,x.Area)
        })

        // parentPort.postMessage("Bill generation complete");
    }

    async function BulkLicenseBillGenerationHelper(Gala, fromDate, toDate, Area_Use, TaxRate, Amount, LateFees, dyanamicgem, BillNumber,Area,Rate) {
        // const valuestobillbreak = { ...dyanamicgem };
        let data = await GenerateLicenseBillCalcultion(Amount, Gala,Area,Rate);
        const cryptoid = crypto.randomUUID()
        let TotalRate = 555 * Number(Area)
        let values = [
            Gala,
            BillNumber,
            "555",
            Area,
            // TotalRate,
            fromDate,
            toDate,
            // Area_Use,
            // TaxRate,
            data.DueAmount,
            // data.Amount,
            data.TotalAmount,
            data.PaidAmount,
            data.Remaining,
            cryptoid,
        ];
        // let querytobillbreak =
        //     "INSERT INTO `customerbillbreakdown`(`PropertyID`, `BillNumber`,Particulars,Amount) VALUES (?,?,?,?)";
        let querybillinserted =
            "INSERT INTO `licensebill`( `Gala`,`BillNumber`,`Rate`,`Area`,`FromDate`,`ToDate`,DueAmount,TotalAmount,PaidAmount,Remaining,cryptoid) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        let updatecustomer = "UPDATE `licensebill` SET  `Status` = 'Dump' WHERE `Gala`=?";
        let validatiioncheck = 'SELECT * FROM `licensebill` where Gala= ? '

        let validatiioncheckresul = new Promise((resolve, reject) => {
            connection.query(validatiioncheck, [BillNumber], (err, reesult) => {
                if (reesult) {
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
                    connection.query(querybillinserted, values, (error, results) => {
                        if (results) {
                            console.log("results", results);
                        } else {
                            console.log(error);
                        }

                    });
                } else {

                    console.log(err1);
                }
            });
            return true
        } else {
            console.log('Duplicate bill found');
        }
    }
    Working()
}

