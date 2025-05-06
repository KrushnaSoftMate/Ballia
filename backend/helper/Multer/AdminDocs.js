const multer = require('multer')


const CustomerManagement = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, 'public/client');
        },
        filename: (req, file, cb) => {
                console.log(file);
                const nameofdoc = Date.now().toString() + file.originalname;
                cb(null, nameofdoc);
        }
});

const customerexcel = multer.diskStorage({
        destination: (err, filename, cb) => {
                cb(null, 'public/CustomerExcel')
        },
        filename: (err, filename, callback) => {
                console.log(filename);
                const exceluplaod = Date.now().toString() + filename.originalname
                callback(null, exceluplaod)
        }
})

const Permituplaod = multer.diskStorage({
        destination: (err, filename, cb) => {

                cb(null, 'public/Permitdocs')

        },
        filename: (err, filename, cb) => {
                console.log(filename);
                const nameofdoc = Date.now().toString() + filename.originalname
                cb(null, nameofdoc)

        }
})
const exceluplaod = multer({ storage: customerexcel });
const Customeregister = multer({ storage: CustomerManagement });
const Permituplaodregiester = multer({ storage: Permituplaod });

module.exports = { Customeregister, exceluplaod, Permituplaodregiester }