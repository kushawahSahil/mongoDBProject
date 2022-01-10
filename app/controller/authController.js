const bcrypt = require('bcrypt')
const { otpsend } = require('../services/mail');
const logger = require('../loggers/logger');
const { generateToken } = require('../helpers/auth');
const saltRound = 10;
const { registrationValidate, pswdValidate, newPswdValidate, loginValidate, resetValidate, updateProfileValidate } = require('../validations/authvalidation');
const AuthModel = require('../helpers/db');
const { response } = require('express');
const { updateOne } = require('../helpers/db');


var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
logger.info(otp);

exports.registration = (req, res) => {
    res.render('registration', {
        values: req.body
    });
}

exports.signup = async (req, res) => {
    try {
        const { error } = registrationValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'fname') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error1: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'lName') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error2: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'gender') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error3: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'hobby') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error4: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'mobile') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error5: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error6: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'Password') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error7: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'pswd') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error8: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'city') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error9: err1,
                    values: res.body
                });
            }
        }
        const encryptedPassword = await bcrypt.hash(req.body.Password, saltRound);
        AuthModel.findOne({ email: req.body.email }, async (err, response) => {
            if (!response) {
                const user = await new AuthModel({
                    fname: req.body.fname,
                    lName: req.body.lName,
                    gender: req.body.gender,
                    hobby: req.body.hobby,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    Password: encryptedPassword,
                    city: req.body.city,
                    image: req.file.filename,
                });

                user.save((err, response) => {
                    if (err) {
                        let err1 = " User registration failed";
                        return res.render('registration', {
                            error: err1,
                            values: req.body
                        });

                    } else {
                        let success = " " + req.body.fname + " " + req.body.lName + " successfully register";
                        return res.render('registration', {
                            error: success,
                            values: req.body
                        });
                    }
                })
            } else {
                let err1 = " User Email already exist";
                return res.render('registration', {
                    error: err1,
                    values: req.body
                });
            }
        })
    }
    catch (err) {
        logger.error("err", err);

    }
};

exports.forgetPassword = (req, res) => {
    res.render('forgetPassword')
}

exports.varifyEmail = async (req, res) => {
    try {
        let { error } = pswdValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('forgetPassword', {
                    error1: err1
                });
            }
        }
        logger.info(req.body.email)

        AuthModel.findOne({ email: req.body.email }, async (err, response) => {
            if (response) {
                otpsend(req.body.email, otp);
                res.render('otp', {
                    email: req.body.email
                });

            } else {

                var err1 = "Please enter valid Email ";
                return res.render('forgetPassword', {
                    error: err1
                });
            }
        })

    }
    catch (err) {
        logger.error("err", err)
    }
};

exports.otp = (req, res) => {
    res.render('otp')
}

exports.varifyOtp = async (req, res, next) => {
    try {
        logger.info(req.body.otp)
        if (otp == req.body.otp) {
            res.render('confirmPassword', {
                email: req.body.email
            });
        } else {
            var err1 = " Please enter correct otp. ";
            return res.render('otp', {
                error: err1
            });
        }
    }
    catch (err) {
        logger.error('err', err)
    }
};

exports.confirmPassword = (req, res) => {
    res.render('confirmPassword', {
        values: req.body
    });
}

exports.updatePassword = async (req, res, next) => {
    try {
        let { error } = newPswdValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'Password') {
                var err1 = error.details[0].message;
                return res.render('confirmPassword', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'Confirm_Password') {
                var err1 = error.details[0].message;
                return res.render('confirmPassword', {
                    error3: err1,
                    values: req.body
                });
            }
        }
        else {
            const email = req.body.email;
            const encryptedPassword = await bcrypt.hash(req.body.Password, saltRound);
            const confirmPassword1 = { Password: encryptedPassword };
            AuthModel.updateOne({ email }, confirmPassword1, async (err, response) => {
                logger.info("res", response)
                if (err) throw err;
                res.redirect('/')
            })
        }

    }
    catch (err) {
        logger.error('err', err)
    }
}

