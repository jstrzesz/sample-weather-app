const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/south_park', (req, res) => {
  res.send({ name: 'Cartman'})
})

app.listen(port, () => {
  console.log(`sample-weather-app listening on ${port}`)
});