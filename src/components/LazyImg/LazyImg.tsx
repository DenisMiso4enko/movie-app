import React, { FC } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

type LazyImgType = {
  src: string
  className?: string
  alt?: string
}

const LazyImg: FC<LazyImgType> = ({ src, className, alt }) => {
  return (
    <LazyLoadImage
      className={className || ''}
      alt={alt}
      effect="blur"
      src={src}
    />
  )
}

export default LazyImg
