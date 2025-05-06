
var fs = require("fs");
const connection = require('../../database/db');
const archiver = require('archiver')
const QRCode = require('qrcode');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    // log warning
  }
});

// good practice to catch this error explicitly
archive.on('error', function (err) {
  throw err;
});
async function getzip(req, res) {
  const { id } = req.body;
  let querycheck = "SELECT * FROM `bulkbilldownload` limit 1"
  let querystatus = "update bulkbilldownload set `status`='zip created' where `id`=? "
  let data = new Promise((resolve, reject) => {
    connection.query(querycheck, (err, result) => { resolve(result[0]) })
  })
  let datacheck = await data
  let { locality, foldername, numberfiles } = datacheck
  const output = fs.createWriteStream('./public/Assets' + '/' + foldername + '.zip');
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    connection.query(querystatus, [id], (err, result) => err ? console.log(err) : null)
    res.json('./public/Assets' + '/' + foldername + '.zip')
    fs.rm('./public/Assets' + '/' + foldername, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete the directory' });
      }

    });
  });
  archive.pipe(output);
  archive.directory('./public/Assets/' + foldername, false);
  archive.finalize();
}

// async function GeneratePDF(datataex, locality, foldername, numberfiles, id) {
//   console.log(id);
//   let dividenumber = Number(numberfiles)
//   let filedivision = Math.ceil(datataex.length / dividenumber)
//   let array = Array(dividenumber).fill(filedivision)
//   let query = "update bulkbilldownload set `status`='true' where `id`=? "
//   fs.mkdirSync('./public/Assets/' + foldername)
//   for (let i = 0; i < array.length; i++) {
//     if (array[i - 1] == undefined || null) {
//       array[i] = array[i] - 0
//       await filewriter(datataex, 0, array[i], filedivision, false, foldername)
//     }
//     else if (i == array.length - 1) {
//       array[i] = array[i - 1] + filedivision
//       await filewriter(datataex, array[i - 1], array[i], filedivision, true, foldername);

//       connection.query(query, [id], (err, response) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('Status updated');
//         }
//       });
//     }
//     else {
//       array[i] = array[i - 1] + filedivision
//       await filewriter(datataex, array[i - 1], array[i], filedivision, false, foldername)
//     }

//   }

// }

async function GeneratePDF(datataex, locality, foldername, numberfiles, id) {
  console.log("Function Called :: Generate PDf -------------")
  console.log("File ID id get :: ", id);
  console.log("Data i get :: ", datataex, locality, foldername, numberfiles);


  let dividenumber = Number(numberfiles)
  let filedivision = Math.ceil(datataex.length / dividenumber)
  let array = Array(dividenumber).fill(filedivision);

  const folderPath = path.join(__dirname, '../../public/Assets', foldername);

  // const folderPath = `./public/Assets/${foldername}`;
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });  // Ensures nested directories are created if needed
  };

  // Build chunk array indexes
  const chunkIndexes = [];
  for (let i = 0; i < dividenumber; i++) {
    const start = i * filedivision;
    const end = (i + 1) * filedivision;
    chunkIndexes.push({ start, end });
  };



  // Provess each chunks 

  for (let i = 0; i < chunkIndexes.length; i++) {
    const { start, end } = chunkIndexes[i];
    const isLast = i === chunkIndexes.length - 1;

    await filewriter(datataex, start, end, fileDivision, isLast, foldername);


    if (isLast) {
      let query = "UPDATE bulkbilldownload SET `status`='true' WHERE `id`=? ";
      connection.query(query, [id], (err, result) => {
        if (err) {
          console.log("Failed to update status:", err);
          throw err;
        }
        else {
          console.log("Download status updated in DB.");
        }
      })
    }

  }

}

// async function filewriter(datataex, start, end, filedivision, condition, foldername) {

