import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../../Pages/Home/Home'
import Media from '../../Pages/Media/Media'
import Details from '../../Pages/Details/Details'
import SearchResult from '../../Pages/SearchResult/SearchResult'
import Login from '../../Pages/Login/Login'
import Registration from '../../Pages/Registration/Registration'
import Bookmarks from '../../Pages/Bookmarks/Bookmarks'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path={'/explore/:mediaType'} element={<Media />} />
        <Route path={'/:mediaType/:id'} element={<Details />} />
        <Route path={'/search/:query'} element={<SearchResult />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/registration'} element={<Registration />} />
        <Route path={'/bookmarks'} element={<Bookmarks />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
