require('./db/mongoose');
const path = require('path');
const express = require('express');
const URL = require('./models/url');
const app = express();
const port = process.env.PORT || 3000;
//sudo killall -9 node
const publicDirectoryPath = path.join(__dirname, '/public');
app.use(express.static(publicDirectoryPath));

app.use(express.json({limit: '1mb'}));
app.get('', (req, res) => {
    res.render('index');
});

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
app.post('/url/', async (req, res) => {

    const _key = makeid(5);
    const _url = req.body.url;
    const object = {
        _key: _key,
        _url: _url
    };

    const url = new URL(object);
    try {
        await url.save();
        res.status(201).json({url});
    } catch (error) {
        res.status(400).send(error);
    }

});


app.get('/:id', async (req, res) => {
    const _key = req.params.id;
    try {
        const id = await URL.findOne({ _key: _key });
        if (!id) {
            return res.status(404).send("Wrong URL entered");
        }
        return res.redirect(id._url);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Under Maintainance");
    }
});
app.post('/*', async (req, res) => {

    res.status(400).send("Wrong URL entered");

});


app.listen(port, () => {
    //runs when  server is up and running
    console.log('Server is up on port 3000.');
})