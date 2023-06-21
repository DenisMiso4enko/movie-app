import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './Bookmarks.scss'
import MovieCard from '../../components/MovieCard/MovieCard'

const Bookmarks = () => {
  const { favoritesMovies, favoritesTv } = useSelector(
    (state: RootState) => state.user
  )

  // @ts-ignore
  const isEmptyMovie = favoritesMovies?.length > 0
  // @ts-ignore
  const isEmptyTv = favoritesTv?.length > 0
  return (
    <div className="bookmarks">
      <h2 className="bookmarks__title">Favorites Movies</h2>
      <div className="bookmarks__list favoritesMovies">
        {!isEmptyMovie && <p>Favorites movies list empty</p>}
        {favoritesMovies?.map((movie) => (
          <MovieCard key={movie.id} data={movie} mediaType={'movie'} />
        ))}
      </div>
      <h2 className="bookmarks__title">Favorites Tv Shows</h2>
      <div className="bookmarks__list">
        {!isEmptyTv && <p>Favorites tv shows list empty</p>}
        {favoritesTv?.map((movie) => (
          <MovieCard key={movie.id} data={movie} mediaType={'tv'} />
        ))}
      </div>
    </div>
  )
}

export default Bookmarks
