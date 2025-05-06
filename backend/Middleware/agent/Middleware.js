const { VerifyToken } = require('../../jwt/agent/JWTToken')

function MiddleCheck(req, res, next) {
    let header = req.header('Auth')
    if (header) {

        let check = VerifyToken(header)
        if (check) {
            req.AgentDetails = check
            next()
        }
        else {
            res.redirect("/")
        }
    }
    else {
        res.redirect("/")
    }
}

function LimitCheck(req, res, next) {
    const connection = require('../../database/db')
    let header = req.header('Auth')
    let {PaymentAmountRate}=req.body
  
    if (header) {
        let check = VerifyToken(header)
        if (check) {
            let AgentID = check.AgentID
            let query = 'select Moneylimit from agentlogin where AgentID=?'
            connection.query(query, [AgentID], (error, result) => {
                if (Number(result[0].Moneylimit) >= Number(PaymentAmountRate)) {
                    next()
                } else {
                    res.status(401).json(false)
                }
            })
        } else {
            res.status(401).json(false)
        }

    } else {
        res.status(401).json(false)
    }
}


function parseCookies(cookieString) {
    const cookies = {};
  
    if (cookieString) {
      cookieString.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        cookies[parts[0].trim()] = parts[1].trim();
      });
    }

    return cookies;
}

const AgentCookiecheck=(req,res,next)=>{
    const cookies = req.headers.cookie;
    const parsedCookies = parseCookies(cookies)

    const userId = parsedCookies.AgentToken;
    let jtoken=VerifyToken(userId)
    if(jtoken){

        req.jtoken=jtoken
        next()
    }
    else{
        res.redirect("/")
    }   
}


module.exports = { MiddleCheck, LimitCheck,AgentCookiecheck };