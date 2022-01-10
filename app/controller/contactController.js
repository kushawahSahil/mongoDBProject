const contactWithModel = require("../helpers/contactWithModel");
const logger = require("../loggers/logger");
const {
    contactValidation
} = require('../validations/contactValidation');


exports.multipleDeleteC = (req, res) => {
    try {
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            contactWithModel.findByIdAndDelete(Object.keys(id)[i], function () { });

        }
        res.redirect('/contact');

    } catch (err) {
        logger.error("err", err);
    }
}
exports.contact = (req, res) => {
    res.render('contact', {
        values: req.body

    });
}

exports.showAddContact = (req, res) => {
    res.render('addContact', {
        values: req.body

    });
}


exports.addContact = async (req, res) => {
    try {
        let { error } = contactValidation(req.body);
        if (error) {

            if (error.details[0].context.key == 'contactName') {
                var err1 = error.details[0].message;
                return res.render('addContact', {
                    error1: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('addContact', {
                    error2: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'contactNumber') {
                var err1 = error.details[0].message;
                return res.render('addContact', {
                    error3: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'messages') {
                var err1 = error.details[0].message;
                return res.render('addContact', {
                    error4: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('addContact', {
                    error5: err1,
                    values: res.body,
                });
            }
        }
        const user = {
            contactName: req.body.contactName,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            messages: req.body.messages,
            date: req.body.date,
        }
        const userData = await new contactWithModel(user)
        await userData.save().then(
            data => {
                res.redirect('/contact');
            })


    }
    catch (err) {
        logger.error("err", err);

    }
};


exports.showEditContact = async (req, res) => {
    try {
        const user = await contactWithModel.findById({ _id: req.params._id });
        if (user) {
            res.render('editContact', {

                values: user
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}

exports.deleteContact = async (req, res) => {

    try {
        const user = await contactWithModel.findById({ _id: req.params.id });
        await contactWithModel.deleteOne(user);
        await res.redirect('/contact');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.updateContact = async (req, res) => {
    try {
        let { error } = contactValidation(req.body);
        if (error) {

            if (error.details[0].context.key == 'contactName') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error1: err1,
                    values: res.body,

                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error2: err1,
                    values: res.body,

                });
            }
            if (error.details[0].context.key == 'contactNumber') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error3: err1,
                    values: res.body,

                });
            }
            if (error.details[0].context.key == 'messages') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error4: err1,
                    values: res.body,

                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('editContact', {
                    error5: err1,
                    values: res.body,

                });
            }
        } else {
            const userData = await contactWithModel.findByIdAndUpdate({ _id: req.params.id }, {
                contactName: req.body.contactName,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                messages: req.body.messages,
                date: req.body.date,
            });

            if (userData) {
                res.redirect('/contact');
            }
        }
    }
    catch (err) {
        logger.error("err", err);

    }
};

exports.viewContact = async (req, res) => {

    try {
        const user = await contactWithModel.find();
        if (user) {
            res.render('Contact', {
                values: user
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}