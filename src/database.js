import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/moviesDB")
.then(db => console.log('Db is connected'))
.catch(err => console.log(err))