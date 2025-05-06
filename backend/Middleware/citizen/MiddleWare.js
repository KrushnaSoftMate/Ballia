const { VerifyToken } = require('../../jwt/citizen/JWTToken');

function MiddleCheck(req, res, next) {
    console.log("req", req.header);
    let header = req.header('Auth');
    console.log("Header ::", header);

    if (header) {
        let check = VerifyToken(header)
        console.log("Cehck :: ", check)

        if (check) {
            req.CitizenDetail = check
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

const Cookiecheck = (req, res, next) => {
    const cookies = req.headers.cookie;
    console.log(cookies)
    const parsedCookies = parseCookies(cookies)
    const userId = parsedCookies.AuthUser;
    let jtoken = VerifyToken(userId)
    if (jtoken) {
        req.jtoken = jtoken
        next()
    }
    else {
        res.redirect("/")
    }
}

module.exports = { MiddleCheck, Cookiecheck }