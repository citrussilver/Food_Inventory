require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { PORT, mongoUri } = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const foodRoutes = require('./routes/api/foods');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

const port = process.env.PORT || 9000;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('MongoDB database connected.'))
.catch((err) => console.log(err))

app.use('/api/foods', foodRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});
  