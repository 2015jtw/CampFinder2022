const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const axios = require('axios');


mongoose.connect("mongodb://localhost:27017/camp-finder");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log('database connected')
});

const sample = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'lTmxSRnK6ouaykjFTXkvPNfGQJ3lPbx2EuaVa1XvKgs',
          collections: 1114848,
        },
      })
      return resp.data.urls.small
    } catch (err) {
      console.error(err)
    }
  }
  

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i =0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 35) + 10;
        const camp = new Campground({
            author: `637517a86c196336c3766321`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: await seedImg(), 
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})