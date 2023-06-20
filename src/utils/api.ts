import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'

const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDg1OGQ5MjEzZTE2N2YwZjJlOTlhNWNiMzY4YTg5NCIsInN1YiI6IjYzYTc4MmI0ZWRhNGI3MDBhMGUzYTM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z0Mwvums1oQE4EAbZziWObJcMCKjyihNGRnI1O4tRfI'

const headers = {
  Authorization: `bearer ${TOKEN}`,
}

export const fetchData = async (url: string, params?: any) => {
  try {
    const { data } = await axios.get(BASE_URL + url, { headers, params })
    return data
  } catch (e) {
    console.log(e)
  }
}
