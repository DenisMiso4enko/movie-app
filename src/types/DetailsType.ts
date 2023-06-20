export interface IGenres {
  id: number
  name: string
}

export interface IDetailsType {
  adult: boolean
  backdrop_path: string
  budget: string
  genres: [IGenres]
  homepage: string
  id: number
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  status: string
  tagline: string
  title: string
  vote_average: number
  video: boolean
}
