const Connection = require("../../database/db");

const CreateEmployee = (req, res) => {
    const { type } = req.body
    const { ID, FullName, ProfilePic, PhoneNumber, Email, Password, RoleID, Role, Searchparameter, Department_ID, Department_Name } = req.body
    switch (type) {
        case "Create":
            let query = "INSERT INTO `admin`( `FullName`, `Email`, `Password`, `RoleID`, `Role`) VALUES (?,?,?,?,?)"
            Connection.query(query, [FullName, Email, Password, RoleID, Role], (err, result) => {
                if (result) {
                    res.json(true)
                } else {
                    console.log(err)
                    res.json(false)
                }
            })
            break;
        case "View":
            if (Searchparameter) {
                let Search = "SELECT * FROM admin WHERE FullName LIKE ? OR PhoneNumber LIKE ? OR Email LIKE ? OR Role LIKE ? OR ID LIKE ? OR Department_Name LIKE ?";

                Connection.query(Search, [`${'%' + Searchparameter + '%'}`, `${'%' + Searchparameter + '%'}`, `${'%' + Searchparameter + '%'}`, `${'%' + Searchparameter + '%'}`, `${'%' + Searchparameter + '%'}`, `${'%' + Searchparameter + '%'}`], (err, result) => {
                    if (result) {
                        res.json(result);
                    } else {
                        console.log(err);
                        res.json(false);
                    }
                });

            }
            else {
                let Searchquery = "SELECT * FROM admin"
                Connection.query(Searchquery, (err, result) => {
                    if (result) {
                        res.json(result)
                    } else {
                        console.log(err)
                        res.json(false)
                    }
                })
            }
            break;
        case "Update":

            let queryupdate = "UPDATE `admin` SET `FullName`=?,`Email`=?,`Password`=?,`RoleID`=?,`Role`=? where ID=?"
            Connection.query(queryupdate, [FullName, Email, Password, RoleID, Role, ID], (err, result) => {
                if (result) {
                    res.status(201).json(true)
                } else {
                    console.log(err)
                    res.json(false)
                }
            })
            break;

        default:
            break;
    }
}

