import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { MdMovie, MdLocalMovies } from 'react-icons/md'
import { IoBookmark, IoTvOutline, IoBody } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { logOut } from '../../store/Slices/User/userSlice'
import { BiLogOut } from 'react-icons/bi'
import './Menu.scss'

const Menu = () => {
  const { userId, username } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
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
          <>
            <div className="avatar">{username?.slice(0, 1)}</div>
            <div className="logout" onClick={() => dispatch(logOut())}>
              <BiLogOut />
            </div>
          </>
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
