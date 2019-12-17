import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout } from 'antd';

import Nav from './Nav';

const { Header, Content } = Layout;

const CustomLayout = ({ children }) => (
    <div>
        <Head>
            <title>Apéros Web</title>
            <link rel="icon" href="/favicon.ico" />

            <style>{`
            body {
                background-color: #f0f2f5 !important;
            }

            h2 {
             margin-top: 1rem !important;
            }

            ul {
                list-style: none;
                padding: 0;
            }
            `}</style>
        </Head>

        <Layout>
            <Header style={{ height: 'auto', padding: 0 }}>
                <Nav />
            </Header>
            <Content style={{ padding: '0 2rem' }}>{children}</Content>
        </Layout>
    </div>
);

CustomLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomLayout;
