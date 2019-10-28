import { DateTime } from 'luxon'
import fetch from '../frontside/fetch'
import Layout from '../components/layout'
import Talk from '../components/talk'
import Card from '../components/card'
import Grid from '../components/grid'
import months from '../utilities/months'

const Home = ({talks, nextTalk, tweets, nextTweet}) => (
  <Layout>
    <h2>Talks</h2>
    <Grid>
      <Card id="nextTalk" title="Next talk">
        <div>{DateTime.fromISO(nextTalk.date).toRelative()}</div>
        <div>{nextTalk.name}</div>
        <ul>{nextTalk.speakers.map(speaker => (<li>{speaker.name}</li>))}</ul>
      </Card>
      <Card id="plannedTalks" title="Planned talks">
        {talks.filter(talk => talk).map(talk => (<div>{talk.name}</div>))}
      </Card>
      <Card id="nextEmptyMonth" title="Next empty month">
        {months[talks.indexOf(null) + new Date().getMonth() % 12]}
      </Card>
    </Grid>
    <h2>Communication</h2>
    <Grid>
      <Card title="Next tweet">
        <div>{DateTime.fromISO(nextTweet.date).toRelative()}</div>
        <div>{nextTweet.talk.name}</div>
      </Card>
    </Grid>

    <style jsx>{`
      ul {
        padding: 0;
      }

      #plannedTalks li ~ li {
        margin-top: 0.5rem;
      }
    `}</style>
  </Layout>
)

Home.getInitialProps = async ({req}) => {
  const talks = await fetch('/talks', req)
    .catch(error => console.error(error) || [])
  const nextTalk = talks.find(talk => talk && new Date(talk.date) > new Date())

  const tweets = await fetch('/tweets', req)
    .catch(error => console.error(error) || [])
  const nextTweet = tweets.find(tweet => new Date(tweet.date) > new Date())

  return {
    talks,
    nextTalk,
    tweets,
    nextTweet
  }
}

export default Home
