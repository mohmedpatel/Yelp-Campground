const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Yelp")

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: :('));
db.once('open', function() {
 console.log('connected to mongoose');
});

const Campground = require("../model/CampSchema")
const cities = require("./cities")
const seedhelpers = require("./seedhelpers")
//or { places, descriptors} = require("./seedhelpers")//

const TitleFunc = seedcall => seedcall[Math.floor(Math.random() * seedcall.length)]

const seedDB = async ()=>{
   await Campground.deleteMany({});
   for ( let i = 0; i <= 350; i++ ){
        const rand1000 = Math.floor(Math.random()*1000);
        const location =  new Campground({
        owner : "627de5326fb6b44d48e92d28",
        location : `${cities[rand1000].city},${cities[rand1000].state}`,
        geometry : {
          type : 'Point',
          coordinates : [
            cities[rand1000].longitude,
            cities[rand1000].latitude
          ]
        },
        title : `${TitleFunc(descriptors)} ${TitleFunc(places)}`,
        price : `${rand1000}`,
        image: [
            {
              url: 'https://res.cloudinary.com/da8iuzvkg/image/upload/v1653120876/CAMP%20IMAGES/usutfyn7xonnhu0u5tba.jpg',
              filename: 'CAMP IMAGES/usutfyn7xonnhu0u5tba',
            },
            {
              url: 'https://res.cloudinary.com/da8iuzvkg/image/upload/v1653120876/CAMP%20IMAGES/evqhlpei8mqkb3gcorzv.jpg',
              filename: 'CAMP IMAGES/evqhlpei8mqkb3gcorzv',
            }
          ]
        })
        await location.save().then(error => console.log(error))
    }
}
seedDB();