const connection = require("../../database/db");

function CustomerForm(req, res) {
  connection.query("SELECT * FROM `todocs`", (err, result) => {
    if (err) {
      res.status(500).json("Got Some Server Err : " + err);
    } else {
      connection.query("SELECT * FROM `toproperty`", (err1, result1) => {
        if (err1) {
          res.status(500).json("Got Some Server Err : " + err1);
        } else {
          connection.query(
            "SELECT * FROM `localityrates` left join `toproperty` on `localityrates`.`toproperty`=`toproperty`.`id`",
            (err2, result2) => {
              if (err2) {
                res.status(500).json("Got Some Server Err : " + err2);
              } else {
                connection.query("SELECT * FROM meter", (err3, result3) => {
                  if (err3) {
                    res.status(500).json("Got Some Server Err : " + err3);
                  } else {
                    connection.query("Select * from taxtype", (err4, result4) => {
                      if (err4) {
                        res.status(500).json("Got Some Server Err : " + err4);
                      } else {
                        const obj = {
                          form: result,
                          toproperty: result1,
                          locality: result2,
                          Meter: result3,
                          propertytype: result4,
                        };
                        res.status(200).json(obj);
                      }
                    })
                  }
                });
              }
            }
          );
        }
      });
    }
  });
}

function GetCordinatesOnStart(req, res) {
  let query = "SELECT `FullName`,`PropertyID`,`location`,`Ward`,`Zone`,`Mohalla`, customerdocs.Document_Name AS documents FROM `customers` left join `customerdocs` on `customerdocs`.`CustomerID`=`customers`.`PropertyID`"

  let query1 = "SELECT c.`FullName`,c.`PropertyID`,c.`location`,c.`Ward`,c.`TotalArv`,cd.`Document_Name` AS documents FROM `customers` c LEFT JOIN `customerdocs` cd ON cd.`CustomerID` = c.`PropertyID` LEFT JOIN `customerarea` ca ON ca.`CustomerID` = c.`PropertyID` WHERE c.`Ward`= ? GROUP BY c.`PropertyID`"

  connection.query(query1, (err, result) => {
    console.log("GetCordinatesOnStart", result);
    if (result) {

      res.json(result)
    } else {
      res.status(500).json(false)
    }
  })
}
function GetCordinates(req, res) {
  const { Ward, Zone } = req.body.formdata
  console.log("Req.body", req.body);
  let query1 = "SELECT c.`FullName`,c.`PropertyID`,c.`location`,c.`Ward`,c.`TotalArv`,cd.`Document_Name` AS documents FROM `customers` c LEFT JOIN `customerdocs` cd ON cd.`CustomerID` = c.`PropertyID` LEFT JOIN `customerarea` ca ON ca.`CustomerID` = c.`PropertyID` WHERE c.`Ward`= ?GROUP BY c.`PropertyID`"


  let query = "SELECT `FullName`,`PropertyID`,`location`,`Ward`,`Mohalla`, customerdocs.Document_Name AS documents FROM `customers` left join `customerdocs` on `customerdocs`.`CustomerID`=`customers`.`PropertyID` WHERE `Ward`=? AND `Zone`=?"
  connection.query(query1, [Ward], (err, result) => {
    console.log(result);
    if (result) {
      res.json(result)
    } else {
      res.status(500).json(false)
    }
  })
}

function FetchFolderName(req, res) {
  let query = "Select * from `bulkbilldownload`";

  connection.query(query, (error, result) => {
    if (result) {
      res.json(result)
    } else {
      res.status(500).json(false)
    }
  })
}

function LocalityRate(req, res) {
  const { locality, Meter, Constructionrate } = req.body
  console.log(req.body);
  let localities = locality.replace(/\s/g, ' ');
  let uniqueness = `${localities}${" "}/${Meter}`
  console.log("Constructionrate", Constructionrate);
  console.log("uniqueness", uniqueness);

  const validRates = ['RccRate', 'OtherPakkaRate', 'KacchaRate'];
  if (!validRates.includes(Constructionrate)) {
    return res.status(400).json({ error: 'Invalid rate name' });
  }
  let query = `Select ${Constructionrate} AS Rate from localityrates where uniqueness=?`
  connection.query(query, [uniqueness], (error, result) => {
    if (result) {
      res.json(result)
      console.log(result);

    } else {
      res.status(500).json(false)
    }
  })
}

function PropertyRate(req, res) {
  const { PropertyType } = req.body
  let query = "Select Rate from toproperty where PropertyType=?"
  connection.query(query, [PropertyType], (error, result) => {
    if (result) {
      res.json(result)
    } else {
      res.status(500).json(false)
    }
  })
}


module.exports = { CustomerForm, GetCordinatesOnStart, GetCordinates, FetchFolderName, LocalityRate, PropertyRate };