//   let query1 = "SELECT Particulars , Amount FROM `customerbillbreakdown` WHERE `PropertyID`=? and BillNumber=?";
//   var text = ''
//   const filePath = './public/Assets/' + foldername + '/' + end + 'BulkBillFile.html'
//   datataex.slice(start, end).map((x, index) => {
//     connection.query(query1, [x.PropertyID, x.BillNumber], (err, result) => {
//       const qrData = process.env.ORGIN + '/Customer/PayBill/' + x.PropertyID;
//       QRCode.toDataURL(qrData, (err, url) => {
//         if (err) {
//           console.error('Error generating QR code:', err);
//           return;
//         }
//         text += `
//         <div style="display: flex; justify-content: center; background-color: rgb(233, 248, 241);">
//           <div class="bill-container">
//             <div class="bill-header">
//               <div>
//                 <img src="${process.env.BACKEND + '/Assets/UP-logo.jpg'}" width="100px" alt="">
//               </div>
//               <div class="municipal-council" style="color: red;">
//                 <h1>Municipal Council, Mirzapur</h1>
//               </div>
//               <div class="form">Form 17</div>
//               <div class="bill-title">Bill (House Tax/Water Tax/Drainage Tax)
//               </div>
//               <div class="financial-year">Financial year ${new Date(x.ToDate).getFullYear()}</div>
//               </div>
//               <img src="${url}" alt="QR Code">
//               <div class="estate-details">
//               <div class="estate-code">Estate Code: ${x.PropertyID}</div>
//               <div class="ward">${x.uniqueness}</div>
//               </div>
//                 <div style="border: 1px solid black; padding: 5px; background-color: rgb(253, 232, 233);">
//                 <div class="innerheader"><div style="color: rgb(248, 34, 40);">Bill number: ${x.BillNumber}</div>
//                 <div>House number:${x.Plot_No}</div>
//               </div>
//               <div class="innerheader">
//               <div>Bill date: ${new Date(x.ToDate).toDateString()}</div>
//               <div>Use of building: ${x.PropertyType}</div>
//               </div><div class="innerheader">
//               <div class="assessment-title">
//               impressive Date : / / </div>
//               <div class="impressive-date">
//               Assessment: ${x.Amount}
//               </div>
//               </div>
//               </div>
//               <div style="border: 1px solid black; padding: 5px; background-color: rgb(233, 248, 241);">
//               <div class="innerheader">
//               <div>Address: ${x.Address}
//               </div>
//               <div>Mobile No :${x.ContactNumber}
//               </div>
//               </div>
//               <div class="innerheader">
//               <div>${x.FullName}</div>
//               <div>${x.uniqueness}</div>
//               </div>
//               </div>
//               <div style="border: 1px solid black;">
//               <div class="tax-details-title" style="text-align: center;">
//               Details of Taxes</div>
//               <div class="tax-table" style="display: grid; justify-content: center; width: 100%;">
//               <table class="table table-striped tax-table-data" style="width: 52vw;">
//               <thead class="table-dark">
//               <tr>
//               <th>Tax</th>
//               <th>Amount</th>
//               </tr>
//               </thead>
//               <tbody>

//               ${result.map((xe) => `
//                         <tr>
//                           <td style="width: 25%; text-align: center;">

//                                 <b>${xe.Particulars}</b>
//                             </td>
//                             <td align="center" style="width: 25%;">
//                                 <span id="lbl_genTax2">${xe.Amount}</span>
//                             </td>
//                         </tr>`
//         )
//           }

//               <tr class="table-danger">
//                 <td style="width: 25%; text-align: center;">
//                   <b>Due Amount</b></td>
//                   <td align="center" style="width: 25%;">
//                     <span id="lbl_genTax2">${x.DueAmount}</span></td>
//                     </tr>
//                   <tr><td style="width: 25%; text-align: center;">
//                   <b>Paid Amount</b>
//                   </td>
//                   <td align="center" style="width: 25%;">
//                   <span id="lbl_genTax2">${x.PaidAmount}</span></td>
//                   </tr>
//                   <tr class="table-success">
//                   <td style="width: 25%; text-align: center;">
//                   <b>Total Payable</b></td><td align="center" style="width: 25%;">
//                   <span id="lbl_genTax2">${x.Remaining}</span>
//                   </td>
//                   </tr>
//               </tbody>
//                 </table>



//               </div>

