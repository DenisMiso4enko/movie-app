import React from 'react'
import Input from '../Input/Input'
import { LuSearch } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { setSearchQuery } from '../../store/Slices/Home/homeSlice'
import './SearchBar.scss'

const SearchBar = () => {
  const { searchQuery } = useSelector((state: RootState) => state.home)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.toLowerCase().trim() !== '') {
      navigate(`search/${searchQuery}`)
      dispatch(setSearchQuery(''))
    }
  }

  return (
    <form className={`form-search`} onSubmit={handleSearchSubmit}>
      <Input
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.currentTarget.value))}
        placeholder={'Search for Movies or Tv Shows'}
        cls={'input-search'}
        icon={<LuSearch />}
      />
      <input type="submit" hidden={true} />
    </form>
  )
}

export default SearchBar
