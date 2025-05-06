const connection = require("../../database/db");

function AgentCustomerForm(req, res) {
  connection.query("SELECT * FROM `todocs`", (err, result) => {
    if (err) {
      res.status(500).json("Got Some Server Err : " + err);
    } else {
      connection.query("SELECT * FROM `toproperty`", (err1, result1) => {
        if (err1) {
          res.status(500).json("Got Some Server Err : " + err1);
        } else {
          connection.query(
            "SELECT * FROM `localityrates`",
            (err2, result2) => {
              if (err2) {
                res.status(500).json("Got Some Server Err : " + err2);
              } else {
                connection.query("SELECT * FROM meter", (err3, result3) => {
                  if (err3) {
                    res.status(500).json("Got Some Server Err : " + err3);
                  } else {
                    const obj = {
                      form: result,
                      toproperty: result1,
                      locality: result2,
                      meter: result3,
                    };
                    res.status(200).json(obj);
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

function LocalityRate(req,res) {
  const{uniqueness,rate}=req.body
  const validRates = ['RccRate', 'OtherPakkaRate', 'KacchaRate', 'EmptyLandRate'];
  if (!validRates.includes(rate)) {
    return res.status(400).json({ error: 'Invalid rate name' });
  }
  let query = `Select ${rate} AS Rate from localityrates where uniqueness=?`
  connection.query(query,[uniqueness], (error, result) => {
    if (result) {
      res.json(result)
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

module.exports = { AgentCustomerForm, LocalityRate, PropertyRate }