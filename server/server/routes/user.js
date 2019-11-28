import express from 'express';
const router = express.Router();

import {
    signup,
    signin,
    getAllUsers
} from '../controller/user';
import {
    jwtAuth
} from '../middleware/checkAuth.js';
import {
    validateUser,
    validateLogin
} from '../helpers/validation';


//all the routes to login/ register/ 
router.get("/", getAllUsers);
router.post("/signup", validateUser, signup);
router.post('/signin', validateLogin, signin);

export default router;