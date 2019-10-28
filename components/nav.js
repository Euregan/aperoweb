import React from 'react'
import Link from 'next/link'

const links = [
  { href: '/talks', label: 'Talks' },
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}))

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>

    <style jsx>{`
      nav {
        text-align: center;
      }

      ul {
        display: flex;
        justify-content: space-start;
      }

      li ~ li {
        margin-left: 1rem;
      }

      a {
        font-size: 1rem;
      }
    `}</style>
  </nav>
)

export default Nav
