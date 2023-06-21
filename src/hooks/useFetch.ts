import { useEffect, useState } from 'react'
import { fetchData } from '../utils/api'
import { IApiDataType } from '../types/ApiDataType'
import { IDetailsType } from '../types/DetailsType'
const useFetch = (url: string) => {
  const [data, setData] = useState<IApiDataType | IDetailsType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError(null)

    fetchData(url)
      .then((res) => {
        setLoading(false)
        setData(res)
      })
      .catch((err: Error) => {
        setLoading(false)
        setError('Something went wrong!')
        console.log(err)
      })
  }, [url])

  return { data, loading, error }
}

export default useFetch
