// @ts-nocheck

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Spinner from '../Spinner/Spinner'
import dayjs from 'dayjs'
import Genres from '../Genres/Genres'
import VideoModal from '../VideoModal/VideoModal'
import LazyImg from '../LazyImg/LazyImg'
import noPoster from '../../assets/no-poster.png'
import './DetailsBanner.scss'

const DetailsBanner = ({ video, crew }: any) => {
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}`)
  const { url } = useSelector((state: RootState) => state.home)

  const _genres = data?.genres?.map((g) => g.id)
  const director = crew?.filter((f: any) => f.job === 'Director')
  const writer = crew?.filter(
    (f) => f.job === 'Screenplay' || f.job === 'Story' || f.job === 'Writer'
  )

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
  }

  return (
    <div className="details">
      {loading && <Spinner initial={true} />}
      {data && (
        <>
          <div className="backdrop-img">
            <LazyImg src={url.backdrop + data.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <div className="details__content">
            <div className="details__left">
              {data?.poster_path ? (
                <LazyImg
                  className="details__poster"
                  src={url.backdrop + data?.poster_path}
                />
              ) : (
                <LazyImg src={noPoster} />
              )}
            </div>
            <div className="details__right">
              <h2 className="details__title">
                {`${data.name || data.title} (${dayjs(
                  data?.release_date
                ).format('YYYY')})`}
              </h2>
              <p className="details__subtitle">{data.tagline}</p>
              <Genres data={_genres} />
              <button
                className="button"
                onClick={() => {
                  setShow(true)
                  setVideoId(video.key)
                }}
              >
                <span className="arrow"></span>
                <p className="label"> Watch Trailer</p>
              </button>

              <div className="details__overview">
                <div className="heading">Overview</div>
                <div className="description">{data.overview}</div>
              </div>

              <div className="details__info">
                {data?.status && (
                  <div className="infoItem">
                    <span className="text bold">Status: </span>
                    <span className="text">{data.status}</span>
                  </div>
                )}
                {data?.release_date && (
                  <div className="infoItem">
                    <span className="text bold">Release Date: </span>
                    <span className="text">
                      {dayjs(data.release_date).format('MMM D, YYYY')}
                    </span>
                  </div>
                )}
                {data?.runtime && (
                  <div className="infoItem">
                    <span className="text bold">Runtime: </span>
                    <span className="text">
                      {toHoursAndMinutes(data.runtime)}
                    </span>
                  </div>
                )}

                {data?.vote_average && (
                  <div className="infoItem">
                    <span className="text bold">Rate: </span>
                    <span className="text">{data.vote_average.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {director?.length > 0 && (
                <div className="details__info">
                  <span className="text bold">Director: </span>
                  <span className="text">
                    {director?.map((d, i) => (
                      <span key={i}>
                        {d.name}
                        {director.length - 1 !== i && ', '}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              {writer?.length > 0 && (
                <div className="details__info">
                  <span className="text bold">Writer: </span>
                  <span className="text">
                    {writer?.map((d, i) => (
                      <span key={i}>
                        {d.name}
                        {writer.length - 1 !== i && ', '}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
          <VideoModal
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
          />
        </>
      )}
    </div>
  )
}

export default DetailsBanner
