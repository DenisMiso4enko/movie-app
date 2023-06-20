import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import ButtonBookmark from '../ButtonBookmark/ButtonBookmark'
import LazyImg from '../LazyImg/LazyImg'
import noPoster from '../../assets/no-poster.png'
import './MovieCard.scss'
import { IMovieTypes } from '../../types/MovieTypes'

type MovieCardProps = {
  data: IMovieTypes
  mediaType?: string
  fromSearch?: boolean
}

const MovieCard: FC<MovieCardProps> = ({ data, mediaType }) => {
  const { url } = useSelector((state: RootState) => state.home)
  const { genres } = useSelector((state: RootState) => state.home)
  const movieGenre = genres[data?.genre_ids[0]]?.name
  const navigate = useNavigate()
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : 'ni image'
  const handleBookmark = (e: any) => {
    e.stopPropagation()
    console.log('mediaType', mediaType)
    console.log('data.id', data.id)
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
        <ButtonBookmark />
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
