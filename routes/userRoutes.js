const express = require('express');

const routes = express.Router();

const usercontroller = require('../controllers/userControllers');
const formModel = require('../controllers/formcontrollers');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const imageupload = multer({ storage: storage }).single('image');

routes.get('/', usercontroller.login);
routes.get('/register', usercontroller.register);
routes.post('/registerUser', usercontroller.registerUser);
routes.post('/loginUser', usercontroller.loginUser);
routes.get('/dash', usercontroller.dash);
routes.get('/logout', usercontroller.logout);
routes.get('/form', usercontroller.form);
routes.get('/table', formModel.table);
routes.post('/addUser', imageupload, formModel.addUser);
routes.get('/deleteRecord', formModel.deleteRecord);
routes.get('/editRecord', formModel.editRecord);
routes.post('/editUser', imageupload, formModel.editUser);

module.exports = routes;