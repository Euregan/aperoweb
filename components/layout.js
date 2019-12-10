import React from 'react';
import Head from 'next/head';
import Nav from './nav';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const CustomLayout = ({ children }) => (
    <div>
        <Head>
            <title>Apéros Web</title>
            <link rel="icon" href="/favicon.ico" />

            <style>{`
        .ant-layout-content {
          padding: 0 2rem !important;
        }

        .ant-layout-header {
          height: auto !important;
          padding: 0 !important;
        }

        .ant-card .ant-card-body > * ~ * {
          margin-top: 0.5rem;
        }

        h2 {
          margin-top: 1rem !important;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        body {
          background-color: #f0f2f5 !important;
        }
      `}</style>
        </Head>

        <Layout id="page">
            <Header>
                <Nav />
            </Header>
            <Content>{children}</Content>
        </Layout>
    </div>
);

export default CustomLayout;
