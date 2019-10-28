import { talks } from '../../serverside/airtable'

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  talks()
    .then(talks => talks.reduce((calendar, talk) => {
      const talkMonth = new Date(talk.date).getMonth()
      const currentMonth = new Date().getMonth()
      const index = talkMonth >= currentMonth
        ? talkMonth - currentMonth
        : 12 - currentMonth + talkMonth
      calendar[index] = talk
      return calendar
    }, [null, null, null, null, null, null, null, null, null, null, null, null]))
    .then(talks => {
      res.statusCode = 200
      res.end(JSON.stringify(talks))
    })
    .catch(error => {
      res.statusCode = 500
      res.end(JSON.stringify(error))
    })
}
