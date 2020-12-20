require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { PORT, mongoUri } = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const foodRoutes = require('./routes/api/foods');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('MongoDB database connected.'))
.catch((err) => console.log(err))

app.use('/api/foods', foodRoutes);

app.listen(process.env.PORT, function() {
    console.log('Server started on port ' + process.env.PORT);
});
  