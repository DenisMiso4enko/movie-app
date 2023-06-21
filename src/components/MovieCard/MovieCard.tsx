import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import ButtonBookmark from '../ButtonBookmark/ButtonBookmark'
import LazyImg from '../LazyImg/LazyImg'
import noPoster from '../../assets/no-poster.png'
import { IMovieTypes } from '../../types/MovieTypes'
import { BiBookmark } from 'react-icons/bi'
import { BsBookmarkX } from 'react-icons/bs'
import './MovieCard.scss'
import {
  fetchAddToFavoriteMovie,
  fetchAddToFavoriteTv,
  fetchRemoveFavoriteMovie,
  fetchRemoveFavoriteTv,
} from '../../store/Slices/User/userServices'
import { loadConfigFromFile } from 'vite'

type MovieCardProps = {
  data: IMovieTypes
  mediaType?: string
  fromSearch?: boolean
}

const MovieCard: FC<MovieCardProps> = ({ data, mediaType }) => {
  const { url, genres } = useSelector((state: RootState) => state.home)
  const { userId, favoritesMovies, favoritesTv } = useSelector(
    (state: RootState) => state.user
  )
  const movieGenre = genres[data?.genre_ids[0]]?.name
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : 'ni image'

  const isIncludeMovie = favoritesMovies?.filter(
    (item) => item.id === data.id
  ).length
  const isIncludeTv = favoritesTv?.filter((item) => item.id === data.id).length

  const handleBookmark = (e: any) => {
    e.stopPropagation()
    if (mediaType === 'movie') {
      if (isIncludeMovie) {
        dispatch(fetchRemoveFavoriteMovie({ userId, movieId: data.id, data }))
      } else {
        dispatch(fetchAddToFavoriteMovie({ userId, movieId: data.id, data }))
      }
    } else {
      if (isIncludeTv) {
        dispatch(fetchRemoveFavoriteTv({ userId, tvId: data.id, data }))
      } else {
        dispatch(fetchAddToFavoriteTv({ userId, tvId: data.id, data }))
      }
    }
  }
  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="movie-card__image">
        {data?.poster_path ? (
          <LazyImg src={url.backdrop + data?.poster_path} />
        ) : (
          <LazyImg src={noPoster} />
        )}
      </div>

      <div className="movie-card__action" onClick={handleBookmark}>
        {isIncludeMovie || isIncludeTv ? (
          <ButtonBookmark icon={<BsBookmarkX />} />
        ) : (
          <ButtonBookmark icon={<BiBookmark />} />
        )}
      </div>

      <div className="movie-card__text">
        <div className="movie-card__info">
          <p className="date">
            {dayjs(data.release_date || data.first_air_date).format('YYYY')}
          </p>
          <p>{movieGenre}</p>
          <p>9.7</p>
        </div>
      </div>
      <h2 className="movie-card__title">{data.title || data.name}</h2>
    </div>
  )
}

export default MovieCard
