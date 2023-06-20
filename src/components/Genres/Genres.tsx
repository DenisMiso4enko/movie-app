import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './Genres.scss'

const Genres = ({ data }: any) => {
  const { genres } = useSelector((state: RootState) => state.home)

  return (
    <div className="genres">
      {data?.map((g: number) => {
        if (!genres[g]?.name) return
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        )
      })}
    </div>
  )
}

export default Genres
