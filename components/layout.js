import Head from 'next/head'
import Nav from './nav'


const Layout = props => (
  <div>
    <Head>
      <title>Apéros Web</title>
      <link rel='icon' href='/favicon.ico' />
      <style>{`
          * {
            font-family: sans-serif;
          }

          #page {
            margin: auto;
            max-width: 1080px;
          }

          h1, h2, a {
            color: #87a8d0;
          }

          a {
            text-decoration: none;
          }

          h3 {
            font-size: 1rem;
            margin-top: 0;
          }

          ul {
            padding: 0;
          }

          li {
            list-style: none;
          }
        `}
      </style>
    </Head>

    <div id="page">
      <Nav />

      {props.children}
    </div>
  </div>
)

export default Layout
