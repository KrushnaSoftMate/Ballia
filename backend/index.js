const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const { Worker } = require('worker_threads');
const cron = require('node-cron');
const { rateLimit } = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 15 minutes
    limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})
app.use(limiter)
const path = require('path')

const GlobalMiddleWare = require('./Middleware/GlobalMiddleWare')
require('dotenv').config({ path: path.join(__dirname, 'env', '.env') });

const PORT = process.env.PORT

app.use(cors(
    {
        origin: process.env.ORGIN,
    }
))


var bodyParser = require('body-parser')

app.use(bodyParser.json())

//this files are public
const { AgentCookiecheck } = require('./Middleware/agent/Middleware')
app.use('/AgentCustomerDocuments', AgentCookiecheck, express.static(path.join(__dirname, 'public/Permitdocs/')))
const { Cookiecheck } = require('./Middleware/admin/MiddleWare')

app.use('/CustomerDocuments', Cookiecheck, express.static(path.join(__dirname, 'public/client')));
app.use('/Assets', express.static(path.join(__dirname, 'public/Assets')))

//this is global muddleware
app.use(GlobalMiddleWare)

//This is the ADMIN Side
const { Admin, CustomerManagement, HelperApi, CustomerPayment, MasterApi, EmployeeManagement, Reports, ChalanManagement, Agent, LicenseManagements } = require('./routes/admin/index')

app.use('/Admin', Admin)
app.use('/Customer', CustomerManagement)
app.use('/HelperApi', HelperApi)
app.use('/CustomerPayment', CustomerPayment)
app.use("/Master", MasterApi)
app.use("/EmployeeManagement", EmployeeManagement)
app.use('/Reports', Reports)
app.use('/ChalanManagement', ChalanManagement)
app.use('/Agent', Agent)
app.use('/LicenseManagements', LicenseManagements)

app.get('/', (request, response) => {
    response.status(200).json({
        message: "Welcome to Backend"
    })
})


//This is the Customer Side
const { Customer } = require("./routes/Customer/index")
app.use("/CustomerBill", Customer)
app.use("/Customer", Customer)

//This is the Agent Side
const { AgentLogin, ChalanManage, Payment, AgentCustomerManagement, AgentHelper, LicenseManagement } = require("./routes/agent/index")

app.use('/AgentLogin', AgentLogin)
app.use('/ChalanManage', ChalanManage)
app.use('/Payment', Payment)
app.use('/AgentCustomerManagement', AgentCustomerManagement)
app.use('/AgentHelper', AgentHelper)
app.use('/LicenseManagement', LicenseManagement)


//helper
const Captcha = require('./helper/util/Captch')
app.use('/Captcha', Captcha)

// Schedule the cron job to run at the end of every month for bulk license bill
cron.schedule('59 23 28-31 * *', () => {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Ensure the cron runs only on the last day of the month
    if (currentDate.getDate() === lastDayOfMonth) {
        console.log("Running monthly bill generation...");

        const worker = new Worker('./threads/BulkLicenseBillGeneration.js', { name: 'LicenseBulkBill' });

        worker.on('message', (message) => {
            console.log(message);
        });

        worker.on('error', (error) => {
            console.error("Worker error:", error);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            }
        });
    }
});

//or a one-time execution after 5 minutes for bulk license bill
// setTimeout(() => {
//     console.log("Running one-time test cron job...");
//     const worker = new Worker('./threads/BulkLicenseBillGeneration.js', { name: 'LicenseBulkBill' });

//     worker.on('message', (message) => {
//         console.log("Worker message:", message);
//     });

//     worker.on('error', (error) => {
//         console.error("Worker error:", error);
//     });

//     worker.on('exit', (code) => {
//         if (code !== 0) {
//             console.error(`Worker stopped with exit code ${code}`);
//         }
//     });
// }, 1 * 60 * 1000); // 5 minutes in milliseconds

server.listen(PORT, () => {
    console.log("We have Started Server on " + PORT + `  ${process.pid}`)
})

