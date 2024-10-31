const mongoose = require("mongoose");
 
const movieSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            require: true,
            unique: true
        },
        actor: {
            type: String,
            require: false,
            unique: false
        },
        genre: {
            type: String,
            require: false,
            unique: false
        }
    }
)
 
const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie;