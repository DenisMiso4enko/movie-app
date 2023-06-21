import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import TrendingCard from '../TrendingCard/TrendingCard'
import './Trending.scss'

const Trending = () => {
  const [endpoint, setEndpoint] = useState('day')
  const { data, loading } = useFetch(`/trending/movie/${endpoint}`)

  return (
    <div className="trending">
      <h1 className="trending__title">Trending</h1>
      <div className="trending__list">
        {/* @ts-ignore */}
        {data?.results?.map((data: any) => (
          <TrendingCard key={data.id} data={data} mediaType={'movie'} />
        ))}
      </div>
    </div>
  )
}

export default Trending