//               </div>
//               <div>
//               <div class="note">1. The amount of this bill should be paid within 15 days of presentation of the bill, otherwise a notice of demand will be issued and if necessary, warrants for confiscation and attachment will also be issued.</div><div class="note">2. The property tax of the building is based on the data obtained in the survey. Whose details are available in the computer room of the Municipal Corporation, if there is any objection then objection can be made within one month.</div>
//               <div class="note">3. A computerized receipt can be obtained by depositing money in the computer room of the Municipal Council.</div>
//               <div class="update-date">Update Date: 28/02/2024</div><div class="update-by">Update By: ADMIN</div>
//               </div>
//               </div>
//               </div>
//           `
//       })
//       var content = `<!DOCTYPE html>
//           <html lang="en">
//               <head>
//               <meta charset="UTF-8">
//               <meta name="viewport" content="width=device-width, initial-scale=1.0">
//               <title>Document</title>
//               <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
//               <style>
//               .bill-container {
//                 background-color: #fff;
//                 border: 4px solid #1f53cd;
//                 padding: 20px;
//                 width: 800px; /* Adjust width as needed */
//                 font-family: sans-serif;
//                 margin-top: 10px;
//               }

//               .bill-header {
//                 display: grid;
//                 justify-content: center;
//                 margin-bottom: 20px;
//                 text-align: center;
//               }

//               .municipal-council,
//               .form,
//               .bill-title,
//               .financial-year {
//                 font-size: 18px;
//                 font-weight: bold;
//               }

//               .bill-body {
//                 display: flex;
//                 flex-wrap: wrap;
//                 justify-content: space-between;
//               }

//               .estate-details,
//               .bill-details,
//               .assessment-details,
//               .owner-details,
//               .tax-details,
//               .notes {
//                 display: flex;
//                 justify-content: space-between;
//                 width: 100%;
//                 margin-bottom: 20px;
//                 color: #1f53cd;
//               }

//               .tax-details-title,
//               .assessment-title {
//                 font-size: 16px;
//                 font-weight: bold;
//                 margin-bottom: 10px;
//               }

//               .tax-table {
//                 width: 100%;
//                 border-collapse: collapse;
//               }

//               .tax-table th,
//               .tax-table td {
//                 padding: 5px;
//                 border: 1px solid #ddd;
//                 text-align: left;
//               }

//               .notes {
//                 font-size: 12px;
//               }

//               .note {
//                 margin-bottom: 5px;
//               }

//               .innerheader{
//                 display: flex;
//                 justify-content: space-between;
//                 width: 100%;
//                 font-weight: bolder;
//               }
//               </style>
//               </head>
//               <body>${text}</body>
//               <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>

//               </html>
//               `
//       fs.writeFileSync(filePath, content, 'utf8', (err) => {
//         if (err) {
//           console.error('Error writing to the file:', err);
//         }
//         console.log('File has been updated successfully!' + filePath.split('/')[3]);
//       })
//     })

//   })

// }


