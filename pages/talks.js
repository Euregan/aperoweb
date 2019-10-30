import fetch from '../frontside/fetch'
import Layout from '../components/layout'
import Talk from '../components/talk'
import Card from '../components/card'
import Grid from '../components/grid'
import months from '../utilities/months'

const Talks = ({calendar, noDate}) => (
  <div>
    <Layout>
      <h2>Calendar</h2>
      <Grid>
        {calendar.map((talk, index) => talk
          ? (<Talk key={index} talk={talk}/>)
          : (<Card key={index} title={months[(index + new Date().getMonth()) % 12]} state="pending">Pending</Card>)
        )}
      </Grid>
      <h2>Not planned</h2>
      <Grid>
        {noDate.map((talk, index) => (<Talk key={index} talk={talk}/>))}
      </Grid>
    </Layout>
  </div>
)

Talks.getInitialProps = async ({req}) => {
  const talks = await fetch('/talks', req)
    .catch(error => console.error(error) || [])
  const calendar = talks.reduce((calendar, talk) => {
      const talkMonth = new Date(talk.date).getMonth()
      const currentMonth = new Date().getMonth()
      const index = talkMonth >= currentMonth
        ? talkMonth - currentMonth
        : 12 - currentMonth + talkMonth
      calendar[index] = talk
      return calendar
    }, [null, null, null, null, null, null, null, null, null, null, null, null])
  const noDate = talks.filter(talk => !talk.date)

  return {
    calendar,
    noDate
  }
}

export default Talks
