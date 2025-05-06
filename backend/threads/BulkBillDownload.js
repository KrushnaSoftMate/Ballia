const cluster = require('cluster')
const { parentPort, workerData } = require('worker_threads');
const os = require('os');
const fs = require('fs');
const path = require('path');
const connection = require('../database/db');
const { GeneratePDF } = require('../helper/util/bulkpdf');
const util = require('util');


// if (cluster.isMaster) {

//     console.log(`Master ${process.pid} is running`);
//     cluster.fork()
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died`);
//     });
// } else {
//     async function Worker1(locality, foldername, numberfiles, id) {

//         let query = "select * from bills LEFT JOIN customers on customers.PropertyID=bills.PropertyID where customers.locality=? and bills.Status ='NotDump'";
//         let query1 =
//             "SELECT Particulars , Amount FROM `customerbillbreakdown` WHERE `PropertyID`=? and BillNumber=?";
//         const data = new Promise((resolve, reject) => {
//             connection.query(query, [locality], (error, result) => {
//                 if (result) {
//                     resolve(result);
//                 } else {
//                     reject(error);
//                 }

//             })
//         })
//         let datataex = await data;
//         GeneratePDF(datataex, locality, foldername, numberfiles, id)
//         setTimeout(() => {
//             connection.query('DELETE FROM `bulkbilldownload`', (err, response) => err ? console.log(err) : null)
//         }, 1000000)

//     }
//     async function GetData() {
//         let query = 'SELECT * FROM `bulkbilldownload` LIMIT 1'
//         let data = new Promise((resolve, reject) => {
//             connection.query(query, (err, result) => {
//                 if (err) {
//                     resolve(false)
//                 } else {
//                     resolve(result[0])
//                 }
//             })
//         })
//         let { locality, foldername, numberfiles, id } = await data
//         Worker1(locality, foldername, numberfiles, id)
//     }
//     GetData()
// }



// if (cluster.isMaster) {

//     console.log(`Master ${process.pid} is running`);
//     cluster.fork()
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died`);
//     });
// } else {
//     async function Worker1(locality, foldername, numberfiles, id) {

//         // let query = `select * from bills LEFT JOIN customers on customers.PropertyID=bills.PropertyID where customers.locality=? and bills.Status ='NotDump'`;
//         try {
//             let query = `
//                 SELECT * FROM bills
//                 LEFT JOIN customers ON customers.PropertyID = bills.PropertyID
//                 WHERE customers.locality = ? AND bills.Status = 'NotDump'
//             `;

//             let query1 =
//                 "SELECT Particulars , Amount FROM `customerbillbreakdown` WHERE `PropertyID`=? and BillNumber=?";

//             const data = new Promise((resolve, reject) => {
//                 connection.query(query, [locality], (error, result) => {
//                     if (error) return reject(error);
//                     resolve(result);
//                 })
//             });

//             let datataex = await data;

//             await GeneratePDF(datataex, locality, foldername, numberfiles, id);

//             await new Promise((resolve, reject) => {
//                 connection.query('DELETE FROM `bulkbilldownload` WHERE `locality` = ? AND `foldername` = ?', [locality, foldername], (err) => {
//                     if (err) return reject(err);
//                     resolve();
//                 });
//             });

//             parentPort.postMessage('done');
//         }
//         catch (err) {
//             console.error("Worker error:", err);
//             parentPort.postMessage('error');
//         }


//     }
//     async function GetData() {
//         try {
//             let query = 'SELECT * FROM `bulkbilldownload` LIMIT 1';

//             let data = await new Promise((resolve, reject) => {
//                 connection.query(query, (err, result) => {
//                     if (err || result.length === 0) return reject("No data or DB error.");
//                     resolve(result[0]);
//                 })
//             })
//             let { locality, foldername, numberfiles, id } = data;
//             Worker1(locality, foldername, numberfiles, id);

//         }
//         catch (err) {
//             console.error("Failed to start bulk download:", err);
//             parentPort.postMessage('error');
//         }
//     }
//     GetData()
// }


if (cluster.isMaster) {

    console.log(`Master ${process.pid} is running`);
    cluster.fork()
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {

    // const connection = util.promisify(connection.query).bind(connection);
    async function Worker1(locality, foldername, numberfiles, id) {
        console.log("Fucntion Claled :: Worker 1 -----------------");
        // let query = `select * from bills LEFT JOIN customers on customers.PropertyID=bills.PropertyID where customers.locality=? and bills.Status ='NotDump'`;
        try {
            let query = `
                SELECT * FROM bills
                LEFT JOIN customers ON customers.PropertyID = bills.PropertyID
                WHERE customers.locality = ? AND bills.Status = 'NotDump'
            `;

            let query1 =
                "SELECT Particulars , Amount FROM `customerbillbreakdown` WHERE `PropertyID`=? and BillNumber=?";

            const data = new Promise((resolve, reject) => {
                connection.query(query, [locality], (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                })
            });


            let datataex = await data;

            if (!datataex || datataex.length === 0) {
                parentPort?.postMessage({ success: false, message: "No bills found." });
                return;
            }
            console.log("Generate Pdf is now start ")
            GeneratePDF(datataex, locality, foldername, numberfiles, id);

            await new Promise((resolve, reject) => {
                connection.query('DELETE FROM `bulkbilldownload` WHERE `locality` = ? AND `foldername` = ?', [locality, foldername], (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            parentPort.postMessage('done');
        }
        catch (err) {
            console.error("Worker error:", err);
            parentPort.postMessage('error');
        }
    };

    async function GetData() {
        console.log("Fucntion Claled :: GetData -----------------");
        try {
            let query = 'SELECT * FROM `bulkbilldownload` LIMIT 1';

            let data = await new Promise((resolve, reject) => {
                connection.query(query, (err, result) => {
                    if (err || result.length === 0) return reject("No data or DB error.");
                    resolve(result[0]);
                })
            });

            let { locality, foldername, numberfiles, id } = data;

            Worker1(locality, foldername, numberfiles, id);

        }
        catch (err) {
            console.error("Failed to start bulk download:", err);
            parentPort.postMessage('error');
        }
    }
    GetData();

}


