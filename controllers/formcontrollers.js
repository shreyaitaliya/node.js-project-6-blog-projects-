const formModel = require('../models/formModel');

const table = async (req, res) => {
    try {
        let allData = await formModel.find({});
        return res.render('table', {
            record: allData
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addUser = async (req, res) => {
    try {
        let imagename = '';
        if (req.file) {
            imagename = req.file.path;
        }

        let userdata = await formModel.create({
            title: req.body.title,
            description: req.body.description,
            image: imagename,
        })
        return res.redirect('/table');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteRecord = async (req, res) => {
    try {
        let delimage = await formModel.findByIdAndDelete(req.query.delid);
        fs.unlinkSync(delimage.image);

        let delrecord = await formModel.findByIdAndDelete(req.query.delid);
        return res.redirect('/table');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editRecord = async (req, res) => {
    try {
        let single = await formModel.findById(req.query.editid);
        return res.render('edit', {
            single
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editUser = async (req, res) => {
    try {
        if (req.file) {
            let remimage = await formModel.findById(req.body.editid);
            fs.unlinkSync(remimage.image);
            let updateRecord = await formModel.findByIdAndUpdate(req.body.editid, {
                title: req.body.title,
                image: req.file.path,
                description: req.body.description,
            })
            return res.redirect('/table');
        }
        else {
            let record = await formModel.findById(req.body.editid);
            let uprecord = await formModel.findByIdAndUpdate(req.body.editid, {
                title: req.body.title,
                image: record.image,
                description: req.body.description,
            })
            return res.redirect('/table');
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    addUser, table, deleteRecord, editRecord, editUser
})