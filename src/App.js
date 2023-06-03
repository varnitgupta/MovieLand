import { useEffect, useState } from 'react';
import './App.css';
import searchIcon from './search.svg'
import MovieCard from './MovieCard';


function App() {
  const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovie = async (title) => {
    const response = await fetch(API_URL + `&S=${title}`)
    const data = await response.json()
    console.log(data);
    setMovies(data.Search) 
  } 
  const showPage1 = async () => {
    const response = await fetch(API_URL + `&s=shrek`)
    const data = await response.json()
    console.log(data);
    setMovies(data.Search) 
  } 
  useEffect(() => {
    showPage1()
  }, [])
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder= 'search' value={searchTerm} onChange={(e) =>{setSearchTerm(e.target.value) }} type="text" />
        <img src={searchIcon} alt="search" onClick={() => {searchMovie(searchTerm)}} />
      </div>
      {
        movies?.length>0 ?
        (
        <div className="container">
          {movies.map((movie) =>( 
            <MovieCard movie = {movie} />
          ))} 
        </div>
        )
        :
        (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
        ) 
      }
    </div>
  );
}

export default App;
