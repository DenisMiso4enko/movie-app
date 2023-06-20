import './App.scss'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import { getApiConfiguration, getGenres } from './store/Slices/Home/homeSlice'
import { fetchData } from './utils/api'
import AppRoutes from './components/AppRoutes/AppRoutes'
import Menu from './components/Menu/Menu'
import SearchBar from './components/SearchBar/SearchBar'
import { fetchUserById } from './store/Slices/User/userServices'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  const fetchApiConfig = () => {
    fetchData('/configuration').then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      }
      dispatch(getApiConfiguration(url))
    })
  }
  const genresCall = async () => {
    // @ts-ignore
    let promises = []
    let endPoints = ['tv', 'movie']
    let allGenres = {}
    endPoints.forEach((url) => {
      promises.push(fetchData(`/genre/${url}/list`))
    })
    // @ts-ignore
    const data = await Promise.all(promises)
    data.map(({ genres }) => {
      // @ts-ignore
      return genres.map((item: any) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
  }

  useEffect(() => {
    fetchApiConfig()
    genresCall()
    dispatch(fetchUserById())
  }, [])

  return (
    <div className="App container">
      <div className="App__menu">
        <Menu />
      </div>
      <div className="App__content">
        <SearchBar />
        <AppRoutes />
      </div>
    </div>
  )
}

export default App
