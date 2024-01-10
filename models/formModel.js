const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
})

const tblName = mongoose.model('crudform', userSchema);

module.exports = tblName;