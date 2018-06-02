var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var authenticModel = {
    authentic: authentic,
    signup: signup
}

function authentic(authenticData) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user WHERE username ='${authenticData.username}'`, (error, rows, fields) => {
            if (error) {
                reject(error);
            }
            else if(rows.length==0){
                reject({"success":false,"message":"username doesnot match"});
            } 
            
            else {
                bcrypt.compare(authenticData.password, rows[0].password, function (err, isMatch) {
                    if (err) {
                        reject(error);
                    } else if (isMatch) {
                        resolve(rows);
                    }
                    else {
                        reject({"success":false,"message":"password doesnot match"});
                    }
                });

            }
        });
    });

}


function signup(user) {
    

    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                db.query("SELECT * FROM user WHERE username='"+user.username+"'", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length>0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"user already exist ! try with different user"});
                    } else {
                        db.query("SELECT * FROM user WHERE email='"+user.email+"'", (error, rows, fields) => {
                            if (error) {
                                dbFunc.connectionRelease;
                                reject(error);
                            } else if(rows.length>0) {
                                dbFunc.connectionRelease;
                                reject({"success":false,"message":"user already exist with this email address! try with different email"});
                            } else {
                                db.query("SELECT * FROM user WHERE mobile_number='"+user.mobile_number+"'", (error, rows, fields) => {
                                    if (error) {
                                        dbFunc.connectionRelease;
                                        reject(error);
                                    } else if(rows.length>0) {
                                        dbFunc.connectionRelease;
                                        reject({"success":false,"message":"user already exist with this mobile number! try with different mobile number"});
                                    } else {
                                        db.query("INSERT INTO user(username,password,first_name,last_name,email,mobile_number)VALUES('" + user.username + "','" + user.password + "','" + user.first_name + "','" + user.last_name + "','" + user.email +"','" + user.mobile_number + "')", (error, rows, fields) => {
                                            if (error) {
                                                dbFunc.connectionRelease;
                                                reject(error);
                                            } else {
                                                dbFunc.connectionRelease;
                                                resolve(rows);
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            });
        })
    })
}

module.exports = authenticModel;



