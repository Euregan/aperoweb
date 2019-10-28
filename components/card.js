import months from '../utilities/months'
import days from '../utilities/days'

export default ({title, id, state, children}) => (
  <div className={'card ' + state} id={id}>
    <h3>{title}</h3>
    <div className="body">
      {children}
    </div>

    <style jsx>{`
        .card {
          padding: 1rem;
          border-radius: 0.2rem;
          border: 1px solid #EAEAEA;
        }

        .card.valid {
          background-color: #BBEAA6;
          border: none;
        }

        .card.pending {
          background-color: #DAF1F9;
          border: none;
        }

        .card.error {
          background-color: #FF8080;
          border: none;
        }

        .card.warning {
          background-color: #FFBA92;
          border: none;
        }
    `}</style>
    <style jsx global>{`
      .card > .body > * ~ * {
        margin-top: 0.75rem;
      }
    `}</style>
  </div>
)
