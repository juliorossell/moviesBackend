import Movie from "../models/Movie";

export const createMovie = async (req, res) => {
    const { name, category, imgURL } = req.body;
    const newMovie = new Movie({ name, category, imgURL});
    const movieSaved = await newMovie.save();
    res.status(201).json(movieSaved);
}

export const getMovies = async (req, res) => {
    const movieList = await Movie.find();
    res.status(200).json(movieList);
}

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById({ _id: req.params.movieId });
        if (movie){
            res.status(200).json(movie);
        }
    
    } catch (error) {
        res.status(500).json({ message: 'Movie not found'});
    }
}

export const updateMovieById = async (req, res) => {
    try {
        const movieUpdated = await Movie.findByIdAndUpdate(req.params.movieId, req.body, {
            new: true
        });
        res.status(200).json(movieUpdated);
    } catch (error) {
        res.status(500).json({ message: 'error'});
    }

}

export const deleteMovieById = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.movieId);
        res.status(200).json('movie deleted');
    } catch (error) {
        res.status(500).json({ message: 'error to delete movie'});
    }

}