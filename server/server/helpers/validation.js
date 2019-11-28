import Joi from 'joi';

//user  validation

export const validateUser = (req, res, next) => {
    const schema = {
        firstname: Joi.string().min(5).required(),
        lastname: Joi.string().min(5).required(),
        email: Joi.string().email().min(5).required(),
        phoneNumber: Joi.string().min(5).required(),
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required()
    };

    const {
        error
    } = Joi.validate(req.body, schema);
    // console.log(error);
    if (error) {
        res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

    }
    next();
};

export const validateLogin = (req, res, next) => {
    const schema = {

        email: Joi.string().email().min(5).required(),
        password: Joi.string().min(5).required()
    };

    const {
        error
    } = Joi.validate(req.body, schema);
    // console.log(error);
    if (error) {
        res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

    }
    next();
};