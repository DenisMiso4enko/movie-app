import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../../utils/api'
import Spinner from '../../components/Spinner/Spinner'
import MovieCard from '../../components/MovieCard/MovieCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import './SearchResult.scss'
import { IApiDataType } from '../../types/ApiDataType'

const SearchResult = () => {
  const [data, setData] = useState<IApiDataType | null>(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()

  const fetchInitialData = () => {
    setLoading(true)
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      // @ts-ignore
      if (data?.results) {
        setData({
          // @ts-ignore
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
    setPageNum(1)
    fetchInitialData()
  }, [query])

  return (
    <div className="search-result">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <>
          {data && data.results?.length > 0 ? (
            <>
              <h2 className="search-result__title">
                {`Found ${data?.total_results} ${
                  data?.total_results > 1 ? 'results' : 'result'
                } for '${query}'`}
              </h2>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item: any) => {
                  if (item.media_type === 'person') return
                  return (
                    <MovieCard key={item.id} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </>
      )}
    </div>
  )
}

export default SearchResult
