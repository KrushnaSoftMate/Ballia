const  svgCaptcha = require('svg-captcha');
const connection = require('../../database/db');
const app=require('express').Router()
const crypto = require('crypto')
const CryptoJS = require('crypto-js');

function decryptData(data, key) {
    let bytes = CryptoJS.AES.decrypt(data, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

app.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create({ size: 6, ignoreChars: '0o1i', noise: 2 });
    const ipadress= req.ip
    const uniqid=crypto.randomUUID()
    connection.query('INSERT INTO `captcha`( `IPADRESS`, `CAPTCHA`,`CheckingStatus`,`unqid`) VALUES (?,?,?,?)',[ipadress,captcha.text,'false',uniqid],(err,result)=>{err?console.log(err):null})
    res.type('svg');
    const obj={
        captchad:captcha.data,
        id:uniqid
    }
    res.send(obj);
});


app.post('/ValidateCaptcha',function (req, res) {
    let encryptedPara = req.body['text'];  
    let encryptedPara1 = req.body['uniqid']; 
    let CheckerKey = req.headers['checkerkey'];
    const ipadress= req.ip
    try {
        // Decrypt the parameter
        let decryptedPara = decryptData(encryptedPara, CheckerKey);
        let decryptedPara1 = decryptData(encryptedPara1, CheckerKey);
        console.log('Decrypted Para:', decryptedPara);
        console.log('Decrypted Para1:', decryptedPara1);
        // SQL query using the decrypted parameter
        connection.query('SELECT * FROM `captcha` WHERE `IPADRESS`=? and  BINARY `CAPTCHA`=? and `unqid`=? and CheckingStatus=?',[ipadress,decryptedPara,decryptedPara1,'false'],(err,result)=>{
            if (err) {
                res.status(200).json({error:true, message: 'system error' });
            }
            if (result.length>0) {
                console.log(result)
                connection.query('DELETE FROM `captcha` WHERE `unqid` = ? or `IPADRESS` = ?', [decryptedPara1, ipadress], (err1, result1) => {
                    if (err1) {
                        console.log(err1);
                    }
                });
                return res.json(true);
            } else {
                return res.status(200).json({error:true, message: 'Invalid captcha' });
            }
        })
    } catch (error) {
        console.error('Decryption error:', error);
        res.status(200).json({ error:true, message: 'Decryption failed' });
    }
})

module.exports=app