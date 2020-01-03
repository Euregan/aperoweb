import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout } from 'antd';

import '../assets/styles.less';
import Nav from './Nav';

const { Header, Content } = Layout;

const CustomLayout = ({ children }) => (
    <div>
        <Head>
            <title>Apéros Web</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout>
            <Header>
                <Nav />
            </Header>
            <Content>{children}</Content>
        </Layout>
    </div>
);

CustomLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomLayout;
