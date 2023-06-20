import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { fetchData } from '../../utils/api'
import Spinner from '../../components/Spinner/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/MovieCard/MovieCard'
import './Media.scss'
import { IApiDataType } from '../../types/ApiDataType'

const Media = () => {
  const [data, setData] = useState<IApiDataType | null>(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const [genre, setGenre] = useState(null)
  const [sortby, setSortby] = useState(null)
  const { mediaType } = useParams()

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`)

  const fetchInitialData = () => {
    setLoading(true)
    fetchData(`/discover/${mediaType}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchData(`/discover/${mediaType}?page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          // @ts-ignore
          results: [...data?.results, ...res.results],
        })
      } else {
        setData(res)
      }
      setPageNum((prev) => prev + 1)
    })
  }

  useEffect(() => {
    // filters = {};
    setData(null)
    setPageNum(1)
    setSortby(null)
    setGenre(null)
    fetchInitialData()
  }, [mediaType])

  return (
    <div className="media">
      <h2 className="media__title">
        {mediaType === 'tv' ? 'Explore TV Shows' : 'Explore Movies'}
      </h2>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <>
          {data && data.results?.length > 0 ? (
            <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner initial={true} />}
            >
              {data?.results?.map((item: any) => {
                if (item.media_type === 'person') return
                return (
                  <MovieCard key={item.id} data={item} mediaType={mediaType} />
                )
              })}
            </InfiniteScroll>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </>
      )}
    </div>
  )
}

export default Media
