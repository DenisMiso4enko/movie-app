import React, { useState } from 'react'
import Trending from '../../components/Trending/Trending'
import useFetch from '../../hooks/useFetch'
import Recomendations from '../../components/Recommendations/Recomendations'
import Spinner from '../../components/Spinner/Spinner'
import './Home.scss'
import SearchBar from '../../components/SearchBar/SearchBar'

const Home = () => {
  const { data, loading, error } = useFetch(`/movie/98/recommendations`)

  return (
    <div>
      {/*<SearchBar />*/}
      <Trending />
      {loading && <Spinner initial={true} />}
      {!loading && <Recomendations data={data} />}
    </div>
  )
}

export default Home
