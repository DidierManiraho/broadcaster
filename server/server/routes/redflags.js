import express from 'express';
const router = express.Router();
const multer = require('multer');

import {
    jwtAuth
} from '../middleware/checkAuth';
import {
    getAllIncident,
    createIncident,
    checkIncident,
    updateIncident,
    deleteIncident

} from '../controller/redflags';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//all the CRUD routes for incident
router.get("/", getAllIncident);
router.post('/', upload.single('images'), jwtAuth, createIncident);
router.get('/:id', checkIncident);
router.patch('/:id', jwtAuth, updateIncident);
router.delete('/:id', jwtAuth, deleteIncident);


export default router;