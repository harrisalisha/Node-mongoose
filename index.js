const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useUnifiedTopology: true,  useNewUrlParser: true });

connect.then((db) => {

    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.find({}); //.exec();
    })
    .then((dishes) => {
        console.log(dishes); // will return one dish collection

        return Dishes.deleteOne({});// remove is deprecated instead use deleteOne or deleteMany
    })
    .then(() => {

        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });    

});