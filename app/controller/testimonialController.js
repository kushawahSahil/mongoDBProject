const testimonialModel = require('../helpers/testimonialModel');
const logger = require('../loggers/logger');
const { testimonialValidation } = require('../validations/testimonialValidation');

exports.testimonial = (req, res) => {
    res.render('testimonial', {
        values: req.body
    });
}

exports.showAddTestimonial = (req, res) => {
    res.render('addTestimonial', {
        values: req.body
    })
}

exports.viewTestimonial = async (req, res) => {
    try {
        const user = await testimonialModel.find();
        if (user) {
            res.render('testimonial', {
                values: user
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}

exports.addTestimonial = async (req, res) => {
    try {
        let { error } = testimonialValidation(req.body);
        if (error) {

            if (error.details[0].context.key == 'TestimonialName') {
                var err1 = error.details[0].message;
                return res.render('addTestimonial', {
                    error1: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'Designation') {
                var err1 = error.details[0].message;
                return res.render('addTestimonial', {
                    error2: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'testimonialDescription') {
                var err1 = error.details[0].message;
                return res.render('addTestimonial', {
                    error3: err1,
                    values: res.body,
                });
            }
        }
        const user = await new testimonialModel({
            testimonialName: req.body.TestimonialName,
            designation: req.body.Designation,
            testimonialDescription: req.body.testimonialDescription,
            testimonialImage: req.file.filename,
        });
        await user.save().then(
            data => {
                res.redirect('/testimonial');
            })
    }
    catch (err) {
        logger.error("err", err);

    }
};

exports.deleteTestimonial = async (req, res) => {

    try {
        const user = await testimonialModel.findById({ _id: req.params.id });
        await testimonialModel.deleteOne(user);
        await res.redirect('/testimonial');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multipleDeleteTestimonial = (req, res) => {
    try {
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            testimonialModel.findByIdAndDelete(Object.keys(id)[i], function () { });

        }
        res.redirect('/testimonial');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.showEditTestimonial = async (req, res) => {
    try {
        const user = await testimonialModel.findById({ _id: req.params.id });
        if (user) {
            res.render('editTestimonial', {

                values: user
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}

exports.updateTestimonial = async (req, res) => {
    try {
        let { error } = testimonialValidation(req.body);
        if (error) {

            if (error.details[0].context.key == 'TestimonialName') {
                var err1 = error.details[0].message;
                return res.render('editTestimonial', {
                    error1: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'Designation') {
                var err1 = error.details[0].message;
                return res.render('editTestimonial', {
                    error2: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'testimonialDescription') {
                var err1 = error.details[0].message;
                return res.render('editTestimonial', {
                    error3: err1,
                    values: res.body,
                });
            }
        } else {
            const user = await testimonialModel.findByIdAndUpdate({ _id: req.params.id }, {
                TestimonialName: req.body.TestimonialName,
                Designation: req.body.Designation,
                testimonialDescription: req.body.testimonialDescription,
                testimonialImage: req.body.testimonialImage,
            });
            if (userData) {
                res.redirect('/testimonial');
            }
        }
    }
    catch (err) {
        logger.error("err", err);

    }
};
