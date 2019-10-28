import unfetch from 'isomorphic-unfetch'


const fetch = endpoint => unfetch(`https://api.airtable.com/v0/appAcSNaTeutPmqP0${endpoint}`, {headers: {Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`}})
  .then(response => response.json())
  .then(({records}) => records)


const talks = () => Promise.all([
  fetch('/talk'),
  fetch('/speaker')
]).then(([talks, speakers]) =>
  talks.map(talk => ({
    ...talk.fields,
    speakers: talk.fields.speakers
      ? talk.fields.speakers.map(speakerId => speakers.find(speaker => speaker.id === speakerId).fields)
      : []
  }))
)

const tweets = () => Promise.all([
  fetch('/twitter'),
  fetch('/talk')
]).then(([tweets, talks]) =>
  tweets.map(tweet => ({
    ...tweet.fields,
    talk: tweet.fields.talk
      ? tweet.fields.talk.map(talkId => talks.find(talk => talk.id === talkId).fields)[0] // There can be only one talk
      : null
  }))
)


export {
  talks,
  tweets
}
