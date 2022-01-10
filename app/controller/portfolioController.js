const { result } = require('@hapi/joi/lib/base');
const categoryModel = require('../helpers/categoryModel');
const portfolioModel = require('../helpers/portfolioModel');
const logger = require('../loggers/logger');
const { portfolioValidation } = require('../validations/portfolioValidation');

exports.portfolio = (req, res) => {
    res.render('portfolio', {
        values: req.body
    });
}

exports.showAddPortfolio = async (req, res) => {
    try {
        const user = await categoryModel.find();
        if (user) {
            res.render('addPortfolio', {
                values: user
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}

exports.viewPortfolio = async (req, res) => {
    try {
        const user = await portfolioModel.aggregate([
            {
                $lookup:
                {
                    from: "categories",
                    localField: "id",
                    foreignField: "projectCategory",
                    as: "proj_category",
                },
            },
        ])
        if (user) {
            res.render('portfolio', {
                values: user
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}

exports.addPortfolio = async (req, res) => {
    try {
        let { error } = portfolioValidation(req.body);
        if (error) {

            if (error.details[0].context.key == 'projectCategory') {
                var err1 = error.details[0].message;
                return res.render('addPortfolio', {
                    error1: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'projectName') {
                var err1 = error.details[0].message;
                return res.render('addPortfolio', {
                    error2: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'projectTitle') {
                var err1 = error.details[0].message;
                return res.render('addPortfolio', {
                    error3: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'projectDate') {
                var err1 = error.details[0].message;
                return res.render('addPortfolio', {
                    error4: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'projectDescription') {
                var err1 = error.details[0].message;
                return res.render('addPortfolio', {
                    error5: err1,
                    values: res.body,
                });
            }
        }

        const image = req.files.map((image) => image.filename);
        const user = await new portfolioModel({
            projectCategory: req.body.projectCategory,
            projectName: req.body.projectName,
            projectImage: image,
            projectTitle: req.body.projectTitle,
            projectDate: req.body.projectDate,
            projectDescription: req.body.projectDescription,
        });

        await user.save().then(
            data => {
                res.redirect('/portfolio');
            })
    }
    catch (err) {
        logger.error("err", err);

    }
};

exports.deletePortfolio = async (req, res) => {

    try {
        const user = await portfolioModel.findById({ _id: req.params.id });
        await portfolioModel.deleteOne(user);
        await res.redirect('/portfolio');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeletePortfolio = (req, res) => {
    try {
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            portfolioModel.findByIdAndDelete(Object.keys(id)[i], function () { });

        }
        res.redirect('/portfolio');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.updatePortfolio = async (req, res) => {
    console.log(req.body);
    try {
        let { error } = portfolioValidation(req.body);
        console.log(error);
        if (error) {

            if (error.details[0].context.key == 'projectCategory') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error1: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'projectName') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error2: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'projectTitle') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error3: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'projectDate') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error4: err1,
                    values: res.body,
                });
            }
            if (error.details[0].context.key == 'projectDescription') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error5: err1,
                    values: res.body,
                });
            }
        }
        const user = await portfolioModel.findByIdAndUpdate(req.params.id, {
            projectCategory: req.body.projectCategory,
            projectName: req.body.projectName,
            projectTitle: req.body.projectTitle,
            projectDate: req.body.projectDate,
            projectDescription: req.body.projectDescription,
        })
        if (req.files) {
            user.projectImage = req.files.map(image => image.filename);
        } else {
            user.projectImage = req.body.img
        }
        if (user) {
            res.redirect('/portfolio')
        }

    }
    catch (err) {
        logger.error("err", err);

    }
};

exports.showEditPortfolio = async (req, res) => {
    try {
        const categoryUser = await categoryModel.find();
        const user = await portfolioModel.findById({ _id: req.params.id });

        if (user && categoryUser) {
            res.render('editPortfolio', {
                values: user,
                categoryValues: categoryUser
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}