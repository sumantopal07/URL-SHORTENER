const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://app:123@cluster0.3jyzz.mongodb.net/test', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});