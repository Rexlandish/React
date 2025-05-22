import React, { useState, useEffect } from 'react'
import "./MovieContent.css"

export default function Content() {

    let [movieData, setMovieData] = useState("")
    let [movieJSX, setMovieJSX] = useState("")

    useEffect( () => {
        fetch(
            "https://api.themoviedb.org/3/search/multi?query=animated&include_adult=false&language=en-US&page=1", {
                headers: new Headers({
                    'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTZhY2E0NzI1MTQ3MWU4ZWU1YTQyYTNiNWUwZDZlZiIsIm5iZiI6MTc0NzkyNjMwMC44MjQsInN1YiI6IjY4MmYzZDFjOTIzYmUwMDg4M2Q1YzIwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GShdRl-yfVSQFKkXzxxo4RegDoY_vbGmrTKrCdRyTKU", 
                }), 
            }
        ).then(res => res.json(res))
        // Display movie data
        .then(jsonData => {
            setMovieData(jsonData);
            console.log("set")
        })
        
    },
    [])

    useEffect( () => {
        if (!movieData) { // Only update if movie data has information
            return
        }
        processMovieData();
    }, [movieData])

    function processMovieData() {
        
        console.log(movieData);

        const movieDataResults = movieData.results
        // Sort movieDataResults based on the current sort method
        
        console.log(movieDataResults)
        setMovieJSX(
            <div className="movie-container">
            {
                movieDataResults.map((element) => {
                    if (element.backdrop_path == null) return null;
                    return (
                        <div className="movie">
                            <img className="movie-poster" src={"https://image.tmdb.org/t/p/original/" + element.poster_path} alt={element.name} />
                            <div className="movie-info">
                                <h1>{element.name} <span>({(element.vote_average * 10).toFixed(0)}%)</span></h1>
                                <p>{element.overview != "" ? element.overview : "n/a"}</p>
                            </div>
                        </div>
                        
                    )
                    
                })
            }
            </div>
        )
    
    }

    return (
    <div>
        <div className="movie-controls">
            <label htmlFor="sort-by">Sort by: </label>
            <select onChange={() => processMovieData()} id="sort-by" className='text-white'>
                <option className='text-black' value="rating-asc">Rating (Ascending)</option>
                <option className='text-black' value="rating-desc">Rating (Descending)</option>
            </select>
        </div>
        {movieJSX}
        
    </div>
    )
}