async function filewriter(datataex, start, end, filedivision, condition, foldername) {


  console.log("Function Called :: fiewriter --------------------");


  const query1 = "SELECT Particulars , Amount FROM `customerbillbreakdown` WHERE `PropertyID`=? and BillNumber=?";

  const filePath = path.join(__dirname, '../../public/Assets', foldername, `${end}BulkBillFile.html`);

  const billHtmlParts = [];
  const billsToProcess = datataex.slice(start, end);

  let text = '';

  // await Promise.all(datataex.slice(start, end).map(async (x) => {
  //   try {
  //     const result = await new Promise((resolve, reject) => {
  //       connection.query(query1, [x.PropertyID, x.BillNumber], (err, res) => {
  //         if (err) reject(err);
  //         else resolve(res);
  //       });
  //     });

  //     const qrData = process.env.ORGIN + '/Customer/PayBill/' + x.PropertyID;
  //     const qrCodeUrl = await QRCode.toDataURL(qrData);

  //     // Append this bill's HTML
  //     text += `
  //       <div style="display: flex; justify-content: center; background-color: rgb(233, 248, 241);">
  //         <div class="bill-container">
  //           <div class="bill-header">
  //             <div><img src="${process.env.BACKEND}/Assets/UP-logo.jpg" width="100px" alt=""></div>
  //             <div class="municipal-council" style="color: red;">
  //               <h1>Municipal Council, Mirzapur</h1>
  //             </div>
  //             <div class="form">Form 17</div>
  //             <div class="bill-title">Bill (House Tax/Water Tax/Drainage Tax)</div>
  //             <div class="financial-year">Financial year ${new Date(x.ToDate).getFullYear()}</div>
  //           </div>
  //           <img src="${qrCodeUrl}" alt="QR Code">
  //           <div class="estate-details">
  //             <div class="estate-code">Estate Code: ${x.PropertyID}</div>
  //             <div class="ward">${x.uniqueness}</div>
  //           </div>
  //           <!-- Remaining sections... -->
  //           <table class="table table-striped tax-table-data" style="width: 52vw;">
  //             <thead class="table-dark">
  //               <tr>
  //                 <th>Tax</th>
  //                 <th>Amount</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               ${result.map((xe) => `
  //                 <tr>
  //                   <td style="text-align: center;"><b>${xe.Particulars}</b></td>
  //                   <td align="center"><span>${xe.Amount}</span></td>
  //                 </tr>
  //               `).join('')}
  //               <tr class="table-danger">
  //                 <td><b>Due Amount</b></td>
  //                 <td align="center"><span>${x.DueAmount}</span></td>
  //               </tr>
  //               <tr>
  //                 <td><b>Paid Amount</b></td>
  //                 <td align="center"><span>${x.PaidAmount}</span></td>
  //               </tr>
  //               <tr class="table-success">
  //                 <td><b>Total Payable</b></td>
  //                 <td align="center"><span>${x.Remaining}</span></td>
  //               </tr>
  //             </tbody>
  //           </table>
  //           <!-- Notes and metadata... -->
  //         </div>
  //       </div>
  //     `;
  //   } catch (err) {
  //     console.error('Error processing one bill entry:', err);
  //   }
  // }));


  for (const x of billsToProcess) {
    try {

      const breakdown = await new Promise((resolve, reject) => {
        connection.query(query1, [x.PropertyID, x.BillNumber], (err, res) => {
          if (err) return reject(err);
          resolve(res || []);
        });
      });

      let qrCodeUrl;
      try {
        const qrData = `${process.env.ORGIN}/Customer/PayBill/${x.PropertyID}`;
        qrCodeUrl = await QRCode.toDataURL(qrData);
      }
      catch (err) {
        console.error("QR Code generation failed:", err);
        qrCodeUrl = '';
      }


      billHtmlParts.push(`
        
         <div style="display: flex; justify-content: center; background-color: rgb(233, 248, 241);">
          <div class="bill-container">
            <div class="bill-header">
              <div><img src="${process.env.BACKEND}/Assets/UP-logo.jpg" width="100px" alt=""></div>
              <div class="municipal-council" style="color: red;">
                <h1>Municipal Council, Mirzapur</h1>
              </div>
              <div class="form">Form 17</div>
              <div class="bill-title">Bill (House Tax/Water Tax/Drainage Tax)</div>
              <div class="financial-year">Financial year ${new Date(x.ToDate).getFullYear()}</div>
            </div>
            ${qrCodeUrl ? `<img src="${qrCodeUrl}" alt="QR Code">` : ''}
            <div class="estate-details">
              <div class="estate-code">Estate Code: ${x.PropertyID}</div>
              <div class="ward">${x.uniqueness}</div>
            </div>
            <table class="table table-striped tax-table-data" style="width: 52vw;">
              <thead class="table-dark">
                <tr><th>Tax</th><th>Amount</th></tr>
              </thead>
              <tbody>
                ${breakdown.map(b => `
                  <tr><td style="text-align: center;"><b>${b.Particulars}</b></td><td align="center"><span>${b.Amount}</span></td></tr>
                `).join('')}
                <tr class="table-danger">
                  <td><b>Due Amount</b></td>
                  <td align="center"><span>${x.DueAmount}</span></td>
                </tr>
                <tr>
                  <td><b>Paid Amount</b></td>
                  <td align="center"><span>${x.PaidAmount}</span></td>
                </tr>
                <tr class="table-success">
                  <td><b>Total Payable</b></td>
                  <td align="center"><span>${x.Remaining}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        `)


    }
    catch (err) {
      console.error(`❌ Error processing bill PropertyID=${x.PropertyID}, BillNumber=${x.BillNumber}:`, err);
    }
  }

  const FullHtml = `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bulk Bills</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <style>
      .bill-container { background-color: #fff; border: 4px solid #1f53cd; padding: 20px; width: 800px; font-family: sans-serif; margin-top: 10px; }
    </style>
  </head>
  <body>${billHtmlParts.join('')}</body>
  </html>
  `;
  try {
    fs.writeFileSync(filePath, FullHtml, 'utf8');
    console.log('✅ File has been written successfully:', filePath);
  } catch (err) {
    console.error('❌ Failed to write the file:', err);
  }
}

module.exports = { GeneratePDF, getzip }
