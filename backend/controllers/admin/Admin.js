const connection = require('../../database/db')
const { GenerateToken } = require('../../jwt/admin/JWTToken')
const CryptoJS = require('crypto-js');

function decryptData(data, key) {
    let bytes = CryptoJS.AES.decrypt(data, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// function Login(req, res) {
//     const { Username, Password } = req.body
//     try {
//         connection.query("SELECT * FROM `admin` WHERE (`ID`=? or Email=?) and BINARY Password=?", [Username, Username, Password], (err, result) => {
//             if (result) {
//                 if (result.length > 0) {
//                     const token = GenerateToken(JSON.stringify(result[0]))
//                     res.status(200).json(token)
//                 }
//                 else {
//                     res.status(401).json(false)
//                 }
//             } else {
//                 console.error(err);
//                 res.status(500).json(false)
//             }
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json(false)
//     }
// }

function Login(req, res) {
    let encryptedPara = req.body['loginform'];  
    let CheckerKey = req.headers['checkerkey'];
   
    try {
        // Decrypt the parameter
        let decryptedPara = decryptData(encryptedPara, CheckerKey);
        let { Username, Password } = JSON.parse(decryptedPara);

        // Check for account lock
        connection.query("SELECT * FROM `admin` WHERE (`ID`=? OR Email=?)", [Username, Username], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error:true, message: 'Internal server error' });
            }

            if (result.length === 0) {
                return res.status(401).json({error: true, message: 'Invalid credentials', attempts: 0  });
            }

            const user = result[0];

            const currentTime = new Date().getTime();
            const lockTime = user.lockedUntil ? new Date(user.lockedUntil).getTime() : 0;

            if (lockTime > currentTime) {
                return res.status(200).json({error: true, message: 'Account locked. Try again later.', lockedUntil: user.lockedUntil, attempts: user.logattempt });
            }

            // SQL query using the decrypted parameter
            connection.query("SELECT * FROM `admin` WHERE (`ID`=? or Email=?) and BINARY Password=?", [Username, Username, Password], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(200).json({error: true, message: 'Internal server error' });
                }

                if (result.length > 0) {
                    // Successful login, reset attempt count
                    connection.query("UPDATE `admin` SET logattempt = 3, lockedUntil = NULL WHERE Email=?", [Username], (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(200).json({error: true, message: 'Internal server error' });
                        }
                        
                        const token = GenerateToken(JSON.stringify(result[0]));
                        res.status(200).json({ error: false, token });
                    });
                } else {
                    // Failed login, decrement attempt count
                    let newAttempts = user.logattempt - 1;
                    let lockUntil = newAttempts <= 0 ? new Date(currentTime + 5 * 60 * 1000) : null;

                    connection.query("UPDATE `admin` SET logattempt = ?, lockedUntil = ? WHERE Email=?", [newAttempts, lockUntil, Username], (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(200).json({ error: true, message: 'Internal server error' });
                        }

                        if (newAttempts <= 0) {
                            res.status(200).json({ error: true, message: 'Account locked. Try again after 5 minutes.', attempts: newAttempts, lockedUntil: lockUntil });
                        } else {
                            res.status(200).json({ error: true, message: 'Invalid credentials', attempts: newAttempts });
                        }
                    });
                }
            });
        });
    } catch (error) {
        console.error('Decryption error:', error);
        res.status(200).json({ error: true,  message: 'Decryption failed' });
    }
}
function GetMenus(req, res) {
    let data = req.AdminDetails;
    let RoleID=''+data.RoleID

    let query="SELECT * FROM menu WHERE JSON_CONTAINS(access_Role, ?);"
    connection.query(query,[RoleID],(error,results)=>{
        if (results) {
            res.json(results)
        } else {
            res.json(error)
        }
    })
}







module.exports = { Login, GetMenus }