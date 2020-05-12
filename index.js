const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useUnifiedTopology: true,  useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
//part3
connect.then((db) => {

    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);

       // return Dishes.find({}); //.exec();
       return Dishes.findByIdAndUpdate(dish._id, {
           $set: {description: 'Updated test'}
       },{
           new: true
       })
       .exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })

    .then((dish) => {
        console.log(dish); // will return one dish collection

        return Dishes.deleteOne({});// remove is deprecated instead use deleteOne or deleteMany
    })
    
    .then(() => {

        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });    

});