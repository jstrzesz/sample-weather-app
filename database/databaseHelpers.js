const mongoose = require('mongoose');

const db = mongoose.connection;

const mongoDB = 'mongodb://user1A:qwerty1@ds241493.mlab.com:41493/weather_images';

mongoose.connect(mongoDB, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
})

mongoose.set('useCreateIndex', true);

db.on('error', () => {
  console.log('mongoose connection error')
})

db.once('open', () => {
  console.log('mongoose successfully connected')
})

const imageSchema = mongoose.Schema({
  text: String,
  img: String
})

const Image = mongoose.model('Image', imageSchema);

const saveImage = (imgObject, response) => {
  const newImage = new Image(imgObject);
  newImage.save(error => {
    if (error) {
      console.error(error);
    } else {
      console.log('successfully saved image to database');
    }
  })
}

const query = Image.find();

const findImage = (weather, callback) => {
  console.log(weather, 'line 44 dbHeplers')
  Image.find({ text: weather }).select('img').exec(callback);
}


module.exports = {
  Image,
  saveImage,
  findImage
}