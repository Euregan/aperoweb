import months from '../utilities/months'
import days from '../utilities/days'
import Card from '../components/card'

const style = (<style>{`
    li.talk {
      padding: 1rem;
      border-radius: 0.2rem;
    }

    h2 {
      font-size: 1rem;
      margin-top: 0;
    }

    div ~ div, div ~ ul {
      margin-top: 0.75rem;
    }

    li.filled {
      background-color: #BBEAA6;
    }

    li.pending {
      background-color: #DAF1F9;
    }
  `}
</style>)

export default ({talk}) => (
  <Card title={months[new Date(talk.date).getMonth()]} state="valid">
    <div>{days[new Date(talk.date).getDay() - 1]} {new Date(talk.date).getDate()}</div>
    <div>{talk.name || 'TBD'}</div>
    <ul>{talk.speakers.map(({name}) => (<li key={name}>{name}</li>))}</ul>

    <style jsx>{`
      ul {
        padding: 0;
      }

      #dashboard {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        column-gap: 0.5rem;
        row-gap: 0.5rem;
      }

      #plannedTalks li ~ li {
        margin-top: 0.5rem;
      }
    `}</style>
  </Card>
)

  // talk
  //   ? (<li className='talk filled'>
  //       {style}
  //       <h2>{months[new Date(talk.date).getMonth()]}</h2>
  //       <div>{days[new Date(talk.date).getDay() - 1]} {new Date(talk.date).getDate()}</div>
  //       <div>{talk.name || 'TBD'}</div>
  //       <ul>{talk.speakers.map(({name}) => (<li key={name}>{name}</li>))}</ul>
  //     </li>)
  //   : (<li className='talk pending'>
  //       {style}
  //       <h2>{months[month]}</h2>
  //       <div>Pending</div>
  //     </li>)
