const categoryModel = require('../helpers/categoryModel');
const logger = require('../loggers/logger');
const { categoryValidation } = require('../validations/categoryValidation');

exports.multipleDeleteCategory = (req, res) => {
    try {
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            categoryModel.findByIdAndDelete(Object.keys(id)[i], function () { });

        }
        res.redirect('/category');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.category = (req, res) => {
    res.render('category', {
        values: req.body
    });
}

exports.showAddCategory = (req, res) => {
    res.render('addCategory', {
        values: req.body
    });
}

exports.viewCategory = async (req, res) => {
    try {
        const user = await categoryModel.find();
        if (user) {
            res.render('category', {
                values: user
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}

exports.addCategory = async (req, res) => {
    try {
        let { error } = categoryValidation(req.body);
        if (error) {

            if (error.details[0].context.key == 'categoryName') {
                var err1 = error.details[0].message;
                return res.render('addCategory', {
                    error1: err1,
                    values: res.body,
                });
            }

        }
        const user = {
            categoryName: req.body.categoryName,
        }
        const userData = await new categoryModel(user)
        await userData.save().then(
            data => {
                res.redirect('/category');
            })


    }
    catch (err) {
        logger.error("err", err);

    }
};

exports.showEditCategory = async (req, res) => {
    try {
        const user = await categoryModel.findById({ _id: req.params.id });
        if (user) {
            res.render('editCategory', {

                values: user
            });
        }
    } catch (err) {
        logger.error('err', err);
    }
}

exports.deleteCategory = async (req, res) => {

    try {
        const user = await categoryModel.findById({ _id: req.params.id });
        await categoryModel.deleteOne(user);
        await res.redirect('/category');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let { error } = categoryValidation(req.body);
        if (error) {

            if (error.details[0].context.key == 'categoryName') {
                var err1 = error.details[0].message;
                return res.render('editCategory', {
                    error1: err1,
                    values: res.body,
                });
            }

        } else {
            const userData = await categoryModel.findByIdAndUpdate({ _id: req.params.id }, {
                categoryName: req.body.categoryName,
            });
            if (userData) {
                res.redirect('/category');
            }
        }
    }
    catch (err) {
        logger.error("err", err);

    }
};
