const usermodel = require('../models/userModels');

const fs = require('fs');

const login = (req, res) => {
    if (req.cookies.auth) {
        return res.redirect('dash');
    }
    return res.render('login');
}

const register = (req, res) => {
    return res.render('register');
}

const dash = (req, res) => {
    if (!req.cookies.auth) {
        return res.redirect('/');
    }
    return res.render('dash');
}

const loginUser = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let user = await usermodel.findOne({ email: email });

        if (!user || user.password != password) {
            console.log("email and password are not correct");
            return res.redirect('/');
        }
        res.cookie('auth', user);
        return res.redirect('/dash');

    } catch (error) {
        console.log(error);
        return false;
    }
}

const registerUser = async (req, res) => {
    if (req.body.password != req.body.cpassword) {
        console.log("both password are not same");
        return res.redirect('back');
    }
    try {
        let rUser = await usermodel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        console.log('your register sucessfully');
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const logout = (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/');
}

const form = (req, res) => {
    return res.render('form');
}


module.exports = ({
    login, register, registerUser, loginUser, dash, logout, form
})