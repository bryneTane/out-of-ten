const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const User = require('./user');
const md5 = require('md5');

const API_PORT = 3010;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://out-of-ten:tnmc2212Ts%40ms@cluster0-kippz.mongodb.net/out-of-ten?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  User.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  User.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  User.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post('/register', (req, res) => {
    User.findOne({ id: req.body.id }).then(user => {
        if (user) {
            return res.status(400).json({ id: "Cet identifiant est déjà utilisé" });
        } else {
            const newUser = new User({
                id: req.body.id,
                username: req.body.username,
                password: md5(req.body.password)
            });
            newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        }
    });
});

router.post('/connect', (req, res) => {
  User.findOne({ id: req.body.id }).then(user => {
      if (user) {
          if(user.password !== md5(req.body.password)) return res.status(400).json({ id: "Identifiant ou mot de passe incorrect" });
          else{
            let data = {};
            for(index in user){
              data[index] = user[index];
            }
            return res.status(200).json(data);
          }
      } else {
        return res.status(400).json({ id: "Identifiant ou mot de passe incorrect" });
      }
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));