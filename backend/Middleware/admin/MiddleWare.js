const { VerifyToken } = require('../../jwt/admin/JWTToken');

function MiddleCheck(req, res, next) {
    let header = req.header('Auth')

    if (header) {

        let check = VerifyToken(header)
        if (check) {
            req.AdminDetails = check
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
    const parsedCookies = parseCookies(cookies)
    const userId = parsedCookies.AuthUser;
    let jtoken = VerifyToken(userId)
    if (jtoken) {
        req.jtoken = jtoken
        next()
    }
    else {
        res.status(403).send("Forbidden: You cannot access this resource");
    }
}

module.exports = { MiddleCheck, Cookiecheck }