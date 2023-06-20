import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { MdMovie, MdLocalMovies } from 'react-icons/md'
import { IoBookmark, IoTvOutline, IoBody } from 'react-icons/io5'
import './Menu.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const Menu = () => {
  const { userId, username } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const navigationHandler = (type: string) => {
    if (type === 'movie') {
      navigate('/explore/movie')
    } else if (type === 'bookmarks') {
      navigate('/bookmarks')
    } else {
      navigate('/explore/tv')
    }
  }
  const location = useLocation()

  // "/explore/movie"
  return (
    <div className="menu">
      <div className="menu__logo" onClick={() => navigate('/')}>
        <MdMovie />
      </div>
      <nav className="menu__nav">
        <div
          className={`menu__nav-item ${
            location.pathname === '/' ? 'active' : ''
          }`}
          onClick={() => navigate('/')}
        >
          <RiHomeFill />
        </div>
        <div
          className={`menu__nav-item ${
            location.pathname === '/explore/movie' ? 'active' : ''
          }`}
          onClick={() => navigationHandler('movie')}
        >
          <MdLocalMovies />
        </div>
        <div
          className={`menu__nav-item ${
            location.pathname === '/explore/tv' ? 'active' : ''
          }`}
          onClick={() => navigationHandler('tv')}
        >
          <IoTvOutline />
        </div>
        <div
          className={`menu__nav-item ${
            location.pathname === '/bookmarks' ? 'active' : ''
          }`}
          onClick={() => navigationHandler('bookmarks')}
        >
          <IoBookmark />
        </div>
      </nav>

      <div className="menu__actions">
        {userId ? (
          <div>
            <div>
              <IoBody />
            </div>
            <h3>{username}</h3>
          </div>
        ) : (
          <NavLink className="menu__nav" to={'/login'}>
            Login
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Menu
