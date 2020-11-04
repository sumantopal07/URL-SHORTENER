const mongoose = require('mongoose');
const URL = mongoose.model('URL', {
    _key: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    _url: {
        type: String,
        trim: true,
        required: true,
    }
});

module.exports= URL;