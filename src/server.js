const express = require("express");
// This imports the express library
const app = express();
// This renames express to be called as per convention
app.use(express.json());
//This line tells express that we will send data to and from via json rather than xml

require("dotenv").config();
// This line imports and runs dotenv in one line
require("./db/connection.js");

const Movie = require("./db/models/moviemodel");

app.get("/listMovies",
    async function listMovies(req,res) {
        try {
            const output = await Movie.find({})
            res.status(200).json(output)
        } catch (error) {
            console.log(error);
            const responseMessage = {
                message: `Unable to find movie list`
            }
            res.status(500).json(responseMessage)
        }
    }
)

app.post("/addMovie", async (req,res) => {
    try {
        const result = await Movie.create(
            {
                title: req.body.title,
                actor: req.body.actor,
                genre: req.body.genre
            }
        )
        console.log(result);
        const responseMessage = {
            message: `Movie ${req.body.title} has been added to the database`
        }
        res.status(201);
        res.json(responseMessage)
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: `Movie ${req.body.title} was not added`,
            DBresponse: error
        }
        res.status(418)
        res.json(responseMessage)
    }
}
)

app.get("/getSingleMovie", async (req,res) => {
    try {
        const output = await Movie.findOne({title: req.query.title})
        res.status(200).json(output)
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: `Movie ${req.body.title} was not found`,
            DBresponse: error
        }
        res.status(418)
        res.json(responseMessage)
    }
    
})

app.put("/updateActor", async function updateActor(req,res) {
    try {
        const output = await Movie.updateOne({title: req.query.title}, {$set: {actor: req.body.actor} })
        const responseMessage = {
            message: `Movie has been updated with ${req.body.actor}!`
        }
        res.status(200).json(output)
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: `Movie ${req.body.title} was not found`,
            DBresponse: error
        }
        res.status(418)
        res.json(responseMessage)
    }

})

app.put("/updateGenre", async function updateGenre(req,res) {
    try {
        const output = await Movie.updateOne({title: req.query.title}, {$set: {genre: req.body.genre} })
        const responseMessage = {
            message: `Movie has been updated with ${req.body.genre}!`
        }
        res.status(200).json(output)
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: `Movie ${req.body.title} was not found`,
            DBresponse: error
        }
        res.status(418)
        res.json(responseMessage)
    }
})

app.delete("/deleteMovie", async function deleteMovie(req,res) {
    try {
        const output = await Movie.deleteOne({title: req.query.title})
        const responseMessage = { message: "Movie has been deleted"}
        res.status(200).json(output)
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: `Movie ${req.body.title} was not found`,
            DBresponse: error
        }
        res.status(418)
        res.json(responseMessage)
    }
})


app.get("/health", (req,res) => {res.send("API is healthy")})
// health route to verify server is running

app.listen(5001, () => {console.log("server is listening on port 5001")});
// This is the listener which is the heart of the server