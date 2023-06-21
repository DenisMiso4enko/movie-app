import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import './Bookmarks.scss'
import MovieCard from '../../components/MovieCard/MovieCard'

const Bookmarks = () => {
  const { userId, favoritesMovies, favoritesTv } = useSelector(
    (state: RootState) => state.user
  )
  const navigate = useNavigate()

  return (
    <div className="bookmarks">
      <h2 className="bookmarks__title">Favorites Movies</h2>
      <div className="bookmarks__list favoritesMovies">
        {favoritesMovies?.map((movie) => (
          <MovieCard key={movie.id} data={movie} mediaType={'movie'} />
        ))}
      </div>
      <h2 className="bookmarks__title">Favorites Movies</h2>
      <div className="bookmarks__list">
        {favoritesTv?.map((movie) => (
          <MovieCard key={movie.id} data={movie} mediaType={'tv'} />
        ))}
      </div>
    </div>
  )
}

export default Bookmarks