const Roles = async (req, res) => {
    const { type } = req.body;

    switch (type) {
        case "CreateRole":
            try {
                const { Rolename, obj, Department_ID } = req.body;
                const query = "INSERT INTO `roles`(`Designation`,Department_ID) VALUES (?,?)";
                const insertion = "UPDATE menu SET Access_Role = JSON_ARRAY_APPEND(Access_Role,'$',?) WHERE Menu_ID = ?;";
                const access = "INSERT INTO `useraccess`(`uniqueness`,`RoleID`, `MenuId`, `create`,`view`, `edit`, `delete`) VALUES (?,?,?,?,?,?,?)";

                const result = await new Promise((resolve, reject) => {
                    Connection.query(query, [Rolename, '0'], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });

                let base = 0;

                await Promise.all(Object.keys(obj).map(async (key) => {
                    if (obj[key].length > 0) {
                        const result1 = await new Promise((resolve, reject) => {
                            Connection.query(insertion, [result.insertId, parseInt(key)], (err2, result1) => {
                                if (err2) {
                                    reject(err2);
                                } else {
                                    resolve(result1);
                                }
                            });
                        });

                        let uniq = result.insertId + '/' + parseInt(key);

                        const result5 = await new Promise((resolve, reject) => {
                            Connection.query(access, [uniq, result.insertId, parseInt(key), obj[key].includes('create'), obj[key].includes('Read'), obj[key].includes('Edit'), obj[key].includes('Delete')], (err5, result5) => {
                                if (err5) {
                                    reject(err5);
                                } else {
                                    resolve(result5);
                                }
                            });
                        });

                        base++;

                        if (base === Object.keys(obj).length) {
                            res.json(true);
                        }
                    }
                }));
            } catch (error) {
                console.error(error);
                res.json(false);
            }
            break;

        case "View":
            let select = "SELECT * FROM `roles` ";
            Connection.query(select, (err, result) => {
                if (result) {
                    res.json(result);
                } else {
                    console.log(err);
                    res.json(false);
                }
            });
            break;

        default:
            break;
    }
};


const EditRole = async (req, res) => {
    const { RoleID, type, menu, menuset } = req.body
    const insertion = "UPDATE menu SET Access_Role = JSON_ARRAY_APPEND(Access_Role,'$',?) WHERE Menu_ID = ?;"
    const access = "UPDATE `useraccess` SET `create`=?, `view`=?, `edit`=?, `delete`=? WHERE `RoleID`=? and `MenuId`=?";
    const accessinsert = "INSERT INTO `useraccess`(uniqueness,`RoleID`, `MenuId`, `create`,`view`, `edit`, `delete`) VALUES (?,?,?,?,?,?,?)"


    switch (type) {
        case "view":
            let query = "SELECT * FROM `useraccess` WHERE RoleID=?"
            Connection.query(query, [RoleID], (err, result) => {
                if (result) {
                    res.json(result)

                }
                else {
                    res.json(err)
                }
            })
            break;
        case "update":
            let querycheck = "SELECT * FROM menu WHERE JSON_CONTAINS(Access_Role, ?);"
            let updatequery = "UPDATE `menu` SET `Access_Role` = ? WHERE `menu`.`Menu_ID` = ?;"
            let querymenu="SELECT * FROM menu WHERE Menu_ID=?"
            let base = 0

            MenuRemove()
            DeleteAccess()
            useraccess()
            Menuinsert()

            function MenuRemove() {
                let roleid =''+RoleID
                Connection.query(querycheck, [roleid], (err0, result0) => {
                   if (err0) {
                    console.log('i am error')
                    console.log(result0)
                    console.log(err0);
                   }
                    if (result0.length > 0) {

                        result0.map((e, index) => {
                            let accessRole = JSON.parse(e.Access_Role);
                            console.log(accessRole)
                            const endsession = Object.keys(menuset).length;
                            let blankarray = []
                            Object.entries(menuset).map(([key, value, index]) => {
                                if (key == e.Menu_ID) {
                                    accessRole.forEach(element => {
                                        if (element != JSON.parse(value)) {
                                            blankarray.push(element)
                                        }
                                    });
                                    console.log(blankarray)
                                    Connection.query(updatequery, [`[${blankarray}]`, e.Menu_ID], (errf, resultf) => {
                                        Connection.query("DELETE FROM `useraccess` WHERE `RoleID`=? and MenuId=?", [roleid, e.Menu_ID], (err8, result8) => {
                                            if (result8) {
                                                console.log(result8)
                                            }
                                            else {
                                                console.log(err8)
                                            }
                                        })
                                        console.log(errf)

                                    })

                                }
                            });
                        })
                    }
                })

            }
            function DeleteAccess() {
                Object.keys(menu).map((id) => {
                    let key = Number(id)
                    Connection.query("DELETE FROM `useraccess` WHERE `RoleID`=? and MenuId=?", [RoleID, key], (err1, result1) => {
                        if (result1) { }
                        else { console.log(err1) }
                    })
                })
            }
            function useraccess() {
                Object.keys(menu).map((id)=>{
                    let Menu_ID = Number(id)
                    let objectvalues=menu[id]
                    let uniq=RoleID+"/"+Menu_ID
                    if(objectvalues.length>0){
                        Connection.query(accessinsert,[uniq,RoleID,Menu_ID,objectvalues.includes('create'), objectvalues.includes('Read'), objectvalues.includes('Edit'), objectvalues.includes('Delete')],(err,result)=>{
                            if(result){
                            
                            }else{console.log(err)}
                        })
                    }
                })
            }
            function Menuinsert() {
                console.log(req.body)
                Object.keys(menu).map((menuid)=>{
                    let id=Number(menuid)
                    Connection.query(querymenu,[id],(err,result)=>{
                        let accesrole=JSON.parse(result[0].Access_Role)
                        if(!accesrole.includes(Number(RoleID))){
                            Connection.query(insertion,[Number(RoleID),id],(err,result)=>{
                                console.log(result)
                            })
                        }
                        
                    })
                })
            }
            res.json(true)
            break
        default:
            break;
    }






}


module.exports = { CreateEmployee, Roles, EditRole }