import React from 'react'
import './ButtonBookmark.scss'
import { BiBookmark } from 'react-icons/bi'

const ButtonBookmark = () => {
  return (
    <button className="bookmark-btn">
      <BiBookmark />
    </button>
  )
}

export default ButtonBookmark
