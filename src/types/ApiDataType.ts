import { IMovieTypes } from './MovieTypes'

export interface IApiDataType {
  page: number
  results: [IMovieTypes]
  total_pages: number
  total_results: number
  backdrop_path: string
}
