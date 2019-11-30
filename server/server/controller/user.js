import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';


//get all users
export const getAllUsers = (req, res) => {
    res.send({
        status: 200,
        data: [User]
    });
};

//create users
export const signup = (req, res) => {
    let email = req.body.email;
    //let username = req.body.username;
    const isUserExist = User.find(el => el.email === email);
    if (isUserExist)
        return res.status(404).json({
            message: "email exists."
        });
    const pwd = bcrypt.hashSync(req.body.password, 10);
    const user = {
        id: User.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: pwd
    };
    const id = user.id;
    console.log(id);
    //create token
    let token = jwt.sign({
            email: email,
            id
        },
        'secrete', {
            expiresIn: '1h' // expires in 1hours
        }
    );
    // return the JWT token for the future API calls
    res.status(200).header('token', token).json({
        success: true,
        message: 'Authentication successful!',
        token: token

    });

    User.push(user);
    return res.status(201).json({
        message: 'user has been created successfully',
        status: 201,
        data: {
            user
        }
    });
};

//user sign in 

export const signin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    const isUserExist = User.find(el => el.email === email);
    const id = isUserExist.id;
    console.log(id);
    if (email.length !== 0 || password.length !== 0) {
        const checkpwd = bcrypt.compareSync(password, isUserExist.password);
        if (checkpwd && isUserExist) {
            res.status(200).json({
                status: 200,
                message: 'User Login.'
            });
        } else {
            console.log(isUserExist);
            res.status(403).json({
                success: 403,
                message: 'Incorrect username or password'
            });
        }
    }
};