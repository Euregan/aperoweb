import React from 'react';
import { Typography, Row, Col } from 'antd';

import useDataApi from '../lib/useDataApi';
import provideAuthentication from '../lib/provideAuthentication';
import Layout from '../components/Layout';
import Talk from '../components/Talk';
import { CardWithLoading, CardWithError } from '../components/Card';

const { Title } = Typography;

const EmptyCalendar = ({ component }) =>
    [...Array(6).keys()]
        .map((_, index) => <Col key={`CardWithLoading${index}`}>{component}</Col>)
        .concat(
            [...Array(6).keys()].map((_, index) => (
                <Col key={`CardWithLoadingConcat${index}`}>{component}</Col>
            )),
        );

const NotPlanned = () => {
    const {
        data: { notPlanned },
        isLoading,
        isError,
        retry,
    } = useDataApi('/api/notPlanned');

    if (isError) return <CardWithError onFailureRetry={retry} />;
    if (isLoading) return <CardWithLoading />;

    return notPlanned.map((talk, index) => (
        <Col key={`notplanned-${index}`}>
            <Talk {...talk} />
        </Col>
    ));
};

const Calendar = () => {
    const {
        data: { calendar },
        isLoading,
        isError,
        retry,
    } = useDataApi('/api/calendar');

    if (isError) return <EmptyCalendar component={<CardWithError onFailureRetry={retry} />} />;
    if (isLoading) return <EmptyCalendar component={<CardWithLoading />} />;

    return calendar.map((talk, index) => (
        <Col key={index}>
            <Talk {...talk} />
        </Col>
    ));
};

const Talks = () => (
    <Layout>
        <Title level={3}>Calendar</Title>
        <Row type="flex" gutter={[16, 16]}>
            <Calendar />
        </Row>
        <Title level={3}>Not planned</Title>
        <Row type="flex" gutter={[16, 16]}>
            <NotPlanned />
        </Row>
    </Layout>
);

Talks.getInitialProps = async ({ req, res }) => {
    const securitySettings = provideAuthentication(req, res);
    return securitySettings;
};

export default Talks;
