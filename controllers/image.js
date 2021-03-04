
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9dde659d90c94843957bf2a7c2c1230f'
});

const handleAPICall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('cant work with the API'))
}

const handleImage = (req,res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('cant get entries'))
}

module.exports = {
    handleImage,
    handleAPICall
}