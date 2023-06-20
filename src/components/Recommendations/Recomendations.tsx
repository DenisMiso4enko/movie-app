import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Recomendations.scss'

const Recommendations = ({ data }: any) => {
  return (
    <div className="recommendations">
      <h3 className="recommendations__title">Recommended for you </h3>

      <div className="recommendations__list">
        {data?.results.map((item: any) => (
          <MovieCard key={item.id} mediaType={'movie'} data={item} />
        ))}
      </div>
    </div>
  )
}

export default Recommendations
