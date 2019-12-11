import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { useRouter } from 'next/router';

const Nav = () => {
    const router = useRouter();

    return (
        <Menu mode="horizontal" selectedKeys={[router.pathname]}>
            <Menu.Item key="/">
                <Link href="/">
                    <a>Dashboard</a>
                </Link>
            </Menu.Item>
            <Menu.Item key="/talks">
                <Link href="/talks">
                    <a>Talks</a>
                </Link>
            </Menu.Item>
        </Menu>
    );
};

export default Nav;
