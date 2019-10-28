import unfetch from 'isomorphic-unfetch'

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'


const fetch = async (url, req) => {
  const host = process.browser ? window.location.host : req.headers.host
  const res = await unfetch(`${protocol}://${host}/api${url}`)
  return await res.json()
}

export default fetch
