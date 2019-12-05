import React, { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'antd'
import { useRouter } from 'next/router'

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/talks', label: 'Talks' },
]

const urlToKey = url => {
  switch (url) {
    case '/talks': return 'talks'
    case '/':
    default: return 'dashboard'
  }
}

const Nav = () => {
  const router = useRouter()
  const [current, setCurrent] = useState(urlToKey(router.pathname))

  return (
    <Menu mode="horizontal" selectedKeys={current}>
      {links.map(({ href, label }) => (
        <Menu.Item key={urlToKey(href)} onClick={() => setCurrent(urlToKey(href))}>
          <Link href={href}><a>{label}</a></Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default Nav
