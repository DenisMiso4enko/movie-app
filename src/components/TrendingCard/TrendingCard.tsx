import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import ButtonBookmark from '../ButtonBookmark/ButtonBookmark'
import LazyImg from '../LazyImg/LazyImg'
import { IMovieTypes } from '../../types/MovieTypes'
import './TrendingCard.scss'

type TrendingCardProps = {
  item: IMovieTypes
}

const TrendingCard: FC<TrendingCardProps> = ({ item }) => {
  const { url } = useSelector((state: RootState) => state.home)
  const { genres } = useSelector((state: RootState) => state.home)
  const navigate = useNavigate()
  // console.log('genres', genres)
  const movieGenre = genres[item?.genre_ids[0]]?.name
  const posterUrl = item.poster_path
    ? url.poster + item.poster_path
    : 'no image'

  const handleClickNavigate = () => {
    navigate(`/${item.media_type}/${item.id}`)
  }

  const handleBookmark = (e: any) => {
    e.stopPropagation()
  }

  return (
    <div className="trending-card" onClick={handleClickNavigate}>
      <LazyImg
        className={'trending-card__poster'}
        src={posterUrl}
        alt={item.title}
      />

      <div className="trending-card__action" onClick={handleBookmark}>
        <ButtonBookmark />
      </div>

      <div className="trending-card__text">
        <div className="trending-card__info">
          <p className="date">
            {dayjs(item.release_date || item.first_air_date).format('YYYY')}
          </p>
          <p>{movieGenre}</p>
          <p>9.7</p>
        </div>
        <h3 className="title">{item.title || item.name}</h3>
      </div>
    </div>
  )
}

export default TrendingCard
