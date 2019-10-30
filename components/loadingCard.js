import Card from './card'

export default ({lines = 2, title}) =>
  <Card title={title}>
    {[...Array(lines).keys()].map(() => <div className="loader"></div>)}

    <style jsx>{`
      .loader {
        background: linear-gradient(-45deg, #FDA77F, #FFBBCC, #DAF1F9, #C6F1D6);
        background-size: 400% 400%;
        animation: gradientBG 2s ease infinite;
        height: 1rem;
        border-radius: 0.2rem;
      }

      @keyframes gradientBG {
      	0% {
      		background-position: 0% 50%;
      	}
      	50% {
      		background-position: 100% 50%;
      	}
      	100% {
      		background-position: 0% 50%;
      	}
      }
    `}</style>
  </Card>
