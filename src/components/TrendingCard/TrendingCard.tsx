import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import ButtonBookmark from '../ButtonBookmark/ButtonBookmark'
import LazyImg from '../LazyImg/LazyImg'
import { IMovieTypes } from '../../types/MovieTypes'
import {
  fetchAddToFavoriteMovie,
  fetchAddToFavoriteTv,
  fetchRemoveFavoriteMovie,
  fetchRemoveFavoriteTv,
} from '../../store/Slices/User/userServices'
import { BsBookmarkX } from 'react-icons/bs'
import { BiBookmark } from 'react-icons/bi'
import './TrendingCard.scss'

type TrendingCardProps = {
  data: IMovieTypes
  mediaType: string
}

const TrendingCard: FC<TrendingCardProps> = ({ data, mediaType }) => {
  const { url } = useSelector((state: RootState) => state.home)
  const { genres } = useSelector((state: RootState) => state.home)
  const { userId, favoritesMovies, favoritesTv } = useSelector(
    (state: RootState) => state.user
  )
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  // console.log('genres', genres)
  const movieGenre = genres[data?.genre_ids[0]]?.name
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : 'no image'

  const handleClickNavigate = () => {
    navigate(`/${data.media_type}/${data.id}`)
  }

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
    <div className="trending-card" onClick={handleClickNavigate}>
      <LazyImg
        className={'trending-card__poster'}
        src={posterUrl}
        alt={data.title}
      />

      {userId && (
        <div className="trending-card__action" onClick={handleBookmark}>
          {isIncludeMovie || isIncludeTv ? (
            <ButtonBookmark icon={<BsBookmarkX />} />
          ) : (
            <ButtonBookmark icon={<BiBookmark />} />
          )}
        </div>
      )}

      <div className="trending-card__text">
        <div className="trending-card__info">
          <p className="date">
            {dayjs(data.release_date || data.first_air_date).format('YYYY')}
          </p>
          <p>{movieGenre}</p>
          <p>9.7</p>
        </div>
        <h3 className="title">{data.title || data.name}</h3>
      </div>
    </div>
  )
}

export default TrendingCard
