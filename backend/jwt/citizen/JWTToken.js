const JWT = require('jsonwebtoken')
const scretkey = process.env.CitizenKey

function GenerateToken(data) {
    let Obj = JSON.parse(data)
    console.log("tokendata", data);
    const token = JWT.sign(Obj, scretkey, {
        expiresIn: '24h'
    })
    console.log(token);

    return token
}

function VerifyToken(data) {
    try {
        const token = JWT.verify(data, scretkey)
        if (token) {
            return token
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}

module.exports = { GenerateToken, VerifyToken }