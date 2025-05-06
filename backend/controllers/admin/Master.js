const connection = require("../../database/db")


async function LocalityRates(req, res) {
    // let query = "select * from toproperty  left join `localityrates` on `toproperty`.`id` =`localityrates`.`toproperty`";
    let query = "SELECT * FROM `localityrates`";
    connection.query(query, (error, results) => {
        if (results) {
            console.log("result", results);

            res.json(results)
        } else {
            console.log(error)
            res.json(false)
        }
    })
}

async function SetLocalityRates(req, res) {
    const { Ward, Meter, type, id, RccRate, OtherPakkaRate, KacchaRate } = req.body;
    let allRates = [];
    // console.log(req.body);
    for (const meterRange in req.body) {
        if (meterRange.includes('-') || meterRange === '24') {  // Assuming '24' is also a meter range
            const rates = req.body[meterRange];
            const { RccRate, OtherPakkaRate, KacchaRate } = rates;

            if (RccRate || OtherPakkaRate || KacchaRate) {
                let uniqueness = `${Ward}/${meterRange}`;
                let unq = `${Ward}/${meterRange}`

                allRates.push([Ward, uniqueness, meterRange, RccRate || '', OtherPakkaRate || '', KacchaRate || '', unq]);
            }
        }
    }
    if (type == "insert" && allRates.length > 0) {
        let query = "insert into localityrates (Ward,uniqueness,Meter,RccRate,OtherPakkaRate,KacchaRate,unq) values ?";
        connection.query(query, [allRates], (error, results) => {
            if (results) {
                res.json(results)
            } else {
                console.log(error);
                res.json(false)
            }
        })
    } else if (type == "update") {
        let query = "UPDATE `localityrates` SET ,Ward=?,uniqueness=?,Meter=?,RccRate=?,OtherPakkaRate=?,KacchaRate=?,unq=? WHERE id=?"
        let uniqueness = `${Ward}/${Meter}`;
        let unq = uniqueness;
        connection.query(query, [Ward, uniqueness, Meter, RccRate, OtherPakkaRate, KacchaRate, unq, id], (error, results) => {
            if (results) {
                res.json(results)
            } else {
                console.log(error);
                res.json(false)
            }
        })
    }
}

async function DocumentsType(req, res) {
    let query = "select * from todocs";
    connection.query(query, (error, results) => {
        if (results) {
            res.json(results)
        } else {
            console.log(error);
            res.json(false)
        }
    })
}

async function SetDocumentType(req, res) {
    const { Doc_id, DocumentName, Document_Requirment, type, id } = req.body;
    console.log(req.body);
    if (type == "insert") {
        let query = "insert into todocs (Doc_id,DocumentName,Document_Requirment) values(?,?,?)"
        connection.query(query, [Doc_id, DocumentName, Document_Requirment], (error, results) => {
            if (results) {
                res.json(results)
            } else {
                console.log(error);
                res.json(false)
            }
        })
    } else if (type == "update") {
        let query = "update todocs set Doc_id=?, DocumentName=?, Document_Requirment=? where id=?"
        connection.query(query, [Doc_id, DocumentName, Document_Requirment, id], (error, results) => {
            if (results) {
                res.json(results)
            } else {
                console.log(error);
                res.json(false)
            }
        })
    }
}

async function deleteDocumenttype(req, res) {
    const { id } = req.body;
    let query = "delete from todocs where id=?"
    connection.query(query, [id], (error, results) => {
        if (results) {
            res.json(results)
        } else {
            res.json(error)
        }
    })
}

async function LocalityTypes(req, res) {
    let query = "select * from tolocality";
    connection.query(query, (error, results) => {
        if (results) {
            res.json(results)
        } else {
            console.log(error);
            res.json(false)
        }
    })
}

async function SetLocalityTypes(req, res) {
    const { locality, ward, zone } = req.body;
    let uniqueness = locality + '/' + ward + '/' + zone
    let query = "insert into tolocality (locality,ward,zone,uniqueness) values(?,?,?,?)";
    connection.query(query, [locality, ward, zone, uniqueness], (error, results) => {
        if (results) {
            res.json(results)
            console.log(results);
        } else {
            res.json(error)
            console.log(error);
        }
    })
}

async function TaxType(req, res) {
    let query = "select * from taxtype";
    connection.query(query, (error, results) => {
        if (results) {
            res.json(results)
        } else {
            console.log(error);
            res.json(false)
        }
    })
}

async function SetTaxType(req, res) {
    const { id, TaxName, type } = req.body;
    console.log(req.body);
    if (type == "insert") {
        let query = "insert into taxtype (TaxName) values(?)";
        connection.query(query, [TaxName], (error, results) => {
            if (results) {
                res.json(results)
                console.log(results);
            } else {
                res.json(error)
                console.log(error);
            }
        })
    } else if (type == "update") {
        let query = "update taxtype set TaxName=? where id=?"
        connection.query(query, [TaxName, id], (error, results) => {
            if (results) {
                res.json(results)
            } else {
                res.json(error)
            }
        })
    }
}

