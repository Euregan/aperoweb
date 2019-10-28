import fetch from '../frontside/fetch'
import Layout from '../components/layout'
import Talk from '../components/talk'
import Card from '../components/card'
import Grid from '../components/grid'
import months from '../utilities/months'

const Talks = ({talks}) => (
  <div>
    <Layout>
      <h2>Talks</h2>
      <Grid>
        {talks.map((talk, index) => talk
          ? (<Talk key={index} talk={talk}/>)
          : (<Card key={index} title={months[(index + new Date().getMonth()) % 12]} state="pending">Pending</Card>)
        )}
      </Grid>
    </Layout>
  </div>
)

Talks.getInitialProps = async ({req}) => {
  const talks = await fetch('/talks', req)
    .catch(error => console.error(error) || [])

  return {
    talks
  }
}

export default Talks
