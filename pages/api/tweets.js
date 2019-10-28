import { tweets } from '../../serverside/airtable'

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  tweets()
    .then(tweets => {
      res.statusCode = 200
      res.end(JSON.stringify(tweets))
    })
    .catch(error => {
      res.statusCode = 500
      res.end(JSON.stringify(error))
    })
}