async function deletetaxtype(req, res) {
    const { id } = req.body;
    let query = "delete from taxtype where id=?"
    connection.query(query, [id], (error, results) => {
        if (results) {
            res.json(results)
        } else {
            res.json(error)
        }
    })
}

async function PropertyTypes(req, res) {
    let query = "SELECT * FROM toproperty";
    connection.query(query, (error, results) => {
        if (results) {
            res.status(200).json(results)
        } else {
            console.log(error);
            res.json(false)
        }
    })
}

async function addPropertyType(req, res) {
    let { id, PropertyType, Rate, type } = req.body;
    if (type == "insert") {
        let query = "insert into toproperty(PropertyType,Rate) values(?,?)";
        connection.query(query, [PropertyType, Rate], (error, results) => {
            if (results) {
                res.json(results)
            } else {
                res.json(error)
            }
        });
    }
    else if (type == "update") {
        let query = "update toproperty set PropertyType=?,Rate=? where id=?"
        connection.query(query, [PropertyType, Rate, id], (error, results) => {
            if (results) {
                res.json(results)
            } else {
                res.json(error)
            }
        })
    }
}
async function deletePropertyType(req, res) {
    const { id } = req.body;
    let query = "delete from toproperty where id=?"
    connection.query(query, [id], (error, results) => {
        if (results) {
            res.json(results)
        } else {
            res.json(error)
        }
    })
}

async function PermitTypes(req, res) {
    let query = "select * from typesofpermit";
    connection.query(query, (error, results) => {
        if (results) {
            res.json(results)
            console.log(results);
        } else {
            res.json(error)
        }
    })
}

async function AddPermitType(req, res) {
    const { id, PermitTypes, Rate, DueAmount, Status, DocumentRequired, location } = req.body
    let query = "insert into typesofpermit (id,PermitTypes,Rate,DueAmount,Status,DocumentRequired,location) values(?,?,?,?,?,?,?)";
    connection.query(query, [id, PermitTypes, Rate, DueAmount, Status, DocumentRequired, location], (error, results) => {
        if (results) {
            res.json(results)
            console.log(results);
        } else {
            res.json(error)
            console.log(error);
        }
    })
}

async function DisablePermitType(req, res) {
    const { id, newStatus } = req.body
    let query = "update typesofpermit set Status=? where id=?"
    connection.query(query, [newStatus, id], (error, results) => {
        if (results) {
            res.json(results)
            console.log(results);
        } else {
            res.json(error)
            console.log(error);
        }
    })
}

async function DiscountType(req, res) {
    let query = "select * from discountcodes";
    connection.query(query, (error, results) => {
        if (results) {
            res.json(results)
        } else {
            console.log(error);
            res.json(false)
        }
    })
}
async function DeleteDiscountType(req, res) {
    const { id } = req.body;
    cnsole.log("discount type", req.body)
    let query = "delete from discountcodes where id=?"
    connection.query(query, [id], (error, results) => {
        if (results) {
            res.json(results)
        } else {
            res.json(error)
            console.log(error)
        }
    })
}

async function SetDiscountType(req, res) {
    const { DiscountFor, Percent, Status, type, id } = req.body;
    console.log(req.body);
    if (type == "insert") {
        let query = "insert into discountcodes (DiscountFor,Percent,Status) values(?,?,?)"
        connection.query(query, [DiscountFor, Percent, Status], (error, results) => {
            if (results) {
                res.json(results)
            } else {
                console.log(error);
                res.json(false)
            }
        })
    } else if (type == "update") {
        let query = "update discountcodes set DiscountFor=?, Percent=?, Status=? where id=?"
        connection.query(query, [DiscountFor, Percent, Status, id], (error, results) => {
            if (results) {
                res.json(results)
            } else {
                console.log(error);
                res.json(false)
            }
        })
    }
}

async function deleteRatetype(req, res) {
    const { id } = req.body;
    console.log(id);
    let query = "delete from localityrates where id=?"
    connection.query(query, [id], (error, results) => {
        if (results) {
            res.json(results)
        } else {
            res.json(error)
        }
    })
}

module.exports = { LocalityRates, SetLocalityRates, DocumentsType, SetDocumentType, deleteDocumenttype, LocalityTypes, SetLocalityTypes, TaxType, SetTaxType, deletetaxtype, PropertyTypes, addPropertyType, deletePropertyType, PermitTypes, AddPermitType, DisablePermitType, DiscountType, SetDiscountType, deleteRatetype, DeleteDiscountType }