exports.login = (req, res) => {
    res.render('login', {
        values: req.body
    });
}

exports.authUser = async (req, res) => {
    // console.log("body", req.body);
    try {
        let { error } = loginValidate(req.body);
        // console.log(error);
        if (error) {
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'Password') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error2: err1,
                    values: req.body
                });
            }
        }
        AuthModel.findOne({ email: req.body.email }, async (err, response) => {

            if (response === null) {
                var err1 = "User not found";
                res.render('login', {
                    error: err1,
                    values: req.body
                });
            } else {
                const comparision = await bcrypt.compare(req.body.Password, response.Password);

                if (comparision) {

                    res.render('index');

                } else {
                    var err1 = "Email and password does not match";

                    return res.render('login', {
                        error: err1,
                        values: req.body
                    });
                }
            }
        })
    }
    catch (err) {
        logger.error('err', err)
    }
}

exports.dashboard = (req, res) => {
    res.render('index', {
        values: req.body
    });
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.redirect("/");
    }
    catch (err) {
        logger.error("err", err)
    }
};

exports.resetPassword = (req, res) => {
    res.render('resetPassword', {
        values: req.body
    });
}

exports.resetPswd = async (req, res) => {
    try {
        let { error } = resetValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'Pswd') {
                var err1 = error.details[0].message;
                return res.render('resetPassword', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'Password') {
                var err1 = error.details[0].message;
                return res.render('resetPassword', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'Confirm_Password') {
                var err1 = error.details[0].message;
                return res.render('resetPassword', {
                    error3: err1,
                    values: req.body
                });
            }
        }
        const email = req.user.email;
        const response = await AuthModel.findOne({ email });
        if (response) {
            const comparision = await bcrypt.compare(req.body.Pswd, response.Password);
            if (comparision) {
                const updatePassword = await bcrypt.hash(req.body.Password, saltRound);
                const updateUser = await AuthModel.updateOne({ email }, { Password: updatePassword });
                if (updateUser) {
                    return res.render('resetPassword', {
                        error: "Your Password has been Reset"
                    });
                }
                else {
                    return res.render('resetPassword', {
                        error: "Your Password has not been Reset"
                    });
                }

            } else {
                return res.render('resetPassword', {
                    error: "Old Password is incorrect",
                });
            }
        }


    }
    catch (err) {
        console.log("err", err)

    }
};

exports.viewProfile = async (req, res) => {
    const email = req.user.email;
    try {
        const user = await AuthModel.findOne({ email });
        if (user) {
            res.render('viewProfile', {
                values: user
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { error } = updateProfileValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'fname') {
                var err1 = error.details[0].message;
                return res.render('updateProfile', {
                    error1: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'lName') {
                var err1 = error.details[0].message;
                return res.render('updateProfile', {
                    error2: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'gender') {
                var err1 = error.details[0].message;
                return res.render('updateProfile', {
                    error3: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'hobby') {
                var err1 = error.details[0].message;
                return res.render('updateProfile', {
                    error4: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'mobile') {
                var err1 = error.details[0].message;
                return res.render('updateProfile', {
                    error5: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('updateProfile', {
                    error6: err1,
                    values: res.body
                });
            }
            if (error.details[0].context.key == 'city') {
                var err1 = error.details[0].message;
                return res.render('updateProfile', {
                    error9: err1,
                    values: res.body
                });
            }
        }
        const email = req.user.email;
        const updateProfile = {
            fname: req.body.fname,
            lName: req.body.lName,
            gender: req.body.gender,
            hobby: req.body.hobby,
            mobile: req.body.mobile,
            email: req.body.email,
            city: req.body.city,
            image: req.file.filename,
        };
        if (req.file) {
            updateProfile.image = req.file.filename
        }
        const userUpdate = await AuthModel.updateOne({ email }, updateProfile)
        if (userUpdate) {
            res.redirect('/viewProfile')
        }
        else {
            return res.render('updateProfile', {
                error: "user details update failed",
                values: req.body
            });
        }
    }
    catch (err) {
        logger.error("err", err);

    }
};
